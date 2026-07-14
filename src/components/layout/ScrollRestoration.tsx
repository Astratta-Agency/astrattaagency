import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/components/layout/SmoothScroll'

/**
 * React Router doesn't reset scroll position on navigation, and Lenis tracks
 * its own virtual scroll target on top of that. Without this, client-side
 * navigation can leave a new page's above-the-fold content scrolled out of
 * the viewport (e.g. landing on /audit while still scrolled to y=3000 from
 * the previous page) — its `whileInView` reveals then never fire because
 * they're correctly reporting "not visible", not because of a timing bug.
 * Resetting on every pathname change guarantees new pages always start at
 * the top, so above-the-fold content is actually in view to be observed.
 */
export function ScrollRestoration() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}
