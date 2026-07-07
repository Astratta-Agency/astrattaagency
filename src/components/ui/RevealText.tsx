import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { wordReveal, wordStagger, viewportOnce } from '@/lib/animations'

type RevealTextProps = {
  text: string
  className?: string
  /** Animate immediately on mount instead of on scroll into view (use for the hero). */
  animateOnMount?: boolean
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
  delay = 0,
  stagger = 0.06,
  as = 'span',
}: RevealTextProps) {
  const words = text.split(' ')
  const Tag = motion[as]

  return (
    <Tag
      className={clsx('inline-block', className)}
      variants={wordStagger(stagger, delay)}
      initial="hidden"
      {...(animateOnMount
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: viewportOnce })}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span className="inline-block" variants={wordReveal}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
