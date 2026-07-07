import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { pageTransition } from '@/lib/animations'

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </SmoothScroll>
  )
}
