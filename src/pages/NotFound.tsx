import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — Astratta Agency" description="Page not found." path="/404" />
      <Container className="flex min-h-svh flex-col items-center justify-center py-32 text-center">
        <h1 className="font-sans text-5xl font-extrabold">404</h1>
        <p className="mt-4 text-ink/60">That page doesn't exist.</p>
        <Link to="/" className="mt-8 font-bold text-primary">
          ← Back home
        </Link>
      </Container>
    </>
  )
}
