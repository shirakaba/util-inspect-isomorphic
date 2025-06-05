// A fork of:
// https://github.com/isaacs/node-primordials/blob/main/src/index.ts,
// ... which is itself a TypeScript port of:
// https://github.com/nodejs/node/blob/main/lib/internal/per_context/primordials.js
//
// This is *purely* for filling in the API calls used in the implementation
// of inspect(). Making it secure from global mutation (which is the rationale
// behind primordials - see the link below) is a non-goal.
// https://github.com/nodejs/node/blob/main/doc/contributing/primordials.md
//
// In fact, this fork is expressly *not* secure from global mutation. We grab
// `globalThis` directly, rather than using eval(). This is because eval() is
// not implemented by engines such as Hermes, so is necessary to make the
// library isomorphic.
// https://github.com/facebook/hermes/issues/957
//
// See LICENSE-node.txt and LICENSE-node-primordials.md in the root of this repo
// for licensing.

export {
  Array,
  ArrayBuffer,
  ArrayBufferPrototype,
  ArrayIsArray,
  ArrayPrototype,
  ArrayPrototypeFilter,
  ArrayPrototypeForEach,
  ArrayPrototypeIncludes,
  ArrayPrototypeIndexOf,
  ArrayPrototypeJoin,
  ArrayPrototypeMap,
  ArrayPrototypePop,
  ArrayPrototypePush,
  ArrayPrototypePushApply,
  ArrayPrototypeSlice,
  ArrayPrototypeSort,
  ArrayPrototypeSplice,
  ArrayPrototypeUnshift,
  BigIntPrototypeValueOf,
  Boolean,
  BooleanPrototype,
  BooleanPrototypeValueOf,
  DataView,
  DataViewPrototype,
  Date,
  DatePrototype,
  DatePrototypeGetTime,
  DatePrototypeToISOString,
  DatePrototypeToString,
  Error,
  ErrorPrototype,
  ErrorPrototypeToString,
  Function,
  FunctionPrototype,
  FunctionPrototypeBind,
  FunctionPrototypeCall,
  FunctionPrototypeSymbolHasInstance,
  FunctionPrototypeToString,
  GLOBALTHIS as globalThis,
  JSONStringify,
  Map,
  MapPrototype,
  MapPrototypeEntries,
  MapPrototypeGetSize,
  MathFloor,
  MathMax,
  MathMin,
  MathRound,
  MathSqrt,
  MathTrunc,
  Number,
  NumberIsFinite,
  NumberIsNaN,
  NumberParseFloat,
  NumberParseInt,
  NumberPrototype,
  NumberPrototypeToString,
  NumberPrototypeValueOf,
  OBJECT as Object,
  ObjectAssign,
  ObjectDefineProperty,
  ObjectGetOwnPropertyDescriptor,
  ObjectGetOwnPropertyNames,
  ObjectGetOwnPropertySymbols,
  ObjectGetPrototypeOf,
  ObjectIs,
  ObjectKeys,
  ObjectPrototype,
  ObjectPrototypeHasOwnProperty,
  ObjectPrototypePropertyIsEnumerable,
  ObjectSeal,
  ObjectSetPrototypeOf,
  Promise,
  PromisePrototype,
  ReflectApply,
  ReflectOwnKeys,
  RegExp,
  RegExpPrototype,
  RegExpPrototypeExec,
  RegExpPrototypeSymbolReplace,
  RegExpPrototypeSymbolSplit,
  RegExpPrototypeToString,
  SafeMap,
  SafeSet,
  SafeStringIterator,
  Set,
  SetPrototype,
  SetPrototypeGetSize,
  SetPrototypeValues,
  String,
  StringPrototype,
  StringPrototypeCharCodeAt,
  StringPrototypeCodePointAt,
  StringPrototypeEndsWith,
  StringPrototypeIncludes,
  StringPrototypeIndexOf,
  StringPrototypeLastIndexOf,
  StringPrototypeNormalize,
  StringPrototypePadEnd,
  StringPrototypePadStart,
  StringPrototypeRepeat,
  StringPrototypeReplace,
  StringPrototypeReplaceAll,
  StringPrototypeSlice,
  StringPrototypeSplit,
  StringPrototypeStartsWith,
  StringPrototypeToLowerCase,
  StringPrototypeTrim,
  StringPrototypeValueOf,
  SymbolIterator,
  SymbolPrototypeToString,
  SymbolPrototypeValueOf,
  SymbolToPrimitive,
  SymbolToStringTag,
  TypedArray,
  TypedArrayPrototype,
  TypedArrayPrototypeGetLength,
  TypedArrayPrototypeGetSymbolToStringTag,
  Uint8Array,
  Int8Array,
  uncurryThis,
  WeakMap,
  WeakMapPrototype,
  WeakSet,
  WeakSetPrototype,
};

export type UncurryThis<
  T extends (this: unknown, ...args: unknown[]) => unknown,
> = (self: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
export type UncurryThisStaticApply<
  T extends (this: unknown, ...args: unknown[]) => unknown,
> = (self: ThisParameterType<T>, args: Parameters<T>) => ReturnType<T>;

export type StaticCall<
  T extends (this: unknown, ...args: unknown[]) => unknown,
> = (...args: Parameters<T>) => ReturnType<T>;
export type StaticApply<
  T extends (this: unknown, ...args: unknown[]) => unknown,
> = (args: Parameters<T>) => ReturnType<T>;

export type UncurryMethod<O, K extends keyof O, T = O> = O[K] extends (
  this: infer U,
  ...args: infer A
) => infer R
  ? (self: unknown extends U ? T : U, ...args: A) => R
  : never;

// Unfortunately some engines like Hermes don't implement eval()...
// // ensure that we have the really truly true and real globalThis
// // const GLOBALTHIS = (0, eval)("this") as typeof globalThis;
const GLOBALTHIS = globalThis;

export type UncurryGetter<O, K extends keyof O, T = O> = (self: T) => O[K];
export type UncurrySetter<O, K extends keyof O, T = O> = (
  self: T,
  value: O[K],
) => void;

const {
  Array,
  ArrayBuffer,
  BigInt,
  Boolean,
  Date,
  DataView,
  Error,
  Float32Array,
  Float64Array,
  Function,
  Int16Array,
  Int32Array,
  Int8Array,
  JSON: JSON_,
  Map,
  Math: Math_,
  Number,
  Promise,
  Reflect,
  RegExp,
  Set,
  String,
  Symbol,
  TypeError,
  Uint8Array,
  Uint16Array,
  Uint8ClampedArray,
  Uint32Array,
  WeakMap,
  WeakSet,
} = GLOBALTHIS;

const OBJECT: typeof Object = GLOBALTHIS.Object;

type TypedArray = (
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
) & {
  // not sure why this isn't picking up, it's definitely on all of these.
  toLocaleString:
    | Uint8Array["toLocaleString"]
    | Int8Array["toLocaleString"]
    | Uint16Array["toLocaleString"]
    | Int16Array["toLocaleString"]
    | Uint32Array["toLocaleString"]
    | Int32Array["toLocaleString"]
    | Uint8ClampedArray["toLocaleString"]
    | Float32Array["toLocaleString"]
    | Float64Array["toLocaleString"];
};

type TypedArrayOfApply = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  args: Parameters<TypedArrayConstructor<T>["of"]>,
) => T;

type TypedArrayConstructor<T extends TypedArray> = T extends Uint8Array
  ? typeof Uint8Array
  : T extends Int8Array
    ? typeof Int8Array
    : T extends Uint16Array
      ? typeof Uint16Array
      : T extends Int16Array
        ? typeof Int16Array
        : T extends Uint32Array
          ? typeof Uint32Array
          : T extends Int32Array
            ? typeof Int32Array
            : T extends Uint8ClampedArray
              ? typeof Uint8ClampedArray
              : T extends Float32Array
                ? typeof Float32Array
                : T extends Float64Array
                  ? typeof Float64Array
                  : never;

const Uint8ArrayOf = Uint8Array.of;
const Int8ArrayOf = Int8Array.of;
const Uint16ArrayOf = Uint16Array.of;
const Int16ArrayOf = Int16Array.of;
const Uint32ArrayOf = Uint32Array.of;
const Int32ArrayOf = Int32Array.of;
const Uint8ClampedArrayOf = Uint8ClampedArray.of;
const Float32ArrayOf = Float32Array.of;
const Float64ArrayOf = Float64Array.of;

const TypedArrayOfApply: TypedArrayOfApply = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  args: Parameters<TypedArrayConstructor<T>["of"]>,
): T => {
  const fn =
    ctor === Uint8Array
      ? Uint8ArrayOf
      : ctor === Int8Array
        ? Int8ArrayOf
        : ctor === Uint16Array
          ? Uint16ArrayOf
          : ctor === Int16Array
            ? Int16ArrayOf
            : ctor === Uint32Array
              ? Uint32ArrayOf
              : ctor === Int32Array
                ? Int32ArrayOf
                : ctor === Uint8ClampedArray
                  ? Uint8ClampedArrayOf
                  : ctor === Float32Array
                    ? Float32ArrayOf
                    : ctor === Float64Array
                      ? Float64ArrayOf
                      : undefined;
  if (!fn) {
    throw new TypeError("invalid TypedArray constructor: " + ctor);
  }
  return applyBind(fn)(ctor, args) as T;
};

const TypedArrayPrototype = Reflect.getPrototypeOf(
  Uint8Array.prototype,
) as TypedArray;

const TypedArrayPrototypeGetSymbolToStringTag = (self: TypedArray) =>
  self instanceof Uint8Array
    ? "Uint8Array"
    : self instanceof Int8Array
      ? "Int8Array"
      : self instanceof Uint16Array
        ? "Uint16Array"
        : self instanceof Int16Array
          ? "Int16Array"
          : self instanceof Uint32Array
            ? "Uint32Array"
            : self instanceof Int32Array
              ? "Int32Array"
              : self instanceof Uint8ClampedArray
                ? "Uint8ClampedArray"
                : self instanceof Float32Array
                  ? "Float32Array"
                  : self instanceof Float64Array
                    ? "Float64Array"
                    : undefined;

const SafeObject = OBJECT.defineProperties(
  OBJECT.create(null),
  OBJECT.getOwnPropertyDescriptors(OBJECT) as PropertyDescriptorMap,
);
OBJECT.freeze(SafeObject);

const cloneSafe = <T extends {}>(obj: T): T => {
  const safe = SafeObject.defineProperties(
    SafeObject.create(null),
    SafeObject.getOwnPropertyDescriptors(obj) as PropertyDescriptorMap,
  );
  SafeObject.freeze(safe);
  return safe;
};

const FunctionPrototype = cloneSafe(Function.prototype);
const { apply, bind, call } = Function.prototype;

const uncurryThis: <T extends (...args: any[]) => any>(
  fn: T,
) => UncurryThis<T> = bind.bind(call);

const applyBind: <T extends (...args: any[]) => any>(
  fn: T,
) => UncurryThisStaticApply<T> = bind.bind(apply);

const staticCall: <T extends (...args: any[]) => any>(fn: T) => StaticCall<T> =
  <T extends (...args: any[]) => any>(fn: T) =>
  (...args: Parameters<T>) =>
    fn(...args);

const uncurryGetter = <O extends object, K extends keyof O, T = O>(
  obj: O,
  k: K,
): UncurryGetter<O, K, T> => {
  const desc = SafeReflect.getOwnPropertyDescriptor(obj, k);
  if (desc?.get) {
    return uncurryThis(desc.get);
  }
  throw new Error("invalid uncurryGetter call: " + String(k));
};

const FunctionPrototypeCall = uncurryThis(call);

const ArrayPrototype = Array.prototype;

const SafeReflect = Reflect;

const ArrayIsArray = staticCall(Array.isArray) as (typeof Array)["isArray"];
const ArrayPrototypeFilter = uncurryThis(ArrayPrototype.filter);
const ArrayPrototypeForEach = uncurryThis(ArrayPrototype.forEach);
const ArrayPrototypeIncludes = uncurryThis(ArrayPrototype.includes);
const ArrayPrototypeIndexOf = uncurryThis(ArrayPrototype.indexOf);
const ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
const ArrayPrototypeMap = uncurryThis(ArrayPrototype.map);
const ArrayPrototypePop = uncurryThis(ArrayPrototype.pop);
const ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
const ArrayPrototypePushApply = applyBind(ArrayPrototype.push);
const ArrayPrototypeSlice = uncurryThis(ArrayPrototype.slice);
const ArrayPrototypeSort = uncurryThis(ArrayPrototype.sort);
const ArrayPrototypeSplice = uncurryThis(ArrayPrototype.splice);
const ArrayPrototypeUnshift = uncurryThis(ArrayPrototype.unshift);

const ArrayBufferPrototype = ArrayBuffer.prototype;

const BigIntPrototypeValueOf = uncurryThis(BigInt.prototype.valueOf);

const BooleanPrototype = Boolean.prototype;
const BooleanPrototypeValueOf = uncurryThis(Boolean.prototype.valueOf);

const DataViewPrototype = DataView.prototype;

const DatePrototype = Date.prototype;
const DatePrototypeGetTime = uncurryThis(Date.prototype.getTime);
const DatePrototypeToISOString = uncurryThis(Date.prototype.toISOString);
const DatePrototypeToString = uncurryThis(Date.prototype.toString);

const ErrorPrototype = Error.prototype;
const ErrorPrototypeToString = uncurryThis(Error.prototype.toString);

const FunctionPrototypeBind = uncurryThis(bind);
const FunctionPrototypeToString = uncurryThis(Function.prototype.toString);
const FunctionPrototypeSymbolHasInstance = uncurryThis(
  Function.prototype[Symbol.hasInstance],
);

const JSON = JSON_;
const JSONStringify = staticCall(JSON.stringify);

const MapPrototype = Map.prototype;
const MapPrototypeEntries = uncurryThis(Map.prototype.entries);
const MapPrototypeGetSize = uncurryGetter(Map.prototype, "size");

const Math = Math_;
const MathFloor = Math.floor;
const MathMax = Math.max;
const MathMin = Math.min;
const MathRound = Math.round;
const MathSqrt = Math.sqrt;
const MathTrunc = Math.trunc;

const NumberIsFinite = staticCall(Number.isFinite);
const NumberIsNaN = staticCall(Number.isNaN);
const NumberParseFloat = staticCall(Number.parseFloat);
const NumberParseInt = staticCall(Number.parseInt);
const NumberPrototype = Number.prototype;
const NumberPrototypeToString = uncurryThis(Number.prototype.toString);
const NumberPrototypeValueOf = uncurryThis(Number.prototype.valueOf);

const ObjectPrototype = OBJECT.prototype;
const ObjectAssign = staticCall(OBJECT.assign);
const ObjectGetOwnPropertyDescriptor = staticCall(
  OBJECT.getOwnPropertyDescriptor,
);
const ObjectGetOwnPropertyNames = staticCall(OBJECT.getOwnPropertyNames);
const ObjectGetOwnPropertySymbols = staticCall(OBJECT.getOwnPropertySymbols);
const ObjectIs = staticCall(OBJECT.is);
const ObjectSeal = staticCall(OBJECT.seal);
const ObjectDefineProperty = staticCall(OBJECT.defineProperty);
const ObjectFreeze = staticCall(OBJECT.freeze);
const ObjectGetPrototypeOf = staticCall(OBJECT.getPrototypeOf);
const ObjectSetPrototypeOf = staticCall(OBJECT.setPrototypeOf);
const ObjectKeys = staticCall(OBJECT.keys);
const ObjectPrototypeHasOwnProperty = uncurryThis(
  OBJECT.prototype.hasOwnProperty,
);
const ObjectPrototypePropertyIsEnumerable = uncurryThis(
  OBJECT.prototype.propertyIsEnumerable,
);

const PromisePrototype = Promise.prototype;

const ReflectApply = SafeReflect.apply;
const ReflectDefineProperty = SafeReflect.defineProperty;
const ReflectGetOwnPropertyDescriptor = SafeReflect.getOwnPropertyDescriptor;
const ReflectOwnKeys = SafeReflect.ownKeys;

const RegExpPrototype = RegExp.prototype;
const RegExpPrototypeExec = uncurryThis(RegExp.prototype.exec);
const RegExpPrototypeToString = uncurryThis(RegExp.prototype.toString);
const RegExpPrototypeSymbolReplace = uncurryThis(
  RegExp.prototype[Symbol.replace],
);
const RegExpPrototypeSymbolSplit = uncurryThis(RegExp.prototype[Symbol.split]);

const SetPrototype = Set.prototype;
const SetPrototypeValues = uncurryThis(Set.prototype.values);

const SetPrototypeGetSize = uncurryGetter(Set.prototype, "size");

const StringPrototype = String.prototype;
const StringPrototypeCharCodeAt = uncurryThis(String.prototype.charCodeAt);
const StringPrototypeCodePointAt = uncurryThis(String.prototype.codePointAt);
const StringPrototypeEndsWith = uncurryThis(String.prototype.endsWith);
const StringPrototypeIncludes = uncurryThis(String.prototype.includes);
const StringPrototypeIndexOf = uncurryThis(String.prototype.indexOf);
const StringPrototypeLastIndexOf = uncurryThis(String.prototype.lastIndexOf);
const StringPrototypeNormalize = uncurryThis(String.prototype.normalize);
const StringPrototypePadEnd = uncurryThis(String.prototype.padEnd);
const StringPrototypePadStart = uncurryThis(String.prototype.padStart);
const StringPrototypeRepeat = uncurryThis(String.prototype.repeat);
const StringPrototypeReplace = uncurryThis(String.prototype.replace) as {
  (self: string, searchValue: string | RegExp, replaceValue: string): string;
  (
    self: string,
    searchValue: string | RegExp,
    replacer: (substring: string, ...args: any[]) => string,
  ): string;
  (
    self: string,
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replaceValue: string,
  ): string;
  (
    self: string,
    searchValue: {
      [Symbol.replace](
        string: string,
        replacer: (substring: string, ...args: any[]) => string,
      ): string;
    },
    replacer: (substring: string, ...args: any[]) => string,
  ): string;
};

const StringPrototypeSlice = uncurryThis(String.prototype.slice);
const StringPrototypeSplit = uncurryThis(String.prototype.split);
const StringPrototypeStartsWith = uncurryThis(String.prototype.startsWith);
const StringPrototypeTrim = uncurryThis(String.prototype.trim);
const StringPrototypeSymbolIterator = uncurryThis(
  String.prototype[Symbol.iterator],
);
const StringPrototypeToLowerCase = uncurryThis(String.prototype.toLowerCase);
const StringPrototypeValueOf = uncurryThis(String.prototype.valueOf);
const StringPrototypeReplaceAll = uncurryThis(String.prototype.replaceAll);

const StringIterator = {
  prototype: Reflect.getPrototypeOf(String.prototype[Symbol.iterator]()),
};
const StringIteratorPrototype = StringIterator.prototype as Iterator<string>;
const StringIteratorPrototypeNext = uncurryThis(StringIteratorPrototype.next);

const SymbolIterator = Symbol.iterator;
const SymbolToPrimitive = Symbol.toPrimitive;
const SymbolToStringTag = Symbol.toStringTag;
const SymbolPrototypeToString = uncurryThis(Symbol.prototype.toString);
const SymbolPrototypeValueOf = uncurryThis(Symbol.prototype.valueOf);

const TypedArrayPrototypeGetLength = uncurryGetter(
  TypedArrayPrototype,
  "length",
);

const TypedArray = TypedArrayPrototype.constructor;

const WeakMapPrototype = WeakMap.prototype;

const WeakSetPrototype = WeakSet.prototype;

const createSafeIterator = <T, TReturn, TNext>(
  factory: (self: T) => IterableIterator<T>,
  next: (...args: [] | [TNext]) => IteratorResult<T, TReturn>,
) => {
  class SafeIterator implements IterableIterator<T> {
    _iterator: any;
    constructor(iterable: T) {
      this._iterator = factory(iterable);
    }
    next() {
      return next(this._iterator);
    }
    [Symbol.iterator]() {
      return this;
    }
    [SymbolIterator]() {
      return this;
    }
  }
  ObjectSetPrototypeOf(SafeIterator.prototype, null);
  ObjectFreeze(SafeIterator.prototype);
  ObjectFreeze(SafeIterator);
  return SafeIterator;
};

const copyProps = (src: object, dest: object) => {
  ArrayPrototypeForEach(ReflectOwnKeys(src), (key) => {
    if (!ReflectGetOwnPropertyDescriptor(dest, key)) {
      ReflectDefineProperty(dest, key, {
        __proto__: null,
        ...ReflectGetOwnPropertyDescriptor(src, key),
      } as PropertyDescriptor);
    }
  });
};

interface Constractable<T> extends NewableFunction {
  new (...args: any[]): T;
}
const makeSafe = <T, C extends Constractable<any>>(unsafe: C, safe: C) => {
  if (SymbolIterator in unsafe.prototype) {
    const dummy = new unsafe();
    let next;

    ArrayPrototypeForEach(ReflectOwnKeys(unsafe.prototype), (key) => {
      if (!ReflectGetOwnPropertyDescriptor(safe.prototype, key)) {
        const desc = ReflectGetOwnPropertyDescriptor(unsafe.prototype, key);
        if (
          desc &&
          typeof desc.value === "function" &&
          desc.value.length === 0 &&
          SymbolIterator in (FunctionPrototypeCall(desc.value, dummy) ?? {})
        ) {
          const createIterator = uncurryThis(desc.value) as unknown as (
            val: T,
          ) => IterableIterator<any>;
          next ??= uncurryThis(createIterator(dummy).next);
          const SafeIterator = createSafeIterator(createIterator, next);
          desc.value = function () {
            return new SafeIterator(this as unknown as T);
          };
        }
        ReflectDefineProperty(safe.prototype, key, {
          __proto__: null,
          ...desc,
        } as PropertyDescriptor);
      }
    });
  } else {
    copyProps(unsafe.prototype, safe.prototype);
  }
  copyProps(unsafe, safe);

  ObjectSetPrototypeOf(safe.prototype, null);
  ObjectFreeze(safe.prototype);
  ObjectFreeze(safe);
  return safe;
};
const SafeStringIterator = createSafeIterator(
  StringPrototypeSymbolIterator,
  // @ts-ignore Works in JS
  StringIteratorPrototypeNext,
);
const SafeMap = makeSafe(
  Map,
  class SafeMap<K, V> extends Map<K, V> {
    constructor(entries?: readonly (readonly [K, V])[] | null) {
      super(entries);
    }
  },
);
const SafeSet = makeSafe(
  Set,
  class SafeSet<T = any> extends Set<T> {
    constructor(values?: readonly T[] | null) {
      super(values);
    }
  },
);

const primordials = OBJECT.assign(OBJECT.create(null) as {}, {
  Array,
  ArrayBuffer,
  ArrayBufferPrototype,
  ArrayIsArray,
  ArrayPrototype,
  ArrayPrototypeFilter,
  ArrayPrototypeForEach,
  ArrayPrototypeIncludes,
  ArrayPrototypeIndexOf,
  ArrayPrototypeJoin,
  ArrayPrototypeMap,
  ArrayPrototypePop,
  ArrayPrototypePush,
  ArrayPrototypePushApply,
  ArrayPrototypeSlice,
  ArrayPrototypeSort,
  ArrayPrototypeSplice,
  ArrayPrototypeUnshift,
  BigIntPrototypeValueOf,
  Boolean,
  BooleanPrototype,
  BooleanPrototypeValueOf,
  DataView,
  DataViewPrototype,
  Date,
  DatePrototype,
  DatePrototypeGetTime,
  DatePrototypeToISOString,
  DatePrototypeToString,
  Error,
  ErrorPrototype,
  ErrorPrototypeToString,
  Float32Array,
  Float64Array,
  Function,
  Int16Array,
  Int32Array,
  Int8Array,
  FunctionPrototype,
  FunctionPrototypeBind,
  FunctionPrototypeCall,
  FunctionPrototypeSymbolHasInstance,
  FunctionPrototypeToString,
  globalThis,
  JSONStringify,
  Map,
  MapPrototype,
  MapPrototypeEntries,
  MapPrototypeGetSize,
  MathFloor,
  MathMax,
  MathMin,
  MathRound,
  MathSqrt,
  MathTrunc,
  Number,
  NumberIsFinite,
  NumberIsNaN,
  NumberParseFloat,
  NumberParseInt,
  NumberPrototype,
  NumberPrototypeToString,
  NumberPrototypeValueOf,
  Object,
  ObjectAssign,
  ObjectDefineProperty,
  ObjectGetOwnPropertyDescriptor,
  ObjectGetOwnPropertyNames,
  ObjectGetOwnPropertySymbols,
  ObjectGetPrototypeOf,
  ObjectIs,
  ObjectKeys,
  ObjectPrototype,
  ObjectPrototypeHasOwnProperty,
  ObjectPrototypePropertyIsEnumerable,
  ObjectSeal,
  ObjectSetPrototypeOf,
  Promise,
  PromisePrototype,
  ReflectApply,
  ReflectOwnKeys,
  RegExp,
  RegExpPrototype,
  RegExpPrototypeExec,
  RegExpPrototypeSymbolReplace,
  RegExpPrototypeSymbolSplit,
  RegExpPrototypeToString,
  SafeMap,
  SafeSet,
  SafeStringIterator,
  Set,
  SetPrototype,
  SetPrototypeGetSize,
  SetPrototypeValues,
  String,
  StringPrototype,
  StringPrototypeCharCodeAt,
  StringPrototypeCodePointAt,
  StringPrototypeEndsWith,
  StringPrototypeIncludes,
  StringPrototypeIndexOf,
  StringPrototypeLastIndexOf,
  StringPrototypeNormalize,
  StringPrototypePadEnd,
  StringPrototypePadStart,
  StringPrototypeRepeat,
  StringPrototypeReplace,
  StringPrototypeReplaceAll,
  StringPrototypeSlice,
  StringPrototypeSplit,
  StringPrototypeStartsWith,
  StringPrototypeToLowerCase,
  StringPrototypeTrim,
  StringPrototypeValueOf,
  SymbolIterator,
  SymbolPrototypeToString,
  SymbolPrototypeValueOf,
  SymbolToPrimitive,
  SymbolToStringTag,
  TypedArray,
  TypedArrayPrototype,
  TypedArrayPrototypeGetLength,
  TypedArrayPrototypeGetSymbolToStringTag,
  Uint8Array,
  Uint16Array,
  Uint8ClampedArray,
  Uint32Array,
  uncurryThis,
  WeakMap,
  WeakMapPrototype,
  WeakSet,
  WeakSetPrototype,
});

SafeObject.freeze(primordials);

export { primordials };
