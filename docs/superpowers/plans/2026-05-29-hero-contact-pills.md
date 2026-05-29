# Hero Contact Pills & Preview System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two plain hero link paragraphs with interactive pill chips and a shared hover/tap preview panel showing LinkedIn, X, and Email content.

**Architecture:** A single `HeroContact` client component owns all interactivity (pills + shared preview). `app/page.tsx` stays a server component — HeroContact is the only interactive island. Framer Motion `AnimatePresence` handles the preview panel's fade+slide animation. One shared preview `<div>` swaps content by `active` state; it does not unmount between tab switches.

**Tech Stack:** Next.js 15 App Router, React 19, Framer Motion 12, TypeScript, CSS custom properties (no Tailwind classes used)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/HeroContact.tsx` | **Create** | All pill + preview logic, state, ARIA |
| `app/page.tsx` | **Modify** (lines 116–154) | Remove two `hero-link-line` paragraphs, import HeroContact |
| `app/globals.css` | **Modify** (after line 284) | Add pill and preview card CSS classes |
| `public/images/li-post-1.png` | **Add** | LinkedIn post thumbnail 1 |
| `public/images/li-post-2.png` | **Add** | LinkedIn post thumbnail 2 |
| `public/images/li-post-3.png` | **Add** | LinkedIn post thumbnail 3 |
| `public/images/x-post-1.png` | **Add** | X post thumbnail 1 |
| `public/images/x-post-2.png` | **Add** | X post thumbnail 2 |
| `public/images/x-post-3.png` | **Add** | X post thumbnail 3 |

---

## Task 1: Extract post thumbnail images from SVG design files

**Files:**
- Read: `/Users/hesam/Desktop/X.svg`
- Read: `/Users/hesam/Desktop/Linkedin.svg`
- Create: `public/images/li-post-1.png`, `li-post-2.png`, `li-post-3.png`
- Create: `public/images/x-post-1.png`, `x-post-2.png`, `x-post-3.png`

The SVG design files on the Desktop have post thumbnails embedded as base64 PNG data inside `<image>` elements in their `<defs>`. Extract them with this script.

- [ ] **Step 1: Run extraction script**

```bash
node -e "
const fs = require('fs');
const path = require('path');

function extractImages(svgPath, prefix, outputDir) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const imageRegex = /<image[^>]*id=\"(image\d+[^\"]*)\"/g;
  const hrefRegex = /(?:href|xlink:href)=\"data:image\/png;base64,([^\"]+)\"/;
  
  // Extract all <image ...> blocks
  const imageBlockRegex = /<image[^>]*(?:href|xlink:href)=\"data:image\/[^;]+;base64,([^\"]+)\"[^>]*>/g;
  let match;
  let i = 1;
  while ((match = imageBlockRegex.exec(svg)) !== null) {
    const b64 = match[1];
    const outPath = path.join(outputDir, prefix + '-' + i + '.png');
    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
    console.log('Wrote', outPath);
    i++;
  }
}

const publicImages = 'public/images';
extractImages('/Users/hesam/Desktop/Linkedin.svg', 'li-post', publicImages);
extractImages('/Users/hesam/Desktop/X.svg', 'x-post', publicImages);
"
```

Expected: Files `public/images/li-post-1.png` … `li-post-3.png` and `x-post-1.png` … `x-post-3.png` appear.

- [ ] **Step 2: Verify images exist and are valid**

```bash
ls -lh public/images/li-post-*.png public/images/x-post-*.png
file public/images/li-post-1.png
```

Expected: Each file is a valid PNG, non-zero size.

> **If the script produces 0 files:** The SVGs may use external xlink:href `#imageN` refs with the data in a separate `<image>` tag. Run:
> ```bash
> grep -o 'href="data:image[^"]*"' /Users/hesam/Desktop/X.svg | head -3
> ```
> If that also returns nothing, the images are linked, not embedded. In that case, manually save each of the 3 screenshot thumbnails from the chat/Figma to `public/images/x-post-1.png`, etc. Placeholder solid-color PNGs (64×64 px) also work for now — layout will still be correct.

- [ ] **Step 3: Commit image assets**

```bash
git add public/images/li-post-1.png public/images/li-post-2.png public/images/li-post-3.png public/images/x-post-1.png public/images/x-post-2.png public/images/x-post-3.png
git commit -m "feat: add post thumbnail images for hero contact previews"
```

---

## Task 2: Add CSS utility classes to globals.css

**Files:**
- Modify: `app/globals.css` (insert after line 284, after the `.hero-text-link` block)

- [ ] **Step 1: Open globals.css and insert after the closing brace of `.hero-text-link:focus-visible::after` block (currently ending around line 284)**

Add these classes:

```css
/* ── Hero Contact Pills ── */
.contact-pills-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 6px;
  margin: 0;
}

.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.045);
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 450;
  letter-spacing: -0.02em;
  color: var(--text-muted);
  transition: color 120ms ease, background 120ms ease, opacity 120ms ease;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.contact-pill:focus-visible {
  outline: 2px solid var(--border-strong);
  outline-offset: 2px;
}

.contact-pill svg {
  flex: 0 0 auto;
  color: inherit;
}

/* ── Hero Contact Preview Card ── */
.contact-preview-card {
  width: 320px;
  background: var(--surface-primary);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(82, 87, 95, 0.12);
  overflow: hidden;
}

.contact-preview-inner {
  padding: 14px 16px;
}

.contact-preview-divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;
}

/* Email preview action pills */
.email-action-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.045);
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 450;
  letter-spacing: -0.02em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: background 120ms ease, color 120ms ease;
  -webkit-font-smoothing: antialiased;
}

.email-action-pill:hover,
.email-action-pill:focus-visible {
  background: rgba(0, 0, 0, 0.08);
  color: var(--text-primary);
  outline: none;
}
```

- [ ] **Step 2: Verify dev server has no CSS errors**

```bash
# Check Next.js compiles cleanly — look for no red errors in output
npx next build --no-lint 2>&1 | tail -5
```

Expected: `✓ Compiled` or `Route (app)` table. No CSS parse errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add contact pill and preview card CSS classes"
```

---

## Task 3: Create HeroContact.tsx — shell with pill row

**Files:**
- Create: `components/HeroContact.tsx`

No preview panel yet — just the pill row with state wiring and hover handlers.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState, useRef, useCallback } from "react";

export type Platform = "linkedin" | "x" | "email";

const LINKEDIN_ICON = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.0855 0H1.12266C0.824912 0 0.539359 0.123912 0.328819 0.344478C0.11828 0.565043 0 0.864193 0 1.17612V14.7563C0 15.0682 0.11828 15.3673 0.328819 15.5879C0.539359 15.8085 0.824912 15.9324 1.12266 15.9324H14.0855C14.3833 15.9324 14.6688 15.8085 14.8794 15.5879C15.0899 15.3673 15.2082 15.0682 15.2082 14.7563V1.17612C15.2082 0.864193 15.0899 0.565043 14.8794 0.344478C14.6688 0.123912 14.3833 0 14.0855 0ZM4.53288 13.5724H2.24638V5.96358H4.53288V13.5724ZM3.38804 4.90916C3.12868 4.90763 2.87556 4.82565 2.66063 4.67356C2.4457 4.52146 2.27859 4.30608 2.18039 4.05458C2.0822 3.80309 2.05732 3.52676 2.10889 3.26046C2.16046 2.99417 2.28617 2.74985 2.47016 2.55833C2.65415 2.36681 2.88817 2.23668 3.14269 2.18437C3.3972 2.13205 3.66081 2.1599 3.90023 2.26438C4.13966 2.36886 4.34418 2.54531 4.48797 2.77145C4.63177 2.99758 4.7084 3.26328 4.7082 3.535C4.71065 3.71691 4.67811 3.89748 4.61252 4.06595C4.54694 4.23441 4.44965 4.38731 4.32645 4.51555C4.20326 4.64378 4.05669 4.74472 3.89546 4.81234C3.73424 4.87997 3.56167 4.9129 3.38804 4.90916ZM12.9607 13.579H10.6753V9.42223C10.6753 8.19632 10.1779 7.81793 9.53574 7.81793C8.85771 7.81793 8.19235 8.35343 8.19235 9.45321V13.579H5.90584V5.96911H8.10469V7.02352H8.13426C8.35499 6.55551 9.12808 5.75557 10.3078 5.75557C11.5836 5.75557 12.9618 6.54887 12.9618 8.87234L12.9607 13.579Z" fill="currentColor"/>
  </svg>
);

const X_ICON = (
  <svg width="13" height="12" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.23983 7.70552L0 0H4.94239L8.79418 4.76254L12.9092 0.0214433H15.6312L10.1103 6.38983L16.6566 14.484H11.7289L7.55824 9.33359L3.10559 14.4697H0.368835L6.23983 7.70552ZM12.4472 13.0563L3.0305 1.4277H4.22359L13.6284 13.0563H12.4472Z" fill="currentColor"/>
  </svg>
);

const EMAIL_ICON = (
  <svg width="13" height="12" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 0H4.5C1.8 0 0 1.35 0 4.5V10.8C0 13.95 1.8 15.3 4.5 15.3H13.5C16.2 15.3 18 13.95 18 10.8V4.5C18 1.35 16.2 0 13.5 0ZM13.923 5.481L11.106 7.731C10.512 8.208 9.756 8.442 9 8.442C8.244 8.442 7.479 8.208 6.894 7.731L4.077 5.481C3.789 5.247 3.744 4.815 3.969 4.527C4.203 4.239 4.626 4.185 4.914 4.419L7.731 6.669C8.415 7.218 9.576 7.218 10.26 6.669L13.077 4.419C13.365 4.185 13.797 4.23 14.022 4.527C14.256 4.815 14.211 5.247 13.923 5.481Z" fill="currentColor"/>
  </svg>
);

const PILLS: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: "linkedin", label: "LinkedIn", icon: LINKEDIN_ICON },
  { id: "x",        label: "X posts",  icon: X_ICON },
  { id: "email",    label: "Email",    icon: EMAIL_ICON },
];

export function HeroContact() {
  const [active, setActive] = useState<Platform | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePillEnter = useCallback((id: Platform) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(id);
  }, []);

  const handleWrapperLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActive(null), 50);
  }, []);

  const handlePillClick = useCallback((id: Platform) => {
    // Mobile tap-to-toggle
    setActive((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div style={{ marginTop: "0" }}>
      <div
        className="contact-pills-wrapper"
        onMouseLeave={handleWrapperLeave}
        role="group"
        aria-label="Contact options"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "var(--text-muted)",
            flexShrink: 0,
            lineHeight: 1.43,
            paddingRight: "2px",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Contact me:
        </span>
        {PILLS.map(({ id, label, icon }) => {
          const isActive = active === id;
          const isDimmed = active !== null && !isActive;
          return (
            <button
              key={id}
              className="contact-pill"
              aria-expanded={isActive}
              aria-controls={`contact-preview-${id}`}
              onMouseEnter={() => handlePillEnter(id)}
              onClick={() => handlePillClick(id)}
              style={{
                opacity: isDimmed ? 0.55 : 1,
                color: isActive ? "var(--text-primary)" : undefined,
                background: isActive ? "rgba(0,0,0,0.08)" : undefined,
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/HeroContact.tsx
git commit -m "feat: add HeroContact pill row shell"
```

---

## Task 4: Add shared preview panel with AnimatePresence

**Files:**
- Modify: `components/HeroContact.tsx`

Add the preview panel container below the pill row. The panel mounts/unmounts on `active !== null`. Content inside swaps instantly without exit/enter animation when switching between pills.

- [ ] **Step 1: Add Framer Motion imports and preview panel to HeroContact.tsx**

Replace the entire file with this version (adds `AnimatePresence`, `motion`, and the preview container):

```tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Platform = "linkedin" | "x" | "email";

// ── Icons (same as Task 3) ──────────────────────────────────────────────────

const LINKEDIN_ICON = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.0855 0H1.12266C0.824912 0 0.539359 0.123912 0.328819 0.344478C0.11828 0.565043 0 0.864193 0 1.17612V14.7563C0 15.0682 0.11828 15.3673 0.328819 15.5879C0.539359 15.8085 0.824912 15.9324 1.12266 15.9324H14.0855C14.3833 15.9324 14.6688 15.8085 14.8794 15.5879C15.0899 15.3673 15.2082 15.0682 15.2082 14.7563V1.17612C15.2082 0.864193 15.0899 0.565043 14.8794 0.344478C14.6688 0.123912 14.3833 0 14.0855 0ZM4.53288 13.5724H2.24638V5.96358H4.53288V13.5724ZM3.38804 4.90916C3.12868 4.90763 2.87556 4.82565 2.66063 4.67356C2.4457 4.52146 2.27859 4.30608 2.18039 4.05458C2.0822 3.80309 2.05732 3.52676 2.10889 3.26046C2.16046 2.99417 2.28617 2.74985 2.47016 2.55833C2.65415 2.36681 2.88817 2.23668 3.14269 2.18437C3.3972 2.13205 3.66081 2.1599 3.90023 2.26438C4.13966 2.36886 4.34418 2.54531 4.48797 2.77145C4.63177 2.99758 4.7084 3.26328 4.7082 3.535C4.71065 3.71691 4.67811 3.89748 4.61252 4.06595C4.54694 4.23441 4.44965 4.38731 4.32645 4.51555C4.20326 4.64378 4.05669 4.74472 3.89546 4.81234C3.73424 4.87997 3.56167 4.9129 3.38804 4.90916ZM12.9607 13.579H10.6753V9.42223C10.6753 8.19632 10.1779 7.81793 9.53574 7.81793C8.85771 7.81793 8.19235 8.35343 8.19235 9.45321V13.579H5.90584V5.96911H8.10469V7.02352H8.13426C8.35499 6.55551 9.12808 5.75557 10.3078 5.75557C11.5836 5.75557 12.9618 6.54887 12.9618 8.87234L12.9607 13.579Z" fill="currentColor"/>
  </svg>
);

const X_ICON = (
  <svg width="13" height="12" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.23983 7.70552L0 0H4.94239L8.79418 4.76254L12.9092 0.0214433H15.6312L10.1103 6.38983L16.6566 14.484H11.7289L7.55824 9.33359L3.10559 14.4697H0.368835L6.23983 7.70552ZM12.4472 13.0563L3.0305 1.4277H4.22359L13.6284 13.0563H12.4472Z" fill="currentColor"/>
  </svg>
);

const EMAIL_ICON = (
  <svg width="13" height="12" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 0H4.5C1.8 0 0 1.35 0 4.5V10.8C0 13.95 1.8 15.3 4.5 15.3H13.5C16.2 15.3 18 13.95 18 10.8V4.5C18 1.35 16.2 0 13.5 0ZM13.923 5.481L11.106 7.731C10.512 8.208 9.756 8.442 9 8.442C8.244 8.442 7.479 8.208 6.894 7.731L4.077 5.481C3.789 5.247 3.744 4.815 3.969 4.527C4.203 4.239 4.626 4.185 4.914 4.419L7.731 6.669C8.415 7.218 9.576 7.218 10.26 6.669L13.077 4.419C13.365 4.185 13.797 4.23 14.022 4.527C14.256 4.815 14.211 5.247 13.923 5.481Z" fill="currentColor"/>
  </svg>
);

const PILLS: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: "linkedin", label: "LinkedIn", icon: LINKEDIN_ICON },
  { id: "x",        label: "X posts",  icon: X_ICON },
  { id: "email",    label: "Email",    icon: EMAIL_ICON },
];

// ── Placeholder preview content (replaced in Tasks 5–7) ────────────────────

function PreviewContent({ platform }: { platform: Platform }) {
  return (
    <div className="contact-preview-inner" style={{ minHeight: 80 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>
        {platform}
      </span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function HeroContact() {
  const [active, setActive] = useState<Platform | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePillEnter = useCallback((id: Platform) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(id);
  }, []);

  const handleWrapperLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActive(null), 50);
  }, []);

  const handlePillClick = useCallback((id: Platform) => {
    setActive((prev) => (prev === id ? null : id));
  }, []);

  // Escape key closes preview
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ marginTop: "0" }}>
      <div
        className="contact-pills-wrapper"
        onMouseLeave={handleWrapperLeave}
        role="group"
        aria-label="Contact options"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "var(--text-muted)",
            flexShrink: 0,
            lineHeight: 1.43,
            paddingRight: "2px",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Contact me:
        </span>
        {PILLS.map(({ id, label, icon }) => {
          const isActive = active === id;
          const isDimmed = active !== null && !isActive;
          return (
            <button
              key={id}
              className="contact-pill"
              aria-expanded={isActive}
              aria-controls="contact-preview-panel"
              onMouseEnter={() => handlePillEnter(id)}
              onClick={() => handlePillClick(id)}
              style={{
                opacity: isDimmed ? 0.55 : 1,
                color: isActive ? "var(--text-primary)" : undefined,
                background: isActive ? "rgba(0,0,0,0.08)" : undefined,
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}

        {/* Desktop: absolute preview panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              id="contact-preview-panel"
              role="region"
              aria-label={`${active} contact preview`}
              className="contact-preview-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                left: 0,
                zIndex: 10,
              }}
              // Don't close when hovering over the card itself
              onMouseEnter={() => {
                if (leaveTimer.current) clearTimeout(leaveTimer.current);
              }}
              onMouseLeave={handleWrapperLeave}
            >
              <PreviewContent platform={active} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: inline preview panel below pills */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="contact-preview-card contact-preview-mobile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ marginTop: 12 }}
          >
            <PreviewContent platform={active} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Add mobile show/hide CSS rule at the end of globals.css**

After the `.email-action-pill` block, add:

```css
/* Show/hide preview for desktop vs mobile */
.contact-preview-mobile {
  display: none;
}

@media (max-width: 767px) {
  .contact-preview-mobile {
    display: block;
  }
  /* On mobile, hide the absolute-positioned desktop panel */
  #contact-preview-panel[style*="position: absolute"] {
    display: none;
  }
}
```

> **Note:** The desktop panel uses `position: absolute` inline style. On mobile, the `position:absolute` panel is hidden via the CSS selector above, and the sibling `.contact-preview-mobile` div shows instead (in normal flow).

- [ ] **Step 3: Verify TypeScript compiles and dev server runs with no errors**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/HeroContact.tsx app/globals.css
git commit -m "feat: add shared preview panel with AnimatePresence"
```

---

## Task 5: Build LinkedIn preview content

**Files:**
- Modify: `components/HeroContact.tsx` — replace `PreviewContent` with full implementation

- [ ] **Step 1: Replace the `PreviewContent` placeholder function with `LinkedInPreview`**

Add this function above `PreviewContent` in `HeroContact.tsx`:

```tsx
function LinkedInPreview() {
  return (
    <a
      href="https://linkedin.com/in/hesammousavi"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div className="contact-preview-inner">
        {/* Profile row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", overflow: "hidden",
            flexShrink: 0, background: "var(--surface-secondary)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar-hero.png"
              alt="Hesvm"
              width={36}
              height={36}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
              WebkitFontSmoothing: "antialiased",
            }}>
              Hesvm
            </div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased", lineHeight: 1.4,
            }}>
              Product Designer
            </div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased",
            }}>
              611 connections
            </div>
          </div>
        </div>

        {/* Post thumbnails */}
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                flex: 1,
                aspectRatio: "1",
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--surface-secondary)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/li-post-${n}.png`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Update `PreviewContent` to route to `LinkedInPreview`**

Replace the `PreviewContent` function:

```tsx
function PreviewContent({ platform }: { platform: Platform }) {
  if (platform === "linkedin") return <LinkedInPreview />;
  // x and email come in later tasks
  return (
    <div className="contact-preview-inner" style={{ minHeight: 80 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>
        {platform}
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/HeroContact.tsx
git commit -m "feat: add LinkedIn preview content"
```

---

## Task 6: Build X posts preview content

**Files:**
- Modify: `components/HeroContact.tsx` — add `XPreview` function

- [ ] **Step 1: Add `XPreview` function above `PreviewContent`**

```tsx
const X_POSTS_DATA = [
  {
    text: "You spend 5% of your time creating. You spend 95% of your time on social media creating a strategy.",
    imageSrc: "/images/x-post-1.png",
    stats: { retweets: 3, likes: 163, views: "15K" },
  },
  {
    text: "Prompts you can use:",
    imageSrc: "/images/x-post-2.png",
    stats: { retweets: null, likes: null, views: null },
  },
];

const RetweetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M23 7L20 4L17 7M21 5V15C21 16.1 20.1 17 19 17H3M1 17L4 20L7 17M3 19V9C3 7.9 3.9 7 5 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ViewsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

function XPreview() {
  return (
    <a
      href="https://x.com/hesammousavi"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      {X_POSTS_DATA.map((post, i) => (
        <div key={i}>
          {i > 0 && <hr className="contact-preview-divider" />}
          <div className="contact-preview-inner" style={{ paddingBottom: i === X_POSTS_DATA.length - 1 ? 14 : 10 }}>
            {/* Tweet text */}
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              margin: "0 0 8px 0",
              WebkitFontSmoothing: "antialiased",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.text}
            </p>

            {/* Thumbnail */}
            {post.imageSrc && (
              <div style={{
                width: "100%",
                height: 72,
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--surface-secondary)",
                marginBottom: 8,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageSrc}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            {/* Stats row */}
            {post.stats.likes !== null && (
              <div style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                color: "var(--text-muted)",
              }}>
                {[
                  { icon: <RetweetIcon />, value: post.stats.retweets },
                  { icon: <HeartIcon />,   value: post.stats.likes },
                  { icon: <ViewsIcon />,   value: post.stats.views },
                ].map(({ icon, value }, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-sans)", fontSize: 12 }}>
                    {icon}
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </a>
  );
}
```

- [ ] **Step 2: Update `PreviewContent` to route to `XPreview`**

```tsx
function PreviewContent({ platform }: { platform: Platform }) {
  if (platform === "linkedin") return <LinkedInPreview />;
  if (platform === "x") return <XPreview />;
  return (
    <div className="contact-preview-inner" style={{ minHeight: 80 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>
        email
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/HeroContact.tsx
git commit -m "feat: add X posts preview content"
```

---

## Task 7: Build Email preview content

**Files:**
- Modify: `components/HeroContact.tsx` — add `EmailPreview` function

- [ ] **Step 1: Add `EmailPreview` function above `PreviewContent`**

```tsx
const LIGHTNING_ICON = (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M6.3124 4.25228H4.83314V0.741574C4.83314 -0.0775894 4.39751 -0.243373 3.86612 0.371L3.48314 0.814714L0.242182 4.56921C-0.203032 5.08119 -0.0163291 5.50052 0.653884 5.50052H2.13314V9.01123C2.13314 9.83039 2.56878 9.99617 3.10016 9.3818L3.48314 8.93809L6.7241 5.18359C7.16932 4.67161 6.98261 4.25228 6.3124 4.25228Z" fill="#FFDC41"/>
  </svg>
);

const COPY_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M6.27539 2.3374C6.27539 1.81315 6.27539 1.55103 6.18989 1.34459C6.13335 1.208 6.05045 1.0839 5.94592 0.979372C5.84139 0.874844 5.71729 0.791941 5.5807 0.735402C5.37427 0.649902 5.11214 0.649902 4.58789 0.649902L2.90039 0.649902C1.83952 0.649902 1.30964 0.649902 0.980016 0.979527C0.650391 1.30915 0.650391 1.83903 0.650391 2.8999V4.5874C0.650391 5.11165 0.650391 5.37378 0.735891 5.58022C0.792429 5.7168 0.875332 5.8409 0.97986 5.94543C1.08439 6.04996 1.20849 6.13286 1.34508 6.1894C1.55152 6.2749 1.81364 6.2749 2.33789 6.2749M5.15039 4.0249H8.52539C9.14671 4.0249 9.65039 4.52858 9.65039 5.1499V8.5249C9.65039 9.14622 9.14671 9.6499 8.52539 9.6499H5.15039C4.52907 9.6499 4.02539 9.14622 4.02539 8.5249V5.1499C4.02539 4.52858 4.52907 4.0249 5.15039 4.0249Z" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const ARROW_OUT_ICON = (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
    <path d="M0.699219 6.7002L6.69922 0.700195M1.69922 0.700195H6.69922V5.7002" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EMAIL_ADDRESS = "hesammousavizadeh@gmail.com";

function EmailPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = EMAIL_ADDRESS;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div>
      <div className="contact-preview-inner">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          {LIGHTNING_ICON}
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
              marginBottom: 8, WebkitFontSmoothing: "antialiased",
            }}>
              Available for:
            </div>
            {["Product Design", "UX Audits", "Consulting"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-sans)", fontSize: 13,
                  color: "var(--text-secondary)", letterSpacing: "-0.02em",
                  marginBottom: 4, WebkitFontSmoothing: "antialiased",
                }}
              >
                <span style={{ color: "var(--success-text)", fontWeight: 500 }}>✓</span>
                {item}
              </div>
            ))}
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "-0.02em",
              marginTop: 8, WebkitFontSmoothing: "antialiased",
            }}>
              Usually replies within 24 hours
            </div>
          </div>
        </div>
      </div>

      <hr className="contact-preview-divider" />

      <div className="contact-preview-inner" style={{ display: "flex", gap: 6 }}>
        <button className="email-action-pill" onClick={handleCopy}>
          {COPY_ICON}
          {copied ? "Copied!" : "Copy email"}
        </button>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="email-action-pill"
        >
          {ARROW_OUT_ICON}
          Open in Mail
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `PreviewContent` to final routing**

Replace with:

```tsx
function PreviewContent({ platform }: { platform: Platform }) {
  if (platform === "linkedin") return <LinkedInPreview />;
  if (platform === "x")        return <XPreview />;
  return <EmailPreview />;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/HeroContact.tsx
git commit -m "feat: add Email preview content with copy-to-clipboard"
```

---

## Task 8: Integrate HeroContact into page.tsx

**Files:**
- Modify: `app/page.tsx` — remove lines 116–154 (two `hero-link-line` paragraphs), add `HeroContact`

- [ ] **Step 1: Open app/page.tsx and add the import at the top**

After the existing imports (line ~8), add:

```tsx
import { HeroContact } from "@/components/HeroContact";
```

- [ ] **Step 2: Remove the two hero-link-line paragraphs**

Delete lines 116–154 (both `<p className="hero-link-line">` blocks). Replace them with a single line:

```tsx
          <HeroContact />
```

The hero section should end like:

```tsx
          {/* Tagline */}
          <p
            className="hero-tagline"
            style={{
              color: "var(--text-muted)",
              margin: "0 0 18px 0",
            }}
          >
            Product Designer, Making software feel less like software.
            <br />
            Done it for startups, agencies & myself.
          </p>

          <HeroContact />
        </section>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: No errors.

- [ ] **Step 4: Start dev server and verify in browser**

```bash
npx next dev
```

Open `http://localhost:3000`. Verify:
- The hero shows "Contact me:" label with 3 pills
- Hovering a pill shows the preview card
- Moving between pills swaps content
- Moving mouse away from pills+card closes preview
- Email "Copy email" button copies address and shows "Copied!" for 2 seconds
- Escape key closes preview

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: integrate HeroContact pills into hero section"
```

---

## Task 9: Verify responsive and keyboard behavior

**Files:**
- Verify: `components/HeroContact.tsx`, `app/globals.css`

- [ ] **Step 1: Test mobile layout in browser devtools**

Open devtools → toggle device toolbar → set width to 375px.

Verify:
- The 3 pills still appear on one row (they should since font is 14px and pills are compact)
- Tapping a pill opens the preview card below the pill row (inline, not floating)
- Tapping the same pill closes it
- Tapping another pill switches without closing first

If pills wrap at 375px, reduce pill font size or padding in `.contact-pill` in globals.css:

```css
@media (max-width: 480px) {
  .contact-pill {
    font-size: 13px;
    padding: 5px 9px;
  }
}
```

- [ ] **Step 2: Test keyboard navigation**

Tab to focus each pill. Verify focus ring is visible (2px outline via `.contact-pill:focus-visible`).

Press Enter or Space on a pill — preview should open.

Press Escape — preview should close.

Tab to "Copy email" button inside email preview — press Enter — verify "Copied!" appears.

- [ ] **Step 3: Commit any responsive fixes**

```bash
git add app/globals.css
git commit -m "fix: responsive pill sizing for small screens"
```

(Skip this commit if no changes were needed.)

---

## Self-Review Checklist

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| Pill row: LinkedIn, X, Email | Task 3 |
| Single row, no wrapping | Task 3 (CSS) + Task 9 |
| Active pill: black text + stronger bg | Task 3 (`isActive` inline styles) |
| Inactive pills at ~0.55 opacity | Task 3 (`isDimmed` inline style) |
| One shared preview container | Task 4 |
| Fade + slide 180ms easeOut | Task 4 (`transition`) |
| No bounce/spring/scale | Task 4 (ease: "easeOut", no scale) |
| LinkedIn preview: avatar + name + connections + 3 thumbnails | Task 5 |
| X preview: post text + thumbnail + stats | Task 6 |
| Email preview: checklist + reply time + copy + mailto | Task 7 |
| Card: white bg, border, shadow, 16px radius, 320px wide | Task 2 (CSS) |
| Mobile tap-to-toggle | Task 4 (`handlePillClick`) |
| Escape closes preview | Task 4 (`useEffect`) |
| ARIA: `aria-expanded`, `aria-controls`, `role="region"` | Task 4 |
| Focus-visible matches hover | Task 2 (CSS) |
| No layout shift | Task 4 (`position: absolute`) |
| Image assets from SVG designs | Task 1 |
