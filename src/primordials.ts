// A fork of:
// https://github.com/isaacs/node-primordials/blob/main/src/index.ts,
// ... which is itself a TypeScript port of:
// https://github.com/nodejs/node/blob/main/lib/internal/per_context/primordials.js
//
// The fork is mostly just to remove the hard dependency on eval(), which is not
// implemented by engines such as Hermes:
// https://github.com/facebook/hermes/issues/957
//
// See LICENSE-node.txt and LICENSE-node-primordials.md in the root of this repo
// for licensing.

export {
  applyBind,
  hardenRegExp,
  staticApply,
  uncurryThis,
  uncurryGetter,
  uncurrySetter,
  uncurryMethod,
  staticCall,
  maybeStaticCall,

  // globals
  GLOBALTHIS as globalThis,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  escape,
  unescape,

  //
  AggregateError,
  AggregateErrorLength,
  AggregateErrorName,
  AggregateErrorPrototype,

  //
  Array,
  ArrayFrom,
  ArrayGetSymbolSpecies,
  ArrayIsArray,
  ArrayIterator,
  ArrayIteratorPrototype,
  ArrayIteratorPrototypeNext,
  ArrayIteratorPrototypeSymbolToStringTag,
  ArrayLength,
  ArrayName,
  ArrayOf,
  ArrayOfApply,
  ArrayPrototype,
  ArrayPrototypeConcat,
  ArrayPrototypeCopyWithin,
  ArrayPrototypeEntries,
  ArrayPrototypeEvery,
  ArrayPrototypeFill,
  ArrayPrototypeFilter,
  ArrayPrototypeFind,
  ArrayPrototypeFindIndex,
  ArrayPrototypeFlat,
  ArrayPrototypeFlatMap,
  ArrayPrototypeForEach,
  ArrayPrototypeIncludes,
  ArrayPrototypeIndexOf,
  ArrayPrototypeJoin,
  ArrayPrototypeKeys,
  ArrayPrototypeLastIndexOf,
  ArrayPrototypeLength,
  ArrayPrototypeMap,
  ArrayPrototypePop,
  ArrayPrototypePush,
  ArrayPrototypePushApply,
  ArrayPrototypeReduce,
  ArrayPrototypeReduceRight,
  ArrayPrototypeReverse,
  ArrayPrototypeShift,
  ArrayPrototypeSlice,
  ArrayPrototypeSome,
  ArrayPrototypeSort,
  ArrayPrototypeSplice,
  ArrayPrototypeSymbolIterator,
  ArrayPrototypeSymbolUnscopables,
  ArrayPrototypeToLocaleString,
  ArrayPrototypeToString,
  ArrayPrototypeUnshift,
  ArrayPrototypeUnshiftApply,
  ArrayPrototypeValues,

  //
  ArrayBuffer,
  ArrayBufferGetSymbolSpecies,
  ArrayBufferIsView,
  ArrayBufferLength,
  ArrayBufferName,
  ArrayBufferPrototype,
  ArrayBufferPrototypeGetByteLength,
  ArrayBufferPrototypeSlice,
  ArrayBufferPrototypeSymbolToStringTag,

  //
  AsyncIteratorPrototype,

  //
  BigInt,
  BigInt64Array,
  BigInt64ArrayBYTES_PER_ELEMENT,
  BigInt64ArrayLength,
  BigInt64ArrayName,
  BigInt64ArrayPrototype,
  BigInt64ArrayPrototypeBYTES_PER_ELEMENT,
  BigIntAsIntN,
  BigIntAsUintN,
  BigIntLength,
  BigIntName,
  BigIntPrototype,
  BigIntPrototypeSymbolToStringTag,
  BigIntPrototypeToLocaleString,
  BigIntPrototypeToString,
  BigIntPrototypeValueOf,

  //
  BigUint64Array,
  BigUint64ArrayBYTES_PER_ELEMENT,
  BigUint64ArrayLength,
  BigUint64ArrayName,
  BigUint64ArrayPrototype,
  BigUint64ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Boolean,
  BooleanLength,
  BooleanName,
  BooleanPrototype,
  BooleanPrototypeToString,
  BooleanPrototypeValueOf,

  //
  DataView,
  DataViewLength,
  DataViewName,
  DataViewPrototype,
  DataViewPrototypeGetBigInt64,
  DataViewPrototypeGetBigUint64,
  DataViewPrototypeGetBuffer,
  DataViewPrototypeGetByteLength,
  DataViewPrototypeGetByteOffset,
  DataViewPrototypeGetFloat32,
  DataViewPrototypeGetFloat64,
  DataViewPrototypeGetInt16,
  DataViewPrototypeGetInt32,
  DataViewPrototypeGetInt8,
  DataViewPrototypeGetUint16,
  DataViewPrototypeGetUint32,
  DataViewPrototypeGetUint8,
  DataViewPrototypeSetBigInt64,
  DataViewPrototypeSetBigUint64,
  DataViewPrototypeSetFloat32,
  DataViewPrototypeSetFloat64,
  DataViewPrototypeSetInt16,
  DataViewPrototypeSetInt32,
  DataViewPrototypeSetInt8,
  DataViewPrototypeSetUint16,
  DataViewPrototypeSetUint32,
  DataViewPrototypeSetUint8,
  DataViewPrototypeSymbolToStringTag,

  //
  Date,
  DateLength,
  DateName,
  DateNow,
  DateParse,
  DatePrototype,
  DatePrototypeGetDate,
  DatePrototypeGetDay,
  DatePrototypeGetFullYear,
  DatePrototypeGetHours,
  DatePrototypeGetMilliseconds,
  DatePrototypeGetMinutes,
  DatePrototypeGetMonth,
  DatePrototypeGetSeconds,
  DatePrototypeGetTime,
  DatePrototypeGetTimezoneOffset,
  DatePrototypeGetUTCDate,
  DatePrototypeGetUTCDay,
  DatePrototypeGetUTCFullYear,
  DatePrototypeGetUTCHours,
  DatePrototypeGetUTCMilliseconds,
  DatePrototypeGetUTCMinutes,
  DatePrototypeGetUTCMonth,
  DatePrototypeGetUTCSeconds,
  DatePrototypeGetYear,
  DatePrototypeSetDate,
  DatePrototypeSetFullYear,
  DatePrototypeSetHours,
  DatePrototypeSetMilliseconds,
  DatePrototypeSetMinutes,
  DatePrototypeSetMonth,
  DatePrototypeSetSeconds,
  DatePrototypeSetTime,
  DatePrototypeSetUTCDate,
  DatePrototypeSetUTCFullYear,
  DatePrototypeSetUTCHours,
  DatePrototypeSetUTCMilliseconds,
  DatePrototypeSetUTCMinutes,
  DatePrototypeSetUTCMonth,
  DatePrototypeSetUTCSeconds,
  DatePrototypeSetYear,
  DatePrototypeSymbolToPrimitive,
  DatePrototypeToDateString,
  DatePrototypeToGMTString,
  DatePrototypeToISOString,
  DatePrototypeToJSON,
  DatePrototypeToLocaleDateString,
  DatePrototypeToLocaleString,
  DatePrototypeToLocaleTimeString,
  DatePrototypeToString,
  DatePrototypeToTimeString,
  DatePrototypeToUTCString,
  DatePrototypeValueOf,
  DateUTC,

  //
  Error,
  ErrorCaptureStackTrace,
  ErrorLength,
  ErrorName,
  ErrorPrototype,
  ErrorPrototypeMessage,
  ErrorPrototypeName,
  ErrorPrototypeToString,

  //
  EvalError,
  EvalErrorLength,
  EvalErrorName,
  EvalErrorPrototype,
  EvalErrorPrototypeMessage,
  EvalErrorPrototypeName,

  //
  FinalizationRegistry,
  FinalizationRegistryLength,
  FinalizationRegistryName,
  FinalizationRegistryPrototype,
  FinalizationRegistryPrototypeRegister,
  FinalizationRegistryPrototypeSymbolToStringTag,
  FinalizationRegistryPrototypeUnregister,

  //
  Float32Array,
  Float32ArrayBYTES_PER_ELEMENT,
  Float32ArrayLength,
  Float32ArrayName,
  Float32ArrayPrototype,
  Float32ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Float64Array,
  Float64ArrayBYTES_PER_ELEMENT,
  Float64ArrayLength,
  Float64ArrayName,
  Float64ArrayPrototype,
  Float64ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Function,
  FunctionLength,
  FunctionName,
  FunctionPrototype,
  FunctionPrototypeApply,
  FunctionPrototypeBind,
  FunctionPrototypeCall,
  FunctionPrototypeGetArguments,
  FunctionPrototypeGetCaller,
  FunctionPrototypeLength,
  FunctionPrototypeName,
  FunctionPrototypeSetArguments,
  FunctionPrototypeSetCaller,
  FunctionPrototypeSymbolHasInstance,
  FunctionPrototypeToString,

  //
  Int16Array,
  Int16ArrayBYTES_PER_ELEMENT,
  Int16ArrayLength,
  Int16ArrayName,
  Int16ArrayPrototype,
  Int16ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Int32Array,
  Int32ArrayBYTES_PER_ELEMENT,
  Int32ArrayLength,
  Int32ArrayName,
  Int32ArrayPrototype,
  Int32ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Int8Array,
  Int8ArrayBYTES_PER_ELEMENT,
  Int8ArrayLength,
  Int8ArrayName,
  Int8ArrayPrototype,
  Int8ArrayPrototypeBYTES_PER_ELEMENT,

  //
  JSON,
  JSONParse,
  JSONStringify,
  JSONSymbolToStringTag,

  //
  Map,
  MapGetSymbolSpecies,
  MapLength,
  MapName,
  MapPrototype,
  MapPrototypeClear,
  MapPrototypeDelete,
  MapPrototypeEntries,
  MapPrototypeForEach,
  MapPrototypeGet,
  MapPrototypeGetSize,
  MapPrototypeHas,
  MapPrototypeKeys,
  MapPrototypeSet,
  MapPrototypeSymbolIterator,
  MapPrototypeSymbolToStringTag,
  MapPrototypeValues,

  //
  Math,
  MathAbs,
  MathAcos,
  MathAcosh,
  MathAsin,
  MathAsinh,
  MathAtan,
  MathAtan2,
  MathAtanh,
  MathCbrt,
  MathCeil,
  MathClz32,
  MathCos,
  MathCosh,
  MathE,
  MathExp,
  MathExpm1,
  MathFloor,
  MathFround,
  MathHypot,
  MathHypotApply,
  MathImul,
  MathLN10,
  MathLN2,
  MathLOG10E,
  MathLOG2E,
  MathLog,
  MathLog10,
  MathLog1p,
  MathLog2,
  MathMax,
  MathMaxApply,
  MathMin,
  MathMinApply,
  MathPI,
  MathPow,
  MathRandom,
  MathRound,
  MathSQRT1_2,
  MathSQRT2,
  MathSign,
  MathSin,
  MathSinh,
  MathSqrt,
  MathSymbolToStringTag,
  MathTan,
  MathTanh,
  MathTrunc,

  //
  Number,
  NumberEPSILON,
  NumberIsFinite,
  NumberIsInteger,
  NumberIsNaN,
  NumberIsSafeInteger,
  NumberLength,
  NumberMAX_SAFE_INTEGER,
  NumberMAX_VALUE,
  NumberMIN_SAFE_INTEGER,
  NumberMIN_VALUE,
  NumberNEGATIVE_INFINITY,
  NumberNaN,
  NumberName,
  NumberPOSITIVE_INFINITY,
  NumberParseFloat,
  NumberParseInt,
  NumberPrototype,
  NumberPrototypeToExponential,
  NumberPrototypeToFixed,
  NumberPrototypeToLocaleString,
  NumberPrototypeToPrecision,
  NumberPrototypeToString,
  NumberPrototypeValueOf,

  //
  OBJECT as Object,
  ObjectAssign,
  ObjectCreate,
  ObjectDefineProperties,
  ObjectDefineProperty,
  ObjectEntries,
  ObjectFreeze,
  ObjectFromEntries,
  ObjectGetOwnPropertyDescriptor,
  ObjectGetOwnPropertyDescriptors,
  ObjectGetOwnPropertyNames,
  ObjectGetOwnPropertySymbols,
  ObjectGetPrototypeOf,
  ObjectIs,
  ObjectIsExtensible,
  ObjectIsFrozen,
  ObjectIsSealed,
  ObjectKeys,
  ObjectLength,
  ObjectName,
  ObjectPreventExtensions,
  ObjectPrototype,
  ObjectPrototypeGet__proto__,
  ObjectPrototypeHasOwnProperty,
  ObjectPrototypeIsPrototypeOf,
  ObjectPrototypePropertyIsEnumerable,
  ObjectPrototypeSet__proto__,
  ObjectPrototypeToLocaleString,
  ObjectPrototypeToString,
  ObjectPrototypeValueOf,
  ObjectPrototype__defineGetter__,
  ObjectPrototype__defineSetter__,
  ObjectPrototype__lookupGetter__,
  ObjectPrototype__lookupSetter__,
  ObjectSeal,
  ObjectSetPrototypeOf,
  ObjectValues,

  //
  Promise,
  PromiseAll,
  PromiseAllSettled,
  PromiseAny,
  PromiseGetSymbolSpecies,
  PromiseLength,
  PromiseName,
  PromisePrototype,
  PromisePrototypeCatch,
  PromisePrototypeFinally,
  PromisePrototypeSymbolToStringTag,
  PromisePrototypeThen,
  PromiseRace,
  PromiseReject,
  PromiseResolve,

  //
  Proxy,
  ProxyLength,
  ProxyName,
  ProxyRevocable,

  //
  RangeError,
  RangeErrorLength,
  RangeErrorName,
  RangeErrorPrototype,
  RangeErrorPrototypeMessage,
  RangeErrorPrototypeName,

  //
  ReferenceError,
  ReferenceErrorLength,
  ReferenceErrorName,
  ReferenceErrorPrototype,
  ReferenceErrorPrototypeMessage,
  ReferenceErrorPrototypeName,

  //
  Reflect,
  ReflectApply,
  ReflectConstruct,
  ReflectDefineProperty,
  ReflectDeleteProperty,
  ReflectGet,
  ReflectGetOwnPropertyDescriptor,
  ReflectGetPrototypeOf,
  ReflectHas,
  ReflectIsExtensible,
  ReflectOwnKeys,
  ReflectPreventExtensions,
  ReflectSet,
  ReflectSetPrototypeOf,
  ReflectSymbolToStringTag,

  //
  RegExp,
  RegExpGet$1,
  RegExpGet$2,
  RegExpGet$3,
  RegExpGet$4,
  RegExpGet$5,
  RegExpGet$6,
  RegExpGet$7,
  RegExpGet$8,
  RegExpGet$9,
  RegExpGet$_,
  RegExpGetDollarAmp,
  RegExpGetDollarPlus,
  RegExpGetDollarSquo,
  RegExpGetDollarTick,
  RegExpGetInput,
  RegExpGetLastMatch,
  RegExpGetLastParen,
  RegExpGetLeftContext,
  RegExpGetRightContext,
  RegExpGetSymbolSpecies,
  RegExpLength,
  RegExpName,
  RegExpPrototype,
  RegExpPrototypeCompile,
  RegExpPrototypeExec,
  RegExpPrototypeGetDotAll,
  RegExpPrototypeGetFlags,
  RegExpPrototypeGetGlobal,
  RegExpPrototypeGetHasIndices,
  RegExpPrototypeGetIgnoreCase,
  RegExpPrototypeGetMultiline,
  RegExpPrototypeGetSource,
  RegExpPrototypeGetSticky,
  RegExpPrototypeGetUnicode,
  RegExpPrototypeSymbolMatch,
  RegExpPrototypeSymbolMatchAll,
  RegExpPrototypeSymbolReplace,
  RegExpPrototypeSymbolSearch,
  RegExpPrototypeSymbolSplit,
  RegExpPrototypeTest,
  RegExpPrototypeToString,
  RegExpSet$1,
  RegExpSet$2,
  RegExpSet$3,
  RegExpSet$4,
  RegExpSet$5,
  RegExpSet$6,
  RegExpSet$7,
  RegExpSet$8,
  RegExpSet$9,
  RegExpSet$_,
  RegExpSetDollarAmp,
  RegExpSetDollarPlus,
  RegExpSetDollarSquo,
  RegExpSetDollarTick,
  RegExpSetInput,
  RegExpSetLastMatch,
  RegExpSetLastParen,
  RegExpSetLeftContext,
  RegExpSetRightContext,

  //
  Set,
  SetGetSymbolSpecies,
  SetLength,
  SetName,
  SetPrototype,
  SetPrototypeAdd,
  SetPrototypeClear,
  SetPrototypeDelete,
  SetPrototypeEntries,
  SetPrototypeForEach,
  SetPrototypeGetSize,
  SetPrototypeHas,
  SetPrototypeKeys,
  SetPrototypeSymbolIterator,
  SetPrototypeSymbolToStringTag,
  SetPrototypeValues,

  //
  String,
  StringFromCharCode,
  StringFromCharCodeApply,
  StringFromCodePoint,
  StringFromCodePointApply,
  StringIterator,
  StringIteratorPrototype,
  StringIteratorPrototypeNext,
  StringIteratorPrototypeSymbolToStringTag,
  StringLength,
  StringName,
  StringPrototype,
  StringPrototypeAnchor,
  StringPrototypeBig,
  StringPrototypeBlink,
  StringPrototypeBold,
  StringPrototypeCharAt,
  StringPrototypeCharCodeAt,
  StringPrototypeCodePointAt,
  StringPrototypeConcat,
  StringPrototypeConcatApply,
  StringPrototypeEndsWith,
  StringPrototypeFixed,
  StringPrototypeFontcolor,
  StringPrototypeFontsize,
  StringPrototypeIncludes,
  StringPrototypeIndexOf,
  StringPrototypeItalics,
  StringPrototypeLastIndexOf,
  StringPrototypeLength,
  StringPrototypeLink,
  StringPrototypeLocaleCompare,
  StringPrototypeMatch,
  StringPrototypeMatchAll,
  StringPrototypeNormalize,
  StringPrototypePadEnd,
  StringPrototypePadStart,
  StringPrototypeRepeat,
  StringPrototypeReplace,
  StringPrototypeReplaceAll,
  StringPrototypeSearch,
  StringPrototypeSlice,
  StringPrototypeSmall,
  StringPrototypeSplit,
  StringPrototypeStartsWith,
  StringPrototypeStrike,
  StringPrototypeSub,
  StringPrototypeSubstr,
  StringPrototypeSubstring,
  StringPrototypeSup,
  StringPrototypeSymbolIterator,
  StringPrototypeToLocaleLowerCase,
  StringPrototypeToLocaleUpperCase,
  StringPrototypeToLowerCase,
  StringPrototypeToString,
  StringPrototypeToUpperCase,
  StringPrototypeTrim,
  StringPrototypeTrimEnd,
  StringPrototypeTrimLeft,
  StringPrototypeTrimRight,
  StringPrototypeTrimStart,
  StringPrototypeValueOf,
  StringRaw,

  //
  Symbol,
  SymbolAsyncIterator,
  SymbolFor,
  SymbolHasInstance,
  SymbolIsConcatSpreadable,
  SymbolIterator,
  SymbolKeyFor,
  SymbolLength,
  SymbolMatch,
  SymbolMatchAll,
  SymbolName,
  SymbolPrototype,
  SymbolPrototypeGetDescription,
  SymbolPrototypeSymbolToPrimitive,
  SymbolPrototypeSymbolToStringTag,
  SymbolPrototypeToString,
  SymbolPrototypeValueOf,
  SymbolReplace,
  SymbolSearch,
  SymbolSpecies,
  SymbolSplit,
  SymbolToPrimitive,
  SymbolToStringTag,
  SymbolUnscopables,

  //
  SyntaxError,
  SyntaxErrorLength,
  SyntaxErrorName,
  SyntaxErrorPrototype,
  SyntaxErrorPrototypeMessage,
  SyntaxErrorPrototypeName,

  //
  TypeError,
  TypeErrorLength,
  TypeErrorName,
  TypeErrorPrototype,
  TypeErrorPrototypeMessage,
  TypeErrorPrototypeName,

  //
  TypedArray,
  TypedArrayFrom,
  TypedArrayGetSymbolSpecies,
  TypedArrayLength,
  TypedArrayName,
  TypedArrayOf,
  TypedArrayOfApply,
  TypedArrayPrototype,
  TypedArrayPrototypeCopyWithin,
  TypedArrayPrototypeEntries,
  TypedArrayPrototypeEvery,
  TypedArrayPrototypeFill,
  TypedArrayPrototypeFilter,
  TypedArrayPrototypeFind,
  TypedArrayPrototypeFindIndex,
  TypedArrayPrototypeForEach,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteLength,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetLength,
  TypedArrayPrototypeGetSymbolToStringTag,
  TypedArrayPrototypeIncludes,
  TypedArrayPrototypeIndexOf,
  TypedArrayPrototypeJoin,
  TypedArrayPrototypeKeys,
  TypedArrayPrototypeLastIndexOf,
  TypedArrayPrototypeMap,
  TypedArrayPrototypeReduce,
  TypedArrayPrototypeReduceRight,
  TypedArrayPrototypeReverse,
  TypedArrayPrototypeSet,
  TypedArrayPrototypeSlice,
  TypedArrayPrototypeSome,
  TypedArrayPrototypeSort,
  TypedArrayPrototypeSubarray,
  TypedArrayPrototypeSymbolIterator,
  TypedArrayPrototypeToLocaleString,
  TypedArrayPrototypeToString,
  TypedArrayPrototypeValues,

  //
  URIError,
  URIErrorLength,
  URIErrorName,
  URIErrorPrototype,
  URIErrorPrototypeMessage,
  URIErrorPrototypeName,

  //
  URL,
  URLCreateObjectURL,
  URLRevokeObjectURL,

  //
  Uint16Array,
  Uint16ArrayBYTES_PER_ELEMENT,
  Uint16ArrayLength,
  Uint16ArrayName,
  Uint16ArrayPrototype,
  Uint16ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Uint32Array,
  Uint32ArrayBYTES_PER_ELEMENT,
  Uint32ArrayLength,
  Uint32ArrayName,
  Uint32ArrayPrototype,
  Uint32ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Uint8Array,
  Uint8ArrayBYTES_PER_ELEMENT,
  Uint8ArrayLength,
  Uint8ArrayName,
  Uint8ArrayPrototype,
  Uint8ArrayPrototypeBYTES_PER_ELEMENT,

  //
  Uint8ClampedArray,
  Uint8ClampedArrayBYTES_PER_ELEMENT,
  Uint8ClampedArrayLength,
  Uint8ClampedArrayName,
  Uint8ClampedArrayPrototype,
  Uint8ClampedArrayPrototypeBYTES_PER_ELEMENT,

  //
  WeakMap,
  WeakMapLength,
  WeakMapName,
  WeakMapPrototype,
  WeakMapPrototypeDelete,
  WeakMapPrototypeGet,
  WeakMapPrototypeHas,
  WeakMapPrototypeSet,
  WeakMapPrototypeSymbolToStringTag,
  WeakRef,
  WeakRefLength,
  WeakRefName,
  WeakRefPrototype,
  WeakRefPrototypeDeref,
  WeakRefPrototypeSymbolToStringTag,

  //
  WeakSet,
  WeakSetLength,
  WeakSetName,
  WeakSetPrototype,
  WeakSetPrototypeAdd,
  WeakSetPrototypeDelete,
  WeakSetPrototypeHas,
  WeakSetPrototypeSymbolToStringTag,

  //
  makeSafe,
  SafeMap,
  SafeWeakMap,
  SafeSet,
  SafeWeakSet,
  SafeFinalizationRegistry,
  SafeWeakRef,
  SafePromise,
  SafeStringIterator,
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
  BigInt64Array,
  BigUint64Array,
  Boolean,
  Date,
  DataView,
  Error,
  EvalError,
  FinalizationRegistry,
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
  Proxy,
  RangeError,
  ReferenceError,
  Reflect,
  RegExp,
  Set,
  String,
  Symbol,
  SyntaxError,
  TypeError,
  URIError,
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
  URL,
  WeakMap,
  WeakRef,
  WeakSet,

  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  escape,
  unescape,
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

type TypedArrayOf = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  ...args: Parameters<TypedArrayConstructor<T>["of"]>
) => T;

type TypedArrayOfApply = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  args: Parameters<TypedArrayConstructor<T>["of"]>,
) => T;

type TypedArrayFrom = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  ...args: Parameters<TypedArrayConstructor<T>["from"]>
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
const Uint8ArrayFrom = Uint8Array.from;
const Int8ArrayFrom = Int8Array.from;
const Uint16ArrayFrom = Uint16Array.from;
const Int16ArrayFrom = Int16Array.from;
const Uint32ArrayFrom = Uint32Array.from;
const Int32ArrayFrom = Int32Array.from;
const Uint8ClampedArrayFrom = Uint8ClampedArray.from;
const Float32ArrayFrom = Float32Array.from;
const Float64ArrayFrom = Float64Array.from;

const TypedArrayOf = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  ...args: Parameters<TypedArrayConstructor<T>["of"]>
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
  return uncurryThis(fn)(ctor, ...args) as T;
};

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

const TypedArrayFrom: TypedArrayFrom = <T extends TypedArray>(
  ctor: TypedArrayConstructor<T>,
  ...args: Parameters<TypedArrayConstructor<T>["from"]>
): T => {
  const fn =
    ctor === Uint8Array
      ? Uint8ArrayFrom
      : ctor === Int8Array
        ? Int8ArrayFrom
        : ctor === Uint16Array
          ? Uint16ArrayFrom
          : ctor === Int16Array
            ? Int16ArrayFrom
            : ctor === Uint32Array
              ? Uint32ArrayFrom
              : ctor === Int32Array
                ? Int32ArrayFrom
                : ctor === Uint8ClampedArray
                  ? Uint8ClampedArrayFrom
                  : ctor === Float32Array
                    ? Float32ArrayFrom
                    : ctor === Float64Array
                      ? Float64ArrayFrom
                      : undefined;
  if (!fn) {
    throw new TypeError("invalid TypedArray constructor: " + ctor);
  }
  return uncurryThis(fn)(ctor, ...args) as T;
};

const SafeObject = OBJECT.defineProperties(
  OBJECT.create(null),
  OBJECT.getOwnPropertyDescriptors(OBJECT) as PropertyDescriptorMap,
);
OBJECT.freeze(SafeObject);
// fast version:
// const SafeObject = Object

const cloneSafe = <T extends {}>(obj: T): T => {
  const safe = SafeObject.defineProperties(
    SafeObject.create(null),
    SafeObject.getOwnPropertyDescriptors(obj) as PropertyDescriptorMap,
  );
  SafeObject.freeze(safe);
  return safe;
};
// fast version:
// cloneSafe = (o: T) => o

const FunctionPrototype = cloneSafe(Function.prototype);
const { apply, bind, call } = Function.prototype;

const uncurryThis: <T extends (...args: any[]) => any>(
  fn: T,
) => UncurryThis<T> = bind.bind(call);
// fast version:
// const uncurryThis = (fn: T) =>
//   (thisp: ThisParameterType, ...args: Parameters<T>) =>
//     fn.call(thisp, ...args)

const applyBind: <T extends (...args: any[]) => any>(
  fn: T,
) => UncurryThisStaticApply<T> = bind.bind(apply);
// fast version:
// const applyBind = (fn: T) =>
//   (thisp: ThisParameterType, args: Parameters<T>) =>
//     fn.apply(thisp, args)

const staticApply: <T extends (...args: any[]) => any>(
  fn: T,
) => StaticApply<T> = <T extends (...args: any[]) => any>(fn: T) => {
  return bind.bind(apply)(fn, null);
};
// fast version:
// const staticApply = (fn: T) =>
//   (args: Parameters<T>) =>
//     fn.apply(null, args)

const staticCall: <T extends (...args: any[]) => any>(fn: T) => StaticCall<T> =
  <T extends (...args: any[]) => any>(fn: T) =>
  (...args: Parameters<T>) =>
    fn(...args);

const maybeStaticCall: <T extends ((...args: any[]) => any) | undefined>(
  fn?: T | undefined,
) => undefined | StaticCall<Exclude<T, undefined>> = <
  T extends ((...args: any[]) => any) | undefined,
>(
  fn?: T,
) => (!fn ? fn : staticCall(fn));

const uncurryMethod: <O extends any, K extends keyof O, T = O>(
  obj: O,
  k: K,
) => UncurryMethod<O, K, T> = <O extends any, K extends keyof O>(
  obj: O,
  k: K,
) => bind.bind(call)(obj[k], null);
// fast version:
// const uncurryMethod = (obj: O, k: K) =>
//   (thisp: ThisParameterType, ...args: Parameters<O[K]>) =>
//     obj[k].call(thisp, ...args)

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

const uncurrySetter = <O extends object, K extends keyof O, T = O>(
  obj: O,
  k: K,
): UncurrySetter<O, K, T> => {
  const desc = SafeReflect.getOwnPropertyDescriptor(obj, k);
  if (desc?.set) {
    return uncurryThis(desc.set) as UncurrySetter<O, K, T>;
  }
  throw new Error("invalid uncurrySetter call: " + String(k));
};

const FunctionPrototypeCall = uncurryThis(call);

// local shorthand
const fpc = FunctionPrototypeCall;

const ArrayPrototype = Array.prototype;

/* c8 ignore start */
const getValue = <T extends {}, K extends keyof T>(obj: T, prop: K): T[K] => {
  const desc = SafeObject.getOwnPropertyDescriptor(obj, prop);
  if (!desc) {
    throw new Error("property not found: " + String(prop));
  }
  if ("get" in desc) {
    return fpc(desc.get, obj);
  } else if ("value" in desc) {
    return desc.value;
  } else {
    throw new Error("property not readable: " + String(prop));
  }
};

// Get a copy of a regular expression using our local ctor
// this isn't actually all that hardened, users can still modify
// the getter for 'source' and 'flags'
const hardenRegExp = (re: RegExp) =>
  new RegExp(getValue(re, "source"), getValue(re, "flags"));
/* c8 ignore stop */

const SafeReflect = Reflect;

const AggregateError = GLOBALTHIS.AggregateError;
/* c8 ignore start */
const AggregateErrorLength = AggregateError?.length;
const AggregateErrorName = AggregateError?.name;
const AggregateErrorPrototype = AggregateError?.prototype || {};
const AggregateErrorPrototypeMessage = "";
const AggregateErrorPrototypeName = "AggregateError";
/* c8 ignore stop */

const ArrayFrom = staticCall(Array.from);
const ArrayIsArray = staticCall(Array.isArray);
const ArrayLength = Array.length;
const ArrayName = Array.name;
const ArrayOf = staticCall(Array.of);
const ArrayOfApply = staticApply(Array.of);
const ArrayPrototypeConcat = uncurryThis(ArrayPrototype.concat);
const ArrayPrototypeLength = 0;
const ArrayPrototypeCopyWithin = uncurryThis(ArrayPrototype.copyWithin);
const ArrayPrototypeEntries = uncurryThis(ArrayPrototype.entries);
const ArrayPrototypeEvery = uncurryThis(ArrayPrototype.every);
const ArrayPrototypeFill = uncurryThis(ArrayPrototype.fill);
const ArrayPrototypeFilter = uncurryThis(ArrayPrototype.filter);
const ArrayPrototypeFind = uncurryThis(ArrayPrototype.find);
const ArrayPrototypeFindIndex = uncurryThis(ArrayPrototype.findIndex);
const ArrayPrototypeFlat = uncurryThis(ArrayPrototype.flat);
const ArrayPrototypeFlatMap = uncurryThis(ArrayPrototype.flatMap);
const ArrayPrototypeForEach = uncurryThis(ArrayPrototype.forEach);
const ArrayPrototypeIncludes = uncurryThis(ArrayPrototype.includes);
const ArrayPrototypeIndexOf = uncurryThis(ArrayPrototype.indexOf);
const ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
const ArrayPrototypeKeys = uncurryThis(ArrayPrototype.keys);
const ArrayPrototypeLastIndexOf = uncurryThis(ArrayPrototype.lastIndexOf);
const ArrayPrototypeMap = uncurryThis(ArrayPrototype.map);
const ArrayPrototypePop = uncurryThis(ArrayPrototype.pop);
const ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
const ArrayPrototypePushApply = applyBind(ArrayPrototype.push);
const ArrayPrototypeReduce = uncurryThis(ArrayPrototype.reduce);
const ArrayPrototypeReduceRight = uncurryThis(ArrayPrototype.reduceRight);
const ArrayPrototypeReverse = uncurryThis(ArrayPrototype.reverse);
const ArrayPrototypeShift = uncurryThis(ArrayPrototype.shift);
const ArrayPrototypeSlice = uncurryThis(ArrayPrototype.slice);
const ArrayPrototypeSome = uncurryThis(ArrayPrototype.some);
const ArrayPrototypeSort = uncurryThis(ArrayPrototype.sort);
const ArrayPrototypeSplice = uncurryThis(ArrayPrototype.splice);
const ArrayPrototypeSymbolIterator = uncurryMethod(
  Array.prototype,
  Symbol.iterator,
);
const ArrayPrototypeSymbolUnscopables = Array.prototype[Symbol.unscopables];
const ArrayPrototypeToLocaleString = uncurryThis(ArrayPrototype.toLocaleString);
const ArrayPrototypeToString = uncurryThis(ArrayPrototype.toString);
const ArrayPrototypeUnshift = uncurryThis(ArrayPrototype.unshift);
const ArrayPrototypeUnshiftApply = applyBind(ArrayPrototype.unshift);
const ArrayPrototypeValues = uncurryThis(ArrayPrototype.values);
const ArrayGetSymbolSpecies = uncurryGetter(Array, Symbol.species);

const ArrayIterator = {
  prototype: Reflect.getPrototypeOf(ArrayPrototype[Symbol.iterator]()),
};
const ArrayIteratorPrototype = ArrayIterator.prototype as Iterator<any>;
const ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
const ArrayIteratorPrototypeSymbolToStringTag = (
  ArrayIteratorPrototype as unknown as { [k: PropertyKey]: string }
)[Symbol.toStringTag];

const ArrayBufferGetSymbolSpecies = uncurryGetter(ArrayBuffer, Symbol.species);
const ArrayBufferIsView = uncurryThis(ArrayBuffer.isView);
const ArrayBufferName = ArrayBuffer.name;
const ArrayBufferLength = ArrayBuffer.length;
const ArrayBufferPrototype = ArrayBuffer.prototype;
const ArrayBufferPrototypeGetByteLength = uncurryGetter(
  ArrayBuffer.prototype,
  "byteLength",
);
const ArrayBufferPrototypeSlice = uncurryThis(ArrayBufferPrototype.slice);
const ArrayBufferPrototypeSymbolToStringTag =
  ArrayBufferPrototype[Symbol.toStringTag];

const AsyncIteratorPrototype = Reflect.getPrototypeOf(
  (
    Reflect.getPrototypeOf(async function* () {}) as {
      prototype: AsyncGenerator;
      constructor: () => AsyncGenerator;
    }
  ).prototype,
) as Object;

const BigIntAsIntN = uncurryThis(BigInt.asIntN);
const BigIntAsUintN = uncurryThis(BigInt.asUintN);
const BigIntLength = BigInt.length;
const BigIntName = BigInt.name;
const BigIntPrototype = BigInt.prototype;
const BigIntPrototypeToLocaleString = uncurryThis(
  BigInt.prototype.toLocaleString,
);
const BigIntPrototypeToString = uncurryThis(BigInt.prototype.toString);
const BigIntPrototypeValueOf = uncurryThis(BigInt.prototype.valueOf);
const BigIntPrototypeSymbolToStringTag = BigInt.prototype[Symbol.toStringTag];

const BigInt64ArrayBYTES_PER_ELEMENT = BigInt64Array.BYTES_PER_ELEMENT;
const BigInt64ArrayLength = BigInt64Array.length;
const BigInt64ArrayName = BigInt64Array.name;
const BigInt64ArrayPrototype = BigInt64Array.prototype;
const BigInt64ArrayPrototypeBYTES_PER_ELEMENT =
  BigInt64Array.prototype.BYTES_PER_ELEMENT;

const BigUint64ArrayBYTES_PER_ELEMENT = BigUint64Array.BYTES_PER_ELEMENT;
const BigUint64ArrayLength = BigUint64Array.length;
const BigUint64ArrayName = BigUint64Array.name;
const BigUint64ArrayPrototype = BigUint64Array.prototype;
const BigUint64ArrayPrototypeBYTES_PER_ELEMENT =
  BigUint64ArrayPrototype.BYTES_PER_ELEMENT;

const BooleanLength = Boolean.length;
const BooleanName = Boolean.name;
const BooleanPrototype = Boolean.prototype;
const BooleanPrototypeToString = uncurryThis(Boolean.prototype.toString);
const BooleanPrototypeValueOf = uncurryThis(Boolean.prototype.valueOf);

const DataViewLength = DataView.length;
const DataViewName = DataView.name;
const DataViewPrototype = DataView.prototype;
const DataViewPrototypeGetBigInt64 = uncurryThis(
  DataView.prototype.getBigInt64,
);
const DataViewPrototypeGetBuffer = uncurryGetter(DataView.prototype, "buffer");
const DataViewPrototypeGetByteLength = uncurryGetter(
  DataView.prototype,
  "byteLength",
);
const DataViewPrototypeGetByteOffset = uncurryGetter(
  DataView.prototype,
  "byteOffset",
);
const DataViewPrototypeGetFloat32 = uncurryThis(DataView.prototype.getFloat32);
const DataViewPrototypeGetFloat64 = uncurryThis(DataView.prototype.getFloat64);
const DataViewPrototypeGetInt16 = uncurryThis(DataView.prototype.getInt16);
const DataViewPrototypeGetInt32 = uncurryThis(DataView.prototype.getInt32);
const DataViewPrototypeGetInt8 = uncurryThis(DataView.prototype.getInt8);
const DataViewPrototypeGetUint16 = uncurryThis(DataView.prototype.getUint16);
const DataViewPrototypeGetUint32 = uncurryThis(DataView.prototype.getUint32);
const DataViewPrototypeGetUint8 = uncurryThis(DataView.prototype.getUint8);
const DataViewPrototypeSetBigInt64 = uncurryThis(
  DataView.prototype.setBigInt64,
);
const DataViewPrototypeSetBigUint64 = uncurryThis(
  DataView.prototype.setBigUint64,
);
const DataViewPrototypeSetFloat32 = uncurryThis(DataView.prototype.setFloat32);
const DataViewPrototypeSetFloat64 = uncurryThis(DataView.prototype.setFloat64);
const DataViewPrototypeSetInt16 = uncurryThis(DataView.prototype.setInt16);
const DataViewPrototypeSetInt32 = uncurryThis(DataView.prototype.setInt32);
const DataViewPrototypeSetInt8 = uncurryThis(DataView.prototype.setInt8);
const DataViewPrototypeSetUint16 = uncurryThis(DataView.prototype.setUint16);
const DataViewPrototypeSetUint32 = uncurryThis(DataView.prototype.setUint32);
const DataViewPrototypeSetUint8 = uncurryThis(DataView.prototype.setUint8);
const DataViewPrototypeGetBigUint64 = uncurryThis(
  DataView.prototype.getBigUint64,
);
const DataViewPrototypeSymbolToStringTag =
  DataView.prototype[Symbol.toStringTag];

const DateLength = Date.length;
const DateName = Date.name;
const DateNow = staticCall(Date.now);
const DateParse = staticCall(Date.parse);
const DatePrototype = Date.prototype;
const DatePrototypeGetDate = uncurryThis(Date.prototype.getDate);
const DatePrototypeGetDay = uncurryThis(Date.prototype.getDay);
const DatePrototypeGetFullYear = uncurryThis(Date.prototype.getFullYear);
const DatePrototypeGetHours = uncurryThis(Date.prototype.getHours);
const DatePrototypeGetMilliseconds = uncurryThis(
  Date.prototype.getMilliseconds,
);
const DatePrototypeGetMinutes = uncurryThis(Date.prototype.getMinutes);
const DatePrototypeGetMonth = uncurryThis(Date.prototype.getMonth);
const DatePrototypeGetSeconds = uncurryThis(Date.prototype.getSeconds);
const DatePrototypeGetTime = uncurryThis(Date.prototype.getTime);
const DatePrototypeGetTimezoneOffset = uncurryThis(
  Date.prototype.getTimezoneOffset,
);
const DatePrototypeGetUTCDate = uncurryThis(Date.prototype.getUTCDate);
const DatePrototypeGetUTCDay = uncurryThis(Date.prototype.getUTCDay);
const DatePrototypeGetUTCFullYear = uncurryThis(Date.prototype.getUTCFullYear);
const DatePrototypeGetUTCHours = uncurryThis(Date.prototype.getUTCHours);
const DatePrototypeGetUTCMilliseconds = uncurryThis(
  Date.prototype.getUTCMilliseconds,
);
const DatePrototypeGetUTCMinutes = uncurryThis(Date.prototype.getUTCMinutes);
const DatePrototypeGetUTCMonth = uncurryThis(Date.prototype.getUTCMonth);
const DatePrototypeGetUTCSeconds = uncurryThis(Date.prototype.getUTCSeconds);
const DatePrototypeGetYear = uncurryThis(
  (
    Date.prototype as Date & {
      getYear: () => number;
    }
  ).getYear,
);
const DatePrototypeSetDate = uncurryThis(Date.prototype.setDate);
const DatePrototypeSetFullYear = uncurryThis(Date.prototype.setFullYear);
const DatePrototypeSetHours = uncurryThis(Date.prototype.setHours);
const DatePrototypeSetMilliseconds = uncurryThis(
  Date.prototype.setMilliseconds,
);
const DatePrototypeSetMinutes = uncurryThis(Date.prototype.setMinutes);
const DatePrototypeSetMonth = uncurryThis(Date.prototype.setMonth);
const DatePrototypeSetSeconds = uncurryThis(Date.prototype.setSeconds);
const DatePrototypeSetTime = uncurryThis(Date.prototype.setTime);
const DatePrototypeSetUTCDate = uncurryThis(Date.prototype.setUTCDate);
const DatePrototypeSetUTCFullYear = uncurryThis(Date.prototype.setUTCFullYear);
const DatePrototypeSetUTCHours = uncurryThis(Date.prototype.setUTCHours);
const DatePrototypeSetUTCMilliseconds = uncurryThis(
  Date.prototype.setUTCMilliseconds,
);
const DatePrototypeSetUTCMinutes = uncurryThis(Date.prototype.setUTCMinutes);
const DatePrototypeSetUTCMonth = uncurryThis(Date.prototype.setUTCMonth);
const DatePrototypeSetUTCSeconds = uncurryThis(Date.prototype.setUTCSeconds);
const DatePrototypeSetYear = uncurryThis(
  (Date.prototype as Date & { setYear: (year: number) => number }).setYear,
);
const DatePrototypeSymbolToPrimitive = uncurryThis(
  Date.prototype[Symbol.toPrimitive],
);
const DatePrototypeToDateString = uncurryThis(Date.prototype.toDateString);
const DatePrototypeToGMTString = uncurryThis(
  (
    Date.prototype as Date & {
      toGMTString: () => string;
    }
  ).toGMTString,
);
const DatePrototypeToISOString = uncurryThis(Date.prototype.toISOString);
const DatePrototypeToJSON = uncurryThis(Date.prototype.toJSON);
const DatePrototypeToLocaleDateString = uncurryThis(
  Date.prototype.toLocaleDateString,
);
const DatePrototypeToLocaleString = uncurryThis(Date.prototype.toLocaleString);
const DatePrototypeToLocaleTimeString = uncurryThis(
  Date.prototype.toLocaleTimeString,
);
const DatePrototypeToString = uncurryThis(Date.prototype.toString);
const DatePrototypeToTimeString = uncurryThis(Date.prototype.toTimeString);
const DatePrototypeToUTCString = uncurryThis(Date.prototype.toUTCString);
const DatePrototypeValueOf = uncurryThis(Date.prototype.valueOf);
const DateUTC = staticCall(Date.UTC);

const ErrorCaptureStackTrace = staticCall(Error.captureStackTrace);
const ErrorLength = Error.length;
const ErrorName = Error.name;
const ErrorPrototype = Error.prototype;
const ErrorPrototypeMessage = Error.prototype.message;
const ErrorPrototypeName = Error.prototype.name;
const ErrorPrototypeToString = uncurryThis(Error.prototype.toString);

const EvalErrorLength = EvalError.length;
const EvalErrorName = EvalError.name;
const EvalErrorPrototype = EvalError.prototype;
const EvalErrorPrototypeMessage = EvalError.prototype.message;
const EvalErrorPrototypeName = EvalError.prototype.name;

const FinalizationRegistryLength = FinalizationRegistry.length;
const FinalizationRegistryName = FinalizationRegistry.name;
const FinalizationRegistryPrototype = FinalizationRegistry.prototype;
const FinalizationRegistryPrototypeRegister = uncurryThis(
  FinalizationRegistry.prototype.register,
);
const FinalizationRegistryPrototypeSymbolToStringTag =
  FinalizationRegistry.prototype[Symbol.toStringTag];
const FinalizationRegistryPrototypeUnregister = uncurryThis(
  FinalizationRegistry.prototype.unregister,
);

const Float32ArrayBYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
const Float32ArrayLength = Float32Array.length;
const Float32ArrayName = Float32Array.name;
const Float32ArrayPrototype = Float32Array.prototype;
const Float32ArrayPrototypeBYTES_PER_ELEMENT =
  Float32Array.prototype.BYTES_PER_ELEMENT;

const Float64ArrayBYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT;
const Float64ArrayLength = Float64Array.length;
const Float64ArrayName = Float64Array.name;
const Float64ArrayPrototype = Float64Array.prototype;
const Float64ArrayPrototypeBYTES_PER_ELEMENT =
  Float64Array.prototype.BYTES_PER_ELEMENT;

const FunctionLength = Function.length;
const FunctionName = Function.name;
const FunctionPrototypeApply = uncurryThis(apply);
const FunctionPrototypeBind = uncurryThis(bind);
const FunctionPrototypeToString = uncurryThis(Function.prototype.toString);
const FunctionPrototypeGetArguments = uncurryGetter(
  Function.prototype,
  "arguments",
);
const FunctionPrototypeGetCaller = uncurryGetter(Function.prototype, "caller");
const FunctionPrototypeLength = Function.prototype.length;
const FunctionPrototypeName = Function.prototype.name;
const FunctionPrototypeSetArguments = uncurrySetter(
  Function.prototype,
  "arguments",
);
const FunctionPrototypeSetCaller = uncurrySetter(Function.prototype, "caller");
const FunctionPrototypeSymbolHasInstance = uncurryThis(
  Function.prototype[Symbol.hasInstance],
);

const Int16ArrayBYTES_PER_ELEMENT = Int16Array.BYTES_PER_ELEMENT;
const Int16ArrayLength = Int16Array.length;
const Int16ArrayName = Int16Array.name;
const Int16ArrayPrototype = Int16Array.prototype;
const Int16ArrayPrototypeBYTES_PER_ELEMENT =
  Int16Array.prototype.BYTES_PER_ELEMENT;

const Int32ArrayBYTES_PER_ELEMENT = Int32Array.BYTES_PER_ELEMENT;
const Int32ArrayLength = Int32Array.length;
const Int32ArrayName = Int32Array.name;
const Int32ArrayPrototype = Int32Array.prototype;
const Int32ArrayPrototypeBYTES_PER_ELEMENT =
  Int32Array.prototype.BYTES_PER_ELEMENT;

const Int8ArrayLength = Int8Array.length;
const Int8ArrayName = Int8Array.name;
const Int8ArrayPrototype = Int8Array.prototype;
const Int8ArrayBYTES_PER_ELEMENT = Int8Array.BYTES_PER_ELEMENT;
const Int8ArrayPrototypeBYTES_PER_ELEMENT =
  Int8Array.prototype.BYTES_PER_ELEMENT;

const JSON = JSON_;
const JSONParse = staticCall(JSON.parse);
const JSONStringify = staticCall(JSON.stringify);
const JSONSymbolToStringTag = "JSON";

const MapLength = Map.length;
const MapGetSymbolSpecies = uncurryGetter(Map, Symbol.species);
const MapName = Map.name;

const MapPrototype = Map.prototype;
const MapPrototypeGet = uncurryThis(Map.prototype.get);
const MapPrototypeSet = uncurryThis(Map.prototype.set);
const MapPrototypeSymbolIterator = uncurryMethod(
  Map.prototype,
  Symbol.iterator,
);
const MapPrototypeSymbolToStringTag = Map.prototype[Symbol.toStringTag];
const MapPrototypeHas = uncurryThis(Map.prototype.has);
const MapPrototypeDelete = uncurryThis(Map.prototype.delete);
const MapPrototypeClear = uncurryThis(Map.prototype.clear);
const MapPrototypeEntries = uncurryThis(Map.prototype.entries);
const MapPrototypeForEach = uncurryThis(Map.prototype.forEach);
const MapPrototypeKeys = uncurryThis(Map.prototype.keys);
const MapPrototypeValues = uncurryThis(Map.prototype.values);
const MapPrototypeGetSize = uncurryGetter(Map.prototype, "size");

const Math = Math_;
const MathAbs = Math.abs;
const MathAcos = Math.acos;
const MathAcosh = Math.acosh;
const MathAsin = Math.asin;
const MathAsinh = Math.asinh;
const MathAtan2 = Math.atan2;
const MathAtan = Math.atan;
const MathAtanh = Math.atanh;
const MathCbrt = Math.cbrt;
const MathCeil = Math.ceil;
const MathClz32 = Math.clz32;
const MathCos = Math.cos;
const MathCosh = Math.cosh;
const MathE = Math.E;
const MathExp = Math.exp;
const MathExpm1 = Math.expm1;
const MathFloor = Math.floor;
const MathFround = Math.fround;
const MathHypot = Math.hypot;
const MathHypotApply = staticApply(Math.hypot);
const MathImul = Math.imul;
const MathLN10 = Math.LN10;
const MathLN2 = Math.LN2;
const MathLOG10E = Math.LOG10E;
const MathLOG2E = Math.LOG2E;
const MathLog10 = Math.log10;
const MathLog1p = Math.log1p;
const MathLog2 = Math.log2;
const MathLog = Math.log;
const MathMax = Math.max;
const MathMaxApply = staticApply(Math.max);
const MathMin = Math.min;
const MathMinApply = staticApply(Math.min);
const MathPI = Math.PI;
const MathPow = Math.pow;
const MathRandom = Math.random;
const MathRound = Math.round;
const MathSQRT1_2 = Math.SQRT1_2;
const MathSQRT2 = Math.SQRT2;
const MathSign = Math.sign;
const MathSin = Math.sin;
const MathSinh = Math.sinh;
const MathSqrt = Math.sqrt;
const MathSymbolToStringTag = Math[Symbol.toStringTag];
const MathTan = Math.tan;
const MathTanh = Math.tanh;
const MathTrunc = Math.trunc;

const NumberEPSILON = Number.EPSILON;
const NumberIsFinite = staticCall(Number.isFinite);
const NumberIsInteger = staticCall(Number.isInteger);
const NumberIsNaN = staticCall(Number.isNaN);
const NumberIsSafeInteger = staticCall(Number.isSafeInteger);
const NumberLength = Number.length;
const NumberMAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
const NumberMAX_VALUE = Number.MAX_VALUE;
const NumberMIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
const NumberMIN_VALUE = Number.MIN_VALUE;
const NumberNEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
const NumberNaN = Number.NaN;
const NumberName = Number.name;
const NumberPOSITIVE_INFINITY = Number.POSITIVE_INFINITY;
const NumberParseFloat = staticCall(Number.parseFloat);
const NumberParseInt = staticCall(Number.parseInt);
const NumberPrototype = Number.prototype;
const NumberPrototypeToExponential = uncurryThis(
  Number.prototype.toExponential,
);
const NumberPrototypeToFixed = uncurryThis(Number.prototype.toFixed);
const NumberPrototypeToLocaleString = uncurryThis(
  Number.prototype.toLocaleString,
);
const NumberPrototypeToPrecision = uncurryThis(Number.prototype.toPrecision);
const NumberPrototypeToString = uncurryThis(Number.prototype.toString);
const NumberPrototypeValueOf = uncurryThis(Number.prototype.valueOf);

const ObjectLength = OBJECT.length;
const ObjectName = OBJECT.name;
const ObjectPrototype = OBJECT.prototype;
const ObjectAssign = staticCall(OBJECT.assign);
const ObjectGetOwnPropertyDescriptor = staticCall(
  OBJECT.getOwnPropertyDescriptor,
);
const ObjectGetOwnPropertyDescriptors = staticCall(
  OBJECT.getOwnPropertyDescriptors,
);
const ObjectGetOwnPropertyNames = staticCall(OBJECT.getOwnPropertyNames);
const ObjectGetOwnPropertySymbols = staticCall(OBJECT.getOwnPropertySymbols);
const ObjectIs = staticCall(OBJECT.is);
const ObjectPreventExtensions = staticCall(OBJECT.preventExtensions);
const ObjectPrototypeGet__proto__ = uncurryGetter(
  Object.prototype,
  "__proto__" as keyof Object,
);
const ObjectSeal = staticCall(OBJECT.seal);
// TS defines this as an overload by default, but that ends up making
// both parameters non-optional in the StaticCall type.
const ObjectCreate = staticCall(
  OBJECT.create as (
    o: object | null,
    properties?: PropertyDescriptorMap & ThisType<any>,
  ) => any,
);
const ObjectDefineProperties = staticCall(OBJECT.defineProperties);
const ObjectDefineProperty = staticCall(OBJECT.defineProperty);
const ObjectFreeze = staticCall(OBJECT.freeze);
const ObjectGetPrototypeOf = staticCall(OBJECT.getPrototypeOf);
const ObjectSetPrototypeOf = staticCall(OBJECT.setPrototypeOf);
const ObjectPrototypeSet__proto__ = uncurrySetter(
  Object.prototype,
  "__proto__" as keyof Object,
);
const ObjectIsExtensible = staticCall(OBJECT.isExtensible);
const ObjectIsFrozen = staticCall(OBJECT.isFrozen);
const ObjectIsSealed = staticCall(OBJECT.isSealed);
const ObjectKeys = staticCall(OBJECT.keys);
const ObjectEntries = staticCall(OBJECT.entries);
const ObjectFromEntries = staticCall(OBJECT.fromEntries);
const ObjectValues = staticCall(OBJECT.values);
const ObjectPrototype__defineGetter__ = uncurryThis(
  //@ts-ignore
  OBJECT.prototype.__defineGetter__,
);
const ObjectPrototype__defineSetter__ = uncurryThis(
  //@ts-ignore
  OBJECT.prototype.__defineSetter__,
);
const ObjectPrototypeHasOwnProperty = uncurryThis(
  OBJECT.prototype.hasOwnProperty,
);
const ObjectPrototype__lookupGetter__ = uncurryThis(
  //@ts-ignore
  OBJECT.prototype.__lookupGetter__,
);
const ObjectPrototype__lookupSetter__ = uncurryThis(
  //@ts-ignore
  OBJECT.prototype.__lookupSetter__,
);
const ObjectPrototypeIsPrototypeOf = uncurryThis(
  OBJECT.prototype.isPrototypeOf,
);
const ObjectPrototypePropertyIsEnumerable = uncurryThis(
  OBJECT.prototype.propertyIsEnumerable,
);
const ObjectPrototypeToString = uncurryThis(OBJECT.prototype.toString);
const ObjectPrototypeValueOf = uncurryThis(OBJECT.prototype.valueOf);
const ObjectPrototypeToLocaleString = uncurryThis(
  OBJECT.prototype.toLocaleString,
);

const PromiseAll = Promise.all;
const PromiseAllSettled = Promise.allSettled;
const PromiseAny = Promise.any;
const PromiseGetSymbolSpecies = uncurryGetter(Promise, Symbol.species);
const PromiseLength = Promise.length;
const PromiseName = Promise.name;
const PromisePrototype = Promise.prototype;
const PromisePrototypeCatch = uncurryThis(Promise.prototype.catch);
const PromisePrototypeFinally = uncurryThis(Promise.prototype.finally);
const PromisePrototypeSymbolToStringTag = Promise.prototype[Symbol.toStringTag];
const PromisePrototypeThen = uncurryThis(Promise.prototype.then);
const PromiseRace = Promise.race;
const PromiseReject = Promise.reject;
const PromiseResolve = Promise.resolve;

const ProxyLength = Proxy.length;
const ProxyName = Proxy.name;
const ProxyRevocable = staticCall(Proxy.revocable);

const RangeErrorLength = RangeError.length;
const RangeErrorName = RangeError.name;
const RangeErrorPrototype = RangeError.prototype;
const RangeErrorPrototypeMessage = RangeError.prototype.message;
const RangeErrorPrototypeName = RangeError.prototype.name;

const ReferenceErrorLength = ReferenceError.length;
const ReferenceErrorName = ReferenceError.name;
const ReferenceErrorPrototype = ReferenceError.prototype;
const ReferenceErrorPrototypeMessage = ReferenceError.prototype.message;
const ReferenceErrorPrototypeName = ReferenceError.prototype.name;

const ReflectApply = SafeReflect.apply;
const ReflectConstruct = SafeReflect.construct;
const ReflectDefineProperty = SafeReflect.defineProperty;
const ReflectDeleteProperty = SafeReflect.deleteProperty;
const ReflectGet = SafeReflect.get;
const ReflectGetOwnPropertyDescriptor = SafeReflect.getOwnPropertyDescriptor;
const ReflectGetPrototypeOf = SafeReflect.getPrototypeOf;
const ReflectHas = SafeReflect.has;
const ReflectIsExtensible = SafeReflect.isExtensible;
const ReflectOwnKeys = SafeReflect.ownKeys;
const ReflectPreventExtensions = SafeReflect.preventExtensions;
const ReflectSet = SafeReflect.set;
const ReflectSetPrototypeOf = SafeReflect.setPrototypeOf;
const ReflectSymbolToStringTag = "Reflect";

const RegExpGet$1 = uncurryGetter(RegExp, "$1");
const RegExpSet$1 = uncurrySetter(RegExp, "$1");
const RegExpGet$2 = uncurryGetter(RegExp, "$2");
const RegExpSet$2 = uncurrySetter(RegExp, "$2");
const RegExpGet$3 = uncurryGetter(RegExp, "$3");
const RegExpSet$3 = uncurrySetter(RegExp, "$3");
const RegExpGet$4 = uncurryGetter(RegExp, "$4");
const RegExpSet$4 = uncurrySetter(RegExp, "$4");
const RegExpGet$5 = uncurryGetter(RegExp, "$5");
const RegExpSet$5 = uncurrySetter(RegExp, "$5");
const RegExpGet$6 = uncurryGetter(RegExp, "$6");
const RegExpSet$6 = uncurrySetter(RegExp, "$6");
const RegExpGet$7 = uncurryGetter(RegExp, "$7");
const RegExpSet$7 = uncurrySetter(RegExp, "$7");
const RegExpGet$8 = uncurryGetter(RegExp, "$8");
const RegExpSet$8 = uncurrySetter(RegExp, "$8");
const RegExpGet$9 = uncurryGetter(RegExp, "$9");
const RegExpSet$9 = uncurrySetter(RegExp, "$9");
const RegExpGet$_ = uncurryGetter(RegExp, "$_");
const RegExpSet$_ = uncurrySetter(RegExp, "$_");
const RegExpGetInput = uncurryGetter(RegExp, "input");
const RegExpSetInput = uncurrySetter(RegExp, "input");
const RegExpGetLastMatch = uncurryGetter(RegExp, "lastMatch");
const RegExpSetLastMatch = uncurrySetter(RegExp, "lastMatch");
const RegExpGetLastParen = uncurryGetter(RegExp, "lastParen");
const RegExpSetLastParen = uncurrySetter(RegExp, "lastParen");
const RegExpGetLeftContext = uncurryGetter(RegExp, "leftContext");
const RegExpSetLeftContext = uncurrySetter(RegExp, "leftContext");
const RegExpGetRightContext = uncurryGetter(RegExp, "rightContext");
const RegExpSetRightContext = uncurrySetter(RegExp, "rightContext");
const RegExpGetDollarAmp = uncurryGetter(RegExp, "$&");
const RegExpSetDollarAmp = uncurrySetter(RegExp, "$&");
const RegExpGetDollarSquo = uncurryGetter(RegExp, "$'");
const RegExpSetDollarSquo = uncurrySetter(RegExp, "$'");
const RegExpGetDollarPlus = uncurryGetter(RegExp, "$+");
const RegExpSetDollarPlus = uncurrySetter(RegExp, "$+");
const RegExpGetDollarTick = uncurryGetter(RegExp, "$`");
const RegExpSetDollarTick = uncurrySetter(RegExp, "$`");
const RegExpGetSymbolSpecies = uncurryGetter(RegExp, Symbol.species);

const RegExpLength = RegExp.length;
const RegExpName = RegExp.name;
const RegExpPrototype = RegExp.prototype;
const RegExpPrototypeExec = uncurryThis(RegExp.prototype.exec);
const RegExpPrototypeCompile = uncurryThis(RegExp.prototype.compile);
const RegExpPrototypeToString = uncurryThis(RegExp.prototype.toString);
const RegExpPrototypeTest = uncurryThis(RegExp.prototype.test);
const RegExpPrototypeGetDotAll = uncurryGetter(RegExp.prototype, "dotAll");
const RegExpPrototypeGetFlags = uncurryGetter(RegExp.prototype, "flags");
const RegExpPrototypeGetGlobal = uncurryGetter(RegExp.prototype, "global");
const RegExpPrototypeGetHasIndices = uncurryGetter(
  RegExp.prototype as RegExp & { hasIndices?: boolean },
  "hasIndices",
);
const RegExpPrototypeGetIgnoreCase = uncurryGetter(
  RegExp.prototype,
  "ignoreCase",
);
const RegExpPrototypeGetMultiline = uncurryGetter(
  RegExp.prototype,
  "multiline",
);
const RegExpPrototypeGetSource = uncurryGetter(RegExp.prototype, "source");
const RegExpPrototypeGetSticky = uncurryGetter(RegExp.prototype, "sticky");
const RegExpPrototypeGetUnicode = uncurryGetter(RegExp.prototype, "unicode");
const RegExpPrototypeSymbolMatch = uncurryThis(RegExp.prototype[Symbol.match]);
const RegExpPrototypeSymbolMatchAll = uncurryThis(
  RegExp.prototype[Symbol.matchAll],
);
const RegExpPrototypeSymbolReplace = uncurryThis(
  RegExp.prototype[Symbol.replace],
);
const RegExpPrototypeSymbolSearch = uncurryThis(
  RegExp.prototype[Symbol.search],
);
const RegExpPrototypeSymbolSplit = uncurryThis(RegExp.prototype[Symbol.split]);

const SetGetSymbolSpecies = uncurryGetter(Set, Symbol.species);
const SetLength = Set.length;
const SetName = Set.name;
const SetPrototype = Set.prototype;
const SetPrototypeHas = uncurryThis(Set.prototype.has);
const SetPrototypeAdd = uncurryThis(Set.prototype.add);
const SetPrototypeDelete = uncurryThis(Set.prototype.delete);
const SetPrototypeClear = uncurryThis(Set.prototype.clear);
const SetPrototypeEntries = uncurryThis(Set.prototype.entries);
const SetPrototypeForEach = uncurryThis(Set.prototype.forEach);
const SetPrototypeValues = uncurryThis(Set.prototype.values);
const SetPrototypeKeys = uncurryThis(Set.prototype.keys);
const SetPrototypeSymbolIterator = uncurryThis(Set.prototype[Symbol.iterator]);
const SetPrototypeSymbolToStringTag = Set.prototype[Symbol.toStringTag];

const SetPrototypeGetSize = uncurryGetter(Set.prototype, "size");

const StringLength = String.length;
const StringName = String.name;
const StringPrototype = String.prototype;
const StringFromCharCode = String.fromCharCode;
const StringFromCharCodeApply = staticApply(String.fromCharCode);
const StringFromCodePoint = String.fromCodePoint;
const StringFromCodePointApply = staticApply(String.fromCodePoint);
const StringRaw = String.raw;
const StringPrototypeAnchor = uncurryThis(String.prototype.anchor);
const StringPrototypeBig = uncurryThis(String.prototype.big);
const StringPrototypeBlink = uncurryThis(String.prototype.blink);
const StringPrototypeBold = uncurryThis(String.prototype.bold);
const StringPrototypeCharAt = uncurryThis(String.prototype.charAt);
const StringPrototypeCharCodeAt = uncurryThis(String.prototype.charCodeAt);
const StringPrototypeCodePointAt = uncurryThis(String.prototype.codePointAt);
const StringPrototypeConcat = uncurryThis(String.prototype.concat);
const StringPrototypeConcatApply = applyBind(String.prototype.concat);
const StringPrototypeEndsWith = uncurryThis(String.prototype.endsWith);
const StringPrototypeFontcolor = uncurryThis(String.prototype.fontcolor);
const StringPrototypeFontsize = uncurryThis(String.prototype.fontsize);
const StringPrototypeFixed = uncurryThis(String.prototype.fixed);
const StringPrototypeIncludes = uncurryThis(String.prototype.includes);
const StringPrototypeIndexOf = uncurryThis(String.prototype.indexOf);
const StringPrototypeItalics = uncurryThis(String.prototype.italics);
const StringPrototypeLastIndexOf = uncurryThis(String.prototype.lastIndexOf);
const StringPrototypeLength = String.prototype.length;
const StringPrototypeLink = uncurryThis(String.prototype.link);
const StringPrototypeLocaleCompare = uncurryThis(
  String.prototype.localeCompare,
);
const StringPrototypeMatch = uncurryThis(String.prototype.match);
const StringPrototypeMatchAll = uncurryThis(String.prototype.matchAll);
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
}; // Fix overload
const StringPrototypeSearch = uncurryThis(String.prototype.search);
const StringPrototypeSlice = uncurryThis(String.prototype.slice);
const StringPrototypeSmall = uncurryThis(String.prototype.small);
const StringPrototypeSplit = uncurryThis(String.prototype.split);
const StringPrototypeStrike = uncurryThis(String.prototype.strike);
const StringPrototypeSub = uncurryThis(String.prototype.sub);
const StringPrototypeSubstr = uncurryThis(String.prototype.substr);
const StringPrototypeSubstring = uncurryThis(String.prototype.substring);
const StringPrototypeSup = uncurryThis(String.prototype.sup);
const StringPrototypeStartsWith = uncurryThis(String.prototype.startsWith);
const StringPrototypeToString = uncurryThis(String.prototype.toString);
const StringPrototypeTrim = uncurryThis(String.prototype.trim);
const StringPrototypeTrimStart = uncurryThis(String.prototype.trimStart);
const StringPrototypeTrimLeft = uncurryThis(String.prototype.trimLeft);
const StringPrototypeTrimEnd = uncurryThis(String.prototype.trimEnd);
const StringPrototypeTrimRight = uncurryThis(String.prototype.trimRight);
const StringPrototypeSymbolIterator = uncurryThis(
  String.prototype[Symbol.iterator],
);
const StringPrototypeToLocaleLowerCase = uncurryThis(
  String.prototype.toLocaleLowerCase,
);
const StringPrototypeToLocaleUpperCase = uncurryThis(
  String.prototype.toLocaleUpperCase,
);
const StringPrototypeToLowerCase = uncurryThis(String.prototype.toLowerCase);
const StringPrototypeToUpperCase = uncurryThis(String.prototype.toUpperCase);
const StringPrototypeValueOf = uncurryThis(String.prototype.valueOf);
const StringPrototypeReplaceAll = uncurryThis(String.prototype.replaceAll);

const StringIterator = {
  prototype: Reflect.getPrototypeOf(String.prototype[Symbol.iterator]()),
};
const StringIteratorPrototype = StringIterator.prototype as Iterator<string>;
const StringIteratorPrototypeNext = uncurryThis(StringIteratorPrototype.next);
const StringIteratorPrototypeSymbolToStringTag = "String Iterator";

const SymbolLength = Symbol.length;
const SymbolName = Symbol.name;
const SymbolPrototype = Symbol.prototype;
const SymbolFor = Symbol.for;
const SymbolKeyFor = Symbol.keyFor;
const SymbolAsyncIterator = Symbol.asyncIterator;
const SymbolHasInstance = Symbol.hasInstance;
const SymbolIsConcatSpreadable = Symbol.isConcatSpreadable;
const SymbolIterator = Symbol.iterator;
const SymbolMatch = Symbol.match;
const SymbolMatchAll = Symbol.matchAll;
const SymbolReplace = Symbol.replace;
const SymbolSearch = Symbol.search;
const SymbolSpecies = Symbol.species;
const SymbolSplit = Symbol.split;
const SymbolToPrimitive = Symbol.toPrimitive;
const SymbolToStringTag = Symbol.toStringTag;
const SymbolUnscopables = Symbol.unscopables;
const SymbolPrototypeToString = uncurryThis(Symbol.prototype.toString);
const SymbolPrototypeValueOf = uncurryThis(Symbol.prototype.valueOf);
const SymbolPrototypeSymbolToPrimitive = uncurryMethod(
  Symbol.prototype,
  Symbol.toPrimitive,
);
const SymbolPrototypeSymbolToStringTag = Symbol.prototype[Symbol.toStringTag];
const SymbolPrototypeGetDescription = uncurryGetter(
  Symbol.prototype,
  "description",
);

const SyntaxErrorLength = SyntaxError.length;
const SyntaxErrorName = SyntaxError.name;
const SyntaxErrorPrototype = SyntaxError.prototype;
const SyntaxErrorPrototypeMessage = SyntaxError.prototype.message;
const SyntaxErrorPrototypeName = SyntaxError.prototype.name;

const TypedArrayPrototypeGetBuffer = uncurryGetter(
  TypedArrayPrototype,
  "buffer",
);
const TypedArrayPrototypeGetByteLength = uncurryGetter(
  TypedArrayPrototype,
  "byteLength",
);
const TypedArrayPrototypeGetByteOffset = uncurryGetter(
  TypedArrayPrototype,
  "byteOffset",
);
const TypedArrayPrototypeGetLength = uncurryGetter(
  TypedArrayPrototype,
  "length",
);

const TypedArray = TypedArrayPrototype.constructor;
const TypedArrayLength = TypedArray.length;
const TypedArrayName = TypedArray.name;
const TypedArrayGetSymbolSpecies = uncurryGetter(
  TypedArray,
  //@ts-ignore
  Symbol.species,
);
const TypedArrayPrototypeCopyWithin = uncurryThis(
  TypedArrayPrototype.copyWithin,
);
const TypedArrayPrototypeEntries = uncurryThis(TypedArrayPrototype.entries);
const TypedArrayPrototypeEvery = uncurryThis(TypedArrayPrototype.every);
const TypedArrayPrototypeFill = uncurryThis(TypedArrayPrototype.fill);
const TypedArrayPrototypeFilter = uncurryThis(TypedArrayPrototype.filter);
const TypedArrayPrototypeFind = uncurryThis(TypedArrayPrototype.find);
const TypedArrayPrototypeFindIndex = uncurryThis(TypedArrayPrototype.findIndex);
const TypedArrayPrototypeForEach = uncurryThis(TypedArrayPrototype.forEach);
const TypedArrayPrototypeIncludes = uncurryThis(TypedArrayPrototype.includes);
const TypedArrayPrototypeIndexOf = uncurryThis(TypedArrayPrototype.indexOf);
const TypedArrayPrototypeJoin = uncurryThis(TypedArrayPrototype.join);
const TypedArrayPrototypeKeys = uncurryThis(TypedArrayPrototype.keys);
const TypedArrayPrototypeLastIndexOf = uncurryThis(
  TypedArrayPrototype.lastIndexOf,
);
const TypedArrayPrototypeMap = uncurryThis(TypedArrayPrototype.map);
const TypedArrayPrototypeReduce = uncurryThis(TypedArrayPrototype.reduce);
const TypedArrayPrototypeReduceRight = uncurryThis(
  TypedArrayPrototype.reduceRight,
);
const TypedArrayPrototypeReverse = uncurryThis(TypedArrayPrototype.reverse);
const TypedArrayPrototypeSet = uncurryThis(TypedArrayPrototype.set);
const TypedArrayPrototypeSlice = uncurryThis(TypedArrayPrototype.slice);
const TypedArrayPrototypeSome = uncurryThis(TypedArrayPrototype.some);
const TypedArrayPrototypeSort = uncurryThis(TypedArrayPrototype.sort);
const TypedArrayPrototypeSubarray = uncurryThis(TypedArrayPrototype.subarray);
const TypedArrayPrototypeSymbolIterator = uncurryThis(
  TypedArrayPrototype[Symbol.iterator],
);
const TypedArrayPrototypeToLocaleString = uncurryThis(
  TypedArrayPrototype.toLocaleString,
);
const TypedArrayPrototypeToString = uncurryThis(TypedArrayPrototype.toString);
const TypedArrayPrototypeValues = uncurryThis(TypedArrayPrototype.values);

const TypeErrorLength = TypeError.length;
const TypeErrorName = TypeError.name;
const TypeErrorPrototype = TypeError.prototype;
const TypeErrorPrototypeMessage = TypeError.prototype.message;
const TypeErrorPrototypeName = TypeError.prototype.name;

const URIErrorLength = URIError.length;
const URIErrorName = URIError.name;
const URIErrorPrototype = URIError.prototype;
const URIErrorPrototypeMessage = URIError.prototype.message;
const URIErrorPrototypeName = URIError.prototype.name;

const URLCreateObjectURL = staticCall(URL.createObjectURL);
const URLRevokeObjectURL = staticCall(URL.revokeObjectURL);

const Uint16ArrayLength = Uint16Array.length;
const Uint16ArrayName = Uint16Array.name;
const Uint16ArrayPrototype = Uint16Array.prototype;
const Uint16ArrayBYTES_PER_ELEMENT = Uint16Array.BYTES_PER_ELEMENT;
const Uint16ArrayPrototypeBYTES_PER_ELEMENT =
  Uint16Array.prototype.BYTES_PER_ELEMENT;

const Uint32ArrayLength = Uint32Array.length;
const Uint32ArrayName = Uint32Array.name;
const Uint32ArrayPrototype = Uint32Array.prototype;
const Uint32ArrayBYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;
const Uint32ArrayPrototypeBYTES_PER_ELEMENT =
  Uint32Array.prototype.BYTES_PER_ELEMENT;

const Uint8ArrayLength = Uint8Array.length;
const Uint8ArrayName = Uint8Array.name;
const Uint8ArrayPrototype = Uint8Array.prototype;
const Uint8ArrayBYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT;
const Uint8ArrayPrototypeBYTES_PER_ELEMENT =
  Uint8Array.prototype.BYTES_PER_ELEMENT;

const Uint8ClampedArrayLength = Uint8ClampedArray.length;
const Uint8ClampedArrayName = Uint8ClampedArray.name;
const Uint8ClampedArrayPrototype = Uint8ClampedArray.prototype;
const Uint8ClampedArrayBYTES_PER_ELEMENT = Uint8ClampedArray.BYTES_PER_ELEMENT;
const Uint8ClampedArrayPrototypeBYTES_PER_ELEMENT =
  Uint8ClampedArray.prototype.BYTES_PER_ELEMENT;

const WeakMapLength = WeakMap.length;
const WeakMapName = WeakMap.name;
const WeakMapPrototype = WeakMap.prototype;
const WeakMapPrototypeDelete = uncurryThis(WeakMap.prototype.delete);
const WeakMapPrototypeGet = uncurryThis(WeakMap.prototype.get);
const WeakMapPrototypeSet = uncurryThis(WeakMap.prototype.set);
const WeakMapPrototypeSymbolToStringTag = (
  WeakMap.prototype as unknown as { [k: symbol]: string }
)[Symbol.toStringTag];
const WeakMapPrototypeHas = uncurryThis(WeakMap.prototype.has);

const WeakRefLength = WeakRef.length;
const WeakRefName = WeakRef.length;
const WeakRefPrototype = WeakRef.prototype;
const WeakRefPrototypeDeref = uncurryThis(WeakRef.prototype.deref);
const WeakRefPrototypeSymbolToStringTag = WeakRef.prototype[Symbol.toStringTag];

const WeakSetLength = WeakSet.length;
const WeakSetName = WeakSet.name;
const WeakSetPrototype = WeakSet.prototype;
const WeakSetPrototypeAdd = uncurryThis(WeakSet.prototype.add);
const WeakSetPrototypeDelete = uncurryThis(WeakSet.prototype.delete);
const WeakSetPrototypeHas = uncurryThis(WeakSet.prototype.has);
const WeakSetPrototypeSymbolToStringTag = WeakSet.prototype[Symbol.toStringTag];

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
    let next; // We can reuse the same `next` method.

    ArrayPrototypeForEach(ReflectOwnKeys(unsafe.prototype), (key) => {
      if (!ReflectGetOwnPropertyDescriptor(safe.prototype, key)) {
        const desc = ReflectGetOwnPropertyDescriptor(unsafe.prototype, key);
        if (
          desc &&
          typeof desc.value === "function" &&
          desc.value.length === 0 &&
          SymbolIterator in (FunctionPrototypeCall(desc.value, dummy) ?? {})
        ) {
          const x: string[] = [];
          const y = x[Symbol.iterator];

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
const SafeWeakMap = makeSafe(
  WeakMap,
  class SafeWeakMap<K extends object, V> extends WeakMap<K, V> {
    constructor(entries?: readonly [K, V][] | null) {
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
const SafeWeakSet = makeSafe(
  WeakSet,
  class SafeWeakSet<T extends object> extends WeakSet<T> {
    constructor(values?: readonly T[] | null) {
      super(values);
    }
  },
);

const SafeFinalizationRegistry = makeSafe(
  FinalizationRegistry,
  class SafeFinalizationRegistry<T> extends FinalizationRegistry<T> {
    constructor(cleanupCallback: (heldValue: T) => void) {
      super(cleanupCallback);
    }
  },
);
const SafeWeakRef = makeSafe(
  WeakRef,
  class SafeWeakRef<T extends object> extends WeakRef<T> {
    constructor(target: T) {
      super(target);
    }
  },
);

const SafePromise = makeSafe(
  Promise,
  class SafePromise<T> extends Promise<T> {
    constructor(
      executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
      ) => void,
    ) {
      super(executor);
    }
  },
);

const primordials = OBJECT.assign(OBJECT.create(null) as {}, {
  // utilities
  applyBind,
  hardenRegExp,
  staticApply,
  uncurryThis,
  uncurryGetter,
  uncurrySetter,
  uncurryMethod,
  staticCall,
  maybeStaticCall,

  // globals
  globalThis: GLOBALTHIS,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  escape,
  unescape,

  AggregateError,
  AggregateErrorLength,
  AggregateErrorName,
  AggregateErrorPrototype,
  AggregateErrorPrototypeMessage,
  AggregateErrorPrototypeName,

  Array,
  ArrayFrom,
  ArrayIsArray,
  ArrayLength,
  ArrayName,
  ArrayOf,
  ArrayOfApply,
  ArrayPrototype,
  ArrayPrototypeConcat,
  ArrayPrototypeCopyWithin,
  ArrayPrototypeEntries,
  ArrayPrototypeEvery,
  ArrayPrototypeFill,
  ArrayPrototypeFilter,
  ArrayPrototypeFind,
  ArrayPrototypeFindIndex,
  ArrayPrototypeFlat,
  ArrayPrototypeFlatMap,
  ArrayPrototypeForEach,
  ArrayPrototypeIncludes,
  ArrayPrototypeIndexOf,
  ArrayPrototypeJoin,
  ArrayPrototypeKeys,
  ArrayPrototypeLastIndexOf,
  ArrayPrototypeLength,
  ArrayPrototypeMap,
  ArrayPrototypePop,
  ArrayPrototypePush,
  ArrayPrototypePushApply,
  ArrayPrototypeReduce,
  ArrayPrototypeReduceRight,
  ArrayPrototypeReverse,
  ArrayPrototypeShift,
  ArrayPrototypeSlice,
  ArrayPrototypeSome,
  ArrayPrototypeSort,
  ArrayPrototypeSplice,
  ArrayPrototypeSymbolIterator,
  ArrayPrototypeSymbolUnscopables,
  ArrayPrototypeToLocaleString,
  ArrayPrototypeToString,
  ArrayPrototypeUnshift,
  ArrayPrototypeUnshiftApply,
  ArrayPrototypeValues,
  ArrayGetSymbolSpecies,

  ArrayBuffer,
  ArrayBufferGetSymbolSpecies,
  ArrayBufferIsView,
  ArrayBufferLength,
  ArrayBufferName,
  ArrayBufferPrototype,
  ArrayBufferPrototypeGetByteLength,
  ArrayBufferPrototypeSlice,
  ArrayBufferPrototypeSymbolToStringTag,

  ArrayIterator,
  ArrayIteratorPrototype,
  ArrayIteratorPrototypeNext,
  ArrayIteratorPrototypeSymbolToStringTag,

  AsyncIteratorPrototype,

  BigInt,
  BigIntAsIntN,
  BigIntAsUintN,
  BigIntLength,
  BigIntName,
  BigIntPrototype,
  BigIntPrototypeToLocaleString,
  BigIntPrototypeToString,
  BigIntPrototypeValueOf,
  BigIntPrototypeSymbolToStringTag,

  BigInt64Array,
  BigInt64ArrayBYTES_PER_ELEMENT,
  BigInt64ArrayLength,
  BigInt64ArrayName,
  BigInt64ArrayPrototype,
  BigInt64ArrayPrototypeBYTES_PER_ELEMENT,

  BigUint64Array,
  BigUint64ArrayBYTES_PER_ELEMENT,
  BigUint64ArrayLength,
  BigUint64ArrayName,
  BigUint64ArrayPrototype,
  BigUint64ArrayPrototypeBYTES_PER_ELEMENT,

  Boolean,
  BooleanLength,
  BooleanName,
  BooleanPrototype,
  BooleanPrototypeToString,
  BooleanPrototypeValueOf,

  DataView,
  DataViewLength,
  DataViewName,
  DataViewPrototype,
  DataViewPrototypeGetBigInt64,
  DataViewPrototypeGetBigUint64,
  DataViewPrototypeGetBuffer,
  DataViewPrototypeGetByteLength,
  DataViewPrototypeGetByteOffset,
  DataViewPrototypeGetFloat32,
  DataViewPrototypeGetFloat64,
  DataViewPrototypeGetInt16,
  DataViewPrototypeGetInt32,
  DataViewPrototypeGetInt8,
  DataViewPrototypeGetUint16,
  DataViewPrototypeGetUint32,
  DataViewPrototypeGetUint8,
  DataViewPrototypeSetBigInt64,
  DataViewPrototypeSetBigUint64,
  DataViewPrototypeSetFloat32,
  DataViewPrototypeSetFloat64,
  DataViewPrototypeSetInt16,
  DataViewPrototypeSetInt32,
  DataViewPrototypeSetInt8,
  DataViewPrototypeSetUint16,
  DataViewPrototypeSetUint32,
  DataViewPrototypeSetUint8,
  DataViewPrototypeSymbolToStringTag,

  Date,
  DateLength,
  DateName,
  DateNow,
  DateParse,
  DatePrototype,
  DatePrototypeGetDate,
  DatePrototypeGetDay,
  DatePrototypeGetFullYear,
  DatePrototypeGetHours,
  DatePrototypeGetMilliseconds,
  DatePrototypeGetMinutes,
  DatePrototypeGetMonth,
  DatePrototypeGetSeconds,
  DatePrototypeGetTime,
  DatePrototypeGetTimezoneOffset,
  DatePrototypeGetUTCDate,
  DatePrototypeGetUTCDay,
  DatePrototypeGetUTCFullYear,
  DatePrototypeGetUTCHours,
  DatePrototypeGetUTCMilliseconds,
  DatePrototypeGetUTCMinutes,
  DatePrototypeGetUTCMonth,
  DatePrototypeGetUTCSeconds,
  DatePrototypeGetYear,
  DatePrototypeSetDate,
  DatePrototypeSetFullYear,
  DatePrototypeSetHours,
  DatePrototypeSetMilliseconds,
  DatePrototypeSetMinutes,
  DatePrototypeSetMonth,
  DatePrototypeSetSeconds,
  DatePrototypeSetTime,
  DatePrototypeSetUTCDate,
  DatePrototypeSetUTCFullYear,
  DatePrototypeSetUTCHours,
  DatePrototypeSetUTCMilliseconds,
  DatePrototypeSetUTCMinutes,
  DatePrototypeSetUTCMonth,
  DatePrototypeSetUTCSeconds,
  DatePrototypeSetYear,
  DatePrototypeSymbolToPrimitive,
  DatePrototypeToDateString,
  DatePrototypeToGMTString,
  DatePrototypeToISOString,
  DatePrototypeToJSON,
  DatePrototypeToLocaleDateString,
  DatePrototypeToLocaleString,
  DatePrototypeToLocaleTimeString,
  DatePrototypeToString,
  DatePrototypeToTimeString,
  DatePrototypeToUTCString,
  DatePrototypeValueOf,
  DateUTC,

  Error,
  ErrorCaptureStackTrace,
  ErrorLength,
  ErrorName,
  ErrorPrototype,
  ErrorPrototypeMessage,
  ErrorPrototypeName,
  ErrorPrototypeToString,

  EvalError,
  EvalErrorLength,
  EvalErrorName,
  EvalErrorPrototype,
  EvalErrorPrototypeMessage,
  EvalErrorPrototypeName,

  FinalizationRegistry,
  FinalizationRegistryLength,
  FinalizationRegistryName,
  FinalizationRegistryPrototype,
  FinalizationRegistryPrototypeRegister,
  FinalizationRegistryPrototypeSymbolToStringTag,
  FinalizationRegistryPrototypeUnregister,

  Float32Array,
  Float32ArrayBYTES_PER_ELEMENT,
  Float32ArrayLength,
  Float32ArrayName,
  Float32ArrayPrototype,
  Float32ArrayPrototypeBYTES_PER_ELEMENT,

  Float64Array,
  Float64ArrayBYTES_PER_ELEMENT,
  Float64ArrayLength,
  Float64ArrayName,
  Float64ArrayPrototype,
  Float64ArrayPrototypeBYTES_PER_ELEMENT,

  Function,
  FunctionLength,
  FunctionName,
  FunctionPrototype,
  FunctionPrototypeApply,
  FunctionPrototypeBind,
  FunctionPrototypeCall,
  FunctionPrototypeGetArguments,
  FunctionPrototypeGetCaller,
  FunctionPrototypeLength,
  FunctionPrototypeName,
  FunctionPrototypeSetArguments,
  FunctionPrototypeSetCaller,
  FunctionPrototypeSymbolHasInstance,
  FunctionPrototypeToString,

  Int16Array,
  Int16ArrayBYTES_PER_ELEMENT,
  Int16ArrayLength,
  Int16ArrayName,
  Int16ArrayPrototype,
  Int16ArrayPrototypeBYTES_PER_ELEMENT,

  Int32Array,
  Int32ArrayBYTES_PER_ELEMENT,
  Int32ArrayLength,
  Int32ArrayName,
  Int32ArrayPrototype,
  Int32ArrayPrototypeBYTES_PER_ELEMENT,

  Int8Array,
  Int8ArrayLength,
  Int8ArrayName,
  Int8ArrayPrototype,
  Int8ArrayPrototypeBYTES_PER_ELEMENT,
  Int8ArrayBYTES_PER_ELEMENT,

  JSON,
  JSONParse,
  JSONStringify,
  JSONSymbolToStringTag,

  Map,
  MapGetSymbolSpecies,
  MapLength,
  MapName,
  MapPrototype,
  MapPrototypeGet,
  MapPrototypeSet,
  MapPrototypeSymbolIterator,
  MapPrototypeSymbolToStringTag,
  MapPrototypeHas,
  MapPrototypeDelete,
  MapPrototypeClear,
  MapPrototypeEntries,
  MapPrototypeForEach,
  MapPrototypeKeys,
  MapPrototypeValues,
  MapPrototypeGetSize,

  Math,
  MathAbs,
  MathAcos,
  MathAcosh,
  MathAsin,
  MathAsinh,
  MathAtan2,
  MathAtan,
  MathAtanh,
  MathCbrt,
  MathCeil,
  MathClz32,
  MathCos,
  MathCosh,
  MathE,
  MathExp,
  MathExpm1,
  MathFloor,
  MathFround,
  MathHypot,
  MathHypotApply,
  MathImul,
  MathLN10,
  MathLN2,
  MathLOG10E,
  MathLOG2E,
  MathLog10,
  MathLog1p,
  MathLog2,
  MathLog,
  MathMax,
  MathMaxApply,
  MathMin,
  MathMinApply,
  MathPI,
  MathPow,
  MathRandom,
  MathRound,
  MathSQRT1_2,
  MathSQRT2,
  MathSign,
  MathSin,
  MathSinh,
  MathSqrt,
  MathSymbolToStringTag,
  MathTan,
  MathTanh,
  MathTrunc,

  Number,
  NumberEPSILON,
  NumberIsFinite,
  NumberIsInteger,
  NumberIsNaN,
  NumberIsSafeInteger,
  NumberLength,
  NumberMAX_SAFE_INTEGER,
  NumberMAX_VALUE,
  NumberMIN_SAFE_INTEGER,
  NumberMIN_VALUE,
  NumberNEGATIVE_INFINITY,
  NumberNaN,
  NumberName,
  NumberPOSITIVE_INFINITY,
  NumberParseFloat,
  NumberParseInt,
  NumberPrototype,
  NumberPrototypeToExponential,
  NumberPrototypeToFixed,
  NumberPrototypeToLocaleString,
  NumberPrototypeToPrecision,
  NumberPrototypeToString,
  NumberPrototypeValueOf,

  Object,
  ObjectAssign,
  ObjectCreate,
  ObjectDefineProperties,
  ObjectDefineProperty,
  ObjectEntries,
  ObjectFreeze,
  ObjectFromEntries,
  ObjectGetOwnPropertyDescriptor,
  ObjectGetOwnPropertyDescriptors,
  ObjectGetOwnPropertyNames,
  ObjectGetOwnPropertySymbols,
  ObjectGetPrototypeOf,
  ObjectIs,
  ObjectIsExtensible,
  ObjectIsFrozen,
  ObjectIsSealed,
  ObjectKeys,
  ObjectLength,
  ObjectName,
  ObjectPreventExtensions,
  ObjectPrototype,
  ObjectPrototypeGet__proto__,
  ObjectPrototypeHasOwnProperty,
  ObjectPrototypeIsPrototypeOf,
  ObjectPrototypePropertyIsEnumerable,
  ObjectPrototypeSet__proto__,
  ObjectPrototypeToLocaleString,
  ObjectPrototypeToString,
  ObjectPrototypeValueOf,
  ObjectPrototype__defineGetter__,
  ObjectPrototype__defineSetter__,
  ObjectPrototype__lookupGetter__,
  ObjectPrototype__lookupSetter__,
  ObjectSeal,
  ObjectSetPrototypeOf,
  ObjectValues,

  Promise,
  PromiseAll,
  PromiseAllSettled,
  PromiseAny,
  PromiseGetSymbolSpecies,
  PromiseLength,
  PromiseName,
  PromisePrototype,
  PromisePrototypeCatch,
  PromisePrototypeFinally,
  PromisePrototypeSymbolToStringTag,
  PromisePrototypeThen,
  PromiseRace,
  PromiseReject,
  PromiseResolve,

  Proxy,
  ProxyLength,
  ProxyName,
  ProxyRevocable,

  RangeError,
  RangeErrorLength,
  RangeErrorName,
  RangeErrorPrototype,
  RangeErrorPrototypeMessage,
  RangeErrorPrototypeName,

  ReferenceError,
  ReferenceErrorLength,
  ReferenceErrorName,
  ReferenceErrorPrototype,
  ReferenceErrorPrototypeMessage,
  ReferenceErrorPrototypeName,

  Reflect,
  ReflectApply,
  ReflectConstruct,
  ReflectDefineProperty,
  ReflectDeleteProperty,
  ReflectGet,
  ReflectGetOwnPropertyDescriptor,
  ReflectGetPrototypeOf,
  ReflectHas,
  ReflectIsExtensible,
  ReflectOwnKeys,
  ReflectPreventExtensions,
  ReflectSet,
  ReflectSetPrototypeOf,
  ReflectSymbolToStringTag,

  RegExp,
  RegExpGet$1,
  RegExpGet$2,
  RegExpGet$3,
  RegExpGet$4,
  RegExpGet$5,
  RegExpGet$6,
  RegExpGet$7,
  RegExpGet$8,
  RegExpGet$9,
  RegExpGet$_,
  RegExpGetInput,
  RegExpGetLastMatch,
  RegExpGetLastParen,
  RegExpGetLeftContext,
  RegExpGetRightContext,
  RegExpGetSymbolSpecies,
  RegExpLength,
  RegExpName,
  RegExpPrototype,
  RegExpPrototypeCompile,
  RegExpPrototypeExec,
  RegExpPrototypeGetDotAll,
  RegExpPrototypeGetFlags,
  RegExpPrototypeGetGlobal,
  RegExpPrototypeGetHasIndices,
  RegExpPrototypeGetIgnoreCase,
  RegExpPrototypeGetMultiline,
  RegExpPrototypeGetSource,
  RegExpPrototypeGetSticky,
  RegExpPrototypeGetUnicode,
  RegExpPrototypeSymbolMatch,
  RegExpPrototypeSymbolMatchAll,
  RegExpPrototypeSymbolReplace,
  RegExpPrototypeSymbolSearch,
  RegExpPrototypeSymbolSplit,
  RegExpPrototypeTest,
  RegExpPrototypeToString,
  RegExpSet$1,
  RegExpSet$2,
  RegExpSet$3,
  RegExpSet$4,
  RegExpSet$5,
  RegExpSet$6,
  RegExpSet$7,
  RegExpSet$8,
  RegExpSet$9,
  RegExpSet$_,
  RegExpSetInput,
  RegExpSetLastMatch,
  RegExpSetLastParen,
  RegExpSetLeftContext,
  RegExpSetRightContext,

  RegExpGetDollarSquo,
  RegExpGetDollarAmp,
  RegExpGetDollarPlus,
  RegExpGetDollarTick,
  RegExpSetDollarSquo,
  RegExpSetDollarAmp,
  RegExpSetDollarPlus,
  RegExpSetDollarTick,

  "RegExpGet$'": RegExpGetDollarSquo,
  "RegExpGet$&": RegExpGetDollarAmp,
  "RegExpGet$+": RegExpGetDollarPlus,
  "RegExpGet$`": RegExpGetDollarTick,
  "RegExpSet$'": RegExpSetDollarSquo,
  "RegExpSet$&": RegExpSetDollarAmp,
  "RegExpSet$+": RegExpSetDollarPlus,
  "RegExpSet$`": RegExpSetDollarTick,

  Set,
  SetGetSymbolSpecies,
  SetLength,
  SetName,
  SetPrototype,
  SetPrototypeHas,
  SetPrototypeAdd,
  SetPrototypeDelete,
  SetPrototypeClear,
  SetPrototypeEntries,
  SetPrototypeForEach,
  SetPrototypeValues,
  SetPrototypeKeys,
  SetPrototypeSymbolIterator,
  SetPrototypeSymbolToStringTag,
  SetPrototypeGetSize,

  String,
  StringLength,
  StringName,
  StringPrototype,
  StringFromCharCode,
  StringFromCharCodeApply,
  StringFromCodePoint,
  StringFromCodePointApply,
  StringRaw,
  StringPrototypeAnchor,
  StringPrototypeBig,
  StringPrototypeBlink,
  StringPrototypeBold,
  StringPrototypeCharAt,
  StringPrototypeCharCodeAt,
  StringPrototypeCodePointAt,
  StringPrototypeConcat,
  StringPrototypeConcatApply,
  StringPrototypeEndsWith,
  StringPrototypeFontcolor,
  StringPrototypeFontsize,
  StringPrototypeFixed,
  StringPrototypeIncludes,
  StringPrototypeIndexOf,
  StringPrototypeItalics,
  StringPrototypeLastIndexOf,
  StringPrototypeLength,
  StringPrototypeLink,
  StringPrototypeLocaleCompare,
  StringPrototypeMatch,
  StringPrototypeMatchAll,
  StringPrototypeNormalize,
  StringPrototypePadEnd,
  StringPrototypePadStart,
  StringPrototypeRepeat,
  StringPrototypeReplace,
  StringPrototypeSearch,
  StringPrototypeSlice,
  StringPrototypeSmall,
  StringPrototypeSplit,
  StringPrototypeStrike,
  StringPrototypeSub,
  StringPrototypeSubstr,
  StringPrototypeSubstring,
  StringPrototypeSup,
  StringPrototypeStartsWith,
  StringPrototypeToString,
  StringPrototypeTrim,
  StringPrototypeTrimStart,
  StringPrototypeTrimLeft,
  StringPrototypeTrimEnd,
  StringPrototypeTrimRight,
  StringPrototypeSymbolIterator,
  StringPrototypeToLocaleLowerCase,
  StringPrototypeToLocaleUpperCase,
  StringPrototypeToLowerCase,
  StringPrototypeToUpperCase,
  StringPrototypeValueOf,
  StringPrototypeReplaceAll,

  StringIterator,
  StringIteratorPrototype,
  StringIteratorPrototypeNext,
  StringIteratorPrototypeSymbolToStringTag,

  Symbol,
  SymbolLength,
  SymbolName,
  SymbolPrototype,
  SymbolFor,
  SymbolKeyFor,
  SymbolAsyncIterator,
  SymbolHasInstance,
  SymbolIsConcatSpreadable,
  SymbolIterator,
  SymbolMatch,
  SymbolMatchAll,
  SymbolReplace,
  SymbolSearch,
  SymbolSpecies,
  SymbolSplit,
  SymbolToPrimitive,
  SymbolToStringTag,
  SymbolUnscopables,
  SymbolPrototypeToString,
  SymbolPrototypeValueOf,
  SymbolPrototypeSymbolToPrimitive,
  SymbolPrototypeSymbolToStringTag,
  SymbolPrototypeGetDescription,

  SyntaxError,
  SyntaxErrorLength,
  SyntaxErrorName,
  SyntaxErrorPrototype,
  SyntaxErrorPrototypeMessage,
  SyntaxErrorPrototypeName,

  TypedArray,
  TypedArrayFrom,
  TypedArrayGetSymbolSpecies,
  TypedArrayLength,
  TypedArrayName,
  TypedArrayOf,
  TypedArrayOfApply,
  TypedArrayPrototype,
  TypedArrayPrototypeCopyWithin,
  TypedArrayPrototypeEntries,
  TypedArrayPrototypeEvery,
  TypedArrayPrototypeFill,
  TypedArrayPrototypeFilter,
  TypedArrayPrototypeFind,
  TypedArrayPrototypeFindIndex,
  TypedArrayPrototypeForEach,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteLength,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetLength,
  TypedArrayPrototypeGetSymbolToStringTag,
  TypedArrayPrototypeIncludes,
  TypedArrayPrototypeIndexOf,
  TypedArrayPrototypeJoin,
  TypedArrayPrototypeKeys,
  TypedArrayPrototypeLastIndexOf,
  TypedArrayPrototypeMap,
  TypedArrayPrototypeReduce,
  TypedArrayPrototypeReduceRight,
  TypedArrayPrototypeReverse,
  TypedArrayPrototypeSet,
  TypedArrayPrototypeSlice,
  TypedArrayPrototypeSome,
  TypedArrayPrototypeSort,
  TypedArrayPrototypeSubarray,
  TypedArrayPrototypeSymbolIterator,
  TypedArrayPrototypeToLocaleString,
  TypedArrayPrototypeToString,
  TypedArrayPrototypeValues,

  TypeError,
  TypeErrorLength,
  TypeErrorName,
  TypeErrorPrototype,
  TypeErrorPrototypeMessage,
  TypeErrorPrototypeName,

  URIError,
  URIErrorLength,
  URIErrorName,
  URIErrorPrototype,
  URIErrorPrototypeMessage,
  URIErrorPrototypeName,

  URL,
  URLCreateObjectURL,
  URLRevokeObjectURL,

  Uint16Array,
  Uint16ArrayBYTES_PER_ELEMENT,
  Uint16ArrayLength,
  Uint16ArrayName,
  Uint16ArrayPrototype,
  Uint16ArrayPrototypeBYTES_PER_ELEMENT,

  Uint32Array,
  Uint32ArrayBYTES_PER_ELEMENT,
  Uint32ArrayLength,
  Uint32ArrayName,
  Uint32ArrayPrototype,
  Uint32ArrayPrototypeBYTES_PER_ELEMENT,

  Uint8Array,
  Uint8ArrayBYTES_PER_ELEMENT,
  Uint8ArrayLength,
  Uint8ArrayName,
  Uint8ArrayPrototype,
  Uint8ArrayPrototypeBYTES_PER_ELEMENT,

  Uint8ClampedArray,
  Uint8ClampedArrayBYTES_PER_ELEMENT,
  Uint8ClampedArrayLength,
  Uint8ClampedArrayName,
  Uint8ClampedArrayPrototype,
  Uint8ClampedArrayPrototypeBYTES_PER_ELEMENT,

  WeakMap,
  WeakMapLength,
  WeakMapName,
  WeakMapPrototype,
  WeakMapPrototypeDelete,
  WeakMapPrototypeGet,
  WeakMapPrototypeHas,
  WeakMapPrototypeSet,
  WeakMapPrototypeSymbolToStringTag,

  WeakRef,
  WeakRefLength,
  WeakRefName,
  WeakRefPrototype,
  WeakRefPrototypeDeref,
  WeakRefPrototypeSymbolToStringTag,

  WeakSet,
  WeakSetLength,
  WeakSetName,
  WeakSetPrototype,
  WeakSetPrototypeAdd,
  WeakSetPrototypeDelete,
  WeakSetPrototypeHas,
  WeakSetPrototypeSymbolToStringTag,

  makeSafe,
  SafeMap,
  SafeWeakMap,
  SafeSet,
  SafeWeakSet,
  SafeFinalizationRegistry,
  SafeWeakRef,
  SafePromise,
});

SafeObject.freeze(primordials);

export { primordials };
