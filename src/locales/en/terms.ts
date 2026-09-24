import type { LegalSection } from '@/locales/en/privacy'

/**
 * Términos y condiciones. Copy autorizado fuera del doc de contenido (ver
 * docs/COPY-PENDIENTE.md, bloque M). Las condiciones del Diagnóstico
 * (reembolso, garantía, crédito a 90 días, Stripe) las confirmó el negocio y
 * deben coincidir con la garantía de /diagnostic — si una cambia, cambian las dos.
 */
export const terms = {
  eyebrow: 'Legal',
  heading: 'Terms & Conditions',
  lastUpdatedLabel: 'Last updated',
  lastUpdated: 'September 24, 2026',
  intro:
    'These terms govern your use of astrattaagency.com and your purchase of the Diagnostic. By using the site or buying the Diagnostic, you agree to them. If you don\'t agree, please don\'t use the site.',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'Astratta Agency ("Astratta", "we", "us") is a web design and digital marketing studio based in Dallas–Fort Worth, Texas.',
      ],
    },
    {
      heading: 'Using the site',
      paragraphs: ['You can use this site freely, as long as you don\'t:'],
      list: [
        'Use it for anything illegal.',
        'Try to break it, overload it, or access parts of it that aren\'t public.',
        'Send spam or false information through our forms.',
        'Pretend to be someone else.',
      ],
    },
    {
      heading: 'Our content',
      paragraphs: [
        'The text, design, graphics, logo, articles, and case studies on this site belong to Astratta, or to our clients, who allow us to show their work. You\'re welcome to share links and quote short excerpts with credit. Copying or republishing anything else requires our written permission.',
      ],
    },
    {
      heading: 'The Growth Score',
      paragraphs: [
        'The Growth Score is free and automatic. Its result is an estimate based only on your answers — useful as a guide, but it isn\'t professional advice and it doesn\'t guarantee any result.',
      ],
    },
    {
      heading: 'The Diagnostic',
      paragraphs: [
        'The Diagnostic costs $297 USD, as a one-time payment made in advance through Stripe. Work starts once the payment is confirmed.',
      ],
      list: [
        'If you cancel before we start, we refund the full $297.',
        'Once the work has started, the payment is non-refundable — except under our guarantee.',
        'Guarantee: if we don\'t find at least three quantifiable leaks, we refund the full $297.',
        'Credit: if you hire our services within 90 days of receiving your Diagnostic, the full $297 is credited toward that work.',
      ],
    },
    {
      heading: 'Foundation and growth systems',
      paragraphs: [
        'Foundation projects and the monthly growth systems (START, BUILD, ENGINE, and SCALE) are governed by a separate written agreement signed with each client. That agreement sets the scope, price, minimum term, payments, and cancellation. The prices shown on this site are for reference; if anything here conflicts with your agreement, the agreement prevails.',
      ],
    },
    {
      heading: 'No guaranteed results',
      paragraphs: [
        'We don\'t promise specific sales, rankings, or leads. Results depend on factors we don\'t control — your market, your budget, your competition, and how recommendations get implemented.',
      ],
    },
    {
      heading: 'Third-party links and services',
      paragraphs: [
        'The site links to services we don\'t control, such as WhatsApp, Instagram, Facebook, LinkedIn, and Stripe. Their use is governed by their own terms, and we\'re not responsible for them.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'The site is provided "as is". To the extent the law allows, Astratta is not liable for indirect or consequential damages arising from the use of the site or the Diagnostic, and our total liability is limited to the amount you paid us for the Diagnostic.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of the State of Texas. Any dispute will be resolved in the courts of Texas.',
      ],
    },
    {
      heading: 'Your privacy',
      paragraphs: ['How we collect and use your information is explained in our Privacy Policy.'],
      link: { label: 'Read the Privacy Policy', to: '/privacy-policy' },
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'If we change these terms, we\'ll update this page and the date at the top. A purchase is governed by the terms in effect on the day it was made.',
      ],
    },
  ] as LegalSection[],
  contactHeading: 'Questions',
  contactText: 'Any question about these terms goes to:',
}
