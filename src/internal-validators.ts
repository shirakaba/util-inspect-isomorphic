import { hideStackFrames } from "./internal-errors.js";
import { primordials } from "./primordials.js";

export const validateString: (
  value: unknown,
  name: string,
) => asserts value is string = hideStackFrames(
  (value: unknown, name: string): asserts value is string => {
    if (typeof value !== "string")
      // JB: Implementing ERR_INVALID_ARG_TYPE is a deep rabbit hole.
      // // throw new ERR_INVALID_ARG_TYPE(name, "string", value);
      throw new TypeError(
        `Expected string for parameter "${name}", but got ${typeof value}.`,
      );
  },
);

export const kValidateObjectNone = 0;
export const kValidateObjectAllowNullable = 1 << 0;
export const kValidateObjectAllowArray = 1 << 1;
export const kValidateObjectAllowFunction = 1 << 2;

export const validateObject = hideStackFrames(
  (
    value: unknown,
    name: string,
    options:
      | typeof kValidateObjectNone
      | typeof kValidateObjectAllowNullable
      | typeof kValidateObjectAllowArray
      | typeof kValidateObjectAllowFunction = kValidateObjectNone,
  ): void => {
    // JB: Implementing ERR_INVALID_ARG_TYPE is a deep rabbit hole.

    if (options === kValidateObjectNone) {
      if (value === null || primordials.ArrayIsArray(value)) {
        // throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        throw new TypeError(
          `Expected Object for parameter "${name}", but got ${typeof value}.`,
        );
      }

      if (typeof value !== "object") {
        // throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        throw new TypeError(
          `Expected Object for parameter "${name}", but got ${typeof value}.`,
        );
      }
    } else {
      const throwOnNullable = (kValidateObjectAllowNullable & options) === 0;

      if (throwOnNullable && value === null) {
        // throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        throw new TypeError(
          `Expected Object for parameter "${name}", but got ${typeof value}.`,
        );
      }

      const throwOnArray = (kValidateObjectAllowArray & options) === 0;

      if (throwOnArray && primordials.ArrayIsArray(value)) {
        // throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        throw new TypeError(
          `Expected Object for parameter "${name}", but got ${typeof value}.`,
        );
      }

      const throwOnFunction = (kValidateObjectAllowFunction & options) === 0;
      const typeofValue = typeof value;

      if (
        typeofValue !== "object" &&
        (throwOnFunction || typeofValue !== "function")
      ) {
        // throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
        throw new TypeError(
          `Expected Object for parameter "${name}", but got ${typeof value}.`,
        );
      }
    }
  },
);
