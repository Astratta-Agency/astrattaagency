import { useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Link } from '@/components/ui/Link'
import { ArticleToc, type TocItem } from '@/components/blog/ArticleToc'
import { ShareRow } from '@/components/blog/ShareRow'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { EASE } from '@/lib/animations'

type StickyArticleBarProps = {
  title: string
  /** Canonical English path of the article, for share links. */
  path: string
  items: TocItem[]
  /** The <article> element, so progress measures the read — not the whole page. */
  target: RefObject<HTMLElement | null>
  /** True once the real headline has scrolled out of view. */
  visible: boolean
}

/**
 * Height of the fixed nav (px). The bar parks directly beneath it while the nav
 * is on screen and slides up to the top once the nav hides.
 */
const NAV_HEIGHT = 72

export function StickyArticleBar({ title, path, items, target, visible }: StickyArticleBarProps) {
  const { dict } = useLanguage()
  const t = dict.blog.post
  const { direction, scrolled } = useScrollDirection()
  const [tocOpen, setTocOpen] = useState(false)

  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })

  // Same condition the nav uses to hide itself (Nav.tsx), so the two never
  // overlap and never leave a gap.
  const navVisible = !(direction === 'down' && scrolled)
  // `scrolled` also guards the entry: Layout animates each page in with a
  // transform, during which useInView briefly reports the headline as offscreen
  // and the bar would flash in at the top of a freshly loaded article.
  const showing = visible && scrolled
  const y = showing ? (navVisible ? NAV_HEIGHT : 0) : -96

  const bar = (
    <motion.div
      animate={{ y }}
      initial={false}
      // Matches the nav's own transition — the two bars move as one system, so
      // syncing them matters more here than a shorter UI-animation duration.
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur-md"
      aria-hidden={!showing}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-6 py-3 md:px-10">
        <Link
          to="/blog"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-ink/50 transition-colors duration-200 hover:text-primary sm:inline-flex"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t.backToBlog}
        </Link>

        <p className="min-w-0 flex-1 truncate font-sans text-sm font-extrabold tracking-tight text-ink">
          {title}
        </p>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setTocOpen((open) => !open)}
            aria-expanded={tocOpen}
            aria-label={t.tocToggle}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-3 text-xs font-bold text-ink/60 transition-[transform,color,border-color] duration-150 ease-out hover:border-ink/25 hover:text-ink active:scale-[0.97] xl:hidden"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h10M4 18h13" />
            </svg>
            <motion.svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              animate={{ rotate: tocOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </button>
        )}

        <div className="hidden shrink-0 md:block">
          <ShareRow path={path} title={title} variant="bar" />
        </div>
      </div>

      {/* Reading progress. Linear easing — it tracks scroll, it isn't an entrance. */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        className="h-0.5 w-full bg-primary"
        role="progressbar"
        aria-label={t.readingProgress}
      />

      {/* Absolutely positioned so opening it animates nothing in the layout. */}
      <AnimatePresence>
        {tocOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute inset-x-0 top-full max-h-[60vh] overflow-y-auto border-b border-ink/10 bg-white px-6 py-5 shadow-lg shadow-ink/5 md:px-10 xl:hidden"
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <ArticleToc items={items} variant="panel" onNavigate={() => setTocOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  // Layout renders pages inside an animated <motion.main>; a transformed
  // ancestor would make this bar's position:fixed resolve against that element
  // instead of the viewport, so it has to live on <body> like the nav does.
  return createPortal(bar, document.body)
}
