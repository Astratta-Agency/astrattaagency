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

/** About-page FAQ — targets AI/local-search queries about the studio and its founder, not services/pricing. */
export const ABOUT_FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'Who is behind Astratta Agency?',
    answer:
      'Astratta Agency was founded by Hisbelis Vargas, who leads strategy and execution on every engagement, alongside a small senior team including a dedicated community manager. Every project is founder-led from start to finish.',
  },
  {
    question: 'Where is Astratta Agency located?',
    answer:
      'Astratta Agency is based in Dallas–Fort Worth, Texas, and works remotely with clients across the region and beyond. Most current clients are DFW-area startups and small businesses in industrial, retail, and service industries, though the studio takes on remote projects nationwide.',
  },
  {
    question: 'What makes Astratta different from other Dallas agencies?',
    answer:
      'Astratta is a boutique, founder-led studio instead of a layered agency — no account managers, no junior staff handing off your project. You work directly with the founder on strategy, design, and build, which means senior-level work at a fraction of typical agency overhead.',
  },
  {
    question: 'What industries does Astratta work with?',
    answer:
      'Astratta primarily works with startups and small-to-mid businesses in industrial, retail, service, food and hospitality, and professional-services industries across Dallas–Fort Worth. The common thread is businesses that need a conversion-focused website or marketing system, not just a good-looking one.',
  },
  {
    question: 'How do I start working with Astratta?',
    answer:
      "Start with a free website audit — a review of your current site's performance, mobile experience, messaging, and conversion paths, plus a prioritized action plan. From there you'll get a clear scope and timeline before any paid work begins.",
  },
  {
    question: 'Does Astratta manage social media?',
    answer:
      'Yes. Astratta offers social media management led by a dedicated community manager — content, engagement, and lead generation measured by leads and cost per lead, not likes.',
  },
]
