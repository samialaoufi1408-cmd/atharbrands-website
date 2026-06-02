# أثر | ATHAR Brands — Official Website

موقع رسمي فاخر لاستوديو **أثر | ATHAR** — استوديو سعودي متخصص في بناء العلامات
التجارية والاستراتيجية البصرية، يخدم المشاريع الطموحة في السعودية والخليج.

الموقع الرسمي: **[atharbrands.com](https://atharbrands.com)**

A production-ready, fully RTL Arabic marketing site that presents the studio,
showcases packages and services, and converts visitors into leads via Supabase
(server-side) **and** WhatsApp.

---

## ✨ Features

- **Full RTL Arabic** UI with a refined, gold-accented luxury design.
- 15 sections: Hero, About, Services, Methodology, Packages, Discovery Quiz,
  Estimate Calculator, Case Studies, Before/After, Industries, Trust, Lead
  Magnet, FAQ, CTA, Contact.
- **5 lead-capture flows** saved to Supabase from the server (service role
  never touches the browser) and forwarded to **WhatsApp** with a tidy message.
- Interactive **discovery quiz** (recommends a package) and **estimate
  calculator** (live price range).
- SEO: metadata, Open Graph image, `sitemap.xml`, `robots.txt`, canonical URL.
- CSS/SVG mockups only — **no external images** — fast and lightweight.
- Accessible, responsive (mobile / tablet / desktop), reduced-motion aware.

## 🧱 Tech Stack

| Area       | Choice                                         |
| ---------- | ---------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript           |
| Styling    | Tailwind CSS v4                                |
| Validation | Zod (shared between client & API)              |
| Database   | Supabase (Postgres) via server-side API routes |
| Fonts      | Reem Kufi · IBM Plex Sans Arabic · Cormorant   |
| Deploy     | Vercel                                         |
| Tooling    | ESLint · Prettier                              |

---

## 🚀 Local development

```bash
# 1) install dependencies
npm install

# 2) create your local env file from the template
cp .env.example .env.local      # PowerShell: Copy-Item .env.example .env.local

# 3) run the dev server  →  http://localhost:3000
npm run dev
```

> The site runs **without** Supabase configured. Forms still validate and open
> WhatsApp; lead storage is enabled once you fill the Supabase variables.

### Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start the dev server       |
| `npm run build`        | Production build           |
| `npm run start`        | Run the production build   |
| `npm run lint`         | ESLint                     |
| `npm run typecheck`    | TypeScript check (no emit) |
| `npm run format`       | Prettier write             |
| `npm run format:check` | Prettier check             |

## 🔐 Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable                        | Where it's used       | Notes                             |
| ------------------------------- | --------------------- | --------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | SEO, sitemap, OG      | `https://atharbrands.com`         |
| `NEXT_PUBLIC_SUPABASE_URL`      | Server API routes     | Supabase → Settings → API         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Reserved / future use | Not used by the browser here      |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Server only**       | Never expose to the client / repo |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | WhatsApp deep links   | Digits only, e.g. `966500000000`  |

`.env.local` is git-ignored. **Never** commit secrets. Only `.env.example`
(placeholders) is tracked.

---

## ✏️ Where to change things

| I want to change…                               | Edit this file                                                                                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **WhatsApp number**                             | `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (+ Vercel). Falls back to `SITE.whatsappNumber` in [`src/lib/constants.ts`](src/lib/constants.ts) |
| **Package prices / contents**                   | [`src/data/packages.ts`](src/data/packages.ts)                                                                                                  |
| **Estimate calculator prices**                  | [`src/data/pricing.ts`](src/data/pricing.ts)                                                                                                    |
| **Contact details** (email, location, taglines) | [`src/lib/constants.ts`](src/lib/constants.ts) → `SITE`                                                                                         |
| **Services list**                               | [`src/data/services.ts`](src/data/services.ts)                                                                                                  |
| **Case studies**                                | [`src/data/caseStudies.ts`](src/data/caseStudies.ts)                                                                                            |
| **Industries**                                  | [`src/data/industries.ts`](src/data/industries.ts)                                                                                              |
| **FAQ**                                         | [`src/data/faqs.ts`](src/data/faqs.ts)                                                                                                          |
| **Methodology steps**                           | [`src/data/methodology.ts`](src/data/methodology.ts)                                                                                            |
| **Brand colors / fonts**                        | [`src/app/globals.css`](src/app/globals.css) (`@theme`) + [`src/app/layout.tsx`](src/app/layout.tsx)                                            |

---

## 📚 Documentation

- [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md) — create the database & keys
- [`docs/VERCEL_SETUP.md`](docs/VERCEL_SETUP.md) — deploy & connect the domain
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — full pre/post-launch checklist
- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) — where everything lives

## 📄 License

© ATHAR Brands 2026. All rights reserved.
