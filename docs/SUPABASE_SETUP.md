# Supabase Setup — أثر | ATHAR

This project stores leads in Supabase. Writes happen **only on the server**
(Next.js API routes) using the **service role key**, so the browser never has
database access. Follow these steps once.

---

## 1. Create a Supabase project

1. Go to <https://supabase.com> → **New project**.
2. Choose an organization, name it (e.g. `athar-brands`), set a strong database
   password, pick the closest region (e.g. **Middle East / Frankfurt**).
3. Wait for the project to finish provisioning.

## 2. Run the schema

1. In the project, open **SQL Editor** → **New query**.
2. Open [`supabase/schema.sql`](../supabase/schema.sql) from this repo, copy its
   **entire** contents, and paste into the editor.
3. Click **Run**. You should see “Success”. This creates 5 tables with Row Level
   Security enabled:
   - `contact_messages`
   - `discovery_submissions`
   - `estimate_requests`
   - `package_requests`
   - `newsletter_leads`

> RLS is ON and **no public policies** are created. That's intentional — only
> the service role (server-side) can read/write. Do not add an `anon` insert
> policy.

## 3. Get your keys

Go to **Project Settings → API**:

| Value                                              | Env variable                    |
| -------------------------------------------------- | ------------------------------- |
| Project URL                                        | `NEXT_PUBLIC_SUPABASE_URL`      |
| Project API keys → `anon`                          | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Project API keys → `service_role` (click “Reveal”) | `SUPABASE_SERVICE_ROLE_KEY`     |

> ⚠️ The **service_role** key is a secret with full database access. Never put
> it in client code, the README, or Git. It lives only in `.env.local` (local)
> and Vercel Environment Variables (production).

## 4. Add the keys locally

In `.env.local` (copy from `.env.example` if needed):

```bash
NEXT_PUBLIC_SITE_URL=https://atharbrands.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
NEXT_PUBLIC_WHATSAPP_NUMBER=966500000000
```

Restart `npm run dev` after editing env files.

## 5. Add the keys to Vercel

In your Vercel project → **Settings → Environment Variables**, add the same five
variables (Production + Preview). See [`VERCEL_SETUP.md`](./VERCEL_SETUP.md).

## 6. Verify

1. Run the site, submit the **Contact** form.
2. In Supabase → **Table Editor → `contact_messages`**, confirm a new row.
3. Repeat for the discovery quiz, estimate calculator, package request, and
   guide form (→ their respective tables).

### Troubleshooting

- **No row appears, form still “succeeds”** → Supabase env vars are missing or
  wrong. When unconfigured, the API returns `202` so the WhatsApp flow still
  works; add the keys to enable storage.
- **`relation "public.contact_messages" does not exist`** → the schema didn't
  run; re-run `supabase/schema.sql`.
- **`401 / permission denied`** → you're using the anon key where the service
  role key is required; double-check `SUPABASE_SERVICE_ROLE_KEY`.
