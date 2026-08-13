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
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { buildFaqSchema } from '@/lib/schema'
import { FAQ_ITEMS } from '@/data/faq'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Home() {
  const { pick } = useLanguage()
  const faqSchema = buildFaqSchema(
    FAQ_ITEMS.map((item) => ({ question: pick(item.question), answer: pick(item.answer) })),
  )

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/'])} path="/" />
      <JsonLd data={faqSchema} />
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
