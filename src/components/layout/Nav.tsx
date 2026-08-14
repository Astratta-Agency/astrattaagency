import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '@/components/ui/Link'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { NAV_LINKS } from '@/lib/constants'
import { EASE } from '@/lib/animations'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import logo from '@/assets/logo.png'

export function Nav() {
  const { direction, scrolled } = useScrollDirection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const location = useLocation()
  const { dict, pick } = useLanguage()

  const [lastPathname, setLastPathname] = useState(location.pathname)
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const hidden = direction === 'down' && scrolled && !menuOpen

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled || menuOpen ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Astratta Agency" className="h-7 w-auto md:h-8" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={link.href}
                    aria-expanded={openMenu === link.href}
                    onFocus={() => setOpenMenu(link.href)}
                    className="flex items-center gap-1.5 font-sans text-sm font-semibold text-ink/80 transition-colors hover:text-primary"
                  >
                    {pick(link.label)}
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: openMenu === link.href ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="text-[10px]"
                    >
                      ▾
                    </motion.span>
                  </Link>

                  <AnimatePresence>
                    {openMenu === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="absolute left-0 top-full w-56 pt-4"
                      >
                        <div className="flex flex-col rounded-2xl border border-ink/10 bg-white p-2 shadow-lg shadow-ink/5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="rounded-xl px-3 py-2.5 font-sans text-sm font-semibold text-ink/70 transition-colors hover:bg-neutral/60 hover:text-primary"
                            >
                              {pick(child.label)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-sans text-sm font-semibold text-ink/80 transition-colors hover:text-primary"
                >
                  {pick(link.label)}
                </Link>
              ),
            )}
            <LanguageSwitch />
            <MagneticButton
              as={Link}
              to="/diagnostic"
              className="rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-primary"
            >
              {dict.nav.ctaAudit}
            </MagneticButton>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="relative z-10 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3.5 : 0 }}
              className="h-[2px] w-6 bg-ink"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3.5 : 0 }}
              className="h-[2px] w-6 bg-ink"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    className="block py-3 font-sans text-4xl font-extrabold text-white"
                  >
                    {pick(link.label)}
                  </Link>
                  {link.children && (
                    <div className="flex flex-col gap-1 pb-2 pl-5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="py-1 font-sans text-lg font-bold text-white/60"
                        >
                          {pick(child.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + NAV_LINKS.length * 0.06 }}
                className="mt-6 flex items-center gap-4"
              >
                <Link
                  to="/diagnostic"
                  className="inline-block rounded-full bg-primary px-6 py-3 font-sans text-base font-bold text-white"
                >
                  {dict.nav.ctaAudit}
                </Link>
                <LanguageSwitch dark />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
