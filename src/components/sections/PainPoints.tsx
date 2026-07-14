import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { clsx } from 'clsx'
import { Container } from '@/components/ui/Container'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const PAIN_POINTS = [
  "You've got traffic, but nobody's leaving their info or buying.",
  "Your site looks like it's from 2015 — or loads so slow people leave before they see it.",
  "You post on social, but it's not producing a single qualified lead.",
  "You switch up your marketing every month because the last thing 'didn't work.'",
]

const STATEMENT = "Most businesses don't have an effort problem. They have a system problem."
const STATEMENT_WORDS = STATEMENT.split(' ')
/** Indices of "system" and "problem." — the second "problem." only; "effort problem." stays neutral. */
const HIGHLIGHT_INDICES = new Set([10, 11])

const CLOSING_LINE =
  "This doesn't get fixed with more ads. It gets fixed with a system that converts."

/** Progress window (0–1 of the pinned scroll) in which the statement finishes revealing. */
const WORD_PHASE_END = 0.45
/** Progress window in which the background/text crossfade from light to dark. */
const BG_START = 0.35
const BG_END = 0.6

const WORD_WINDOWS = STATEMENT_WORDS.map((_, i) => {
  const windowWidth = (WORD_PHASE_END * 2.4) / STATEMENT_WORDS.length
  const start =
    STATEMENT_WORDS.length > 1
      ? (i / (STATEMENT_WORDS.length - 1)) * (WORD_PHASE_END - windowWidth)
      : 0
  return { start: Math.max(0, start), end: Math.max(0, start) + windowWidth }
})

type CardConfig = {
  text: string
  enter: number
  exit: number
  /** Literal, static Tailwind classes (mobile left-[…] md:left-[…]) — kept literal so the JIT scanner picks them up. */
  positionClass: string
}

/**
 * Two waves: cards 1–2 cross during the light phase, cards 3–4 during/after the dark
 * transition. Mobile position is a fixed ±2rem offset from center (not a %), so a 240px
 * card always clears the viewport edge with margin — a %-based left ties the card's
 * distance from center to viewport width, which at 240px wide pushes it off-screen on
 * anything narrower than ~430px. Desktop keeps the wider %-based scatter (safe at those
 * viewport widths, and matches the original spec'd 15/65/40/60 layout).
 */
const CARDS: CardConfig[] = [
  {
    text: PAIN_POINTS[0],
    enter: 0.15,
    exit: 0.5,
    positionClass: 'left-[calc(50%-2rem)] md:left-[15%]',
  },
  {
    text: PAIN_POINTS[1],
    enter: 0.21,
    exit: 0.57,
    positionClass: 'left-[calc(50%+2rem)] md:left-[65%]',
  },
  {
    text: PAIN_POINTS[2],
    enter: 0.5,
    exit: 0.82,
    positionClass: 'left-[calc(50%-2rem)] md:left-[40%]',
  },
  {
    text: PAIN_POINTS[3],
    enter: 0.58,
    exit: 0.9,
    positionClass: 'left-[calc(50%+2rem)] md:left-[60%]',
  },
]

/** Clamped 0–1 progress through [start, end] — plain JS math, no native scroll-timeline shortcuts. */
function clampedT(p: number, start: number, end: number): number {
  if (end <= start) return p >= end ? 1 : 0
  if (p <= start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mixHex(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from)
  const [r2, g2, b2] = hexToRgb(to)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

/** Bottom → top traversal through the pinned viewport, mapped to scroll progress (not time). */
function cardTravelY(p: number, enter: number, exit: number): string {
  const t = clampedT(p, enter, exit)
  return `${100 - t * 200}vh`
}

function PainWord({
  word,
  index,
  highlighted,
  scrollYProgress,
}: {
  word: string
  index: number
  highlighted: boolean
  scrollYProgress: MotionValue<number>
}) {
  const { start, end } = WORD_WINDOWS[index]
  const opacity = useTransform(scrollYProgress, (p) => 0.15 + clampedT(p, start, end) * 0.85)
  const color = useTransform(scrollYProgress, (p) => {
    const t = clampedT(p, BG_START, BG_END)
    return highlighted ? mixHex('#5140f2', '#ff7503', t) : mixHex('#0e0e12', '#eaeaea', t)
  })

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
    </motion.span>
  )
}

function PainCard({ card, scrollYProgress }: { card: CardConfig; scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, (p) => cardTravelY(p, card.enter, card.exit))

  return (
    <motion.li
      style={{ top: '50%', x: '-50%', y }}
      className={clsx(
        'absolute w-[85vw] max-w-[240px] rounded-2xl border border-white/[0.06] bg-[#1e1e1e] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] md:max-w-[300px]',
        card.positionClass,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-base font-bold leading-none text-[#121212]">
        ×
      </span>
      <p className="mt-4 font-sans text-base font-bold leading-snug text-white md:text-[19px]">
        {card.text}
      </p>
    </motion.li>
  )
}

function PainPointsScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const backgroundColor = useTransform(scrollYProgress, (p) =>
    mixHex('#ffffff', '#121212', clampedT(p, BG_START, BG_END)),
  )
  const eyebrowColor = useTransform(scrollYProgress, (p) =>
    mixHex('#5140f2', '#eaeaea', clampedT(p, BG_START, BG_END)),
  )

  return (
    <div ref={containerRef} className="relative h-[300vh] border-t border-ink/10 md:h-[400vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <Container className="relative z-10">
          <div className="mx-auto flex flex-col items-center text-center">
            <motion.span
              style={{ color: eyebrowColor }}
              className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.2em]"
            >
              <span className="h-px w-6 bg-secondary" />
              Sound familiar?
            </motion.span>

            <h2
              aria-label={STATEMENT}
              className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-sans font-extrabold leading-[1.1] tracking-tight"
            >
              <span aria-hidden="true">
                {STATEMENT_WORDS.map((word, i) => (
                  <span key={i}>
                    <PainWord
                      word={word}
                      index={i}
                      highlighted={HIGHLIGHT_INDICES.has(i)}
                      scrollYProgress={scrollYProgress}
                    />
                    {i < STATEMENT_WORDS.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </Container>

        <ul className="absolute inset-0 z-20">
          {CARDS.map((card, i) => (
            <PainCard key={i} card={card} scrollYProgress={scrollYProgress} />
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

function PainPointsStatic() {
  return (
    <section className="border-t border-ink/10 bg-[#121212] py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-[18ch] text-center">
          <span className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#eaeaea]">
            <span className="h-px w-6 bg-secondary" />
            Sound familiar?
          </span>
          <h2
            aria-label={STATEMENT}
            className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-sans font-extrabold leading-[1.1] tracking-tight text-[#eaeaea]"
          >
            <span aria-hidden="true">
              {STATEMENT_WORDS.map((word, i) => (
                <span key={i}>
                  <span className={HIGHLIGHT_INDICES.has(i) ? 'text-secondary' : undefined}>
                    {word}
                  </span>
                  {i < STATEMENT_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <ul className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20">
          {PAIN_POINTS.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-white/[0.06] bg-[#1e1e1e] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-base font-bold leading-none text-[#121212]">
                ×
              </span>
              <p className="mt-4 font-sans text-base font-bold leading-snug text-white md:text-[19px]">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ClosingLine() {
  return (
    <div className="bg-[#121212] py-24 md:py-32">
      <Container>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center font-sans text-2xl font-extrabold tracking-tight text-[#eaeaea] sm:text-3xl"
        >
          {CLOSING_LINE}
        </motion.p>
      </Container>
    </div>
  )
}

/**
 * Pinned, scroll-scrubbed pain-point sequence (Shinta-style): the statement
 * reveals word by word while the background inverts to dark and the 4 pain
 * points float through as cards, bottom to top, in two staggered waves.
 * Falls back to a static dark section with a card grid under
 * prefers-reduced-motion — no pinning, no scrub.
 */
export function PainPoints() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      {reducedMotion ? <PainPointsStatic /> : <PainPointsScroll />}
      <ClosingLine />
    </>
  )
}
