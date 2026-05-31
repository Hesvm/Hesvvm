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

const videoBlock = readFileSync("components/admin/blocks/VideoBlock.tsx", "utf8");

test("VideoBlock editor accepts slug prop", () => {
  assert.match(videoBlock, /slug\s*:/);
});

test("VideoBlock editor has file upload input", () => {
  assert.match(videoBlock, /type="file"/);
  assert.match(videoBlock, /video\/mp4/);
});

test("VideoBlock editor has playback toggle", () => {
  assert.match(videoBlock, /playback/);
  assert.match(videoBlock, /Auto/);
  assert.match(videoBlock, /Click/);
});

const blockEditor = readFileSync("components/admin/BlockEditor.tsx", "utf8");

test("BlockEditor passes slug to VideoBlock", () => {
  const videoBlockIdx = blockEditor.indexOf('<VideoBlock');
  const snippet = blockEditor.slice(videoBlockIdx, videoBlockIdx + 300);
  assert.match(snippet, /slug=/);
});
