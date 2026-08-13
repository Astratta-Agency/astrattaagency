import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { BLOG_POSTS, categoryLabel, resolveBlogPost, resolveBlogPosts } from '@/data/blogPosts'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

function formatDate(iso: string, language: Language): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { language, dict } = useLanguage()
  const t = dict.blog.post
  const source = BLOG_POSTS.find((p) => p.slug === slug)
  const post = source ? resolveBlogPost(source, language) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const related = resolveBlogPosts(BLOG_POSTS, language)
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2)

  // Insert the inline newsletter opt-in after the second paragraph — a natural stopping
  // point once the reader has decided the piece is worth their time.
  const inlineBreakIndex = Math.min(2, post.body.length - 1)

  return (
    <>
      <Seo title={post.metaTitle} description={post.metaDescription} path={`/blog/${post.slug}`} />

      <section className="bg-white pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <Breadcrumbs items={[{ label: t.breadcrumb, href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60">
              {categoryLabel(post.category, language)}
            </span>
            <span className="text-xs text-ink/40">
              {formatDate(post.publishedAt, language)} · {post.readingTime}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={post.title} animateOnMount />
          </h1>
        </Container>
      </section>

      <div className={`aspect-[16/7] w-full overflow-hidden bg-gradient-to-br ${post.coverGradient}`} />

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mx-auto flex max-w-2xl flex-col gap-6"
          >
            {post.body.map((paragraph, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-lg leading-relaxed text-ink/80">{paragraph}</p>

                {i === inlineBreakIndex && (
                  <div className="mt-10 rounded-3xl bg-neutral/40 p-8">
                    <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                      {t.inlineNewsletterLabel}
                    </p>
                    <div className="mt-4">
                      <NewsletterForm source="blog-inline" compact />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mx-auto mt-16 max-w-2xl border-t border-ink/10 pt-10"
          >
            <p className="text-ink/60">
              {t.ctaText}{' '}
              <Link to="/audit" className="group font-bold text-primary">
                {t.ctaLink}{' '}
                <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                  →
                </span>
              </Link>
            </p>
          </motion.div>

          {related.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="mx-auto mt-16 max-w-2xl border-t border-ink/10 pt-10"
            >
              <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                {t.related}
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {related.map((r) => (
                  <motion.div key={r.slug} variants={fadeUp}>
                    <Link to={`/blog/${r.slug}`} className="group font-bold text-ink hover:text-primary">
                      {r.title}{' '}
                      <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mx-auto mt-16 max-w-2xl rounded-3xl bg-neutral/40 p-8"
          >
            <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
              {t.enjoyedLabel}
            </p>
            <p className="mt-2 text-ink/70">{t.enjoyedText}</p>
            <div className="mt-4">
              <NewsletterForm source="blog-footer" compact />
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
