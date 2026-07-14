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
import { WEB_DEVELOPMENT_PAGE } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildFaqSchema, buildOfferSchema, buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'

export default function WebDevelopment() {
  const page = WEB_DEVELOPMENT_PAGE
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
            <RevealText text={page.h1} animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{page.intro}</p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
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
                Selling physical products?{' '}
                <Link to="/services/ecommerce" className="font-bold text-primary">
                  See E-commerce pricing →
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
                <RevealText text="Ready to start your web project?" />
              </h2>
              <p className="mt-6 max-w-md text-ink/60">
                Tell us which tier fits, or request a free audit first if you're not sure.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <ContactForm submitLabel="Start my project" source="web-development-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
