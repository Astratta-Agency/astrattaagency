import { Link } from 'react-router-dom'

/** Cross-links to the pricing quote tool and bundled packages — reused across every tier page. */
export function QuoteCallout() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-neutral/40 p-6 md:p-8">
      <p className="text-ink/70">
        Combining this with other services?{' '}
        <Link to="/pricing" className="font-bold text-primary">
          Get a pricing quote
        </Link>{' '}
        or{' '}
        <Link to="/packages" className="group font-bold text-primary">
          see our bundled packages{' '}
          <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
            →
          </span>
        </Link>
      </p>
    </div>
  )
}
