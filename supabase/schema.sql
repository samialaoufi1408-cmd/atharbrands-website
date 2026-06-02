-- ============================================================
-- أثر | ATHAR Brands — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run.
-- See docs/SUPABASE_SETUP.md for the full walkthrough.
--
-- Security model: Row Level Security is ENABLED on every table and NO
-- public policies are created. The browser never writes directly. All
-- inserts happen server-side in Next.js API routes using the Supabase
-- SERVICE ROLE key, which bypasses RLS. This keeps lead data private.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1) contact_messages — submissions from the contact form
-- ------------------------------------------------------------
create table if not exists public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  company_name text,
  phone        text not null,
  email        text,
  service_type text,
  budget_range text,
  message      text,
  source       text not null default 'website_contact',
  status       text not null default 'new'
    constraint contact_messages_status_check
    check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),
  user_agent   text,
  created_at   timestamptz not null default now()
);

comment on table public.contact_messages is 'ATHAR — contact form submissions (leads).';
comment on column public.contact_messages.status is 'Lead status: new | contacted | qualified | closed | spam.';
comment on column public.contact_messages.source is 'Where the lead originated, e.g. website_contact.';

alter table public.contact_messages enable row level security;

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);
create index if not exists idx_contact_messages_status
  on public.contact_messages (status);

-- ------------------------------------------------------------
-- 2) discovery_submissions — results of the brand discovery quiz
-- ------------------------------------------------------------
create table if not exists public.discovery_submissions (
  id                  uuid primary key default gen_random_uuid(),
  project_type        text not null,
  needed_service      text not null,
  project_stage       text not null,
  budget_range        text not null,
  launch_timeline     text,
  recommended_package text not null,
  full_name           text,
  phone               text,
  email               text,
  created_at          timestamptz not null default now()
);

comment on table public.discovery_submissions is 'ATHAR — discovery quiz answers + recommended package.';

alter table public.discovery_submissions enable row level security;

create index if not exists idx_discovery_submissions_created_at
  on public.discovery_submissions (created_at desc);

-- ------------------------------------------------------------
-- 3) estimate_requests — saved estimate calculator selections
-- ------------------------------------------------------------
create table if not exists public.estimate_requests (
  id               uuid primary key default gen_random_uuid(),
  selected_services jsonb not null,
  min_estimate     numeric not null,
  max_estimate     numeric not null,
  full_name        text,
  phone            text,
  email            text,
  created_at       timestamptz not null default now()
);

comment on table public.estimate_requests is 'ATHAR — price estimate calculator submissions.';
comment on column public.estimate_requests.selected_services is 'JSON array of chosen service labels.';

alter table public.estimate_requests enable row level security;

create index if not exists idx_estimate_requests_created_at
  on public.estimate_requests (created_at desc);

-- ------------------------------------------------------------
-- 4) package_requests — "request this package" submissions
-- ------------------------------------------------------------
create table if not exists public.package_requests (
  id                     uuid primary key default gen_random_uuid(),
  package_name           text not null,
  package_starting_price numeric,
  full_name              text,
  company_name           text,
  phone                  text,
  email                  text,
  message                text,
  created_at             timestamptz not null default now()
);

comment on table public.package_requests is 'ATHAR — package request submissions.';

alter table public.package_requests enable row level security;

create index if not exists idx_package_requests_created_at
  on public.package_requests (created_at desc);

-- ------------------------------------------------------------
-- 5) newsletter_leads — guide download / newsletter sign-ups
-- ------------------------------------------------------------
create table if not exists public.newsletter_leads (
  id          uuid primary key default gen_random_uuid(),
  full_name   text,
  email       text not null,
  phone       text,
  lead_magnet text default 'brand_guide',
  created_at  timestamptz not null default now()
);

comment on table public.newsletter_leads is 'ATHAR — lead magnet / newsletter sign-ups.';

alter table public.newsletter_leads enable row level security;

create index if not exists idx_newsletter_leads_created_at
  on public.newsletter_leads (created_at desc);

-- ============================================================
-- Done. RLS is on with no public policies — only the service
-- role (used server-side) can read/write these tables.
-- ============================================================
