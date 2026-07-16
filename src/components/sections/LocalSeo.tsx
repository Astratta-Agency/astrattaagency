import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeUp, viewportOnce } from '@/lib/animations'

const LINK_CLASS = 'font-bold text-ink/80 underline underline-offset-2 hover:text-primary'

/** Indexable local-SEO copy — plain crawlable text, not gated behind a scroll animation beyond a simple fade. */
export function LocalSeo() {
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
          <p className="text-sm leading-relaxed text-ink/60">
            Astratta is a Dallas web design studio that builds sites meant to convert, not just to
            exist. Most local businesses we meet already have a website — the problem is it was
            never built around a clear next step for the visitor. Our{' '}
            <Link to="/services/web-development" className={LINK_CLASS}>
              web development
            </Link>{' '}
            work starts with that gap: messaging that says what you actually do, load times that
            don't lose mobile visitors, and a path from homepage to contact form that makes sense.
            Dallas–Fort Worth is home base, but the standard doesn't change for clients anywhere.
          </p>
          <p className="text-sm leading-relaxed text-ink/60">
            Not sure whether the problem is your site, your traffic, or your follow-up? Start with
            a free{' '}
            <Link to="/audit" className={LINK_CLASS}>
              website audit
            </Link>{' '}
            — a straight read on performance, messaging, and conversion paths for any
            Dallas–Fort Worth business, no obligation attached. From there, our{' '}
            <Link to="/services/digital-marketing" className={LINK_CLASS}>
              digital marketing
            </Link>{' '}
            programs cover social media, paid ads, and full lead generation systems for small
            businesses in DFW, each measured against leads and cost per lead — not likes, not
            impressions.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
