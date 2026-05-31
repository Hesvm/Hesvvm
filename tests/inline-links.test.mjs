import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const src = readFileSync("lib/parseInlineLinks.ts", "utf8");

test("parseInlineLinks is exported", () => {
  assert.match(src, /export function parseInlineLinks/);
});

test("uses the correct inline link regex", () => {
  assert.match(src, /INLINE_LINK_RE/);
  assert.match(src, /\\\[.*\\\]/);
});

test("renders links with target _blank and rel noopener", () => {
  assert.match(src, /target.*_blank/);
  assert.match(src, /rel.*noopener noreferrer/);
});

test("uses color: 'inherit' so links match surrounding text", () => {
  assert.match(src, /color.*inherit/);
});

const renderer = readFileSync("components/ContentRenderer.tsx", "utf8");

test("ContentRenderer imports parseInlineLinks", () => {
  assert.match(renderer, /parseInlineLinks/);
});

test("ContentRenderer applies parseInlineLinks to block.content", () => {
  assert.match(renderer, /parseInlineLinks\(block\.content\)/);
});

const textBlock = readFileSync("components/admin/blocks/TextBlock.tsx", "utf8");

test("TextBlock handles Ctrl+K keydown", () => {
  assert.match(textBlock, /onKeyDown/);
  assert.match(textBlock, /ctrlKey.*metaKey|metaKey.*ctrlKey/);
  assert.match(textBlock, /key.*===.*k|key.*===.*K/);
});
