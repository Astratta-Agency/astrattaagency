export const home = {
  hero: {
    ticker: ['Med Spas', 'Home Improvement', 'Restaurants', 'Real Estate'],
    pills: ['med spas', 'home improvement', 'restaurants', 'real estate'],
    headline1: 'Websites that turn traffic into',
    headline2: 'clients.',
    subtext:
      'Astratta builds high-converting websites and marketing systems for Dallas–Fort Worth businesses — designed to generate leads, not just look good.',
    ctaBookAudit: 'Get your diagnostic — $297',
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
  howItWorksBlock: {
    eyebrow: 'How it works',
    heading: 'One system. Not a menu of services.',
    link: 'See how it works',
  },
  industriesBlock: {
    eyebrow: 'Industries',
    heading: 'We know your business before the first call.',
    items: [
      { name: 'Med Spas', text: 'Lower cost per consultation, raise show-up rate.', href: '/industries/med-spa' },
      { name: 'Home Improvement', text: 'Every missed call is a job lost to your competitor.', href: '/industries/home-improvement' },
      { name: 'Restaurants', text: 'Fill the slow days, not the follower count.', href: '/industries/restaurants' },
      { name: 'Real Estate', text: 'Long nurture, personal brand, database reactivation.', href: '/industries/real-estate' },
    ],
  },
  aboutStats: {
    founderCaption: 'Hisbelis Vargas — Founder',
    eyebrow: 'About Astratta',
    heading: 'A founder-led studio. Zero agency bloat.',
    body: 'Astratta is a boutique studio in Dallas–Fort Worth. Founder-led on every project — no account managers, no handoffs to juniors. Senior-level strategy and execution at a fraction of big-agency overhead.',
    ctaBookAudit: 'Get your diagnostic — $297',
    ctaMoreAbout: 'More about the studio',
  },
  featuredWork: {
    eyebrow: 'Featured Work',
    heading: 'Real projects, real outcomes.',
    viewAll: 'View all work',
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
      {
        text: "Not sure whether the problem is your site, your traffic, or your follow-up? That's what ",
      },
      { text: 'the diagnostic', to: '/diagnostic' },
      {
        text: ' answers — seven days of analysis on your funnel, tracking and local presence, with the ten fixes that matter most ranked by return. From there, our digital marketing systems for Dallas–Fort Worth small businesses combine content, paid ads and follow-up automation into one measured pipeline — judged on leads and cost per lead, not likes, not impressions.',
      },
    ],
  },
  finalCta: {
    heading1: "Let's find out why your site isn't",
    heading2: 'converting.',
    submitLabel: 'Get your diagnostic — $297',
  },
}
