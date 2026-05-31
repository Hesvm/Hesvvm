# Video Upload + Playback Setting — Design Spec

**Date:** 2026-05-31
**Scope:** VideoBlock type, admin VideoBlock editor, ContentRenderer

---

## Summary

Extend VideoBlock to support self-hosted video uploads alongside existing YouTube/Vimeo embeds. Add a `playback` setting (`'auto' | 'click'`) defaulting to `'auto'`. The renderer auto-detects source type from the URL — no new block types needed.

---

## Type Changes (`types/project.ts`)

Add one optional field to `VideoBlock`:

```ts
export type VideoBlock = {
  id: string
  type: 'video'
  url: string
  subtitle?: string
  playback?: 'auto' | 'click'   // default: 'auto' when absent
}
```

No migration needed — existing blocks without `playback` are treated as `'auto'`.

---

## Admin Editor (`components/admin/blocks/VideoBlock.tsx`)

### New prop
Add `slug: string` prop (same as ImageBlock) for constructing the upload path.

### Upload button
- Hidden `<input type="file" accept="video/mp4,video/webm,video/quicktime">` behind a styled button
- On file pick: POST to `/api/admin/upload` with `file` and `path = blocks/<slug>-<timestamp>.<ext>`
- While uploading: button shows "Uploading…", input is disabled
- On success: set `block.url` to the returned public URL
- On error: log to console (same pattern as ImageBlock)
- The URL text input stays visible — editors can still paste YouTube/Vimeo links

### Playback toggle
- Two-pill toggle below the URL/upload area: `Auto` | `Click`
- `Auto` selected when `block.playback` is `undefined` or `'auto'`
- Updates `block.playback` on click
- Visually: active pill has a dark background, inactive is transparent

### Upload state
- `uploading: boolean` state via `useState`
- `fileInputRef` via `useRef<HTMLInputElement>`

---

## Renderer (`components/ContentRenderer.tsx`)

The existing `isEmbed` check already covers YouTube/Vimeo. Extend the non-embed branch:

```tsx
const playback = block.playback ?? 'auto'

if (isEmbed) {
  // existing <iframe> render
} else {
  // new <video> render
  <video
    src={block.url}
    autoPlay={playback === 'auto'}
    muted={playback === 'auto'}      // required for browser autoplay policy
    loop={playback === 'auto'}
    controls={playback === 'click'}
    playsInline
    style={{ width: '100%', borderRadius: '12px' }}
  />
}
```

`muted` is required alongside `autoPlay` — browsers block unmuted autoplay.

---

## Upload API

No changes to `/api/admin/upload/route.ts` — it already accepts any file type and stores to the `portfolio-images` Supabase bucket.

---

## Files Changed

| File | Change |
|---|---|
| `types/project.ts` | Add `playback?: 'auto' \| 'click'` to `VideoBlock` |
| `components/admin/blocks/VideoBlock.tsx` | Add `slug` prop, upload button, playback toggle |
| `components/ContentRenderer.tsx` | Render `<video>` for non-embed URLs with autoplay/controls |

---

## Out of Scope

- No poster/thumbnail for the video element
- No progress indicator beyond "Uploading…" label
- No file size validation (Supabase enforces limits)
- Embed URLs keep their existing `<iframe>` render unchanged
