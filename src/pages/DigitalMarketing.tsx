import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import digitalMarketingHero from '@/assets/pages/digital-marketing.webp'

const PATH = '/services/digital-marketing'
const URL = `https://${SITE.domain}${PATH}`

/**
 * §12 "CONSERVAR": kept alive for its rankings, rewritten to hand off to
 * /systems. It sells nothing itself — the per-channel grid (Social Media,
 * Paid Ads, Lead Generation) and its retired prices are gone, and those three
 * URLs now 301 to /systems, where their keywords live instead.
 */
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

      <section className="bg-white pb-24 pt-40 md:pb-32 md:pt-48">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
            <div>
              <Breadcrumbs
                items={[
                  { label: shared.breadcrumbServices, href: '/how-it-works' },
                  { label: t.breadcrumb, href: PATH },
                ]}
              />
              <span className="mt-8 block font-sans text-sm font-bold text-primary">/02</span>
              <h1 className="mt-3 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <RevealText text={t.heading} animateOnMount />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-2xl text-lg text-ink/70"
              >
                {t.intro}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <Link
                  to="/systems"
                  className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark active:scale-[0.97]"
                >
                  {t.ctaSystems}
                </Link>
                <Link
                  to="/diagnostic"
                  className="rounded-full border border-ink/15 px-6 py-3 font-sans text-sm font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white active:scale-[0.97]"
                >
                  {t.ctaDiagnostic}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto w-full max-w-md"
            >
              <img src={digitalMarketingHero} alt={t.imageAlt} className="w-full" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
