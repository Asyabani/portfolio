import { projects, type ProjectStatus } from '@/lib/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getRelatedProjects } from '@/lib/utils/relatedItems';
import { ProjectCardAnimated } from '@/components/ProjectCardAnimated';
import { socialLinks } from '@/lib/data/social';

type Params = Promise<{ id: string }>;

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-progress': 'In progress',
  private: 'Private client system',
  'side-project': 'Side project',
  archived: 'Archived — site no longer online',
  concept: 'Concept',
};

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return projects
    .filter(project => project.linkType === 'detail')
    .map(project => ({ id: project.id }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const description =
    project.description ??
    `${project.title} — ${project.category} by Nurzaman Asyabani.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/portfolio/${project.id}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — Nurzaman Asyabani`,
      description,
      url: `/portfolio/${project.id}`,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Nurzaman Asyabani`,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(projects, id);
  const isExternal = project.linkType === 'external';

  return (
    <main className="min-h-screen bg-[#f0f1fa] dark:bg-[#050b23] text-dark dark:text-white pt-28 md:pt-32 pb-20 transition-colors duration-500">
      {/* Same container as /projects and /certificates: container + px-4, inner px-4 */}
      <div className="container mx-auto px-4">
        <article className="w-full px-4">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All projects
          </Link>

          {/* Header */}
          <header className="mt-8 md:mt-10 max-w-3xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-primary dark:text-teal-300">
              <span>{project.category}</span>
              {project.status && (
                <>
                  <span
                    aria-hidden="true"
                    className="text-dark/30 dark:text-white/30"
                  >
                    ·
                  </span>
                  <span className="text-secondary dark:text-gray-400 tracking-[0.25em]">
                    {STATUS_LABEL[project.status]}
                  </span>
                </>
              )}
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300/85">
                {project.description}
              </p>
            )}
            {(project.period || project.role) && (
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {project.period && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                      Period
                    </dt>
                    <dd className="mt-1 text-sm sm:text-base font-medium">
                      {project.period}
                    </dd>
                  </div>
                )}
                {project.role && (
                  <div className="max-w-xl">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                      My role
                    </dt>
                    <dd className="mt-1 text-sm sm:text-base font-medium">
                      {project.role}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </header>

          {/* Cover */}
          {/* Full container width like the /projects grid; wider ratio on large
              screens so the banner doesn't exceed the viewport height */}
          <div className="mt-10 md:mt-12 relative overflow-hidden rounded-[15px] shadow-lg aspect-[16/9] lg:aspect-[21/9] bg-slate-200 dark:bg-white/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1536px) 100vw, 1472px"
            />
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <section
              className="mt-12 md:mt-16 max-w-3xl"
              aria-labelledby="project-highlights"
            >
              <h2
                id="project-highlights"
                className="text-xs font-semibold uppercase tracking-[0.35em] text-primary dark:text-teal-300"
              >
                What I built
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-200/90">
                {project.highlights.map(item => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-5 shrink-0 bg-primary/70 dark:bg-teal-300/70"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-12 md:mt-16" aria-label="More screenshots">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {project.gallery.map(([src, caption]) => (
                  <li key={src}>
                    <figure>
                      <div className="relative overflow-hidden rounded-[15px] shadow-md aspect-[16/9] bg-slate-200 dark:bg-white/5">
                        <Image
                          src={src}
                          alt={`${project.title} — ${caption}`}
                          fill
                          loading="lazy"
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 540px"
                        />
                      </div>
                      <figcaption className="mt-2.5 text-xs sm:text-sm text-secondary dark:text-gray-400">
                        {caption}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Meta */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-dark/10 dark:border-white/10 pt-8">
            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                {project.stack ? 'Stack' : 'Tags'}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {(project.stack ?? project.tags).map(item => (
                  <li
                    key={item}
                    className="rounded-full border border-dark/15 dark:border-white/15 px-3 py-1 text-xs font-medium tracking-wide"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {project.stack && (
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-secondary dark:text-gray-400">
                  {project.tags.join(' · ')}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                Links
              </p>
              <div className="mt-3 flex flex-col items-start gap-3">
                {(project.liveUrl || isExternal) && (
                  <a
                    href={project.liveUrl ?? project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-white hover:bg-teal-700 dark:bg-teal-400 dark:text-[#050b23] dark:hover:bg-teal-300 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                  >
                    {project.liveLabel ?? 'Visit site'}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-dark/30 dark:border-white/30 hover:border-primary hover:text-primary dark:hover:border-teal-300 dark:hover:text-teal-300 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                  >
                    Source code
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                <a
                  href={socialLinks.email}
                  className="inline-flex items-center gap-2 px-1 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
                >
                  Ask about this project
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        {relatedProjects.length > 0 && (
          <section className="w-full px-4 mt-20 md:mt-28">
            <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                More {project.category.toLowerCase()} work
              </h2>
              <Link
                href="/projects"
                className="hidden sm:inline-flex text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
              >
                See all projects
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedProjects.slice(0, 4).map(related => (
                <ProjectCardAnimated key={related.id} project={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
