/**
 * Política de privacidad. Copy autorizado fuera del doc de contenido (ver
 * docs/COPY-PENDIENTE.md, bloque L) y derivado de lo que el sitio hace de
 * verdad: formularios → Supabase, GA4, reCAPTCHA v3, idioma en localStorage.
 * Si cambia lo que se recoge (p. ej. se añade Meta Pixel), esto se actualiza.
 */
export type PrivacySection = {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export const privacy = {
  eyebrow: 'Legal',
  heading: 'Privacy Policy',
  lastUpdatedLabel: 'Last updated',
  lastUpdated: 'September 24, 2026',
  intro:
    'This policy explains what information Astratta Agency ("Astratta", "we", "us") collects when you visit astrattaagency.com, how we use it, and the choices you have. We\'re a small, founder-led studio based in Dallas–Fort Worth, Texas — if anything here is unclear, just ask.',
  sections: [
    {
      heading: 'What we collect',
      paragraphs: [
        'Information you give us. When you fill out a form on this site — the Growth Score, the diagnostic request, or the newsletter signup — we collect what you enter. Depending on the form, that can include your name, email, phone number, business name, website, your message, and your answers to the Growth Score questions.',
        'Information collected automatically. When you browse the site, some technical information is collected through the tools listed below:',
      ],
      list: [
        'Google Analytics 4 — pages you visit, how long you stay, the device and browser you use, your approximate location (city or country), and how you arrived at the site. It uses cookies to do this.',
        'Google reCAPTCHA v3 — runs when you submit a form to tell real people apart from bots. It collects hardware and software information and sends it to Google, under Google\'s Privacy Policy and Terms of Service.',
        'Language preference — the site remembers whether you chose English or Spanish in your browser\'s local storage. It stays on your device and is never sent to us.',
      ],
    },
    {
      heading: 'How we use it',
      paragraphs: ['We use your information only to:'],
      list: [
        'Reply to you and follow up on your request.',
        'Deliver what you asked for — your Growth Score result, your diagnostic, or a proposal.',
        'Send you the newsletter, only if you subscribed to it.',
        'Understand how the site is used so we can improve it.',
        'Keep the site and its forms safe from spam and abuse.',
      ],
    },
    {
      heading: 'Who we share it with',
      paragraphs: [
        'We do not sell your personal information. We share it only with the service providers that make this site work, and only as much as they need to do their job:',
      ],
      list: [
        'Vercel — hosts the website.',
        'Supabase — stores the information you submit through our forms.',
        'Google — provides Google Analytics and reCAPTCHA.',
      ],
    },
    {
      heading: 'Legal disclosures',
      paragraphs: [
        'We may disclose information if the law requires it, or if it\'s necessary to protect our rights, our clients, or the safety of others.',
      ],
    },
    {
      heading: 'WhatsApp and social media',
      paragraphs: [
        'The WhatsApp button and the links to Instagram, Facebook, and LinkedIn take you to platforms we don\'t control. Anything you share there is governed by that platform\'s own privacy policy.',
      ],
    },
    {
      heading: 'Cookies and your choices',
      paragraphs: [
        'You can block or delete cookies in your browser settings; the site will still work. You can also stop Google Analytics from collecting your data with Google\'s opt-out browser add-on (tools.google.com/dlpage/gaoptout).',
        'Every newsletter email includes a link to unsubscribe, and you can unsubscribe at any time.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'We keep the information you send us for as long as we need it to respond to you and, if we work together, for the length of that relationship. You can ask us to delete it at any time.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You can ask us what information we have about you, ask us to correct it, or ask us to delete it. Write to us at the email below and we\'ll take care of it.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'The site runs entirely over HTTPS, and we take reasonable measures to protect your information. No system connected to the internet is 100% secure, but we treat your data as if it were our own.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This site is meant for businesses and is not directed to children under 13. We do not knowingly collect information from children.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'If we change how we handle your information, we\'ll update this page and the date at the top.',
      ],
    },
  ] as PrivacySection[],
  contactHeading: 'Questions',
  contactText: 'Any question about this policy or your data goes to:',
}
