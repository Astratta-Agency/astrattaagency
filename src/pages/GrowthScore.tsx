import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Link } from '@/components/ui/Link'
import { LeadCaptureForm } from '@/components/ui/LeadCaptureForm'
import growthScoreImage from '@/assets/pages/growth-score.webp'
import {
  FOUNDATION_COPY,
  INDUSTRY_QUESTION,
  LEAK_COPY,
  LEVEL_RANGE,
  REVENUE_QUESTION,
  SCORE_BANDS,
  SCORED_QUESTIONS,
  TICKET_QUESTION,
} from '@/data/growthScore'
import {
  buildLeadSummary,
  INITIAL_ANSWERS,
  PILLARS,
  PILLAR_MAX,
  QUESTION_POINTS,
  getResult,
  type Answers,
  type PillarId,
} from '@/lib/growthScore'
import { EASE, fadeUp, staggerContainer } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** 3 de perfil + 9 puntuadas. Una por pantalla, como pide el doc. */
const TOTAL_QUESTIONS = 12
const CAPTURE_STEP = TOTAL_QUESTIONS
const RESULT_STEP = TOTAL_QUESTIONS + 1

/**
 * Growth Score — gratis, 12 preguntas, 4 minutos (§9).
 * NO es el diagnóstico de $297: son productos distintos (CLAUDE.md regla 6).
 */
export default function GrowthScore() {
  const { pick, dict } = useLanguage()
  const t = dict.growthScore
  const reducedMotion = usePrefersReducedMotion()

  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS)

  const result = useMemo(() => getResult(answers), [answers])
  // Resumen que viaja con el lead al CRM. `message` es obligatorio para
  // `capture-lead`; `metadata` es lo que hace útil al lead en ventas.
  const leadSummary = useMemo(() => buildLeadSummary(answers, result), [answers, result])

  // Sin desplazamiento cuando se pide movimiento reducido: la barra de progreso
  // y el cambio de pregunta bastan para comunicar el avance.
  const slide = reducedMotion ? 0 : 24
  const variants = {
    initial: { opacity: 0, x: slide },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -slide },
  }

  function choose(next: Partial<Answers>) {
    setAnswers((prev) => ({ ...prev, ...next }))
    setStep((s) => s + 1)
  }

  function chooseScored(id: (typeof SCORED_QUESTIONS)[number]['id'], optionIndex: number) {
    setAnswers((prev) => ({
      ...prev,
      scores: { ...prev.scores, [id]: QUESTION_POINTS[id][optionIndex] },
    }))
    setStep((s) => s + 1)
  }

  const optionClass =
    'w-full rounded-2xl border border-ink/15 px-6 py-5 text-left font-sans text-base text-ink/80 transition-[border-color,background-color,transform] duration-150 ease-out hover:border-primary hover:bg-neutral/40 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-lg'

  if (!started) {
    return (
      <>
        <Seo {...toSeoProps(STATIC_SEO['/growth-score'])} path="/growth-score" />
        <PageHero
          heading={t.heading}
          subtext={t.subtext}
          image={growthScoreImage}
          imageAlt={t.imageAlt}
        >
          <div>
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t.cta}
            </button>
            <p className="mt-4 text-sm text-ink/50">{t.micro}</p>
          </div>
        </PageHero>
      </>
    )
  }

  const shownStep = Math.min(step + 1, TOTAL_QUESTIONS)

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/growth-score'])} path="/growth-score" />

      <section className="bg-white pb-24 pt-40 md:pb-32 md:pt-48">
        <Container>
          <div className="mx-auto max-w-2xl">
            {step <= CAPTURE_STEP && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-primary">
                    {step < TOTAL_QUESTIONS ? t.stepLabel(shownStep, TOTAL_QUESTIONS) : t.captureHeading}
                  </p>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="rounded-full px-3 py-1 font-sans text-sm font-bold text-ink/50 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      ← {t.back}
                    </button>
                  )}
                </div>

                <div
                  className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink/10"
                  role="progressbar"
                  aria-label={t.progressLabel}
                  aria-valuenow={Math.min(step, TOTAL_QUESTIONS)}
                  aria-valuemin={0}
                  aria-valuemax={TOTAL_QUESTIONS}
                >
                  <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ scaleX: Math.min(step, TOTAL_QUESTIONS) / TOTAL_QUESTIONS }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </div>
              </>
            )}

            <AnimatePresence mode="wait">
              {/* --- Perfil: industria, facturación, ticket (no puntúan) --- */}
              {step < 3 && (
                <motion.div
                  key={`profile-${step}`}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: EASE }}
                  className="mt-10"
                >
                  {[INDUSTRY_QUESTION, REVENUE_QUESTION, TICKET_QUESTION].map((q, i) =>
                    i === step ? (
                      <div key={q.key}>
                        <h1 className="font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                          {pick(q.question)}
                        </h1>
                        <div className="mt-8 flex flex-col gap-3">
                          {q.options.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => choose({ [q.key]: option.id } as Partial<Answers>)}
                              className={optionClass}
                            >
                              {pick(option.label)}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null,
                  )}
                </motion.div>
              )}

              {/* --- Las 9 preguntas puntuadas --- */}
              {step >= 3 && step < TOTAL_QUESTIONS && (
                <motion.div
                  key={`scored-${step}`}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: EASE }}
                  className="mt-10"
                >
                  {(() => {
                    const q = SCORED_QUESTIONS[step - 3]
                    return (
                      <>
                        <h1 className="font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                          {pick(q.question)}
                        </h1>
                        <div className="mt-8 flex flex-col gap-3">
                          {q.options.map((option, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => chooseScored(q.id, i)}
                              className={optionClass}
                            >
                              {pick(option)}
                            </button>
                          ))}
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              )}

              {/* --- Captura de contacto antes del resultado --- */}
              {step === CAPTURE_STEP && (
                <motion.div
                  key="capture"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: EASE }}
                  className="mt-10"
                >
                  <h1 className="font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                    {t.captureSubtext}
                  </h1>
                  <p className="mt-4 text-ink/60">{t.captureMicro}</p>
                  <div className="mt-8">
                    <LeadCaptureForm
                      submitLabel={t.submitLabel}
                      source="growth-score"
                      message={leadSummary.message}
                      metadata={leadSummary.metadata}
                      onSubmitted={() => setStep(RESULT_STEP)}
                    />
                  </div>
                </motion.div>
              )}

              {/* --- Resultado --- */}
              {step === RESULT_STEP && (
                <motion.div
                  key="result"
                  initial="hidden"
                  animate="show"
                  variants={staggerContainer(0.08)}
                  className="mt-4"
                >
                  <motion.p variants={fadeUp} className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-primary">
                    {t.resultTitle}
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    className="mt-3 font-sans text-6xl font-extrabold tracking-tight sm:text-7xl"
                  >
                    {result.total}
                    <span className="text-3xl text-ink/30"> / 100</span>
                  </motion.p>
                  <motion.p variants={fadeUp} className="mt-4 text-lg text-ink/70">
                    {t.stageLabel(result.level.toUpperCase())}
                  </motion.p>
                  <motion.p variants={fadeUp} className="mt-2 max-w-xl text-ink/60">
                    {pick(SCORE_BANDS[result.band])}
                  </motion.p>

                  {/* Cinco barras, una por pilar */}
                  <motion.ul variants={staggerContainer(0.06)} className="mt-10 flex flex-col gap-4">
                    {PILLARS.map((pillar: PillarId) => (
                      <motion.li key={pillar} variants={fadeUp}>
                        <div className="flex items-baseline justify-between font-sans text-sm font-bold">
                          <span className="text-ink/70">{t.pillarNames[pillar]}</span>
                          <span className="text-ink/40">
                            {result.pillars[pillar]}/{PILLAR_MAX}
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                          <motion.div
                            className={`h-full rounded-full ${
                              result.leaks.includes(pillar) ? 'bg-secondary' : 'bg-primary'
                            }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: result.pillars[pillar] / PILLAR_MAX }}
                            style={{ transformOrigin: 'left' }}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                          />
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div variants={fadeUp} className="mt-12">
                    <h2 className="font-sans text-xl font-extrabold tracking-tight">{t.leaksHeading}</h2>
                    <ol className="mt-4 flex flex-col gap-3">
                      {result.leaks.map((pillar, i) => (
                        <li key={pillar} className="flex gap-4 border-t border-ink/10 pt-3">
                          <span className="font-sans font-bold text-secondary">{i + 1}</span>
                          <span className="text-ink/75">{pick(LEAK_COPY[pillar])}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>

                  {result.foundation && (
                    <motion.div variants={fadeUp} className="mt-10 rounded-3xl bg-neutral/50 p-8">
                      <p className="text-ink/70">{t.foundationHeading}</p>
                      <p className="mt-2 font-sans text-2xl font-extrabold tracking-tight">
                        {pick(FOUNDATION_COPY[result.foundation])}
                      </p>
                    </motion.div>
                  )}

                  <motion.div variants={fadeUp} className="mt-10 border-t border-ink/10 pt-8">
                    <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                      {t.recommendedLabel}
                    </p>
                    <p className="mt-2 font-sans text-3xl font-extrabold tracking-tight">
                      {result.level.toUpperCase()} — {pick(LEVEL_RANGE[result.level])}
                    </p>
                    <p className="mt-3 text-ink/60">{t.includesLabel}</p>
                    {result.breakEven !== null && (
                      <p className="mt-5 font-sans text-lg font-bold text-ink">
                        {t.breakEven(result.breakEven)}
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-12 rounded-3xl bg-ink p-8 text-white md:p-10">
                    <p className="font-sans text-xl font-bold">{t.closingTitle}</p>
                    <p className="mt-3 text-white/70">{t.closingBody}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      {result.cta === 'systems' ? (
                        <>
                          <Link
                            to="/systems"
                            className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97]"
                          >
                            {t.ctaSystems}
                          </Link>
                          <Link to="/diagnostic" className="font-bold text-white/70 transition-colors hover:text-white">
                            {t.ctaSecondary}
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={result.cta === 'call' ? '/contact' : '/diagnostic'}
                          className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97]"
                        >
                          {result.cta === 'call' ? t.ctaCall : t.ctaDiagnostic}
                        </Link>
                      )}
                    </div>
                  </motion.div>

                  <motion.button
                    variants={fadeUp}
                    type="button"
                    onClick={() => {
                      setAnswers(INITIAL_ANSWERS)
                      setStep(0)
                      setStarted(false)
                    }}
                    className="mt-8 rounded-full px-3 py-1 font-sans text-sm font-bold text-ink/40 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t.restart}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  )
}
