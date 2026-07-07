export type CaseStudy = {
  slug: string
  title: string
  /** placeholder month/year — replace with the real project date before launch */
  date: string
  tags: string[]
  summary: string
  challenge: string
  approach: string
  results: string
  /** gradient used as a placeholder cover in lieu of a real project screenshot */
  coverGradient: string
}

/**
 * PLACEHOLDER CASE STUDIES — structure is CMS-ready (add/edit objects here,
 * or later swap this file for JSON/MD + a loader). Replace with real
 * projects, real names, and real screenshots before launch. Do not ship
 * placeholder case studies to production.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'placeholder-project-one',
    title: '[Placeholder project — replace before launch]',
    date: '[Month Year]',
    tags: ['Web Development', 'Web Design'],
    summary: '[One-line outcome-focused summary of the real project goes here.]',
    challenge: '[What was broken or missing before Astratta got involved.]',
    approach: '[What Astratta designed/built and why.]',
    results: '[Concrete outcome — conversion lift, load time, leads, etc.]',
    coverGradient: 'from-primary to-primary-dark',
  },
  {
    slug: 'placeholder-project-two',
    title: '[Placeholder project — replace before launch]',
    date: '[Month Year]',
    tags: ['Digital Marketing'],
    summary: '[One-line outcome-focused summary of the real project goes here.]',
    challenge: '[What was broken or missing before Astratta got involved.]',
    approach: '[What Astratta designed/built and why.]',
    results: '[Concrete outcome — conversion lift, load time, leads, etc.]',
    coverGradient: 'from-ink to-primary-dark',
  },
  {
    slug: 'placeholder-project-three',
    title: '[Placeholder project — replace before launch]',
    date: '[Month Year]',
    tags: ['Graphic Design', 'Brand Identity'],
    summary: '[One-line outcome-focused summary of the real project goes here.]',
    challenge: '[What was broken or missing before Astratta got involved.]',
    approach: '[What Astratta designed/built and why.]',
    results: '[Concrete outcome — conversion lift, load time, leads, etc.]',
    coverGradient: 'from-secondary to-primary',
  },
]
