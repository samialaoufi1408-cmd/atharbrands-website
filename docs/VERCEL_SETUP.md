# Vercel Setup & Domain — أثر | ATHAR

Deploy the site to Vercel and connect **atharbrands.com** + **www.atharbrands.com**.

---

## 1. Connect GitHub to Vercel

1. Push this repo to GitHub (see [`DEPLOYMENT.md`](./DEPLOYMENT.md) if it isn't
   pushed yet).
2. Go to <https://vercel.com> → log in with GitHub → **Add New… → Project**.
3. Grant Vercel access to the repository if prompted.

## 2. Import the repository

1. Select the `atharbrands-website` repo → **Import**.
2. Vercel auto-detects **Next.js**. Leave the defaults:
   - Framework Preset: **Next.js**
   - Build Command: `next build` (default)
   - Output: handled automatically
   - Root Directory: `./` (the repo root)

## 3. Add Environment Variables

Before the first deploy, open **Environment Variables** and add (Production +
Preview):

| Name                            | Value                              |
| ------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | `https://atharbrands.com`          |
| `NEXT_PUBLIC_SUPABASE_URL`      | your Supabase project URL          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key             |
| `SUPABASE_SERVICE_ROLE_KEY`     | your Supabase **service role** key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | `966500000000` (replace with real) |

> Keep `SUPABASE_SERVICE_ROLE_KEY` secret. Vercel encrypts env vars; never log
> or expose it.

## 4. Deploy

Click **Deploy**. Vercel builds and gives you a `*.vercel.app` URL. Open it and
sanity-check the site.

## 5. Connect the domain

1. In the project → **Settings → Domains**.
2. Add **`atharbrands.com`** → Add.
3. Add **`www.atharbrands.com`** → Add. Vercel will offer to redirect `www` →
   apex (recommended) or vice-versa — pick one canonical host.

## 6. DNS configuration (at your domain registrar)

Vercel shows the exact records to add. The standard setup is:

| Type    | Name / Host | Value                  |
| ------- | ----------- | ---------------------- |
| `A`     | `@` (apex)  | `76.76.21.21`          |
| `CNAME` | `www`       | `cname.vercel-dns.com` |

Alternatively, change your domain's **nameservers** to Vercel's (shown in the
dashboard) to let Vercel manage DNS automatically.

> DNS can take from a few minutes up to 48 hours to propagate. Vercel's Domains
> page shows a ✓ when each record is verified.

## 7. HTTPS

Vercel **automatically** provisions and renews a free SSL certificate once DNS
verifies. No action needed — `https://atharbrands.com` will be live and HTTP
will auto-redirect to HTTPS.

## 8. Final checks

- Visit `https://atharbrands.com` and `https://www.atharbrands.com` — both load,
  one redirects to the canonical host, padlock shows.
- Submit a form and confirm the row appears in Supabase (see
  [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)).
- `https://atharbrands.com/sitemap.xml` and `/robots.txt` resolve.

### Redeploys

Every push to the connected branch triggers an automatic deploy. Changing env
vars requires a **redeploy** to take effect (Deployments → … → Redeploy).
