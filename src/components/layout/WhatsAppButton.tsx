import { motion } from 'framer-motion'
import { SITE } from '@/lib/constants'

/**
 * Floating WhatsApp CTA, pinned bottom-right. Sits below the mobile nav
 * overlay (z-40) so it never fights the menu, and above regular page content.
 */
export function WhatsAppButton() {
  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="Chat"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 32 32" className="size-7 fill-white" aria-hidden="true">
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.258.596 4.44 1.727 6.36L3.2 28.8l6.6-1.687a12.74 12.74 0 0 0 6.204 1.583h.004c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.696-12.804-12.696Zm0 23.36a10.5 10.5 0 0 1-5.36-1.468l-.384-.228-3.916 1 1.045-3.815-.25-.392a10.54 10.54 0 0 1-1.615-5.657c0-5.822 4.738-10.56 10.564-10.56 5.822 0 10.56 4.738 10.56 10.56s-4.738 10.56-10.644 10.56Zm5.79-7.912c-.316-.158-1.874-.925-2.164-1.03-.29-.106-.502-.158-.713.158-.211.317-.818 1.03-1.003 1.242-.184.211-.369.238-.686.08-.316-.159-1.336-.492-2.545-1.568-.941-.838-1.577-1.874-1.762-2.19-.184-.317-.02-.488.139-.646.142-.142.316-.37.475-.554.158-.185.211-.317.316-.528.106-.211.053-.396-.026-.554-.08-.159-.713-1.716-.977-2.35-.257-.617-.518-.533-.713-.543-.184-.008-.396-.01-.607-.01a1.166 1.166 0 0 0-.845.396c-.29.317-1.108 1.083-1.108 2.64s1.134 3.062 1.293 3.274c.158.211 2.232 3.408 5.407 4.78.756.327 1.346.522 1.806.668.759.242 1.45.208 1.996.126.609-.091 1.874-.766 2.138-1.505.264-.74.264-1.374.185-1.506-.08-.132-.29-.211-.607-.37Z" />
      </svg>
    </motion.a>
  )
}
