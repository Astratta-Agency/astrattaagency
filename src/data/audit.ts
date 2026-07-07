export const AUDIT_CHECKLIST = [
  {
    title: 'Performance',
    description: 'Load time, Core Web Vitals, and what slow pages are costing you in lost visitors.',
  },
  {
    title: 'Mobile experience',
    description: 'How your site actually behaves on a phone — where most of your traffic comes from.',
  },
  {
    title: 'Messaging clarity',
    description: 'Whether a first-time visitor understands what you do and why to choose you in 5 seconds.',
  },
  {
    title: 'Conversion paths',
    description: 'Where visitors are supposed to take action — and where they get stuck or drop off.',
  },
  {
    title: 'SEO fundamentals',
    description: 'Technical and on-page basics that determine whether you show up in local search at all.',
  },
  {
    title: 'Prioritized action plan',
    description: "What's broken, what it's costing you, and the order to fix it in — no vague advice.",
  },
] as const

export const AUDIT_STEPS = [
  {
    number: '/01',
    title: 'Request your audit',
    description: 'Tell us about your site and goals using the form below — takes under two minutes.',
  },
  {
    number: '/02',
    title: 'We review',
    description: 'We go through performance, UX, messaging, and SEO fundamentals against what converts.',
  },
  {
    number: '/03',
    title: 'You get the plan',
    description: "A prioritized, plain-English action plan — what's broken, what it costs you, and how to fix it.",
  },
] as const
