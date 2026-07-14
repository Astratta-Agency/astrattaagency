import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { WE_DO_ITEMS } from '@/data/services'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export function WeDoStrip() {
  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          {WE_DO_ITEMS.map((item, i) => (
            <motion.li
              key={item}
              variants={fadeUp}
              className="group flex items-center gap-6 border-b border-ink/10 py-6 first:border-t md:gap-10 md:py-10"
            >
              <span className="font-sans text-sm font-bold text-ink/40 md:text-base">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-sans text-3xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-5xl md:text-6xl">
                {item}
              </span>
              <span className="translate-x-4 text-3xl text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:text-5xl">
                →
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
