import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildFaqSchema, buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const PATH = '/services/digital-marketing'
const URL = `https://${SITE.domain}${PATH}`

export default function DigitalMarketing() {
  const { dict } = useLanguage()
  const t = dict.digitalMarketing
  const shared = dict.services.shared

  const serviceSchema = buildServiceSchema({
    name: 'Digital Marketing',
    description: t.intro,
    url: URL,
  })

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO[PATH])} path={PATH} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={buildFaqSchema(t.faqs)} />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <Breadcrumbs
            items={[
              { label: shared.breadcrumbServices, href: '/how-it-works' },
              { label: t.breadcrumb, href: PATH },
            ]}
          />
          <span className="mt-8 block font-sans text-sm font-bold text-primary">/02</span>
          <h1 className="mt-3 max-w-3xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{t.intro}</p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {t.subServices.map((service, i) => (
              <motion.div key={service.slug} variants={scaleIn}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-neutral/40 p-8 transition-colors duration-500 hover:bg-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white/60">
                      {['/02a', '/02b', '/02c'][i]}
                    </span>
                  </div>
                  <h2 className="mt-6 font-sans text-2xl font-extrabold tracking-tight text-ink transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 flex-1 text-base text-ink/60 transition-colors duration-500 group-hover:text-white/80">
                    {service.description}
                  </p>
                  <span className="mt-6 rounded-full bg-white px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-ink transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                    {service.teaser}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                    {shared.viewPricingDetails}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-ink/10 bg-neutral/40 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.howFitEyebrow}</SectionLabel>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 text-xl leading-relaxed text-ink/80 md:text-2xl">
              {t.howFitText}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
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
              <FaqAccordion items={t.faqs} />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="dot-pattern relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
          >
            <motion.div variants={fadeUp} className="max-w-xl">
              <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text={t.closingHeading} />
              </h2>
              <p className="mt-6 text-white/60">{t.closingSubtext}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/diagnostic"
                className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {t.ctaAudit}
              </Link>
              <Link
                to="/pricing"
                className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:border-secondary hover:bg-secondary"
              >
                {t.ctaQuote}
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
