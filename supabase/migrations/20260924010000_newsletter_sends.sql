-- Registro de envíos del newsletter por artículo: la restricción única
-- (workspace_id, post_slug) garantiza que un artículo nunca sale dos veces,
-- incluso si alguien pulsa el botón dos veces seguidas.
create table if not exists public.newsletter_sends (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  post_slug text not null,
  status text not null default 'sending' check (status in ('sending', 'sent', 'failed')),
  recipients integer not null default 0,
  error text,
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  unique (workspace_id, post_slug)
);
alter table public.newsletter_sends enable row level security;

-- Bucket público para las imágenes de los correos (los clientes de correo
-- necesitan URLs públicas). Solo la service role escribe.
insert into storage.buckets (id, name, public)
values ('newsletter', 'newsletter', true)
on conflict (id) do nothing;
