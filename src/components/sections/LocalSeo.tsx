import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const LINK_CLASS = 'font-bold text-ink/80 underline underline-offset-2 hover:text-primary'

type Segment = { text: string; to?: string }

function renderSegments(segments: Segment[]) {
  return segments.map((seg, i) =>
    seg.to ? (
      <Link key={i} to={seg.to} className={LINK_CLASS}>
        {seg.text}
      </Link>
    ) : (
      <span key={i}>{seg.text}</span>
    ),
  )
}

/** Indexable local-SEO copy — plain crawlable text, not gated behind a scroll animation beyond a simple fade. */
export function LocalSeo() {
  const { dict } = useLanguage()
  const t = dict.home.localSeo

  return (
    <section className="border-t border-ink/10 py-16 md:py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        >
          <p className="text-sm leading-relaxed text-ink/60">{renderSegments(t.paragraph1)}</p>
          <p className="text-sm leading-relaxed text-ink/60">{renderSegments(t.paragraph2)}</p>
        </motion.div>
      </Container>
    </section>
  )
}
