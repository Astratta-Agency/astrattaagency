import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import {
  wordReveal,
  wordRevealBlur,
  wordRevealBlurReduced,
  wordStagger,
  viewportOnce,
} from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type RevealTextProps = {
  text: string
  className?: string
  /** Animate immediately on mount instead of on scroll into view (use for the hero). */
  animateOnMount?: boolean
  /** Cinematic blur-clear-and-rise reveal — reserved for the hero, not routine headings. */
  blur?: boolean
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const FALLBACK_TIMEOUT_MS = 1500

/**
 * Splits text into words, each masked by an overflow-hidden span, and reveals
 * them with a staggered y-translate + fade — the "Agenciy" headline effect.
 */
export function RevealText({
  text,
  className,
  animateOnMount = false,
  blur = false,
  delay = 0,
  stagger = 0.06,
  as = 'span',
}: RevealTextProps) {
  const words = text.split(' ')
  const Tag = motion[as]
  const reducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [forceVisible, setForceVisible] = useState(false)

  const variant = reducedMotion ? wordRevealBlurReduced : blur ? wordRevealBlur : wordReveal
  const effectiveStagger = reducedMotion ? stagger / 2 : stagger

  /**
   * Safety net: `whileInView` can fail to fire — most commonly right after a
   * client-side route change, if scroll position hasn't settled yet. Content
   * must never stay permanently invisible because of that, so if this element
   * is genuinely on screen 1.5s after mount and still hasn't revealed, snap
   * it visible with no animation rather than leave it hidden.
   */
  useEffect(() => {
    if (animateOnMount) return

    const timer = window.setTimeout(() => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inViewport = rect.bottom > 0 && rect.top < window.innerHeight
      if (inViewport) setForceVisible(true)
    }, FALLBACK_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [animateOnMount])

  // Fallback fired: bypass the animation system entirely and render the
  // final, fully-visible text — an instant snap, not a delayed replay.
  if (forceVisible && !animateOnMount) {
    const PlainTag = as
    return <PlainTag className={clsx('inline-block', className)}>{text}</PlainTag>
  }

  return (
    <Tag
      // `Tag` is resolved at runtime from `as`, so TS can't narrow which
      // specific element ref (HTMLHeadingElement vs HTMLParagraphElement vs
      // HTMLSpanElement) applies — the ref itself only needs getBoundingClientRect.
      ref={ref as React.Ref<never>}
      className={clsx('inline-block', className)}
      variants={wordStagger(effectiveStagger, delay)}
      initial="hidden"
      {...(animateOnMount
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: viewportOnce })}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span className="inline-block" variants={variant}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
