import { BlogIllustration, type BlogIllustrationVariant } from '@/components/ui/BlogIllustration'

type BlogCoverProps = {
  gradient: string
  variant: BlogIllustrationVariant
  /** Real cover art; when absent the vector illustration renders instead. */
  src?: string
  alt?: string
  className?: string
  /** Cover art is decorative on cards, where the adjacent title already names the post. */
  decorative?: boolean
  /** Set on the article hero: it is the LCP element, so it must not lazy-load. */
  priority?: boolean
}

/**
 * The cover surface shared by article heroes and post cards.
 *
 * Keeps one place aware of the image-vs-illustration fallback, so dropping real
 * photography into `blogPosts.ts` later needs no layout changes anywhere.
 */
export function BlogCover({ gradient, variant, src, alt, className = '', decorative = false, priority = false }: BlogCoverProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={decorative ? '' : (alt ?? '')}
          aria-hidden={decorative || !alt ? true : undefined}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding={priority ? 'sync' : 'async'}
          className="h-full w-full object-cover"
        />
      ) : (
        <BlogIllustration variant={variant} className="h-full w-full" />
      )}
    </div>
  )
}
