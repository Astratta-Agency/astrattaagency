import type { growthScore as en } from '@/locales/en/growthScore'

export const growthScore: typeof en = {
  // Copy de docs/CONTENIDO-Web-EN-ES.md §9. El español se usa tal cual.
  heading: '¿En qué punto está realmente tu marketing?',
  subtext:
    'Doce preguntas. Cuatro minutos. Vas a obtener un puntaje en los cinco sistemas que deciden si un negocio crece de forma predecible — y en qué etapa estás.',
  cta: 'Empezar — es gratis',
  micro: 'Sin tarjeta. Sin llamada de ventas obligatoria.',
  imageAlt: 'Cinco barras apiladas de distinta altura, la más alta marcada en naranja, formando una lectura de puntaje.',

  stepLabel: (current: number, total: number) => `Pregunta ${current} de ${total}`,
  back: 'Atrás',
  progressLabel: 'Progreso',

  captureHeading: 'Tu puntaje está listo.',
  captureSubtext: '¿A dónde te lo enviamos?',
  captureMicro: 'Te mandamos el resultado por mensaje o correo. Sin spam, sin secuencia de ventas que no pediste.',
  submitLabel: 'Ver mi Growth Score',
  fields: {
    firstName: 'Nombre',
    email: 'Email',
    phone: 'Teléfono',
    business: 'Nombre del negocio',
  },

  resultTitle: 'Tu Growth Score',
  stageLabel: (level: string) => `Estás en la etapa ${level}.`,
  pillarNames: {
    base: 'Base',
    capture: 'Captura',
    response: 'Respuesta',
    acquisition: 'Adquisición',
    retention: 'Retención',
  },
  leaksHeading: 'Tus tres fugas más caras:',
  foundationHeading: 'Antes de un sistema mensual, necesitas la base:',
  recommendedLabel: 'Sistema recomendado',
  includesLabel:
    'Incluye: producción de contenido, gestión de anuncios, landing pages, configuración de CRM, respuesta con IA, reportes.',
  breakEven: (n: number) =>
    `Con tu ticket promedio, necesitarías ${n} clientes nuevos al mes para que esto se pague solo.`,
  closingTitle: 'Esto es lo que TÚ nos dijiste.',
  closingBody:
    'El diagnóstico es lo que encontramos NOSOTROS — con tu medición real, tus llamadas y los anuncios que está corriendo tu competencia esta semana.',
  ctaDiagnostic: 'Agenda tu diagnóstico — $297',
  ctaCall: 'Agenda una llamada',
  ctaSystems: 'Ver el sistema START',
  ctaSecondary: 'O ve al diagnóstico — $297',
  restart: 'Empezar de nuevo',
}
