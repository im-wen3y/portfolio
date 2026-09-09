-- 이직 지원 트래커. Supabase SQL Editor에서 한 번 실행한다.
-- 접근은 서버(서비스 키)에서만 하므로 RLS를 켜고 정책은 만들지 않는다 (anon 키로는 못 읽는다).

create table if not exists public.job_applications (
	id uuid primary key default gen_random_uuid(),
	company text not null,
	position text,
	company_grade text,
	match_grade text,
	status text not null default '미지원',
	applied_on date,
	resulted_on date,
	note text,
	sort_order integer not null default 0,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

-- 서버(서비스 키)만 접근한다. 기본 권한이 없으면 서비스 키로도 permission denied가 난다.
grant select, insert, update, delete on table public.job_applications to service_role;

create index if not exists job_applications_order_idx
	on public.job_applications (sort_order, created_at);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

drop trigger if exists job_applications_touch on public.job_applications;
create trigger job_applications_touch
	before update on public.job_applications
	for each row execute function public.touch_updated_at();
