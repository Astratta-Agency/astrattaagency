import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Counter } from '@/components/ui/Counter'
import { BrowserMockup } from '@/components/ui/BrowserMockup'
import { CASE_STUDIES, type CaseStudy, type CaseStudyStat } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type ProofSnapshotProps = {
  caseStudySlug?: string
  fallbackNote?: string
  /** Optional illustrative visual (e.g. a coded UI mockup) shown alongside `fallbackNote` when no real case study exists yet — never a real/fabricated screenshot. */
  fallbackVisual?: ReactNode
  /** For visual-first services (e.g. Graphic Design): show the case study's real deliverable gallery below the cover shot, not just the single cover image. */
  showGallery?: boolean
}

/** "292K" → { prefix: '', value: 292, suffix: 'K' }; "3 weeks" or "Yes" → null (rendered as plain text). */
function parseStat(stat: CaseStudyStat): { prefix: string; value: number; suffix: string } | null {
  const match = /^([+\-$]?)(\d+(?:\.\d+)?)([A-Za-z%+]*)$/.exec(stat.value)
  if (!match) return null
  const [, prefix, num, suffix] = match
  return { prefix, value: Number(num), suffix }
}

function ProofStat({ stat }: { stat: CaseStudyStat }) {
  const parsed = parseStat(stat)
  return (
    <motion.div variants={fadeUp}>
      <div className="font-sans text-3xl font-extrabold text-primary md:text-4xl">
        {parsed ? <Counter value={parsed.value} prefix={parsed.prefix} suffix={parsed.suffix} /> : stat.value}
      </div>
      <p className="mt-1 font-sans text-xs font-bold uppercase tracking-wide text-ink/50">{stat.label}</p>
    </motion.div>
  )
}

function ProofWithCaseStudy({
  caseStudy,
  directionalNote,
  showGallery,
}: {
  caseStudy: CaseStudy
  /** Shown as a labeled disclaimer when this case study is from a different service line — directional evidence, not a same-service client result. */
  directionalNote?: string
  /** Render the real deliverable gallery below the cover shot — for visual-first services where a single screenshot undersells the work. */
  showGallery?: boolean
}) {
  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Proof</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            {caseStudy.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-[60ch] text-lg text-ink/70">
            {caseStudy.summary}
          </motion.p>

          {directionalNote && (
            <motion.div
              variants={fadeUp}
              className="mt-6 max-w-2xl rounded-2xl border-2 border-secondary/30 bg-secondary/10 px-6 py-4"
            >
              <p className="text-sm text-ink/80">
                <span className="font-bold text-secondary">Directional proof — </span>
                {directionalNote}
              </p>
            </motion.div>
          )}

          <motion.div
            variants={staggerContainer(0.08)}
            className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {caseStudy.stats.slice(0, 4).map((stat) => (
              <ProofStat key={stat.label} stat={stat} />
            ))}
          </motion.div>

          {caseStudy.extraStats && (
            <motion.div
              variants={staggerContainer(0.1)}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {caseStudy.extraStats.map((platform) => (
                <motion.div
                  key={platform.heading}
                  variants={fadeUp}
                  className="rounded-3xl border border-ink/10 bg-white p-8"
                >
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {platform.heading}
                  </span>
                  <div className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-ink">
                    {platform.headline.value}
                  </div>
                  <p className="mt-1 text-sm text-ink/50">{platform.headline.label}</p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                    {platform.items.slice(0, 3).map((item) => (
                      <div key={item.label}>
                        <p className="text-xs uppercase tracking-wide text-ink/40">{item.label}</p>
                        <p className="mt-1 font-sans text-base font-extrabold text-ink">
                          {item.value}
                          {item.change && (
                            <span
                              className={`ml-1 block text-xs font-bold ${
                                item.change.startsWith('+') ? 'text-primary' : 'text-ink/40'
                              }`}
                            >
                              {item.change}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="mt-14">
            <BrowserMockup url={caseStudy.liveUrl}>
              {caseStudy.coverImage ? (
                <img
                  src={caseStudy.coverImage}
                  alt={`${caseStudy.title} website screenshot`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${caseStudy.coverGradient}`} />
              )}
            </BrowserMockup>
          </motion.div>

          {showGallery && caseStudy.gallery && (
            <motion.div
              variants={staggerContainer(0.08)}
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {caseStudy.gallery.map((src, i) => (
                <motion.div key={src} variants={fadeUp} className="overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt={`${caseStudy.title} deliverable ${i + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {caseStudy.testimonial && (
            <motion.blockquote
              variants={fadeUp}
              className="mt-14 max-w-2xl border-l-2 border-secondary pl-6 font-sans text-2xl font-light italic leading-snug text-ink md:text-3xl"
            >
              “{caseStudy.testimonial.quote}”
              <footer className="mt-6 not-italic">
                <span className="block font-sans text-base font-bold text-ink">
                  {caseStudy.testimonial.name}
                </span>
                <span className="text-sm text-ink/50">{caseStudy.testimonial.role}</span>
              </footer>
            </motion.blockquote>
          )}

          <motion.div variants={fadeUp} className="mt-10">
            <Link
              to={`/work/${caseStudy.slug}`}
              className="group inline-flex items-center gap-2 font-sans text-base font-bold text-primary"
            >
              See the full case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function ProofFallback({ note, visual }: { note: string; visual?: ReactNode }) {
  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>How we prove it</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-ink/10 p-8">
            <p className="text-lg text-ink/70">{note}</p>
          </motion.div>
        </motion.div>

        {visual && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-10 max-w-3xl"
          >
            <BrowserMockup>{visual}</BrowserMockup>
          </motion.div>
        )}
      </Container>
    </section>
  )
}

/**
 * Real proof when a case study exists for this service line; an honest
 * process/guarantee-based fallback (no fabricated stats or screenshots) when
 * it doesn't yet.
 */
export function ProofSnapshot({
  caseStudySlug,
  fallbackNote,
  fallbackVisual,
  showGallery,
}: ProofSnapshotProps) {
  const caseStudy = caseStudySlug ? CASE_STUDIES.find((c) => c.slug === caseStudySlug) : undefined

  if (caseStudy) {
    return <ProofWithCaseStudy caseStudy={caseStudy} directionalNote={fallbackNote} showGallery={showGallery} />
  }
  if (fallbackNote) return <ProofFallback note={fallbackNote} visual={fallbackVisual} />
  return null
}
