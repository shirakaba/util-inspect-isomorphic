/// <reference path="./error-capture-stack-trace.types.ts" />
import { isSetIterator, isMapIterator } from "./internal-util-types.js";

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/util.js#L21
 *
 * Original native code here:
 * @see https://github.com/nodejs/node/blob/919ef7cae89ea9821db041cde892697cc8030b7c/src/node_util.cc#L52
 * @see https://source.chromium.org/chromium/chromium/src/+/main:v8/src/api/api.cc;l=4732?q=GetPropertyNames&sq=&ss=chromium%2Fchromium%2Fsrc:v8%2F
 */
export function getOwnNonIndexProperties(
  value: unknown,
  filter = PropertyFilter.ONLY_ENUMERABLE,
) {
  const desc = Object.getOwnPropertyDescriptors(value);
  const ret = new Array<string | symbol>();

  for (const [entryKey, entryValue] of Object.entries(desc)) {
    if (
      !/^(0|[1-9][0-9]*)$/.test(entryKey) ||
      Number.parseInt(entryKey, 10) >= 2 ** 32 - 1
    ) {
      // Arrays are limited in size
      if (filter === PropertyFilter.ONLY_ENUMERABLE && !entryValue.enumerable) {
        continue;
      }
      ret.push(entryKey);
    }
  }

  for (const sym of Object.getOwnPropertySymbols(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, sym);
    if (filter === PropertyFilter.ONLY_ENUMERABLE && !descriptor?.enumerable) {
      continue;
    }
    ret.push(sym);
  }

  return ret;
}

export function getPromiseState(promise: Promise<unknown>) {
  const pendingState = { status: "pending" };

  return Promise.race([promise, pendingState]).then(
    (value) =>
      value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason }),
  );
}

/**
 * @see https://github.com/nodejs/node/blob/919ef7cae89ea9821db041cde892697cc8030b7c/src/node_util.cc#L166
 * @see https://source.chromium.org/chromium/chromium/src/+/main:v8/src/api/api.cc;l=11202?q=PreviewEntries&ss=chromium%2Fchromium%2Fsrc:v8%2F
 */
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
    //     engine-agnostic manner, so report `isKeyValue` as `false`. This is
    //     because it's safe downstream to call `formatSetIterInner()` on either
    //     type, but unsafe to call `formatMapIterInner()` on anything but a
    //     key-value iterator.
    //
    return [elements, false];
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
