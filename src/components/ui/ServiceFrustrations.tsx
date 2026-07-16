import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Frustration } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type ServiceFrustrationsProps = {
  frustrations: Frustration[]
  title?: string
}

const DEFAULT_TITLE = 'Sound familiar?'

/**
 * Static (non-scroll-pinned) variant of the homepage PainPoints card grid —
 * service pages are shorter, so a full scroll-scrub sequence per page would
 * be excessive. Same dark-card visual language, no pinning.
 */
export function ServiceFrustrations({ frustrations, title = DEFAULT_TITLE }: ServiceFrustrationsProps) {
  return (
    <section className="border-t border-ink/10 bg-[#121212] py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>Frustrations</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-sans font-extrabold leading-[1.1] tracking-tight text-[#eaeaea]"
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20"
        >
          {frustrations.map((item) => (
            <motion.li
              key={item.text}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-[#1e1e1e] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-base font-bold leading-none text-[#121212]">
                ×
              </span>
              <p className="mt-4 font-sans text-base font-bold leading-snug text-white md:text-[19px]">
                {item.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
