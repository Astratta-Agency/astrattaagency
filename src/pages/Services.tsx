import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { JsonLd } from '@/components/ui/JsonLd'
import { SERVICES } from '@/data/services'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO } from '@/lib/seo-data'

/**
 * "Starts at" teasers shown on the hub cards — exact tiers live on each
 * category page. Graphic Design's is an unconfirmed placeholder (flagged
 * per working-method rule: never invent prices) — confirm the real starting
 * price with the client before launch.
 */
const PRICE_TEASERS: Record<string, string> = {
  'web-development': 'From $800',
  'digital-marketing': 'From $200/mo + ad spend',
  'graphic-design': 'From $600*',
  'website-audits': 'Free',
}

export default function Services() {
  return (
    <>
      <Seo {...STATIC_SEO['/services']} path="/services" />
      <JsonLd
        data={buildServiceSchema({
          name: 'Astratta Agency Services',
          description:
            'Web development, e-commerce, digital marketing, graphic design, and website audits for Dallas–Fort Worth startups and small businesses.',
          url: `https://${SITE.domain}/services`,
        })}
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>Our Services</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text="Built to convert, not just to look good." animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Astratta runs four service lines for Dallas–Fort Worth businesses: web development
            (including e-commerce), digital marketing, graphic design, and website audits. Each is
            priced in transparent tiers below — see exact pricing on each service page, or use our
            pricing quote to combine services into one plan.
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.slug} variants={scaleIn}>
                <Link
                  to={service.href}
                  className="group relative block overflow-hidden rounded-3xl bg-neutral/40 p-8 transition-colors duration-500 hover:bg-primary md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white/60">
                      {service.number}
                    </span>
                    <span className="rounded-full bg-white px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-ink transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                      {PRICE_TEASERS[service.slug]}
                    </span>
                  </div>
                  <h2 className="mt-6 font-sans text-2xl font-extrabold tracking-tight text-ink transition-colors duration-500 group-hover:text-white md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-base text-ink/60 transition-colors duration-500 group-hover:text-white/80">
                    {service.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-bold text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                    View pricing & details →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6 text-sm text-ink/40"
          >
            *Graphic Design starting price is an estimate pending confirmation.
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-16 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight">
                Not sure what you need?
              </h2>
              <p className="mt-2 max-w-md text-ink/60">
                Build a custom quote across services, or pick one of our bundled packages.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/pricing"
                className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Get a pricing quote →
              </Link>
              <Link
                to="/packages"
                className="rounded-full border border-ink/15 px-6 py-3 font-sans text-sm font-bold text-ink transition-colors hover:border-primary hover:text-primary"
              >
                See packages →
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
