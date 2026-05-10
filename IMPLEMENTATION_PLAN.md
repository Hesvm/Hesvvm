# Hesam Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Build a Next.js 15 portfolio with TypeScript, Tailwind, and Framer Motion animations.

**Architecture:** 12 sequential steps: project setup → design tokens → fonts → data layer → components → pages → navbar → pre-build check → GitHub deploy.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, custom SVG icons, self-hosted font.

---

## Task 1: Project Setup

**Files:**
- Create: `/app/layout.tsx`, `/app/page.tsx`
- Create: `/app/projects/[slug]/page.tsx`, `/app/notes/page.tsx`
- Create: `/components/Navbar.tsx`, `/components/ProjectCard.tsx`, `/components/ProjectGrid.tsx`, `/components/PageTransition.tsx`
- Create: `/data/projects.ts`
- Create: `/public/fonts/`, `/public/icons/`, `/public/images/`

- [ ] **Step 1: Create Next.js project**

Run: `npx create-next-app@latest hesam-portfolio --typescript --tailwind --app --eslint --no-git`

- [ ] **Step 2: Install Framer Motion**

Run: `npm install framer-motion`

- [ ] **Step 3: Create folder structure**

Run these commands:
```bash
mkdir -p app/projects/[slug]
mkdir -p app/notes
mkdir -p components
mkdir -p data
mkdir -p public/fonts public/icons public/images
touch app/layout.tsx app/page.tsx
touch app/projects/[slug]/page.tsx app/notes/page.tsx
touch components/Navbar.tsx components/ProjectCard.tsx components/ProjectGrid.tsx components/PageTransition.tsx
touch data/projects.ts
```

- [ ] **Step 4: Commit setup**

```bash
git add -A
git commit -m "init: scaffold project structure"
```

---

## Task 2: Extract Figma Design Tokens

**Files:**
- Reference: Figma home page (node-id=7-12)
- Reference: Figma project detail (node-id=7-152)

- [ ] **Step 1: Open both Figma files**

1. Home page: https://www.figma.com/design/ak1QqOUsXrLGoJivp95FjU/Untitled?node-id=7-12&m=dev
2. Project detail: https://www.figma.com/design/ak1QqOUsXrLGoJivp95FjU/Untitled?node-id=7-152&m=dev

- [ ] **Step 2: Extract colors**

From Figma, find and record:
- Background color (home page)
- Card background color
- Primary text color (dark/light)
- Secondary/muted text color
- Navbar background color
- Any accent colors

- [ ] **Step 3: Extract typography**

Record exact values:
- Serif font family (e.g., "Sh GaramondNr2")
- Sans font (SF Pro Display)
- Font sizes: hero name, tagline, card title, body text
- Font weights used
- Letter spacing if notable

- [ ] **Step 4: Extract spacing & layout**

Record exact values:
- Page horizontal padding
- Grid: columns (3), gap between cards
- Card padding (inner)
- Card border radius
- Avatar size and border style
- Navbar dimensions, positioning, radius
- Cover image border radius

---

## Task 3: Design Tokens & Tailwind Config

**Files:**
- Create: `/app/globals.css`
- Modify: `/tailwind.config.ts`

- [ ] **Step 1: Create globals.css with CSS variables**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors — replace with extracted Figma values */
  --color-bg: #ffffff;
  --color-card: #f5f5f5;
  --color-text-primary: #000000;
  --color-text-muted: #666666;
  --color-navbar-bg: rgba(255, 255, 255, 0.8);
  
  /* Typography */
  --font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  --font-serif: "Sh GaramondNr2", Georgia, serif;
  
  /* Spacing & Border Radius — replace with extracted values */
  --page-padding: 2rem;
  --card-radius: 12px;
  --navbar-radius: 32px;
}

html, body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: Update tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      colors: {
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        'navbar-bg': "var(--color-navbar-bg)",
      },
      borderRadius: {
        card: "var(--card-radius)",
        navbar: "var(--navbar-radius)",
      },
    },
  },
};

export default config;
```

- [ ] **Step 3: Verify in app/layout.tsx**

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hesam",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Commit tokens**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: design tokens and tailwind config"
```

---

## Task 4: Font Setup

**Files:**
- Create: `@font-face` rules in `/app/globals.css`
- Drag into: `/public/fonts/`

- [ ] **Step 1: Place font files in /public/fonts/**

Drag your `.woff2` and `.woff` Sh GaramondNr2 files into `/public/fonts/`.

- [ ] **Step 2: Add @font-face rules to globals.css**

Insert before `:root`:

```css
@font-face {
  font-family: "Sh GaramondNr2";
  src: url("/fonts/ShGaramondNr2-Regular.woff2") format("woff2"),
       url("/fonts/ShGaramondNr2-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sh GaramondNr2";
  src: url("/fonts/ShGaramondNr2-Italic.woff2") format("woff2"),
       url("/fonts/ShGaramondNr2-Italic.woff") format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

(Adjust filenames to match your actual font files.)

- [ ] **Step 3: Verify font loads**

Run: `npm run dev` and check browser console for any 404s in Network tab.

- [ ] **Step 4: Commit fonts**

```bash
git add app/globals.css public/fonts/
git commit -m "feat: self-hosted Sh GaramondNr2 font"
```

---

## Task 5: Data Layer

**Files:**
- Create: `/data/projects.ts`

- [ ] **Step 1: Create projects.ts**

```typescript
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  icon: string;
  description: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "hooshang-ai",
    title: "Hooshang AI",
    category: "AI Product",
    year: "2024",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["AI"],
  },
  {
    slug: "bundles",
    title: "Bundles",
    category: "Productivity",
    year: "2024",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Productivity"],
  },
  {
    slug: "expertmed",
    title: "ExpertMed",
    category: "Science Health",
    year: "2023",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Health"],
  },
  {
    slug: "dastyar",
    title: "Dastyar",
    category: "Assistant",
    year: "2023",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Assistant"],
  },
  {
    slug: "upolo",
    title: "Upolo",
    category: "Social",
    year: "2022",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Social"],
  },
  {
    slug: "cent",
    title: "Cent",
    category: "Finance",
    year: "2025",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Finance"],
  },
  {
    slug: "ap-doni",
    title: "اپ دونی",
    category: "App Store",
    year: "2025",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["App"],
  },
  {
    slug: "paradigm-space",
    title: "Paradigm Space",
    category: "Innovation",
    year: "2022",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Innovation"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Commit data**

```bash
git add data/projects.ts
git commit -m "feat: project data and type definitions"
```

---

## Task 6: Components — PageTransition, ProjectCard, ProjectGrid

**Files:**
- Create: `/components/PageTransition.tsx`
- Create: `/components/ProjectCard.tsx`
- Create: `/components/ProjectGrid.tsx`

- [ ] **Step 1: Create PageTransition.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create ProjectCard.tsx**

```typescript
"use client";

import { Project } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="cursor-pointer rounded-[var(--card-radius)] bg-card p-4 transition-transform duration-200">
          <Image
            src={project.icon}
            alt={project.title}
            width={80}
            height={80}
            className="rounded-[var(--card-radius)] mb-4"
          />
          <h3 className="font-serif italic text-lg font-semibold mb-2">
            {project.title}
          </h3>
          <p className="text-muted text-sm">{project.year}</p>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create ProjectGrid.tsx**

```typescript
"use client";

import { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 4: Commit components**

```bash
git add components/PageTransition.tsx components/ProjectCard.tsx components/ProjectGrid.tsx
git commit -m "feat: core animation and card components"
```

---

## Task 7: Home Page

**Files:**
- Modify: `/app/page.tsx`

- [ ] **Step 1: Update app/page.tsx**

```typescript
"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg px-[var(--page-padding)] py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center mb-24">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary mb-6 overflow-hidden flex items-center justify-center">
            <Image
              src="/images/avatar.jpg"
              alt="Hesam"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="text-4xl font-sans font-semibold mb-2 text-primary">
            Hesam
          </h1>

          {/* Tagline */}
          <p className="text-muted text-lg mb-6">Designer & Developer</p>

          {/* Social Links + Resume */}
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-60 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-60 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.672-5.8 6.672H2.561l7.746-8.973L1.1 2.25h6.772l4.6 6.088 5.25-6.088zM17.15 18.75h1.832L5.928 4.123H4.009l13.141 14.627z" />
              </svg>
            </Link>
            <a
              href="/resume.pdf"
              className="text-primary text-sm hover:opacity-60 transition ml-4"
            >
              Resume ↓
            </a>
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <ProjectGrid projects={projects} />
        </section>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit home page**

```bash
git add app/page.tsx
git commit -m "feat: hero section and project grid on home page"
```

---

## Task 8: Project Detail Page

**Files:**
- Modify: `/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Update projects/[slug]/page.tsx**

```typescript
"use client";

import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-bg px-[var(--page-padding)] py-12">
        {/* Back Button */}
        <Link href="/" className="text-primary hover:opacity-60 transition mb-8 inline-block">
          ← Back
        </Link>

        {/* Cover Image */}
        <div className="mb-12">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={800}
            height={400}
            className="w-full object-cover rounded-[var(--card-radius)]"
          />
        </div>

        {/* Title & Meta */}
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif italic text-5xl font-semibold mb-2">
            {project.title}
          </h1>
          <p className="text-muted text-sm mb-8">{project.category}</p>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-primary leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit project page**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "feat: project detail page with cover and description"
```

---

## Task 9: Navbar Component

**Files:**
- Create: `/components/Navbar.tsx`
- Drag into: `/public/icons/`
- Modify: `/app/layout.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```typescript
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/notes", label: "Notes", icon: "notes" },
];

export function Navbar() {
  const pathname = usePathname();

  const getActive = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/projects")) return 1;
    if (pathname.startsWith("/notes")) return 2;
    return -1;
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-4 px-6 py-4 rounded-navbar bg-navbar-bg backdrop-blur-md shadow-lg"
        layoutId="navbar-pill"
      >
        {navItems.map((item, idx) => {
          const isActive = getActive() === idx;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`w-6 h-6 transition-colors ${
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
                layoutId={isActive ? "navbar-indicator" : undefined}
              >
                <svg
                  className="w-full h-full"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon === "home" && (
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  )}
                  {item.icon === "projects" && (
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  )}
                  {item.icon === "notes" && (
                    <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-1h2v15h-2z" />
                  )}
                </svg>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
```

- [ ] **Step 2: Update app/layout.tsx to include Navbar**

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Hesam",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pb-32">
        {children}
        <Navbar />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit navbar**

```bash
git add components/Navbar.tsx app/layout.tsx
git commit -m "feat: floating navbar with active state"
```

---

## Task 10: Notes Page

**Files:**
- Modify: `/app/notes/page.tsx`

- [ ] **Step 1: Create notes page**

```typescript
"use client";

import { PageTransition } from "@/components/PageTransition";

export default function NotesPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg px-[var(--page-padding)] py-16 flex items-center justify-center">
        <p className="font-serif italic text-2xl text-primary">Writing soon.</p>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit notes page**

```bash
git add app/notes/page.tsx
git commit -m "feat: notes page placeholder"
```

---

## Task 11: Pre-Deployment Build Check

**Files:**
- Reference: All TypeScript/Next.js files

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors or all errors in list are fixed.

- [ ] **Step 2: Run full Next.js build**

Run: `npm run build`
Expected: "✓ Build complete" with zero errors.

- [ ] **Step 3: Fix any errors**

For each error, identify the file and line, then fix it. Common issues:
- Missing imports
- Type mismatches
- Missing `"use client"` on client components

- [ ] **Step 4: Commit build fixes**

```bash
git add -A
git commit -m "fix: build errors resolved"
```

---

## Task 12: GitHub and Vercel Deploy

**Manual steps (outside Claude):**

1. Initialize git repo (if not already done): `git init`
2. Open Source Control in Cursor
3. Stage all files, commit with message: `init: portfolio v1`
4. Publish to GitHub as new repo `hesam-portfolio`
5. Go to vercel.com → New Project → Import from GitHub
6. Select `hesam-portfolio`
7. Deploy (no env vars needed, Next.js auto-detected)

---

**Execution:** Two options:

1. **Subagent-Driven** — I dispatch a fresh subagent per task using superpowers:subagent-driven-development
2. **Inline** — Execute tasks in this session using superpowers:executing-plans

Which approach?
