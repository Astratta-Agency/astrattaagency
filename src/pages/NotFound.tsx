import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { NOT_FOUND_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function NotFound() {
  const { dict } = useLanguage()
  const t = dict.notFound

  return (
    <>
      <Seo {...toSeoProps(NOT_FOUND_SEO)} path="/404" />
      <Container className="flex min-h-svh flex-col items-center justify-center py-32 text-center">
        <h1 className="font-sans text-5xl font-extrabold">404</h1>
        <p className="mt-4 text-ink/60">{t.heading}</p>
        <Link to="/" className="mt-8 font-bold text-primary">
          {t.backHome}
        </Link>
      </Container>
    </>
  )
}
