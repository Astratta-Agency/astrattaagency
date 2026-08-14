import { motion } from 'framer-motion'
import { Link } from '@/components/ui/Link'
import type { IndustryProof as ProofData } from '@/data/industries'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * Bloque 6 de la página de industria, en dos modos.
 *
 * `case` solo donde hay trabajo real que enseñar. `metrics` donde todavía no
 * lo hay: cumple la misma función de credibilidad — demostrar que sabes qué
 * mirar — sin fabricar un caso. Cuando una industria consigue números reales
 * se cambia el modo en los datos y nada más.
 */
export function IndustryProof({ proof }: { proof: ProofData }) {
  const { language, pick } = useLanguage()

  if (proof.mode === 'metrics') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer(0.07)}>
        <motion.p
          variants={fadeUp}
          className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary"
        >
          {pick(proof.label)}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-white/70">
          {pick(proof.intro)}
        </motion.p>

        <motion.ul variants={staggerContainer(0.06)} className="mt-8 max-w-2xl">
          {proof.items[language].map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex gap-5 border-b border-white/15 py-4 first:border-t"
            >
              <span className="shrink-0 font-sans text-sm font-bold text-secondary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-white/85">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl font-sans text-xl font-bold leading-snug sm:text-2xl"
        >
          {pick(proof.closing)}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer(0.08)}>
      <motion.p
        variants={fadeUp}
        className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary"
      >
        {pick(proof.label)}
      </motion.p>
      <motion.p variants={fadeUp} className="mt-5 font-sans text-2xl font-extrabold tracking-tight">
        {proof.client}
      </motion.p>
      <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-white/70">
        {pick(proof.text)}
      </motion.p>

      {proof.metrics && (
        <motion.ul variants={staggerContainer(0.08)} className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
          {proof.metrics.map((metric, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="font-sans text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl"
            >
              {pick(metric)}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {proof.quote && (
        <motion.figure variants={fadeUp} className="mt-10 max-w-2xl border-l-2 border-secondary pl-6">
          <blockquote className="font-sans text-xl font-bold leading-snug">
            “{pick(proof.quote.text)}”
          </blockquote>
          <figcaption className="mt-3 text-sm text-white/50">
            {proof.quote.name} · {pick(proof.quote.role)}
          </figcaption>
        </motion.figure>
      )}

      <motion.div variants={fadeUp} className="mt-8">
        <Link
          to={`/work/${proof.caseSlug}`}
          className="group inline-flex items-center gap-2 font-sans font-bold text-white"
        >
          {pick(proof.linkLabel)}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
