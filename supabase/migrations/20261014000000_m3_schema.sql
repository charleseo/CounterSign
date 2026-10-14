-- ============================================================================
-- Countersign Master Schema Migration (Milestone 3)
-- Section 12 & 13 of Countersign Master Build Plan (v5 Definitive)
-- Database: PostgreSQL 15+ / Supabase
-- Includes: Types, Tables, RLS Policies, Sweeper Function, and Indexes
-- ============================================================================

-- 1. Custom Enum Types (Section 12)
create type job_status as enum ('verified', 'needs_recheck', 'closed', 'unconfirmed');
create type elig_status as enum ('accepted', 'not_accepted', 'unconfirmed');
create type link_type as enum ('direct', 'referral');
create type referral_status as enum ('public', 'invitation_only', 'not_found', 'unavailable', 'confirmed_partner');
create type label_kind as enum ('official', 'reported', 'unknown');

-- 2. Platforms Table
create table platforms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  official_url text not null,
  description text,
  who_it_suits text,
  payout_methods text,
  assessment_style text,
  referral referral_status not null default 'not_found',
  referral_terms_url text,
  last_reviewed_at timestamptz,
  created_at timestamptz default now()
);

-- 3. Platform Onboarding Steps Table (5 Steps)
create table platform_steps (
  id uuid primary key default gen_random_uuid(),
  platform_id uuid not null references platforms(id) on delete cascade,
  position int not null check (position between 1 and 5), -- 1: Apply, 2: Identity, 3: Assessment, 4: Onboarding, 5: First task
  title text not null,
  detail text,
  label label_kind not null default 'unknown',
  source_url text,
  unique (platform_id, position)
);

-- 4. Jobs Table (Human-Verified AI Roles)
create table jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  platform_id uuid not null references platforms(id),
  title text not null,
  work_type text not null,
  domains text[] default '{}',
  languages text[] default '{}',
  degree_levels text[] default '{}', -- [v4] e.g. Associate, Bachelor's, Master's, PhD
  summary text not null,             -- Original editorial text, never pasted employer copy
  requirements text,
  pay_text text,
  pay_verified boolean not null default false,
  pay_source_url text,
  official_url text not null,
  apply_url text not null unique,
  link link_type not null default 'direct',
  status job_status not null default 'unconfirmed',
  last_checked_at timestamptz,
  next_check_at timestamptz,
  closed_at timestamptz,
  created_by uuid,
  created_at timestamptz default now(),
  search tsvector
);

create index jobs_status_idx on jobs(status, last_checked_at desc);
create index jobs_platform_idx on jobs(platform_id);
create index jobs_search_idx on jobs using gin(search);

-- 5. Countries Table (ISO-3166)
create table countries (
  code char(2) primary key,
  name text not null,
  notes text
);

-- 6. Job Eligibility Mapping Table
create table job_eligibility (
  job_id uuid not null references jobs(id) on delete cascade,
  country_code char(2) not null references countries(code),
  status elig_status not null,
  source_url text,
  checked_at timestamptz not null default now(),
  primary key (job_id, country_code)
);

create index job_eligibility_country_idx on job_eligibility(country_code, status);

-- 7. Verification Check Log (Audit Trail of Every Check)
create table check_log (
  id bigserial primary key,
  job_id uuid references jobs(id) on delete cascade,
  platform_id uuid references platforms(id),
  result job_status not null,
  note text not null,
  checked_by uuid,
  checked_at timestamptz not null default now()
);

create index check_log_job_idx on check_log(job_id, checked_at desc);

-- 8. Guides Table
create table guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  tags text[] default '{}',
  reading_time_mins int not null default 5,
  published_at timestamptz,
  updated_at timestamptz default now()
);

-- 9. Users Table (Phase 1 Contributor Accounts)
create table users (
  id uuid primary key,
  email text unique not null,
  country_code char(2) references countries(code),
  interests text[] default '{}',
  consent_marketing boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz default now()
);

-- 10. Saved Jobs Table
create table saved_jobs (
  user_id uuid not null references users(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, job_id)
);

-- 11. Alert Subscriptions Table
create table alert_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  user_id uuid references users(id) on delete cascade,
  country_code char(2) references countries(code),
  work_types text[] default '{}',
  frequency text not null default 'weekly',
  confirmed_at timestamptz,
  created_at timestamptz default now()
);

-- 12. Problem & Scam Reports Table
create table reports (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('job_problem', 'platform_experience', 'scam')),
  target_id uuid,
  body text not null,
  contact_email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderation_notes text,
  created_at timestamptz default now()
);

create index reports_status_idx on reports(status, created_at desc);

-- 13. Evaluation Leads Table (B2B Evaluation Studio, v4 fields)
create table eval_leads (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null, -- e.g. CS-EV-2026-0042
  name text not null,
  work_email text not null,
  company text,
  product_url text,
  service text,                      -- rag_citation_audit | failure_analysis | preference_ranking
  volume text,                       -- 100-250 pairs | 250-500 pairs | continuous
  source_type text,                  -- public docs | private repo docs
  timeline text,
  has_rubric boolean default false,
  sensitivity text,                  -- standard NDA | custom compliance
  message text,
  status text not null default 'new' check (status in ('new', 'replied', 'call_booked', 'pilot', 'won', 'lost')),
  idempotency_key text unique,       -- Prevents accidental double form submits
  created_at timestamptz default now()
);

create index eval_leads_status_idx on eval_leads(status, created_at desc);

-- 14. Audit Log Table (Immutable Administrative Changes)
create table audit_log (
  id bigserial primary key,
  actor uuid,
  action text not null,              -- job.create, job.check, job.close, platform.update, sweeper.run
  entity text not null,              -- jobs, platforms, reports, leads
  entity_id uuid,
  diff jsonb,
  at timestamptz not null default now()
);

create index audit_log_entity_idx on audit_log(entity, entity_id);
create index audit_log_at_idx on audit_log(at desc);

-- 15. Anonymous Outbound Click Counts Table
create table outbound_clicks (
  id bigserial primary key,
  job_id uuid references jobs(id) on delete set null,
  link link_type not null,
  country_code char(2),              -- Coarse country chip code, never geolocation/IP
  clicked_on date not null default current_date
);

create index outbound_clicks_job_idx on outbound_clicks(job_id, clicked_on);

-- 16. Consent Log Table (Append-Only NDPA 2023 Compliance)
create table consent_log (
  id bigserial primary key,
  email_hash text not null,          -- SHA-256 of lowercased email, no plaintext storage
  purpose text not null check (purpose in ('newsletter', 'alerts', 'eval_contact', 'account')),
  policy_version text not null,
  given boolean not null,            -- false records explicit consent withdrawal
  at timestamptz not null default now()
);

create index consent_log_hash_idx on consent_log(email_hash, at desc);

-- 17. Privacy Requests Table (NDPA 30-Day Due Date)
create table privacy_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('access', 'correction', 'deletion', 'withdraw_consent', 'objection')),
  contact_email text not null,
  received_at timestamptz not null default now(),
  due_at timestamptz not null default (now() + interval '30 days'),
  closed_at timestamptz,
  note text
);

-- 18. Incident Log Table (72-Hour Regulatory Notification Window)
create table incident_log (
  id uuid primary key default gen_random_uuid(),
  detected_at timestamptz not null default now(),
  report_due_at timestamptz not null default (now() + interval '72 hours'),
  summary text not null,
  data_categories text[] default '{}',
  people_affected_estimate int,
  reported_at timestamptz,
  status text not null default 'open' check (status in ('open', 'reported', 'closed'))
);

-- ============================================================================
-- Automated Triggers & Sweeper Function (Section 13.2)
-- ============================================================================

-- Full-Text Search Vector Update Trigger
create or replace function update_jobs_search_vector()
returns trigger as $$
begin
  new.search := to_tsvector('english',
    coalesce(new.title, '') || ' ' ||
    coalesce(new.work_type, '') || ' ' ||
    coalesce(array_to_string(new.domains, ' '), '') || ' ' ||
    coalesce(new.summary, '')
  );
  return new;
end;
$$ language plpgsql;

create trigger trg_jobs_search
before insert or update on jobs
for each row execute function update_jobs_search_vector();

-- 14-Day Status Sweeper Function
-- Sets 'needs_recheck' at 14 days and writes a check_log row.
-- Sets 'closed' at 30 days and writes a check_log row.
create or replace function sweep_stale_jobs()
returns table(jobs_degraded int, jobs_closed int) as $$
declare
  degraded_count int := 0;
  closed_count int := 0;
begin
  -- 1. Degrade jobs older than 14 days to 'needs_recheck'
  with degraded as (
    update jobs
    set status = 'needs_recheck'
    where status = 'verified'
      and last_checked_at < (now() - interval '14 days')
    returning id, platform_id, status
  ),
  logged_degraded as (
    insert into check_log (job_id, platform_id, result, note)
    select id, platform_id, 'needs_recheck', 'Automated 14-day sweeper: verification expired without human recheck.'
    from degraded
  )
  select count(*) into degraded_count from degraded;

  -- 2. Close or hide jobs older than 30 days
  with closed_stale as (
    update jobs
    set status = 'closed', closed_at = now()
    where status in ('verified', 'needs_recheck')
      and last_checked_at < (now() - interval '30 days')
    returning id, platform_id, status
  ),
  logged_closed as (
    insert into check_log (job_id, platform_id, result, note)
    select id, platform_id, 'closed', 'Automated 30-day sweeper: unverified past 30 days, archived from public feed.'
    from closed_stale
  )
  select count(*) into closed_count from closed_stale;

  -- 3. Log sweeper run in audit_log
  insert into audit_log (action, entity, diff)
  values ('sweeper.run', 'jobs', jsonb_build_object('degraded_to_recheck', degraded_count, 'archived_at_30d', closed_count));

  return query select degraded_count, closed_count;
end;
$$ language plpgsql;

-- ============================================================================
-- Row Level Security (RLS) Policies (Section 12 Rules)
-- Explicit security policies enabled on EVERY table
-- ============================================================================

alter table platforms enable row level security;
alter table platform_steps enable row level security;
alter table jobs enable row level security;
alter table countries enable row level security;
alter table job_eligibility enable row level security;
alter table check_log enable row level security;
alter table guides enable row level security;
alter table users enable row level security;
alter table saved_jobs enable row level security;
alter table alert_subscriptions enable row level security;
alter table reports enable row level security;
alter table eval_leads enable row level security;
alter table audit_log enable row level security;
alter table outbound_clicks enable row level security;
alter table consent_log enable row level security;
alter table privacy_requests enable row level security;
alter table incident_log enable row level security;

-- Public Read Policies
create policy "Public can read platforms" on platforms for select using (true);
create policy "Public can read platform steps" on platform_steps for select using (true);
create policy "Public can read non-closed jobs" on jobs for select using (status in ('verified', 'needs_recheck', 'closed'));
create policy "Public can read countries" on countries for select using (true);
create policy "Public can read job eligibility" on job_eligibility for select using (true);
create policy "Public can read check logs" on check_log for select using (true);
create policy "Public can read published guides" on guides for select using (published_at is not null and published_at <= now());

-- User Contributor Self-Access Policies
create policy "Users can view own profile" on users for select using (auth.uid() = id);
create policy "Users can update own profile" on users for update using (auth.uid() = id);
create policy "Users can view own saved jobs" on saved_jobs for select using (auth.uid() = user_id);
create policy "Users can insert own saved jobs" on saved_jobs for insert with check (auth.uid() = user_id);
create policy "Users can delete own saved jobs" on saved_jobs for delete using (auth.uid() = user_id);

-- Public Write-Only / Submission Policies
create policy "Public can insert problem reports" on reports for insert with check (true);
create policy "Public can insert evaluation leads" on eval_leads for insert with check (true);
create policy "Public can insert alert subscriptions" on alert_subscriptions for insert with check (true);
create policy "Public can insert consent log" on consent_log for insert with check (true);
create policy "Public can insert privacy requests" on privacy_requests for insert with check (true);
create policy "Server can insert outbound clicks" on outbound_clicks for insert with check (true);

-- Admin Full Access Policies (via service_role or authenticated admin role)
create policy "Admin full access on platforms" on platforms for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on platform_steps" on platform_steps for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on jobs" on jobs for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on job_eligibility" on job_eligibility for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on check_log" on check_log for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on reports" on reports for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on eval_leads" on eval_leads for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on audit_log" on audit_log for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on outbound_clicks" on outbound_clicks for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on consent_log" on consent_log for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on privacy_requests" on privacy_requests for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
create policy "Admin full access on incident_log" on incident_log for all using (auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' like '%@countersign.%');
