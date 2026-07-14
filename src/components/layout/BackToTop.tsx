import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from '@/components/layout/SmoothScroll'

/**
 * Floating "back to top" button, stacked directly above the WhatsApp button
 * (same right-edge column, own row) so the two never overlap. Only shows
 * once the user has scrolled roughly a viewport down.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          data-cursor="Top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-30 flex size-12 items-center justify-center rounded-full bg-ink text-white shadow-lg shadow-black/20 md:bottom-28 md:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
