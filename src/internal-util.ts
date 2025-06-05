import { StringPrototypeReplace } from "./primordials";

const colorRegExp = /\u001b\[\d\d?m/g;

export function removeColors(str: string) {
  return StringPrototypeReplace(str, colorRegExp, "");
}

export function isError(e: unknown) {
  // JB: No way to implement the finer details in an engine-agnostic fashion.
  //
  // // An error could be an instance of Error while not being a native error
  // // or could be from a different realm and not be instance of Error but still
  // // be a native error.
  // // return isNativeError(e) || e instanceof Error;
  return e instanceof Error;
}

/**
 * "The built-in Array#join is slower in v8 6.0"
 * @see https://github.com/nodejs/node/blob/1093f38c437c44589c9962d3156540036d0717bd/lib/internal/util.js#L518C1-L530C2
 */
export function join(output: Array<string>, separator: string) {
  let str = "";
  if (output.length !== 0) {
    const lastIndex = output.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      // It is faster not to use a template string here
      str += output[i];
      str += separator;
    }
    str += output[lastIndex];
  }
  return str;
}

export const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
