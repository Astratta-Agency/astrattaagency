import type { services as en } from '@/locales/en/services'

export const services: typeof en = {
  // The /services index page was retired (§12 → 301 to /how-it-works).
  // Only `shared` survives, consumed by the service detail pages. The old
  // index copy carried retired prices (rule 5) and was deleted with the page.
  shared: {
    mostPopularBadge: '⭐ Lo más popular en Dallas',
    getThisPlan: 'Elegir este plan →',
    processLabel: 'Proceso',
    processDefaultTitle: 'Cómo lo hacemos.',
    frustrationsLabel: 'Frustraciones',
    frustrationsDefaultTitle: '¿Te suena familiar?',
    benefitsLabel: 'Beneficios',
    benefitsDefaultTitle: 'Lo que realmente obtienes.',
    proofLabel: 'Prueba',
    directionalProofPrefix: 'Prueba direccional — ',
    howWeProveItLabel: 'Cómo lo comprobamos',
    seeFullCaseStudy: 'Ver el caso de éxito completo',
    quoteCallout: {
      text: '¿Combinas esto con otros servicios?',
      quoteLink: 'Obtén una cotización',
      or: 'o',
      bundlesLink: 've nuestros paquetes',
    },
    breadcrumbServices: 'Servicios',
    breadcrumbDigitalMarketing: 'Marketing Digital',
    addOnsLabel: 'Complementos',
    addOnsHeading: 'Extiende cualquier plan.',
    faqLabel: 'Preguntas Frecuentes',
    questionsAnswered: 'Tus preguntas, respondidas.',
    bundleSaveLabel: 'Combina y ahorra',
    seeAllBundles: 'Ver todos los paquetes →',
    viewPricingDetails: 'Ver precios y detalles →',
  },
}
