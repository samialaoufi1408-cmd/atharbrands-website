-- ATHR — CMS tables used by the public site and /admin control panel.
-- These tables ALREADY EXIST in the production project (created for the
-- legacy panel); every statement is idempotent so this migration documents
-- the schema and bootstraps fresh environments without touching live data.

create table if not exists public.site_content (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  title_ar text,
  category text,
  year text,
  image_url text
);

create table if not exists public.journal_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  tag text,
  date_label text,
  excerpt text,
  image_url text
);

alter table public.site_content enable row level security;
alter table public.work_items enable row level security;
alter table public.journal_items enable row level security;

-- Public site reads anonymously; only authenticated panel users write.
drop policy if exists "anon can read site_content" on public.site_content;
create policy "anon can read site_content" on public.site_content
  for select to anon using (true);
drop policy if exists "authenticated manage site_content" on public.site_content;
create policy "authenticated manage site_content" on public.site_content
  for all to authenticated using (true) with check (true);

drop policy if exists "anon can read work_items" on public.work_items;
create policy "anon can read work_items" on public.work_items
  for select to anon using (true);
drop policy if exists "authenticated manage work_items" on public.work_items;
create policy "authenticated manage work_items" on public.work_items
  for all to authenticated using (true) with check (true);

drop policy if exists "anon can read journal_items" on public.journal_items;
create policy "anon can read journal_items" on public.journal_items
  for select to anon using (true);
drop policy if exists "authenticated manage journal_items" on public.journal_items;
create policy "authenticated manage journal_items" on public.journal_items
  for all to authenticated using (true) with check (true);

-- Storage: bucket `work-images` must exist with public read +
-- authenticated write (created from the dashboard in the legacy setup).
