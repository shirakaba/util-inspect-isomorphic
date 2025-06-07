// import { inspect } from "node:util";
import { inspect } from "../dist/inspect.js";

const set = new Set(["a", "b", "c"]);
const map = new Map([
  ["a", 0],
  ["b", 1],
  ["c", 2],
]);

console.log(inspect(set.entries()));
console.log(inspect(map.entries()));
