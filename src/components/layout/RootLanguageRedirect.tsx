import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { detectInitialLanguage } from '@/lib/i18n/storage'

/**
 * Sends Spanish-speaking visitors from the bare root to `/es`.
 *
 * Deliberately narrow, for SEO reasons:
 *  - Only fires on "/". A deep URL always renders the language its path says,
 *    so a shared or crawled link never silently changes language.
 *  - Runs client-side only, after mount. The prerendered "/" is English with a
 *    full hreflang block, and "/es" is independently crawlable, so Googlebot
 *    indexes both through the sitemap and the reciprocal alternates rather
 *    than through this redirect.
 *
 * `detectInitialLanguage()` honours a previously chosen language first and
 * falls back to `navigator.language`, so an explicit switch to English is
 * never overridden.
 */
export function RootLanguageRedirect() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/') return
    if (detectInitialLanguage() === 'es') navigate('/es', { replace: true })
  }, [pathname, navigate])

  return null
}
