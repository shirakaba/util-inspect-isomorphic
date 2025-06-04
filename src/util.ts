import { isSetIterator, isMapIterator } from "./internal-util-types";

// https://github.com/nodejs/node/blob/919ef7cae89ea9821db041cde892697cc8030b7c/src/node_util.cc#L52
// https://source.chromium.org/chromium/chromium/src/+/main:v8/src/api/api.cc;l=4732?q=GetPropertyNames&sq=&ss=chromium%2Fchromium%2Fsrc:v8%2F
export function getOwnNonIndexProperties(
  value: unknown,
  filter: PropertyFilter,
) {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("First argument must be an object");
  }

  if (typeof filter !== "number") {
    throw new TypeError("Second argument must be a number");
  }

  const ownProperties = [
    ...Object.getOwnPropertyNames(value),
    ...Object.getOwnPropertySymbols(value),
  ];

  switch (filter) {
    case PropertyFilter.ALL_PROPERTIES: {
      return ownProperties;
    }
    case PropertyFilter.ONLY_ENUMERABLE: {
      return ownProperties.filter(
        (property) =>
          Object.getOwnPropertyDescriptor(value, property)?.enumerable,
      );
    }
    default: {
      throw new TypeError(
        `Expected a PropertyFilter of either ALL_PROPERTIES (0) or ONLY_ENUMERABLE (2), but got ${filter}.`,
      );
    }
  }
}

export function getPromiseState(promise: Promise<unknown>) {
  const pendingState = { status: "pending" };

  return Promise.race([promise, pendingState]).then(
    (value) =>
      value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason }),
  );
}

export function previewEntries(
  value: unknown,
  isKeyValue?: boolean,
): [entries: Array<unknown>, isKeyValue: boolean | undefined] {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("First argument must be an object");
  }

  if (value instanceof Map || value instanceof Set) {
    return [Array.from(value), true];
  }

  if (isSetIterator(value) || isMapIterator(value)) {
    const elements = new Array<[unknown, unknown]>();
    for (const element of value) {
      elements.push(element);
    }

    // JB: We can't determine whether the iterator is key-value in an
    //     engine-agnostic manner, so we take isKeyValue.
    return [elements, isKeyValue];
  }

  return [[], isKeyValue];
}

/**
 * Just the ones we need out of the original:
 * @see https://chromium.googlesource.com/v8/v8/+/981aafaf977d4671763c341102a4ee5ef172f7f6/src/objects/property-details.h#35
 */
enum PropertyFilter {
  ALL_PROPERTIES = 0,
  ONLY_ENUMERABLE = 2,
}

export const constants = {
  ...PropertyFilter,
};
