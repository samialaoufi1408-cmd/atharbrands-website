# Project Structure — أثر | ATHAR

A map of the codebase so you always know where to look.

```
atharbrands-website/
├─ src/
│  ├─ app/                        # Next.js App Router
│  │  ├─ layout.tsx               # Root layout: fonts, SEO metadata, <html lang=ar dir=rtl>, Header/Footer
│  │  ├─ page.tsx                 # Home page — composes all sections in order
│  │  ├─ globals.css              # Tailwind v4 @theme tokens (brand colors/fonts) + base styles + helpers
│  │  ├─ robots.ts                # /robots.txt
│  │  ├─ sitemap.ts               # /sitemap.xml
│  │  ├─ icon.svg                 # Favicon (gold gateway mark on midnight)
│  │  ├─ opengraph-image.tsx      # Generated social share image (1200×630)
│  │  ├─ not-found.tsx            # 404 page
│  │  ├─ error.tsx                # Error boundary (client)
│  │  ├─ loading.tsx              # Loading state
│  │  └─ api/                     # Server-side lead endpoints (POST JSON → Supabase)
│  │     ├─ contact/route.ts
│  │     ├─ discovery/route.ts
│  │     ├─ estimate/route.ts
│  │     ├─ package-request/route.ts
│  │     └─ newsletter/route.ts
│  │
│  ├─ components/
│  │  ├─ ui/                      # Reusable primitives
│  │  │  ├─ Button.tsx            #   gold / outline / whatsapp variants (button or link)
│  │  │  ├─ Container.tsx         #   max-width wrapper
│  │  │  ├─ Card.tsx              #   surface card (light/dark tone)
│  │  │  ├─ SectionTitle.tsx      #   Latin eyebrow + Arabic heading + description
│  │  │  ├─ Logo.tsx              #   LogoMark (SVG) + wordmark lockup
│  │  │  ├─ Pattern.tsx           #   subtle Arabic geometric lattice (SVG)
│  │  │  ├─ Icon.tsx              #   line-icon registry (currentColor)
│  │  │  ├─ Reveal.tsx            #   scroll-reveal wrapper (client)
│  │  │  ├─ Modal.tsx             #   accessible modal (client)
│  │  │  ├─ FormSuccess.tsx       #   shared success state
│  │  │  ├─ Input.tsx             #   Field shell + text input
│  │  │  ├─ Select.tsx            #   styled select
│  │  │  └─ Textarea.tsx          #   styled textarea
│  │  ├─ layout/
│  │  │  ├─ Header.tsx            #   sticky header, transparent→solid on scroll (client)
│  │  │  ├─ MobileMenu.tsx        #   RTL slide-in drawer (client)
│  │  │  └─ Footer.tsx            #   footer with links, services, contact
│  │  └─ sections/               # One file per page section
│  │     ├─ Hero.tsx
│  │     ├─ About.tsx
│  │     ├─ Services.tsx
│  │     ├─ Methodology.tsx
│  │     ├─ Packages.tsx          #   pricing + request modal (client)
│  │     ├─ DiscoveryQuiz.tsx     #   stepped quiz + lead capture (client)
│  │     ├─ EstimateCalculator.tsx#   live price range + lead capture (client)
│  │     ├─ CaseStudies.tsx       #   CSS-only mockups (signage/card/seal/phone/menu)
│  │     ├─ BeforeAfter.tsx
│  │     ├─ Industries.tsx
│  │     ├─ Trust.tsx
│  │     ├─ LeadMagnet.tsx        #   guide download form (client)
│  │     ├─ Faq.tsx               #   CSS <details> accordion
│  │     ├─ CTA.tsx
│  │     └─ Contact.tsx           #   full contact form (client)
│  │
│  ├─ data/                       # Editable content (no code knowledge needed)
│  │  ├─ services.ts              #   6 services
│  │  ├─ packages.ts              #   3 packages + prices   ← edit package pricing here
│  │  ├─ pricing.ts               #   estimate calculator prices ← edit here
│  │  ├─ methodology.ts           #   5 methodology steps
│  │  ├─ caseStudies.ts           #   5 conceptual works
│  │  ├─ industries.ts            #   8 industries
│  │  └─ faqs.ts                  #   FAQ entries
│  │
│  └─ lib/
│     ├─ constants.ts             # SITE info (name, email, location, WhatsApp), nav, options
│     ├─ utils.ts                 # cn(), number/SAR formatting
│     ├─ whatsapp.ts              # builds WhatsApp deep-link messages per form
│     ├─ forms.ts                 # client fetch helper (postJson)
│     ├─ api.ts                   # shared API route handler (validate → insert)
│     ├─ supabase/
│     │  └─ server.ts             # SERVER-ONLY Supabase admin client (service role)
│     └─ validation/              # Zod schemas (shared by client forms + API)
│        ├─ common.ts             #   phone/email/name helpers
│        ├─ contact.ts
│        ├─ discovery.ts
│        ├─ estimate.ts
│        ├─ packageRequest.ts
│        └─ newsletter.ts
│
├─ supabase/
│  └─ schema.sql                  # All tables, RLS, indexes, constraints
├─ docs/                          # SUPABASE_SETUP · VERCEL_SETUP · DEPLOYMENT · this file
├─ .env.example                   # Env var template (safe to commit)
├─ next.config.ts
└─ README.md
```

## How a form submission flows

```
Client form (section)                Server                       Supabase
─────────────────────                ──────                       ────────
1. validate with Zod schema  ─POST→  2. /api/* route handler
   (src/lib/validation/*)               (src/lib/api.ts)
                                        - re-validate (same schema)
                                        - insert via service role  ─→  table row
3. on success: open WhatsApp  ←──────  returns { ok: true }
   (src/lib/whatsapp.ts)
```

The browser never holds the service role key. Validation runs **twice** (client
for UX, server for trust). If Supabase isn't configured, the API returns `202`
and the WhatsApp step still runs — no lead is lost.

## Design tokens

Brand colors and font families are defined once in
[`src/app/globals.css`](../src/app/globals.css) under `@theme`, then consumed as
Tailwind utilities (`bg-midnight`, `text-gold`, `font-kufi`, …). Fonts are wired
in [`src/app/layout.tsx`](../src/app/layout.tsx) via `next/font`.
