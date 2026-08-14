import type { home as en } from '@/locales/en/home'

export const home: typeof en = {
  hero: {
    ticker: ['Desarrollo Web', 'Marketing Digital', 'Diseño Gráfico', 'Auditorías de Sitio Web'],
    pills: ['desarrollo web', 'marketing digital', 'diseño gráfico'],
    headline1: 'Sitios web que convierten tráfico en',
    headline2: 'clientes.',
    subtext:
      'Astratta crea sitios web y sistemas de marketing de alta conversión para negocios de Dallas–Fort Worth — diseñados para generar leads, no solo para verse bien.',
    ctaBookAudit: 'Agenda tu diagnóstico — $297',
    trustedBy: 'Con la confianza de startups y pequeños negocios de DFW',
  },
  painPoints: {
    eyebrow: '¿Te suena familiar?',
    statement: 'La mayoría de los negocios no tiene un problema de esfuerzo. Tiene un problema de sistema.',
    highlightIndices: [13, 14, 15],
    points: [
      'Tienes tráfico, pero nadie deja sus datos ni compra.',
      'Tu sitio parece del 2015 — o carga tan lento que la gente se va antes de verlo.',
      'Publicas en redes, pero no genera ni un solo lead calificado.',
      "Cambias tu marketing cada mes porque lo último 'no funcionó'.",
    ],
    closingLine: 'Esto no se arregla con más anuncios. Se arregla con un sistema que convierte.',
  },
  servicesGrid: {
    eyebrow: 'Nuestros Servicios',
    heading: 'Creados para convertir, no solo para verse bien.',
    learnMore: 'Saber más →',
  },
  aboutStats: {
    founderCaption: 'Hisbelis Vargas — Fundadora',
    eyebrow: 'Sobre Astratta',
    heading: 'Un estudio liderado por su fundadora. Cero peso de agencia.',
    body: 'Astratta es un estudio boutique en Dallas–Fort Worth. Liderado por su fundadora en cada proyecto — sin gerentes de cuenta, sin traspasos a personal junior. Estrategia y ejecución de nivel senior a una fracción del costo de una gran agencia.',
    ctaBookAudit: 'Agenda tu diagnóstico — $297',
    ctaMoreAbout: 'Más sobre el estudio',
  },
  featuredWork: {
    eyebrow: 'Trabajo Destacado',
    heading: 'Proyectos reales, resultados reales.',
    viewAll: 'Ver todo el trabajo',
  },
  process: {
    eyebrow: 'Proceso',
    heading: 'De la auditoría al lanzamiento.',
  },
  testimonials: {
    eyebrow: 'Lo que dicen los clientes',
    showTestimonial: (n: number) => `Mostrar testimonio ${n}`,
  },
  faq: {
    eyebrow: 'Preguntas Frecuentes',
    heading: 'Tus preguntas, respondidas.',
  },
  localSeo: {
    paragraph1: [
      {
        text: 'Astratta es un estudio de diseño web en Dallas que crea sitios pensados para convertir, no solo para existir. La mayoría de los negocios locales que conocemos ya tienen un sitio web — el problema es que nunca se construyó alrededor de un siguiente paso claro para el visitante. Nuestro trabajo de ',
      },
      { text: 'desarrollo web', to: '/services/web-development' },
      {
        text: ' empieza justo por ahí: un mensaje que dice claramente qué haces, tiempos de carga que no pierden visitantes móviles, y un camino del inicio al formulario de contacto que tiene sentido. Dallas–Fort Worth es nuestra base, pero el estándar no cambia para clientes en ningún lugar.',
      },
    ],
    paragraph2: [
      {
        text: '¿No sabes si el problema es tu sitio, tu tráfico o tu seguimiento? Eso es exactamente lo que responde ',
      },
      { text: 'el diagnóstico', to: '/diagnostic' },
      {
        text: ' — siete días de análisis sobre tu embudo, tu medición y tu presencia local, con los diez arreglos que más importan ordenados por retorno. A partir de ahí, nuestros sistemas de marketing digital para pequeños negocios de Dallas–Fort Worth combinan contenido, publicidad paga y automatización de seguimiento en un solo canal medido — evaluado por leads y costo por lead, no por likes ni impresiones.',
      },
    ],
  },
  finalCta: {
    heading1: 'Descubramos por qué tu sitio no está',
    heading2: 'convirtiendo.',
    submitLabel: 'Agenda tu diagnóstico — $297',
  },
}
