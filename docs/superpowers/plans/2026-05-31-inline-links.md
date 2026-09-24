# Inline Links (Ctrl+K) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Ctrl+K support to TextBlock, QuoteBlock, and TitleBlock editors so editors can wrap selected text in `[text](url)` markdown links, which the ContentRenderer parses and renders as `<a>` tags.

**Architecture:** A pure `parseInlineLinks` utility in `lib/parseInlineLinks.ts` splits a string by `[text](url)` patterns and returns `React.ReactNode[]`. ContentRenderer imports it and applies it to text/title/quote blocks. Each block editor adds a `keydown` handler that intercepts Ctrl+K/Meta+K, prompts for a URL, and inserts the markdown syntax into the content string via `selectionStart`/`selectionEnd`.

**Tech Stack:** React, TypeScript, Next.js (no new dependencies)

---

### Task 1: Create parseInlineLinks utility

**Files:**
- Create: `lib/parseInlineLinks.ts`
- Create: `tests/inline-links.test.mjs`

- [ ] **Step 1: Write the failing test**

Create `tests/inline-links.test.mjs`:

```mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const src = readFileSync("lib/parseInlineLinks.ts", "utf8");

test("parseInlineLinks is exported", () => {
  assert.match(src, /export function parseInlineLinks/);
});

test("uses the correct inline link regex", () => {
  assert.match(src, /\[([^\]]+)\]\(([^)]+)\)/);
});

test("renders links with target _blank and rel noopener", () => {
  assert.match(src, /target="_blank"/);
  assert.match(src, /rel="noopener noreferrer"/);
});

test("uses color: 'inherit' so links match surrounding text", () => {
  assert.match(src, /color.*inherit/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/inline-links.test.mjs
```

Expected: 4 FAILs — `lib/parseInlineLinks.ts` does not exist yet.

- [ ] **Step 3: Create lib/parseInlineLinks.ts**

```ts
import React from 'react'

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

export function parseInlineLinks(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  INLINE_LINK_RE.lastIndex = 0
  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    nodes.push(
      React.createElement(
        'a',
        {
          key: match.index,
          href: match[2],
          target: '_blank',
          rel: 'noopener noreferrer',
          style: { textDecoration: 'underline', color: 'inherit' },
        },
        match[1]
      )
    )
    last = match.index + match[0].length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/inline-links.test.mjs
```

Expected: 4 PASSes.

- [ ] **Step 5: Commit**

```bash
git add lib/parseInlineLinks.ts tests/inline-links.test.mjs
git commit -m "feat: add parseInlineLinks utility for markdown inline links"
```

---

### Task 2: Wire parseInlineLinks into ContentRenderer

**Files:**
- Modify: `components/ContentRenderer.tsx`

- [ ] **Step 1: Write the failing test**

Add to `tests/inline-links.test.mjs`:

```mjs
const renderer = readFileSync("components/ContentRenderer.tsx", "utf8");

test("ContentRenderer imports parseInlineLinks", () => {
  assert.match(renderer, /parseInlineLinks/);
});

test("ContentRenderer applies parseInlineLinks to text block", () => {
  assert.match(renderer, /parseInlineLinks\(block\.content\)/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/inline-links.test.mjs
```

Expected: the 2 new tests FAIL.

- [ ] **Step 3: Update ContentRenderer.tsx**

Add the import at the top of `components/ContentRenderer.tsx` (after the existing imports):

```ts
import { parseInlineLinks } from "@/lib/parseInlineLinks";
```

Replace the three plain `{block.content}` renders with `{parseInlineLinks(block.content)}`:

**Text block** (around line 31):
```tsx
// Before:
{block.content}
// After:
{parseInlineLinks(block.content)}
```

**Title block** (around line 49):
```tsx
// Before:
{block.content}
// After:
{parseInlineLinks(block.content)}
```

**Quote block** (around line 162):
```tsx
// Before:
{block.content}
// After:
{parseInlineLinks(block.content)}
```

Leave `{block.attribution}` in the quote block as plain text — no change there.

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/inline-links.test.mjs
```

Expected: all 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ContentRenderer.tsx tests/inline-links.test.mjs
git commit -m "feat: render inline markdown links in text/title/quote blocks"
```

---

### Task 3: Add Ctrl+K handler to TextBlock

**Files:**
- Modify: `components/admin/blocks/TextBlock.tsx`

- [ ] **Step 1: Write the failing test**

Add to `tests/inline-links.test.mjs`:

```mjs
const textBlock = readFileSync("components/admin/blocks/TextBlock.tsx", "utf8");

test("TextBlock handles Ctrl+K keydown", () => {
  assert.match(textBlock, /onKeyDown/);
  assert.match(textBlock, /ctrlKey.*metaKey|metaKey.*ctrlKey/);
  assert.match(textBlock, /key.*===.*k|key.*===.*K/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/inline-links.test.mjs
```

Expected: the new test FAILs.

- [ ] **Step 3: Add handler to TextBlock.tsx**

Add the `handleKeyDown` function inside the component (before the `return`), and wire it to the textarea:

```tsx
function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    const el = textareaRef.current
    if (!el) return
    const url = window.prompt('URL:')
    if (!url) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const selected = value.slice(start, end)
    const insertion = selected ? `[${selected}](${url})` : `[](${url})`
    const next = value.slice(0, start) + insertion + value.slice(end)
    onChange({ ...block, content: next })
    // Move cursor: if no selection, place inside the brackets; otherwise after insertion
    const cursorPos = selected ? start + insertion.length : start + 1
    requestAnimationFrame(() => {
      el.setSelectionRange(cursorPos, cursorPos)
    })
  }
}
```

Wire it to the textarea:

```tsx
<textarea
  ref={textareaRef}
  value={block.content}
  readOnly={isReordering}
  onChange={e => onChange({ ...block, content: e.target.value })}
  onInput={autoResize}
  onKeyDown={handleKeyDown}
  ...
/>
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/inline-links.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/admin/blocks/TextBlock.tsx tests/inline-links.test.mjs
git commit -m "feat: add Ctrl+K inline link shortcut to TextBlock"
```

---

### Task 4: Add Ctrl+K handler to QuoteBlock

**Files:**
- Modify: `components/admin/blocks/QuoteBlock.tsx`

- [ ] **Step 1: Write the failing test**

Add to `tests/inline-links.test.mjs`:

```mjs
const quoteBlock = readFileSync("components/admin/blocks/QuoteBlock.tsx", "utf8");

test("QuoteBlock handles Ctrl+K keydown", () => {
  assert.match(quoteBlock, /onKeyDown/);
  assert.match(quoteBlock, /ctrlKey.*metaKey|metaKey.*ctrlKey/);
  assert.match(quoteBlock, /key.*===.*k|key.*===.*K/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/inline-links.test.mjs
```

Expected: the new test FAILs.

- [ ] **Step 3: Add handler to QuoteBlock.tsx**

Add the `handleKeyDown` function inside the component (before the `return`), and wire it to the textarea:

```tsx
function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    const el = textareaRef.current
    if (!el) return
    const url = window.prompt('URL:')
    if (!url) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const selected = value.slice(start, end)
    const insertion = selected ? `[${selected}](${url})` : `[](${url})`
    const next = value.slice(0, start) + insertion + value.slice(end)
    onChange({ ...block, content: next })
    const cursorPos = selected ? start + insertion.length : start + 1
    requestAnimationFrame(() => {
      el.setSelectionRange(cursorPos, cursorPos)
    })
  }
}
```

Wire it to the textarea (the one bound to `block.content`, not the attribution input):

```tsx
<textarea
  ref={textareaRef}
  value={block.content}
  readOnly={isReordering}
  onChange={e => onChange({ ...block, content: e.target.value })}
  onInput={autoResize}
  onKeyDown={handleKeyDown}
  ...
/>
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/inline-links.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/admin/blocks/QuoteBlock.tsx tests/inline-links.test.mjs
git commit -m "feat: add Ctrl+K inline link shortcut to QuoteBlock"
```

---

### Task 5: Add Ctrl+K handler to TitleBlock

**Files:**
- Modify: `components/admin/blocks/TitleBlock.tsx`

> Note: TitleBlock uses `<input type="text">`, not `<textarea>`. The `selectionStart`/`selectionEnd` API works identically on `<input>` elements.

- [ ] **Step 1: Write the failing test**

Add to `tests/inline-links.test.mjs`:

```mjs
const titleBlock = readFileSync("components/admin/blocks/TitleBlock.tsx", "utf8");

test("TitleBlock handles Ctrl+K keydown", () => {
  assert.match(titleBlock, /onKeyDown/);
  assert.match(titleBlock, /ctrlKey.*metaKey|metaKey.*ctrlKey/);
  assert.match(titleBlock, /key.*===.*k|key.*===.*K/);
});

test("TitleBlock uses a ref on the input", () => {
  assert.match(titleBlock, /useRef/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/inline-links.test.mjs
```

Expected: 2 new tests FAIL.

- [ ] **Step 3: Add handler to TitleBlock.tsx**

Add `useRef` to the import line:

```tsx
import { useRef, useState } from 'react'
```

Add the ref and handler inside the component (before the `return`):

```tsx
const inputRef = useRef<HTMLInputElement>(null)

function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    const el = inputRef.current
    if (!el) return
    const url = window.prompt('URL:')
    if (!url) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const s = start ?? value.length
    const en = end ?? value.length
    const selected = value.slice(s, en)
    const insertion = selected ? `[${selected}](${url})` : `[](${url})`
    const next = value.slice(0, s) + insertion + value.slice(en)
    onChange({ ...block, content: next })
    const cursorPos = selected ? s + insertion.length : s + 1
    requestAnimationFrame(() => {
      el.setSelectionRange(cursorPos, cursorPos)
    })
  }
}
```

Wire the ref and handler to the input:

```tsx
<input
  ref={inputRef}
  type="text"
  value={block.content}
  readOnly={isReordering}
  onChange={e => onChange({ ...block, content: e.target.value })}
  onKeyDown={handleKeyDown}
  ...
/>
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/inline-links.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/admin/blocks/TitleBlock.tsx tests/inline-links.test.mjs
git commit -m "feat: add Ctrl+K inline link shortcut to TitleBlock"
```
