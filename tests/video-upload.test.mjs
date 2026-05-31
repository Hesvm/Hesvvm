import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const types = readFileSync("types/project.ts", "utf8");

test("VideoBlock has playback field", () => {
  assert.match(types, /playback\?\s*:\s*'auto'\s*\|\s*'click'/);
});
