/**
 * A shim for `require("node:buffer").Buffer.prototype.hexSlice`.
 */
export function hexSlice(
  buffer:
    | Int8Array<ArrayBufferLike>
    | Uint8Array<ArrayBufferLike>
    | Uint8ClampedArray<ArrayBufferLike>
    | Int16Array<ArrayBufferLike>
    | Uint16Array<ArrayBufferLike>
    | Int32Array<ArrayBufferLike>
    | Uint32Array<ArrayBufferLike>
    | Float32Array<ArrayBufferLike>
    | Float64Array<ArrayBufferLike>,
  start?: number,
  end?: number,
) {
  const sliced = buffer.slice(start, end);

  let hex = "";
  for (const value of sliced) {
    hex += value.toString(16);
  }
  return hex;
}
