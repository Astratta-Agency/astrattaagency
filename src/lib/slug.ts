/**
 * Turns display text into a URL-safe anchor id.
 *
 * Runs per language, so a Spanish heading yields a Spanish anchor
 * (`#por-que-no-convierte`) — better for SEO than a shared English id, and it
 * avoids duplicating an explicit id field across both translations.
 *
 * NFD + combining-mark strip handles the accented characters Spanish headings
 * carry (á é í ó ú ü → a e i o u u); ñ is mapped before stripping so it does
 * not collapse into a bare "n" via a different code path.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
