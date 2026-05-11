# Project Detail Page Implementation Plan

> **Goal:** Build dynamic project detail pages with flexible content blocks, scroll animations, and fixed navigation.

**Architecture:** Content-block system (types → mock data → renderer). Components built bottom-up (dividers, hero, fade hook). Page assembles pieces. Cards link to detail pages.

**Tech Stack:** Next.js, TypeScript, Framer Motion, CSS custom properties

---

## File Structure

**Create:**
- `/data/projects.ts` — types + mock data
- `/components/Divider.tsx` — 5 SVG variants
- `/components/ProjectHero.tsx` — hero image
- `/hooks/useScrollFade.ts` — scroll fade hook
- `/components/ScrollBlock.tsx` — scroll fade wrapper
- `/components/ContentRenderer.tsx` — block renderer
- `/components/BackButton.tsx` — fixed back button
- `/app/projects/[slug]/page.tsx` — detail page

**Modify:**
- `/components/ProjectCard.tsx` — add Link wrapper
- `/app/globals.css` — ensure tokens present

---

## Tasks

### Task 1: Content Block Type System

**Files:** Create `/data/projects.ts`

- [ ] Define `DividerBlock`, `TextBlock`, `SingleImageBlock`, `DoubleImageBlock`, `ContentBlock` union
- [ ] Define `Project` type with `blocks: ContentBlock[]`
- [ ] Add mock ExpertMed project (use placeholder image paths)
- [ ] Export `getProject(slug: string)` helper

### Task 2: Divider SVG Component

**Files:** Create `/components/Divider.tsx`

- [ ] Import 5 SVG variants as paths (variant 1–5, heights 23–38px)
- [ ] Export component accepting `variant: 1|2|3|4|5` prop
- [ ] Each SVG: `width="100%" preserveAspectRatio="none"` + fixed height
- [ ] Color: `fill="#E0E0E0"`
- [ ] Wrap in `div` with `my-12`

### Task 3: ProjectHero Component

**Files:** Create `/components/ProjectHero.tsx`

- [ ] Accept `thumbnail: string` prop
- [ ] Render Next.js Image: 100% width, 560px height, object-fit cover
- [ ] Border radius matches card (from design tokens)
- [ ] No subtitle/caption

### Task 4: Scroll Fade Hook + ScrollBlock

**Files:** Create `/hooks/useScrollFade.ts` and `/components/ScrollBlock.tsx`

- [ ] Hook uses `useInView`, `useScroll`, `useTransform` (Framer Motion)
- [ ] Returns ref + opacity motion value (fade in 0→1, fade out 1→0.2)
- [ ] `ScrollBlock` wraps children in `motion.div` with hook applied
- [ ] Add `"use client"` to ScrollBlock

### Task 5: ContentRenderer Component

**Files:** Create `/components/ContentRenderer.tsx`

- [ ] Accept `blocks: ContentBlock[]`
- [ ] TEXT: max-width 680px, centered, font-sans, relaxed line-height
- [ ] SINGLE IMAGE: full width, border-radius 16px, subtitle below if present
- [ ] DOUBLE IMAGE: 50/50 side-by-side (gap-6), stack on mobile, subtitles per image
- [ ] DIVIDER: render only `<Divider variant={} />`, no ScrollBlock
- [ ] Wrap TEXT, IMAGE, IMAGE-PAIR in ScrollBlock; NOT dividers

### Task 6: BackButton Component

**Files:** Create `/components/BackButton.tsx`

- [ ] Fixed position: left 40px, top 40px
- [ ] Arrow icon "←" in small pill
- [ ] useRouter → push("/")
- [ ] Add `"use client"`
- [ ] Framer Motion: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}`
- [ ] Hover: scale(1.05), 150ms ease

### Task 7: Project Detail Page

**Files:** Create `/app/projects/[slug]/page.tsx`

- [ ] Fetch project via `getProject(slug)` from params
- [ ] Call `notFound()` if not found
- [ ] Structure: BackButton (fixed) → ProjectHero → header (title + category in ScrollBlock) → ContentRenderer
- [ ] Page entry: `motion.div` wraps non-fixed content, opacity 0→1, y 24→0, 0.4s easeOut
- [ ] Padding-bottom for navbar clearance

### Task 8: Wire Up Project Cards

**Files:** Modify `/components/ProjectCard.tsx`

- [ ] Import `Link` from next/link
- [ ] Wrap entire card in `<Link href={`/projects/${project.slug}`}>`
- [ ] No other design changes

### Task 9: Verify Full Flow

**Files:** None (manual testing)

- [ ] Home → click ExpertMed → detail page loads
- [ ] Page entry animation plays
- [ ] Hero image renders
- [ ] Scroll → blocks fade in
- [ ] Scroll up → blocks fade out
- [ ] Back button fixed, works
- [ ] Back → home page

### Task 10: Build Check

**Files:** None (validation)

- [ ] Run `npx tsc --noEmit`
- [ ] Run `npx next build`
- [ ] Fix type errors only; no design changes

---

## Execution

Plan saved. Ready to execute task-by-task.

**Choose approach:**
1. **Subagent-Driven** — fresh agent per task (recommended for complex UI)
2. **Inline Execution** — execute here with checkpoints
