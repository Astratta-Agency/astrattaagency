import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translatePath } from '@/lib/i18n/routes'

/**
 * Drop-in replacement for react-router's <Link> that localizes its target.
 *
 * `to` is always written as the canonical **English** path (`/services/web-development`)
 * — the same form used throughout the codebase and in NAV_LINKS / FOOTER_COLUMNS —
 * and is rewritten to the active language on render. Authors never hand-write
 * `/es/...` paths, so the two language trees cannot drift.
 *
 * Non-string `to` values (location objects) and external/anchor targets pass
 * through untouched.
 */
export function Link({ to, ...props }: LinkProps) {
  const { language } = useLanguage()
  return <RouterLink to={typeof to === 'string' ? translatePath(to, language) : to} {...props} />
}
