import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectLink = readFileSync("components/ProjectLink.tsx", "utf8");
const globals = readFileSync("app/globals.css", "utf8");

test("project content links use the shared text underline style", () => {
  assert.match(projectLink, /className="project-text-link"/);
  assert.match(globals, /\.project-text-link::after/);
  assert.match(globals, /background-color: rgba\(150, 145, 137, 0\.14\)/);
});

test("top header link styling remains scoped to hero text links", () => {
  assert.match(globals, /\.hero-text-link::after/);
  assert.doesNotMatch(projectLink, /hero-text-link/);
});
