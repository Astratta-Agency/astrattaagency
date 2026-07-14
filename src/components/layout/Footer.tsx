import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { FOOTER_COLUMNS, SITE, SOCIALS } from '@/lib/constants'
import logoWhite from '@/assets/logo-white.png'
import { useLenis } from '@/components/layout/SmoothScroll'

export function Footer() {
  const lenis = useLenis()

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink text-white">
      <Container className="py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-16 md:flex-row md:items-end">
            <div>
              <img src={logoWhite} alt="Astratta Agency" className="w-[70vw] max-w-[420px]" />
              <p className="mt-4 max-w-md text-white/60">{SITE.tagline}</p>
            </div>
            <button
              onClick={scrollToTop}
              data-cursor="Top"
              className="shrink-0 rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-bold transition-colors hover:border-primary hover:bg-primary"
            >
              Back to top ↑
            </button>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-white/40">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="font-sans text-base text-white/80 transition-colors hover:text-secondary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-white/40">
                Socials
              </h3>
              <ul className="flex flex-col gap-3">
                {SOCIALS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-base text-white/80 transition-colors hover:text-secondary"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 text-sm text-white/40 md:flex-row">
            <p>{SITE.location}</p>
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
