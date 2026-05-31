import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globals = readFileSync("app/globals.css", "utf8");

test("globals.css defines .smart-link base styles", () => {
  assert.match(globals, /\.smart-link\b/);
  assert.match(globals, /position: relative/);
  assert.match(globals, /display: inline-block/);
  assert.match(globals, /text-decoration: none/);
});

test("globals.css defines .smart-link-underline as 3px pill", () => {
  assert.match(globals, /\.smart-link-underline\b/);
  assert.match(globals, /height: 3px/);
  assert.match(globals, /border-radius: 999px/);
  assert.match(globals, /rgba\(150, 145, 137, 0\.40\)/);
});

test("globals.css darkens underline on hover", () => {
  assert.match(globals, /\.smart-link:hover .smart-link-underline/);
  assert.match(globals, /rgba\(19, 19, 19, 0\.35\)/);
});
