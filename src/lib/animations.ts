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
export const viewportOnce = { once: true, margin: '-10% 0px -10% 0px' }

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
