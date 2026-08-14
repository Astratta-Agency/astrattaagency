export const growthScore = {
  // Copy de docs/CONTENIDO-Web-EN-ES.md §9. Producto distinto del diagnóstico.
  heading: 'Where does your marketing actually stand?',
  subtext:
    "Twelve questions. Four minutes. You'll get a score across the five systems that decide whether a business grows predictably — and which stage you're in.",
  cta: "Start — it's free",
  micro: 'No credit card. No sales call required.',
  imageAlt: 'Five stacked bars of different heights, the tallest marked in orange, forming a score readout.',

  stepLabel: (current: number, total: number) => `Question ${current} of ${total}`,
  back: 'Back',
  progressLabel: 'Progress',

  // Captura de contacto
  captureHeading: 'Your score is ready.',
  captureSubtext: 'Where should we send it?',
  captureMicro: "We'll text or email you the result. No spam, no sales sequence you didn't ask for.",
  submitLabel: 'See my Growth Score',
  fields: {
    firstName: 'First name',
    email: 'Email',
    phone: 'Phone',
    business: 'Business name',
  },

  // Resultado
  resultTitle: 'Your Growth Score',
  stageLabel: (level: string) => `You're in the ${level} stage.`,
  pillarNames: {
    base: 'Foundation',
    capture: 'Capture',
    response: 'Response',
    acquisition: 'Acquisition',
    retention: 'Retention',
  },
  leaksHeading: 'Your three most expensive gaps:',
  foundationHeading: 'Before a monthly system, you need the foundation:',
  recommendedLabel: 'Recommended system',
  includesLabel:
    'Includes: content production, ad management, landing pages, CRM setup, AI lead response, reporting.',
  breakEven: (n: number) =>
    `At your average ticket, you'd need ${n} new customers a month for this to pay for itself.`,
  closingTitle: 'This is what you told us.',
  closingBody:
    'The diagnostic is what we find — using your real tracking, your actual calls, and the ads your competitors are running this week.',
  ctaDiagnostic: 'Get your diagnostic — $297',
  ctaCall: 'Book a call',
  ctaSystems: 'See the START system',
  ctaSecondary: 'Or go to the diagnostic — $297',
  restart: 'Start over',
}
