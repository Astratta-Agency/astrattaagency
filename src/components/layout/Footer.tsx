import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { FOOTER_COLUMNS, SITE, SOCIALS } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import logoWhite from '@/assets/logo-white.png'
import { useLenis } from '@/components/layout/SmoothScroll'

export function Footer() {
  const lenis = useLenis()
  const { dict, pick } = useLanguage()

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
              <p className="mt-4 max-w-md text-white/60">{pick(SITE.tagline)}</p>
            </div>
            <button
              onClick={scrollToTop}
              data-cursor="Top"
              className="shrink-0 rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-bold transition-colors hover:border-primary hover:bg-primary"
            >
              {dict.footer.backToTop}
            </button>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-16 md:flex-row md:items-center">
            <div>
              <p className="font-sans text-sm font-bold uppercase tracking-wide text-white/40">
                {dict.footer.newsletterHeading}
              </p>
              <p className="mt-2 max-w-sm text-white/60">{dict.footer.newsletterSubtext}</p>
            </div>
            <div className="w-full md:max-w-sm">
              <NewsletterForm source="site-footer" dark compact />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
            {FOOTER_COLUMNS.map((col) => (
              <div key={pick(col.title)}>
                <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-white/40">
                  {pick(col.title)}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="font-sans text-base text-white/80 transition-colors hover:text-secondary"
                      >
                        {pick(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-white/40">
                {dict.footer.socialsHeading}
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
              © {new Date().getFullYear()} {SITE.name}. {dict.footer.copyrightSuffix}
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
