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

const smartLink = readFileSync("components/SmartLink.tsx", "utf8");

test("SmartLink component file exists and is a client component", () => {
  assert.match(smartLink, /"use client"/);
});

test("SmartLink renders an <a> element with .smart-link class", () => {
  assert.match(smartLink, /smart-link/);
  assert.match(smartLink, /<a\b/);
});

test("SmartLink includes the pill underline span", () => {
  assert.match(smartLink, /smart-link-underline/);
  assert.match(smartLink, /aria-hidden="true"/);
});

test("SmartLink without preview prop renders just the link", () => {
  assert.match(smartLink, /if \(!preview\)/);
});

test("SmartLink imports Next.js Image", () => {
  assert.match(smartLink, /from "next\/image"/);
});

test("SmartLink card renders image with alt from preview.title", () => {
  assert.match(smartLink, /alt=\{preview\.title\}/);
});

test("SmartLink card has title and subtitle from preview", () => {
  assert.match(smartLink, /preview\.title/);
  assert.match(smartLink, /preview\.subtitle/);
});

test("SmartLink card section has aria-hidden", () => {
  assert.match(smartLink, /aria-hidden="true"/);
});
