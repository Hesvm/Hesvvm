# Video Upload + Playback Setting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend VideoBlock to support self-hosted video uploads and a playback setting (autoplay vs click-to-play).

**Architecture:** Add `playback?: 'auto' | 'click'` to the `VideoBlock` type. The renderer auto-detects embed vs uploaded video by URL pattern — YouTube/Vimeo → `<iframe>`, anything else → `<video>`. The editor gains a file upload button (same pattern as ImageBlock, using `/api/admin/upload`) and a two-pill playback toggle.

**Tech Stack:** React, TypeScript, Next.js, Supabase Storage (via existing `/api/admin/upload`)

---

### Task 1: Add `playback` field to VideoBlock type

**Files:**
- Modify: `types/project.ts`
- Test: `tests/video-upload.test.mjs`

- [ ] **Step 1: Write the failing test**

Create `tests/video-upload.test.mjs`:

```mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const types = readFileSync("types/project.ts", "utf8");

test("VideoBlock has playback field", () => {
  assert.match(types, /playback\?\s*:\s*'auto'\s*\|\s*'click'/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/video-upload.test.mjs
```

Expected: FAIL — `playback` field not found.

- [ ] **Step 3: Add `playback` to VideoBlock type**

In `types/project.ts`, replace:

```ts
export type VideoBlock = {
  id: string
  type: 'video'
  url: string
  subtitle?: string
}
```

With:

```ts
export type VideoBlock = {
  id: string
  type: 'video'
  url: string
  subtitle?: string
  playback?: 'auto' | 'click'
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
node --test tests/video-upload.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add types/project.ts tests/video-upload.test.mjs
git commit -m "feat: add playback field to VideoBlock type"
```

---

### Task 2: Update ContentRenderer to render `<video>` for non-embed URLs

**Files:**
- Modify: `components/ContentRenderer.tsx`
- Test: `tests/video-upload.test.mjs`

The current video block in `ContentRenderer.tsx` (around line 145–170) renders an `<iframe>` only when `isEmbed` is true, and shows nothing for other URLs. We extend the else branch to render a `<video>` element.

- [ ] **Step 1: Write the failing test**

Append to `tests/video-upload.test.mjs`:

```mjs
const renderer = readFileSync("components/ContentRenderer.tsx", "utf8");

test("ContentRenderer renders <video> for non-embed URLs", () => {
  assert.match(renderer, /<video/);
});

test("ContentRenderer uses block.playback for autoplay/controls", () => {
  assert.match(renderer, /autoPlay/);
  assert.match(renderer, /controls/);
  assert.match(renderer, /muted/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
node --test tests/video-upload.test.mjs
```

Expected: 2 new tests FAIL.

- [ ] **Step 3: Update the video block render in ContentRenderer.tsx**

Find the video block section (around line 145). Replace the entire `if (block.type === "video")` block with:

```tsx
if (block.type === "video") {
  const isEmbed = block.url.includes("youtube") || block.url.includes("vimeo") || block.url.includes("youtu.be");
  const playback = block.playback ?? 'auto';
  return (
    <Reveal key={block.id} delay={delay}>
      <div>
        {isEmbed ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src={block.url}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : block.url ? (
          <video
            src={block.url}
            autoPlay={playback === 'auto'}
            muted={playback === 'auto'}
            loop={playback === 'auto'}
            controls={playback === 'click'}
            playsInline
            style={{ width: "100%", borderRadius: "12px", display: "block" }}
          />
        ) : null}
        {block.subtitle && (
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px" }}>
            {block.subtitle}
          </div>
        )}
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
node --test tests/video-upload.test.mjs
```

Expected: all 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ContentRenderer.tsx tests/video-upload.test.mjs
git commit -m "feat: render <video> for self-hosted video URLs in ContentRenderer"
```

---

### Task 3: Update VideoBlock editor with upload button and playback toggle

**Files:**
- Modify: `components/admin/blocks/VideoBlock.tsx`
- Modify: `components/admin/BlockEditor.tsx`
- Test: `tests/video-upload.test.mjs`

- [ ] **Step 1: Write the failing tests**

Append to `tests/video-upload.test.mjs`:

```mjs
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
  // Find the VideoBlock usage and confirm slug is passed near it
  const videoBlockIdx = blockEditor.indexOf('<VideoBlock');
  const snippet = blockEditor.slice(videoBlockIdx, videoBlockIdx + 300);
  assert.match(snippet, /slug=/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
node --test tests/video-upload.test.mjs
```

Expected: 4 new tests FAIL.

- [ ] **Step 3: Rewrite VideoBlock.tsx**

Replace the entire contents of `components/admin/blocks/VideoBlock.tsx` with:

```tsx
'use client'

import { useRef, useState } from 'react'
import { VideoBlock as VideoBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

function isValidEmbedUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')
}

function toEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return url
}

interface Props {
  block: VideoBlockType
  onChange: (b: VideoBlockType) => void
  onDelete: () => void
  isReordering: boolean
  slug: string
  dragHandleProps?: Record<string, unknown>
}

export default function VideoBlock({ block, onChange, onDelete, isReordering, slug, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEmbed = block.url && isValidEmbedUrl(block.url)
  const playback = block.playback ?? 'auto'

  async function handleUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'mp4'
    const path = `blocks/${slug}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setUploading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url: string }
      onChange({ ...block, url: data.url })
    } catch (err) {
      console.error('Video upload failed', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 8,
      padding: 16,
      position: 'relative',
      fontFamily: font,
      backgroundColor: '#fff',
    }}>
      {/* Top-right controls */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
        <button
          {...dragHandleProps}
          style={{ cursor: isReordering ? 'grab' : 'default', background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1 }}
        >
          ☰
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          style={{ background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1, cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div style={{
          marginBottom: 10,
          padding: '8px 12px',
          background: '#fff5f5',
          border: '1px solid #fecaca',
          borderRadius: 6,
          fontSize: 13,
          color: '#dc2626',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <span>Delete this block?</span>
          <button onClick={() => { onDelete(); setConfirmDelete(false) }} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Yes</button>
          <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: '1px solid #dc2626', color: '#dc2626', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
        </div>
      )}

      {/* URL input + upload button row */}
      <div style={{ display: 'flex', gap: 8, paddingRight: 60, marginBottom: 8 }}>
        <input
          type="url"
          value={block.url}
          onChange={e => onChange({ ...block, url: e.target.value })}
          placeholder="YouTube or Vimeo URL"
          readOnly={isReordering}
          style={{
            flex: 1,
            border: '1px solid #e8e8e8',
            borderRadius: 6,
            outline: 'none',
            fontSize: 13,
            fontFamily: font,
            color: '#1a1a1a',
            padding: '8px 10px',
            background: '#fafafa',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || isReordering}
          style={{
            background: '#f3f4f6',
            border: '1px solid #e8e8e8',
            borderRadius: 6,
            padding: '8px 14px',
            fontFamily: font,
            fontSize: 13,
            cursor: uploading || isReordering ? 'default' : 'pointer',
            color: '#374151',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {uploading ? 'Uploading…' : 'Upload video'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* Playback toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, paddingRight: 60 }}>
        <span style={{ fontSize: 12, color: '#6b7280', fontFamily: font, alignSelf: 'center', marginRight: 4 }}>Playback:</span>
        {(['auto', 'click'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => onChange({ ...block, playback: mode })}
            style={{
              padding: '4px 12px',
              borderRadius: 20,
              border: '1px solid #e8e8e8',
              background: playback === mode ? '#1a1a1a' : 'transparent',
              color: playback === mode ? '#fff' : '#6b7280',
              fontFamily: font,
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: playback === mode ? 500 : 400,
            }}
          >
            {mode === 'auto' ? 'Auto' : 'Click'}
          </button>
        ))}
      </div>

      {/* Preview */}
      {block.url && (
        <div style={{ marginBottom: 8 }}>
          {isEmbed ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden' }}>
              <iframe
                src={toEmbedUrl(block.url)}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              src={block.url}
              controls
              style={{ width: '100%', borderRadius: 8, display: 'block', maxHeight: 300 }}
            />
          )}
        </div>
      )}

      {/* Subtitle */}
      <input
        type="text"
        value={block.subtitle ?? ''}
        onChange={e => onChange({ ...block, subtitle: e.target.value })}
        placeholder="Caption (optional)"
        readOnly={isReordering}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: 12,
          fontFamily: font,
          color: '#9ca3af',
          padding: '4px 0',
          background: 'transparent',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Pass `slug` to VideoBlock in BlockEditor.tsx**

In `components/admin/BlockEditor.tsx`, find the `case 'video':` section (around line 141–150) and add `slug={slug}`:

```tsx
case 'video':
  return wrapper(
    <VideoBlock
      block={block}
      onChange={updateBlock}
      onDelete={() => deleteBlock(block.id)}
      isReordering={isReordering}
      dragHandleProps={dragHandleProps}
      slug={slug}
    />
  )
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
node --test tests/video-upload.test.mjs
```

Expected: all 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add components/admin/blocks/VideoBlock.tsx components/admin/BlockEditor.tsx tests/video-upload.test.mjs
git commit -m "feat: add video upload and playback toggle to VideoBlock editor"
```
