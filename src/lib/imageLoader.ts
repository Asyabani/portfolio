/**
 * Image loader for the static GitHub Pages build: no server-side optimizer
 * there, so serve the original file — with the /portfolio basePath prefixed,
 * which `unoptimized` mode would otherwise skip.
 */
export default function pagesImageLoader({ src }: { src: string }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return src.startsWith('/') ? `${base}${src}` : src;
}
