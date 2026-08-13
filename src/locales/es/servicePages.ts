import type { servicePages as en } from '@/locales/en/servicePages'

export const servicePages: typeof en = {
  'web-development': {
    processTitle: 'Cómo lo construimos.',
    crossSell: {
      text: '¿Vendes productos físicos?',
      linkText: 'Ver precios de E-commerce →',
      to: '/services/ecommerce',
    },
    closingHeading: '¿Listo para empezar tu proyecto web?',
    closingSubtext: 'Cuéntanos qué plan te queda bien, o solicita una auditoría gratuita si no estás seguro.',
    submitLabel: 'Iniciar mi proyecto',
  },
  ecommerce: {
    processTitle: 'Cómo lo construimos.',
    bundleNote: {
      prefix:
        'Combina con Marketing Digital → el paquete "la tienda que vende": E-commerce Growth + Anuncios y Retargeting por ',
      priceText: '$600/mes',
      suffix: ' (en lugar de $650/mes por separado).',
    },
    crossSell: {
      text: '¿Necesitas un sitio web de negocio normal en su lugar?',
      linkText: 'Ver precios de Desarrollo Web →',
      to: '/services/web-development',
    },
    closingHeading: '¿Listo para lanzar tu tienda?',
    closingSubtext:
      'Cuéntanos sobre tu catálogo y canales de venta actuales, o solicita una auditoría gratuita si no estás seguro de qué plan te queda bien.',
    submitLabel: 'Iniciar mi tienda',
  },
  'social-media': {
    processTitle: 'Cómo lo construimos.',
    crossSell: {
      text: '¿Quieres un número predecible de leads, no solo presencia?',
      linkText: 'Ver el Sistema de Generación de Leads →',
      to: '/services/lead-generation',
    },
    closingHeading: '¿Listo para construir tu audiencia?',
    closingSubtext: 'Cuéntanos qué plan te queda bien, o solicita una auditoría gratuita si no estás seguro.',
    submitLabel: 'Iniciar mi plan',
  },
  'paid-ads': {
    processTitle: 'Cómo lo ejecutamos.',
    feeExplainer:
      'Cada plan a continuación muestra dos números separados: nuestra cuota de gestión mensual, y el presupuesto de inversión publicitaria recomendado. La inversión publicitaria se paga directamente a Meta o Google — no es parte de nuestra cuota.',
    crossSell1: {
      text: '¿Necesitas una landing page para enviar este tráfico?',
      linkText: 'Ver precios de Desarrollo Web →',
      to: '/services/web-development',
    },
    crossSell2: {
      text: '¿Quieres anuncios combinados con redes sociales y un lead magnet en un solo sistema?',
      linkText: 'Ver el Sistema de Generación de Leads →',
      to: '/services/lead-generation',
    },
    closingHeading: '¿Listo para poner presupuesto detrás de un número?',
    closingSubtext: 'Cuéntanos qué plan te queda bien, o solicita una auditoría gratuita si no estás seguro.',
    submitLabel: 'Iniciar mis campañas',
  },
  'lead-generation': {
    processTitle: 'Cómo funciona el sistema.',
    guarantee: {
      label: 'Garantizado para el mes 3',
      leads: '15+',
      leadsLabel: 'Leads calificados por mes',
      cost: 'Menos de $80',
      costLabel: 'Costo por lead',
      commitment: '6 meses',
      commitmentLabel: 'Compromiso mínimo',
    },
    addOnsEyebrow: 'Complementos opcionales',
    addOnsHeading: 'Extiende el sistema.',
    addOnsSubtext:
      'Los siguientes complementos solo están disponibles para clientes del Sistema de Generación de Leads — no se venden por separado.',
    adsScalingEyebrow: 'Escalamiento de Anuncios',
    adsScalingHeading: '¿Superaste el presupuesto publicitario incluido?',
    tableHeaders: {
      plan: 'Plan',
      feeAndBudget: 'Cuota + Presupuesto',
      creatives: 'Creativos/mes',
      targeting: 'Segmentación',
      result: 'Resultado Esperado',
    },
    adsScalingTiers: [
      {
        plan: 'Ads Starter',
        feeAndBudget: '$80 cuota + $200 inversión',
        creatives: '2/mes',
        targeting: 'DFW básico',
        result: '8-12 leads/mes',
      },
      {
        plan: 'Ads Pro',
        feeAndBudget: '$120 cuota + $400 inversión',
        creatives: '4/mes',
        targeting: 'Avanzado + lookalike',
        result: '20-30 leads/mes',
      },
      {
        plan: 'Ads Enterprise',
        feeAndBudget: '$200 cuota + $600+ inversión',
        creatives: '6/mes',
        targeting: 'Multi-ángulo + retargeting',
        result: '40+ leads/mes',
      },
    ],
    notStandalone: {
      prefix: 'No es una compra independiente — ',
      before: 'estas cuotas son más bajas que el ',
      linkText: 'servicio independiente de Anuncios Pagados',
      after:
        ' porque funcionan dentro de la infraestructura existente del Sistema de Generación de Leads. Solo están disponibles como mejora para clientes activos del sistema.',
    },
    closingHeading: '¿Listo para un flujo predecible?',
    closingSubtext:
      'Cuéntanos sobre tu negocio y flujo de leads actual, o solicita una auditoría gratuita si no estás seguro de que esto sea lo correcto.',
    submitLabel: 'Iniciar mi sistema',
  },
  'graphic-design': {
    processTitle: 'Cómo construimos la identidad.',
    crossSell: {
      text: '¿Necesitas un sitio web nuevo que combine con tu nueva marca?',
      linkText: 'Ver precios de Desarrollo Web →',
      to: '/services/web-development',
    },
    closingHeading: '¿Listo para una marca que se vea a la altura?',
    closingSubtext: 'Cuéntanos qué plan te queda bien, o solicita una auditoría gratuita si no estás seguro.',
    submitLabel: 'Iniciar mi marca',
  },
}
