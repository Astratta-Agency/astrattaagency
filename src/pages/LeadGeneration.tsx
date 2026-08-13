import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { PricingTable } from '@/components/ui/PricingTable'
import { QuoteCallout } from '@/components/ui/QuoteCallout'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { ContactForm } from '@/components/ui/ContactForm'
import { ServiceFrustrations } from '@/components/ui/ServiceFrustrations'
import { ServiceProcess } from '@/components/ui/ServiceProcess'
import { ProofSnapshot } from '@/components/ui/ProofSnapshot'
import { ServiceBenefits } from '@/components/ui/ServiceBenefits'
import { LEAD_GENERATION_PAGE, resolveServicePage } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildFaqSchema, buildOfferSchema, buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import leadGenerationHeroIllustration from '@/assets/illustrations/lead-generation-hero.webp'

export default function LeadGeneration() {
  const { language, dict } = useLanguage()
  const page = resolveServicePage(LEAD_GENERATION_PAGE, language)
  const t = dict.servicePages['lead-generation']
  const shared = dict.services.shared
  const path = `/services/${page.slug}`
  const url = `https://${SITE.domain}${path}`

  const coreTier = page.tiers[0]
  const addOnTiers = page.tiers.slice(1)

  const serviceSchema = {
    ...buildServiceSchema({ name: 'Lead Generation System', description: page.intro, url }),
    offers: buildOfferSchema(page.tiers),
  }

  return (
    <>
      <Seo title={page.metaTitle} description={page.metaDescription} path={path} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={buildFaqSchema(page.faqs)} />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
            <div>
              <Breadcrumbs
                items={[
                  { label: shared.breadcrumbServices, href: '/services' },
                  { label: shared.breadcrumbDigitalMarketing, href: '/services/digital-marketing' },
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
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto w-full max-w-md"
            >
              <img
                src={leadGenerationHeroIllustration}
                alt="Illustration of a lead-generation funnel turning traffic into a qualified lead"
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

      <section className="border-t border-ink/10 pb-16 pt-24 md:pb-20 md:pt-32">
        <Container>
          <PricingTable tiers={[coreTier]} />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="mt-6 grid grid-cols-1 gap-6 rounded-3xl bg-ink p-8 text-white sm:grid-cols-3 md:p-10"
          >
            <motion.div variants={fadeUp} className="sm:col-span-3">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                {t.guarantee.label}
              </span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="font-sans text-4xl font-extrabold">{t.guarantee.leads}</div>
              <p className="mt-1 text-sm text-white/60">{t.guarantee.leadsLabel}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="font-sans text-4xl font-extrabold">{t.guarantee.cost}</div>
              <p className="mt-1 text-sm text-white/60">{t.guarantee.costLabel}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="font-sans text-4xl font-extrabold">{t.guarantee.commitment}</div>
              <p className="mt-1 text-sm text-white/60">{t.guarantee.commitmentLabel}</p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mb-12 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.addOnsEyebrow}</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.addOnsHeading}
            </h2>
            <p className="mt-3 text-ink/60">{t.addOnsSubtext}</p>
          </motion.div>

          <PricingTable tiers={addOnTiers} />
        </Container>
      </section>

      <section className="bg-neutral/40 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mb-10 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.adsScalingEyebrow}</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.adsScalingHeading}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="overflow-x-auto rounded-3xl border border-ink/10 bg-white"
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    {t.tableHeaders.plan}
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    {t.tableHeaders.feeAndBudget}
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    {t.tableHeaders.creatives}
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    {t.tableHeaders.targeting}
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    {t.tableHeaders.result}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.adsScalingTiers.map((row) => (
                  <tr key={row.plan} className="border-b border-ink/10 last:border-b-0">
                    <td className="px-6 py-4 font-sans font-bold text-ink">{row.plan}</td>
                    <td className="px-6 py-4 text-ink/70">{row.feeAndBudget}</td>
                    <td className="px-6 py-4 text-ink/70">{row.creatives}</td>
                    <td className="px-6 py-4 text-ink/70">{row.targeting}</td>
                    <td className="px-6 py-4 text-ink/70">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6 rounded-2xl border-2 border-secondary/30 bg-secondary/10 px-6 py-4"
          >
            <p className="text-sm text-ink/80">
              <span className="font-bold text-secondary">{t.notStandalone.prefix}</span>
              {t.notStandalone.before}
              <Link to="/services/paid-ads" className="font-bold text-primary">
                {t.notStandalone.linkText}
              </Link>
              {t.notStandalone.after}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6"
          >
            <QuoteCallout />
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
              <FaqAccordion items={page.faqs} />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="dot-pattern relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text={t.closingHeading} />
              </h2>
              <p className="mt-6 max-w-md text-white/60">{t.closingSubtext}</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <ContactForm submitLabel={t.submitLabel} source="lead-generation-page" dark />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
