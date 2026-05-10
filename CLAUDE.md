# Portfolio — Claude Code Reference

## Fonts
- Sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif
  → System font only. Do NOT import or install.
- Serif: "Sh GaramondNr2" — self-hosted in /public/fonts/
  → Used for project titles (italic) and the Notes placeholder

## Icons
- Navbar icons are custom SVGs inline in components/Navbar.tsx
- Do NOT replace them with Lucide, Phosphor, or any other library under any circumstances

## Data
- All project data lives in /data/projects.ts
- getProject(slug) is the helper for detail pages
- Adding a new project = adding one object to the array, nothing else

## Routing
- / → Home (hero + project grid)
- /projects/[slug] → Project detail
- /notes → Notes shell
- /projects → Projects list shell (empty)

## Animation rules
- Page transitions: PageTransition component wraps every page
- Card stagger: 0.06s per card, y: 40→0, opacity: 0→1
- Navbar active: opacity + color change on active icon
- Never add animation outside of Framer Motion — no raw CSS keyframes

## Design tokens
- All tokens live in /app/globals.css as CSS custom properties
- No tailwind.config.ts (Tailwind v4 uses CSS-based config)
- Figma extraction: /design-tokens-extracted.md

## Deployment
- Vercel (connect hesam-portfolio GitHub repo)
- No environment variables needed
