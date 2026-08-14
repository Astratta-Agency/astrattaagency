import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from '@/components/layout/SmoothScroll'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export type TocItem = { id: string; text: string }

type ArticleTocProps = {
  items: TocItem[]
  /** `rail` is the sticky desktop sidebar; `panel` is the mobile dropdown. */
  variant?: 'rail' | 'panel'
  onNavigate?: () => void
}

/**
 * Offset applied when jumping to a heading, so it lands below the fixed nav
 * (~70px) plus the sticky article bar rather than underneath them.
 */
export const TOC_SCROLL_OFFSET = 128

export function ArticleToc({ items, variant = 'rail', onNavigate }: ArticleTocProps) {
  const { dict } = useLanguage()
  const t = dict.blog.post
  const lenis = useLenis()
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  // Scroll-spy. The bottom margin keeps only headings in the upper part of the
  // viewport eligible, so the highlight tracks what's being read rather than
  // whatever happens to be on screen.
  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  function goTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()

    // Lenis owns scrolling app-wide; calling it directly avoids fighting it.
    // Without Lenis (reduced motion) the native jump plus scroll-mt does the job.
    if (lenis) lenis.scrollTo(target, { offset: -TOC_SCROLL_OFFSET })
    else target.scrollIntoView()

    history.replaceState(null, '', `#${id}`)
    setActiveId(id)
    onNavigate?.()
  }

  return (
    <nav aria-label={t.toc} className={variant === 'rail' ? 'sticky top-32' : ''}>
      <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/40">{t.toc}</p>

      <ul className="mt-4 flex flex-col gap-1">
        {items.map((item, i) => {
          const isActive = item.id === activeId
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1], delay: i * 0.04 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(event) => goTo(event, item.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`flex gap-3 rounded-lg py-2 pr-2 text-sm leading-snug transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive ? 'font-bold text-primary' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {/* Fixed-width rule: the active marker changes color only, never layout. */}
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-px w-4 shrink-0 transition-colors duration-200 ease-out ${
                    isActive ? 'bg-primary' : 'bg-ink/20'
                  }`}
                />
                <span>{item.text}</span>
              </a>
            </motion.li>
          )
        })}
      </ul>
    </nav>
  )
}
