-- Punto de partida del envío automático: los artículos publicados antes de
-- activarlo quedan como "ya tratados" (recipients = 0) para que la
-- automatización no los envíe. Solo los artículos nuevos salen por correo.
insert into public.newsletter_sends (workspace_id, post_slug, status, recipients, error, finished_at)
select w.id, s.slug, 'sent', 0, 'baseline: publicado antes de la automatización (no se envió)', now()
from public.workspaces w
cross join (values
  ('traffic-no-leads-dallas'), ('local-seo-checklist-dfw'), ('ai-one-recommendation-dallas'),
  ('missed-calls-lost-jobs-dfw'), ('google-ads-target-overperformance-dallas'), ('med-spa-no-show-leads-dallas'),
  ('social-search-demand-dallas'), ('dormant-client-list-dallas'), ('google-ads-language-targeting-dallas'),
  ('outdated-google-profile-dfw'), ('google-posts-view-counts-dallas'), ('single-platform-dependency-dfw'),
  ('meta-creator-hub-dallas')
) as s(slug)
where w.slug = 'astratta-agency'
on conflict (workspace_id, post_slug) do nothing;
