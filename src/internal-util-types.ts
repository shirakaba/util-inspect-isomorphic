/**
 * JB: No way to do this engine-agnostically, so just return false.
 */
export function isNativeError(value: unknown): value is Error {
  return false;
}

/**
 * JB: No way to do this engine-agnostically, so just return false.
 */
export function isModuleNamespaceObject(value: unknown): value is any {
  return false;
}

/**
 * JB: No way to do this engine-agnostically, so just return false.
 */
export function isExternal(value: unknown): value is any {
  return false;
}

export function isAsyncFunction(value: unknown): value is PromiseLike<unknown> {
  if (typeof value !== "function") {
    return false;
  }

  try {
    const stringification = (
      value as unknown as { valueOf(): string }
    ).valueOf();
    return (
      stringification.startsWith("[AsyncFunction: ") &&
      stringification.endsWith("]")
    );
  } catch (error) {
    return false;
  }
}

export function isGeneratorFunction(
  value: unknown,
): value is GeneratorFunction {
  if (typeof value !== "function") {
    return false;
  }

  try {
    const stringification = (
      value as unknown as { valueOf(): string }
    ).valueOf();
    return (
      stringification.startsWith("[GeneratorFunction: ") &&
      stringification.endsWith("]")
    );
  } catch (error) {
    return false;
  }
}

export function isArgumentsObject(value: unknown): value is IArguments {
  try {
    return (
      (value as { toString(): string }).toString() === "[object Arguments]"
    );
  } catch (error) {
    return false;
  }
}

/**
 * This can't handle all boxed primitives types, but catches a few of them.
 */
export function isBoxedPrimitive(value: unknown) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value)
  );
}

export function isAnyArrayBuffer(value: unknown) {
  return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
}

export function isArrayBuffer(value: unknown) {
  return value instanceof ArrayBuffer;
}

export function isDataView(value: unknown) {
  return value instanceof DataView;
}

export function isMap(value: unknown) {
  return value instanceof Map;
}

export function isMapIterator(
  value: unknown,
): value is MapIterator<[unknown, unknown]> {
  try {
    return (
      (value as { toString(): string }).toString() === "[object Map Iterator]"
    );
  } catch (error) {
    return false;
  }
}

export function isPromise(value: unknown) {
  return value instanceof Promise;
}

export function isSet(value: unknown) {
  return value instanceof Set;
}

export function isSetIterator(
  value: unknown,
): value is SetIterator<[unknown, unknown]> {
  try {
    return (
      (value as { toString(): string }).toString() === "[object Set Iterator]"
    );
  } catch (error) {
    return false;
  }
}

export function isWeakMap(value: unknown) {
  return value instanceof WeakMap;
}

export function isWeakSet(value: unknown) {
  return value instanceof WeakSet;
}

export function isRegExp(value: unknown) {
  return value instanceof RegExp;
}

export function isDate(value: unknown) {
  return value instanceof Date;
}

export function isTypedArray(value: unknown) {
  // There is no "TypedArray" global exposed to JavaScript.
  return (
    value instanceof Int8Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int16Array ||
    value instanceof Uint16Array ||
    value instanceof Int32Array ||
    value instanceof Uint32Array ||
    // value instanceof Float16Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
    // value instanceof BigInt64Array ||
    // value instanceof BigUint64Array
  );
}

export function isStringObject(value: unknown) {
  return value instanceof String;
}

export function isNumberObject(value: unknown) {
  return value instanceof Number;
}

export function isBooleanObject(value: unknown) {
  return value instanceof Boolean;
}

export function isBigIntObject(value: unknown) {
  return value instanceof BigInt;
}
