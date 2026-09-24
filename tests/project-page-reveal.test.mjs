import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectPageClient = readFileSync("components/ProjectPageClient.tsx", "utf8");

test("ProjectPageClient imports the shared Reveal wrapper", () => {
  assert.match(projectPageClient, /import Reveal from "@\/components\/Reveal"/);
});

test("project hero and title content use Reveal outside block content", () => {
  const heroIdx = projectPageClient.indexOf("<ProjectHero");
  const titleIdx = projectPageClient.indexOf('className="project-title-content"');

  assert.notEqual(heroIdx, -1);
  assert.notEqual(titleIdx, -1);

  const beforeHero = projectPageClient.slice(Math.max(0, heroIdx - 80), heroIdx);
  const beforeTitle = projectPageClient.slice(Math.max(0, titleIdx - 80), titleIdx);

  assert.match(beforeHero, /<Reveal[^>]*>/);
  assert.match(beforeTitle, /<Reveal[^>]*>/);
});
