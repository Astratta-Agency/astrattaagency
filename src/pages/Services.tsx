import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { SERVICE_DETAILS } from '@/data/serviceDetails'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Web Development, Digital Marketing & Design | Astratta Agency"
        description="Web development, digital marketing, graphic design, and website audits for Dallas–Fort Worth startups and small businesses — from Astratta Agency."
        path="/services"
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>Our Services</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text="Built to convert, not just to look good." animateOnMount />
          </h1>
        </Container>
      </section>

      {SERVICE_DETAILS.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-24 py-24 md:py-32 ${i % 2 === 1 ? 'bg-neutral/40' : ''}`}
        >
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
            >
              <motion.div variants={fadeUp}>
                <span className="font-sans text-sm font-bold text-primary">{service.number}</span>
                <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-5 max-w-md text-lg text-ink/70">{service.intro}</p>
                <Link
                  to="/audit"
                  className="mt-8 inline-flex items-center gap-2 font-sans text-base font-bold text-ink hover:text-primary"
                >
                  Get your free website audit →
                </Link>
              </motion.div>

              <motion.ul variants={fadeUp} className="flex flex-col gap-4">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 border-t border-ink/10 pt-4 text-ink/80"
                  >
                    <span className="mt-1 text-primary">✦</span>
                    {bullet}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </Container>
        </section>
      ))}
    </>
  )
}
