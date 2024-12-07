import test from "node:test";
import assert from "node:assert";

import { getMsg } from "./setup.ts";

test("Setup is working", (t) => {
  assert.strictEqual(getMsg(), "Hello TS in NodeJS!");
});
