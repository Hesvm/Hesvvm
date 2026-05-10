# Design Tokens — Hesam Portfolio

Extracted from Figma file `ak1QqOUsXrLGoJivp95FjU`
- Home page node: `7:12`
- Project detail page node: `7:152`

---

## COLORS

| Token | Value | Notes |
|---|---|---|
| Background (body) | `#ffffff` | White |
| Card background | `#f2f3f7` | Light grey-blue |
| Primary text | `#000000` | Black |
| Secondary / muted text | `rgba(0,0,0,0.5)` | Used for tagline on home page |
| Project title text | `#1e2347` | Dark navy |
| Category / subtitle text | `rgba(30,35,71,0.5)` | 50% opacity navy |
| Body text (project page) | `rgba(30,35,71,0.75)` | 75% opacity navy |
| Card year tag text | `#b9b9b9` | Light grey |
| Avatar border / accent | `#2cabff` | Bright blue |
| Social icon pill background | `rgba(212,212,212,0.2)` | Translucent grey |
| Navbar background | `#ffffff` | White with drop-shadow |
| Navbar border | `rgba(217,217,217,0.3)` | Translucent grey |

---

## TYPOGRAPHY

### Fonts

| Usage | Font Family |
|---|---|
| Project titles, card titles, hero name, category tag | `Sh GaramondNr2` (Italic variant for titles/cards; regular for hero name) |
| Tagline, body text, UI text | `SF Pro Display` (Regular) |

**Note:** Card titles and year tags use `Sh_GaramondNr2:Italic`. Hero name (`Hesvm`) uses `Sh_GaramondNr2_Condensed:Regular`.

### Font Sizes

| Element | Size |
|---|---|
| Hero name ("Hesvm") | `32.993px` |
| Tagline | `20px` |
| Card title | `24px` |
| Card year tag | `11.849px` |
| Project page title ("Expert.Med") | `48px` |
| Project page category/subtitle | `18px` |
| Body text (project page) | `18px` |

### Font Weights

| Usage | Weight |
|---|---|
| All text observed | Regular (no bold weights found in extracted nodes) |

### Letter Spacing (tracking)

| Element | Value |
|---|---|
| Hero name | `-0.9898px` (≈ -3% at ~33px) |
| Tagline | `-0.6px` |
| Card title | `-0.72px` (= -3% of 24px) |
| Card year tag | `-0.3555px` |
| Project page title | `-1.44px` (= -3% of 48px) |
| Project page category | `-0.54px` |
| Body text | `-0.54px` |

---

## SPACING & LAYOUT

### Page

| Token | Value | Notes |
|---|---|---|
| Page horizontal padding | ~`64px` each side | Grid container inset: `left-[calc(25%+64px)]` on a centered 880px canvas |
| Grid container width | `727px` | Wrap container for card grid |

### Grid (card grid)

| Token | Value |
|---|---|
| Number of columns | 3 (3 cards per row, wrapping flex) |
| Column gap | `85px` |
| Row gap | `81px` |

### Cards

| Token | Value |
|---|---|
| Card size (square) | `184.622px × 184.622px` |
| Card border radius | `26.661px` |
| Card inner padding | None (card is purely the image box; content below) |
| Space from card bottom to title | `196.25px` from card top (≈ `11.628px` below card) |
| Space from card bottom to year tag | `225.79px` from card top (≈ `41.168px` below card) |

### Avatar (hero section)

| Token | Value |
|---|---|
| Avatar total size (with border) | `77.306px` |
| Avatar inner image size | `66.412px` |
| Avatar border width | `4px` (border-4) |
| Avatar border style | Dashed |
| Avatar border color | `#2cabff` |
| Avatar border radius | `60.206px` (fully rounded) |
| Avatar top position | `116px` from top |
| Hero name top position | `212px` from top |
| Tagline top position | `255px` from top |
| Social icons top position | `300px` from top |

**Derived spacing:**
- Space between avatar and name: `212 - (116 + 77.306) ≈ 18.7px`
- Space between name and tagline: `255 - 212 ≈ 43px` (includes line height of name text)
- Space between tagline and social icons: `300 - 255 ≈ 45px` (includes line height of tagline)

### Social Icon Pills

| Token | Value |
|---|---|
| Pill height | `32px` |
| Pill width | `72–73px` |
| Pill border radius | `23px` |
| Icon size | `18px` |
| Gap between icon and text inside pill | `4px` |
| Gap between pills | `5px` |
| Background | `rgba(212,212,212,0.2)` |

---

## NAVBAR (Floating Pill)

The navbar is a vertical floating pill, rendered rotated 90° in the Figma canvas. Actual orientation on screen is horizontal.

| Token | Value |
|---|---|
| Pill rendered width (= height on screen) | `60.258px` |
| Pill rendered height (= width on screen) | `189.381px` |
| Pill border radius | `49.067px` |
| Padding X (= padding Y on screen) | `21.521px` |
| Padding Y (= padding X on screen) | `20.66px` |
| Gap between icons | `27.546px` |
| Icon size | `30.99px` |
| Number of icons | 3 |
| Background color | `#ffffff` |
| Border | `1px solid rgba(217,217,217,0.3)` |
| Drop shadow | `0px 25.825px 38.522px rgba(130,138,150,0.2)` |
| Vertical position (top from viewport) | `698px` (in the 1024px-tall home page canvas) |

**Note:** The navbar overlaps the card grid area. In production it should be fixed to the bottom of the viewport. Exact bottom distance not specified in file — visually appears ~40–60px from bottom.

---

## PROJECT DETAIL PAGE

| Token | Value |
|---|---|
| Cover image width | `592px` |
| Cover image height | `434px` |
| Cover image border radius | `55px` |
| Cover image background | `#f2f2f2` |
| Cover image top position | `135px` from top |
| Title font | `Sh GaramondNr2 Italic` |
| Title size | `48px` |
| Title color | `#1e2347` |
| Title letter spacing | `-1.44px` |
| Category/subtitle size | `18px` |
| Category/subtitle color | `rgba(30,35,71,0.5)` |
| Category/subtitle letter spacing | `-0.54px` |
| Gap between title and subtitle | `4px` |
| Title + subtitle block top position | `596px` |
| Body text top position | `703.2px` |
| Body text width (max-width) | `592px` (same as cover image width) |
| Body text size | `18px` |
| Body text color | `rgba(30,35,71,0.75)` |
| Body text letter spacing | `-0.54px` |
| Secondary image (full-bleed) height | `434px` |
| Secondary image border radius | `55px` |
| Small image cards height | `260–261px` |
| Small image cards width | `292px` |
| Small image cards border radius | `40.197px` |
| Back button size | `47px` |
| Back button top position | `141.7px` |

---

## SUMMARY NOTES

- **Two font families only:** `Sh GaramondNr2` (display/editorial, italic) + `SF Pro Display` (UI/body)
- **Accent color** `#2cabff` appears only on avatar border
- **No dark mode** tokens present in file
- No design variables were defined in this file (variable_defs returned empty)
- The navbar pill is rendered sideways in Figma (rotated 90°) — treat the width/height accordingly
