# Handoff: ATHAR — Luxury Brand Atelier Website

## Overview
ATHAR (أثر — "the mark / impact that remains") is a single-page, dark-luxury marketing website for a brand-identity atelier. The tagline is **"Legacy in Every Impact / إرث في كل أثر."** It is bilingual (English-primary with Arabic accents throughout), fully responsive (one codebase for desktop + mobile), and built around a custom procedurally-drawn brand symbol ("The Seal of Impact").

The page scrolls through: Hero → Brand Statement → Philosophy/About → Services → Conceptual Work (with image lightbox) → Process → Impact stats → Journal → Contact form → Footer.

## About the Design Files
The files in this bundle (`ATHAR.html`, `styles.css`, `main.js`, `assets/`) are **design references created in plain HTML/CSS/JS** — a working prototype that demonstrates the intended look, motion, and behavior. They are **not** meant to be shipped verbatim.

The task is to **recreate this design in the target codebase's existing environment** (e.g. React/Next.js, Vue/Nuxt, Astro, SvelteKit, etc.) using its established conventions, component patterns, and styling approach. If no environment exists yet, choose an appropriate modern framework — given this is a content/marketing site with light interactivity, **Astro or Next.js (App Router) with CSS Modules or Tailwind** are good fits. Port the visual system faithfully; structure the code idiomatically for the chosen stack.

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, motion timing, and interactions are final. Recreate the UI pixel-faithfully. Exact hex values, fonts, and animation parameters are documented below and present in `styles.css` / `main.js`.

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--gold` | `#D4AF7A` | Champagne Gold — primary accent (rules, eyebrows, accents, seal) |
| `--gold-bright` | `#E6C998` | Lighter gold — gradient stop (seal highlight) |
| `--gold-deep` | `#B8945E` | Deeper gold — gradient stop |
| `--ivory` | `#F2EFE6` | Primary text / light surfaces |
| `--charcoal` | `#0F1113` | Page background |
| `--charcoal-2` | `#15181b` | Slightly raised surfaces (hover, frames) |
| `--charcoal-3` | `#1c2024` | Card backgrounds |
| `--taupe` | `#7A6955` | Warm taupe (secondary, rarely used) |
| `--olive` | `#555B50` | Olive gray (secondary, rarely used) |
| `--ink-soft` | `rgba(242,239,230,0.62)` | Secondary body text |
| `--ink-faint` | `rgba(242,239,230,0.40)` | Tertiary text / hints |
| `--line` | `rgba(212,175,122,0.22)` | Gold-tinted hairline borders |
| `--line-soft` | `rgba(242,239,230,0.10)` | Neutral hairline borders / dividers |

Body has a subtle fixed vignette overlay (`body::before`): a radial gold glow from top-center plus a dark radial at the bottom. Pure black `#0a0b0c` is used as the letterbox/stage background in the device-showcase file only.

### Typography
Three families, loaded from Google Fonts:
- **`--font-serif`**: `'Cormorant Garamond'` (weights 300/400/500, plus italics). Used for all headings (`h1/h2/h3`), display type, large quotes, work titles, stat numbers. Light weight (300) for big display, italic + gold for emphasized words.
- **`--font-sans`**: `'Jost'` (weights 300/400/500). Body copy (default weight 300), eyebrows, buttons, nav links, labels.
- **`--font-ar`**: `'Tajawal'` (weights 300/400/500/700). All Arabic text (`direction: rtl`). *(Tajawal is a stand-in for the brand's licensed "DIN Next Arabic" — swap if the real font is licensed.)*

Type patterns:
- **Eyebrow** (`.eyebrow`): Jost 400, 0.74rem, `letter-spacing: 0.42em`, uppercase, gold, with a 34px gradient rule before (and after, if `.center`). Format: `English · العربية`.
- **Display / hero title**: Cormorant 300, `clamp(3.2rem, 9vw, 8rem)`, line-height 0.92, uppercase. Three lines: ivory / `--ink-soft` / gold-italic.
- **Section titles** (`.sect-head .title`, `h2`): Cormorant 300, `clamp(2rem, 4.4vw, 3.6rem)`. Emphasized words wrapped in `<em>` → italic + gold.
- **Body** (`.lede`): Jost 300, `clamp(1.05rem, 1.5vw, 1.28rem)`, color `--ink-soft`, max-width ~54ch.

### Spacing & Layout
- `--maxw: 1320px` — container max width, centered, with `padding-inline: var(--pad)`.
- `--pad: clamp(1.4rem, 5vw, 5.5rem)` — horizontal page padding.
- `--sect: clamp(6rem, 13vh, 11rem)` — vertical section padding (`padding-block`).
- `--ease: cubic-bezier(.22, .61, .36, 1)` — the single shared easing curve for all transitions/animations.

### Borders, radius, shadows
- **No border radius** anywhere — the aesthetic is sharp, ceremonial, seal-like. Buttons, cards, inputs are all square. (The only exceptions: the lightbox close button is a 50% circle, and the seal's internal rings.)
- Borders are 1px hairlines using `--line` (gold-tinted) or `--line-soft` (neutral).
- Shadows are minimal: a gold drop-shadow glow on the hero seal (`drop-shadow(0 0 40px rgba(212,175,122,.18))`); lightbox image `box-shadow: 0 30px 80px rgba(0,0,0,.6)`.

---

## The Brand Symbol — "Seal of Impact"
Drawn **procedurally as inline SVG in `main.js`** (function `buildSeal(withRays)`), not as a static asset. Two variants:
- **`data-seal="full"`** — the complete symbol: a radiating sunburst of **90 rays** (every ray full-length, inner radius 40 → outer radius 86, so the burst is a perfect circle with no gaps; every 12th ray slightly brighter for shimmer), a vertical "spear" axis with diamond finials top & bottom, a central eclipse ring (which rotates clockwise), and side dots. Used in the **nav logo, footer, hero (large, slowly rotating), and the Philosophy frame watermark**.
- **`data-seal="mono"`** — simplified, no rays. Used as faint **watermarks** behind Work/Journal placeholder cards.

Animation: outer ray group rotates 140s/full turn; an inner tick group counter-rotates (90s reverse); the central ring rotates clockwise. All gated behind `prefers-reduced-motion`. SVG viewBox `0 0 240 300`, gradient `#E6C998 → #D4AF7A → #B8945E` top-to-bottom.

Process-step icons (Listen/Distill/Craft/Endure) and Services arrows are also small inline SVGs (see the `icons` map in `main.js`).

---

## Screens / Views (sections, top to bottom)

### 1. Navigation (`.nav`) — fixed top
- **Layout**: fixed, flex space-between, `padding: 1.5rem var(--pad)`. Transparent at top; on scroll past 40px gains `.scrolled` → `rgba(15,17,19,.78)` + `backdrop-filter: blur(14px)`, reduced padding, bottom hairline.
- **Left (brand lockup)**: full seal SVG (38×48px) + `أثر` (Jost 1.45rem) + 1px vertical bar + `ATHAR` (Cormorant 1.35rem, `letter-spacing: .32em`).
- **Right (nav-links)**: Philosophy / Services / Work / Journal / Contact (Jost 0.74rem, `letter-spacing: .24em`, uppercase, `--ink-soft`; hover → ivory with an underline that grows from left). Plus an **Enquire** button (`.btn .nav-cta`).
- **Mobile (≤720px)**: links collapse into a fullscreen overlay panel (`rgba(15,17,19,.97)` + blur) that slides in from the right; a 3-bar hamburger toggle (animates to an X via `.nav.open`).

### 2. Hero (`.hero`) — `min-height: 100svh`
- **Layout**: two-column grid `1.05fr .95fr`, vertically centered, `padding-top: 6rem`. Collapses to one column ≤1000px (seal moves behind copy at 18% opacity).
- **Background layers** (`.hero-bg`, z-0): (a) the lattice pattern (`assets/pattern.svg`, 64px tile, ~5% opacity, radial-masked); (b) a blurred gold radial glow (`.hero-glow`, top-right); (c) an SVG mountain "horizon" silhouette pinned to the bottom 42% (two ridge paths in `#16191c` / `--ridge` gradient, fading up into charcoal).
- **Left column**: eyebrow "The Seal of Impact · ختم الأثر" → hero title in three lines **Legacy / in every / Impact** (line 3 gold italic) → Arabic `إرث في كل أثر` (gold) → sub-paragraph (`.lede`, max 42ch) → actions: a primary `.btn` "Discover More" + a `.link-underline` "Our Philosophy →".
- **Right column**: the large animated full seal (`width: min(46vh, 440px)`, gold drop-shadow glow).
- **Scroll cue** (`.scroll-cue`, bottom-center): "Scroll" label + a 54px vertical rail with a gold tracer animating downward (2.4s loop).
- **Parallax**: on scroll, seal translates Y at 0.12×, glow at 0.06× (JS, disabled for reduced-motion).

### 3. Brand Statement (`.statement`) — centered
- Centered 64px vertical gold gradient rule → large Cormorant quote (`clamp(1.8rem, 4vw, 3.4rem)`, line-height 1.22) with `<em>` words in gold italic ("the *value* we create, the *legacy* that endures") → Arabic sub-line (`--ink-soft`, max 60ch). Container max-width 1100px.

### 4. Philosophy / About (`.about`, `#philosophy`)
- **Layout**: two-column `1fr 1fr`, gap `clamp(2.5rem, 6vw, 6rem)`, vertically centered. One column ≤1000px (media max-width 440px).
- **Left (`.about-media`)**: a `4/5` aspect frame, 1px gold border, charcoal gradient fill, with the lattice pattern at 7% and the **full seal centered as a 64%-width watermark** (opacity 0.6). Four L-shaped gold corner accents (`.corner.tl/.tr/.bl/.br`).
- **Right (`.about-copy`)**: eyebrow "Our Philosophy · فلسفتنا" → `h2` "An atelier built around the *mark that remains*." → two paragraphs (first `.lede`, second `--ink-soft`) → a signature line: 46px rule + `الأثر يبقى` in gold Arabic.

### 5. Services (`.services`, `#services`)
- **Section header** (`.sect-head`): flex space-between, bottom-aligned. Left: eyebrow "What We Do · خدماتنا" + title "The craft of *enduring* identity". Right: a `.meta` paragraph (max 34ch).
- **List** (`.svc-list`): 5 rows (`.svc-row`), each a grid `auto 1fr auto`: number (Cormorant gold, `01`–`05`) | name (Cormorant `clamp(1.5rem,3vw,2.4rem)`) + Arabic sub-label | description (max 38ch) + a `→` arrow that fades in on hover. Each row has a top/bottom hairline; on hover the bottom border animates from center outward to full width, the row gains left padding, and the name turns gold.
  1. Brand Identity & Systems — الهوية البصرية والأنظمة
  2. Strategy & Positioning — الاستراتيجية والتموضع
  3. Naming & Verbal Identity — التسمية والهوية اللفظية
  4. Spatial & Experience — التجربة والمكان
  5. Legacy Stewardship — رعاية الإرث

### 6. Conceptual Work (`.work`, `#work`)
- **Header**: eyebrow "Conceptual Work · أعمال تصورية" + title "Marks that *outlive* markets" + `.meta`.
- **Grid** (`.work-grid`): 2 columns (1 column ≤720px), gap `clamp(1.5rem, 3vw, 2.4rem)`.
- **Cards** (`.work-card`): each is a `16/11` thumb. Three are **placeholders** (charcoal gradient + lattice + faint mono-seal watermark + a "Image · صورة" tag) awaiting real photography. One card (**AURA OUD · أورا عود**) contains a **real image** (`assets/aura-featured.png`, `object-fit: cover`) and is marked `data-lightbox` → **clicking opens the image at full natural size in a lightbox** (see Interactions). On hover: image scales 1.04, and a bottom gradient overlay fades in revealing category (gold uppercase), name (Cormorant) + Arabic sub-name, and year (gold).
  - Cards: AURA OUD (Identity · Packaging, 2025) · Rimal Atelier / أتيليه رمال (Naming · Fragrance, 2025) · Wathiq Capital / واثق كابيتال (Strategy · Investment, 2024) · Dar Al Qimah / دار القيمة (Spatial · Retail, 2024).

### 7. Process (`.process`)
- Full lattice pattern background at 3.5%. Header: eyebrow "How We Work · منهجنا" + "From listening to *legacy*".
- **Grid** (`.proc-grid`): 4 equal columns (2 cols ≤1000px), separated by 1px hairline gaps (grid gap of 1px over a `--line-soft` background). Each step (`.proc-step`): number (gold) → inline SVG icon (46px, gold stroke) → `h3` (Cormorant 1.5rem) → Arabic label (gold) → description (`--ink-soft`). Hover lightens background to `--charcoal-2`.
  1. Listen — الإصغاء · 2. Distill — التقطير · 3. Craft — الصناعة · 4. Endure — البقاء

### 8. Impact band (`.impact`)
- Hairline top & bottom borders. Three centered stats (`.impact-grid`, 3 cols; stacks to 1 col ≤720px with dividers removed). Each: a huge Cormorant gold number (`clamp(3rem, 7vw, 5.5rem)`) that **counts up from 0** when scrolled into view (ease-out cubic, 1.6s), an uppercase label, and an Arabic sub-label. Vertical hairline dividers between items.
  - 14 — Years of Practice — عاماً من الإتقان · 90+ — Legacies Shaped — إرثٌ تمّ تشكيله · 12 — Countries Reached — دولة حول العالم

### 9. Journal (`.journal`, `#journal`)
- Header: eyebrow "The Journal · المجلة" + "Notes on *permanence*" + an "All Writing →" link.
- **Grid** (`.jrn-grid`): 3 columns (1 col ≤1000px, max 480px). Each card: a `5/4` thumb (charcoal gradient + lattice + faint mono-seal watermark) → tags row (gold category + faint date) → `h3` (Cormorant, turns gold on hover) → excerpt. Articles: "The Patina of Permanence" (Craft, May 2026) · "Why Luxury Whispers" (Restraint, Apr 2026) · "The Seal as a Promise" (Heritage, Mar 2026).

### 10. Contact (`.contact`, `#contact`)
- **Layout**: two-column `1fr 1fr`, gap `clamp(3rem, 7vw, 7rem)`, top-aligned. One column ≤1000px.
- **Left (`.contact-lead`)**: eyebrow "Begin a Legacy · لنبدأ أثراً" → `h2` "Let us craft what *endures*." → Arabic line (gold 1.4rem) → `.lede` → detail list (`.contact-detail`): Studio "Riyadh · Dubai", Enquiries "hello@athar.studio", Telephone "+966 11 000 0000" (keys uppercase faint, values Cormorant ivory).
- **Right (`.form`)**: grid of fields with underline-only inputs (transparent bg, 1px bottom `--line-soft`, focus → gold). Row of Name/Email, then Organisation, then a textarea "Your Vision". Submit `.btn` "Send Enquiry". On submit (JS): `preventDefault`, button label → "Message Sent", fields clear, reverts after 3.2s. Labels are bilingual ("Name · الاسم", etc.).

### 11. Footer (`.footer`)
- Lattice at 4%. Top row (`.footer-top`, grid `1.4fr 1fr 1fr`, → 1 col ≤720px): brand block (full seal 74px + `أثر | ATHAR` lockup + description) | "Navigate" link column | "Connect" link column (Instagram/LinkedIn/Behance/email). Bottom row (`.footer-bottom`, flex space-between): "© 2026 ATHAR Studio…" · `إرث في كل أثر` (gold Arabic) · "Legacy in Every Impact".

---

## Interactions & Behavior
All wired in `main.js` (a single IIFE):

1. **Seal/icon injection**: on load, every `[data-seal="full"|"mono"]` and `[data-icon]` element gets its inline SVG injected.
2. **Nav scroll state**: toggle `.scrolled` on `.nav` past 40px scroll.
3. **Mobile menu**: hamburger toggles `.open` on `.nav-links` + `.nav`; closes on any link click.
4. **Scroll reveals**: elements with `.reveal` start at `opacity:0; translateY(28px)` and transition to visible when intersecting (IntersectionObserver, threshold 0.12, rootMargin `-8%` bottom). Stagger via `data-d="1..4"` → transition-delay 0.1–0.4s. Disabled (shown immediately) for `prefers-reduced-motion` and should also be visible for print/no-JS.
5. **Counters**: `[data-count]` numbers animate 0 → target (ease-out cubic, 1.6s) once 50% visible.
6. **Hero parallax**: seal & glow translate on scroll (reduced-motion safe).
7. **Lightbox**: clicking any `[data-lightbox="<src>"]` element opens `#lightbox` (fixed, `rgba(8,9,10,.94)` + blur, `cursor: zoom-out`), injects the src into `#lightbox-img` shown at **full natural size** in a scrollable container; closes on backdrop click, the ✕ button, or Escape; clicks on the image itself don't close. Body scroll locks while open. Keep the `<img>` with **no `src` attribute** until opened (an empty `src=""` triggers a spurious resource load).
8. **Contact form**: fake submit confirmation as described.

### Responsive breakpoints
- **≤1000px**: hero/about/contact → single column; process grid → 2 cols; journal → 1 col; footer → 2 cols.
- **≤720px**: nav → hamburger overlay; work grid → 1 col; impact → 1 col (no dividers); form rows → 1 col; footer → 1 col; section headers stack.

---

## State Management
Minimal — this is a marketing page. State needed if rebuilt in a component framework:
- `navScrolled: boolean` (scroll listener)
- `mobileMenuOpen: boolean`
- `lightbox: { open: boolean, src: string | null }`
- Per-reveal `inView` (IntersectionObserver or a `useInView`-style hook)
- Counter animation progress (run once on first in-view)
- Contact form: field values + a transient `submitted` flag

No data fetching. The contact form is a stub — wire it to the real endpoint/service in the target app.

## Assets
- **`assets/pattern.svg`** — the geometric lattice tile (gold lines + dots on transparent), tiled at 64px and used as a low-opacity texture across hero, about frame, process, work/journal cards, footer. From the brand identity board.
- **`assets/aura-featured.png`** — the AURA OUD project image (~1496×1051), shown as-is in its Work card and at full size in the lightbox. User-provided; do not crop or alter.
- **Fonts** — Google Fonts: Cormorant Garamond, Jost, Tajawal. (Tajawal substitutes for the brand's licensed DIN Next Arabic.)
- The **Seal of Impact** and all icons are procedural inline SVG (no asset files) — see `main.js`.
- There is **no photography yet** for 7 of the cards (Work + Journal); they use elegant placeholders tagged "Image · صورة". Replace with real images when available, applying the same `object-fit: cover` + optional `data-lightbox` pattern as the AURA card.

## Files (in this bundle)
- **`ATHAR.html`** — full page markup (all sections + lightbox container).
- **`styles.css`** — complete stylesheet: tokens, type, components, all sections, reveal system, responsive.
- **`main.js`** — procedural seal/icons + all interactions (nav, reveals, counters, parallax, lightbox, form).
- **`assets/pattern.svg`**, **`assets/aura-featured.png`** — the two real assets.

### Notes for the implementer
- The whole page is **one responsive document** — there is no separate "mobile version"; the same markup adapts via the breakpoints above. (A separate `ATHAR - Mobile & Web.html` device-showcase file exists in the project for presentation only; it is **not** part of the production design.)
- Honor `prefers-reduced-motion` everywhere (rotation, parallax, reveals, counters).
- Keep the sharp, square, hairline-bordered aesthetic — **no rounded corners**, restrained gold-on-charcoal palette, generous negative space.
- All copy is currently placeholder/illustrative for an identity atelier — confirm final copy with the client before launch.
