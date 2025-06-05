import { primordials } from "./primordials.js";

/**
 * This function removes unnecessary frames from Node.js core errors.
 */
export function hideStackFrames<T extends (...args: Array<any>) => any>(
  fn: T,
): T {
  function wrappedFn(...args: Array<unknown>) {
    try {
      // @ts-ignore
      return primordials.ReflectApply(fn, this, args);
    } catch (error) {
      "stackTraceLimit" in Error &&
        Error.stackTraceLimit &&
        Error.captureStackTrace(error, wrappedFn);
      throw error;
    }
  }
  wrappedFn.withoutStackTrace = fn;
  return wrappedFn as unknown as T;
}

let maxStack_ErrorName: string;
let maxStack_ErrorMessage: string;

/**
 * Returns true if `err.name` and `err.message` are equal to engine-specific
 * values indicating max call stack size has been exceeded.
 * "Maximum call stack size exceeded" in V8.
 */
export function isStackOverflowError(err: Error) {
  if (maxStack_ErrorMessage === undefined) {
    try {
      function overflowStack() {
        overflowStack();
      }
      overflowStack();
    } catch (err) {
      maxStack_ErrorMessage = (err as Error).message;
      maxStack_ErrorName = (err as Error).name;
    }
  }

  return (
    err &&
    err.name === maxStack_ErrorName &&
    err.message === maxStack_ErrorMessage
  );
}
