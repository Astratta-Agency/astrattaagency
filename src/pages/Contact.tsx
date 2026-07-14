import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/ui/ContactForm'
import { SITE, SOCIALS } from '@/lib/constants'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { STATIC_SEO } from '@/lib/seo-data'

export default function Contact() {
  return (
    <>
      <Seo {...STATIC_SEO['/contact']} path="/contact" />

      <section className="dot-pattern relative overflow-hidden bg-white py-24 pt-40 md:py-32 md:pt-48">
        <Container>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-5 max-w-2xl font-sans text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            <RevealText text="Let's talk about your project." animateOnMount />
          </h1>

          <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                  Email
                </h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block font-sans text-2xl font-extrabold text-ink hover:text-primary"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                  Location
                </h2>
                <p className="mt-2 font-sans text-2xl font-extrabold text-ink">{SITE.location}</p>
                <p className="mt-1 text-ink/50">Remote-first — we work with clients anywhere.</p>
              </div>
              <div>
                <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                  Follow
                </h2>
                <ul className="mt-2 flex flex-col gap-1">
                  {SOCIALS.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-lg font-bold text-ink hover:text-primary"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <ContactForm submitLabel="Send message" source="contact-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
