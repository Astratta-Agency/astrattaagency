export type Testimonial = {
  quote: string
  name: string
  role: string
}

/**
 * Real client testimonials, sourced from live case studies — add more here
 * as new projects launch, keep the array at 3-6 for the homepage
 * marquee/slider.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with Astratta was a game-changer. They understood exactly what our startup needed and delivered a website that truly represents our brand. Highly recommend!',
    name: 'George Lopez',
    role: "Founder, Amazon's Flooring",
  },
  {
    quote:
      "Before working with Astratta, nobody knew us in Dallas. In less than 3 months, people came to the restaurant telling us they'd seen us on TikTok. That's priceless.",
    name: 'Maria Espina',
    role: 'CEO & Founder, Perreando HotDog',
  },
  {
    quote:
      'I am so happy I chose Astratta as my web developer — it\'s rare to find an agency that loves what they do and truly reflects your brand in every detail.',
    name: 'Victoria Jimenez',
    role: 'Owner, Eventos Ensueños',
  },
]
