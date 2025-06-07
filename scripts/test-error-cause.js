// import { inspect } from "node:util";
import { inspect } from "../dist/inspect.js";

try {
  case1();
} catch (error) {
  inspect(error);
  console.log(inspect(error));
}

function case1() {
  try {
    errorful();
  } catch (cause) {
    throw new Error("Errorful failed.", { cause });
  }
}

function errorful() {
  try {
    nestedErrorful();
  } catch (cause) {
    throw new Error("Nested errorful failed.", { cause });
  }
}

function nestedErrorful() {
  throw new Error("Nested errorful!");
}
