-- Newsletter: idioma del suscriptor (para bienvenida y envíos futuros) y
-- token de baja único — la baja se resuelve buscando por unsubscribe_token.
alter table public.subscribers
  add column if not exists language text not null default 'en'
  check (language in ('en', 'es'));
create unique index if not exists subscribers_unsubscribe_token_key on public.subscribers (unsubscribe_token);
