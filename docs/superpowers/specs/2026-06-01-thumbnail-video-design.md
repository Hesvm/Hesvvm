# Thumbnail Video — Design Spec

**Date:** 2026-06-01  
**Status:** Approved (Option A, user approved)

## Overview

Projects can optionally have a video thumbnail. When set, the video replaces the static image in the home grid card and the project detail page hero. The static `thumbnail_url` image is kept as OG/SEO fallback and for projects with no video.

## New Fields on Project

| Field | Type | Default |
|-------|------|---------|
| `thumbnail_video_url` | `string \| null` | `null` |
| `thumbnail_video_play` | `'auto' \| 'static' \| null` | `'auto'` |

- `auto` — video autoplays (muted, looped, no controls) in the grid and hero
- `static` — video element is present but paused, showing first frame (`preload="metadata"`)

## Files Changed

| File | Change |
|------|--------|
| `types/project.ts` | Add two optional fields |
| `app/admin/projects/[id]/page.tsx` | Video upload + autoplay/static toggle in left sidebar, below Thumbnail |
| `components/ProjectCard.tsx` | Render `<video>` instead of `SharedProjectImage` when `thumbnail_video_url` is set |
| `components/ProjectHero.tsx` | Render `<video>` instead of `SharedProjectImage` when `thumbnail_video_url` is set |
| Supabase `projects` table | Add `thumbnail_video_url text` and `thumbnail_video_play text` columns |

## Admin UI

Below the Thumbnail section in the left sidebar:
- Label: "Thumbnail Video"
- Upload button (uploads to `thumbnail-videos/` in Supabase storage)
- If video set: preview `<video>` element + remove button
- Toggle: **Autoplay** | **First frame** (controls `thumbnail_video_play`)

## Grid Card

- When `thumbnail_video_url` exists: replace `SharedProjectImage` with `<video>` inside the same `project-card-thumbnail` container (same size, same border-radius, same hover translateY)
- Autoplay: `autoPlay muted loop playsInline`
- Static: `preload="metadata"` only (first frame shown, no controls)

## Detail Page Hero

- When `thumbnail_video_url` exists: replace `SharedProjectImage` in `ProjectHero` with `<video>`
- Always autoplays on the detail page (`autoPlay muted loop playsInline`)
- Same `project-hero` CSS class (height 420px, border-radius 18px)

## Invariants

- No shared element layout transition for videos (Framer Motion `layoutId` skipped)
- `thumbnail_url` image always kept for OG/SEO — video does not replace it in meta tags
- Videos always muted (browser autoplay policy requirement)
