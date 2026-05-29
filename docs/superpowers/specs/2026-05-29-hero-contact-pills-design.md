# Hero Contact Pills & Hover Preview System

**Date:** 2026-05-29
**Branch:** new-top-info
**Status:** Approved

---

## Overview

Replace the two plain `hero-link-line` paragraphs in `app/page.tsx` with an interactive pill chip row and a shared hover preview panel. The hero structure, typography, and spacing remain unchanged — only the contact link area is replaced.

---

## Component Structure

### New file: `components/HeroContact.tsx`

A single `"use client"` component that owns all state and renders:
1. The pill row
2. The shared preview panel

`app/page.tsx` imports `HeroContact` and drops it where the two link paragraphs currently live.

No other files change except `app/globals.css` (new utility classes for pills and preview card).

---

## Pill Row

### Layout

```
Contact me:  [ 🔗 LinkedIn ]  [ ✕ X posts ]  [ ✉ Email ]
```

- Single flex row, `align-items: center`, `gap: 6px`
- "Contact me:" label uses existing `--text-muted` color and `hero-link-line` font styles
- Pills never wrap (no `flex-wrap`)

### Pill anatomy

```
[ icon  label ]
```

- Border-radius: `999px` (pill shape)
- Background: `rgba(0, 0, 0, 0.045)`
- Padding: `6px 10px`
- Gap between icon and label: `5px`
- Font: `var(--font-sans)`, `14px`, `font-weight: 450`, `letter-spacing: -0.02em`
- Color default: `var(--text-muted)`
- Icons: existing inline SVGs already in `page.tsx` (LinkedIn, X, Email)

### Hover states

Active pill (hovered):
- `color: var(--color-text-primary)` (black)
- `background: rgba(0, 0, 0, 0.08)`
- Transition: `120ms ease`

Inactive pills (sibling of hovered):
- `opacity: 0.55`
- Transition: `120ms ease`

Focus-visible matches hover exactly (keyboard accessibility).

---

## Preview Panel

### Positioning

```css
position: absolute;
top: calc(100% + 12px);
left: 0;
```

The pill row wrapper gets `position: relative`. The preview panel sits beneath it without affecting layout (no layout shift, no CLS).

On mobile (< 768px), the panel is removed from absolute flow and rendered as a normal block element directly below the pill row.

### Animation

Framer Motion `AnimatePresence` wraps the panel.

```js
initial:  { opacity: 0, y: 8 }
animate:  { opacity: 1, y: 0 }
exit:     { opacity: 0, y: 8 }
transition: { duration: 0.18, ease: "easeOut" }
```

No bounce. No spring. No scale.

### Content swap

State: `const [active, setActive] = useState<'linkedin' | 'x' | 'email' | null>(null)`

When `active` changes between platforms, the panel stays mounted and swaps its inner content (no exit/enter animation between tabs — content just updates instantly). Exit animation fires only when `active` goes to `null` (mouse leaves the entire pill row).

Mouse-leave detection: attach `onMouseLeave` to the pill row wrapper. A small `50ms` debounce prevents flickering when moving between pills.

### Card styling

```css
width: 320px;
background: #fff;
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(82, 87, 95, 0.12);
overflow: hidden;
```

---

## Preview Content

### LinkedIn

```
┌─────────────────────────────────┐
│  [avatar]  Hesvm                │
│            Product Designer     │
│            611 connections      │
├─────────────────────────────────┤
│  [img]  [img]  [img]            │
│  Recent posts                   │
└─────────────────────────────────┘
```

- Avatar: `/images/avatar-hero.png` (existing asset)
- Name: "Hesvm", role: "Product Designer"
- Connections: "611 connections" (static string)
- 3 post thumbnails: static images saved to `/public/images/linkedin-post-1.png` etc. (sourced from the screenshots provided)
- Clicking the card opens `https://linkedin.com/in/hesammousavi` in a new tab

### X posts

```
┌─────────────────────────────────┐
│  @hesammousavi                  │
│  Tweet text snippet here...     │
│  ↺ 3   ♡ 163   ↑ 15K           │
├─────────────────────────────────┤
│  @hesammousavi                  │
│  Second tweet text snippet...   │
│  ↺ —   ♡ —   ↑ —               │
└─────────────────────────────────┘
```

- 2 compact tweet cards, static content
- Stats row: retweet count, like count, view count (static numbers from screenshot)
- Clicking card opens `https://x.com/hesammousavi`

### Email

```
┌─────────────────────────────────┐
│  ⚡ Available for:              │
│     ✓ Product Design            │
│     ✓ UX Audits                 │
│     ✓ Consulting                │
│                                 │
│  Usually replies within 24h     │
├─────────────────────────────────┤
│  [ Copy email ]  [ Open in Mail]│
└─────────────────────────────────┘
```

- Yellow lightning bolt icon (SVG from Vector.svg on Desktop)
- Checklist items: Product Design, UX Audits, Consulting
- Reply-time note: "Usually replies within 24 hours"
- Two pill buttons at bottom:
  - "Copy email" — copies `hesammousavizadeh@gmail.com` to clipboard, shows brief "Copied!" feedback
  - "Open in Mail" — `href="mailto:hesammousavizadeh@gmail.com"` with arrow-out icon

---

## Mobile Behavior (< 768px)

- No hover — tap to toggle
- Tapping a pill opens its preview (or closes if already active)
- Tapping another pill switches content without closing first
- Preview rendered in normal document flow (not absolute), appears below pill row
- `Escape` key closes preview

---

## Accessibility

- Pills are `<button>` elements (not anchors — they trigger a preview, not navigate)
- `aria-expanded` reflects preview open/closed state
- `aria-controls` points to the preview panel id
- Preview panel has `role="region"` and `aria-label` matching active platform
- `Escape` closes preview and returns focus to the active pill
- Focus-visible styles match hover styles exactly
- LinkedIn / X links inside preview cards are standard `<a>` tags

---

## Files Changed

| File | Change |
|------|--------|
| `components/HeroContact.tsx` | New file — all pill + preview logic |
| `app/page.tsx` | Remove two `hero-link-line` paragraphs, import `HeroContact` |
| `app/globals.css` | Add `.contact-pill`, `.contact-preview-card` utility classes |
| `public/images/` | Add post thumbnail images (linkedin-post-1/2/3.png, x-post-1/2.png if needed) |

---

## Out of Scope

- Real LinkedIn / X API calls (all content is static)
- Contact form or input fields in email preview
- Animations beyond the specified fade+slide
- Any changes to navbar, project grid, or other hero elements
