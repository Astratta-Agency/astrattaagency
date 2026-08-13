export const pricingQuiz = {
  eyebrow: 'Pricing Quote',
  stepLabel: (current: number, total: number) => `Step ${current} of ${total}`,
  step0: {
    heading: 'Build your plan in under 2 minutes.',
    subtext: "What's your main goal right now?",
  },
  step1: {
    heading: 'What do you already have?',
    subtext: 'Select everything that applies.',
    back: '← Back',
    next: 'Next →',
  },
  step2: {
    heading: 'Which services are you interested in?',
    subtext: 'Optional — pick any that interest you beyond your main goal.',
    notSure: 'Not sure where to start?',
    back: '← Back',
    seeRecommendation: 'See my recommendation →',
  },
  step3: {
    heading: "Here's your recommended plan.",
    free: 'Free',
    estimatedInvestment: 'Estimated investment',
    freeToStart: 'Free to start',
    investmentNote:
      'This combines one-time project fees and monthly plans into a single range for quick comparison — see each service page above for the exact cadence.',
    startOver: '← Start over',
    preferBundle: 'Prefer a pre-built bundle? See our packages →',
    confirmHeading: 'Want us to confirm this plan?',
    confirmSubtext: "Send us your details and we'll follow up with a firm quote based on your answers above.",
    submitLabel: 'Get my custom quote',
  },
}
