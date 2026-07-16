import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutStats } from '@/components/sections/AboutStats'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { LocalSeo } from '@/components/sections/LocalSeo'
import { FinalCta } from '@/components/sections/FinalCta'
import { Seo } from '@/components/layout/Seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { STATIC_SEO } from '@/lib/seo-data'
import { buildFaqSchema } from '@/lib/schema'
import { FAQ_ITEMS } from '@/data/faq'

export default function Home() {
  return (
    <>
      <Seo {...STATIC_SEO['/']} path="/" />
      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <Hero />
      <PainPoints />
      <ServicesGrid />
      <AboutStats />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <Faq />
      <LocalSeo />
      <FinalCta />
    </>
  )
}
