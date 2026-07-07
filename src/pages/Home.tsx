import { Hero } from '@/components/sections/Hero'
import { WeDoStrip } from '@/components/sections/WeDoStrip'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutStats } from '@/components/sections/AboutStats'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Seo } from '@/components/layout/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Astratta Agency — Web Design & Digital Marketing in Dallas, TX"
        description="Astratta builds high-converting websites, funnels, and digital marketing campaigns for Dallas–Fort Worth startups and small businesses. Get a free website audit."
        path="/"
      />
      <Hero />
      <WeDoStrip />
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
