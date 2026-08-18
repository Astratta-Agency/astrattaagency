import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { ServiceFrustrations } from '@/components/ui/ServiceFrustrations'
import { ServiceProcess } from '@/components/ui/ServiceProcess'
import { ProofSnapshot } from '@/components/ui/ProofSnapshot'
import { ServiceBenefits } from '@/components/ui/ServiceBenefits'
import { WEB_DEVELOPMENT_PAGE, resolveServicePage } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildFaqSchema, buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import webDevelopmentHeroIllustration from '@/assets/illustrations/web-development-hero.webp'

/**
 * §12 "CONSERVAR": kept alive for "web development pricing Dallas", rewritten
 * to hand off to /foundation. Sells nothing itself — its tiers, add-ons and
 * pricing FAQ carried retired prices (CLAUDE.md rule 5) and were removed.
 */
export default function WebDevelopment() {
  const { language, dict } = useLanguage()
  const page = resolveServicePage(WEB_DEVELOPMENT_PAGE, language)
  const t = dict.servicePages['web-development']
  const shared = dict.services.shared
  const path = `/services/${page.slug}`
  const url = `https://${SITE.domain}${path}`

  const serviceSchema = buildServiceSchema({
    name: page.title,
    description: page.intro,
    url,
  })

  return (
    <>
      <Seo title={page.metaTitle} description={page.metaDescription} path={path} />
      <JsonLd data={serviceSchema} />
      {page.faqs && <JsonLd data={buildFaqSchema(page.faqs)} />}

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
            <div>
              <Breadcrumbs
                items={[
                  { label: shared.breadcrumbServices, href: '/how-it-works' },
                  { label: page.title, href: path },
                ]}
              />
              <span className="mt-8 block font-sans text-sm font-bold text-primary">
                {page.number}
              </span>
              <h1 className="mt-3 max-w-3xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <RevealText text={page.painHeadline ?? page.h1} animateOnMount />
              </h1>
              {page.painHeadline && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-4 max-w-2xl font-sans text-lg font-medium text-ink/60"
                >
                  {page.h1}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 max-w-2xl text-lg text-ink/70"
              >
                {page.intro}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  to="/foundation"
                  className="inline-flex rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark active:scale-[0.97]"
                >
                  {t.ctaLabel}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto w-full max-w-md"
            >
              <img
                src={webDevelopmentHeroIllustration}
                alt="Illustration of a website builder interface"
                className="w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {page.frustrations && <ServiceFrustrations frustrations={page.frustrations} />}

      {page.processSteps && <ServiceProcess steps={page.processSteps} title={t.processTitle} />}

      <ProofSnapshot
        caseStudySlug={page.proof?.caseStudySlug}
        fallbackNote={page.proof?.fallbackNote}
      />

      {page.benefits && <ServiceBenefits benefits={page.benefits} />}


      {page.faqs && (
        <section className="bg-neutral/40 py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-10">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerContainer(0.1)}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>{shared.faqLabel}</SectionLabel>
                </motion.div>
                <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <RevealText text={shared.questionsAnswered} />
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
                <FaqAccordion items={page.faqs} />
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      <section className="dot-pattern relative overflow-hidden bg-ink py-24 text-white md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between"
          >
            <motion.h2
              variants={fadeUp}
              className="max-w-xl font-sans text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
            >
              <RevealText text={t.closingHeading} />
            </motion.h2>
            <motion.div variants={fadeUp} className="shrink-0">
              <Link
                to="/foundation"
                className="inline-flex rounded-full bg-white px-8 py-4 font-sans text-base font-bold text-ink transition-colors hover:bg-secondary hover:text-white active:scale-[0.97]"
              >
                {t.ctaLabel}
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
