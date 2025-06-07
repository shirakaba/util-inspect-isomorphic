/**
 * Refers to ECMAScript `NativeError`, rather than non-standard V8/Node.js
 * errors.
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-native-error-types-used-in-this-standard
 *
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L150
 */
export function isNativeError(
  value: unknown,
): value is
  | Error
  | EvalError
  | RangeError
  | ReferenceError
  | SyntaxError
  | TypeError
  | URIError
  | AggregateError {
  return (
    value instanceof Error &&
    constructorNamed(
      value,
      "Error",
      "EvalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError",
      "AggregateError",
    )
  );
}

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L144
 */
export function isModuleNamespaceObject(value: unknown): value is object {
  // TODO(nie): This is weak and easily faked
  return (
    !!value &&
    typeof value === "object" &&
    (value as { [Symbol.toStringTag]: string })[Symbol.toStringTag] === "Module"
  );
}

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L124
 */
export function isExternal(value: unknown): value is object | null {
  return (
    typeof value === "object" &&
    Object.isFrozen(value) &&
    Object.getPrototypeOf(value) == null
  );
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
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L114
 */
export function isBoxedPrimitive(value: unknown) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
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

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L201
 */
export function isTypedArray(
  value: unknown,
): value is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array {
  // | BigInt64Array
  // | BigUint64Array
  return constructorNamed(
    value,
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    // "BigInt64Array",
    // "BigUint64Array",
  );
}

export function isStringObject(value: unknown): value is String {
  return isStringObjectChecker(value);
}

export function isNumberObject(value: unknown): value is Number {
  return isNumberObjectChecker(value);
}

export function isBooleanObject(value: unknown): value is Boolean {
  return isBooleanObjectChecker(value);
}

export function isBigIntObject(value: unknown): value is BigInt {
  return isBigIntObjectChecker(value);
}

export function isSymbolObject(value: unknown): value is Symbol {
  return isSymbolObjectChecker(value);
}

// From `node-inspect-extracted`:
// https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L80-L84
const isStringObjectChecker = checkBox(String);
const isNumberObjectChecker = checkBox(Number);
const isBooleanObjectChecker = checkBox(Boolean);
const isBigIntObjectChecker = checkBox(BigInt);
const isSymbolObjectChecker = checkBox(Symbol);

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L41C1-L64C2
 */
function constructorNamed(val: unknown, ...name: Array<string>) {
  // Pass in names rather than types, in case SharedArrayBuffer (e.g.) isn't
  // in your browser
  for (const n of name) {
    const typ = (globalThis as Record<string, unknown>)[n];
    if (typ) {
      if (
        val instanceof
        (typ as { [Symbol.hasInstance]: (val: unknown) => boolean })
      ) {
        return true;
      }
    }
  }
  // instanceOf doesn't work across vm boundaries, so check the whole
  // inheritance chain
  while (val) {
    if (typeof val !== "object") {
      return false;
    }
    if (name.indexOf(getConstructorName(val)) >= 0) {
      return true;
    }
    val = Object.getPrototypeOf(val);
  }
  return false;
}

/**
 * This actually belongs in `node-util.ts`, but keeping it here (the only place
 * we use it in the codebase) avoids a cyclic dependency.
 *
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/util.js#L58
 */
function getConstructorName(val: unknown) {
  if (!val || typeof val !== "object") {
    // eslint-disable-next-line no-restricted-syntax
    throw new Error("Invalid object");
  }
  if (val.constructor && val.constructor.name) {
    return val.constructor.name;
  }
  const str = val.toString();
  // e.g. [object Boolean]
  const m = str.match(/^\[object ([^\]]+)\]/);
  if (m) {
    return m[1];
  }
  return "Object";
}

/**
 * From `node-inspect-extracted`:
 * @see https://github.com/hildjj/node-inspect-extracted/blob/7ea8149fbda1a81322e2d99484fe1cb7873a5f1e/src/internal/util/types.js#L66
 */
function checkBox(cls: Function) {
  return (val: unknown) => {
    if (!constructorNamed(val, cls.name)) {
      return false;
    }
    try {
      cls.prototype.valueOf.call(val);
    } catch {
      return false;
    }
    return true;
  };
}
