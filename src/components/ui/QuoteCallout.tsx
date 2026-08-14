import { Link } from '@/components/ui/Link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** Cross-links to the pricing quote tool and bundled packages — reused across every tier page. */
export function QuoteCallout() {
  const { dict } = useLanguage()
  const t = dict.services.shared.quoteCallout

  return (
    <div className="rounded-2xl border border-ink/10 bg-neutral/40 p-6 md:p-8">
      <p className="text-ink/70">
        {t.text}{' '}
        <Link to="/pricing" className="font-bold text-primary">
          {t.quoteLink}
        </Link>{' '}
        {t.or}{' '}
        <Link to="/systems" className="group font-bold text-primary">
          {t.bundlesLink}{' '}
          <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
            →
          </span>
        </Link>
      </p>
    </div>
  )
}
