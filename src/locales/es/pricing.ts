import type { pricing as en } from '@/locales/en/pricing'

export const pricing: typeof en = {
  // Copy de docs/CONTENIDO-Web-EN-ES.md §10. El español se usa tal cual.
  heading: 'Cuánto cuesta, honestamente.',
  subtext:
    'No escondemos los precios detrás de un formulario. Pero tampoco publicamos un menú, porque el número correcto depende de lo que tu negocio realmente necesita. Aquí están los rangos y qué los mueve.',
  imageAlt: 'Cuatro barras de rango de longitud creciente, la más larga terminando en naranja, con un control deslizante sobre una de ellas.',

  rangesEyebrow: 'Los rangos',
  ranges: [
    { name: 'Diagnóstico', price: '$297', note: 'Pago único. Se acredita completo si trabajamos juntos.' },
    { name: 'Base', price: 'de $1,200 a $6,500', note: 'Pago único. Sitio, marca, medición, captura.' },
    { name: 'Sistemas de crecimiento', price: 'de $697 a $4,500/mes', note: 'Contenido, anuncios, automatización, reportes.' },
    { name: 'Presupuesto de anuncios', price: 'Lo pagas tú', note: 'Directo a las plataformas. Nunca a través de nosotros.' },
  ],

  movesEyebrow: 'Qué determina tu número',
  moves: [
    'Tu etapa. Un negocio sin sitio y sin medición necesita una base primero. Uno que ya tiene ambos necesita volumen.',
    'Tu industria. Un contratista necesita cobertura en búsqueda y manejo de llamadas. Un restaurante necesita contenido y club de SMS. Mismo precio, distinta mezcla.',
    'Tu facturación. No le vendemos un sistema de $4,500 a un negocio que no lo puede absorber. Así es como despiden a las agencias en el mes cuatro.',
  ],

  notChargedEyebrow: 'Qué no cobramos',
  notCharged: [
    'Costo de setup cuando empiezas Base y Sistema juntos (valor $1,200–$2,500)',
    'Comisión sobre tu presupuesto de anuncios',
    'Cargos por acceder a tus propias cuentas o datos',
    'Nada que no se haya acordado antes de empezar',
  ],

  ctaText: '¿No sabes en qué rango caes? Haz el Growth Score — 12 preguntas, 4 minutos, gratis.',
  ctaLink: 'Haz el Growth Score',
}
