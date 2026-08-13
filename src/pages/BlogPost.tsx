import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { BlogIllustration } from '@/components/ui/BlogIllustration'
import { BLOG_POSTS, categoryLabel, resolveBlogPost, resolveBlogPosts, type BlogBlock } from '@/data/blogPosts'
import { EASE, fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

function formatDate(iso: string, language: Language): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Splits `**bold**` markup into inline nodes — the surrounding prose is never altered, only styled. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-extrabold text-primary">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

function BodyBlock({ block }: { block: BlogBlock }) {
  if (block.kind === 'heading') {
    return (
      <motion.h2
        variants={fadeUp}
        className="mt-4 border-l-4 border-primary pl-5 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
      >
        {renderInline(block.text)}
      </motion.h2>
    )
  }

  if (block.kind === 'quote') {
    return (
      <motion.blockquote
        variants={scaleIn}
        className="relative my-2 rounded-3xl bg-ink px-8 py-10 text-white sm:px-10"
      >
        <span className="pointer-events-none absolute -top-6 left-8 select-none font-sans text-8xl font-black text-secondary/40">
          “
        </span>
        <p className="relative font-sans text-xl font-bold leading-snug sm:text-2xl">{block.text}</p>
      </motion.blockquote>
    )
  }

  if (block.kind === 'image') {
    return (
      <motion.figure variants={scaleIn} className="my-2">
        <div className="overflow-hidden rounded-3xl bg-neutral/30">
          <BlogIllustration variant={block.variant} className="aspect-[4/3] w-full" />
        </div>
        <figcaption className="mt-3 text-sm text-ink/50">{block.caption}</figcaption>
      </motion.figure>
    )
  }

  return (
    <motion.p variants={fadeUp} className="text-lg leading-relaxed text-ink/80">
      {renderInline(block.text)}
    </motion.p>
  )
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

  // Insert the inline newsletter opt-in after the second paragraph block — a natural
  // stopping point once the reader has decided the piece is worth their time.
  const paragraphIndices = post.body.reduce<number[]>(
    (acc, block, i) => (block.kind === 'paragraph' ? [...acc, i] : acc),
    [],
  )
  const inlineBreakIndex = paragraphIndices[Math.min(1, paragraphIndices.length - 1)] ?? -1

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

      <section className={`bg-gradient-to-br ${post.coverGradient} py-10 md:py-14`}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-xl shadow-ink/10"
          >
            <BlogIllustration variant={post.coverVariant} className="aspect-[16/9] w-full" />
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mx-auto flex max-w-2xl flex-col gap-8"
          >
            {post.body.map((block, i) => (
              <div key={i} className="contents">
                <BodyBlock block={block} />
                {i === inlineBreakIndex && (
                  <motion.div variants={fadeUp} className="rounded-3xl bg-neutral/40 p-8">
                    <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                      {t.inlineNewsletterLabel}
                    </p>
                    <div className="mt-4">
                      <NewsletterForm source="blog-inline" compact />
                    </div>
                  </motion.div>
                )}
              </div>
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
