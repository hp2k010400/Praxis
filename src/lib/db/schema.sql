-- Praxis — Consumer Duty Compliance Platform
-- Supabase schema (run in Supabase SQL editor)
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- ENUMS
-- ────────────────────────────────────────────────────────────

create type pricing_plan as enum ('starter', 'professional', 'enterprise');
create type subscription_status as enum ('active', 'past_due', 'canceled', 'trialing', 'incomplete');
create type member_role as enum ('owner', 'admin', 'compliance', 'risk', 'viewer');
create type consumer_duty_outcome as enum ('products_services', 'price_value', 'consumer_understanding', 'consumer_support');
create type product_status as enum ('active', 'under_review', 'withdrawn', 'discontinued');
create type assessment_type as enum ('initial', 'annual_review', 'trigger_review', 'thematic');
create type assessment_status as enum ('draft', 'in_progress', 'pending_review', 'approved', 'overdue');
create type risk_rating as enum ('low', 'medium', 'high', 'critical');
create type action_priority as enum ('low', 'medium', 'high', 'critical');
create type action_status as enum ('open', 'in_progress', 'completed', 'overdue', 'deferred');
create type evidence_type as enum ('policy', 'procedure', 'mi_data', 'customer_feedback', 'audit_report', 'other');

-- ────────────────────────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ────────────────────────────────────────────────────────────

create table public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  email        text not null,
  full_name    text not null default '',
  avatar_url   text,
  job_title    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- ORGANISATIONS (multi-tenant root)
-- ────────────────────────────────────────────────────────────

create table public.organisations (
  id                      uuid primary key default uuid_generate_v4(),
  name                    text not null,
  slug                    text not null unique,
  frn                     text,         -- FCA Firm Reference Number
  regulated_activities    text[] not null default '{}',
  sector                  text,
  plan                    pricing_plan not null default 'starter',
  stripe_customer_id      text unique,
  stripe_subscription_id  text unique,
  subscription_status     subscription_status not null default 'trialing',
  trial_ends_at           timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

alter table public.organisations enable row level security;

-- Members can read their org
create policy "Members can read own org"
  on public.organisations for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = id
      and user_id = auth.uid()
    )
  );

-- Owners/admins can update their org
create policy "Owners and admins can update org"
  on public.organisations for update
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- ────────────────────────────────────────────────────────────
-- ORGANISATION MEMBERS
-- ────────────────────────────────────────────────────────────

create table public.organisation_members (
  id               uuid primary key default uuid_generate_v4(),
  organisation_id  uuid not null references public.organisations(id) on delete cascade,
  user_id          uuid not null references public.profiles(id) on delete cascade,
  role             member_role not null default 'viewer',
  invited_by       uuid references public.profiles(id),
  accepted_at      timestamptz,
  created_at       timestamptz not null default now(),
  unique (organisation_id, user_id)
);

alter table public.organisation_members enable row level security;

create policy "Members can read own memberships"
  on public.organisation_members for select
  using (user_id = auth.uid() or exists (
    select 1 from public.organisation_members m2
    where m2.organisation_id = organisation_id and m2.user_id = auth.uid()
  ));

create policy "Owners and admins can manage members"
  on public.organisation_members for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- Auto-create org and membership when a new user signs up with org_name metadata
create or replace function public.handle_new_org_signup()
returns trigger as $$
declare
  org_id uuid;
  org_slug text;
begin
  if new.raw_user_meta_data->>'org_name' is not null then
    -- Generate a slug from the org name
    org_slug := lower(regexp_replace(new.raw_user_meta_data->>'org_name', '[^a-zA-Z0-9]', '-', 'g'));
    org_slug := regexp_replace(org_slug, '-+', '-', 'g');
    org_slug := trim(both '-' from org_slug);
    -- Append random suffix to ensure uniqueness
    org_slug := org_slug || '-' || substr(md5(random()::text), 1, 6);

    insert into public.organisations (name, slug)
    values (new.raw_user_meta_data->>'org_name', org_slug)
    returning id into org_id;

    insert into public.organisation_members (organisation_id, user_id, role, accepted_at)
    values (org_id, new.id, 'owner', now());
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_org_signup
  after insert on auth.users
  for each row execute function public.handle_new_org_signup();

-- ────────────────────────────────────────────────────────────
-- PRODUCTS
-- ────────────────────────────────────────────────────────────

create table public.products (
  id                              uuid primary key default uuid_generate_v4(),
  organisation_id                 uuid not null references public.organisations(id) on delete cascade,
  name                            text not null,
  description                     text,
  product_type                    text not null,
  target_market                   text,
  distribution_channels           text[] not null default '{}',
  vulnerable_customer_considerations  text,
  status                          product_status not null default 'active',
  created_by                      uuid not null references public.profiles(id),
  created_at                      timestamptz not null default now(),
  updated_at                      timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Org members can read products"
  on public.products for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = products.organisation_id
      and user_id = auth.uid()
    )
  );

create policy "Compliance and above can manage products"
  on public.products for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = products.organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin', 'compliance')
    )
  );

-- ────────────────────────────────────────────────────────────
-- ASSESSMENTS
-- ────────────────────────────────────────────────────────────

create table public.assessments (
  id               uuid primary key default uuid_generate_v4(),
  organisation_id  uuid not null references public.organisations(id) on delete cascade,
  product_id       uuid references public.products(id) on delete set null,
  title            text not null,
  outcome          consumer_duty_outcome not null,
  assessment_type  assessment_type not null default 'annual_review',
  status           assessment_status not null default 'draft',
  risk_rating      risk_rating,
  compliance_score numeric(5,2) check (compliance_score >= 0 and compliance_score <= 100),
  summary          text,
  ai_analysis      jsonb,           -- full Claude output
  questionnaire_responses  jsonb,   -- question -> answer map
  due_date         date,
  completed_at     timestamptz,
  reviewed_by      uuid references public.profiles(id),
  created_by       uuid not null references public.profiles(id),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.assessments enable row level security;

create policy "Org members can read assessments"
  on public.assessments for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = assessments.organisation_id
      and user_id = auth.uid()
    )
  );

create policy "Compliance and above can manage assessments"
  on public.assessments for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = assessments.organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin', 'compliance')
    )
  );

-- ────────────────────────────────────────────────────────────
-- ACTIONS (remediation tasks)
-- ────────────────────────────────────────────────────────────

create table public.actions (
  id               uuid primary key default uuid_generate_v4(),
  organisation_id  uuid not null references public.organisations(id) on delete cascade,
  assessment_id    uuid not null references public.assessments(id) on delete cascade,
  title            text not null,
  description      text,
  owner_id         uuid references public.profiles(id),
  due_date         date,
  priority         action_priority not null default 'medium',
  status           action_status not null default 'open',
  completed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.actions enable row level security;

create policy "Org members can read actions"
  on public.actions for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = actions.organisation_id
      and user_id = auth.uid()
    )
  );

create policy "Risk and above can manage actions"
  on public.actions for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = actions.organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin', 'compliance', 'risk')
    )
  );

-- ────────────────────────────────────────────────────────────
-- EVIDENCE
-- ────────────────────────────────────────────────────────────

create table public.evidence (
  id               uuid primary key default uuid_generate_v4(),
  organisation_id  uuid not null references public.organisations(id) on delete cascade,
  assessment_id    uuid references public.assessments(id) on delete set null,
  action_id        uuid references public.actions(id) on delete set null,
  title            text not null,
  description      text,
  file_url         text,
  file_name        text,
  file_size        integer,
  evidence_type    evidence_type not null default 'other',
  uploaded_by      uuid not null references public.profiles(id),
  created_at       timestamptz not null default now()
);

alter table public.evidence enable row level security;

create policy "Org members can read evidence"
  on public.evidence for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = evidence.organisation_id
      and user_id = auth.uid()
    )
  );

create policy "Compliance and above can manage evidence"
  on public.evidence for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = evidence.organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin', 'compliance')
    )
  );

-- ────────────────────────────────────────────────────────────
-- REPORTS
-- ────────────────────────────────────────────────────────────

create table public.reports (
  id               uuid primary key default uuid_generate_v4(),
  organisation_id  uuid not null references public.organisations(id) on delete cascade,
  title            text not null,
  report_type      text not null, -- 'board_mi' | 'annual' | 'thematic'
  period           text,
  content          text,          -- AI-generated markdown
  status           text not null default 'draft',
  ai_generated     boolean not null default true,
  generated_by     uuid references public.profiles(id),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.reports enable row level security;

create policy "Org members can read reports"
  on public.reports for select
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = reports.organisation_id
      and user_id = auth.uid()
    )
  );

create policy "Compliance and above can manage reports"
  on public.reports for all
  using (
    exists (
      select 1 from public.organisation_members
      where organisation_id = reports.organisation_id
      and user_id = auth.uid()
      and role in ('owner', 'admin', 'compliance')
    )
  );

-- ────────────────────────────────────────────────────────────
-- DASHBOARD STATS VIEW
-- ────────────────────────────────────────────────────────────

create or replace view public.dashboard_stats as
select
  o.id as organisation_id,
  count(distinct p.id) as products_total,
  count(distinct a.id) as assessments_total,
  count(distinct a.id) filter (where a.created_at >= date_trunc('month', now())) as assessments_this_month,
  count(distinct ac.id) filter (where ac.status = 'open') as open_actions,
  count(distinct ac.id) filter (where ac.status = 'overdue' or (ac.due_date < current_date and ac.status not in ('completed', 'deferred'))) as overdue_actions,
  count(distinct ev.id) as evidence_items,
  round(avg(a.compliance_score) filter (where a.status = 'approved'), 1) as avg_compliance_score
from public.organisations o
left join public.products p on p.organisation_id = o.id and p.status != 'discontinued'
left join public.assessments a on a.organisation_id = o.id
left join public.actions ac on ac.organisation_id = o.id
left join public.evidence ev on ev.organisation_id = o.id
group by o.id;

-- ────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_organisations_updated_at before update on public.organisations
  for each row execute function public.set_updated_at();
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();
create trigger set_assessments_updated_at before update on public.assessments
  for each row execute function public.set_updated_at();
create trigger set_actions_updated_at before update on public.actions
  for each row execute function public.set_updated_at();
create trigger set_reports_updated_at before update on public.reports
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- STORAGE BUCKET for evidence files
-- ────────────────────────────────────────────────────────────

-- Run via Supabase Dashboard or API:
-- insert into storage.buckets (id, name, public) values ('evidence', 'evidence', false);
--
-- Storage policies (add via Supabase Dashboard > Storage > Policies):
-- Allow org members to upload: (auth.uid() in (select user_id from organisation_members where ...))
-- Allow org members to read:   same

-- ────────────────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────────────────

create index on public.organisation_members (user_id);
create index on public.organisation_members (organisation_id);
create index on public.products (organisation_id);
create index on public.assessments (organisation_id);
create index on public.assessments (product_id);
create index on public.assessments (outcome);
create index on public.assessments (status);
create index on public.actions (organisation_id);
create index on public.actions (assessment_id);
create index on public.actions (status);
create index on public.actions (due_date);
create index on public.evidence (organisation_id);
create index on public.evidence (assessment_id);
create index on public.reports (organisation_id);
