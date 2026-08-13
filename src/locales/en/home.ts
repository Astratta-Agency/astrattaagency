export const home = {
  hero: {
    ticker: ['Web Development', 'Digital Marketing', 'Graphic Design', 'Website Audits'],
    pills: ['web development', 'digital marketing', 'graphic design'],
    headline1: 'Websites that turn traffic into',
    headline2: 'clients.',
    subtext:
      'Astratta builds high-converting websites and marketing systems for Dallas–Fort Worth businesses — designed to generate leads, not just look good.',
    ctaBookAudit: 'Book a free audit',
    trustedBy: 'Trusted by DFW startups and small businesses',
  },
  painPoints: {
    eyebrow: 'Sound familiar?',
    statement: "Most businesses don't have an effort problem. They have a system problem.",
    /** Word indices (after `statement.split(' ')`) to render highlighted — the second "problem." only. */
    highlightIndices: [10, 11],
    points: [
      "You've got traffic, but nobody's leaving their info or buying.",
      "Your site looks like it's from 2015 — or loads so slow people leave before they see it.",
      "You post on social, but it's not producing a single qualified lead.",
      "You switch up your marketing every month because the last thing 'didn't work.'",
    ],
    closingLine: "This doesn't get fixed with more ads. It gets fixed with a system that converts.",
  },
  servicesGrid: {
    eyebrow: 'Our Services',
    heading: 'Built to convert, not just to look good.',
    learnMore: 'Learn more →',
  },
  aboutStats: {
    founderCaption: 'Hisbelis Vargas — Founder',
    eyebrow: 'About Astratta',
    heading: 'A founder-led studio. Zero agency bloat.',
    body: 'Astratta is a boutique studio in Dallas–Fort Worth. Founder-led on every project — no account managers, no handoffs to juniors. Senior-level strategy and execution at a fraction of big-agency overhead.',
    ctaBookAudit: 'Book a free audit',
    ctaMoreAbout: 'More about the studio',
  },
  featuredWork: {
    eyebrow: 'Featured Work',
    heading: 'Real projects, real outcomes.',
    viewAll: 'View all work',
  },
  process: {
    eyebrow: 'Process',
    heading: 'From audit to launch.',
  },
  testimonials: {
    eyebrow: 'What clients say',
    showTestimonial: (n: number) => `Show testimonial ${n}`,
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions, answered.',
  },
  localSeo: {
    paragraph1: [
      {
        text: "Astratta is a Dallas web design studio that builds sites meant to convert, not just to exist. Most local businesses we meet already have a website — the problem is it was never built around a clear next step for the visitor. Our ",
      },
      { text: 'web development', to: '/services/web-development' },
      {
        text: " work starts with that gap: messaging that says what you actually do, load times that don't lose mobile visitors, and a path from homepage to contact form that makes sense. Dallas–Fort Worth is home base, but the standard doesn't change for clients anywhere.",
      },
    ],
    paragraph2: [
      { text: 'Not sure whether the problem is your site, your traffic, or your follow-up? Start with a free ' },
      { text: 'website audit', to: '/audit' },
      {
        text: ' — a straight read on performance, messaging, and conversion paths for any Dallas–Fort Worth business, no obligation attached. From there, our ',
      },
      { text: 'digital marketing', to: '/services/digital-marketing' },
      {
        text: ' programs cover social media, paid ads, and full lead generation systems for small businesses in DFW, each measured against leads and cost per lead — not likes, not impressions.',
      },
    ],
  },
  finalCta: {
    heading1: "Let's find out why your site isn't",
    heading2: 'converting.',
    submitLabel: 'Request my audit',
  },
}
