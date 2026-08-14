import { motion } from 'framer-motion'
import { Link } from '@/components/ui/Link'
import { BlogCover } from '@/components/blog/BlogCover'
import { BLOG_POSTS, categoryLabel, resolveBlogPost, type BlogCategory } from '@/data/blogPosts'
import { scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type RelatedPostsProps = {
  /** Canonical English slug of the article being read, so it excludes itself. */
  currentSlugEn: string
  category: BlogCategory
}

const MAX_RELATED = 3

export function RelatedPosts({ currentSlugEn, category }: RelatedPostsProps) {
  const { language, dict } = useLanguage()
  const t = dict.blog.post

  // Same category first, then the most recent of anything else. Filling the
  // remainder matters: with few posts a strict category match returns nothing,
  // which is why this section never used to render.
  const others = BLOG_POSTS.filter((p) => p.slug.en !== currentSlugEn)
  const byRecency = (a: { publishedAt: string }, b: { publishedAt: string }) =>
    b.publishedAt.localeCompare(a.publishedAt)

  const picked = [
    ...others.filter((p) => p.category === category).sort(byRecency),
    ...others.filter((p) => p.category !== category).sort(byRecency),
  ].slice(0, MAX_RELATED)

  if (picked.length === 0) return null

  return (
    <section className="mt-16 border-t border-ink/10 pt-10">
      <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary">{t.readNext}</h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {picked.map((source) => {
          const post = resolveBlogPost(source, language)
          return (
            <motion.div key={source.slug.en} variants={scaleIn}>
              {/* Link takes the canonical English path; it localizes internally. */}
              <Link to={`/blog/${source.slug.en}`} data-cursor="Read" className="group block">
                <BlogCover
                  gradient={post.coverGradient}
                  variant={post.coverVariant}
                  src={post.coverImage}
                  decorative
                  className="aspect-[16/9] rounded-2xl"
                />
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-neutral px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/60">
                    {categoryLabel(post.category, language)}
                  </span>
                  <span className="text-[11px] text-ink/40">{post.readingTime}</span>
                </div>
                <h3 className="mt-2 font-sans text-lg font-extrabold leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
