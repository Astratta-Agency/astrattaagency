import type { Bilingual } from '@/lib/i18n/types'

export type Testimonial = {
  quote: Bilingual<string>
  name: string
  role: Bilingual<string>
}

/**
 * Real client testimonials, sourced from live case studies — add more here
 * as new projects launch, keep the array at 3-6 for the homepage
 * marquee/slider.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      en: 'Working with Astratta was a game-changer. They understood exactly what our startup needed and delivered a website that truly represents our brand. Highly recommend!',
      es: 'Trabajar con Astratta fue un antes y un después. Entendieron exactamente lo que nuestra startup necesitaba y entregaron un sitio web que realmente representa nuestra marca. ¡Muy recomendados!',
    },
    name: 'George Lopez',
    role: {
      en: "Founder, Amazon's Flooring",
      es: "Fundador, Amazon's Flooring",
    },
  },
  {
    quote: {
      en: "Before working with Astratta, nobody knew us in Dallas. In less than 3 months, people came to the restaurant telling us they'd seen us on TikTok. That's priceless.",
      es: 'Antes de trabajar con Astratta, nadie nos conocía en Dallas. En menos de 3 meses, la gente llegaba al restaurante diciéndonos que nos habían visto en TikTok. Eso no tiene precio.',
    },
    name: 'Maria Espina',
    role: {
      en: 'CEO & Founder, Perreando HotDog',
      es: 'CEO y Fundadora, Perreando HotDog',
    },
  },
  {
    quote: {
      en: 'I am so happy I chose Astratta as my web developer — it\'s rare to find an agency that loves what they do and truly reflects your brand in every detail.',
      es: 'Estoy muy feliz de haber elegido a Astratta como mi desarrolladora web — es raro encontrar una agencia que ama lo que hace y refleja tu marca en cada detalle.',
    },
    name: 'Victoria Jimenez',
    role: {
      en: 'Owner, Eventos Ensueños',
      es: 'Propietaria, Eventos Ensueños',
    },
  },
]
