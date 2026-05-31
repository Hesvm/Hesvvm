# SmartLink Hover Preview Cards — Design Spec

**Date:** 2026-05-31  
**Status:** Approved (visual design validated in browser)

---

## Overview

Add an optional Wikipedia-style hover preview card to any link on the site. Normal links are completely unaffected. When a `preview` prop is supplied, the link shows a compact card (image + title + subtitle) on hover and keyboard focus.

---

## Component API

```tsx
<SmartLink
  href="https://example.com"
  preview={{
    image: "/images/people/parsa.jpg",
    title: "Parsa Ghaffari",
    subtitle: "Ex CEO of Alien, specialist in founding startups"
  }}
>
  Parsa
</SmartLink>
```

- `href` — the URL to navigate to (required)
- `preview` — optional. When absent, renders a plain `<a>` with the existing `hero-text-link` underline style and no special behaviour.
- `preview.image` — absolute path or URL for the preview photo
- `preview.title` — bold heading in the card
- `preview.subtitle` — muted smaller text below the title

---

## Files

| Path | Action |
|------|--------|
| `components/SmartLink.tsx` | Create — the full component |
| `app/globals.css` | Extend — add `.smart-link` underline styles |

No other files touched.

---

## Link Styling

The `<a>` element inside `SmartLink` uses a custom underline implemented as an absolutely-positioned child `<span>` (not `text-decoration`, which cannot be styled as a pill).

### At rest
- Text color: inherited from parent (matches surrounding text)
- Underline: `height: 3px`, `border-radius: 999px` (pill, rounded both ends), `background: rgba(150, 145, 137, 0.40)`

### On hover / when card is visible
- Text color: `var(--text-primary)` (`#131313`), `font-weight: 500`
- Underline: `background: rgba(19, 19, 19, 0.35)` (same pill shape, darkens)
- Transition: `color 150ms ease-out`, `font-weight` instant

### Implementation note
The parent `<a>` must have `position: relative; display: inline-block`. The underline `<span>` sits at `position: absolute; left: 0; right: 0; bottom: -4px`.

SmartLink must **not** apply `hero-text-link` or `project-text-link` CSS classes — those classes add their own `::after` underline which would conflict. SmartLink carries its own `.smart-link` class with the 3px pill underline only.

---

## Preview Card

### Visual spec (browser-validated)
| Property | Value |
|----------|-------|
| Width | 244px |
| Card border-radius | 26px |
| Background | `#ffffff` (`var(--surface-primary)`) |
| Border | none |
| Shadow | `0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)` |
| Card padding | `10px 10px 0 10px` (creates inset frame around photo) |

### Photo section
| Property | Value |
|----------|-------|
| Width | `100%` (fills card minus padding = 224px) |
| Height | 148px |
| Border-radius | 18px |
| Object-fit | `cover` |
| Component | Next.js `<Image>` |

The photo is inset from the card edges by the card padding (10px sides, 10px top). It has its own inner border-radius of 18px, giving a floating-photo-inside-card look.

### Text section
| Property | Value |
|----------|-------|
| Padding | `11px 4px 14px` |
| Title | 13.5px, `font-weight: 600`, `color: var(--text-primary)`, `letter-spacing: -0.015em` |
| Subtitle | 12px, `font-weight: 400`, `color: var(--text-muted)` (`#969189`), `line-height: 1.45` |

---

## Animation

Uses Framer Motion `AnimatePresence` + `motion.div`.

```
initial:  { opacity: 0, scale: 0.98, y: 2 }
animate:  { opacity: 1, scale: 1,    y: 0 }
exit:     { opacity: 0, scale: 0.98, y: 2 }
transition: { duration: 0.15, ease: "easeOut" }
```

**Reduced motion:** When `prefers-reduced-motion: reduce` is active, skip `scale` and `y` transforms — animate opacity only.

---

## Positioning

The card is rendered via `ReactDOM.createPortal` into `document.body` to avoid being clipped by any parent `overflow: hidden` containers.

The card uses `position: fixed` with coordinates computed from the link's `getBoundingClientRect()`.

### Algorithm (runs on every mouse-enter / focus)

1. Get `rect = linkRef.current.getBoundingClientRect()`
2. **Vertical:** Try below first: `top = rect.bottom + 8`. If `top + cardHeight > window.innerHeight - 8`, flip to above: `top = rect.top - cardHeight - 8`.
3. **Horizontal:** `left = rect.left`. Clamp: `left = Math.max(8, Math.min(left, window.innerWidth - cardWidth - 8))`.
4. Set `{ top, left }` in state — card renders at those fixed coords.

Card width constant: `244px`. Card height estimate for pre-check: `220px` (image 148 + text ~72).

---

## Interaction Behaviour

### Desktop
| Event | Action |
|-------|--------|
| `mouseenter` on link | compute position → show card |
| `mouseleave` from link | hide card |
| `focus` on link | show card |
| `blur` on link | hide card |
| `Escape` key (while card visible) | hide card, keep link focused |
| click | navigate normally |

### Mobile
Normal link behaviour. No long-press support.

```tsx
// TODO: implement long-press preview on mobile
// Long-press (~500ms) should show card without navigating;
// tap elsewhere closes; normal tap still navigates.
// Deferred because it conflicts with native iOS/Android link behaviour.
```

---

## Accessibility

- The link is a real `<a>` element — never a `<div>` or `<button>`.
- Preview image has `alt={preview.title}` (descriptive, matches the subject).
- Card is `aria-hidden="true"` — it is decorative, not required to understand the link.
- Card does not receive focus; it does not trap keyboard navigation.
- Escape key closes an open card.

---

## Example Usage

The natural first use is in project detail text blocks that mention specific people or companies. Use `SmartLink` in place of `<a>` wherever preview context adds value:

```tsx
// In a project's text content (e.g. rendered via ContentRenderer or inline JSX)
<SmartLink
  href="https://linkedin.com/in/parsaghaffari"
  preview={{
    image: "/images/people/parsa.jpg",
    title: "Parsa Ghaffari",
    subtitle: "Ex CEO of Alien, specialist in founding startups"
  }}
>
  Parsa
</SmartLink>
```

The home page hero currently has no inline person links — add `SmartLink` when such links are added to the hero tagline or project descriptions.

---

## What Does Not Change

- All existing `hero-text-link` and `project-text-link` styles are untouched.
- No changes to `ProjectCard`, `ProjectGrid`, `PageTransition`, or any animation.
- No new npm dependencies (Framer Motion already installed).
- No changes to routing or data layer.
