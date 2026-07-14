import amazonsFlooringWebsite from '@/assets/case-studies/amazons-flooring-website.png'
import perreandoHotdogWebsite from '@/assets/case-studies/perreandohotdog-website.png'
import eventosEnsuenosWebsite from '@/assets/case-studies/eventos-ensuenos-website.png'
import perreandoHotdogSocialMedia from '@/assets/case-studies/perreando-hotdog-social-media.jpg'

import amazonsFlooringHorizontal from '@/assets/case-studies/amazons-flooring/amazons-floorin-horizontal-mockup.jpg'
import amazonsFlooringHorizontal2 from '@/assets/case-studies/amazons-flooring/amazons-floorin-horizontal-mockup-1.jpg'
import amazonsFlooringPortrait from '@/assets/case-studies/amazons-flooring/amazons-floorin-portrait-mockup.jpg'
import amazonsFlooringPortrait2 from '@/assets/case-studies/amazons-flooring/amazons-floorin-portrait-mockup1.jpg'

import perreandoHotdogHorizontal from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-horizontal-mockup.png'
import perreandoHotdogHorizontal2 from '@/assets/case-studies/perreando-hotdog/perreandohotdog-horizontal-mockup-1.png'
import perreandoHotdogPortrait from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-portrait-mockup.png'
import perreandoHotdogPortrait2 from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-portrait-mockup-1.png'

import eventosEnsuenosHorizontal from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-horizontal-mockup.png'
import eventosEnsuenosHorizontal2 from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-horizontal-mockup-1.png'
import eventosEnsuenosPortrait from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-portrait-mockup.png'
import eventosEnsuenosPortrait2 from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-portrait-mockup-1.png'

export type CaseStudyStat = {
  value: string
  label: string
}

export type CaseStudyTestimonial = {
  quote: string
  name: string
  role: string
}

export type CaseStudy = {
  slug: string
  title: string
  client: string
  industry: string
  /** primary service line, drives the first tag/badge */
  service: string
  tags: string[]
  date: string
  timeline: string
  technologies: string[]
  summary: string
  challenge: string
  approach: string
  results: string
  stats: CaseStudyStat[]
  testimonial?: CaseStudyTestimonial
  liveUrl?: string
  /** optional per-project breakdown for case studies with multi-platform metrics (e.g. social media campaigns) */
  extraStats?: {
    heading: string
    headline: { value: string; label: string }
    items: { label: string; value: string; change?: string }[]
  }[]
  /** gradient shown behind/instead of `coverImage` — also used as the loading-state background */
  coverGradient: string
  /** real project screenshot; falls back to `coverGradient` alone when absent (e.g. social-media-only engagements with no website to screenshot) */
  coverImage?: string
  /** 4 mockup shots for the bento showcase grid, in slot order: [wide, tall, tall, wide] */
  gallery?: [string, string, string, string]
}

/**
 * Real projects, extracted from the current live site's portfolio pages.
 * `date` is currently set to '2025' as a reasonable placeholder — the source
 * site didn't expose exact month/year per project; update to the real
 * launch month if known.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'amazons-flooring',
    title: "Amazon's Flooring",
    client: "Amazon's Flooring",
    industry: 'Flooring / Home Services',
    service: 'Web Development',
    tags: ['Web Development'],
    date: '2025',
    timeline: '3 weeks',
    technologies: ['React', 'Tailwind CSS', 'Mobile-First Design', 'SEO Optimization'],
    summary:
      'A trusted Dallas flooring company went from zero digital presence to a website built to generate quote requests.',
    challenge:
      "Amazon's Flooring came to Astratta with no website and no digital foundation. They needed more than something 'nice-looking' — they needed a site that would build instant trust with local Dallas customers, clearly explain their flooring services, and turn visitors into real quote requests. No structure, no funnel, no credibility online.",
    approach:
      'Astratta designed and developed a high-conversion website from scratch, focused on performance and lead generation: a modern, mobile-first design built for local service businesses, clear service pages that explain flooring options without confusion, strategic calls-to-action to drive quote requests, clean UI, fast loading speeds, and SEO-ready structure. Every section was built with one goal: convert traffic into leads.',
    results:
      "Amazon's Flooring now has a professional online presence that instantly elevates their brand credibility, with easier customer inquiries through a clear, simple contact flow and a scalable foundation ready for SEO, ads, and local growth. The website now works as a sales tool — not just an online placeholder.",
    stats: [
      { value: '3 weeks', label: 'Timeline' },
      { value: '100%', label: 'Mobile-First' },
      { value: 'Fast', label: 'Page Speed' },
      { value: 'Yes', label: 'SEO Ready' },
    ],
    testimonial: {
      quote:
        'Working with Astratta was a game-changer. They understood exactly what our startup needed and delivered a website that truly represents our brand. Highly recommend!',
      name: 'George Lopez',
      role: "Founder, Amazon's Flooring",
    },
    coverGradient: 'from-primary to-primary-dark',
    coverImage: amazonsFlooringWebsite,
    gallery: [
      amazonsFlooringHorizontal,
      amazonsFlooringPortrait,
      amazonsFlooringPortrait2,
      amazonsFlooringHorizontal2,
    ],
  },
  {
    slug: 'perreando-hotdog',
    title: 'Perreando HotDog',
    client: 'Perreando HotDog',
    industry: 'Food & Beverage (Hospitality)',
    service: 'Web Development',
    tags: ['Web Development'],
    date: '2025',
    timeline: '1 week',
    technologies: ['React', 'Tailwind CSS', 'Mobile-First Design', 'SEO Optimization'],
    summary:
      'A Venezuelan street-food truck needed a digital home with real brand personality — delivered in one week.',
    challenge:
      "Perreando HotDog is a Venezuelan-style hot dog brand operating as a food truck in Dallas. The challenge wasn't just selling food — it was standing out in a crowded late-night food scene and building a loyal community beyond walk-up customers. They needed a clear digital home for the brand, strong brand personality reflecting their fun Venezuelan identity, and a way to promote hours, location changes, catering, and specials without confusion.",
    approach:
      'Astratta built a bold, high-energy website that matches the Perreando personality: mobile-first design optimized for late-night, on-the-go users, clear visibility for menu, schedule, location, and catering services, strategic CTAs for catering inquiries and customer engagement, and brand storytelling that connects emotionally with the Venezuelan community.',
    results:
      'Perreando HotDog evolved from "just a food truck" into a memorable local brand with a clear digital identity that supports growth, community, and sales.',
    stats: [
      { value: '1 week', label: 'Timeline' },
      { value: '100%', label: 'Mobile-First' },
      { value: 'Fast', label: 'Page Speed' },
      { value: 'Yes', label: 'SEO Ready' },
    ],
    testimonial: {
      quote:
        "100% recommended. The best agency. If you really want to boost your brand, don't hesitate to call them.",
      name: 'Maria Espina',
      role: 'CEO & Founder, Perreando HotDog',
    },
    coverGradient: 'from-secondary to-primary',
    coverImage: perreandoHotdogWebsite,
    gallery: [
      perreandoHotdogHorizontal,
      perreandoHotdogPortrait,
      perreandoHotdogPortrait2,
      perreandoHotdogHorizontal2,
    ],
  },
  {
    slug: 'perreando-hotdog-social-media',
    title: 'Perreando HotDog — Social Media',
    client: 'Perreando HotDog',
    industry: 'Food & Restaurant',
    service: 'Social Media Management',
    tags: ['Social Media Management'],
    date: '2025',
    timeline: '90 days (ongoing)',
    technologies: ['TikTok', 'Instagram', 'Facebook', 'Content Strategy', 'Video Production'],
    summary:
      'Zero online presence to 292K+ views across TikTok, Instagram, and Facebook in 90 days — with $0 ad spend.',
    challenge:
      'Perreando HotDog had zero social media presence and no content strategy. As a food truck in the competitive Dallas late-night food scene, they were invisible online. The challenge: build brand awareness from scratch, create engaging content that resonated with the local community, and drive real foot traffic to the truck — all without a significant advertising budget.',
    approach:
      'Astratta developed a comprehensive social media strategy across TikTok, Instagram, and Facebook — high-energy, culturally relevant video content showcasing the food preparation process, the vibrant Venezuelan identity, and the late-night experience. Each platform received tailored content optimized for its algorithm and audience behavior, focused on organic reach, community engagement, and authentic storytelling that turned viewers into customers.',
    results:
      'In under 90 days, Perreando HotDog went from zero online presence to a recognized local brand on social media. One video hit 35K+ views in under 24 hours, 100% organically. Customers started visiting the food truck saying they\'d seen them on TikTok — proof that authentic, well-crafted content can outperform paid advertising.',
    stats: [
      { value: '292K', label: 'Total Views' },
      { value: '25K+', label: 'Unique Reach' },
      { value: '+459%', label: 'Shares Growth' },
      { value: '$0', label: 'Ad Spend' },
    ],
    extraStats: [
      {
        heading: 'TikTok',
        headline: { value: '187K', label: 'Video Views (last 90 days)' },
        items: [
          { label: 'Profile Views', value: '7,300', change: '+128.9%' },
          { label: 'Shares', value: '1,200', change: '+459%' },
          { label: 'Likes', value: '4,600', change: '+186%' },
          { label: 'Comments', value: '350', change: '+220%' },
        ],
      },
      {
        heading: 'Instagram',
        headline: { value: '91.1K', label: 'Impressions (last 90 days)' },
        items: [
          { label: 'Accounts Reached', value: '17,100', change: '+68%' },
          { label: 'Organic Reach', value: '97%' },
          { label: 'Interactions', value: '1,700', change: '+40.9%' },
          { label: 'Followers Growth', value: '+320' },
        ],
      },
      {
        heading: 'Facebook',
        headline: { value: '13.8K', label: 'Content Reach (last 90 days)' },
        items: [
          { label: 'Unique Viewers', value: '8,099', change: '+30.5%' },
          { label: '3-sec Video Plays', value: '2,200', change: '+215%' },
          { label: 'Reactions', value: '680', change: '+45%' },
          { label: 'Page Visits', value: '1,100', change: '+85%' },
        ],
      },
    ],
    testimonial: {
      quote:
        "Before working with Astratta, nobody knew us in Dallas. In less than 3 months, people came to the restaurant telling us they'd seen us on TikTok. That's priceless.",
      name: 'Maria Espina',
      role: 'CEO & Founder, Perreando HotDog',
    },
    coverGradient: 'from-ink to-secondary',
    coverImage: perreandoHotdogSocialMedia,
  },
  {
    slug: 'eventos-ensuenos',
    title: 'Eventos Ensueños Panama',
    client: 'Eventos Ensueños Panama',
    industry: 'Events & Experiences',
    service: 'Web Development',
    tags: ['Web Development'],
    date: '2025',
    timeline: '4 weeks',
    technologies: ['Hostinger', 'Tailwind CSS', 'Contentful CMS'],
    summary:
      'A Panama-based event planning company turned a static portfolio site into an active lead-generation channel.',
    challenge:
      'The existing website lacked a clear structure and strategic focus. Its content was visually appealing but failed to guide users toward action or communicate the full value of the services offered. Search engine visibility was limited due to weak SEO foundations, and high-intent visitors planning weddings or events were not being effectively captured — the site functioned more as a static portfolio than as a lead-generation platform.',
    approach:
      'Astratta redesigned the website with a conversion-first and SEO-driven approach. The information architecture was rebuilt to prioritize high-value services and user intent, content was rewritten to emphasize outcomes and emotional connection, SEO best practices were implemented across the site, and clear calls-to-action were integrated to guide visitors toward inquiries and consultations.',
    results:
      'Following launch, Eventos Ensueños achieved a stronger, more professional digital presence. The website became easier to find through search, engagement on service pages increased, and inquiries improved in quality — the platform now operates as an active sales and lead-generation channel rather than a passive online brochure.',
    stats: [
      { value: '5x', label: 'Time on Site' },
      { value: '+80%', label: 'Quote Requests' },
      { value: '+300%', label: 'Portfolio Views' },
      { value: '+180%', label: 'Social Followers' },
    ],
    testimonial: {
      quote:
        'I am so happy I chose Astratta as my web developer — usually you find people who only "do the work," but it\'s rare to find an agency that loves what they do and gives you advice about your niche. I felt they knew more about my business than I expected, and that matters when an agency truly reflects your brand: the details, the passion, the quality in every click. Thank you!',
      name: 'Victoria Jimenez',
      role: 'Owner, Eventos Ensueños',
    },
    coverGradient: 'from-primary-dark to-ink',
    coverImage: eventosEnsuenosWebsite,
    gallery: [
      eventosEnsuenosHorizontal,
      eventosEnsuenosPortrait,
      eventosEnsuenosPortrait2,
      eventosEnsuenosHorizontal2,
    ],
  },
]
