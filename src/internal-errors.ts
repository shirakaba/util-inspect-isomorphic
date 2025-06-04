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
