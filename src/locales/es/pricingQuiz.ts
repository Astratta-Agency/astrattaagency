import type { pricingQuiz as en } from '@/locales/en/pricingQuiz'

export const pricingQuiz: typeof en = {
  eyebrow: 'Cotización',
  stepLabel: (current: number, total: number) => `Paso ${current} de ${total}`,
  step0: {
    heading: 'Arma tu plan en menos de 2 minutos.',
    subtext: '¿Cuál es tu objetivo principal ahora mismo?',
  },
  step1: {
    heading: '¿Qué ya tienes?',
    subtext: 'Selecciona todo lo que aplique.',
    back: '← Atrás',
    next: 'Siguiente →',
  },
  step2: {
    heading: '¿En qué servicios estás interesado?',
    subtext: 'Opcional — elige cualquiera que te interese más allá de tu objetivo principal.',
    notSure: '¿No sabes por dónde empezar?',
    back: '← Atrás',
    seeRecommendation: 'Ver mi recomendación →',
  },
  step3: {
    heading: 'Aquí está tu plan recomendado.',
    free: 'Gratis',
    estimatedInvestment: 'Inversión estimada',
    freeToStart: 'Gratis para empezar',
    investmentNote:
      'Esto combina cuotas de proyecto únicas y planes mensuales en un solo rango para comparación rápida — mira cada página de servicio arriba para el ritmo exacto.',
    startOver: '← Empezar de nuevo',
    preferBundle: '¿Prefieres un paquete prearmado? Ve nuestros paquetes →',
    confirmHeading: '¿Quieres que confirmemos este plan?',
    confirmSubtext: 'Envíanos tus datos y te contactaremos con una cotización firme basada en tus respuestas.',
    submitLabel: 'Obtener mi cotización personalizada',
  },
}
