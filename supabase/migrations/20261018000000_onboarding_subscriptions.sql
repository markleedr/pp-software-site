-- Self-serve onboarding: orders, accounts, projects, members, subscriptions.
-- Writes happen only through Edge Functions using the service role. Browser
-- clients get read access to their own account's rows, never write access.

create extension if not exists pgcrypto;

create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.account_members (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  invited_email text not null,
  role text not null check (role in ('owner', 'admin', 'partner', 'sales', 'pp_team')),
  created_at timestamptz not null default now(),
  unique (account_id, invited_email)
);
create index account_members_user_idx on public.account_members(user_id);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  name text not null,
  stage text not null check (stage in ('pre_launch', 'launch', 'selling', 'final_stock')),
  created_at timestamptz not null default now()
);
create index projects_account_idx on public.projects(account_id);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null,
  plan text check (plan in ('self_serve', 'platform', 'done_for_you')),
  project_limit integer check (project_limit > 0),
  -- Stripe status verbatim: trialing, active, past_due, canceled, unpaid, incomplete, incomplete_expired, paused
  status text not null,
  billing text check (billing in ('monthly', 'upfront_block')),
  min_term_months integer,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);
create index subscriptions_account_idx on public.subscriptions(account_id);

create table public.onboarding_orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'paid', 'provisioned', 'expired')),
  tier text not null,
  project_count integer not null check (project_count > 0),
  stage text not null,
  services text[] not null,
  billing text not null,
  quote jsonb not null,
  config_version text not null,
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  first_project_name text not null,
  agreement_html text not null,
  agreement_sha256 text not null,
  signed_name text not null,
  signed_at timestamptz not null default now(),
  signed_ip text,
  signed_user_agent text,
  stripe_checkout_session_id text unique,
  account_id uuid references public.accounts(id),
  project_id uuid references public.projects(id),
  owner_user_id uuid references auth.users(id),
  invited_at timestamptz,
  provision_note text,
  created_at timestamptz not null default now()
);
create index onboarding_orders_email_idx on public.onboarding_orders(contact_email);

-- Webhook idempotency: Stripe retries and may deliver an event twice.
create table public.stripe_events (
  id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

alter table public.accounts enable row level security;
alter table public.account_members enable row level security;
alter table public.projects enable row level security;
alter table public.subscriptions enable row level security;
alter table public.onboarding_orders enable row level security;
alter table public.stripe_events enable row level security;

-- security definer avoids recursive policy evaluation on account_members.
create function public.is_account_member(target_account uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.account_members
    where account_id = target_account and user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_account_member(uuid) from public, anon;
grant execute on function public.is_account_member(uuid) to authenticated;

create policy "members read their account" on public.accounts
  for select to authenticated using (public.is_account_member(id));

create policy "members read their memberships" on public.account_members
  for select to authenticated using (user_id = (select auth.uid()));

create policy "members read their projects" on public.projects
  for select to authenticated using (public.is_account_member(account_id));

create policy "members read their subscriptions" on public.subscriptions
  for select to authenticated using (public.is_account_member(account_id));

-- onboarding_orders and stripe_events: no policies, so only the service role can touch them.
-- (The order holds the signer's IP and the signed agreement.)
