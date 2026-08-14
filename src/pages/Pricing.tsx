import { useMemo, useState } from 'react'
import { Link } from '@/components/ui/Link'
import { AnimatePresence, motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { JsonLd } from '@/components/ui/JsonLd'
import { ContactForm } from '@/components/ui/ContactForm'
import {
  AUDIT_INTEREST,
  CURRENT_STATE_OPTIONS,
  GOAL_OPTIONS,
  INITIAL_ANSWERS,
  INTEREST_OPTIONS,
  buildQuizSummary,
  getRecommendation,
  type CurrentStateId,
  type GoalId,
  type InterestId,
  type QuizAnswers,
} from '@/lib/quiz'
import { pageTransition } from '@/lib/animations'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const STEP_COUNT = 4

function formatMoney(n: number) {
  return n.toLocaleString('en-US')
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 px-6 py-5 text-left font-sans text-lg font-bold transition-all duration-200 md:px-8 md:py-6 ${
        selected
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-ink/10 text-ink hover:border-ink/30'
      }`}
    >
      {label}
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs transition-colors duration-200 ${
          selected ? 'border-primary bg-primary text-white' : 'border-ink/20 text-transparent'
        }`}
      >
        ✓
      </span>
    </button>
  )
}

export default function Pricing() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS)
  const { dict, pick } = useLanguage()
  const t = dict.pricingQuiz

  const result = useMemo(() => getRecommendation(answers), [answers])
  const summary = useMemo(() => buildQuizSummary(answers, result), [answers, result])

  const selectGoal = (id: GoalId) => {
    setAnswers((prev) => ({ ...prev, goal: id }))
    window.setTimeout(() => setStep(1), 300)
  }

  const toggleCurrentState = (id: CurrentStateId) => {
    setAnswers((prev) => {
      if (id === 'none') {
        return { ...prev, currentState: prev.currentState.includes('none') ? [] : ['none'] }
      }
      const withoutNone = prev.currentState.filter((s) => s !== 'none')
      const has = withoutNone.includes(id)
      return {
        ...prev,
        currentState: has ? withoutNone.filter((s) => s !== id) : [...withoutNone, id],
      }
    })
  }

  const toggleInterest = (id: InterestId) => {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const restart = () => {
    setAnswers(INITIAL_ANSWERS)
    setStep(0)
  }

  const serviceSchema = buildServiceSchema({
    name: 'Custom Pricing Consultation',
    description:
      'A guided quiz that recommends a combination of Astratta Agency services — web development, e-commerce, digital marketing, and graphic design — with an estimated price range for Dallas–Fort Worth businesses.',
    url: `https://${SITE.domain}/pricing`,
  })

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/pricing'])} path="/pricing" />
      <JsonLd data={serviceSchema} />

      <section className="min-h-screen bg-white pb-24 pt-40 md:pb-32 md:pt-48">
        <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-between">
            <SectionLabel>{t.eyebrow}</SectionLabel>
            <span className="font-sans text-sm font-bold text-ink/40">
              {t.stepLabel(Math.min(step + 1, STEP_COUNT), STEP_COUNT)}
            </span>
          </div>

          <div className="mb-12 flex gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEP_COUNT}>
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  i <= step ? 'bg-primary' : 'bg-ink/10'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" variants={pageTransition} initial="initial" animate="animate" exit="exit">
                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <RevealText text={t.step0.heading} animateOnMount />
                </h1>
                <p className="mt-4 text-lg text-ink/60">{t.step0.subtext}</p>

                <div className="mt-10 flex flex-col gap-4" role="radiogroup" aria-label="Main goal">
                  {GOAL_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      label={pick(option.label)}
                      selected={answers.goal === option.id}
                      onClick={() => selectGoal(option.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step-1" variants={pageTransition} initial="initial" animate="animate" exit="exit">
                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <RevealText text={t.step1.heading} animateOnMount />
                </h1>
                <p className="mt-4 text-lg text-ink/60">{t.step1.subtext}</p>

                <div className="mt-10 flex flex-col gap-4" role="group" aria-label="Current state">
                  {CURRENT_STATE_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      label={pick(option.label)}
                      selected={answers.currentState.includes(option.id)}
                      onClick={() => toggleCurrentState(option.id)}
                    />
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="font-sans text-sm font-bold text-ink/50 transition-colors hover:text-ink"
                  >
                    {t.step1.back}
                  </button>
                  <button
                    type="button"
                    disabled={answers.currentState.length === 0}
                    onClick={() => setStep(2)}
                    className="ml-auto rounded-full bg-primary px-8 py-4 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
                  >
                    {t.step1.next}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-2" variants={pageTransition} initial="initial" animate="animate" exit="exit">
                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <RevealText text={t.step2.heading} animateOnMount />
                </h1>
                <p className="mt-4 text-lg text-ink/60">{t.step2.subtext}</p>

                <div className="mt-10 flex flex-col gap-4" role="group" aria-label="Services of interest">
                  {INTEREST_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      label={pick(option.label)}
                      selected={answers.interests.includes(option.id)}
                      onClick={() => toggleInterest(option.id)}
                    />
                  ))}
                </div>

                <div className="mt-8 border-t border-ink/10 pt-8">
                  <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                    {t.step2.notSure}
                  </p>
                  <OptionCard
                    label={pick(AUDIT_INTEREST.label)}
                    selected={answers.interests.includes(AUDIT_INTEREST.id)}
                    onClick={() => toggleInterest(AUDIT_INTEREST.id)}
                  />
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="font-sans text-sm font-bold text-ink/50 transition-colors hover:text-ink"
                  >
                    {t.step2.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="ml-auto rounded-full bg-primary px-8 py-4 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                  >
                    {t.step2.seeRecommendation}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step-3" variants={pageTransition} initial="initial" animate="animate" exit="exit">
                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <RevealText text={t.step3.heading} animateOnMount />
                </h1>
                <p className="mt-4 max-w-xl text-lg text-ink/60">{pick(result.intro)}</p>

                <div className="mt-10 flex flex-col gap-4">
                  {result.lines.map((line) => (
                    <Link
                      key={line.key}
                      to={line.href}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-neutral/40 px-6 py-5 transition-colors hover:border-primary md:px-8"
                    >
                      <div>
                        <p className="font-sans text-lg font-extrabold tracking-tight text-ink">
                          {pick(line.serviceTitle)}
                        </p>
                        <p className="mt-1 text-sm text-ink/60">{pick(line.tierLabel)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-sans text-base font-bold text-ink">
                          {line.low === 0 && line.high === 0
                            ? t.step3.free
                            : line.low === line.high
                              ? `$${formatMoney(line.low)}`
                              : `$${formatMoney(line.low)}–$${formatMoney(line.high)}`}
                        </span>
                        <span className="text-secondary opacity-0 transition-[opacity,transform] group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-ink p-8 text-white md:p-10">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {t.step3.estimatedInvestment}
                  </span>
                  <div className="mt-3 font-sans text-4xl font-extrabold">
                    {result.lowTotal === 0 && result.highTotal === 0
                      ? t.step3.freeToStart
                      : `$${formatMoney(result.lowTotal)} – $${formatMoney(result.highTotal)}`}
                  </div>
                  <p className="mt-3 max-w-md text-sm text-white/60">{t.step3.investmentNote}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={restart}
                    className="font-sans text-sm font-bold text-ink/50 transition-colors hover:text-ink"
                  >
                    {t.step3.startOver}
                  </button>
                  <Link
                    to="/packages"
                    className="font-sans text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    {t.step3.preferBundle}
                  </Link>
                </div>

                <div className="mt-16 border-t border-ink/10 pt-12">
                  <h2 className="font-sans text-2xl font-extrabold tracking-tight">
                    {t.step3.confirmHeading}
                  </h2>
                  <p className="mt-3 max-w-md text-ink/60">{t.step3.confirmSubtext}</p>
                  <div className="mt-8">
                    <ContactForm
                      submitLabel={t.step3.submitLabel}
                      source="pricing-quote"
                      metadata={summary}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </Container>
      </section>
    </>
  )
}
