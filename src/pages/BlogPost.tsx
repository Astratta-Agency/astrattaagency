import { Navigate, useParams } from 'react-router-dom'
import { Link } from '@/components/ui/Link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { ArticleToc } from '@/components/blog/ArticleToc'
import { BlogCover } from '@/components/blog/BlogCover'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareRow } from '@/components/blog/ShareRow'
import { StickyArticleBar } from '@/components/blog/StickyArticleBar'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { BlogIllustration } from '@/components/ui/BlogIllustration'
import { BLOG_POSTS, categoryLabel, resolveBlogPost, type BlogBlock } from '@/data/blogPosts'
import { EASE, fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localizedPath } from '@/lib/i18n/routes'
import { SITE } from '@/lib/constants'
import { slugify } from '@/lib/slug'
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

/** Heading text minus the `**bold**` markers, used for anchors and the TOC. */
function plainText(text: string): string {
  return text.replace(/\*\*/g, '')
}

function headingId(text: string): string {
  return slugify(plainText(text))
}

/**
 * The reading column stays page-centered at every breakpoint, so the title,
 * cover, and body share one axis. The table of contents floats into the left
 * margin instead of taking a grid track — reserving one would shove the whole
 * article off-centre on wide screens.
 */
const ARTICLE_COL = 'mx-auto w-full max-w-2xl'

function BodyBlock({ block }: { block: BlogBlock }) {
  if (block.kind === 'heading') {
    return (
      <motion.h2
        id={headingId(block.text)}
        variants={fadeUp}
        // scroll-mt keeps the heading clear of the fixed bars when Lenis is off
        // (reduced motion) and the browser performs a native anchor jump.
        className="mt-4 scroll-mt-32 border-l-4 border-primary pl-5 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
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
        {block.src ? (
          <img
            src={block.src}
            alt={block.alt ?? ''}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        ) : (
          <div className="overflow-hidden rounded-3xl bg-neutral/30">
            <BlogIllustration variant={block.variant} className="aspect-[4/3] w-full" />
          </div>
        )}
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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  // The sticky bar takes over once the real headline leaves the viewport.
  const titleVisible = useInView(titleRef, { margin: '-80px 0px 0px 0px' })
  const t = dict.blog.post
  const source = BLOG_POSTS.find((p) => p.slug[language] === slug)

  // Reached through the other language's slug (e.g. an English slug under /es/):
  // redirect to this language's canonical URL so the post never indexes twice.
  const crossLanguage = source ? undefined : BLOG_POSTS.find((p) => p.slug.en === slug || p.slug.es === slug)
  if (crossLanguage) {
    return <Navigate to={localizedPath('blogDetail', language, { slug: crossLanguage.slug[language] })} replace />
  }

  const post = source ? resolveBlogPost(source, language) : undefined
  if (!post) return <Navigate to={localizedPath('blog', language)} replace />

  const canonicalPath = `/blog/${source!.slug.en}`
  const tocItems = post.body.flatMap((block) =>
    block.kind === 'heading' ? [{ id: headingId(block.text), text: plainText(block.text) }] : [],
  )

  // Insert the inline newsletter opt-in after the second paragraph block — a natural
  // stopping point once the reader has decided the piece is worth their time.
  const paragraphIndices = post.body.reduce<number[]>(
    (acc, block, i) => (block.kind === 'paragraph' ? [...acc, i] : acc),
    [],
  )
  const inlineBreakIndex = paragraphIndices[Math.min(1, paragraphIndices.length - 1)] ?? -1

  return (
    <>
      <Seo title={post.metaTitle} description={post.metaDescription} path={canonicalPath} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedAt,
          inLanguage: language,
          author: { '@type': 'Person', name: post.author.name },
          publisher: { '@type': 'Organization', name: SITE.name },
          mainEntityOfPage: `https://${SITE.domain}${canonicalPath}`,
        }}
      />

      <StickyArticleBar
        title={post.title}
        path={canonicalPath}
        items={tocItems}
        target={articleRef}
        visible={!titleVisible}
      />

      <section className="bg-white pb-10 pt-40 md:pb-12 md:pt-48">
        <Container>
          <div className={ARTICLE_COL}>
            <div>
              <Breadcrumbs
                items={[
                  { label: t.breadcrumb, href: '/blog' },
                  { label: post.title, href: canonicalPath },
                ]}
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60">
                  {categoryLabel(post.category, language)}
                </span>
                <span className="text-xs text-ink/40">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time> ·{' '}
                  {post.readingTime}
                </span>
              </div>

              <h1
                ref={titleRef}
                className="mt-5 font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
              >
                <RevealText text={post.title} animateOnMount />
              </h1>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-ink/10 pt-6">
                <p className="text-sm">
                  <span className="text-ink/40">{t.byAuthor} </span>
                  <span className="font-bold text-ink">{post.author.name}</span>
                  <span className="block text-xs text-ink/40">{post.author.role}</span>
                </p>
                <ShareRow path={canonicalPath} title={post.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={`bg-gradient-to-br ${post.coverGradient} py-10 md:py-14`}>
        <Container>
          <div className={ARTICLE_COL}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden rounded-3xl shadow-xl shadow-ink/10"
            >
              <BlogCover
                gradient={post.coverGradient}
                variant={post.coverVariant}
                src={post.coverImage}
                alt={post.coverAlt}
                decorative={!post.coverAlt}
                priority
                className="aspect-[16/9] w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className={`relative ${ARTICLE_COL}`}>
            {tocItems.length > 0 && (
              // right-full parks the rail just left of the reading column, inside
              // the page margin, so the column itself never moves.
              <aside className="absolute right-full top-0 hidden h-full w-[230px] pr-10 xl:block">
                <ArticleToc items={tocItems} />
              </aside>
            )}

            <div>
              <motion.article
                ref={articleRef}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerContainer(0.08)}
                className="flex flex-col gap-8"
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
              </motion.article>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-ink/10 pt-8"
              >
                <p className="text-ink/60">
                  {t.ctaText}{' '}
                  <Link to="/diagnostic" className="group font-bold text-primary">
                    {t.ctaLink}{' '}
                    <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                      →
                    </span>
                  </Link>
                </p>
                <ShareRow path={canonicalPath} title={post.title} />
              </motion.div>

              <RelatedPosts currentSlugEn={source!.slug.en} category={post.category} />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="mt-16 rounded-3xl bg-neutral/40 p-8"
              >
                <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
                  {t.enjoyedLabel}
                </p>
                <p className="mt-2 text-ink/70">{t.enjoyedText}</p>
                <div className="mt-4">
                  <NewsletterForm source="blog-footer" compact />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
