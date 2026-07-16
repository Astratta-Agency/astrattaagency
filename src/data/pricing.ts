export type PricingTier = {
  slug: string
  name: string
  price: string // e.g. "$2,000" or "From $8,500"
  cadence?: string // e.g. "one-time", "one-time + $100/mo", "$450/mo"
  recommended?: boolean
  bestFor: string
  features: string[]
  notIncluded?: string[]
}

export type AddOn = {
  name: string
  price: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type Frustration = {
  text: string
}

export type ProcessStep = {
  number: string // "/01", "/02", etc.
  title: string
  description: string
}

export type ProofBlock = {
  /** slug into CASE_STUDIES — pulls real stats, testimonial, and images from there. Required when real proof exists. */
  caseStudySlug?: string
  /** used ONLY when no dedicated case study exists yet (Paid Ads, Lead Generation) — an honest, non-fabricated substitute, e.g. process/guarantee-based proof instead of a stats block. Never a placeholder stat. */
  fallbackNote?: string
}

export type ServicePage = {
  slug: string
  parentSlug?: string // for sub-pages nested under a hub, e.g. "digital-marketing"
  number: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string // 40-60 word direct-answer opening paragraph, definition-first
  tiers: PricingTier[]
  addOns?: AddOn[]
  faqs: FaqItem[]
  painHeadline?: string // pain-first H1, replaces the current feature-first h1 on the page (keep `h1` field itself untouched — it's used elsewhere/SEO; this is a new display-only override)
  frustrations?: Frustration[]
  processSteps?: ProcessStep[]
  proof?: ProofBlock
  benefits?: string[] // outcome-oriented, distinct from tier `features` (which are feature checklists)
}

export const WEB_DEVELOPMENT_PAGE: ServicePage = {
  slug: 'web-development',
  number: '/01',
  title: 'Web Development',
  metaTitle: 'Web Development Pricing — Landing Pages & Websites in Dallas, TX | Astratta',
  metaDescription:
    "Landing pages from $800, business websites from $2,000, and full SEO-ready sites from $3,500 — transparent pricing for Dallas–Fort Worth businesses. See what's included in each tier.",
  h1: 'Web development pricing, no guessing games.',
  intro:
    "Astratta builds four types of web projects for Dallas businesses: single-page landing sites, multi-page business websites, SEO-optimized sites, and multi-step conversion funnels. Prices below are flat and public — pick the tier that matches your goal, or request a free audit first if you're not sure which one fits.",
  painHeadline: "Your site gets traffic. It just doesn't turn into leads.",
  frustrations: [
    { text: 'Visitors land, scroll, and leave — no clear next step anywhere on the page.' },
    {
      text: "Your current site takes 6+ seconds to load on mobile, and most people never wait that long.",
    },
    { text: "You're not sure what your own homepage is supposed to convince someone to do." },
    {
      text: 'Every page looks like a template because it is one — nothing about it says "this is a real Dallas business."',
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Audit & strategy',
      description:
        'We map your current funnel (or lack of one), your competitors, and exactly what a visitor needs to see to take action.',
    },
    {
      number: '/02',
      title: 'Copy before design',
      description:
        'We write the conversion path first — headline, value prop, CTA sequence — so design has something worth designing around.',
    },
    {
      number: '/03',
      title: 'Build & instrument',
      description:
        'Mobile-first build with Meta Pixel, GA4, and UTMs wired in from day one — so results are measurable from launch, not guessed at later.',
    },
    {
      number: '/04',
      title: 'Launch & iterate',
      description:
        'You get 2 rounds of revisions built in, plus post-launch support to adjust based on real visitor behavior.',
    },
  ],
  proof: {
    caseStudySlug: 'eventos-ensuenos',
  },
  benefits: [
    "A site that explains what you do in the first 5 seconds, not the third scroll.",
    "Mobile-first build — most of your traffic is on a phone, so that's what we design for first.",
    "Analytics wired in from launch — you'll know what's working within weeks, not guess for months.",
    'A structure built to add SEO, ads, or e-commerce later without a rebuild.',
  ],
  tiers: [
    {
      slug: 'landing-essentials',
      name: 'Landing Essentials',
      price: '$800',
      cadence: 'one-time',
      bestFor: 'Startups that need a fast page to run ads to.',
      features: [
        'One landing page (Lovable.dev-built): hero + value prop + benefits + CTA',
        'Conversion-focused copywriting (H1 + subheadline + buttons)',
        'Lead capture form (name, email, phone)',
        'Mobile-responsive',
        'Meta Pixel installed',
        'Google Analytics 4 setup',
        '2 rounds of revisions',
        'Hosted on Vercel or similar',
      ],
      notIncluded: [
        'Domain registration',
        'Advanced SEO',
        'Ads management',
        'Complex integrations',
      ],
    },
    {
      slug: 'website-core',
      name: 'Website Core',
      price: '$2,000',
      cadence: 'one-time + $100/mo maintenance',
      recommended: true,
      bestFor: 'SMBs that need a professional multi-page site.',
      features: [
        '5-7 pages (home, services, about, contact, blog base, FAQ)',
        'Per-page copywriting',
        'Branding applied (logo, colors, typography)',
        'Responsive design',
        'Meta Pixel + GA4 + UTMs',
        'Contact form',
        'Google Business Profile integration',
        '2 months of post-launch support (bugs, minor changes)',
      ],
      notIncluded: ['Strategic SEO', 'Blog content', 'Ads'],
    },
    {
      slug: 'website-seo-foundation',
      name: 'Website + SEO Foundation',
      price: '$3,500',
      cadence: 'one-time + $200/mo (blog + optimization)',
      bestFor: 'Businesses that want to actually show up in Google.',
      features: [
        'Everything in Website Core',
        'Keyword research (20 terms)',
        'On-page SEO (meta tags, H1-H3 structure, speed)',
        '10 optimized blog posts (1/week for 2 months)',
        'Internal linking strategy',
        'Schema markup (local business)',
        'Google Search Console + Ahrefs setup',
        'Monthly ranking report',
      ],
      notIncluded: ['Paid ads', 'Aggressive link building'],
    },
    {
      slug: 'conversion-funnel',
      name: 'Conversion Funnel (3-5 steps)',
      price: '$2,500',
      cadence: 'setup + $300/mo (management + optimization)',
      bestFor: 'Coaches, consultants, and SaaS companies that sell services, not products.',
      features: [
        'Landing page (step 1)',
        'Lead magnet (PDF/checklist)',
        'Thank-you page + automated email',
        '5-7 email nurture sequence',
        'CRM setup',
        'Form analytics (abandonment, conversion)',
        'Funnel conversion report (visitors → leads → MQLs)',
        '3 monthly optimizations',
      ],
      notIncluded: ['Ad spend (compatible with Meta Ads add-on)'],
    },
  ],
  addOns: [
    { name: 'Extra page', price: '$400' },
    { name: 'CRM integration (Notion/Zapier)', price: '$250' },
    { name: 'Advanced multi-step/conditional form', price: '$300' },
    { name: 'SEO audit of an existing site', price: '$400' },
    { name: 'Extra optimized blog post', price: '$150/unit' },
  ],
  faqs: [
    {
      question: 'How much does a website cost in Dallas?',
      answer:
        "Astratta's web projects range from $800 for a single landing page to $3,500+ for a full multi-page site with SEO. Most Dallas–Fort Worth small businesses land in the $2,000-$3,500 range for a professional site with ongoing support. Final pricing depends on page count and features — request a free audit for an exact quote.",
    },
    {
      question: "What's the difference between a landing page and a website?",
      answer:
        'A landing page is a single page built around one action — usually to support an ad campaign. A website (Website Core and up) has multiple pages — home, services, about, contact — and works as your permanent online presence, not just a campaign tool.',
    },
    {
      question: 'Do I need SEO if I already have a website?',
      answer:
        "If your current site isn't showing up in Google search results, yes. The Website + SEO Foundation tier adds keyword research, on-page optimization, and blog content designed to rank — most clients see initial ranking movement within 60-90 days.",
    },
    {
      question: 'Can I upgrade from a landing page to a full website later?',
      answer:
        'Yes. Many clients start with Landing Essentials to launch fast, then upgrade to Website Core or SEO Foundation once the offer is validated. We credit relevant work from the landing page toward the upgrade.',
    },
    {
      question: "What's not included in these prices?",
      answer:
        "Domain registration, ad spend, and complex third-party integrations are billed separately in all tiers — see the 'not included' list on each plan. Add-ons like extra pages or CRM integration are priced individually above.",
    },
  ],
}

export const ECOMMERCE_PAGE: ServicePage = {
  slug: 'ecommerce',
  number: '/01a',
  title: 'E-commerce',
  metaTitle: 'Shopify E-commerce Website Pricing — Dallas, TX | Astratta Agency',
  metaDescription:
    'E-commerce stores from $2,800 for boutiques up to fully migrated, CRO-optimized stores for established retailers. Shopify builds with payments, shipping, email flows, and social selling built in.',
  h1: "E-commerce that's built to sell, not just to exist.",
  intro:
    'Astratta builds Shopify-based online stores for Dallas-area retailers and product businesses — from a 25-product boutique launch to a full migration and CRO program for stores doing $10k+/month. Every tier includes payments, tax setup, and shipping configured for Texas from day one.',
  painHeadline: "Your products are ready. Your store isn't selling them.",
  frustrations: [
    {
      text: "You're taking orders through Instagram DMs and losing track of who paid and who didn't.",
    },
    {
      text: 'Your current store looks fine on desktop and falls apart on the phone, where most of your buyers actually are.',
    },
    { text: 'Checkout has so much friction that people add to cart and never finish.' },
    {
      text: "You migrated platforms once and lost search rankings for months — you're not doing that again without a plan.",
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Store audit',
      description:
        'We review your current catalog, checkout flow, and (if migrating) exactly what needs to move without breaking SEO.',
    },
    {
      number: '/02',
      title: 'Build on Shopify',
      description:
        'Theme, product pages, payments, tax, and shipping configured for Texas from day one — not left for you to figure out post-launch.',
    },
    {
      number: '/03',
      title: 'Connect the channels',
      description:
        "Meta Pixel, GA4 e-commerce events, and — depending on tier — Instagram Shopping and Google Merchant Center, so the store isn't an island.",
    },
    {
      number: '/04',
      title: 'Train & hand off',
      description:
        "You get a recorded training video and documentation, so adding products or running a sale doesn't require calling us every time.",
    },
  ],
  benefits: [
    'Payments, tax, and shipping configured correctly for Texas from launch — no post-launch scramble.',
    'Mobile-first checkout — friction removed where most of your buyers actually are.',
    "Migration with 301 redirects when moving platforms, so you don't lose existing search rankings.",
    'Real e-commerce analytics from day one (cart, checkout, purchase funnel) — not just page views.',
  ],
  tiers: [
    {
      slug: 'ecommerce-starter',
      name: 'E-commerce Starter',
      price: '$2,800',
      cadence: 'one-time + $150/mo',
      bestFor:
        'Local boutiques and retailers selling only through Instagram/WhatsApp today, up to 25 products.',
      features: [
        'Full Shopify setup (premium theme adapted to your branding)',
        'Up to 25 products loaded (conversion copy + optimized photos, client provides photos)',
        'Home, collections, product, cart, checkout, and policy pages',
        '1 payment gateway (Shopify Payments/Stripe) + Texas tax configuration',
        'Shipping setup (zones, rates, local pickup)',
        'Mobile-responsive + speed-optimized',
        'Meta Pixel + GA4 with e-commerce events',
        'Order confirmation + basic abandoned cart email',
        '1-hour training + recorded video',
        '2 post-launch revisions',
      ],
      notIncluded: [
        'Strategic SEO',
        'Ads',
        'Migrations',
        'Product photography',
        'Advanced email flows',
      ],
    },
    {
      slug: 'ecommerce-growth',
      name: 'E-commerce Growth',
      price: '$5,000',
      cadence: 'one-time + $300/mo',
      recommended: true,
      bestFor:
        'DFW retailers with 26-150 products who want the store to be a serious sales channel.',
      features: [
        'Everything in Starter',
        'Up to 150 products with variants (size, color, bundles)',
        'Fully custom theme design (not a generic template)',
        'On-page SEO (20 keywords, meta tags, optimized collections, Product schema, Search Console)',
        'Email flows (welcome 3-email series + abandoned cart 3-email + post-purchase 2-email)',
        'Reviews app + cart/checkout upsells and cross-sells',
        'Multiple payment gateways (Stripe + PayPal + Shop Pay)',
        'Social selling (Instagram Shopping, Facebook Shop, Google Merchant Center)',
        'Conversion dashboard (visits → cart → checkout → purchase)',
        '2-hour training + operations documentation',
        '1 month of post-launch support',
      ],
      notIncluded: [
        'Ads management (compatible with Ads + Retargeting add-on)',
        'Blog content',
        'ERP/POS integrations',
      ],
    },
    {
      slug: 'ecommerce-pro',
      name: 'E-commerce Pro',
      price: 'From $8,500',
      cadence: 'one-time + $500/mo',
      bestFor:
        'Stores with 150+ products, $10k+/month revenue, or migrating from WooCommerce/Wix/Square. Final price set after a paid audit ($400, credited to the project).',
      features: [
        'Everything in Growth',
        'Unlimited catalog + full migration (products, customers, orders) with 301 redirects (zero SEO loss)',
        'Advanced navigation (filters, predictive search, automated collections)',
        'Full CRO program (A/B testing on PDP/checkout, heatmaps, ongoing speed optimization)',
        'Automations (n8n): inventory alerts, CRM/Notion sync, operational notifications',
        'Full email marketing (5 flows + 2 monthly campaigns)',
        'Subscriptions or B2B/wholesale portal (if applicable)',
        'Blog base + 4 initial SEO posts',
        'Weekly executive report + monthly 1-hour strategy call',
        'Direct WhatsApp access (24h response)',
      ],
      notIncluded: ['Ad spend budget', 'Product photography'],
    },
  ],
  addOns: [
    { name: 'Extra block of 25 products (upload + copy)', price: '$150' },
    { name: 'Standalone migration (no rebuild)', price: 'From $800' },
    { name: 'POS/ERP integration (Square, QuickBooks)', price: 'From $400' },
    { name: 'Additional email flow', price: '$150' },
    { name: 'Product photography session (2h)', price: '$250' },
    { name: 'Campaign/promo landing page', price: '$400' },
    { name: 'Existing e-commerce audit (CRO + SEO + speed)', price: '$400' },
  ],
  faqs: [
    {
      question: 'How much does a Shopify store cost in Dallas?',
      answer:
        "Astratta's Shopify builds start at $2,800 one-time plus $150/month for a 25-product boutique launch, and scale to $5,000+ for stores with SEO and email automation, or $8,500+ for full migrations and CRO programs. Monthly plans cover updates, new products, and reporting.",
    },
    {
      question: 'Do you migrate stores from WooCommerce, Wix, or Square?',
      answer:
        'Yes — full migrations (products, customers, order history) with 301 redirects to protect existing SEO rankings are included in the E-commerce Pro tier. We run a paid audit first ($400, credited to your project) to scope the migration accurately before quoting a final price.',
    },
    {
      question: "What's included in the monthly e-commerce maintenance fee?",
      answer:
        'Monthly plans include software updates, bug fixes, new product uploads (5-15/month depending on tier), and a sales/conversion report. Growth and Pro tiers add CRO testing, email flow optimization, and priority support.',
    },
    {
      question: 'Can I sell on Instagram and Facebook too?',
      answer:
        'Yes — E-commerce Growth and Pro tiers include Instagram Shopping, Facebook Shop, and Google Merchant Center setup, so your Shopify catalog syncs to social and free Google Shopping listings.',
    },
    {
      question: 'Do you handle product photography?',
      answer:
        "Photography isn't included in any tier by default — clients provide product photos, or add a 2-hour photography session for $250. This keeps the base price accessible while giving you the option to add it.",
    },
  ],
}

export const SOCIAL_MEDIA_PAGE: ServicePage = {
  slug: 'social-media',
  parentSlug: 'digital-marketing',
  number: '/02a',
  title: 'Social Media',
  metaTitle: 'Social Media Management Pricing — Dallas, TX | Astratta Agency',
  metaDescription:
    'Instagram, Facebook, and TikTok management from $450/month for Dallas businesses — posts, reels, stories, and monthly reporting. Add a lead magnet funnel to any plan.',
  h1: 'Social media that builds an audience worth selling to.',
  intro:
    'Astratta manages Instagram, Facebook, and TikTok for Dallas–Fort Worth businesses across four tiers — from a lightweight presence plan to a full authority program with community management and weekly executive reporting. Every plan includes a monthly content calendar and real metrics, not just post counts.',
  painHeadline: "You're posting every week. Nothing is happening because of it.",
  frustrations: [
    { text: 'You post consistently and your follower count barely moves.' },
    { text: "You can't tell if any of it is actually bringing in customers, or just... existing." },
    {
      text: "Every post takes an hour to plan, shoot, and edit — time you don't have to spend guessing.",
    },
    { text: 'You\'re on Instagram because you\'re "supposed to be," not because you have a plan for it.' },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Audience & pillar strategy',
      description:
        "We define who you're actually talking to and 3-4 content pillars, so every post has a job instead of being filler.",
    },
    {
      number: '/02',
      title: 'Film & produce',
      description:
        "On-site filming sessions turn into posts, stories, and reels — produced for how each platform's algorithm actually behaves.",
    },
    {
      number: '/03',
      title: 'Publish & engage',
      description:
        "Consistent posting cadence plus daily community management on the tiers that include it — comments and DMs don't sit unanswered.",
    },
    {
      number: '/04',
      title: 'Report on what matters',
      description:
        'Monthly reports track reach, engagement, and traffic — not just a vanity follower count.',
    },
  ],
  proof: {
    caseStudySlug: 'perreando-hotdog-social-media',
  },
  benefits: [
    "A documented content strategy, not a guess about what to post this week.",
    'Real metrics reporting (reach, engagement, traffic) — not just "posts published."',
    "Platform-specific content — what works on TikTok isn't copy-pasted onto LinkedIn.",
    "A lead magnet + automation option on Growth tier and up, so social can generate leads without ad spend.",
  ],
  tiers: [
    {
      slug: 'social-presence',
      name: 'Social Presence',
      price: '$450',
      cadence: 'per month',
      bestFor: 'Businesses that want a consistent presence without urgency around leads.',
      features: [
        'Instagram + Facebook',
        '8 posts/month (carousel + static)',
        '5 stories/week',
        '2 reels/month (creative direction + editing)',
        'Documented monthly content strategy',
        'Bio/hashtag/CTA optimization',
        '1 strategy session/month (30 min)',
        'Monthly metrics report (reach, engagement, traffic)',
        '2 hours of on-site filming/month',
      ],
      notIncluded: ['Lead magnet', 'Ads', 'Email nurture'],
    },
    {
      slug: 'social-growth',
      name: 'Social Growth',
      price: '$750',
      cadence: 'per month',
      recommended: true,
      bestFor: 'Restaurants, salons, and retailers that want leads without running ads.',
      features: [
        'Instagram + Facebook + TikTok',
        '12 posts/month',
        'Daily stories',
        '4 reels/month',
        '4 hours of on-site filming/month',
        '1 monthly lead magnet (PDF/checklist/template)',
        'ManyChat setup (comment → automatic download)',
        '3-email welcome sequence via automation',
        'Daily community management (comments + DMs)',
        'Advanced report with recommendations',
        '1 strategy call/month (45 min)',
      ],
      notIncluded: ['Ads', 'Landing page', 'Full CRM'],
    },
    {
      slug: 'social-authority',
      name: 'Social Authority',
      price: '$1,200',
      cadence: 'per month',
      bestFor: 'Businesses that want to dominate their niche organically, without ad spend.',
      features: [
        'Instagram + Facebook + TikTok',
        '16 posts/month (multi-pillar)',
        'Daily stories',
        '6 reels/TikToks per month',
        '4 hours of on-site filming/month',
        'LinkedIn strategy (3-5 posts/week if applicable)',
        'Complete Google Business Profile + reviews management',
        'Monthly engagement campaign (contest/survey)',
        'Daily community management',
        'Weekly executive report',
        'Direct WhatsApp access (24h response)',
        '1 strategy call/month (1 hour)',
      ],
      notIncluded: ['Paid traffic', 'Optimized landing page', 'Full CRM'],
    },
    {
      slug: 'social-lead-magnet-deluxe',
      name: 'Social + Lead Magnet Deluxe',
      price: '$750',
      cadence: 'per month',
      bestFor: 'Coaches, consultants, and SMBs that want leads without paid ads.',
      features: [
        'Everything in Social Growth',
        'Premium lead magnet (Notion template, ebook, or checklist)',
        'Full ManyChat + n8n integration',
        '7-day nurture email sequence (automated)',
        'Simple lead-magnet landing page (built in Lovable)',
        'Conversion dashboard (comment → captured email)',
        'Weekly copy optimization',
      ],
      notIncluded: ['Paid ads'],
    },
  ],
  addOns: [
    { name: 'Extra filming session (2h)', price: '$100' },
    { name: 'Extra edited reel', price: '$55' },
    { name: 'Comment/DM management (no plan)', price: '$60/mo' },
    { name: 'Strategic consulting (1h)', price: '$150' },
  ],
  faqs: [
    {
      question: 'How much does social media management cost in Dallas?',
      answer:
        "Astratta's social media plans range from $450/month for a presence-only plan up to $1,200/month for a full multi-platform authority program with daily community management and weekly reporting. Most Dallas SMBs that want leads (not just presence) choose the $750/month Social Growth or Lead Magnet Deluxe tiers.",
    },
    {
      question: 'Can I get leads from social media without running ads?',
      answer:
        'Yes — the Social Growth and Social + Lead Magnet Deluxe tiers are built specifically for this: a monthly lead magnet plus ManyChat automation captures leads directly from comments and DMs, no ad budget required.',
    },
    {
      question: 'What platforms do you manage?',
      answer:
        'Instagram and Facebook are included in every tier. TikTok is added starting at the Social Growth tier. LinkedIn is available in the Social Authority tier for B2B and professional-services businesses.',
    },
    {
      question: 'How many posts do I get per month?',
      answer:
        'Post volume scales by tier: 8/month (Social Presence), 12/month (Social Growth or Lead Magnet Deluxe), or 16/month (Social Authority), plus stories and reels/TikToks on top of the post count.',
    },
  ],
}

/**
 * Standalone Paid Ads service (per-channel management fee + client-paid ad
 * spend). Distinct from the cheaper "Ads Scaling" tiers bundled inside the
 * Lead Generation System page — those are subsidized by the $1,200/mo Lead
 * Gen retainer, so don't merge the two pricing tables.
 */
export const PAID_ADS_PAGE: ServicePage = {
  slug: 'paid-ads',
  parentSlug: 'digital-marketing',
  number: '/02b',
  title: 'Paid Ads',
  metaTitle: 'Paid Ads Management Pricing — Meta & Google Ads in Dallas, TX | Astratta',
  metaDescription:
    'Meta and Google Ads management from $200/month plus ad spend for Dallas–Fort Worth businesses — prospecting, retargeting, and full-funnel campaigns with weekly reporting.',
  h1: "Ad spend that's accountable to a cost-per-lead number.",
  intro:
    'Astratta manages Meta and Google ad campaigns for Dallas businesses across four tiers — from cold-traffic prospecting to a full awareness-to-conversion funnel. Every plan separates our management fee from your ad budget, and reports against click-through rate, cost-per-click, and conversions weekly or bi-weekly.',
  painHeadline: "You're spending on ads. You couldn't tell me your cost per lead if I asked.",
  frustrations: [
    {
      text: "Your ad account shows spend and reach, but nobody can tell you what it actually cost to get one real lead.",
    },
    {
      text: "Campaigns launched months ago are still running unchanged because nobody's optimizing them.",
    },
    {
      text: "You're running ads to a page that wasn't built to convert, so the budget is doing twice the work it should.",
    },
    {
      text: "Every report you get is impressions and reach — numbers that don't tell you if it's working.",
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Audit the funnel',
      description:
        "Before spending a dollar, we check whether your landing page can actually convert the traffic we're about to send it.",
    },
    {
      number: '/02',
      title: 'Launch & segment',
      description:
        'Campaigns built around your real audience — DFW-specific targeting, not broad "everyone" spend.',
    },
    {
      number: '/03',
      title: 'Test & optimize',
      description:
        'Creative and copy A/B testing on a real cadence (weekly to daily depending on tier), not "set it and check next month."',
    },
    {
      number: '/04',
      title: 'Report against cost per lead',
      description:
        'Every report ties spend to CTR, CPC, and conversions — the numbers that tell you if the budget is working.',
    },
  ],
  benefits: [
    "Management fee and ad spend shown separately — you always know what you're paying us vs. paying Meta/Google.",
    'DFW-specific audience segmentation from tier 1, not generic broad targeting.',
    'Reporting tied to cost per lead, not just impressions and reach.',
    "A funnel check before launch — we'll tell you if your landing page needs work before we send it traffic.",
  ],
  tiers: [
    {
      slug: 'ads-prospecting',
      name: 'Ads Prospecting',
      price: '$200/mo fee',
      cadence: '+ $150-200/mo ad spend (recommended)',
      bestFor: 'Businesses that want fast traffic.',
      features: [
        '1 Meta Ads campaign (Facebook + Instagram)',
        'Basic DFW segmentation (age, interests, behaviors)',
        '2 creatives/month (design + copy)',
        'Bi-weekly report (CTR, CPC, conversions)',
        'Monthly optimization (audience adjustment, copy testing)',
      ],
      notIncluded: ['Landing page', 'Lead magnet', 'Nurture sequence'],
    },
    {
      slug: 'ads-retargeting-warm',
      name: 'Ads + Retargeting (Warm)',
      price: '$350/mo fee',
      cadence: '+ $250-350/mo ad spend (recommended)',
      recommended: true,
      bestFor: 'E-commerce and service businesses with urgency to convert.',
      features: [
        '1 prospecting (cold) campaign + 1 retargeting (warm) campaign',
        '4 creatives/month',
        'Advanced segmentation (custom audiences, basic lookalike)',
        'Weekly report (funnel: impression → click → conversion)',
        'Creative A/B testing',
        'Optimization 2x/week',
      ],
      notIncluded: ['Landing page', 'Lead magnet'],
    },
    {
      slug: 'ads-authority',
      name: 'Ads Authority (Full Stack)',
      price: '$600/mo fee',
      cadence: '+ $400-600/mo ad spend (recommended)',
      bestFor: 'Events, retail, and SaaS businesses with budget to scale.',
      features: [
        '3-4 simultaneous campaigns (top-of-funnel awareness + mid-funnel consideration + bottom-of-funnel retargeting)',
        '6 creatives/month',
        'Lookalike audiences',
        'Weekly executive report',
        'Daily optimization (bid, audience, placement)',
        'Advanced A/B testing (creative + copy + audience)',
        'Full remarketing (pixel + audience)',
      ],
    },
    {
      slug: 'google-ads',
      name: 'Google Ads (Search + Display)',
      price: '$300/mo fee',
      cadence: '+ $200-400/mo ad spend (recommended)',
      bestFor: 'B2B, legal, real estate, and professional services.',
      features: [
        'Search campaigns targeting relevant keywords',
        'Display/remarketing visual ads',
        '10 ad variations (headlines + descriptions)',
        'Weekly report (impressions, CTR, conversions, ROAS)',
        'Bid + keyword optimization',
        'Landing page optimization feedback',
      ],
      notIncluded: ['Landing page build'],
    },
  ],
  addOns: [
    { name: 'Extra creative (design + copy)', price: '$80/unit' },
    { name: 'New campaign launch', price: '$150' },
    { name: 'Advanced retargeting strategy', price: '$200' },
    { name: 'Pixel setup + tracking audit', price: '$150' },
    { name: 'Landing page optimization for ads', price: '$300' },
  ],
  faqs: [
    {
      question: 'How much does Meta or Google Ads management cost in Dallas?',
      answer:
        "Astratta's ad management fees range from $200/month (Ads Prospecting) to $600/month (Ads Authority), separate from your actual ad spend budget. Most Dallas SMBs start at $350/month (Ads + Retargeting) with a $250-350/month ad budget for a combined cold-and-warm-audience strategy.",
    },
    {
      question: "What's the minimum ad budget I need?",
      answer:
        'Recommended minimum ad spend starts at $150-200/month for the Prospecting tier and scales with each tier — this is separate from our management fee and is paid directly to Meta or Google, not to Astratta.',
    },
    {
      question: 'Do you need a landing page before running ads for me?',
      answer:
        "Yes, for best results — ads without a dedicated landing page convert at a much lower rate. If you don't have one, we can build one starting at $800 (see Web Development), or combine both into the Lead Generation System.",
    },
    {
      question: 'How is this different from the Lead Generation System?',
      answer:
        'Paid Ads is campaign management only — you bring the landing page and handle lead follow-up yourself. The Lead Generation System bundles ads with the landing page, lead magnet, social warm-up, and CRM follow-up into one $1,200/month program.',
    },
  ],
}

/**
 * Astratta's core offer. Structurally different from the other service
 * pages: one core system (tiers[0], rendered full-width/hero) plus two
 * optional add-ons (tiers[1..2], rendered smaller/secondary) rather than
 * parallel comparison tiers. The separate "Ads Scaling" 3-row mini-table
 * lives as page-local data in LeadGeneration.tsx, not here, since it's a
 * one-off shape (fee/budget/creatives/targeting/result columns) that doesn't
 * fit PricingTier and isn't reused anywhere else.
 */
export const LEAD_GENERATION_PAGE: ServicePage = {
  slug: 'lead-generation',
  parentSlug: 'digital-marketing',
  number: '/02c',
  title: 'Lead Generation System',
  metaTitle: 'Lead Generation System Pricing — Dallas, TX | Astratta Agency',
  metaDescription:
    'A complete lead generation system for Dallas startups and SMBs — landing page, ads, social warm-up, and lead magnet working together. From $1,200/month, minimum 15 qualified leads guaranteed by month 3.',
  h1: 'One system, built to deliver a number of leads — not just traffic.',
  intro:
    "The Lead Generation System is Astratta's core offer for Dallas businesses that need a predictable number of qualified leads per month. It combines a landing page, paid ads, social warm-up, and a lead magnet into one managed program — with a guaranteed minimum of 15 qualified leads and a cost-per-lead under $80 by month 3.",
  painHeadline: "You don't need more traffic. You need a number of leads you can count on.",
  frustrations: [
    {
      text: 'Some months you get 20 leads, some months you get 3, and you can never predict which.',
    },
    {
      text: "Your marketing is split across a freelancer for ads, a friend for social, and nobody owning the whole funnel.",
    },
    {
      text: 'Every "marketing win" is a vague reach number — not a lead count, not a cost per lead.',
    },
    {
      text: "You've tried running ads to a page that was never built to capture a lead in the first place.",
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Diagnostic audit',
      description:
        'A 2-hour session on your current website, social, positioning, and conversion flow — so the system is built around actual gaps, not guesses.',
    },
    {
      number: '/02',
      title: 'Build the funnel',
      description:
        "Landing page, lead magnet, and ManyChat automation built and connected as one system, not separate pieces.",
    },
    {
      number: '/03',
      title: 'Warm up & run ads',
      description:
        "Social presence warms up cold traffic while retargeting ads bring back visitors who didn't convert the first time.",
    },
    {
      number: '/04',
      title: 'Report weekly, hit the number',
      description:
        'Weekly reporting on leads generated, cost per lead, and form conversion — with a guaranteed minimum of 15 qualified leads/month and under $80 cost per lead by month 3.',
    },
  ],
  proof: {
    caseStudySlug: 'eventos-ensuenos',
    fallbackNote:
      "This shows results from Astratta's web development work with Eventos Ensueños (+80% quote requests after a conversion-focused rebuild) — directionally the closest proof we have for lead volume, though that engagement was a website project, not the bundled Lead Generation System. The System adds paid ads, social warm-up, and a lead magnet on top of a conversion-built landing page, with its own guaranteed minimum of 15 qualified leads/month by month 3.",
  },
  benefits: [
    "One system, one report — not three vendors you have to compare against each other.",
    'A guaranteed minimum: 15 qualified leads/month and under $80 cost per lead by month 3.',
    'Landing page, ads, social warm-up, and lead magnet built to work together, not bolted on separately.',
    'Add the Sales Accelerator anytime to move from "leads delivered" to "leads closed."',
  ],
  tiers: [
    {
      slug: 'lead-generation-core',
      name: 'Lead Generation System',
      price: '$1,200',
      cadence: '/mo — 6-month minimum commitment',
      recommended: true,
      bestFor:
        'Businesses that need a predictable number of qualified leads per month, not just more traffic.',
      features: [
        'Diagnostic audit (1 session, 2 hours): current website, social, positioning, and conversion flow',
        'Landing page/funnel (Lovable.dev): hero → clear value prop → CTA → lead form',
        'Social media presence (IG + FB): 8 posts/month + 2 reels (audience warm-up)',
        'Lead magnet + ManyChat automation: comment → download → email nurture',
        'Retargeting ads (Meta): $150/month minimum budget → prospecting + warm audience',
        'Weekly report: leads generated, cost per lead, form conversion rate',
      ],
    },
    {
      slug: 'sales-accelerator',
      name: 'Sales Accelerator',
      price: '+$400',
      cadence: '/mo — add-on, Lead Generation System clients only',
      bestFor: 'Result: 20-30% close rate on delivered leads (KPI target).',
      features: [
        '5-7 email automated nurture sequence (via Notion/n8n)',
        'WhatsApp funnel (for local SMB clients)',
        'CRM setup in Notion (contacts, proposals, follow-up automation)',
        'Weekly consultative follow-up call to help close warm leads',
        'Closing-focused ad copy for warm/retargeted leads',
        'Conversion monitoring (lead → deal)',
        'Copy optimization by closing angle',
      ],
    },
    {
      slug: 'brand-authority-system',
      name: 'Brand Authority System',
      price: '+$300',
      cadence: '/mo — parallel track, not a requirement',
      bestFor: 'Clients who want long-term market positioning alongside lead flow.',
      features: [
        'Educational content (LinkedIn + TikTok), 3x/week',
        'Content pillars: education + case studies + tips',
        'Complete Google Business Profile (local SEO)',
        'Integrated referral strategy (client becomes a lead source)',
      ],
    },
  ],
  faqs: [
    {
      question: 'What results are guaranteed with the Lead Generation System?',
      answer:
        'Astratta guarantees a minimum of 15 qualified leads per month and a cost per lead under $80 by month 3 of the program — this requires the 6-month minimum commitment since paid campaigns and audience data need time to optimize.',
    },
    {
      question: 'What happens if I want to close leads faster?',
      answer:
        "Add the Sales Accelerator (+$400/month) — it adds a 5-7 email nurture sequence, a CRM setup in Notion, and a weekly consultative call focused specifically on converting warm leads into closed deals, targeting a 20-30% close rate.",
    },
    {
      question: 'Do I need Brand Authority if I already have Lead Generation?',
      answer:
        'No — Brand Authority is a parallel track for long-term positioning (educational content, referral strategy), not a requirement. Clients focused purely on immediate lead volume can run Lead Generation System alone.',
    },
    {
      question: 'Can I increase my ad budget without changing plans?',
      answer:
        'Yes — the Ads Scaling add-on lets Lead Generation System clients step up from the included $150/month ad budget to $200, $400, or $600+/month tiers as lead volume needs grow, at lower management fees than our standalone Paid Ads service.',
    },
  ],
}

/**
 * Pricing validated against 2026 market comparables (Penji, Design Pickle,
 * boutique branding agencies) and Astratta's other service-page tiers.
 * Confirmed by Hisbelis — safe to treat as launch-ready.
 */
export const GRAPHIC_DESIGN_PAGE: ServicePage = {
  slug: 'graphic-design',
  number: '/03',
  title: 'Graphic Design',
  metaTitle: 'Graphic Design & Brand Identity Pricing — Dallas, TX | Astratta Agency',
  metaDescription:
    'Logo design, brand identity systems, and ongoing design support for Dallas–Fort Worth small businesses — from a starter logo package to a full monthly design retainer.',
  h1: 'A visual identity that looks like the market leader, not the newest business on the block.',
  intro:
    "Astratta designs logos, brand systems, and marketing collateral for Dallas businesses across four tiers — from a starter logo package to an ongoing monthly design retainer. Every project includes a usable style guide, not just files, so your team can stay consistent without calling us for every social post.",
  painHeadline: 'Your logo was made in an hour. It shows.',
  frustrations: [
    {
      text: "Your logo looks fine on a screen and falls apart the moment it's printed on a shirt, banner, or sign.",
    },
    {
      text: 'Every piece of marketing material looks like it came from a different company — no consistent colors, no consistent fonts.',
    },
    {
      text: "You don't have source files, so every small change means paying someone to recreate the whole thing.",
    },
    {
      text: 'You look like a startup that\'s "still figuring it out," even though you\'ve been in business for years.',
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: 'Discovery',
      description:
        'We start from what the mark needs to mean — not just what looks nice — so the concept has a reason behind it.',
    },
    {
      number: '/02',
      title: 'Concept & refine',
      description:
        'Multiple logo concepts, narrowed through revision rounds until one direction is clearly right.',
    },
    {
      number: '/03',
      title: 'Build the system',
      description:
        'Color palette, typography, and usage guidelines — so the identity holds up consistently, not just on the one file we designed it in.',
    },
    {
      number: '/04',
      title: 'Apply it everywhere',
      description:
        "The system gets applied across real touchpoints — business cards, apparel, signage — so it's tested against reality, not just a mockup.",
    },
  ],
  proof: {
    caseStudySlug: 'amazons-flooring-branding',
  },
  benefits: [
    'Source files (Figma/Adobe) delivered — no calling us every time you need a small edit.',
    'A system that holds up printed at business-card size and banner size alike.',
    'Guidelines your team can actually use, not just a logo file and good luck.',
    'Consistency across every touchpoint — business card, apparel, signage, social — from one system.',
  ],
  tiers: [
    {
      slug: 'brand-starter',
      name: 'Brand Starter',
      price: '$750',
      cadence: 'one-time',
      bestFor: 'New businesses that need a professional logo and basic guidelines fast.',
      features: [
        'Logo design (2-3 concepts, 2 revision rounds)',
        'Color palette + typography selection',
        'Mini brand guide (1-page PDF)',
        'Social media profile kit (avatar + cover images)',
        'Business card template',
      ],
    },
    {
      slug: 'brand-identity-system',
      name: 'Brand Identity System',
      price: '$1,500',
      cadence: 'one-time',
      recommended: true,
      bestFor: 'Businesses ready for a complete, consistent identity across every touchpoint.',
      features: [
        'Everything in Brand Starter',
        'Full brand guideline document (logo usage, color, typography, imagery style)',
        'Marketing collateral templates (social posts, flyer, presentation deck)',
        'Email signature + letterhead',
        '3 rounds of revisions',
        'Source files (Figma/Adobe) delivered',
      ],
    },
    {
      slug: 'brand-collateral-retainer',
      name: 'Brand + Collateral Retainer',
      price: '$450',
      cadence: 'per month',
      bestFor: 'Businesses that need ongoing design support without hiring in-house.',
      features: [
        'Everything in Brand Identity System (as onboarding)',
        'Up to 5 design requests/month (social graphics, one-pagers, ad creative, signage)',
        '48-hour standard turnaround',
        'Design system maintained and updated as you grow',
      ],
    },
    {
      slug: 'brand-growth-retainer',
      name: 'Brand Growth Retainer',
      price: '$750',
      cadence: 'per month',
      bestFor: 'Businesses running multiple active campaigns that need higher volume and faster turnaround.',
      features: [
        'Everything in Brand + Collateral Retainer',
        'Up to 12 design requests/month',
        '24-hour rush turnaround (vs. 48-hour standard)',
        'Priority WhatsApp/Slack access',
        'Quarterly brand system review + refresh recommendations',
      ],
    },
  ],
  addOns: [
    { name: 'Extra logo concept round', price: '$150' },
    { name: 'Print-ready packaging/signage design', price: 'From $300' },
    { name: 'Pitch deck design (up to 15 slides)', price: '$500' },
  ],
  faqs: [
    {
      question: 'Do I own the source files for my logo?',
      answer:
        'Yes — source files (Figma or Adobe) are delivered with the Brand Identity System tier and above. The Brand Starter tier includes final exported files (PNG, SVG, PDF) but not editable source files unless added.',
    },
    {
      question: 'How is this different from a freelance logo designer?',
      answer:
        'A freelancer typically delivers a logo file. Astratta delivers a usable system — guidelines, templates, and color/type rules — so your team (or future designers) can stay consistent without re-briefing every project from scratch.',
    },
    {
      question: 'Can I combine graphic design with a new website?',
      answer:
        'Yes — branding is often built alongside a Web Development project so the site launches with a finished identity. Ask about bundling during your audit or initial consultation.',
    },
    {
      question: 'Why pay a retainer instead of hiring an in-house designer?',
      answer:
        "A full-time junior designer in Dallas costs $3,500-$4,500/month in salary alone, before benefits or software. Astratta's retainer gives you consistent, on-brand design for a fraction of that cost, with no hiring process or ramp-up time.",
    },
  ],
}

/**
 * Populated per-page as each service page is built (see working-method rule:
 * never invent prices — tiers/add-ons must come from the client before a
 * page ships).
 */
export const SERVICE_PAGES: ServicePage[] = [
  WEB_DEVELOPMENT_PAGE,
  ECOMMERCE_PAGE,
  SOCIAL_MEDIA_PAGE,
  PAID_ADS_PAGE,
  LEAD_GENERATION_PAGE,
  GRAPHIC_DESIGN_PAGE,
]

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug)
}

export function getChildServicePages(parentSlug: string): ServicePage[] {
  return SERVICE_PAGES.filter((page) => page.parentSlug === parentSlug)
}
