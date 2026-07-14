import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Audit from '@/pages/Audit'
import Work from '@/pages/Work'
import CaseStudy from '@/pages/CaseStudy'
import Services from '@/pages/Services'
import WebDevelopment from '@/pages/WebDevelopment'
import Ecommerce from '@/pages/Ecommerce'
import DigitalMarketing from '@/pages/DigitalMarketing'
import SocialMedia from '@/pages/SocialMedia'
import PaidAds from '@/pages/PaidAds'
import LeadGeneration from '@/pages/LeadGeneration'
import GraphicDesign from '@/pages/GraphicDesign'
import Pricing from '@/pages/Pricing'
import Packages from '@/pages/Packages'
import Contact from '@/pages/Contact'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/ecommerce" element={<Ecommerce />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/social-media" element={<SocialMedia />} />
        <Route path="/services/paid-ads" element={<PaidAds />} />
        <Route path="/services/lead-generation" element={<LeadGeneration />} />
        <Route path="/services/graphic-design" element={<GraphicDesign />} />
        <Route path="/services/:slug" element={<Navigate to="/services" replace />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
