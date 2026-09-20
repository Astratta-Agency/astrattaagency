import { useState, type FormEvent } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { CASE_STUDIES, resolveCaseStudy, type CaseStudyLeadCapture } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { CASE_STUDY_SEO_DESCRIPTIONS, CASE_STUDY_OG_IMAGES } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localizedPath } from '@/lib/i18n/routes'
import { NEWSLETTER_ENDPOINT } from '@/lib/constants'
import { getRecaptchaToken } from '@/lib/recaptcha'

/**
 * Case-study-specific lead-capture form for the "checklist" card (see
 * docs/BRIEF-caso-perreando.md, Cambio 3). Only rendered when a project's
 * data supplies `leadCapture` — currently just perreando-hotdog-social-media
 * — so this never touches any other case study page.
 *
 * Reuses the same technical pattern as NewsletterForm (NEWSLETTER_ENDPOINT +
 * getRecaptchaToken + honeypot field) rather than the component itself,
 * because the brief specifies bespoke header/subtitle/success/error copy
 * that NewsletterForm's shared dict strings don't carry. The destination
 * service for the PDF (ConvertKit/Mailchimp/Brevo/custom) is still
 * unconfirmed — see docs/BRIEF-caso-perreando.md "Decisiones pendientes" —
 * so this posts to the existing subscribe-newsletter endpoint tagged with
 * its own source_page/interest_tag, keeping "point it at the real service"
 * a one-line change without touching this component.
 */
type LeadCaptureStatus = 'idle' | 'submitting' | 'success' | 'error'

const CHECKLIST_LEAD_SOURCE = 'case-study-perreando-checklist'

// TODO: pending decision (docs/BRIEF-caso-perreando.md, "Decisiones pendientes" #2)
// — confirm whether this should point at the existing /diagnostic page (current
// site-wide single-CTA rule, CLAUDE.md §8) or a direct Calendly discovery-call
// link instead. UTM params are pre-attached either way so /diagnostic's own
// analytics (or Calendly's, once swapped in) can isolate reel-driven bookings.
const CHECKLIST_SCHEDULE_HREF = '/diagnostic?utm_source=ig&utm_medium=manychat&utm_campaign=reel292k'

function ChecklistLeadCaptureForm({ capture }: { capture: CaseStudyLeadCapture }) {
  const [status, setStatus] = useState<LeadCaptureStatus>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!NEWSLETTER_ENDPOINT) {
      console.warn(
        'VITE_NEWSLETTER_ENDPOINT is not set — point it at the subscribe-newsletter endpoint before launch.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const recaptchaToken = await getRecaptchaToken(CHECKLIST_LEAD_SOURCE)

    const payload = {
      workspace_slug: 'astratta-agency',
      email: String(data.get('email') ?? ''),
      interest_tag: 'perreando-checklist',
      source_page: CHECKLIST_LEAD_SOURCE,
      recaptcha_token: recaptchaToken,
      honeypot: String(data.get('company_role') ?? ''),
    }

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="font-sans text-base text-white">{capture.successMessage}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot anti-spam: hidden from humans; bots that fill it are silently dropped. */}
      <input
        type="text"
        name="company_role"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="perreando-checklist-email"
          className="font-sans text-xs font-bold uppercase tracking-wide text-white/70"
        >
          {capture.emailLabel}
        </label>
        <input
          id="perreando-checklist-email"
          name="email"
          type="email"
          required
          placeholder={capture.emailPlaceholder}
          className="w-full rounded-full border border-white/25 bg-transparent px-5 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-ink"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="self-start rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-ink disabled:opacity-60"
      >
        {capture.submitLabel}
      </button>

      {status === 'error' && <p className="text-sm text-secondary">{capture.errorFallback}</p>}
    </form>
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { language, dict } = useLanguage()
  const t = dict.work.caseStudy
  const source = CASE_STUDIES.find((p) => p.slug === slug)
  const project = source ? resolveCaseStudy(source, language) : undefined

  if (!project) return <Navigate to={localizedPath('work', language)} replace />

  return (
    <>
      <Seo
        title={`${project.title} — Astratta Agency Case Study`}
        description={CASE_STUDY_SEO_DESCRIPTIONS[project.slug]?.[language] ?? project.summary}
        path={`/work/${project.slug}`}
        image={CASE_STUDY_OG_IMAGES[project.slug]}
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: t.breadcrumb, href: '/work' },
                { label: project.title, href: `/work/${project.slug}` },
              ]}
            />
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-bold text-primary hover:text-primary-dark"
              >
                {t.visitLiveSite}
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 font-sans text-sm text-ink/50">{project.industry}</p>

          <h1 className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={project.title} animateOnMount />
          </h1>
        </Container>
      </section>

      <div className={`aspect-[16/7] w-full overflow-hidden bg-gradient-to-br ${project.coverGradient}`}>
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={`${project.title} website screenshot`}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {project.stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="font-sans text-3xl font-extrabold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 font-sans text-xs font-bold uppercase tracking-wide text-ink/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-12 md:grid-cols-3"
          >
            {[
              { title: t.challenge, copy: project.challenge },
              { title: t.approach, copy: project.approach },
              { title: t.results, copy: project.results },
            ].map((block) => (
              <motion.div key={block.title} variants={fadeUp}>
                <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-primary">
                  {block.title}
                </h2>
                <p className="mt-4 text-lg text-ink/70">{block.copy}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.06)}
            className="mt-14 flex flex-wrap gap-2 border-t border-ink/10 pt-10"
          >
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeUp}
                className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/50"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </Container>
      </section>

      {project.gallery && (
        <section className="pb-16 md:pb-20">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[320px] lg:auto-rows-[400px]"
            >
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  variants={fadeUp}
                  className={`overflow-hidden rounded-3xl bg-neutral/40 ${
                    i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} mockup ${i + 1}`}
                    className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${
                      i === 0 || i === 3 ? 'aspect-video md:aspect-auto' : 'aspect-[4/5] md:aspect-auto'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {project.extraStats && (
        <section className="bg-neutral/40 py-24 md:py-32">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mb-12 max-w-2xl"
            >
              <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.platformBreakdown}
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {project.extraStats.map((platform) => (
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

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
                    {platform.items.map((item) => (
                      <div key={item.label}>
                        <p className="text-xs uppercase tracking-wide text-ink/40">{item.label}</p>
                        <p className="mt-1 font-sans text-lg font-extrabold text-ink">
                          {item.value}
                          {item.change && (
                            <span
                              className={`ml-2 text-sm font-bold ${
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
          </Container>
        </section>
      )}

      {project.testimonial && (
        <section className="py-24 md:py-32">
          <Container>
            <motion.blockquote
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mx-auto max-w-3xl"
            >
              <span className="font-sans text-6xl font-extrabold leading-none text-primary/20">
                “
              </span>
              <p className="-mt-6 font-sans text-2xl font-light leading-snug tracking-tight text-ink md:text-3xl">
                {project.testimonial.quote}
              </p>
              <cite className="mt-8 block not-italic">
                <span className="font-sans text-base font-bold text-ink">
                  {project.testimonial.name}
                </span>
                <span className="ml-2 text-sm text-ink/50">{project.testimonial.role}</span>
              </cite>
            </motion.blockquote>
          </Container>
        </section>
      )}

      {project.methodChecklist && (
        <section className="py-16 md:py-20">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="max-w-2xl"
            >
              <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                {project.methodChecklist.title}
              </h2>
              <p className="mt-4 text-lg text-ink/70">{project.methodChecklist.intro}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {project.methodChecklist.items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-3xl border border-ink/10 bg-white p-8"
                >
                  <div className="font-sans text-4xl font-extrabold text-primary">{item.threshold}</div>
                  <h3 className="mt-3 font-sans text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink/60">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {project.leadCapture && (
        <section className="bg-ink py-24 text-white md:py-32">
          <Container>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
              >
                <h2 className="font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {project.leadCapture.heading}
                </h2>
                <p className="mt-5 max-w-[42ch] text-white/80">{project.leadCapture.body}</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="rounded-3xl border border-white/15 bg-white/5 p-8 md:p-10"
              >
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {project.leadCapture.formEyebrow}
                </span>
                <p className="mt-2 text-sm text-white/60">{project.leadCapture.formSubtitle}</p>

                <div className="mt-6">
                  <ChecklistLeadCaptureForm capture={project.leadCapture} />
                </div>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-sm text-white/70">{project.leadCapture.scheduleQuestion}</p>
                  <Link
                    to={CHECKLIST_SCHEDULE_HREF}
                    className="mt-3 inline-flex rounded-full border border-white/25 px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-ink"
                  >
                    {project.leadCapture.scheduleCta}
                  </Link>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {project.leadCapture && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-white/10 bg-ink/95 px-6 py-4 backdrop-blur max-[860px]:block"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <Link
            to={CHECKLIST_SCHEDULE_HREF}
            className="block w-full rounded-full bg-primary py-3 text-center font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-ink"
          >
            {project.leadCapture.scheduleCta}
          </Link>
        </div>
      )}

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="border-t border-ink/10 pt-10"
          >
            <p className="text-ink/60">
              {t.wantOutcomes}{' '}
              <Link to="/diagnostic" className="group font-bold text-primary">
                {t.getAudit}{' '}
                <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                  →
                </span>
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
