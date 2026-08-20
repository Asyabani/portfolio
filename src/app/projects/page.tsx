import { projects } from '@/lib/data/projects';
import type { Metadata } from 'next';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { FeaturedCaseStudies } from '@/components/projects/FeaturedCaseStudies';
import { ProjectIndex } from '@/components/projects/ProjectIndex';

export const metadata: Metadata = {
  title: 'Projects',
  description: `${projects.length} real-world projects by Nurzaman Asyabani — SaaS platforms, business systems, booking and POS apps, and company sites built with React, Next.js, Laravel, and Go for clients across Indonesia.`,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — Nurzaman Asyabani',
    description: `${projects.length} real-world projects: SaaS platforms, business systems, booking and POS apps, and company sites built with React, Next.js, Laravel, and Go.`,
    url: '/projects',
  },
};

// Featured rows follow the data order: live production sites first, then the
// newest flagship work (see the ordering note in lib/data/projects.ts).
const FEATURED_COUNT = 5;

export default function AllProjectsPage() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const liveCount = projects.filter(p => p.status === 'live').length;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f0f1fa] text-dark transition-colors duration-500 dark:bg-[#050b23] dark:text-white">
      <ProjectsHero total={projects.length} liveCount={liveCount} />
      <FeaturedCaseStudies projects={featured} total={projects.length} />
      <ProjectIndex projects={projects} />
    </main>
  );
}
