import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/ui/ContactForm'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { AUDIT_CHECKLIST, AUDIT_STEPS } from '@/data/audit'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO } from '@/lib/seo-data'

export default function Audit() {
  return (
    <>
      <Seo {...STATIC_SEO['/audit']} path="/audit" />

      <section className="relative overflow-hidden bg-white pb-24 pt-40 md:pb-32 md:pt-48">
        <GradientBlob />
        <Container className="relative z-10">
          <SectionLabel>Free Website Audit</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-sans text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text="Find out exactly why your site isn't converting." animateOnMount />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg text-ink/70 md:text-xl"
          >
            A prioritized, plain-English action plan — what's broken, what it's costing you, and
            how we'd fix it. No jargon, no upsell pressure.
          </motion.p>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mb-16 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>What's included</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              Six things we check, every time.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {AUDIT_CHECKLIST.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} className="border-t border-ink/10 pt-6">
                <span className="font-sans text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-sans text-xl font-extrabold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink/60">{item.description}</p>
              </motion.div>
            ))}
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
            className="mb-16 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>How it works</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              Three steps, no obligation.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {AUDIT_STEPS.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <span className="font-sans text-sm font-bold text-primary">{step.number}</span>
                <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-ink/60">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="request" className="dot-pattern relative overflow-hidden bg-white py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text="Request your free audit." />
              </h2>
              <p className="mt-6 max-w-md text-ink/60">
                Fill in the form and we'll follow up with next steps — no sales call required to
                get value out of this.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <ContactForm submitLabel="Request my audit" source="audit-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
