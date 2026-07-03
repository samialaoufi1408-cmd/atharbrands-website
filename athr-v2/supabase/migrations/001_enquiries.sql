-- ATHR — enquiries table for public contact form submissions.
-- Anonymous inserts only; reads scoped to authenticated users (the /admin panel).

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  organisation text,
  vision text not null check (char_length(vision) between 1 and 5000),
  locale text not null default 'en'
);

alter table public.enquiries enable row level security;

drop policy if exists "anon can insert enquiries" on public.enquiries;
create policy "anon can insert enquiries"
  on public.enquiries for insert
  to anon
  with check (true);

drop policy if exists "authenticated can read enquiries" on public.enquiries;
create policy "authenticated can read enquiries"
  on public.enquiries for select
  to authenticated
  using (true);
