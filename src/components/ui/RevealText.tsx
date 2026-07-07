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

  const variant = reducedMotion ? wordRevealBlurReduced : blur ? wordRevealBlur : wordReveal
  const effectiveStagger = reducedMotion ? stagger / 2 : stagger

  return (
    <Tag
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
