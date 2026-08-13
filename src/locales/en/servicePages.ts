type CrossSell = { text: string; linkText: string; to: string }

export const servicePages = {
  'web-development': {
    processTitle: 'How we build it.',
    crossSell: {
      text: 'Selling physical products?',
      linkText: 'See E-commerce pricing →',
      to: '/services/ecommerce',
    } satisfies CrossSell,
    closingHeading: 'Ready to start your web project?',
    closingSubtext: "Tell us which tier fits, or request a free audit first if you're not sure.",
    submitLabel: 'Start my project',
  },
  ecommerce: {
    processTitle: 'How we build it.',
    bundleNote: {
      prefix:
        'Combine with Digital Marketing → the "store that sells" bundle: E-commerce Growth + Ads & Retargeting for ',
      priceText: '$600/mo',
      suffix: ' (instead of $650/mo separately).',
    },
    crossSell: {
      text: 'Need a regular business website instead?',
      linkText: 'See Web Development pricing →',
      to: '/services/web-development',
    } satisfies CrossSell,
    closingHeading: 'Ready to launch your store?',
    closingSubtext:
      "Tell us about your catalog and current sales channels, or request a free audit first if you're not sure which tier fits.",
    submitLabel: 'Start my store',
  },
  'social-media': {
    processTitle: 'How we build it.',
    crossSell: {
      text: 'Want a predictable number of leads, not just presence?',
      linkText: 'See the Lead Generation System →',
      to: '/services/lead-generation',
    } satisfies CrossSell,
    closingHeading: 'Ready to build your audience?',
    closingSubtext: "Tell us which tier fits, or request a free audit first if you're not sure.",
    submitLabel: 'Start my plan',
  },
  'paid-ads': {
    processTitle: 'How we run it.',
    feeExplainer:
      "Every tier below shows two separate numbers: our monthly management fee, and the recommended ad spend budget. Ad spend is paid directly to Meta or Google — it's not part of our fee.",
    crossSell1: {
      text: 'Need a landing page to send this traffic to?',
      linkText: 'See Web Development pricing →',
      to: '/services/web-development',
    } satisfies CrossSell,
    crossSell2: {
      text: 'Want ads bundled with social media and a lead magnet as one system?',
      linkText: 'See the Lead Generation System →',
      to: '/services/lead-generation',
    } satisfies CrossSell,
    closingHeading: 'Ready to put budget behind a number?',
    closingSubtext: "Tell us which tier fits, or request a free audit first if you're not sure.",
    submitLabel: 'Start my campaigns',
  },
  'lead-generation': {
    processTitle: 'How the system works.',
    guarantee: {
      label: 'Guaranteed by month 3',
      leads: '15+',
      leadsLabel: 'Qualified leads per month',
      cost: 'Under $80',
      costLabel: 'Cost per lead',
      commitment: '6-mo',
      commitmentLabel: 'Minimum commitment',
    },
    addOnsEyebrow: 'Optional add-ons',
    addOnsHeading: 'Extend the system.',
    addOnsSubtext:
      'Both add-ons below are only available to Lead Generation System clients — not sold standalone.',
    adsScalingEyebrow: 'Ads Scaling',
    adsScalingHeading: 'Outgrown the included ad budget?',
    tableHeaders: {
      plan: 'Plan',
      feeAndBudget: 'Fee + Ad Budget',
      creatives: 'Creatives/mo',
      targeting: 'Targeting',
      result: 'Expected Result',
    },
    adsScalingTiers: [
      {
        plan: 'Ads Starter',
        feeAndBudget: '$80 fee + $200 ad spend',
        creatives: '2/mo',
        targeting: 'Basic DFW',
        result: '8-12 leads/month',
      },
      {
        plan: 'Ads Pro',
        feeAndBudget: '$120 fee + $400 ad spend',
        creatives: '4/mo',
        targeting: 'Advanced + lookalike',
        result: '20-30 leads/month',
      },
      {
        plan: 'Ads Enterprise',
        feeAndBudget: '$200 fee + $600+ ad spend',
        creatives: '6/mo',
        targeting: 'Multi-angle + retargeting',
        result: '40+ leads/month',
      },
    ],
    notStandalone: {
      prefix: 'Not a standalone purchase — ',
      before: 'these fees are lower than the ',
      linkText: 'standalone Paid Ads service',
      after:
        " because they run inside the existing Lead Generation System infrastructure. They're only available as an upgrade for active Lead Generation System clients.",
    },
    closingHeading: 'Ready for a predictable pipeline?',
    closingSubtext:
      "Tell us about your business and current lead flow, or request a free audit first if you're not sure this is the right fit.",
    submitLabel: 'Start my system',
  },
  'graphic-design': {
    processTitle: 'How we build the identity.',
    crossSell: {
      text: 'Need a new website to match your new brand?',
      linkText: 'See Web Development pricing →',
      to: '/services/web-development',
    } satisfies CrossSell,
    closingHeading: 'Ready for a brand that looks the part?',
    closingSubtext: "Tell us which tier fits, or request a free audit first if you're not sure.",
    submitLabel: 'Start my brand',
  },
}
