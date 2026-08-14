import { Link } from '@/components/ui/Link'
import { JsonLd } from '@/components/ui/JsonLd'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translatePath } from '@/lib/i18n/routes'

export type Crumb = {
  label: string
  href: string
}

/** Renders "Home / Services / X" with the last item non-clickable, plus inline BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { dict, language } = useLanguage()
  const crumbs: Crumb[] = [{ label: dict.nav.home, href: '/' }, ...items]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `https://${SITE.domain}${translatePath(crumb.href, language)}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      <JsonLd data={breadcrumbSchema} />
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-ink/30">/</span>}
            {isLast ? (
              <span className="font-bold text-ink/60" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.href} className="text-ink/60 transition-colors hover:text-primary">
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
