import { primordials } from "./primordials.js";

import { constants, getOwnNonIndexProperties, previewEntries } from "./util.js";
const { ALL_PROPERTIES, ONLY_ENUMERABLE } = constants;

import {
  isError,
  customInspectSymbol,
  join,
  removeColors,
} from "./internal-util.js";

import { isStackOverflowError } from "./internal-errors.js";

import {
  isAsyncFunction,
  isGeneratorFunction,
  isAnyArrayBuffer,
  isArrayBuffer,
  isArgumentsObject,
  isBoxedPrimitive,
  isDataView,
  // isExternal,
  isMap,
  isMapIterator,
  isModuleNamespaceObject,
  isNativeError,
  isPromise,
  isSet,
  isSetIterator,
  isWeakMap,
  isWeakSet,
  isRegExp,
  isDate,
  isTypedArray,
  isStringObject,
  isNumberObject,
  isBooleanObject,
  isBigIntObject,
} from "./internal-util-types.js";

import { assert } from "./internal-assert.js";

// const { BuiltinModule } = require("internal/bootstrap/realm");
import {
  validateObject,
  validateString,
  kValidateObjectAllowArray,
} from "./internal-validators.js";

import { hexSlice } from "./hex-slice.js";

// JB: No way to do this engine-agnostically. References the CWD and depends
//     upon require.resolve() (which must discern Posix vs. Windows).
// // let internalUrl;
// //
// // function pathToFileUrlHref(filepath: string) {
// //   internalUrl ??= require("internal/url");
// //   return internalUrl.pathToFileURL(filepath).href;
// // }

function isURL(value: unknown) {
  return value instanceof URL;
}

const builtInObjects = new primordials.SafeSet(
  primordials.ArrayPrototypeFilter(
    primordials.ObjectGetOwnPropertyNames(globalThis),
    (e) => primordials.RegExpPrototypeExec(/^[A-Z][a-zA-Z0-9]+$/, e) !== null,
  ),
);

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
const isUndetectableObject = (v: unknown) =>
  typeof v === "undefined" && v !== undefined;

// These options must stay in sync with `getUserOptions`. So if any option will
// be added or removed, `getUserOptions` must also be updated accordingly.
export const inspectDefaultOptions = Object.seal({
  showHidden: false,
  depth: 2,
  colors: false,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  maxStringLength: 10000,
  breakLength: 80,
  compact: 3,
  sorted: false,
  getters: false,
  numericSeparator: false,
});

const kObjectType = 0;
const kArrayType = 1;
const kArrayExtrasType = 2;

/* eslint-disable no-control-regex */
const strEscapeSequencesRegExp =
  /[\x00-\x1f\x27\x5c\x7f-\x9f]|[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/;
const strEscapeSequencesReplacer =
  /[\x00-\x1f\x27\x5c\x7f-\x9f]|[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;
const strEscapeSequencesRegExpSingle =
  /[\x00-\x1f\x5c\x7f-\x9f]|[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/;
const strEscapeSequencesReplacerSingle =
  /[\x00-\x1f\x5c\x7f-\x9f]|[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;
/* eslint-enable no-control-regex */

const keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const numberRegExp = /^(0|[1-9][0-9]*)$/;

const coreModuleRegExp = /^ {4}at (?:[^/\\(]+ \(|)node:(.+):\d+:\d+\)?$/;
const nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;

const classRegExp = /^(\s+[^(]*?)\s*{/;
// eslint-disable-next-line node-core/no-unescaped-regexp-dot
const stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;

const kMinLineLength = 16;

// Constants to map the iterator state.
const kWeak = 0;
const kIterator = 1;
const kMapEntries = 2;

// Escaped control characters (plus the single quote and the backslash). Use
// empty strings to fill up unused entries.
const meta = [
  "\\x00",
  "\\x01",
  "\\x02",
  "\\x03",
  "\\x04",
  "\\x05",
  "\\x06",
  "\\x07", // x07
  "\\b",
  "\\t",
  "\\n",
  "\\x0B",
  "\\f",
  "\\r",
  "\\x0E",
  "\\x0F", // x0F
  "\\x10",
  "\\x11",
  "\\x12",
  "\\x13",
  "\\x14",
  "\\x15",
  "\\x16",
  "\\x17", // x17
  "\\x18",
  "\\x19",
  "\\x1A",
  "\\x1B",
  "\\x1C",
  "\\x1D",
  "\\x1E",
  "\\x1F", // x1F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\'",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "", // x2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "", // x3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "", // x4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "", // x5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "", // x6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\x7F", // x7F
  "\\x80",
  "\\x81",
  "\\x82",
  "\\x83",
  "\\x84",
  "\\x85",
  "\\x86",
  "\\x87", // x87
  "\\x88",
  "\\x89",
  "\\x8A",
  "\\x8B",
  "\\x8C",
  "\\x8D",
  "\\x8E",
  "\\x8F", // x8F
  "\\x90",
  "\\x91",
  "\\x92",
  "\\x93",
  "\\x94",
  "\\x95",
  "\\x96",
  "\\x97", // x97
  "\\x98",
  "\\x99",
  "\\x9A",
  "\\x9B",
  "\\x9C",
  "\\x9D",
  "\\x9E",
  "\\x9F", // x9F
];

// Regex used for ansi escape code splitting
// Ref: https://github.com/chalk/ansi-regex/blob/f338e1814144efb950276aac84135ff86b72dc8e/index.js
// License: MIT by Sindre Sorhus <sindresorhus@gmail.com>
// Matches all ansi escape code sequences in a string
const ansi = new RegExp(
  "[\\u001B\\u009B][[\\]()#;?]*" +
    "(?:(?:(?:(?:;[-a-zA-Z\\d\\/\\#&.:=?%@~_]+)*" +
    "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/\\#&.:=?%@~_]*)*)?" +
    "(?:\\u0007|\\u001B\\u005C|\\u009C))" +
    "|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?" +
    "[\\dA-PR-TZcf-nq-uy=><~]))",
  "g",
);

export let getStringWidth: (
  str: string,
  removeControlChars?: boolean,
) => number;

function getUserOptions(ctx: Context, isCrossContext: boolean) {
  const ret = {
    stylize: ctx.stylize,
    showHidden: ctx.showHidden,
    depth: ctx.depth,
    colors: ctx.colors,
    customInspect: ctx.customInspect,
    showProxy: ctx.showProxy,
    maxArrayLength: ctx.maxArrayLength,
    maxStringLength: ctx.maxStringLength,
    breakLength: ctx.breakLength,
    compact: ctx.compact,
    sorted: ctx.sorted,
    getters: ctx.getters,
    numericSeparator: ctx.numericSeparator,
    ...ctx.userOptions,
  };

  // Typically, the target value will be an instance of `Object`. If that is
  // *not* the case, the object may come from another vm.Context, and we want
  // to avoid passing it objects from this Context in that case, so we remove
  // the prototype from the returned object itself + the `stylize()` function,
  // and remove all other non-primitives, including non-primitive user options.
  if (isCrossContext) {
    primordials.ObjectSetPrototypeOf(ret, null);
    for (const key of primordials.ObjectKeys(ret)) {
      if (
        (typeof ret[key as keyof typeof ret] === "object" ||
          typeof ret[key as keyof typeof ret] === "function") &&
        ret[key as keyof typeof ret] !== null
      ) {
        delete ret[key as keyof typeof ret];
      }
    }
    ret.stylize = primordials.ObjectSetPrototypeOf(
      (value: string, flavour: string) => {
        let stylized;
        try {
          stylized = `${ctx.stylize(value, flavour)}`;
        } catch {
          // Continue regardless of error.
        }

        if (typeof stylized !== "string") return value;
        // `stylized` is a string as it should be, which is safe to pass along.
        return stylized;
      },
      null,
    );
  }

  return ret;
}

/**
 * Echos the value of any input. Tries to print the value out
 * in the best way possible given the different types.
 * @param value The value to print out.
 * @param opts Optional options object that alters the output.
 */
/* Legacy: value, showHidden, depth, colors */
export function inspect(
  value: unknown,
  opts?: boolean | Partial<Context>,
): string {
  // Default options
  const ctx: Context = {
    budget: {} as Record<string, number>,
    indentationLvl: 0,
    seen: [],
    currentDepth: 0,
    stylize: stylizeNoColor,
    showHidden: inspectDefaultOptions.showHidden,
    depth: inspectDefaultOptions.depth,
    colors: inspectDefaultOptions.colors,
    customInspect: inspectDefaultOptions.customInspect,
    showProxy: inspectDefaultOptions.showProxy,
    maxArrayLength: inspectDefaultOptions.maxArrayLength,
    maxStringLength: inspectDefaultOptions.maxStringLength,
    breakLength: inspectDefaultOptions.breakLength,
    compact: inspectDefaultOptions.compact,
    sorted: inspectDefaultOptions.sorted,
    getters: inspectDefaultOptions.getters,
    numericSeparator: inspectDefaultOptions.numericSeparator,
    userOptions: undefined,
  };

  if (arguments.length > 1) {
    // Legacy...
    if (arguments.length > 2) {
      if (arguments[2] !== undefined) {
        ctx.depth = arguments[2];
      }
      if (arguments.length > 3 && arguments[3] !== undefined) {
        ctx.colors = arguments[3];
      }
    }
    // Set user-specified options
    if (typeof opts === "boolean") {
      ctx.showHidden = opts;
    } else if (opts) {
      const optKeys = primordials.ObjectKeys(opts);
      for (let i = 0; i < optKeys.length; ++i) {
        const key = optKeys[i];
        // TODO(BridgeAR): Find a solution what to do about stylize. Either make
        // this function public or add a new API with a similar or better
        // functionality.
        if (
          primordials.ObjectPrototypeHasOwnProperty(
            inspectDefaultOptions,
            key,
          ) ||
          key === "stylize"
        ) {
          // @ts-ignore unindexed access
          ctx[key] = opts[key];
        } else if (ctx.userOptions === undefined) {
          // This is required to pass through the actual user input.
          ctx.userOptions = opts;
        }
      }
    }
  }
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  if (ctx.maxArrayLength === null) ctx.maxArrayLength = Infinity;
  if (ctx.maxStringLength === null) ctx.maxStringLength = Infinity;
  return formatValue(ctx, value, 0);
}
inspect.custom = customInspectSymbol;

primordials.ObjectDefineProperty(inspect, "defaultOptions", {
  // @ts-ignore
  __proto__: null,
  get() {
    return inspectDefaultOptions;
  },
  set(options: unknown) {
    validateObject(options, "options");
    return primordials.ObjectAssign(inspectDefaultOptions, options);
  },
});

// Set Graphics Rendition https://en.wikipedia.org/wiki/ANSI_escape_code#graphics
// Each color consists of an array with the color code as first entry and the
// reset code as second entry.
const defaultFG = 39;
const defaultBG = 49;
inspect.colors = {
  // JB: Hide this key from TypeScript.
  __proto__: null as unknown as [number, number],
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22], // Alias: faint
  italic: [3, 23],
  underline: [4, 24],
  blink: [5, 25],
  // Swap foreground and background colors
  inverse: [7, 27], // Alias: swapcolors, swapColors
  hidden: [8, 28], // Alias: conceal
  strikethrough: [9, 29], // Alias: strikeThrough, crossedout, crossedOut
  doubleunderline: [21, 24], // Alias: doubleUnderline
  black: [30, defaultFG],
  red: [31, defaultFG],
  green: [32, defaultFG],
  yellow: [33, defaultFG],
  blue: [34, defaultFG],
  magenta: [35, defaultFG],
  cyan: [36, defaultFG],
  white: [37, defaultFG],
  bgBlack: [40, defaultBG],
  bgRed: [41, defaultBG],
  bgGreen: [42, defaultBG],
  bgYellow: [43, defaultBG],
  bgBlue: [44, defaultBG],
  bgMagenta: [45, defaultBG],
  bgCyan: [46, defaultBG],
  bgWhite: [47, defaultBG],
  framed: [51, 54],
  overlined: [53, 55],
  gray: [90, defaultFG], // Alias: grey, blackBright
  redBright: [91, defaultFG],
  greenBright: [92, defaultFG],
  yellowBright: [93, defaultFG],
  blueBright: [94, defaultFG],
  magentaBright: [95, defaultFG],
  cyanBright: [96, defaultFG],
  whiteBright: [97, defaultFG],
  bgGray: [100, defaultBG], // Alias: bgGrey, bgBlackBright
  bgRedBright: [101, defaultBG],
  bgGreenBright: [102, defaultBG],
  bgYellowBright: [103, defaultBG],
  bgBlueBright: [104, defaultBG],
  bgMagentaBright: [105, defaultBG],
  bgCyanBright: [106, defaultBG],
  bgWhiteBright: [107, defaultBG],
} satisfies Record<string, [number, number]>;

function defineColorAlias(target: string, alias: PropertyKey) {
  primordials.ObjectDefineProperty(inspect.colors, alias, {
    // @ts-ignore No easy way to represent this type.
    __proto__: null,
    get() {
      return this[target];
    },
    set(value) {
      this[target] = value;
    },
    configurable: true,
    enumerable: false,
  });
}

defineColorAlias("gray", "grey");
defineColorAlias("gray", "blackBright");
defineColorAlias("bgGray", "bgGrey");
defineColorAlias("bgGray", "bgBlackBright");
defineColorAlias("dim", "faint");
defineColorAlias("strikethrough", "crossedout");
defineColorAlias("strikethrough", "strikeThrough");
defineColorAlias("strikethrough", "crossedOut");
defineColorAlias("hidden", "conceal");
defineColorAlias("inverse", "swapColors");
defineColorAlias("inverse", "swapcolors");
defineColorAlias("doubleunderline", "doubleUnderline");

// TODO(BridgeAR): Add function style support for more complex styles.
// Don't use 'blue' not visible on cmd.exe
inspect.styles = primordials.ObjectAssign(
  { __proto__: null },
  {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    // "name": intentionally not styling
    // TODO(BridgeAR): Highlight regular expressions properly.
    regexp: "red",
    module: "underline",
  },
) as Record<string, string>;

function addQuotes(str: string, quotes: number) {
  if (quotes === -1) {
    return `"${str}"`;
  }
  if (quotes === -2) {
    return `\`${str}\``;
  }
  return `'${str}'`;
}

function escapeFn(str: string) {
  // @ts-expect-error It copes with single arg just fine.
  const charCode = StringPrototypeCharCodeAt(str);
  return meta.length > charCode
    ? meta[charCode]
    : `\\u${primordials.NumberPrototypeToString(charCode, 16)}`;
}

// Escape control characters, single quotes and the backslash.
// This is similar to JSON stringify escaping.
function strEscape(str: string) {
  let escapeTest = strEscapeSequencesRegExp;
  let escapeReplace = strEscapeSequencesReplacer;
  let singleQuote = 39;

  // Check for double quotes. If not present, do not escape single quotes and
  // instead wrap the text in double quotes. If double quotes exist, check for
  // backticks. If they do not exist, use those as fallback instead of the
  // double quotes.
  if (primordials.StringPrototypeIncludes(str, "'")) {
    // This invalidates the charCode and therefore can not be matched for
    // anymore.
    if (!primordials.StringPrototypeIncludes(str, '"')) {
      singleQuote = -1;
    } else if (
      !primordials.StringPrototypeIncludes(str, "`") &&
      !primordials.StringPrototypeIncludes(str, "${")
    ) {
      singleQuote = -2;
    }
    if (singleQuote !== 39) {
      escapeTest = strEscapeSequencesRegExpSingle;
      escapeReplace = strEscapeSequencesReplacerSingle;
    }
  }

  // Some magic numbers that worked out fine while benchmarking with v8 6.0
  if (
    str.length < 5000 &&
    primordials.RegExpPrototypeExec(escapeTest, str) === null
  )
    return addQuotes(str, singleQuote);
  if (str.length > 100) {
    str = primordials.RegExpPrototypeSymbolReplace(
      escapeReplace,
      str,
      escapeFn,
    );
    return addQuotes(str, singleQuote);
  }

  let result = "";
  let last = 0;
  for (let i = 0; i < str.length; i++) {
    const point = primordials.StringPrototypeCharCodeAt(str, i);
    if (
      point === singleQuote ||
      point === 92 ||
      point < 32 ||
      (point > 126 && point < 160)
    ) {
      if (last === i) {
        result += meta[point];
      } else {
        result += `${primordials.StringPrototypeSlice(str, last, i)}${meta[point]}`;
      }
      last = i + 1;
    } else if (point >= 0xd800 && point <= 0xdfff) {
      if (point <= 0xdbff && i + 1 < str.length) {
        const point = primordials.StringPrototypeCharCodeAt(str, i + 1);
        if (point >= 0xdc00 && point <= 0xdfff) {
          i++;
          continue;
        }
      }
      result += `${primordials.StringPrototypeSlice(str, last, i)}\\u${primordials.NumberPrototypeToString(point, 16)}`;
      last = i + 1;
    }
  }

  if (last !== str.length) {
    result += primordials.StringPrototypeSlice(str, last);
  }
  return addQuotes(result, singleQuote);
}

function stylizeWithColor(str: string, styleType: string) {
  const style = inspect.styles[styleType];
  if (style !== undefined) {
    const color = inspect.colors[style as keyof (typeof inspect)["colors"]];
    if (color !== undefined)
      return `\u001b[${color[0]}m${str}\u001b[${color[1]}m`;
  }
  return str;
}

function stylizeNoColor(str: string) {
  return str;
}

// Return a new empty array to push in the results of the default formatter.
function getEmptyFormatArray() {
  return new Array<string>();
}

function isInstanceof(object: unknown, proto: Function) {
  try {
    return object instanceof proto;
  } catch {
    return false;
  }
}

// Special-case for some builtin prototypes in case their `constructor` property has been tampered.
const wellKnownPrototypes = new primordials.SafeMap<
  unknown,
  { name: string; constructor: Function }
>()
  .set(primordials.ArrayPrototype, { name: "Array", constructor: Array })
  .set(primordials.ArrayBufferPrototype, {
    name: "ArrayBuffer",
    constructor: ArrayBuffer,
  })
  .set(primordials.FunctionPrototype, {
    name: "Function",
    constructor: Function,
  })
  .set(primordials.MapPrototype, { name: "Map", constructor: Map })
  .set(primordials.SetPrototype, { name: "Set", constructor: Set })
  .set(primordials.ObjectPrototype, { name: "Object", constructor: Object })
  .set(primordials.TypedArrayPrototype, {
    name: "TypedArray",
    constructor: primordials.TypedArray,
  })
  .set(primordials.RegExpPrototype, { name: "RegExp", constructor: RegExp })
  .set(primordials.DatePrototype, { name: "Date", constructor: Date })
  .set(primordials.DataViewPrototype, {
    name: "DataView",
    constructor: DataView,
  })
  .set(primordials.ErrorPrototype, { name: "Error", constructor: Error })
  .set(primordials.BooleanPrototype, { name: "Boolean", constructor: Boolean })
  .set(primordials.NumberPrototype, { name: "Number", constructor: Number })
  .set(primordials.StringPrototype, { name: "String", constructor: String })
  .set(primordials.PromisePrototype, { name: "Promise", constructor: Promise })
  .set(primordials.WeakMapPrototype, { name: "WeakMap", constructor: WeakMap })
  .set(primordials.WeakSetPrototype, { name: "WeakSet", constructor: WeakSet });

function getConstructorName(
  obj: ReturnType<ObjectConstructor["getPrototypeOf"]>,
  ctx: Context,
  recurseTimes: number,
  protoProps: ProtoProps,
): string | null {
  let firstProto: ReturnType<ObjectConstructor["getPrototypeOf"]>;
  const tmp = obj;
  while (obj || isUndetectableObject(obj)) {
    const wellKnownPrototypeNameAndConstructor = wellKnownPrototypes.get(obj);
    if (wellKnownPrototypeNameAndConstructor !== undefined) {
      const { name, constructor } = wellKnownPrototypeNameAndConstructor;
      if (primordials.FunctionPrototypeSymbolHasInstance(constructor, tmp)) {
        if (protoProps !== undefined && firstProto !== obj) {
          addPrototypeProperties(
            ctx,
            tmp,
            firstProto || tmp,
            recurseTimes,
            protoProps,
          );
        }
        return name;
      }
    }
    const descriptor = primordials.ObjectGetOwnPropertyDescriptor(
      obj,
      "constructor",
    );
    if (
      descriptor !== undefined &&
      typeof descriptor.value === "function" &&
      descriptor.value.name !== "" &&
      isInstanceof(tmp, descriptor.value)
    ) {
      if (
        protoProps !== undefined &&
        (firstProto !== obj || !builtInObjects.has(descriptor.value.name))
      ) {
        addPrototypeProperties(
          ctx,
          tmp,
          firstProto || tmp,
          recurseTimes,
          protoProps,
        );
      }
      return String(descriptor.value.name);
    }

    obj = primordials.ObjectGetPrototypeOf(obj);
    if (firstProto === undefined) {
      firstProto = obj;
    }
  }

  if (firstProto === null) {
    return null;
  }

  // JB: internalGetConstructorName is a v8 method, so we have to simplify here.
  //
  // // const res = internalGetConstructorName(tmp);
  // //
  // // if (recurseTimes > ctx.depth && ctx.depth !== null) {
  // //   return `${res} <Complex prototype>`;
  // // }
  // //
  // // const protoConstr = getConstructorName(
  // //   firstProto,
  // //   ctx,
  // //   recurseTimes + 1,
  // //   protoProps,
  // // );
  // //
  // // if (protoConstr === null) {
  // //   return `${res} <${inspect(firstProto, {
  // //     ...ctx,
  // //     customInspect: false,
  // //     depth: -1,
  // //   })}>`;
  // // }
  // //
  // // return `${res} <${protoConstr}>`;

  return "<uninspectable>";
}

// This function has the side effect of adding prototype properties to the
// `output` argument (which is an array). This is intended to highlight user
// defined prototype properties.
function addPrototypeProperties(
  ctx: Context,
  main: ReturnType<ObjectConstructor["getPrototypeOf"]>,
  obj: ReturnType<ObjectConstructor["getPrototypeOf"]>,
  recurseTimes: number,
  output: ProtoProps,
) {
  let depth = 0;
  let keys: Array<string | symbol>;
  let keySet: Set<string | symbol>;
  do {
    if (depth !== 0 || main === obj) {
      obj = primordials.ObjectGetPrototypeOf(obj);
      // Stop as soon as a null prototype is encountered.
      if (obj === null) {
        return;
      }
      // Stop as soon as a built-in object type is detected.
      const descriptor = primordials.ObjectGetOwnPropertyDescriptor(
        obj,
        "constructor",
      );
      if (
        descriptor !== undefined &&
        typeof descriptor.value === "function" &&
        builtInObjects.has(descriptor.value.name)
      ) {
        return;
      }
    }

    if (depth === 0) {
      keySet = new primordials.SafeSet();
    } else {
      primordials.ArrayPrototypeForEach(keys!, (key) => keySet.add(key));
    }
    // Get all own property names and symbols.
    keys = primordials.ReflectOwnKeys(obj);
    primordials.ArrayPrototypePush(ctx.seen, main);
    for (const key of keys) {
      // Ignore the `constructor` property and keys that exist on layers above.
      if (
        key === "constructor" ||
        primordials.ObjectPrototypeHasOwnProperty(main, key) ||
        (depth !== 0 && keySet!.has(key))
      ) {
        continue;
      }
      const desc = primordials.ObjectGetOwnPropertyDescriptor(obj, key);
      if (typeof desc!.value === "function") {
        continue;
      }
      const value = formatProperty(
        ctx,
        obj,
        recurseTimes,
        key,
        kObjectType,
        desc,
        main,
      );
      if (ctx.colors) {
        // Faint!
        primordials.ArrayPrototypePush(output, `\u001b[2m${value}\u001b[22m`);
      } else {
        primordials.ArrayPrototypePush(output, value);
      }
    }
    primordials.ArrayPrototypePop(ctx.seen);
    // Limit the inspection to up to three prototype layers. Using `recurseTimes`
    // is not a good choice here, because it's as if the properties are declared
    // on the current object from the users perspective.
  } while (++depth !== 3);
}

function getPrefix(
  constructor: string | null,
  tag: string,
  fallback: string,
  size = "",
) {
  if (constructor === null) {
    if (tag !== "" && fallback !== tag) {
      return `[${fallback}${size}: null prototype] [${tag}] `;
    }
    return `[${fallback}${size}: null prototype] `;
  }

  if (tag !== "" && constructor !== tag) {
    return `${constructor}${size} [${tag}] `;
  }
  return `${constructor}${size} `;
}

// Look up the keys of the object.
function getKeys(
  value: Parameters<(typeof Object)["keys"]>[0],
  showHidden: boolean,
) {
  let keys: Array<string>;
  const symbols = primordials.ObjectGetOwnPropertySymbols(value);
  if (showHidden) {
    keys = primordials.ObjectGetOwnPropertyNames(value);
    if (symbols.length !== 0)
      primordials.ArrayPrototypePushApply(keys, symbols);
  } else {
    // This might throw if `value` is a Module Namespace Object from an
    // unevaluated module, but we don't want to perform the actual type
    // check because it's expensive.
    // TODO(devsnek): track https://github.com/tc39/ecma262/issues/1209
    // and modify this logic as needed.
    try {
      keys = primordials.ObjectKeys(value);
    } catch (err) {
      assert(
        isNativeError(err) &&
          err.name === "ReferenceError" &&
          isModuleNamespaceObject(value),
      );
      keys = primordials.ObjectGetOwnPropertyNames(value);
    }
    if (symbols.length !== 0) {
      const filter = (key: string) =>
        primordials.ObjectPrototypePropertyIsEnumerable(value, key);
      primordials.ArrayPrototypePushApply(
        keys,
        primordials.ArrayPrototypeFilter(symbols, filter),
      );
    }
  }
  return keys;
}

function getCtxStyle(value: unknown, constructor: string | null, tag: string) {
  let fallback = "";
  // JB: internalGetConstructorName() is v8-specific
  // // if (constructor === null) {
  // //   fallback = internalGetConstructorName(value);
  // //   if (fallback === tag) {
  // //     fallback = "Object";
  // //   }
  // // }
  return getPrefix(constructor, tag, fallback);
}

function formatProxy(
  ctx: Context,
  proxy: [target: object, handler: ProxyHandler<object>],
  recurseTimes: number,
) {
  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    return ctx.stylize("Proxy [Array]", "special");
  }
  recurseTimes += 1;
  ctx.indentationLvl += 2;
  const res = [
    formatValue(ctx, proxy[0], recurseTimes),
    formatValue(ctx, proxy[1], recurseTimes),
  ];
  ctx.indentationLvl -= 2;
  return reduceToSingleString(
    ctx,
    res,
    "",
    ["Proxy [", "]"],
    kArrayExtrasType,
    recurseTimes,
  );
}

// Note: using `formatValue` directly requires the indentation level to be
// corrected by setting `ctx.indentationLvL += diff` and then to decrease the
// value afterwards again.
function formatValue(
  ctx: Context,
  value: unknown,
  recurseTimes: number,
  typedArray = false,
): string {
  // Primitive types cannot have properties.
  if (
    typeof value !== "object" &&
    typeof value !== "function" &&
    !isUndetectableObject(value)
  ) {
    return formatPrimitive(
      ctx.stylize,
      value as string | number | bigint | boolean | undefined | symbol,
      ctx,
    );
  }
  if (value === null) {
    return ctx.stylize("null", "null");
  }

  // Memorize the context for custom inspection on proxies.
  const context = value;

  // JB: It's impossible to detect Proxies in an engine-agnostic fashion, so we
  //     will just have to omit the check altogether.
  // https://stackoverflow.com/a/55130896/5951226
  //
  // // // Always check for proxies to prevent side effects and to prevent triggering
  // // // any proxy handlers.
  // // // const proxy = getProxyDetails(value, !!ctx.showProxy);

  const proxy: [target: object, handler: ProxyHandler<object>] | undefined =
    undefined;
  if (proxy !== undefined) {
    if (proxy === null || proxy[0] === null) {
      return ctx.stylize("<Revoked Proxy>", "special");
    }
    if (ctx.showProxy) {
      return formatProxy(ctx, proxy, recurseTimes);
    }
    value = proxy;
  }

  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it.
  if (ctx.customInspect) {
    const maybeCustom: Inspect | undefined = (
      value as { [customInspectSymbol]: Inspect }
    )[customInspectSymbol];
    if (
      typeof maybeCustom === "function" &&
      // Filter out the util module, its inspect function is special.
      maybeCustom !== inspect &&
      // Also filter out any prototype objects using the circular check.
      primordials.ObjectGetOwnPropertyDescriptor(value, "constructor")?.value
        ?.prototype !== value
    ) {
      // This makes sure the recurseTimes are reported as before while using
      // a counter internally.
      const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
      const isCrossContext =
        proxy !== undefined ||
        !primordials.FunctionPrototypeSymbolHasInstance(Object, context);
      const ret = primordials.FunctionPrototypeCall(
        maybeCustom,
        context,
        depth,
        getUserOptions(ctx, isCrossContext),
        inspect,
      );
      // If the custom inspection method returned `this`, don't go into
      // infinite recursion.
      if (ret !== context) {
        if (typeof ret !== "string") {
          return formatValue(ctx, ret, recurseTimes);
        }
        return primordials.StringPrototypeReplaceAll(
          ret,
          "\n",
          // @ts-ignore
          `\n${primordials.StringPrototypeRepeat(" ", ctx.indentationLvl)}`,
        );
      }
    }
  }

  // Using an array here is actually better for the average case than using
  // a Set. `seen` will only check for the depth and will never grow too large.
  if (ctx.seen.includes(value)) {
    let index = 1;
    if (ctx.circular === undefined) {
      ctx.circular = new primordials.SafeMap();
      ctx.circular.set(value, index);
    } else {
      index = ctx.circular.get(value) as number;
      if (index === undefined) {
        index = ctx.circular.size + 1;
        ctx.circular.set(value, index);
      }
    }
    return ctx.stylize(`[Circular *${index}]`, "special");
  }

  return formatRaw(ctx, value, recurseTimes, typedArray);
}

function formatRaw(
  ctx: Context,
  value: unknown,
  recurseTimes: number,
  typedArray?: boolean,
) {
  let keys: Array<string | symbol>;
  let protoProps: ProtoProps;
  if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
    protoProps = [];
  }

  const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
  // Reset the variable to check for this later on.
  if (protoProps !== undefined && protoProps.length === 0) {
    protoProps = undefined;
  }

  // @ts-ignore
  let tag: string | undefined = value[primordials.SymbolToStringTag];
  // Only list the tag in case it's non-enumerable / not an own property.
  // Otherwise we'd print this twice.
  if (
    typeof tag !== "string" ||
    (tag !== "" &&
      (ctx.showHidden
        ? primordials.ObjectPrototypeHasOwnProperty
        : primordials.ObjectPrototypePropertyIsEnumerable)(
        value,
        primordials.SymbolToStringTag,
      ))
  ) {
    tag = "";
  }
  let base = "";
  let formatter: (
    ctx: Context,
    value: unknown,
    recurseTimes: number,
  ) => Array<string> = getEmptyFormatArray;
  let braces: Braces;
  let noIterator = true;
  let i = 0;
  const filter = ctx.showHidden ? ALL_PROPERTIES : ONLY_ENUMERABLE;

  let extrasType: Extras = kObjectType;

  // Iterators and the rest are split to reduce checks.
  // We have to check all values in case the constructor is set to null.
  // Otherwise it would not possible to identify all types properly.
  if (
    primordials.SymbolIterator in (value as Iterable<unknown>) ||
    constructor === null
  ) {
    noIterator = false;
    if (primordials.ArrayIsArray(value)) {
      // Only set the constructor for non ordinary ("Array [...]") arrays.
      const prefix =
        constructor !== "Array" || tag !== ""
          ? getPrefix(constructor, tag, "Array", `(${value.length})`)
          : "";
      keys = getOwnNonIndexProperties(value, filter);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && protoProps === undefined)
        return `${braces[0]}]`;
      extrasType = kArrayExtrasType;
      // @ts-ignore
      formatter = formatArray;
    } else if (isSet(value)) {
      const size = primordials.SetPrototypeGetSize(value);
      const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter =
        constructor !== null
          ? primordials.FunctionPrototypeBind(formatSet, null, value)
          : primordials.FunctionPrototypeBind(
              formatSet,
              null,
              primordials.SetPrototypeValues(value),
            );
      if (size === 0 && keys.length === 0 && protoProps === undefined)
        return `${prefix}{}`;
      braces = [`${prefix}{`, "}"];
    } else if (isMap(value)) {
      const size = primordials.MapPrototypeGetSize(value);
      const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter =
        constructor !== null
          ? primordials.FunctionPrototypeBind(formatMap, null, value)
          : primordials.FunctionPrototypeBind(
              formatMap,
              null,
              primordials.MapPrototypeEntries(value),
            );
      if (size === 0 && keys.length === 0 && protoProps === undefined)
        return `${prefix}{}`;
      braces = [`${prefix}{`, "}"];
    } else if (isTypedArray(value)) {
      keys = getOwnNonIndexProperties(value, filter);
      let bound = value;
      let fallback:
        | "Uint8Array"
        | "Int8Array"
        | "Uint16Array"
        | "Uint8ClampedArray"
        | "Int16Array"
        | "Uint32Array"
        | "Int32Array"
        | "Float32Array"
        | "Float64Array"
        | ""
        | undefined = "";
      if (constructor === null) {
        fallback = primordials.TypedArrayPrototypeGetSymbolToStringTag(value);
        // Reconstruct the array information.
        primordials.Int8Array;
        bound = new primordials[fallback!](value);
      }
      const size = primordials.TypedArrayPrototypeGetLength(value);
      const prefix = getPrefix(constructor, tag, fallback!, `(${size})`);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && !ctx.showHidden)
        return `${braces[0]}]`;
      // Special handle the value. The original value is required below. The
      // bound function is required to reconstruct missing information.
      formatter = primordials.FunctionPrototypeBind(
        formatTypedArray,
        null,
        bound,
        size,
      );
      extrasType = kArrayExtrasType;
    } else if (isMapIterator(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Map", tag);
      // Add braces to the formatter parameters.
      formatter = primordials.FunctionPrototypeBind(
        formatIterator,
        null,
        braces,
      );
    } else if (isSetIterator(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Set", tag);
      // Add braces to the formatter parameters.
      formatter = primordials.FunctionPrototypeBind(
        formatIterator,
        null,
        braces,
      );
    } else {
      noIterator = true;
    }
  }
  if (noIterator) {
    keys = getKeys(value as {}, ctx.showHidden);
    braces = ["{", "}"];
    if (typeof value === "function") {
      base = getFunctionBase(
        ctx,
        value as (...args: unknown[]) => unknown,
        constructor,
        tag,
      );
      if (keys.length === 0 && protoProps === undefined)
        return ctx.stylize(base, "special");
    } else if (constructor === "Object") {
      if (isArgumentsObject(value)) {
        braces[0] = "[Arguments] {";
      } else if (tag !== "") {
        braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
      }
      if (keys.length === 0 && protoProps === undefined) {
        return `${braces[0]}}`;
      }
    } else if (isRegExp(value)) {
      // Make RegExps say that they are RegExps
      base = primordials.RegExpPrototypeToString(
        constructor !== null ? value : new RegExp(value),
      );
      const prefix = getPrefix(constructor, tag, "RegExp");
      if (prefix !== "RegExp ") base = `${prefix}${base}`;
      if (
        (keys.length === 0 && protoProps === undefined) ||
        (recurseTimes > ctx.depth && ctx.depth !== null)
      ) {
        return ctx.stylize(base, "regexp");
      }
    } else if (isDate(value)) {
      // Make dates with properties first say the date
      base = primordials.NumberIsNaN(primordials.DatePrototypeGetTime(value))
        ? primordials.DatePrototypeToString(value)
        : primordials.DatePrototypeToISOString(value);
      const prefix = getPrefix(constructor, tag, "Date");
      if (prefix !== "Date ") base = `${prefix}${base}`;
      if (keys.length === 0 && protoProps === undefined) {
        return ctx.stylize(base, "date");
      }
    } else if (isError(value)) {
      base = formatError(value, constructor, tag, ctx, keys);
      if (keys.length === 0 && protoProps === undefined) return base;
    } else if (isAnyArrayBuffer(value)) {
      // Fast path for ArrayBuffer and SharedArrayBuffer.
      // Can't do the same for DataView because it has a non-primitive
      // .buffer property that we need to recurse for.
      const arrayType = isArrayBuffer(value)
        ? "ArrayBuffer"
        : "SharedArrayBuffer";
      const prefix = getPrefix(constructor, tag, arrayType);
      if (typedArray === undefined) {
        // @ts-expect-error Source is missing recurseTimes argument
        formatter = formatArrayBuffer;
      } else if (keys.length === 0 && protoProps === undefined) {
        return (
          prefix +
          `{ byteLength: ${formatNumber(ctx.stylize, value.byteLength, false)} }`
        );
      }
      braces[0] = `${prefix}{`;
      primordials.ArrayPrototypeUnshift(keys, "byteLength");
    } else if (isDataView(value)) {
      braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
      // .buffer goes last, it's not a primitive like the others.
      primordials.ArrayPrototypeUnshift(
        keys,
        "byteLength",
        "byteOffset",
        "buffer",
      );
    } else if (isPromise(value)) {
      braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
      formatter = formatPromise;
    } else if (isWeakSet(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
      // JB: We can't iterate over WeakSet in an engine-agnostic fashion.
      //
      // // formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
      formatter = formatWeakCollection;
    } else if (isWeakMap(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
      // JB: We can't iterate over WeakMap in an engine-agnostic fashion.
      //
      // // formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
      formatter = formatWeakCollection;
      // JB: I'm not aware of any way to detect a module namespace in an
      //     engine-agnostic fashion.
      //
      // // } else if (isModuleNamespaceObject(value)) {
      // //   braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
      // //   // Special handle keys for namespace objects.
      // //   formatter = formatNamespaceObject.bind(null, keys);
    } else if (isBoxedPrimitive(value)) {
      base = getBoxedBase(value, ctx, keys, constructor, tag);
      if (keys.length === 0 && protoProps === undefined) {
        return base;
      }
    } else if (
      isURL(value) &&
      !(recurseTimes > ctx.depth && ctx.depth !== null)
    ) {
      base = value.href;
      if (keys.length === 0 && protoProps === undefined) {
        return base;
      }
    } else {
      if (keys.length === 0 && protoProps === undefined) {
        // JB: I'm not aware of any way to detect external values in an
        //     engine-agnostic fashion.
        // // if (isExternal(value)) {
        // //   const address = getExternalValue(value).toString(16);
        // //   return ctx.stylize(`[External: ${address}]`, "special");
        // // }
        return `${getCtxStyle(value, constructor, tag)}{}`;
      }
      braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
    }
  }

  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    let constructorName = primordials.StringPrototypeSlice(
      getCtxStyle(value, constructor, tag),
      0,
      -1,
    );
    if (constructor !== null) constructorName = `[${constructorName}]`;
    return ctx.stylize(constructorName, "special");
  }
  recurseTimes += 1;

  ctx.seen.push(value);
  ctx.currentDepth = recurseTimes;
  let output;
  const indentationLvl = ctx.indentationLvl;
  try {
    output = formatter(ctx, value, recurseTimes);
    for (i = 0; i < keys!.length; i++) {
      primordials.ArrayPrototypePush(
        output,
        formatProperty(
          ctx,
          value as Record<string, unknown>,
          recurseTimes,
          keys![i],
          extrasType,
        ),
      );
    }
    if (protoProps !== undefined) {
      primordials.ArrayPrototypePushApply(output, protoProps);
    }
  } catch (err) {
    if (!isStackOverflowError(err as Error)) throw err;
    const constructorName = primordials.StringPrototypeSlice(
      getCtxStyle(value, constructor, tag),
      0,
      -1,
    );
    return handleMaxCallStackSize(
      ctx,
      err as Error,
      constructorName,
      indentationLvl,
    );
  }
  if (ctx.circular !== undefined) {
    const index = ctx.circular.get(value);
    if (index !== undefined) {
      const reference = ctx.stylize(`<ref *${index}>`, "special");
      // Add reference always to the very beginning of the output.
      if (ctx.compact !== true) {
        base = base === "" ? reference : `${reference} ${base}`;
      } else {
        // @ts-ignore
        braces[0] = `${reference} ${braces[0]}`;
      }
    }
  }
  ctx.seen.pop();

  if (ctx.sorted) {
    const comparator = ctx.sorted === true ? undefined : ctx.sorted;
    if (extrasType === kObjectType) {
      primordials.ArrayPrototypeSort(output, comparator);
    } else if (keys!.length > 1) {
      const sorted = primordials.ArrayPrototypeSort(
        primordials.ArrayPrototypeSlice(output, output.length - keys!.length),
        comparator,
      );
      primordials.ArrayPrototypeUnshift(
        sorted,
        output,
        output.length - keys!.length,
        keys!.length,
      );
      primordials.ReflectApply(primordials.ArrayPrototypeSplice, null, sorted);
    }
  }

  const res = reduceToSingleString(
    ctx,
    output,
    base,
    braces!,
    extrasType,
    recurseTimes,
    value,
  );
  const budget = ctx.budget[ctx.indentationLvl] || 0;
  const newLength = budget + res.length;
  ctx.budget[ctx.indentationLvl] = newLength;
  // If any indentationLvl exceeds this limit, limit further inspecting to the
  // minimum. Otherwise the recursive algorithm might continue inspecting the
  // object even though the maximum string size (~2 ** 28 on 32 bit systems and
  // ~2 ** 30 on 64 bit systems) exceeded. The actual output is not limited at
  // exactly 2 ** 27 but a bit higher. This depends on the object shape.
  // This limit also makes sure that huge objects don't block the event loop
  // significantly.
  if (newLength > 2 ** 27) {
    ctx.depth = -1;
  }
  return res;
}

function getIteratorBraces(type: "Map" | "Set", tag: string): Braces {
  if (tag !== `${type} Iterator`) {
    if (tag !== "") tag += "] [";
    tag += `${type} Iterator`;
  }
  return [`[${tag}] {`, "}"];
}

function getBoxedBase(
  // JB: Not sure how strictly accurate this type may be.
  value: Number | String | Boolean | BigInt | Symbol,
  ctx: Context,
  keys: Array<string | symbol>,
  constructor: string | null,
  tag: string,
) {
  let fn;
  let type;
  if (isNumberObject(value)) {
    fn = primordials.NumberPrototypeValueOf;
    type = "Number";
  } else if (isStringObject(value)) {
    fn = primordials.StringPrototypeValueOf;
    type = "String";
    // For boxed Strings, we have to remove the 0-n indexed entries,
    // since they just noisy up the output and are redundant
    // Make boxed primitive Strings look like such
    keys.splice(0, value.length);
  } else if (isBooleanObject(value)) {
    fn = primordials.BooleanPrototypeValueOf;
    type = "Boolean";
  } else if (isBigIntObject(value)) {
    fn = primordials.BigIntPrototypeValueOf;
    type = "BigInt";
  } else {
    fn = primordials.SymbolPrototypeValueOf;
    type = "Symbol";
  }
  let base = `[${type}`;
  if (type !== constructor) {
    if (constructor === null) {
      base += " (null prototype)";
    } else {
      base += ` (${constructor})`;
    }
  }
  base += `: ${formatPrimitive(stylizeNoColor, fn(value), ctx)}]`;
  if (tag !== "" && tag !== constructor) {
    base += ` [${tag}]`;
  }
  if (keys.length !== 0 || ctx.stylize === stylizeNoColor) return base;
  return ctx.stylize(base, primordials.StringPrototypeToLowerCase(type));
}

function getClassBase(
  value: Parameters<(typeof Object)["getPrototypeOf"]>[0],
  constructor: string | null,
  tag: string,
) {
  const hasName = primordials.ObjectPrototypeHasOwnProperty(value, "name");
  const name = (hasName && value.name) || "(anonymous)";
  let base = `class ${name}`;
  if (constructor !== "Function" && constructor !== null) {
    base += ` [${constructor}]`;
  }
  if (tag !== "" && constructor !== tag) {
    base += ` [${tag}]`;
  }
  if (constructor !== null) {
    const superName = primordials.ObjectGetPrototypeOf(value).name;
    if (superName) {
      base += ` extends ${superName}`;
    }
  } else {
    base += " extends [null prototype]";
  }
  return `[${base}]`;
}

function getFunctionBase(
  ctx: Context,
  value: (...args: Array<unknown>) => unknown,
  constructor: string | null,
  tag: string,
) {
  const stringified = primordials.FunctionPrototypeToString(value);
  if (
    primordials.StringPrototypeStartsWith(stringified, "class") &&
    stringified[stringified.length - 1] === "}"
  ) {
    const slice = primordials.StringPrototypeSlice(stringified, 5, -1);
    const bracketIndex = primordials.StringPrototypeIndexOf(slice, "{");
    if (
      bracketIndex !== -1 &&
      (!primordials.StringPrototypeIncludes(
        primordials.StringPrototypeSlice(slice, 0, bracketIndex),
        "(",
      ) ||
        // Slow path to guarantee that it's indeed a class.
        primordials.RegExpPrototypeExec(
          classRegExp,
          // @ts-ignore
          primordials.RegExpPrototypeSymbolReplace(stripCommentsRegExp, slice),
        ) !== null)
    ) {
      return getClassBase(value, constructor, tag);
    }
  }
  let type = "Function";
  if (isGeneratorFunction(value)) {
    type = `Generator${type}`;
  }
  if (isAsyncFunction(value)) {
    type = `Async${type}`;
  }
  let base = `[${type}`;
  if (constructor === null) {
    base += " (null prototype)";
  }
  if (value.name === "") {
    base += " (anonymous)";
  } else {
    base += `: ${
      typeof value.name === "string"
        ? value.name
        : // @ts-ignore Missing recurseTimes
          formatValue(ctx, value.name)
    }`;
  }
  base += "]";
  if (constructor !== type && constructor !== null) {
    base += ` ${constructor}`;
  }
  if (tag !== "" && constructor !== tag) {
    base += ` [${tag}]`;
  }
  return base;
}

export function identicalSequenceRange<T>(a: Array<T>, b: Array<T>) {
  for (let i = 0; i < a.length - 3; i++) {
    // Find the first entry of b that matches the current entry of a.
    const pos = primordials.ArrayPrototypeIndexOf(b, a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = primordials.MathMin(a.length - i, rest);
        // Count the number of consecutive entries.
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return { len, offset: i };
        }
      }
    }
  }

  return { len: 0, offset: 0 };
}

function getStackString(ctx: Context, error: Error) {
  if (error.stack) {
    if (typeof error.stack === "string") {
      return error.stack;
    }
    // @ts-ignore Missing recurseTimes
    return formatValue(ctx, error.stack);
  }
  return primordials.ErrorPrototypeToString(error);
}

function getStackFrames(ctx: Context, err: Error, stack: string) {
  // @ts-ignore
  const frames = primordials.StringPrototypeSplit(stack, "\n");

  let cause;
  try {
    ({ cause } = err);
  } catch {
    // If 'cause' is a getter that throws, ignore it.
  }

  // Remove stack frames identical to frames in cause.
  if (cause != null && isError(cause)) {
    const causeStack = getStackString(ctx, cause);
    const causeStackStart = primordials.StringPrototypeIndexOf(
      causeStack,
      "\n    at",
    );
    if (causeStackStart !== -1) {
      const causeFrames = primordials.StringPrototypeSplit(
        primordials.StringPrototypeSlice(causeStack, causeStackStart + 1),
        // @ts-ignore
        "\n",
      );
      const { len, offset } = identicalSequenceRange(frames, causeFrames);
      if (len > 0) {
        const skipped = len - 2;
        const msg = `    ... ${skipped} lines matching cause stack trace ...`;
        frames.splice(offset + 1, skipped, ctx.stylize(msg, "undefined"));
      }
    }
  }
  return frames;
}

function improveStack(
  stack: string,
  constructor: string | null,
  name: string,
  tag: string,
) {
  // A stack trace may contain arbitrary data. Only manipulate the output
  // for "regular errors" (errors that "look normal") for now.
  let len = name.length;

  if (typeof name !== "string") {
    stack = primordials.StringPrototypeReplace(
      stack,
      `${name}`,
      `${name} [${primordials.StringPrototypeSlice(getPrefix(constructor, tag, "Error"), 0, -1)}]`,
    );
  }

  if (
    constructor === null ||
    (primordials.StringPrototypeEndsWith(name, "Error") &&
      primordials.StringPrototypeStartsWith(stack, name) &&
      (stack.length === len || stack[len] === ":" || stack[len] === "\n"))
  ) {
    let fallback = "Error";
    if (constructor === null) {
      const start =
        primordials.RegExpPrototypeExec(
          /^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/,
          stack,
        ) || primordials.RegExpPrototypeExec(/^([a-z_A-Z0-9-]*Error)$/, stack);
      fallback = start?.[1] || "";
      len = fallback.length;
      fallback ||= "Error";
    }
    const prefix = primordials.StringPrototypeSlice(
      getPrefix(constructor, tag, fallback),
      0,
      -1,
    );
    if (name !== prefix) {
      if (primordials.StringPrototypeIncludes(prefix, name)) {
        if (len === 0) {
          stack = `${prefix}: ${stack}`;
        } else {
          stack = `${prefix}${primordials.StringPrototypeSlice(stack, len)}`;
        }
      } else {
        stack = `${prefix} [${name}]${primordials.StringPrototypeSlice(stack, len)}`;
      }
    }
  }
  return stack;
}

function removeDuplicateErrorKeys(
  ctx: Context,
  keys: Array<string | symbol>,
  err: Error,
  stack: string,
) {
  if (!ctx.showHidden && keys.length !== 0) {
    for (const name of ["name", "message", "stack"]) {
      const index = primordials.ArrayPrototypeIndexOf(keys, name);
      // Only hide the property if it's a string and if it's part of the original stack
      if (
        index !== -1 &&
        (typeof err[name as keyof typeof err] !== "string" ||
          primordials.StringPrototypeIncludes(
            stack,
            err[name as keyof typeof err] as string,
          ))
      ) {
        primordials.ArrayPrototypeSplice(keys, index, 1);
      }
    }
  }
}

function markNodeModules(ctx: Context, line: string) {
  let tempLine = "";
  let nodeModule;
  let pos = 0;
  while ((nodeModule = nodeModulesRegExp.exec(line)) !== null) {
    // '/node_modules/'.length === 14
    tempLine += primordials.StringPrototypeSlice(
      line,
      pos,
      nodeModule.index + 14,
    );
    tempLine += ctx.stylize(nodeModule[1], "module");
    pos = nodeModule.index + nodeModule[0].length;
  }
  if (pos !== 0) {
    line = tempLine + primordials.StringPrototypeSlice(line, pos);
  }
  return line;
}

function markCwd(ctx: Context, line: string, workingDirectory: string) {
  let cwdStartPos = primordials.StringPrototypeIndexOf(line, workingDirectory);
  let tempLine = "";
  let cwdLength = workingDirectory.length;
  if (cwdStartPos !== -1) {
    if (
      primordials.StringPrototypeSlice(line, cwdStartPos - 7, cwdStartPos) ===
      "file://"
    ) {
      cwdLength += 7;
      cwdStartPos -= 7;
    }
    const start = line[cwdStartPos - 1] === "(" ? cwdStartPos - 1 : cwdStartPos;
    const end =
      start !== cwdStartPos && primordials.StringPrototypeEndsWith(line, ")")
        ? -1
        : line.length;
    const workingDirectoryEndPos = cwdStartPos + cwdLength + 1;
    const cwdSlice = primordials.StringPrototypeSlice(
      line,
      start,
      workingDirectoryEndPos,
    );

    tempLine += primordials.StringPrototypeSlice(line, 0, start);
    tempLine += ctx.stylize(cwdSlice, "undefined");
    tempLine += primordials.StringPrototypeSlice(
      line,
      workingDirectoryEndPos,
      end,
    );
    if (end === -1) {
      tempLine += ctx.stylize(")", "undefined");
    }
  } else {
    tempLine += line;
  }
  return tempLine;
}

// JB: Not engine-agnostic.
//
// // function safeGetCWD() {
// //   let workingDirectory;
// //   try {
// //     workingDirectory = process.cwd();
// //   } catch {
// //     return;
// //   }
// //   return workingDirectory;
// // }

function formatError(
  err: Error,
  constructor: string | null,
  tag: string,
  ctx: Context,
  keys: Array<string | symbol>,
) {
  const name = err.name != null ? err.name : "Error";
  let stack = getStackString(ctx, err);

  removeDuplicateErrorKeys(ctx, keys, err, stack);

  if (
    "cause" in err &&
    (keys.length === 0 || !primordials.ArrayPrototypeIncludes(keys, "cause"))
  ) {
    primordials.ArrayPrototypePush(keys, "cause");
  }

  // Print errors aggregated into AggregateError
  if (
    primordials.ArrayIsArray((err as AggregateError).errors) &&
    (keys.length === 0 || !primordials.ArrayPrototypeIncludes(keys, "errors"))
  ) {
    primordials.ArrayPrototypePush(keys, "errors");
  }

  stack = improveStack(stack, constructor, name, tag);

  // Ignore the error message if it's contained in the stack.
  let pos =
    (err.message && primordials.StringPrototypeIndexOf(stack, err.message)) ||
    -1;
  if (pos !== -1) pos += err.message.length;
  // Wrap the error in brackets in case it has no stack trace.
  const stackStart = primordials.StringPrototypeIndexOf(stack, "\n    at", pos);
  if (stackStart === -1) {
    stack = `[${stack}]`;
  } else {
    let newStack = primordials.StringPrototypeSlice(stack, 0, stackStart);
    const stackFramePart = primordials.StringPrototypeSlice(
      stack,
      stackStart + 1,
    );
    const lines = getStackFrames(ctx, err, stackFramePart);
    // JB: No way to do this engine-agnostically. References the CWD and depends
    //     upon require.resolve() (which must discern Posix vs. Windows).
    // // if (ctx.colors) {
    //   // Highlight userland code and node modules.
    //   const workingDirectory = safeGetCWD();
    //   let esmWorkingDirectory;
    //   for (let line of lines) {
    //     const core = RegExpPrototypeExec(coreModuleRegExp, line);
    //     if (core !== null && BuiltinModule.exists(core[1])) {
    //       newStack += `\n${ctx.stylize(line, "undefined")}`;
    //     } else {
    //       newStack += "\n";

    //       line = markNodeModules(ctx, line);
    //       if (workingDirectory !== undefined) {
    //         let newLine = markCwd(ctx, line, workingDirectory);
    //         if (newLine === line) {
    //           esmWorkingDirectory ??= pathToFileUrlHref(workingDirectory);
    //           newLine = markCwd(ctx, line, esmWorkingDirectory);
    //         }
    //         line = newLine;
    //       }

    //       newStack += line;
    //     }
    //   }
    // // } else {
    // //   newStack += `\n${primordials.ArrayPrototypeJoin(lines, "\n")}`;
    // // }
    newStack += `\n${primordials.ArrayPrototypeJoin(lines, "\n")}`;
    stack = newStack;
  }
  // The message and the stack have to be indented as well!
  if (ctx.indentationLvl !== 0) {
    const indentation = primordials.StringPrototypeRepeat(
      " ",
      ctx.indentationLvl,
    );
    stack = primordials.StringPrototypeReplaceAll(
      stack,
      "\n",
      // @ts-ignore
      `\n${indentation}`,
    );
  }
  return stack;
}

function groupArrayElements(
  ctx: Context,
  output: Array<string>,
  value: Array<unknown>,
) {
  let totalLength = 0;
  let maxLength = 0;
  let i = 0;
  let outputLength = output.length;
  if (ctx.maxArrayLength < output.length) {
    // This makes sure the "... n more items" part is not taken into account.
    outputLength--;
  }
  const separatorSpace = 2; // Add 1 for the space and 1 for the separator.
  const dataLen = new Array(outputLength);
  // Calculate the total length of all output entries and the individual max
  // entries length of all output entries. We have to remove colors first,
  // otherwise the length would not be calculated properly.
  for (; i < outputLength; i++) {
    const len = getStringWidth(output[i], ctx.colors);
    dataLen[i] = len;
    totalLength += len + separatorSpace;
    if (maxLength < len) maxLength = len;
  }
  // Add two to `maxLength` as we add a single whitespace character plus a comma
  // in-between two entries.
  const actualMax = maxLength + separatorSpace;
  // Check if at least three entries fit next to each other and prevent grouping
  // of arrays that contains entries of very different length (i.e., if a single
  // entry is longer than 1/5 of all other entries combined). Otherwise the
  // space in-between small entries would be enormous.
  if (
    actualMax * 3 + ctx.indentationLvl < ctx.breakLength &&
    (totalLength / actualMax > 5 || maxLength <= 6)
  ) {
    const approxCharHeights = 2.5;
    const averageBias = primordials.MathSqrt(
      actualMax - totalLength / output.length,
    );
    const biasedMax = primordials.MathMax(actualMax - 3 - averageBias, 1);
    // Dynamically check how many columns seem possible.
    const columns = primordials.MathMin(
      // Ideally a square should be drawn. We expect a character to be about 2.5
      // times as high as wide. This is the area formula to calculate a square
      // which contains n rectangles of size `actualMax * approxCharHeights`.
      // Divide that by `actualMax` to receive the correct number of columns.
      // The added bias increases the columns for short entries.
      primordials.MathRound(
        primordials.MathSqrt(approxCharHeights * biasedMax * outputLength) /
          biasedMax,
      ),
      // Do not exceed the breakLength.
      primordials.MathFloor((ctx.breakLength - ctx.indentationLvl) / actualMax),
      // Limit array grouping for small `compact` modes as the user requested
      // minimal grouping.
      (ctx.compact as number) * 4,
      // Limit the columns to a maximum of fifteen.
      15,
    );
    // Return with the original output if no grouping should happen.
    if (columns <= 1) {
      return output;
    }
    const tmp = new Array<string>();
    const maxLineLength = new Array<number>();
    for (let i = 0; i < columns; i++) {
      let lineMaxLength = 0;
      for (let j = i; j < output.length; j += columns) {
        if (dataLen[j] > lineMaxLength) lineMaxLength = dataLen[j];
      }
      lineMaxLength += separatorSpace;
      maxLineLength[i] = lineMaxLength;
    }
    let order = primordials.StringPrototypePadStart;
    if (value !== undefined) {
      for (let i = 0; i < output.length; i++) {
        if (typeof value[i] !== "number" && typeof value[i] !== "bigint") {
          order = primordials.StringPrototypePadEnd;
          break;
        }
      }
    }
    // Each iteration creates a single line of grouped entries.
    for (let i = 0; i < outputLength; i += columns) {
      // The last lines may contain less entries than columns.
      const max = primordials.MathMin(i + columns, outputLength);
      let str = "";
      let j = i;
      for (; j < max - 1; j++) {
        // Calculate extra color padding in case it's active. This has to be
        // done line by line as some lines might contain more colors than
        // others.
        const padding = maxLineLength[j - i] + output[j].length - dataLen[j];
        str += order(`${output[j]}, `, padding, " ");
      }
      if (order === primordials.StringPrototypePadStart) {
        const padding =
          maxLineLength[j - i] + output[j].length - dataLen[j] - separatorSpace;
        str += primordials.StringPrototypePadStart(output[j], padding, " ");
      } else {
        str += output[j];
      }
      primordials.ArrayPrototypePush(tmp, str);
    }
    if (ctx.maxArrayLength < output.length) {
      primordials.ArrayPrototypePush(tmp, output[outputLength]);
    }
    output = tmp;
  }
  return output;
}

function handleMaxCallStackSize(
  ctx: Context,
  err: Error,
  constructorName: string | null,
  indentationLvl: number,
) {
  ctx.seen.pop();
  ctx.indentationLvl = indentationLvl;
  return ctx.stylize(
    `[${constructorName}: Inspection interrupted ` +
      "prematurely. Maximum call stack size exceeded.]",
    "special",
  );
}

function addNumericSeparator(integerString: string) {
  let result = "";
  let i = integerString.length;
  assert(i !== 0);
  const start = integerString[0] === "-" ? 1 : 0;
  for (; i >= start + 4; i -= 3) {
    result = `_${primordials.StringPrototypeSlice(integerString, i - 3, i)}${result}`;
  }
  return i === integerString.length
    ? integerString
    : `${primordials.StringPrototypeSlice(integerString, 0, i)}${result}`;
}

function addNumericSeparatorEnd(integerString: string) {
  let result = "";
  let i = 0;
  for (; i < integerString.length - 3; i += 3) {
    result += `${primordials.StringPrototypeSlice(integerString, i, i + 3)}_`;
  }
  return i === 0
    ? integerString
    : `${result}${primordials.StringPrototypeSlice(integerString, i)}`;
}

const remainingText = (remaining: number) =>
  `... ${remaining} more item${remaining > 1 ? "s" : ""}`;

function formatNumber(
  fn: FormatFunction,
  number: number,
  numericSeparator?: boolean,
) {
  if (!numericSeparator) {
    // Format -0 as '-0'. Checking `number === -0` won't distinguish 0 from -0.
    if (primordials.ObjectIs(number, -0)) {
      return fn("-0", "number");
    }
    return fn(`${number}`, "number");
  }
  const integer = primordials.MathTrunc(number);
  const string = String(integer);
  if (integer === number) {
    if (
      !primordials.NumberIsFinite(number) ||
      primordials.StringPrototypeIncludes(string, "e")
    ) {
      return fn(string, "number");
    }
    return fn(`${addNumericSeparator(string)}`, "number");
  }
  if (primordials.NumberIsNaN(number)) {
    return fn(string, "number");
  }
  return fn(
    `${addNumericSeparator(string)}.${addNumericSeparatorEnd(
      primordials.StringPrototypeSlice(String(number), string.length + 1),
    )}`,
    "number",
  );
}

function formatBigInt(
  fn: FormatFunction,
  bigint: BigInt,
  numericSeparator?: boolean,
) {
  const string = String(bigint);
  if (!numericSeparator) {
    return fn(`${string}n`, "bigint");
  }
  return fn(`${addNumericSeparator(string)}n`, "bigint");
}

function formatPrimitive(
  fn: FormatFunction,
  value: string | number | bigint | boolean | undefined | symbol,
  ctx: Context,
) {
  if (typeof value === "string") {
    let trailer = "";
    if (value.length > ctx.maxStringLength) {
      const remaining = value.length - ctx.maxStringLength;
      value = primordials.StringPrototypeSlice(value, 0, ctx.maxStringLength);
      trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
    }
    if (
      ctx.compact !== true &&
      // We do not support handling unicode characters width with
      // the readline getStringWidth function as there are
      // performance implications.
      value.length > kMinLineLength &&
      value.length > ctx.breakLength - ctx.indentationLvl - 4
    ) {
      return (
        primordials.ArrayPrototypeJoin(
          primordials.ArrayPrototypeMap(
            primordials.RegExpPrototypeSymbolSplit(/(?<=\n)/, value),
            (line) => fn(strEscape(line), "string"),
          ),
          ` +\n${primordials.StringPrototypeRepeat(" ", ctx.indentationLvl + 2)}`,
        ) + trailer
      );
    }
    return fn(strEscape(value), "string") + trailer;
  }
  if (typeof value === "number")
    return formatNumber(fn, value, ctx.numericSeparator);
  if (typeof value === "bigint")
    return formatBigInt(fn, value, ctx.numericSeparator);
  if (typeof value === "boolean") return fn(`${value}`, "boolean");
  if (typeof value === "undefined") return fn("undefined", "undefined");
  // es6 symbol primitive
  return fn(primordials.SymbolPrototypeToString(value), "symbol");
}

// JB: Not used
//
// // function formatNamespaceObject(
// //   keys: Array<string>,
// //   ctx: Context,
// //   value: Record<string, unknown>,
// //   recurseTimes: number,
// // ) {
// //   const output = new Array(keys.length);
// //   for (let i = 0; i < keys.length; i++) {
// //     try {
// //       output[i] = formatProperty(
// //         ctx,
// //         value,
// //         recurseTimes,
// //         keys[i],
// //         kObjectType,
// //       );
// //     } catch (err) {
// //       assert(isNativeError(err) && (err as Error).name === "ReferenceError");
// //       // Use the existing functionality. This makes sure the indentation and
// //       // line breaks are always correct. Otherwise it is very difficult to keep
// //       // this aligned, even though this is a hacky way of dealing with this.
// //       const tmp = { [keys[i]]: "" };
// //       output[i] = formatProperty(ctx, tmp, recurseTimes, keys[i], kObjectType);
// //       const pos = StringPrototypeLastIndexOf(output[i], " ");
// //       // We have to find the last whitespace and have to replace that value as
// //       // it will be visualized as a regular string.
// //       output[i] =
// //         StringPrototypeSlice(output[i], 0, pos + 1) +
// //         ctx.stylize("<uninitialized>", "special");
// //     }
// //   }
// //   // Reset the keys to an empty array. This prevents duplicated inspection.
// //   keys.length = 0;
// //   return output;
// // }

// The array is sparse and/or has extra keys
function formatSpecialArray(
  ctx: Context,
  value: Array<unknown> | Record<number, unknown>,
  recurseTimes: number,
  maxLength: number,
  output: Array<string>,
  i: number,
) {
  const keys = primordials.ObjectKeys(value);
  let index = i;
  for (; i < keys.length && output.length < maxLength; i++) {
    const key = keys[i];
    const tmp = +key;
    // Arrays can only have up to 2^32 - 1 entries
    if (tmp > 2 ** 32 - 2) {
      break;
    }
    if (`${index}` !== key) {
      if (primordials.RegExpPrototypeExec(numberRegExp, key) === null) {
        break;
      }
      const emptyItems = tmp - index;
      const ending = emptyItems > 1 ? "s" : "";
      const message = `<${emptyItems} empty item${ending}>`;
      primordials.ArrayPrototypePush(output, ctx.stylize(message, "undefined"));
      index = tmp;
      if (output.length === maxLength) {
        break;
      }
    }
    primordials.ArrayPrototypePush(
      output,
      formatProperty(
        ctx,
        value as Record<number, unknown>,
        recurseTimes,
        key,
        kArrayType,
      ),
    );
    index++;
  }
  const remaining = (value as Array<unknown>).length - index;
  if (output.length !== maxLength) {
    if (remaining > 0) {
      const ending = remaining > 1 ? "s" : "";
      const message = `<${remaining} empty item${ending}>`;
      primordials.ArrayPrototypePush(output, ctx.stylize(message, "undefined"));
    }
  } else if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  return output;
}

function formatArrayBuffer(
  ctx: Context,
  value: ArrayLike<number> | ArrayBuffer,
) {
  let buffer;
  try {
    buffer = new Uint8Array(value);
  } catch {
    return [ctx.stylize("(detached)", "special")];
  }
  // JB: We use a shim for hexSlice() to avoid coupling to Node.js.
  // // if (hexSlice === undefined)
  // //   hexSlice = uncurryThis(require("buffer").Buffer.prototype.hexSlice);
  let str = primordials.StringPrototypeTrim(
    primordials.RegExpPrototypeSymbolReplace(
      /(.{2})/g,
      hexSlice(
        buffer,
        0,
        primordials.MathMin(ctx.maxArrayLength, buffer.length),
      ),
      // @ts-ignore
      "$1 ",
    ),
  );
  const remaining = buffer.length - ctx.maxArrayLength;
  if (remaining > 0)
    str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
  return [`${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`];
}

function formatArray(
  ctx: Context,
  value: Array<unknown>,
  recurseTimes: number,
) {
  const valLen = value.length;
  const len = primordials.MathMin(
    primordials.MathMax(0, ctx.maxArrayLength),
    valLen,
  );

  const remaining = valLen - len;
  const output = new Array<string>();
  for (let i = 0; i < len; i++) {
    // Special handle sparse arrays.
    if (!primordials.ObjectPrototypeHasOwnProperty(value, i)) {
      return formatSpecialArray(ctx, value, recurseTimes, len, output, i);
    }
    primordials.ArrayPrototypePush(
      output,
      formatProperty(
        ctx,
        value as Record<number, unknown>,
        recurseTimes,
        i,
        kArrayType,
      ),
    );
  }
  if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  return output;
}

function formatTypedArray(
  value:
    | Int8Array<ArrayBufferLike>
    | Uint8Array<ArrayBufferLike>
    | Uint8ClampedArray<ArrayBufferLike>
    | Int16Array<ArrayBufferLike>
    | Uint16Array<ArrayBufferLike>
    | Int32Array<ArrayBufferLike>
    | Uint32Array<ArrayBufferLike>
    | Float32Array<ArrayBufferLike>
    | Float64Array<ArrayBufferLike>
    | BigInt64Array<ArrayBufferLike>
    | BigUint64Array<ArrayBufferLike>,
  length: number,
  ctx: Context,
  ignored: null,
  recurseTimes: number,
) {
  const maxLength = primordials.MathMin(
    primordials.MathMax(0, ctx.maxArrayLength),
    length,
  );
  const remaining = value.length - maxLength;
  const output = new Array(maxLength);
  const elementFormatter =
    value.length > 0 && typeof value[0] === "number"
      ? formatNumber
      : formatBigInt;
  for (let i = 0; i < maxLength; ++i) {
    output[i] = elementFormatter(
      ctx.stylize,
      value[i] as number & BigInt,
      ctx.numericSeparator,
    );
  }
  if (remaining > 0) {
    output[maxLength] = remainingText(remaining);
  }
  if (ctx.showHidden) {
    // .buffer goes last, it's not a primitive like the others.
    // All besides `BYTES_PER_ELEMENT` are actually getters.
    ctx.indentationLvl += 2;
    for (const key of [
      "BYTES_PER_ELEMENT",
      "length",
      "byteLength",
      "byteOffset",
      "buffer",
    ]) {
      // @ts-ignore
      const str = formatValue(ctx, value[key], recurseTimes, true);
      primordials.ArrayPrototypePush(output, `[${key}]: ${str}`);
    }
    ctx.indentationLvl -= 2;
  }
  return output;
}

function formatSet(
  value: Set<unknown>,
  ctx: Context,
  ignored: null,
  recurseTimes: number,
) {
  const length = value.size;
  const maxLength = primordials.MathMin(
    primordials.MathMax(0, ctx.maxArrayLength),
    length,
  );
  const remaining = length - maxLength;
  const output = new Array<string>();
  ctx.indentationLvl += 2;
  let i = 0;
  for (const v of value) {
    if (i >= maxLength) break;
    primordials.ArrayPrototypePush(output, formatValue(ctx, v, recurseTimes));
    i++;
  }
  if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  ctx.indentationLvl -= 2;
  return output;
}

function formatMap(
  value: Map<unknown, unknown>,
  ctx: Context,
  ignored: null,
  recurseTimes: number,
) {
  const length = value.size;
  const maxLength = primordials.MathMin(
    primordials.MathMax(0, ctx.maxArrayLength),
    length,
  );
  const remaining = length - maxLength;
  const output = new Array<string>();
  ctx.indentationLvl += 2;
  let i = 0;
  for (const { 0: k, 1: v } of value) {
    if (i >= maxLength) break;
    primordials.ArrayPrototypePush(
      output,
      `${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v, recurseTimes)}`,
    );
    i++;
  }
  if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  ctx.indentationLvl -= 2;
  return output;
}

function formatSetIterInner(
  ctx: Context,
  recurseTimes: number,
  /** [val1, val2, val3...] */
  entries: Array<unknown>,
  state: typeof kWeak | typeof kIterator | typeof kMapEntries,
) {
  const maxArrayLength = primordials.MathMax(ctx.maxArrayLength, 0);
  const maxLength = primordials.MathMin(maxArrayLength, entries.length);
  const output = new Array(maxLength);
  ctx.indentationLvl += 2;
  for (let i = 0; i < maxLength; i++) {
    output[i] = formatValue(ctx, entries[i], recurseTimes);
  }
  ctx.indentationLvl -= 2;
  if (state === kWeak && !ctx.sorted) {
    // Sort all entries to have a halfway reliable output (if more entries than
    // retrieved ones exist, we can not reliably return the same output) if the
    // output is not sorted anyway.
    primordials.ArrayPrototypeSort(output);
  }
  const remaining = entries.length - maxLength;
  if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  return output;
}

function formatMapIterInner(
  ctx: Context,
  recurseTimes: number,
  /** [key1, val1, key2, val2, ...] */
  entries: Array<unknown>,
  state: typeof kWeak | typeof kIterator | typeof kMapEntries,
) {
  const maxArrayLength = primordials.MathMax(ctx.maxArrayLength, 0);
  // Entries exist as [key1, val1, key2, val2, ...]
  const len = entries.length / 2;
  const remaining = len - maxArrayLength;
  const maxLength = primordials.MathMin(maxArrayLength, len);
  const output = new Array(maxLength);
  let i = 0;
  ctx.indentationLvl += 2;
  if (state === kWeak) {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      output[i] =
        `${formatValue(ctx, entries[pos], recurseTimes)} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
    }
    // Sort all entries to have a halfway reliable output (if more entries than
    // retrieved ones exist, we can not reliably return the same output) if the
    // output is not sorted anyway.
    if (!ctx.sorted) primordials.ArrayPrototypeSort(output);
  } else {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      const res = [
        formatValue(ctx, entries[pos], recurseTimes),
        formatValue(ctx, entries[pos + 1], recurseTimes),
      ];
      output[i] = reduceToSingleString(
        ctx,
        res,
        "",
        ["[", "]"],
        kArrayExtrasType,
        recurseTimes,
      );
    }
  }
  ctx.indentationLvl -= 2;
  if (remaining > 0) {
    primordials.ArrayPrototypePush(output, remainingText(remaining));
  }
  return output;
}

function formatWeakCollection(ctx: Context) {
  return [ctx.stylize("<items unknown>", "special")];
}
// JB: We can't iterate over WeakSet/WeakMap in an engine-agnostic fashion.
// // function formatWeakSet(ctx, value, recurseTimes) {
// //   const entries = previewEntries(value);
// //   return formatSetIterInner(ctx, recurseTimes, entries, kWeak);
// // }
// //
// // function formatWeakMap(ctx, value, recurseTimes) {
// //   const entries = previewEntries(value);
// //   return formatMapIterInner(ctx, recurseTimes, entries, kWeak);
// // }

function formatIterator(
  braces: Braces,
  ctx: Context,
  value: Iterator<unknown>,
  recurseTimes: number,
) {
  const { 0: entries, 1: isKeyValue } = previewEntries(value, true);
  if (isKeyValue) {
    // Mark entry iterators as such.
    braces[0] = primordials.RegExpPrototypeSymbolReplace(
      / Iterator] {$/,
      braces[0],
      // @ts-ignore
      " Entries] {",
    );
    return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
  }

  return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
}

function formatPromise(ctx: Context, value: unknown, recurseTimes: number) {
  // JB: It's impossible to synchronously inspect a Promise's state in an
  //     engine-agnostic fashion.
  //
  // // let output;
  // // const { 0: state, 1: result } = getPromiseDetails(value);
  // // if (state === kPending) {
  // //   output = [ctx.stylize("<pending>", "special")];
  // // } else {
  // //   ctx.indentationLvl += 2;
  // //   const str = formatValue(ctx, result, recurseTimes);
  // //   ctx.indentationLvl -= 2;
  // //   output = [
  // //     state === kRejected
  // //       ? `${ctx.stylize("<rejected>", "special")} ${str}`
  // //       : str,
  // //   ];
  // // }
  // // return output;
  return [ctx.stylize("<uninspectable>", "special")];
}

function formatProperty(
  ctx: Context,
  value: Record<string, unknown>,
  recurseTimes: number,
  key: number | string | symbol,
  type: Extras,
  desc?: PropertyDescriptor,
  original = value,
) {
  let name, str;
  let extra = " ";
  desc ||= primordials.ObjectGetOwnPropertyDescriptor(value, key) || {
    value: value[key as keyof typeof value],
    enumerable: true,
  };
  if (desc.value !== undefined) {
    const diff = ctx.compact !== true || type !== kObjectType ? 2 : 3;
    ctx.indentationLvl += diff;
    str = formatValue(ctx, desc.value, recurseTimes);
    if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
      extra = `\n${primordials.StringPrototypeRepeat(" ", ctx.indentationLvl)}`;
    }
    ctx.indentationLvl -= diff;
  } else if (desc.get !== undefined) {
    const label = desc.set !== undefined ? "Getter/Setter" : "Getter";
    const s = ctx.stylize;
    const sp = "special";
    if (
      ctx.getters &&
      (ctx.getters === true ||
        (ctx.getters === "get" && desc.set === undefined) ||
        (ctx.getters === "set" && desc.set !== undefined))
    ) {
      try {
        const tmp = primordials.FunctionPrototypeCall(desc.get, original);
        ctx.indentationLvl += 2;
        if (tmp === null) {
          str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
        } else if (typeof tmp === "object") {
          str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
        } else {
          const primitive = formatPrimitive(s, tmp, ctx);
          str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
        }
        ctx.indentationLvl -= 2;
      } catch (err) {
        const message = `<Inspection threw (${(err as Error).message})>`;
        str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
      }
    } else {
      str = ctx.stylize(`[${label}]`, sp);
    }
  } else if (desc.set !== undefined) {
    str = ctx.stylize("[Setter]", "special");
  } else {
    str = ctx.stylize("undefined", "undefined");
  }
  if (type === kArrayType) {
    return str;
  }
  if (typeof key === "symbol") {
    const tmp = primordials.RegExpPrototypeSymbolReplace(
      strEscapeSequencesReplacer,
      primordials.SymbolPrototypeToString(key),
      escapeFn,
    );
    name = ctx.stylize(tmp, "symbol");
  } else if (
    primordials.RegExpPrototypeExec(keyStrRegExp, key as string) !== null
  ) {
    name =
      key === "__proto__"
        ? "['__proto__']"
        : ctx.stylize(key as string, "name");
  } else {
    name = ctx.stylize(strEscape(key as string), "string");
  }

  if (desc.enumerable === false) {
    name = `[${name}]`;
  }
  return `${name}:${extra}${str}`;
}

function isBelowBreakLength(
  ctx: Context,
  output: Array<string>,
  start: number,
  base: string,
) {
  // Each entry is separated by at least a comma. Thus, we start with a total
  // length of at least `output.length`. In addition, some cases have a
  // whitespace in-between each other that is added to the total as well.
  // TODO(BridgeAR): Add unicode support. Use the readline getStringWidth
  // function. Check the performance overhead and make it an opt-in in case it's
  // significant.
  let totalLength = output.length + start;
  if (totalLength + output.length > ctx.breakLength) return false;
  for (let i = 0; i < output.length; i++) {
    if (ctx.colors) {
      totalLength += removeColors(output[i]).length;
    } else {
      totalLength += output[i].length;
    }
    if (totalLength > ctx.breakLength) {
      return false;
    }
  }
  // Do not line up properties on the same line if `base` contains line breaks.
  return base === "" || !primordials.StringPrototypeIncludes(base, "\n");
}

function reduceToSingleString(
  ctx: Context,
  output: Array<string>,
  base: string,
  braces: Braces,
  extrasType: Extras,
  recurseTimes: number,
  value?: unknown,
) {
  if (ctx.compact !== true) {
    if (typeof ctx.compact === "number" && ctx.compact >= 1) {
      // Memorize the original output length. In case the output is grouped,
      // prevent lining up the entries on a single line.
      const entries = output.length;
      // Group array elements together if the array contains at least six
      // separate entries.
      if (extrasType === kArrayExtrasType && entries > 6) {
        output = groupArrayElements(ctx, output, value as Array<unknown>);
      }
      // `ctx.currentDepth` is set to the most inner depth of the currently
      // inspected object part while `recurseTimes` is the actual current depth
      // that is inspected.
      //
      // Example:
      //
      // const a = { first: [ 1, 2, 3 ], second: { inner: [ 1, 2, 3 ] } }
      //
      // The deepest depth of `a` is 2 (a.second.inner) and `a.first` has a max
      // depth of 1.
      //
      // Consolidate all entries of the local most inner depth up to
      // `ctx.compact`, as long as the properties are smaller than
      // `ctx.breakLength`.
      if (
        ctx.currentDepth - recurseTimes < ctx.compact &&
        entries === output.length
      ) {
        // Line up all entries on a single line in case the entries do not
        // exceed `breakLength`. Add 10 as constant to start next to all other
        // factors that may reduce `breakLength`.
        const start =
          output.length +
          ctx.indentationLvl +
          braces[0].length +
          base.length +
          10;
        if (isBelowBreakLength(ctx, output, start, base)) {
          const joinedOutput = join(output, ", ");
          if (!primordials.StringPrototypeIncludes(joinedOutput, "\n")) {
            return (
              `${base ? `${base} ` : ""}${braces[0]} ${joinedOutput}` +
              ` ${braces[1]}`
            );
          }
        }
      }
    }
    // Line up each entry on an individual line.
    const indentation = `\n${primordials.StringPrototypeRepeat(" ", ctx.indentationLvl)}`;
    return (
      `${base ? `${base} ` : ""}${braces[0]}${indentation}  ` +
      `${join(output, `,${indentation}  `)}${indentation}${braces[1]}`
    );
  }
  // Line up all entries on a single line in case the entries do not exceed
  // `breakLength`.
  if (isBelowBreakLength(ctx, output, 0, base)) {
    return (
      `${braces[0]}${base ? ` ${base}` : ""} ${join(output, ", ")} ` + braces[1]
    );
  }
  const indentation = primordials.StringPrototypeRepeat(
    " ",
    ctx.indentationLvl,
  );
  // If the opening "brace" is too large, like in the case of "Set {",
  // we need to force the first item to be on the next line or the
  // items will not line up correctly.
  const ln =
    base === "" && braces[0].length === 1
      ? " "
      : `${base ? ` ${base}` : ""}\n${indentation}  `;
  // Line up each entry on an individual line.
  return `${braces[0]}${ln}${join(output, `,\n${indentation}  `)} ${braces[1]}`;
}

function hasBuiltInToString(value: Record<string, unknown>) {
  // JB: It's impossible to detect Proxies in an engine-agnostic fashion, so we
  //     will just have to omit the check altogether.
  // https://stackoverflow.com/a/55130896/5951226
  //
  // // // Prevent triggering proxy traps.
  // // const getFullProxy = false;
  // // const proxyTarget = getProxyDetails(value, getFullProxy);
  // // if (proxyTarget !== undefined) {
  // //   if (proxyTarget === null) {
  // //     return true;
  // //   }
  // //   value = proxyTarget;
  // // }

  let hasOwnToString = primordials.ObjectPrototypeHasOwnProperty;
  let hasOwnToPrimitive = primordials.ObjectPrototypeHasOwnProperty;

  // Count objects without `toString` and `Symbol.toPrimitive` function as built-in.
  if (typeof value.toString !== "function") {
    // @ts-ignore
    if (typeof value[primordials.SymbolToPrimitive] !== "function") {
      return true;
    } else if (
      primordials.ObjectPrototypeHasOwnProperty(
        value,
        primordials.SymbolToPrimitive,
      )
    ) {
      return false;
    }
    hasOwnToString = returnFalse;
  } else if (primordials.ObjectPrototypeHasOwnProperty(value, "toString")) {
    return false;
    // @ts-ignore
  } else if (typeof value[primordials.SymbolToPrimitive] !== "function") {
    hasOwnToPrimitive = returnFalse;
  } else if (
    primordials.ObjectPrototypeHasOwnProperty(
      value,
      primordials.SymbolToPrimitive,
    )
  ) {
    return false;
  }

  // Find the object that has the `toString` property or `Symbol.toPrimitive` property
  // as own property in the prototype chain.
  let pointer = value;
  do {
    pointer = primordials.ObjectGetPrototypeOf(pointer);
  } while (
    !hasOwnToString(pointer, "toString") &&
    !hasOwnToPrimitive(pointer, primordials.SymbolToPrimitive)
  );

  // Check closer if the object is a built-in.
  const descriptor = primordials.ObjectGetOwnPropertyDescriptor(
    pointer,
    "constructor",
  );
  return (
    descriptor !== undefined &&
    typeof descriptor.value === "function" &&
    builtInObjects.has(descriptor.value.name)
  );
}

function returnFalse() {
  return false;
}

const firstErrorLine = (error: Error) =>
  // @ts-ignore
  primordials.StringPrototypeSplit(error.message, "\n", 1)[0];
let CIRCULAR_ERROR_MESSAGE: string;
function tryStringify(arg: unknown) {
  try {
    return primordials.JSONStringify(arg);
  } catch (err: unknown) {
    // Populate the circular error message lazily
    if (!CIRCULAR_ERROR_MESSAGE) {
      try {
        const a = {};
        (a as any).a = a;
        primordials.JSONStringify(a);
      } catch (circularError) {
        CIRCULAR_ERROR_MESSAGE = firstErrorLine(circularError as Error);
      }
    }
    if (
      (err as Error).name === "TypeError" &&
      firstErrorLine(err as Error) === CIRCULAR_ERROR_MESSAGE
    ) {
      return "[Circular]";
    }
    throw err;
  }
}

export function format(...args: Array<unknown>) {
  return formatWithOptionsInternal(undefined, args);
}

export function formatWithOptions(
  inspectOptions: Context | undefined,
  ...args: Array<unknown>
) {
  validateObject(inspectOptions, "inspectOptions", kValidateObjectAllowArray);
  return formatWithOptionsInternal(inspectOptions, args);
}

function formatNumberNoColor(
  number: number,
  options?: Pick<Context, "numericSeparator">,
) {
  return formatNumber(
    stylizeNoColor,
    number,
    options?.numericSeparator ?? inspectDefaultOptions.numericSeparator,
  );
}

function formatBigIntNoColor(
  bigint: BigInt,
  options?: Pick<Context, "numericSeparator">,
) {
  return formatBigInt(
    stylizeNoColor,
    bigint,
    options?.numericSeparator ?? inspectDefaultOptions.numericSeparator,
  );
}

function formatWithOptionsInternal(
  inspectOptions: Context | undefined,
  args: Array<unknown>,
) {
  const first = args[0];
  let a = 0;
  let str = "";
  let join = "";

  if (typeof first === "string") {
    if (args.length === 1) {
      return first;
    }
    let tempStr;
    let lastPos = 0;

    for (let i = 0; i < first.length - 1; i++) {
      if (primordials.StringPrototypeCharCodeAt(first, i) === 37) {
        // '%'
        const nextChar = primordials.StringPrototypeCharCodeAt(first, ++i);
        if (a + 1 !== args.length) {
          switch (nextChar) {
            case 115: {
              // 's'
              const tempArg = args[++a];
              if (typeof tempArg === "number") {
                tempStr = formatNumberNoColor(tempArg, inspectOptions);
              } else if (typeof tempArg === "bigint") {
                tempStr = formatBigIntNoColor(tempArg, inspectOptions);
              } else if (
                typeof tempArg !== "object" ||
                tempArg === null ||
                !hasBuiltInToString(tempArg as Record<string, unknown>)
              ) {
                tempStr = String(tempArg);
              } else {
                tempStr = inspect(tempArg, {
                  ...inspectOptions,
                  compact: 3,
                  colors: false,
                  depth: 0,
                });
              }
              break;
            }
            case 106: // 'j'
              tempStr = tryStringify(args[++a]);
              break;
            case 100: {
              // 'd'
              const tempNum = args[++a];
              if (typeof tempNum === "bigint") {
                tempStr = formatBigIntNoColor(tempNum, inspectOptions);
              } else if (typeof tempNum === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatNumberNoColor(Number(tempNum), inspectOptions);
              }
              break;
            }
            case 79: // 'O'
              tempStr = inspect(args[++a], inspectOptions);
              break;
            case 111: // 'o'
              tempStr = inspect(args[++a], {
                ...inspectOptions,
                showHidden: true,
                showProxy: true,
                depth: 4,
              });
              break;
            case 105: {
              // 'i'
              const tempInteger = args[++a];
              if (typeof tempInteger === "bigint") {
                tempStr = formatBigIntNoColor(tempInteger, inspectOptions);
              } else if (typeof tempInteger === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatNumberNoColor(
                  primordials.NumberParseInt(tempInteger as string),
                  inspectOptions,
                );
              }
              break;
            }
            case 102: {
              // 'f'
              const tempFloat = args[++a];
              if (typeof tempFloat === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatNumberNoColor(
                  primordials.NumberParseFloat(tempFloat as string),
                  inspectOptions,
                );
              }
              break;
            }
            case 99: // 'c'
              a += 1;
              tempStr = "";
              break;
            case 37: // '%'
              str += primordials.StringPrototypeSlice(first, lastPos, i);
              lastPos = i + 1;
              continue;
            default: // Any other character is not a correct placeholder
              continue;
          }
          if (lastPos !== i - 1) {
            str += primordials.StringPrototypeSlice(first, lastPos, i - 1);
          }
          str += tempStr;
          lastPos = i + 1;
        } else if (nextChar === 37) {
          str += primordials.StringPrototypeSlice(first, lastPos, i);
          lastPos = i + 1;
        }
      }
    }
    if (lastPos !== 0) {
      a++;
      join = " ";
      if (lastPos < first.length) {
        str += primordials.StringPrototypeSlice(first, lastPos);
      }
    }
  }

  while (a < args.length) {
    const value = args[a];
    str += join;
    str += typeof value !== "string" ? inspect(value, inspectOptions) : value;
    join = " ";
    a++;
  }
  return str;
}

export function isZeroWidthCodePoint(code: number) {
  return (
    code <= 0x1f || // C0 control codes
    (code >= 0x7f && code <= 0x9f) || // C1 control codes
    (code >= 0x300 && code <= 0x36f) || // Combining Diacritical Marks
    (code >= 0x200b && code <= 0x200f) || // Modifying Invisible Characters
    // Combining Diacritical Marks for Symbols
    (code >= 0x20d0 && code <= 0x20ff) ||
    (code >= 0xfe00 && code <= 0xfe0f) || // Variation Selectors
    (code >= 0xfe20 && code <= 0xfe2f) || // Combining Half Marks
    (code >= 0xe0100 && code <= 0xe01ef)
  ); // Variation Selectors
}

// JB: Internal bindings are a Node.js / V8 concept, and Intl is often omitted
//     by engines anyway, due to its size.
//
// // if (internalBinding("config").hasIntl) {
// //   const icu = internalBinding("icu");
// //   // icu.getStringWidth(string, ambiguousAsFullWidth, expandEmojiSequence)
// //   // Defaults: ambiguousAsFullWidth = false; expandEmojiSequence = true;
// //   // TODO(BridgeAR): Expose the options to the user. That is probably the
// //   // best thing possible at the moment, since it's difficult to know what
// //   // the receiving end supports.
// //   getStringWidth = function getStringWidth(
// //     str: string,
// //     removeControlChars = true,
// //   ) {
// //     let width = 0;
//
// //     if (removeControlChars) {
// //       str = stripVTControlCharacters(str);
// //     }
// //     for (let i = 0; i < str.length; i++) {
// //       // Try to avoid calling into C++ by first handling the ASCII portion of
// //       // the string. If it is fully ASCII, we skip the C++ part.
// //       const code = str.charCodeAt(i);
// //       if (code >= 127) {
// //         width += icu.getStringWidth(
// //           StringPrototypeNormalize(StringPrototypeSlice(str, i), "NFC"),
// //         );
// //         break;
// //       }
// //       width += code >= 32 ? 1 : 0;
// //     }
// //     return width;
// //   };
// // } else
{
  /**
   * Returns the number of columns required to display the given string.
   */
  getStringWidth = function getStringWidth(str, removeControlChars = true) {
    let width = 0;

    if (removeControlChars) str = stripVTControlCharacters(str);
    str = primordials.StringPrototypeNormalize(str, "NFC");
    for (const char of new primordials.SafeStringIterator(str)) {
      const code = primordials.StringPrototypeCodePointAt(char, 0);
      if (isFullWidthCodePoint(code!)) {
        width += 2;
      } else if (!isZeroWidthCodePoint(code!)) {
        width++;
      }
    }

    return width;
  };

  /**
   * Returns true if the character represented by a given
   * Unicode code point is full-width. Otherwise returns false.
   */
  const isFullWidthCodePoint = (code: number) => {
    // Code points are partially derived from:
    // https://www.unicode.org/Public/UNIDATA/EastAsianWidth.txt
    return (
      code >= 0x1100 &&
      (code <= 0x115f || // Hangul Jamo
        code === 0x2329 || // LEFT-POINTING ANGLE BRACKET
        code === 0x232a || // RIGHT-POINTING ANGLE BRACKET
        // CJK Radicals Supplement .. Enclosed CJK Letters and Months
        (code >= 0x2e80 && code <= 0x3247 && code !== 0x303f) ||
        // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
        (code >= 0x3250 && code <= 0x4dbf) ||
        // CJK Unified Ideographs .. Yi Radicals
        (code >= 0x4e00 && code <= 0xa4c6) ||
        // Hangul Jamo Extended-A
        (code >= 0xa960 && code <= 0xa97c) ||
        // Hangul Syllables
        (code >= 0xac00 && code <= 0xd7a3) ||
        // CJK Compatibility Ideographs
        (code >= 0xf900 && code <= 0xfaff) ||
        // Vertical Forms
        (code >= 0xfe10 && code <= 0xfe19) ||
        // CJK Compatibility Forms .. Small Form Variants
        (code >= 0xfe30 && code <= 0xfe6b) ||
        // Halfwidth and Fullwidth Forms
        (code >= 0xff01 && code <= 0xff60) ||
        (code >= 0xffe0 && code <= 0xffe6) ||
        // Kana Supplement
        (code >= 0x1b000 && code <= 0x1b001) ||
        // Enclosed Ideographic Supplement
        (code >= 0x1f200 && code <= 0x1f251) ||
        // Miscellaneous Symbols and Pictographs 0x1f300 - 0x1f5ff
        // Emoticons 0x1f600 - 0x1f64f
        (code >= 0x1f300 && code <= 0x1f64f) ||
        // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
        (code >= 0x20000 && code <= 0x3fffd))
    );
  };
}

/**
 * Remove all VT control characters. Use to estimate displayed string width.
 */
export function stripVTControlCharacters(str: string) {
  validateString(str, "str");

  // @ts-ignore
  return primordials.RegExpPrototypeSymbolReplace(ansi, str, "");
}

export interface Context {
  circular?: Map<unknown, unknown>;
  budget: Record<string, number>;
  indentationLvl: number;
  seen: Array<unknown>;
  currentDepth: number;
  stylize: (...strings: Array<string>) => string;
  showHidden: boolean;
  depth: number;
  colors: boolean;
  customInspect: boolean;
  showProxy: boolean;
  maxArrayLength: number;
  maxStringLength: number;
  breakLength: number;
  compact: boolean | number;
  sorted: boolean;
  getters: boolean;
  numericSeparator: boolean;
  userOptions?: Partial<Context>;
}

type Inspect = (value: unknown, opts?: boolean | Context) => string;

type ProtoProps = undefined | Array<string>;
type Extras = typeof kObjectType | typeof kArrayType | typeof kArrayExtrasType;
type FormatFunction = (arg0: string, arg1: string) => string;
type Braces = [opening: string, closing: string];
