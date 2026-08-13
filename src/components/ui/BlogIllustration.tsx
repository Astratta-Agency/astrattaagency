import type { ReactNode } from 'react'

export type BlogIllustrationVariant = 'clarity' | 'proof' | 'gbp' | 'reviews' | 'insight' | 'checklist'

/**
 * Brand-style vector illustrations standing in for the per-post hero/inline
 * images. Isometric-flat, primary/secondary accents, no legible text — same
 * visual language as src/assets/illustrations/*.webp. Swap for generated
 * photography later without touching layout: each variant is self-contained.
 */
export function BlogIllustration({
  variant,
  className = '',
}: {
  variant: BlogIllustrationVariant
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <filter id={`soft-shadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0e0e12" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect width="400" height="300" fill="#ffffff" />
      {ILLUSTRATIONS[variant]}
    </svg>
  )
}

const ILLUSTRATIONS: Record<BlogIllustrationVariant, ReactNode> = {
  clarity: (
    <g filter="url(#soft-shadow-clarity)">
      <circle cx="200" cy="150" r="120" fill="#5140f2" fillOpacity="0.08" />
      <rect x="90" y="80" width="220" height="150" rx="16" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.08" strokeWidth="2" />
      <rect x="90" y="80" width="220" height="34" rx="16" fill="#5140f2" />
      <rect x="90" y="98" width="220" height="16" fill="#5140f2" />
      <circle cx="110" cy="97" r="5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="126" cy="97" r="5" fill="#ffffff" fillOpacity="0.5" />
      <circle cx="142" cy="97" r="5" fill="#ffffff" fillOpacity="0.5" />
      <rect x="112" y="134" width="150" height="14" rx="7" fill="#0e0e12" fillOpacity="0.85" />
      <rect x="112" y="156" width="110" height="10" rx="5" fill="#0e0e12" fillOpacity="0.3" />
      <rect x="112" y="174" width="130" height="10" rx="5" fill="#0e0e12" fillOpacity="0.3" />
      <rect x="112" y="198" width="90" height="26" rx="13" fill="#ff7503" />
      <g transform="translate(276,60)">
        <circle r="26" fill="#ffffff" stroke="#ff7503" strokeWidth="3" />
        <text x="0" y="7" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ff7503" fontFamily="sans-serif">5s</text>
      </g>
    </g>
  ),
  proof: (
    <g filter="url(#soft-shadow-proof)">
      <circle cx="200" cy="150" r="120" fill="#ff7503" fillOpacity="0.07" />
      <g transform="translate(96,90)">
        <rect x="0" y="88" width="36" height="42" rx="6" fill="#0e0e12" fillOpacity="0.15" />
        <rect x="50" y="60" width="36" height="70" rx="6" fill="#0e0e12" fillOpacity="0.25" />
        <rect x="100" y="30" width="36" height="100" rx="6" fill="#5140f2" />
        <rect x="150" y="4" width="36" height="126" rx="6" fill="#ff7503" />
      </g>
      <g transform="translate(272,50)">
        <circle r="30" fill="#5140f2" />
        <path d="M-12 1 L-3 11 L14 -10" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <g transform="translate(70,220)">
        <rect width="150" height="44" rx="12" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.1" strokeWidth="2" />
        <rect x="16" y="16" width="60" height="8" rx="4" fill="#0e0e12" fillOpacity="0.7" />
        <rect x="16" y="28" width="90" height="6" rx="3" fill="#0e0e12" fillOpacity="0.3" />
      </g>
    </g>
  ),
  gbp: (
    <g filter="url(#soft-shadow-gbp)">
      <circle cx="200" cy="150" r="120" fill="#5140f2" fillOpacity="0.07" />
      <path
        d="M200 60 C240 60 270 90 270 128 C270 175 200 230 200 230 C200 230 130 175 130 128 C130 90 160 60 200 60 Z"
        fill="#5140f2"
      />
      <circle cx="200" cy="126" r="34" fill="#ffffff" />
      <path d="M186 126 L196 136 L216 112" stroke="#5140f2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform="translate(150,246)">
        <rect width="100" height="30" rx="15" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.1" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d="M0 -6 L1.8 -1.8 L6 -1.4 L2.8 1.6 L3.6 6 L0 3.6 L-3.6 6 L-2.8 1.6 L-6 -1.4 L-1.8 -1.8 Z"
            fill="#ff7503"
            transform={`translate(${18 + i * 16},15) scale(0.8)`}
          />
        ))}
      </g>
    </g>
  ),
  reviews: (
    <g filter="url(#soft-shadow-reviews)">
      <circle cx="200" cy="150" r="120" fill="#ff7503" fillOpacity="0.07" />
      <g transform="translate(64,70)">
        <rect width="180" height="70" rx="14" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.08" strokeWidth="2" />
        <circle cx="26" cy="35" r="14" fill="#5140f2" fillOpacity="0.15" />
        <rect x="50" y="20" width="110" height="9" rx="4.5" fill="#0e0e12" fillOpacity="0.7" />
        <rect x="50" y="36" width="80" height="7" rx="3.5" fill="#0e0e12" fillOpacity="0.25" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d="M0 -5 L1.5 -1.5 L5 -1.2 L2.3 1.3 L3 5 L0 3 L-3 5 L-2.3 1.3 L-5 -1.2 L-1.5 -1.5 Z"
            fill="#ff7503"
            transform={`translate(${58 + i * 13},54) scale(0.85)`}
          />
        ))}
      </g>
      <g transform="translate(156,146)">
        <rect width="180" height="70" rx="14" fill="#5140f2" />
        <circle cx="26" cy="35" r="14" fill="#ffffff" fillOpacity="0.2" />
        <rect x="50" y="20" width="110" height="9" rx="4.5" fill="#ffffff" fillOpacity="0.9" />
        <rect x="50" y="36" width="80" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d="M0 -5 L1.5 -1.5 L5 -1.2 L2.3 1.3 L3 5 L0 3 L-3 5 L-2.3 1.3 L-5 -1.2 L-1.5 -1.5 Z"
            fill="#ffffff"
            transform={`translate(${58 + i * 13},54) scale(0.85)`}
          />
        ))}
      </g>
    </g>
  ),
  insight: (
    <g filter="url(#soft-shadow-insight)">
      <circle cx="200" cy="150" r="120" fill="#5140f2" fillOpacity="0.08" />
      <rect x="80" y="70" width="200" height="150" rx="16" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.08" strokeWidth="2" />
      <rect x="102" y="96" width="140" height="10" rx="5" fill="#0e0e12" fillOpacity="0.7" />
      <rect x="102" y="116" width="100" height="8" rx="4" fill="#0e0e12" fillOpacity="0.25" />
      <g transform="translate(102,144)">
        <rect x="0" y="36" width="24" height="24" rx="4" fill="#0e0e12" fillOpacity="0.15" />
        <rect x="32" y="24" width="24" height="36" rx="4" fill="#5140f2" fillOpacity="0.5" />
        <rect x="64" y="10" width="24" height="50" rx="4" fill="#5140f2" />
        <rect x="96" y="30" width="24" height="30" rx="4" fill="#ff7503" />
      </g>
      <g transform="translate(238,196) rotate(35)">
        <circle r="34" fill="none" stroke="#ff7503" strokeWidth="10" />
        <line x1="24" y1="24" x2="50" y2="50" stroke="#ff7503" strokeWidth="12" strokeLinecap="round" />
      </g>
    </g>
  ),
  checklist: (
    <g filter="url(#soft-shadow-checklist)">
      <circle cx="200" cy="150" r="120" fill="#ff7503" fillOpacity="0.07" />
      <rect x="96" y="58" width="208" height="184" rx="18" fill="#ffffff" stroke="#0e0e12" strokeOpacity="0.08" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(120,${92 + i * 42})`}>
          <rect
            width="26"
            height="26"
            rx="8"
            fill={i < 3 ? (i % 2 === 0 ? '#5140f2' : '#ff7503') : '#ffffff'}
            stroke={i < 3 ? 'none' : '#0e0e12'}
            strokeOpacity={i < 3 ? 1 : 0.15}
            strokeWidth="2"
          />
          {i < 3 && (
            <path
              d="M6 13 L11 19 L21 6"
              stroke="#ffffff"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
          <rect x="42" y="6" width="118" height="14" rx="7" fill="#0e0e12" fillOpacity={i < 3 ? 0.7 : 0.2} />
        </g>
      ))}
    </g>
  ),
}
