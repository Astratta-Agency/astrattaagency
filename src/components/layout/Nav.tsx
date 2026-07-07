import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { NAV_LINKS } from '@/lib/constants'
import { EASE } from '@/lib/animations'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function Nav() {
  const { direction, scrolled } = useScrollDirection()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
          <Link to="/" className="font-sans text-xl font-extrabold tracking-tight">
            Astratta
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-sans text-sm font-semibold text-ink/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <MagneticButton
              as={Link}
              to="/audit"
              className="rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-primary"
            >
              Get a free audit
            </MagneticButton>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + NAV_LINKS.length * 0.06 }}
              >
                <Link
                  to="/audit"
                  className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-sans text-base font-bold text-white"
                >
                  Get a free audit
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
