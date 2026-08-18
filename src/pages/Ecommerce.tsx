import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { ServiceFrustrations } from '@/components/ui/ServiceFrustrations'
import { ServiceProcess } from '@/components/ui/ServiceProcess'
import { ServiceBenefits } from '@/components/ui/ServiceBenefits'
import { ECOMMERCE_PAGE, resolveServicePage } from '@/data/pricing'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import ecommerceHeroIllustration from '@/assets/illustrations/ecommerce-hero.webp'

/**
 * §12 "CONSERVAR": its own search intent is valid, so the URL stays — but
 * e-commerce is now a Foundation add-on, not a tier ladder. The old
 * $2,800 / $5,000 / $8,500 tiers and their FAQ never existed in the current
 * architecture and were removed.
 */
export default function Ecommerce() {
  const { language, dict } = useLanguage()
  const page = resolveServicePage(ECOMMERCE_PAGE, language)
  const t = dict.servicePages.ecommerce
  const shared = dict.services.shared
  const path = `/services/${page.slug}`
  const url = `https://${SITE.domain}${path}`

  const serviceSchema = buildServiceSchema({
    name: 'E-commerce Website Development',
    description: page.intro,
    url,
  })

  return (
    <>
      <Seo title={page.metaTitle} description={page.metaDescription} path={path} />
      <JsonLd data={serviceSchema} />

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
                src={ecommerceHeroIllustration}
                alt="Illustration of an e-commerce storefront with product cards"
                className="w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {page.frustrations && <ServiceFrustrations frustrations={page.frustrations} />}

      {page.processSteps && <ServiceProcess steps={page.processSteps} title={t.processTitle} />}

      {page.benefits && <ServiceBenefits benefits={page.benefits} />}

      <section className="dot-pattern relative overflow-hidden border-t border-ink/10 bg-ink py-20 text-white md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex justify-center"
          >
            <Link
              to="/foundation"
              className="rounded-full bg-white px-8 py-4 font-sans text-base font-bold text-ink transition-colors hover:bg-secondary hover:text-white active:scale-[0.97]"
            >
              {t.ctaLabel}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
