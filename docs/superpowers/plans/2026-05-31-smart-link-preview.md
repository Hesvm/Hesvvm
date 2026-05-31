# SmartLink Hover Preview Cards — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `SmartLink` component that renders a plain link by default and adds a hover/focus preview card (image + title + subtitle) when a `preview` prop is supplied.

**Architecture:** A single `components/SmartLink.tsx` owns all logic — link element, card UI, portal rendering, viewport-aware positioning, and Framer Motion animation. CSS for the pill underline lives in `app/globals.css`. No other files are modified.

**Tech Stack:** React 19, Next.js 16, Framer Motion 12, `ReactDOM.createPortal`, Node.js `node:test` for static analysis tests.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/SmartLink.tsx` | Full component — link, card, portal, positioning, animation |
| Modify | `app/globals.css` | `.smart-link` and `.smart-link-underline` CSS classes |
| Create | `tests/smart-link.test.mjs` | Static source analysis tests |

---

### Task 1: CSS — pill underline styles

**Files:**
- Modify: `app/globals.css`
- Create: `tests/smart-link.test.mjs`

- [ ] **Step 1.1 — Write the failing test**

Create `tests/smart-link.test.mjs`:

```js
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
```

- [ ] **Step 1.2 — Run to confirm it fails**

```bash
node --test tests/smart-link.test.mjs
```

Expected: 3 failures — `.smart-link` not found in globals.css.

- [ ] **Step 1.3 — Add styles to `app/globals.css`**

Append at the end of `app/globals.css` (before the final closing brace if any, otherwise just at the end):

```css
/* ── SmartLink ── */
.smart-link {
  position: relative;
  display: inline-block;
  color: inherit;
  text-decoration: none;
  transition: color 150ms ease-out;
}

.smart-link:hover,
.smart-link:focus-visible {
  color: var(--text-primary);
  font-weight: 500;
}

.smart-link-underline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 3px;
  border-radius: 999px;
  background: rgba(150, 145, 137, 0.40);
  pointer-events: none;
  transition: background 150ms ease-out;
}

.smart-link:hover .smart-link-underline,
.smart-link:focus-visible .smart-link-underline {
  background: rgba(19, 19, 19, 0.35);
}
```

- [ ] **Step 1.4 — Run to confirm it passes**

```bash
node --test tests/smart-link.test.mjs
```

Expected: 3 passing.

- [ ] **Step 1.5 — Commit**

```bash
git add app/globals.css tests/smart-link.test.mjs
git commit -m "feat: add .smart-link pill underline CSS"
```

---

### Task 2: SmartLink — plain link fallback

**Files:**
- Create: `components/SmartLink.tsx`
- Modify: `tests/smart-link.test.mjs`

- [ ] **Step 2.1 — Add failing tests**

Append to `tests/smart-link.test.mjs`:

```js
const smartLink = readFileSync("components/SmartLink.tsx", "utf8");

test("SmartLink component file exists and is a client component", () => {
  assert.match(smartLink, /"use client"/);
});

test("SmartLink renders an <a> element with .smart-link class", () => {
  assert.match(smartLink, /className="smart-link"/);
  assert.match(smartLink, /<a\b/);
});

test("SmartLink includes the pill underline span", () => {
  assert.match(smartLink, /smart-link-underline/);
  assert.match(smartLink, /aria-hidden="true"/);
});

test("SmartLink without preview prop renders just the link", () => {
  assert.match(smartLink, /if \(!preview\)/);
});
```

- [ ] **Step 2.2 — Run to confirm they fail**

```bash
node --test tests/smart-link.test.mjs
```

Expected: 4 new failures — file not found.

- [ ] **Step 2.3 — Create `components/SmartLink.tsx`**

```tsx
"use client";

import Link from "next/link";
import React from "react";

export interface PreviewData {
  image: string;
  title: string;
  subtitle: string;
}

interface SmartLinkProps {
  href: string;
  preview?: PreviewData;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

export function SmartLink({
  href,
  preview,
  children,
  target,
  rel,
  className,
}: SmartLinkProps) {
  if (!preview) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
    );
  }

  // Preview-enabled branch — implemented in subsequent tasks
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`smart-link${className ? ` ${className}` : ""}`}
    >
      {children}
      <span className="smart-link-underline" aria-hidden="true" />
    </a>
  );
}
```

- [ ] **Step 2.4 — Run tests**

```bash
node --test tests/smart-link.test.mjs
```

Expected: all passing.

- [ ] **Step 2.5 — Commit**

```bash
git add components/SmartLink.tsx tests/smart-link.test.mjs
git commit -m "feat: add SmartLink component — plain link fallback"
```

---

### Task 3: Preview card UI

**Files:**
- Modify: `components/SmartLink.tsx`
- Modify: `tests/smart-link.test.mjs`

- [ ] **Step 3.1 — Add failing tests**

Append to `tests/smart-link.test.mjs`:

```js
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

test("SmartLink card has aria-hidden", () => {
  assert.match(smartLink, /aria-hidden="true"/);
});
```

- [ ] **Step 3.2 — Run to confirm they fail**

```bash
node --test tests/smart-link.test.mjs
```

Expected: failures on Image import, alt, title, subtitle.

- [ ] **Step 3.3 — Add card UI to `components/SmartLink.tsx`**

Replace the entire file with:

```tsx
"use client";

import Image from "next/image";
import React from "react";

export interface PreviewData {
  image: string;
  title: string;
  subtitle: string;
}

interface SmartLinkProps {
  href: string;
  preview?: PreviewData;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

function PreviewCard({ preview }: { preview: PreviewData }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 244,
        background: "#ffffff",
        borderRadius: 26,
        boxShadow:
          "0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)",
        overflow: "hidden",
        padding: "10px 10px 0 10px",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 148,
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={preview.image}
          alt={preview.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="224px"
        />
      </div>
      <div style={{ padding: "11px 4px 14px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 3,
            letterSpacing: "-0.015em",
          }}
        >
          {preview.title}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "var(--text-muted)",
            lineHeight: 1.45,
          }}
        >
          {preview.subtitle}
        </div>
      </div>
    </div>
  );
}

export function SmartLink({
  href,
  preview,
  children,
  target,
  rel,
  className,
}: SmartLinkProps) {
  if (!preview) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`smart-link${className ? ` ${className}` : ""}`}
    >
      {children}
      <span className="smart-link-underline" aria-hidden="true" />
      {/* Card rendered here — portal + animation added in next task */}
      <PreviewCard preview={preview} />
    </a>
  );
}
```

- [ ] **Step 3.4 — Run tests**

```bash
node --test tests/smart-link.test.mjs
```

Expected: all passing.

- [ ] **Step 3.5 — Commit**

```bash
git add components/SmartLink.tsx tests/smart-link.test.mjs
git commit -m "feat: add PreviewCard UI to SmartLink"
```

---

### Task 4: Portal + viewport-aware positioning

**Files:**
- Modify: `components/SmartLink.tsx`
- Modify: `tests/smart-link.test.mjs`

- [ ] **Step 4.1 — Add failing tests**

Append to `tests/smart-link.test.mjs`:

```js
test("SmartLink uses ReactDOM.createPortal", () => {
  assert.match(smartLink, /createPortal/);
  assert.match(smartLink, /from "react-dom"/);
});

test("SmartLink card uses position fixed", () => {
  assert.match(smartLink, /position: "fixed"/);
});

test("SmartLink has computePosition helper with clamping logic", () => {
  assert.match(smartLink, /computePosition/);
  assert.match(smartLink, /window\.innerWidth/);
  assert.match(smartLink, /window\.innerHeight/);
});
```

- [ ] **Step 4.2 — Run to confirm they fail**

```bash
node --test tests/smart-link.test.mjs
```

Expected: 3 failures — createPortal, position fixed, computePosition not found.

- [ ] **Step 4.3 — Replace `components/SmartLink.tsx` with portal + positioning**

```tsx
"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface PreviewData {
  image: string;
  title: string;
  subtitle: string;
}

interface SmartLinkProps {
  href: string;
  preview?: PreviewData;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

interface CardPos {
  top: number;
  left: number;
}

const CARD_WIDTH = 244;
const CARD_HEIGHT_ESTIMATE = 220;
const OFFSET = 8;
const VIEWPORT_PAD = 8;

function computePosition(rect: DOMRect): CardPos {
  let top = rect.bottom + OFFSET;
  if (top + CARD_HEIGHT_ESTIMATE > window.innerHeight - VIEWPORT_PAD) {
    top = rect.top - CARD_HEIGHT_ESTIMATE - OFFSET;
  }
  let left = rect.left;
  left = Math.max(
    VIEWPORT_PAD,
    Math.min(left, window.innerWidth - CARD_WIDTH - VIEWPORT_PAD)
  );
  return { top, left };
}

function PreviewCard({
  preview,
  pos,
}: {
  preview: PreviewData;
  pos: CardPos;
}) {
  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        width: CARD_WIDTH,
        background: "#ffffff",
        borderRadius: 26,
        boxShadow:
          "0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)",
        overflow: "hidden",
        padding: "10px 10px 0 10px",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 148,
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={preview.image}
          alt={preview.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="224px"
        />
      </div>
      <div style={{ padding: "11px 4px 14px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 3,
            letterSpacing: "-0.015em",
          }}
        >
          {preview.title}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "var(--text-muted)",
            lineHeight: 1.45,
          }}
        >
          {preview.subtitle}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SmartLink({
  href,
  preview,
  children,
  target,
  rel,
  className,
}: SmartLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<CardPos>({ top: 0, left: 0 });

  if (!preview) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
    );
  }

  function show() {
    if (!linkRef.current) return;
    setPos(computePosition(linkRef.current.getBoundingClientRect()));
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={rel}
      className={`smart-link${className ? ` ${className}` : ""}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span className="smart-link-underline" aria-hidden="true" />
      {visible && <PreviewCard preview={preview} pos={pos} />}
    </a>
  );
}
```

- [ ] **Step 4.4 — Run tests**

```bash
node --test tests/smart-link.test.mjs
```

Expected: all passing.

- [ ] **Step 4.5 — Commit**

```bash
git add components/SmartLink.tsx tests/smart-link.test.mjs
git commit -m "feat: add portal rendering and viewport-safe positioning to SmartLink"
```

---

### Task 5: Framer Motion animation + Escape key + reduced motion

**Files:**
- Modify: `components/SmartLink.tsx`
- Modify: `tests/smart-link.test.mjs`

- [ ] **Step 5.1 — Add failing tests**

Append to `tests/smart-link.test.mjs`:

```js
test("SmartLink uses Framer Motion AnimatePresence", () => {
  assert.match(smartLink, /AnimatePresence/);
  assert.match(smartLink, /from "framer-motion"/);
});

test("SmartLink card has enter animation values", () => {
  assert.match(smartLink, /opacity: 0/);
  assert.match(smartLink, /scale: 0\.98/);
});

test("SmartLink handles Escape key to close card", () => {
  assert.match(smartLink, /Escape/);
  assert.match(smartLink, /onKeyDown/);
});

test("SmartLink respects prefers-reduced-motion", () => {
  assert.match(smartLink, /useReducedMotion/);
});
```

- [ ] **Step 5.2 — Run to confirm they fail**

```bash
node --test tests/smart-link.test.mjs
```

Expected: 4 failures.

- [ ] **Step 5.3 — Replace `components/SmartLink.tsx` with final version**

```tsx
"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface PreviewData {
  image: string;
  title: string;
  subtitle: string;
}

interface SmartLinkProps {
  href: string;
  preview?: PreviewData;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

interface CardPos {
  top: number;
  left: number;
}

const CARD_WIDTH = 244;
const CARD_HEIGHT_ESTIMATE = 220;
const OFFSET = 8;
const VIEWPORT_PAD = 8;

function computePosition(rect: DOMRect): CardPos {
  let top = rect.bottom + OFFSET;
  if (top + CARD_HEIGHT_ESTIMATE > window.innerHeight - VIEWPORT_PAD) {
    top = rect.top - CARD_HEIGHT_ESTIMATE - OFFSET;
  }
  let left = rect.left;
  left = Math.max(
    VIEWPORT_PAD,
    Math.min(left, window.innerWidth - CARD_WIDTH - VIEWPORT_PAD)
  );
  return { top, left };
}

function PreviewCardPortal({
  preview,
  pos,
  reducedMotion,
}: {
  preview: PreviewData;
  pos: CardPos;
  reducedMotion: boolean;
}) {
  const initial = reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, y: 2 };
  const animate = reducedMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, y: 0 };
  const exit = reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, y: 2 };

  return createPortal(
    <motion.div
      aria-hidden="true"
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        width: CARD_WIDTH,
        background: "#ffffff",
        borderRadius: 26,
        boxShadow:
          "0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)",
        overflow: "hidden",
        padding: "10px 10px 0 10px",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 148,
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={preview.image}
          alt={preview.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="224px"
        />
      </div>
      <div style={{ padding: "11px 4px 14px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 3,
            letterSpacing: "-0.015em",
          }}
        >
          {preview.title}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "var(--text-muted)",
            lineHeight: 1.45,
          }}
        >
          {preview.subtitle}
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

// Usage example:
// <SmartLink
//   href="https://linkedin.com/in/parsaghaffari"
//   preview={{
//     image: "/images/people/parsa.jpg",
//     title: "Parsa Ghaffari",
//     subtitle: "Ex CEO of Alien, specialist in founding startups"
//   }}
// >
//   Parsa
// </SmartLink>
//
// TODO: implement long-press preview on mobile
// Long-press (~500ms) should show card without navigating;
// tap elsewhere closes; normal tap still navigates.
// Deferred: conflicts with native iOS/Android link behaviour.

export function SmartLink({
  href,
  preview,
  children,
  target,
  rel,
  className,
}: SmartLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<CardPos>({ top: 0, left: 0 });
  const reducedMotion = useReducedMotion() ?? false;

  if (!preview) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
    );
  }

  function show() {
    if (!linkRef.current) return;
    setPos(computePosition(linkRef.current.getBoundingClientRect()));
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    if (e.key === "Escape") hide();
  }

  return (
    <>
      <a
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={onKeyDown}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
      <AnimatePresence>
        {visible && (
          <PreviewCardPortal
            preview={preview}
            pos={pos}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 5.4 — Run tests**

```bash
node --test tests/smart-link.test.mjs
```

Expected: all passing.

- [ ] **Step 5.5 — Type-check and lint**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 5.6 — Commit**

```bash
git add components/SmartLink.tsx tests/smart-link.test.mjs
git commit -m "feat: add animation, Escape key, and reduced-motion to SmartLink"
```

---

### Task 6: Build verification + manual browser test

**Files:** none changed

- [ ] **Step 6.1 — Production build**

```bash
npm run build
```

Expected: no errors. If Next.js warns about `next/image` missing `width`/`height` when using `fill`, confirm `fill` is paired with a positioned parent — it is (the parent div has `position: relative` and explicit `height: 148`).

- [ ] **Step 6.2 — Start dev server**

```bash
npm run dev
```

- [ ] **Step 6.3 — Add a test usage to the home page temporarily**

In `app/page.tsx`, add the import at the top:

```tsx
import { SmartLink } from "@/components/SmartLink";
```

In the hero tagline `<p>`, replace plain text with a SmartLink to verify:

```tsx
<p className="hero-tagline" style={{ color: "var(--text-muted)", margin: "0 0 18px 0" }}>
  Product Designer, Making software feel less like software.
  <br />
  Done it for{" "}
  <SmartLink
    href="https://linear.app"
    preview={{
      image: "/images/og-hero.png",
      title: "Linear",
      subtitle: "Project management tool built for speed"
    }}
  >
    great teams
  </SmartLink>
  , agencies & myself.
</p>
```

*(Uses existing `/images/og-hero.png` so no new asset needed.)*

- [ ] **Step 6.4 — Manual browser checks**

Open `http://localhost:3000` and verify:

| Check | Expected |
|-------|----------|
| Link appears with pill underline at rest | ✓ |
| Hover over "great teams" | Card appears below link, fade+scale in |
| Mouse leave | Card fades out |
| Tab to link with keyboard | Card appears |
| Tab away | Card disappears |
| Press Escape while focused | Card disappears |
| Resize browser so link is near right edge | Card clamps, never exits viewport |
| Resize browser so link is near bottom | Card flips above link |
| Other links on page | Completely unaffected |

- [ ] **Step 6.5 — Revert the temporary hero test usage**

```bash
git checkout app/page.tsx
```

- [ ] **Step 6.6 — Final commit**

```bash
git add components/SmartLink.tsx tests/smart-link.test.mjs
git commit -m "feat: complete SmartLink hover preview card component"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Optional preview per link — `preview` prop is optional; plain `<a>` when absent
- [x] Card: image + title + subtitle — `PreviewCard` renders all three
- [x] Smart positioning, viewport collision — `computePosition()` handles both axes
- [x] Desktop hover/focus — `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`
- [x] Escape key closes card — `onKeyDown` handler
- [x] Framer Motion animation 150ms — `transition: { duration: 0.15, ease: "easeOut" }`
- [x] Reduced motion — `useReducedMotion()` skips scale/y
- [x] Portal to `document.body` — `createPortal(..., document.body)`
- [x] Card: 244px, 26px radius, photo inset 10px, 18px inner radius, no border
- [x] Underline: 3px pill, rgba(150,145,137,0.40) at rest, darkens on hover
- [x] Mobile: normal link, TODO comment left in code
- [x] No changes to existing link classes — SmartLink uses `.smart-link` only
- [x] Example usage documented in component comment
