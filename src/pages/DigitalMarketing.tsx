import { Link } from 'react-router-dom'
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
import type { FaqItem } from '@/data/pricing'
import { STATIC_SEO } from '@/lib/seo-data'

const PATH = '/services/digital-marketing'
const URL = `https://${SITE.domain}${PATH}`

const INTRO =
  'Astratta runs three types of digital marketing programs for Dallas businesses: social media management (awareness and community), paid ads (Meta and Google, cold and retargeting), and full lead generation systems (funnel + nurture + CRM combined). Each has transparent monthly pricing — see the plan that matches your goal below.'

const SUB_SERVICES = [
  {
    number: '/02a',
    slug: 'social-media',
    title: 'Social Media',
    description:
      'Consistent, on-brand content across Instagram, Facebook, and TikTok that builds an audience worth selling to.',
    teaser: 'From $450/mo',
  },
  {
    number: '/02b',
    slug: 'paid-ads',
    title: 'Paid Ads',
    description:
      'Meta and Google campaigns built to hit a cost-per-lead target, not just an impression count.',
    teaser: 'From $200/mo + ad spend',
  },
  {
    number: '/02c',
    slug: 'lead-generation',
    title: 'Lead Generation System',
    description:
      'The full stack: landing page, ads, social warm-up, and lead magnet working together to deliver qualified leads on a schedule.',
    teaser: 'From $1,200/mo',
  },
] as const

const FAQS: FaqItem[] = [
  {
    question: 'Should I start with social media or paid ads?',
    answer:
      "If you need leads fast, start with Paid Ads or the full Lead Generation System — both are built to produce a measurable cost per lead within the first month. Social Media is the right first step if your goal is longer-term audience building and brand authority rather than immediate lead volume.",
  },
  {
    question: "What's the difference between Paid Ads and the Lead Generation System?",
    answer:
      'Paid Ads is campaign management only — you need an existing landing page to send traffic to. The Lead Generation System includes the landing page, lead magnet, ad management, social warm-up, and CRM follow-up as one bundled monthly program, which is why it\'s priced as a full system rather than a per-channel fee.',
  },
  {
    question: 'Do I need a website before starting digital marketing?',
    answer:
      'For Paid Ads and Lead Generation, yes — you need at least a landing page to convert the traffic (see Web Development). Social Media management can start independently of a website, since it drives to your social profiles or DMs directly.',
  },
]

export default function DigitalMarketing() {
  const serviceSchema = buildServiceSchema({
    name: 'Digital Marketing',
    description: INTRO,
    url: URL,
  })

  return (
    <>
      <Seo {...STATIC_SEO[PATH]} path={PATH} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={buildFaqSchema(FAQS)} />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Digital Marketing', href: PATH },
            ]}
          />
          <span className="mt-8 block font-sans text-sm font-bold text-primary">/02</span>
          <h1 className="mt-3 max-w-3xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text="Traffic without leads is just noise." animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{INTRO}</p>
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
            {SUB_SERVICES.map((service) => (
              <motion.div key={service.slug} variants={scaleIn}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-neutral/40 p-8 transition-colors duration-500 hover:bg-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white/60">
                      {service.number}
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
                    View pricing & details →
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
              <SectionLabel>How these fit together</SectionLabel>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 text-xl leading-relaxed text-ink/80 md:text-2xl">
              Social Media builds an audience and warms up cold traffic. Paid Ads turns budget into
              qualified clicks on a cost-per-lead basis. Lead Generation System combines both with a
              landing page, lead magnet, and CRM follow-up into one measured pipeline — it's the
              right starting point if your main goal is a predictable number of qualified leads per
              month, not just more traffic or more followers.
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
                <SectionLabel>FAQ</SectionLabel>
              </motion.div>
              <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                <RevealText text="Questions, answered." />
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <FaqAccordion items={FAQS} />
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
                <RevealText text="Not sure which channel to start with?" />
              </h2>
              <p className="mt-6 text-white/60">
                Get a free audit of your current marketing, or request a combined quote across
                channels.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/audit"
                className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Get a free audit →
              </Link>
              <Link
                to="/pricing"
                className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:border-secondary hover:bg-secondary"
              >
                Get a pricing quote →
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
