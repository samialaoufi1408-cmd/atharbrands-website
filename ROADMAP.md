# ATHR v2 — Development Roadmap

The single source of truth for the athrbrands.sa rebuild. The legacy static site
(`ATHAR.html` + `main.js` + `cms.js` + `admin.html`) is the reference spec; the
rebuild lives in `athr-v2/` (Next.js 14 App Router, TypeScript, Tailwind,
Supabase, Vitest). Every phase ships with tests that prove the behavior works —
the behavioral contract in `athr-v2/contract/` runs against BOTH the legacy
site and the new one, so a green suite means "matches production reality."

**Verification gate for every phase:** `npx vitest run && npx tsc --noEmit && npx next build`
— zero failures, zero type errors, successful build, or the phase is not done.

---

## Phase 0 — Behavioral contract ✅ DONE

| Task | Test that proves it |
|---|---|
| 0.1 Workspace + Vitest/jsdom harness | `vitest run` boots with no config errors |
| 0.2 Contract (`contract/contract.ts`): SPEC + assertions for structure, seal ray counts, counters, lightbox, contact form, Arabic mode | Assertions are executable and typed |
| 0.3 Adapter 1 (`old-site.test.ts`): loads `legacy/ATHAR.html` + `main.js` in jsdom | **5/5 pass on the legacy site** — the contract IS the spec |

## Phase A — Public site rebuild ✅ DONE

| Task | Test that proves it |
|---|---|
| A1 Next 14 + Tailwind tokens, legacy CSS imported verbatim | build succeeds; tokens match legacy `:root` |
| A2 Content dictionaries generated from `cms-config.js` (70 keys EN/AR) | `content.test.ts`: key sets match, services bilingual |
| A3 `Seal` (96+72 rays) + `ProcessIcon` | `Seal.test.tsx`: exact ray/finial counts, unique gradient ids |
| A4 `Reveal` / `Counter` / `Lightbox` / `Parallax` | `fx.test.tsx`: counter reaches target, lightbox lock/unlock semantics |
| A5 `[locale]` layout: RTL, fonts, metadata, JSON-LD | `locale.test.ts`: static params, htmlAttrs, bilingual metadata |
| A6 Nav: scroll state, mobile menu, language switch | `Nav.test.tsx`: anchors, open/close, switch targets |
| A7–A12 All sections (Hero…Journal) | covered by the new-site contract run |
| A13 Contact → `sendEnquiry` server action + `enquiries` migration | `Contact.test.tsx`: submit → confirm → clear → reset |
| A14 Footer | contract structure assertions |
| A15 `lib/cms.ts` + page assembly + **Adapter 2** (`new-site.test.tsx`) | **6/6 contract tests pass on the new site** |
| A16 sitemap / robots / JSON-LD | `seo.test.ts` |
| A17 Assets + final gate + push | 37/37 tests, tsc clean, build OK |
| A18 Arabic glyph-joining fix (`.ar-run` wrapping) | `arabic.test.ts` (7 tests); prerendered `/en` has 62 wrapped runs |

---

## Phase C — Production-parity fixes ✅ DONE

Discovered while auditing the legacy `cms.js`/`admin.js` against Phase A:
the real Supabase tables are `work_items` / `journal_items` (not `work` /
`journal`), and the legacy panel supports three content behaviors v2 lacks.

### C1 — Real CMS schema in `lib/cms.ts` + generated schema file
- Extractor also emits `content/schema.json`: `{group, key, label, multiline, hasAr, selector}`
  per editable key (single source for the admin editor AND size-override styles).
- `fetchCms()` reads `work_items` (`title/title_ar/category/year/image_url`, `created_at` asc)
  and `journal_items` (`title/tag/date_label/excerpt/image_url`, `created_at` asc).
- `Work`/`Journal` sections consume the real row shape; CMS rows REPLACE the
  default grid (legacy behavior); CMS work cards with an image open the lightbox.
- **Tests:** `cms.test.ts` — mocked Supabase returns legacy-shaped rows →
  mapped correctly; any error → silent-fail EMPTY. `schema.json` covers all 70 keys.
  Section tests: CMS rows replace defaults; imageless card falls back to mono seal.

### C2 — Per-key font-size overrides (`key__size`)
- `CmsSizeStyles` server component renders one `<style>` tag mapping each key's
  legacy CSS selector (from schema.json — class names were kept identical) to its
  `font-size` override.
- **Test:** overrides `{hero_sub__size: '1.4rem'}` → style tag contains
  `.hero-sub{font-size:1.4rem}`; no overrides → renders nothing.

### C3 — Philosophy image override (`philosophy_image`)
- When set, `.about-media .frame` gets the image as background (legacy gradient
  overlay) and the seal watermark is hidden.
- **Test:** with override → frame has backgroundImage + watermark absent;
  without → seal watermark rendered.

### C4 — Extra footer lines (`footer_extra_lines` JSON array)
- Footer appends each line as `p.freelance-permit`.
- **Test:** override `'["CR 1010","VAT 300x"]'` → both lines render;
  malformed JSON → silently ignored.

## Phase B — `/admin` control panel ✅ DONE

Same auth + tables as the legacy panel (`admin.js`) so both panels can coexist
during migration. All client-side (Supabase Auth session in browser), Arabic UI
like the legacy panel. `robots.ts` already disallows `/admin`.

### B1 — Auth shell
- `lib/supabase-browser.ts` singleton (NEXT_PUBLIC envs; null-safe when unset).
- `app/admin/layout.tsx` (own root layout) + `app/admin/page.tsx` → `AdminApp`:
  session check on mount, login form (`signInWithPassword`), sign-out, tab bar
  (النصوص / الأعمال / المجلة / الرسائل).
- **Tests:** no session → login form; failed sign-in → error message shown;
  successful sign-in → tabs visible; sign-out → back to login.

### B2 — Texts editor
- Groups + labels + multiline from `content/schema.json`; EN textarea per key,
  AR textarea when the key has an Arabic default; size `<select>` per key;
  philosophy-image upload/remove block; extra-footer-lines repeater.
- Save = one `upsert` on `site_content` with `onConflict: 'key'` including
  `key`, `key__ar`, `key__size`, and `footer_extra_lines` rows (legacy shape).
- **Tests:** groups render from schema; editing EN+AR then saving upserts both
  rows with correct keys; extra lines serialize to a JSON array row.

### B3 — Work CRUD + image upload
- List `work_items` desc; add {title*, title_ar, category, year, image};
  image → `storage.from('work-images').upload('u/<ts>_<name>')` → `getPublicUrl`;
  delete with confirm.
- **Tests:** add without title → blocked; add with fields → `insert` with exact
  row; delete → `delete().eq('id', …)`; upload path used as `image_url`.

### B4 — Journal CRUD
- Same pattern: {title*, tag, date_label, excerpt, image}.
- **Tests:** insert row shape matches `journal_items`; delete works.

### B5 — Enquiries viewer + on-demand revalidate
- Lists `enquiries` newest-first (RLS: authenticated read — A13 migration).
- "تحديث الموقع الآن" button → `POST /api/revalidate` with the session access
  token; route verifies the token via `auth.getUser`, then `revalidatePath`
  for `/en` + `/ar` (beats the 5-min ISR window).
- **Tests:** rows render; route returns 401 without valid token and
  revalidates both locales with one.

### B6 — Migration 002 (idempotent CMS tables)
- `002_cms_tables.sql`: `site_content`, `work_items`, `journal_items`
  (+ RLS: anon read, authenticated write) as `if not exists` — documents the
  production schema and bootstraps fresh environments. Applied manually.

## Phase D — Launch checklist
- [x] Vercel deploy: branch previews now build `athr-v2/` via the builds-API `vercel.json`
      (preview verified READY: /en /ar /admin /api/revalidate). Production on `main`
      switches to v2 automatically when this branch merges.
- [x] Env: `athr-v2/.env.production` points at the production ATHR Supabase project
      (public URL + anon key, same values as legacy cms-config.js).
- [ ] Apply `001_enquiries.sql` (+ `002` if fresh) to Supabase project `wsoomnkzaoglnqjagosc`
      — run in the Supabase dashboard SQL editor (project not reachable from the dev
      environment; the MCP token is scoped to a different, unrelated project).
      Until then the contact form shows "حاول مجدداً" on submit; everything else works.
- [ ] Manual visual pass: ≤720px hamburger, ≤1000px column collapse, reduced-motion, full RTL
- [ ] Lighthouse ≥95 performance & SEO
- [ ] Confirm `hello@athrbrands.sa` with the client (deliberate change from `hello@athar.studio`)

---

## Execution order

```
C1 → C2 → C3 → C4  (public-site parity — contract must stay green)
B1 → B2 → B3 → B4 → B5 → B6  (admin panel)
Final gate: vitest run (all suites) + tsc --noEmit + next build → commit → push
```
