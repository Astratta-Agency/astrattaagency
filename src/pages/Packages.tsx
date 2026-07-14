import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { ContactForm } from '@/components/ui/ContactForm'
import { BUNDLES, PHRASE_TABLE } from '@/data/bundles'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO } from '@/lib/seo-data'

/** Strips a display price like "$800 one-time + $200/mo" down to its first bare number for schema.org's `price`. */
function firstPriceValue(line: string): string | undefined {
  const match = line.match(/[\d,]+(\.\d+)?/)
  return match ? match[0].replace(/,/g, '') : undefined
}

export default function Packages() {
  const path = '/packages'
  const url = `https://${SITE.domain}${path}`

  const serviceSchema = {
    ...buildServiceSchema({
      name: 'Service Bundles & Packages',
      description:
        "Pre-built combinations of web development, e-commerce, marketing, and social media services for Dallas businesses, bundled at a lower combined rate than buying separately.",
      url,
    }),
    offers: BUNDLES.map((bundle) => ({
      '@type': 'Offer',
      name: bundle.name,
      price: firstPriceValue(bundle.priceLine),
      priceCurrency: 'USD',
      description: bundle.bestFor,
    })),
  }

  return (
    <>
      <Seo {...STATIC_SEO['/packages']} path={path} />
      <JsonLd data={serviceSchema} />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <Breadcrumbs items={[{ label: 'Packages', href: path }]} />
          <h1 className="mt-6 max-w-3xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text="Built to work together. Priced to reward it." animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            These are Astratta's most common service combinations for Dallas businesses, bundled
            at a lower combined monthly rate than purchasing each service separately. Each bundle
            links to the full pricing of its individual components — combine your own mix anytime
            using the pricing tool.
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {BUNDLES.map((bundle) => (
              <motion.div
                key={bundle.slug}
                variants={scaleIn}
                className="flex flex-col rounded-3xl border border-ink/10 bg-neutral/40 p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-sans text-2xl font-extrabold tracking-tight">
                    {bundle.name}
                  </h2>
                  {bundle.badge && (
                    <span className="shrink-0 rounded-full bg-secondary px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-white">
                      {bundle.badge}
                    </span>
                  )}
                </div>

                <ul className="mt-5 flex flex-col gap-2">
                  {bundle.components.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.href}
                        className="text-sm font-bold text-ink/70 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-ink/10 pt-6">
                  {bundle.separatelyLine && (
                    <p className="text-sm text-ink/40 line-through">
                      Separately: {bundle.separatelyLine}
                    </p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-sans text-2xl font-extrabold tracking-tight text-ink">
                      {bundle.priceLine}
                    </span>
                    {bundle.savingsNote && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-bold text-primary">
                        {bundle.savingsNote}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-ink/60">{bundle.bestFor}</p>

                <Link
                  to="/pricing"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  Get this bundle →
                </Link>
              </motion.div>
            ))}
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
                Not sure which bundle fits?
              </h2>
              <p className="mt-2 max-w-md text-ink/60">
                Answer a few questions and we'll combine your own mix with real pricing attached.
              </p>
            </div>
            <Link
              to="/pricing"
              className="shrink-0 rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Get a pricing quote →
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className="bg-neutral/40 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mb-12 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Talk to us in plain English</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              Not sure what any of this means? Just say what you want.
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
                    If you say...
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    We ask...
                  </th>
                  <th className="px-6 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                    We usually recommend
                  </th>
                </tr>
              </thead>
              <tbody>
                {PHRASE_TABLE.map((row) => (
                  <tr key={row.saying} className="border-b border-ink/10 last:border-b-0">
                    <td className="px-6 py-4 font-sans font-bold text-ink">{row.saying}</td>
                    <td className="px-6 py-4 text-ink/70">{row.weAsk}</td>
                    <td className="px-6 py-4 text-ink/70">{row.weRecommend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </section>

      <section className="dot-pattern relative overflow-hidden bg-white py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text="Ready to bundle and save?" />
              </h2>
              <p className="mt-6 max-w-md text-ink/60">
                Tell us which bundle fits, or request a free audit first if you're not sure.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <ContactForm submitLabel="Get my bundle" source="packages-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
