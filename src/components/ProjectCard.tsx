import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data/projects';

/**
 * ProjectCard Component - Server Component
 *
 * Displays a single project with:
 * - Optimized image using next/image with responsive sizes
 * - Project title and description
 * - Handles both external links (opens in new tab) and detail page links (Next.js Link)
 * - Hover effects for better UX
 *
 * Performance optimizations:
 * - No 'use client' directive (Server Component)
 * - Zero client-side JavaScript
 * - Responsive images with proper sizes attribute
 * - Lazy loading enabled by default (below-fold content)
 *
 * @see https://nextjs.org/docs/app/api-reference/components/image#sizes
 */
export function ProjectCard({ project }: { project: Project }) {
  // Determine if this is an external link or internal detail page
  const isExternal = project.linkType === 'external';

  // Common card content to avoid duplication
  const cardContent = (
    <>
      <div className="card-body rounded-md shadow-md overflow-hidden relative aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-semibold text-xl text-dark mt-5 mb-3 dark:text-white">
        {project.title}
      </h3>
      <p className="font-medium text-base text-secondary dark:text-gray-300">
        {project.description}
      </p>
    </>
  );

  // Render external link with target="_blank"
  if (isExternal) {
    return (
      <div className="card">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      </div>
    );
  }

  // Render internal link with Next.js Link component
  return (
    <div className="card">
      <Link
        href={project.url}
        className="block"
      >
        {cardContent}
      </Link>
    </div>
  );
}
