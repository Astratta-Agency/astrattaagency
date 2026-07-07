import type { AccordionItem } from '@/components/ui/Accordion'

// NOTE: timeline and pricing answers below are written without specific
// weeks/dollar figures on purpose — confirm real numbers with the client
// before launch, then tighten this copy (see working-method rule: never
// invent stats, client names, or prices).
export const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'How long does a website take?',
    answer:
      "It depends on scope — a single landing page moves much faster than a multi-page site with custom features. You'll get a firm timeline after the audit, before any work starts.",
  },
  {
    question: 'How much does a website cost in Dallas?',
    answer:
      'Pricing depends on scope, not a one-size-fits-all package. Astratta is boutique and remote-first, so you get senior-level work without traditional agency overhead — you\'ll get a clear, itemized quote after the audit.',
  },
  {
    question: "What's included in the audit?",
    answer:
      'A full review of your current site (or lack of one): performance, mobile experience, messaging clarity, conversion paths, and SEO fundamentals — plus a prioritized action plan of what to fix first and why.',
  },
  {
    question: 'Do you work only with Dallas businesses?',
    answer:
      "Dallas–Fort Worth is home base and where most of our clients are, but Astratta is remote-first — we work with startups and small/mid businesses anywhere, industrial, retail, and service companies alike.",
  },
  {
    question: 'I have traffic but no leads — can you fix that?',
    answer:
      "That's usually a conversion problem, not a traffic problem — and it's exactly what the audit is built to diagnose. We look at messaging, page speed, mobile UX, and funnel friction to find where visitors are dropping off.",
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. After launch we can stay on for maintenance, iteration, and ongoing digital marketing so the site keeps improving instead of going stale.',
  },
]
