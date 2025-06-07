<h1 align="center">util-inspect-isomorphic 🔍</h2>

# About

An isomorphic port of a Node.js API, [require("node:util").inspect()](https://nodejs.org/api/util.html#utilinspectobject-options). Works on any (decently modern) JS runtime, as it has no dependency on V8 or Node.js. Can be used in the browser, in React Native, etc.

# Differences from the original

- `Proxy` types cannot be inspected, so `showProxy: true` has no effect. Instead of the `Proxy` itself, the `Proxy` target will be inspected.
- No special handling for cross-realm/external types. They will be treated the same as any other type.
- No special handling for ECMAScript [NativeError](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-native-error-types-used-in-this-standard) types. We only handle errors that satisfy `instanceof Error`.
- No special handling for module namespace objects. Will probably be handled the same as any other `Record<string, unknown>` type.
- Limited `Promise` introspection – we can't tell whether it is `<pending>`, `<rejected>`, or resolved, so we write `<uninspectable>` instead.
- Type inspection can be fooled, as it doesn't use engine-level introspection.
- Not all types of [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) get special handling. Namely `Float16Array`, `BigInt64Array`, and `BigUint64Array`.
- Not safe from [prototype pollution](https://learn.snyk.io/lesson/prototype-pollution/?ecosystem=javascript), as the "primordials" used in here are merely used to match the coding style of the original implementation rather than being true [primordials](https://github.com/nodejs/node/blob/main/doc/contributing/primordials.md). To be clear, Node.js clarifies that it is [fine](https://github.com/nodejs/node/blob/main/doc/contributing/primordials.md#accessing-primordials) for userland code to rely on ECMAScript built-ins, and to leave the primordials to them.

# Sources

Here's a file-by-file summary of what was ported:

```
- [src/error-capture-stack-trace.types.ts](./src/error-capture-stack-trace.types.ts): Typings for the non-standard `ErrorConstructor.captureStackTrace`, from https://github.com/microsoft/TypeScript/issues/3926#issuecomment-169096154.
- [src/hex-slice.ts](./src/hex-slice.ts): Original implementation based on the behaviour of `require('buffer').Buffer.prototype.hexSlice`
- [src/index.ts](./src/index.ts): [lib/internal/util.js](https://github.com/nodejs/node/blob/main/lib/internal/util.js)
- [src/inspect.ts](./src/inspect.ts): [lib/internal/util/inspect.js](https://github.com/nodejs/node/blob/main/lib/internal/util/inspect.js)
- [src/internal-assert.ts](./src/internal-assert.ts): [lib/internal/assert.js](https://github.com/nodejs/node/blob/main/lib/internal/assert.js)
- [src/internal-errors.ts](./src/internal-errors.ts): [lib/internal/errors.js](https://github.com/nodejs/node/blob/main/lib/internal/errors.js)
- [src/internal-util-types.ts](./src/internal-util-types.ts): [lib/internal/util/types.js](https://github.com/nodejs/node/blob/main/lib/internal/util/types.js)
- [src/internal-util.ts](./src/internal-util.ts): [lib/internal/util.js](https://github.com/nodejs/node/blob/main/lib/internal/util.js)
- [src/internal-validators.ts](./src/internal-validators.ts): [lib/internal/validators.js](https://github.com/nodejs/node/blob/main/lib/internal/validators.js)
- [src/primordials.ts](./src/primordials.ts): https://github.com/isaacs/node-primordials/blob/main/src/index.ts, itself a TypeScript port of [lib/internal/per_context/primordials.js](https://github.com/nodejs/node/blob/main/lib/internal/per_context/primordials.js)
- [src/node-util.ts](./src/node-util.ts): [src/node_util.cc](https://github.com/nodejs/node/blob/main/src/node_util.cc)
```

# See also

I found out about [node-inspect-extracted](https://github.com/hildjj/node-inspect-extracted) only after finishing this project. There are a few differences between our approaches.

- `node-inspect-extracted` is designed to be easy to keep up to date with upstream, whereas `util-inspect-isomorphic` is a one-time snapshot.
- `node-inspect-extracted` is fully [tested](https://github.com/hildjj/node-inspect-extracted/tree/main/test). No tests here, unfortunately.
- `util-inspect-isomorphic` is a port to ESM (and TypeScript).
- `util-inspect-isomorphic` is confirmed to work in React Native.
  - I found that I had to change `const { Object } = primordials` to `primordials.Object` to get it to run. I can't be sure whether it was a Hermes runtime issue or a Metro bundling issue.
