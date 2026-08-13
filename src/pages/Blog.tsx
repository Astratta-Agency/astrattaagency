import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { BLOG_POSTS, BLOG_CATEGORIES, categoryLabel, resolveBlogPosts, type BlogCategory } from '@/data/blogPosts'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')
  const { language, dict, pick } = useLanguage()
  const t = dict.blog
  const allPosts = resolveBlogPosts(BLOG_POSTS, language)

  const posts =
    activeCategory === 'all' ? allPosts : allPosts.filter((p) => p.category === activeCategory)

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/blog'])} path="/blog" />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/60">{t.subtext}</p>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="rounded-3xl bg-neutral/40 p-8 md:p-10">
            <p className="font-sans text-sm font-bold uppercase tracking-wide text-ink/50">
              {t.newsletterLabel}
            </p>
            <div className="mt-4">
              <NewsletterForm source="blog-index" compact />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full border px-4 py-2 font-sans text-sm font-bold transition-colors ${
                activeCategory === 'all'
                  ? 'border-primary bg-primary text-white'
                  : 'border-ink/20 text-ink/60 hover:border-ink/40'
              }`}
            >
              {t.all}
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full border px-4 py-2 font-sans text-sm font-bold transition-colors ${
                  activeCategory === cat.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-ink/20 text-ink/60 hover:border-ink/40'
                }`}
              >
                {pick(cat.label)}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-10 md:grid-cols-2"
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={scaleIn}>
                <Link to={`/blog/${post.slug}`} data-cursor="Read" className="group block">
                  <div
                    className={`relative aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br ${post.coverGradient}`}
                  />
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60">
                      {categoryLabel(post.category, language)}
                    </span>
                    <span className="text-xs text-ink/40">{post.readingTime}</span>
                  </div>
                  <h2 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-md text-ink/60">{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {posts.length === 0 && <p className="text-ink/50">{t.noPosts}</p>}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-20 max-w-2xl border-t border-ink/10 pt-10"
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
        </Container>
      </section>
    </>
  )
}
