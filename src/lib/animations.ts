import type { Variants, Transition } from 'framer-motion'

/** Signature Astratta ease — matches the "Agenciy" motion feel. */
export const EASE: Transition['ease'] = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1,
} as const

/** Fade + rise on scroll into view. Use with `whileInView` + `viewport={{ once: true }}`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

/** Wraps children with a stagger — put on the parent, `fadeUp`/`fadeIn` on children. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

/** Word-by-word headline reveal — pair with an `overflow-hidden` span mask per word. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, ease: EASE },
  },
}

export const wordStagger = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/**
 * Cinematic word reveal for hero-scale, once-per-visit moments: blur clears as
 * the word rises into place. Slower and heavier than `wordReveal` on purpose —
 * reserved for the hero, not routine section headings.
 */
export const wordRevealBlur: Variants = {
  hidden: { opacity: 0, y: '60%', filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
}

/** Same reveal with motion removed — only opacity/blur remain, per prefers-reduced-motion. */
export const wordRevealBlurReduced: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/** Scale-in for cards/media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

/** Standard viewport config for whileInView triggers. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }

/**
 * Manual piecewise-linear interpolation with hard clamping at both ends.
 * Framer Motion's array-form `useTransform(value, stops, outputs)` can hand
 * scroll-linked, multi-stop transforms off to a native WAAPI/ScrollTimeline
 * optimization that does not clamp correctly outside the stop range. Passing
 * this through `useTransform(value, piecewise-callback)` instead forces
 * plain JS evaluation, which clamps exactly as expected.
 */
export function piecewise(p: number, stops: number[], values: number[]): number {
  if (p <= stops[0]) return values[0]
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1]) {
      const t = (p - stops[i]) / (stops[i + 1] - stops[i])
      return values[i] + t * (values[i + 1] - values[i])
    }
  }
  return values[values.length - 1]
}

/** Page transition used by AnimatePresence in the router outlet. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: EASE },
  },
}
