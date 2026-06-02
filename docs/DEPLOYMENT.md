# Deployment Guide — أثر | ATHAR

End-to-end steps to take this project from local to live on
**atharbrands.com**, with pre- and post-launch checklists.

---

## Overview

1. Push the code to GitHub.
2. Create the Supabase database → [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md).
3. Import to Vercel + add env vars → [`VERCEL_SETUP.md`](./VERCEL_SETUP.md).
4. Connect the domain & DNS.
5. Verify everything (checklists below).

---

## Push to GitHub

If a remote isn't connected yet:

```bash
# inside the project folder
git add .
git commit -m "Initial professional ATHAR Brands website setup"

# Option A — GitHub CLI (if installed & authenticated)
gh repo create atharbrands-website --private --source=. --remote=origin --push

# Option B — manual: create an empty repo on github.com, then:
git remote add origin https://github.com/<your-username>/atharbrands-website.git
git branch -M main
git push -u origin main
```

> Confirm `.env.local` is **not** in the commit (`git status` should never list
> it — it's git-ignored). Only `.env.example` is tracked.

---

## ✅ Pre-launch checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes with no errors.
- [ ] `.env.local` filled locally; the same vars added in Vercel.
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` is the **real** business number (digits only).
- [ ] `NEXT_PUBLIC_SITE_URL` is `https://atharbrands.com`.
- [ ] Supabase schema ran successfully (5 tables exist, RLS on).
- [ ] Real contact email confirmed in [`src/lib/constants.ts`](../src/lib/constants.ts).
- [ ] Package prices reviewed in [`src/data/packages.ts`](../src/data/packages.ts).
- [ ] Estimate prices reviewed in [`src/data/pricing.ts`](../src/data/pricing.ts).
- [ ] `.env.local` is **not** tracked by Git.

---

## ✅ Post-launch checklist

Test on the **live** domain:

- [ ] Home page loads over HTTPS; `www` redirects to apex (or vice-versa).
- [ ] Header is transparent over the hero, turns solid on scroll.
- [ ] Mobile menu opens/closes; nav links jump to sections.
- [ ] **Contact form** → success message + WhatsApp opens + row in
      `contact_messages`.
- [ ] **Discovery quiz** → recommends a package + row in `discovery_submissions`.
- [ ] **Estimate calculator** → live price range + row in `estimate_requests`.
- [ ] **Package request** modal → row in `package_requests`.
- [ ] **Guide form** → success + row in `newsletter_leads`.
- [ ] WhatsApp messages are well-formatted and go to the right number.
- [ ] Layout looks right on mobile, tablet, and desktop.
- [ ] `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/opengraph-image` all resolve.
- [ ] Share the URL in a chat app → Open Graph preview renders.
- [ ] No errors in the browser console.

---

## Rollback

Vercel keeps every deployment. To roll back: **Deployments → pick a previous
successful deploy → … → Promote to Production**.

## Notes

- The site degrades gracefully: if Supabase env vars are missing, forms still
  validate and open WhatsApp (the lead isn't lost), but rows won't be stored
  until the keys are added and the project is redeployed.
- After changing any environment variable in Vercel, **redeploy** for it to
  take effect.
