import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutStats } from '@/components/sections/AboutStats'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Seo } from '@/components/layout/Seo'
import { STATIC_SEO } from '@/lib/seo-data'

export default function Home() {
  return (
    <>
      <Seo {...STATIC_SEO['/']} path="/" />
      <Hero />
      <PainPoints />
      <ServicesGrid />
      <AboutStats />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
