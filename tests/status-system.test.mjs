import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("Status type model defines the requested fields and categories", () => {
  const src = readFileSync("types/status.ts", "utf8");

  assert.match(src, /export type StatusType/);
  for (const type of ["song", "movie", "game", "book", "manual"]) {
    assert.match(src, new RegExp(`'${type}'`));
  }

  for (const field of ["id", "type", "title", "subtitle", "link", "photo", "isActive", "createdAt", "updatedAt"]) {
    assert.match(src, new RegExp(`${field}[?:]?`));
  }
});

test("status data helper fetches the active status and maps snake_case database rows", () => {
  const src = readFileSync("lib/getStatus.ts", "utf8");

  assert.match(src, /getActiveStatus/);
  assert.match(src, /\.from\('statuses'\)/);
  assert.match(src, /\.eq\('is_active', true\)/);
  assert.match(src, /isActive: row\.is_active/);
  assert.match(src, /createdAt: row\.created_at/);
  assert.match(src, /process\.env\.NODE_ENV === 'production'[\s\S]*return null/);
});

test("admin status API prevents multiple active statuses", () => {
  const src = readFileSync("app/api/admin/statuses/[id]/route.ts", "utf8");

  assert.match(src, /\.from\('statuses'\)\.update\(\{ is_active: false \}\)/);
  assert.match(src, /\.eq\('id', id\)/);
  assert.match(src, /sanitizeStatusPayload/);
});

test("status migration enables RLS and only allows public reads for active rows", () => {
  const migration = readFileSync("supabase/migrations/20260606_create_statuses.sql", "utf8");

  assert.match(migration, /ALTER TABLE statuses ENABLE ROW LEVEL SECURITY;/i);
  assert.match(migration, /CREATE POLICY "Public can read active statuses"/);
  assert.match(migration, /FOR SELECT/);
  assert.match(migration, /USING \(is_active = true\)/);
  assert.doesNotMatch(migration, /FOR (INSERT|UPDATE|DELETE)/i);
});

test("admin status API requires the existing admin session cookie", () => {
  const listRoute = readFileSync("app/api/admin/statuses/route.ts", "utf8");
  const itemRoute = readFileSync("app/api/admin/statuses/[id]/route.ts", "utf8");
  const helper = readFileSync("lib/adminAuth.ts", "utf8");

  for (const route of [listRoute, itemRoute]) {
    assert.match(route, /requireAdminSession/);
  }
  assert.match(helper, /admin_session/);
  assert.match(helper, /Unauthorized/);
  assert.match(helper, /status: 401/);
});

test("admin status route and public status component exist", () => {
  assert.equal(existsSync("app/admin/status/page.tsx"), true);
  assert.equal(existsSync("components/StatusBubble.tsx"), true);
});

test("homepage renders StatusBubble above the avatar from active status data", () => {
  const src = readFileSync("app/page.tsx", "utf8");
  const statusIndex = src.indexOf("<StatusBubble");
  const avatarIndex = src.indexOf('className="hero-avatar"');

  assert.match(src, /getActiveStatus/);
  assert.match(src, /className="statusStack"/);
  assert.doesNotMatch(src, /strokeDasharray/);
  assert.doesNotMatch(src, /<circle/);
  assert.ok(statusIndex > -1);
  assert.ok(avatarIndex > -1);
  assert.ok(statusIndex < avatarIndex);
});

test("StatusBubble supports links, fallback thumbnails, labels, and reduced motion", () => {
  const component = readFileSync("components/StatusBubble.tsx", "utf8");
  const styles = readFileSync("app/globals.css", "utf8");

  assert.match(component, /status\.link/);
  assert.match(component, /aria-label/);
  assert.match(component, /status-bubble-shape/);
  assert.match(component, /viewBox="0 0 285 182"/);
  assert.match(component, /Recently listening/);
  assert.match(component, /Recently watching/);
  assert.match(component, /Recently playing/);
  assert.match(component, /Recently reading/);
  assert.match(component, /Current status/);
  assert.match(component, /status\.photo/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /status-bubble/);
});

test("StatusBubble follows the HESVM object-card design language", () => {
  const component = readFileSync("components/StatusBubble.tsx", "utf8");
  const styles = readFileSync("app/globals.css", "utf8");

  assert.match(component, /status-bubble-object/);
  assert.match(styles, /statusStack/);
  assert.doesNotMatch(component, /status-bubble-eq/);
  assert.doesNotMatch(styles, /equalizer|waveform|speaker|status-eq|status-speaker/i);
  assert.doesNotMatch(styles, /linear-gradient/);
  assert.match(styles, /status-bubble-book[\s\S]*perspective/);
  assert.match(styles, /status-bubble-manual[\s\S]*status-bubble-subtitle/);
});

test("admin status preview is derived from current form state", () => {
  const admin = readFileSync("app/admin/status/page.tsx", "utf8");

  assert.match(admin, /const previewStatus: Status =/);
  assert.match(admin, /id: form\.id \?\? 'preview'/);
  assert.match(admin, /type: form\.type/);
  assert.match(admin, /title: form\.title \|\| 'Untitled status'/);
  assert.match(admin, /subtitle: form\.type === 'manual' \? form\.subtitle \|\| 'Current status' : undefined/);
  assert.match(admin, /link: form\.link \|\| undefined/);
  assert.match(admin, /photo: form\.photo \|\| undefined/);
  assert.match(admin, /<StatusBubble status=\{previewStatus\} preview/);
  assert.doesNotMatch(admin, /Count Me Out|Dune|GTA VI|ZAG|Projects|Aftersun/);
});

test("StatusBubble preview mode prevents navigation without changing public links", () => {
  const component = readFileSync("components/StatusBubble.tsx", "utf8");

  assert.match(component, /preview\?: boolean/);
  assert.match(component, /function handlePreviewClick/);
  assert.match(component, /event\.preventDefault\(\)/);
  assert.match(component, /if \(status\.link && !preview\)/);
  assert.match(component, /aria-label=\{ariaLabel\}/);
});
