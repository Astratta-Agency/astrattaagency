import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { piecewise } from '@/lib/animations'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { BrowserMockup } from '@/components/ui/BrowserMockup'
import { CASE_STUDIES, type CaseStudy } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function CardBody({ project }: { project: CaseStudy }) {
  return (
    <>
      <div className="mb-6 flex shrink-0 flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-neutral px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-ink/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/work/${project.slug}`}
        data-cursor="View"
        className="group relative min-h-0 flex-1 block"
      >
        <BrowserMockup url="yourproject.com" fill>
          <div
            className={`absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${project.coverGradient}`}
          >
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={`${project.title} website screenshot`}
                className="h-full w-full object-cover object-top"
              />
            )}
          </div>
        </BrowserMockup>
      </Link>

      <div className="mt-6 flex shrink-0 flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <h3 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          {project.title}
        </h3>
        <span className="shrink-0 font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
          {project.date}
        </span>
      </div>
      <p className="mt-2 shrink-0 max-w-xl text-sm text-ink/60 md:text-base">{project.summary}</p>
    </>
  )
}

/**
 * All cards fill the exact same box, absolutely stacked. `progress` is one
 * shared scroll value for the whole stage, so adjacent cards' enter/exit
 * windows land on the exact same input range and cross over in sync — the
 * current card holds flat and sharp while the previous one tilts backward,
 * rises, and fades, like a card being laid down behind the new one.
 */
function StackedCard({
  project,
  index,
  total,
  progress,
}: {
  project: CaseStudy
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const isLast = index === total - 1
  const isFirst = index === 0
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const center = (n: number) => (n + 0.5) / total
  const ownCenter = center(index)
  const ramp = 0.3 / total

  // 5 stops: hidden (before prev card's turn) → mid-enter → settled → mid-exit → hidden (once next card takes over)
  const stops = [
    clamp(center(index - 1)),
    clamp(ownCenter - ramp),
    clamp(ownCenter),
    clamp(ownCenter + ramp),
    clamp(center(index + 1)),
  ]

  const exitTilt = isLast ? 0 : 16
  const exitY = isLast ? 0 : -70
  const exitScale = isLast ? 1 : 0.9
  const exitBlur = isLast ? 0 : 4
  const exitOpacity = isLast ? 1 : 0.5
  const hiddenOpacity = isLast ? 1 : 0

  const rotateXValues = [-6, -6, 0, exitTilt, exitTilt]
  const yValues = [50, 50, 0, exitY, exitY]
  const scaleValues = [0.95, 0.95, 1, exitScale, exitScale]
  const blurValues = [0, 0, 0, exitBlur, exitBlur]
  const opacityValues = [isFirst ? 1 : 0, isFirst ? 1 : 0.6, 1, exitOpacity, hiddenOpacity]

  const rotateX = useTransform(progress, (p) => piecewise(p, stops, rotateXValues))
  const y = useTransform(progress, (p) => piecewise(p, stops, yValues))
  const scale = useTransform(progress, (p) => piecewise(p, stops, scaleValues))
  const filter = useTransform(progress, (p) => `blur(${piecewise(p, stops, blurValues)}px)`)
  const opacity = useTransform(progress, (p) => piecewise(p, stops, opacityValues))

  return (
    <motion.div
      style={{ zIndex: index, rotateX, y, scale, opacity, filter, transformOrigin: 'center bottom' }}
      className="absolute inset-0 flex flex-col rounded-[2rem] border border-ink/5 bg-white p-6 shadow-2xl shadow-ink/10 md:p-10"
    >
      <CardBody project={project} />
    </motion.div>
  )
}

function StackedWork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const total = CASE_STUDIES.length

  return (
    <div ref={containerRef} className="relative" style={{ height: `${total * 120}vh` }}>
      <div className="sticky top-24 h-[calc(100vh-6rem)] [perspective:1400px] md:top-28 md:h-[calc(100vh-7rem)]">
        <Container className="relative h-full">
          {CASE_STUDIES.map((project, i) => (
            <StackedCard
              key={project.slug}
              project={project}
              index={i}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </Container>
      </div>
    </div>
  )
}

/** Non-sticky fallback for prefers-reduced-motion — a plain vertical list, no pinning or 3D transforms. */
function SimpleWork() {
  return (
    <Container className="flex flex-col gap-10 pb-24 md:pb-32">
      {CASE_STUDIES.map((project) => (
        <div
          key={project.slug}
          className="flex h-[520px] flex-col rounded-[2rem] border border-ink/5 bg-white p-6 shadow-xl shadow-ink/10 md:p-10"
        >
          <CardBody project={project} />
        </div>
      ))}
    </Container>
  )
}

export function FeaturedWork() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="relative border-t border-ink/10 pb-24 pt-24 md:pb-32 md:pt-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-24 md:flex-row md:items-end"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Featured Work</SectionLabel>
            </motion.div>
            <h2 className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <RevealText text="Real projects, real outcomes." />
            </h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 font-sans text-base font-bold text-ink"
            >
              View all work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {reducedMotion ? <SimpleWork /> : <StackedWork />}
    </section>
  )
}
