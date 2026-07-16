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
import { AddOnsList } from '@/components/ui/AddOnsList'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { ContactForm } from '@/components/ui/ContactForm'
import { ServiceFrustrations } from '@/components/ui/ServiceFrustrations'
import { ServiceProcess } from '@/components/ui/ServiceProcess'
import { ProofSnapshot } from '@/components/ui/ProofSnapshot'
import { ProofGallery } from '@/components/ui/ProofGallery'
import { ServiceBenefits } from '@/components/ui/ServiceBenefits'
import { GRAPHIC_DESIGN_PAGE } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildFaqSchema, buildOfferSchema, buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import graphicDesignHeroIllustration from '@/assets/illustrations/graphic-design-hero.webp'

export default function GraphicDesign() {
  const page = GRAPHIC_DESIGN_PAGE
  const path = `/services/${page.slug}`
  const url = `https://${SITE.domain}${path}`

  const serviceSchema = {
    ...buildServiceSchema({ name: page.title, description: page.intro, url }),
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
                  { label: 'Services', href: '/services' },
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
                src={graphicDesignHeroIllustration}
                alt="Illustration of a brand identity card with a logo mark and color palette"
                className="w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {page.frustrations && (
        <ServiceFrustrations frustrations={page.frustrations} title="Sound familiar?" />
      )}

      {page.processSteps && (
        <ServiceProcess steps={page.processSteps} title="How we build the identity." />
      )}

      <ProofSnapshot
        caseStudySlug={page.proof?.caseStudySlug}
        fallbackNote={page.proof?.fallbackNote}
        showGallery
      />

      <ProofGallery caseStudySlug="clover4life" />

      {page.benefits && (
        <ServiceBenefits benefits={page.benefits} title="What you actually get." />
      )}

      <section className="border-t border-ink/10 pb-24 pt-24 md:pb-32 md:pt-32">
        <Container>
          <PricingTable tiers={page.tiers} />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-ink/10 bg-neutral/40 p-6 md:p-8"
            >
              <p className="text-ink/70">
                Need a new website to match your new brand?{' '}
                <Link to="/services/web-development" className="font-bold text-primary">
                  See Web Development pricing →
                </Link>
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <QuoteCallout />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {page.addOns && (
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
                <SectionLabel>Add-ons</SectionLabel>
              </motion.div>
              <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                Extend any plan.
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <AddOnsList items={page.addOns} />
            </motion.div>
          </Container>
        </section>
      )}

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
                <SectionLabel>FAQ</SectionLabel>
              </motion.div>
              <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                <RevealText text="Questions, answered." />
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <FaqAccordion items={page.faqs} />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="dot-pattern relative overflow-hidden bg-white py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text="Ready for a brand that looks the part?" />
              </h2>
              <p className="mt-6 max-w-md text-ink/60">
                Tell us which tier fits, or request a free audit first if you're not sure.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <ContactForm submitLabel="Start my brand" source="graphic-design-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
