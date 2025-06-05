// Re-export all the same things that `require("node:util")` does, as present.

export {
  format,
  formatWithOptions,
  inspect,
  stripVTControlCharacters,
} from "./inspect.js";
export { isRegExp, isDate } from "./internal-util-types.js";
export { isError } from "./internal-util.js";
