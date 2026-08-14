import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** Bloque nuevo del home (§8) — la entrada al conector por industria. */
export function HomeIndustries() {
  const { dict } = useLanguage()
  const t = dict.home.industriesBlock

  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.eyebrow}</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <RevealText text={t.heading} />
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-12"
        >
          {t.items.map((item) => (
            <motion.li key={item.href} variants={fadeUp}>
              <Link
                to={item.href}
                data-cursor="Open"
                className="group flex flex-col gap-2 border-b border-ink/10 py-6 first:border-t sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="font-sans text-xl font-extrabold tracking-tight transition-colors duration-200 group-hover:text-primary sm:w-56 sm:shrink-0">
                  {item.name}
                </span>
                <span className="flex-1 text-ink/70">{item.text}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-ink/25 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary sm:block"
                >
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
