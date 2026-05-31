import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const types = readFileSync("types/project.ts", "utf8");

test("VideoBlock has playback field", () => {
  assert.match(types, /playback\?\s*:\s*'auto'\s*\|\s*'click'/);
});

const renderer = readFileSync("components/ContentRenderer.tsx", "utf8");

test("ContentRenderer renders <video> for non-embed URLs", () => {
  assert.match(renderer, /<video/);
});

test("ContentRenderer uses block.playback for autoplay/controls", () => {
  assert.match(renderer, /autoPlay/);
  assert.match(renderer, /controls/);
  assert.match(renderer, /muted/);
});
