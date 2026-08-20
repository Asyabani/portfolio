import { projects } from '@/lib/data/projects';
import { ProjectCardAnimated } from './ProjectCardAnimated';
import Link from 'next/link';
import { FeaturedHeading } from './FeaturedHeading';
import { PortfolioTagline } from './PortfolioTagline';
import { PortfolioScrollReveal } from './PortfolioScrollReveal';
import { CertificateGrid } from './CertificateGrid';

/**
 * PortfolioGrid Component - Server Component
 *
 * Displays portfolio with view more functionality.
 * Shows 6 projects initially with link to view all.
 * Also includes CertificateGrid so both sections live inside
 * the same scroll-reveal curtain panel.
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/server-components
 */
export function PortfolioGrid() {
  const displayedProjects = projects.slice(0, 6);

  return (
    <PortfolioScrollReveal>
      <section
        id="portfolio"
        className="pt-36 pb-16 bg-[#f5f6ff] text-dark dark:bg-[#081226] dark:text-white transition-colors duration-500"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="w-full px-4">
            <div className="w-full mx-auto text-center mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="portfolio-reveal-heading">
                  <FeaturedHeading className="text-dark dark:text-white" />
                </div>
                <div className="portfolio-reveal-tagline">
                  <PortfolioTagline className="font-normal text-start text-dark/70 dark:text-white/70 text-sm sm:text-sm lg:text-sm leading-5 max-w-75 block" />
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {displayedProjects.map(project => (
              <div key={project.id} className="portfolio-reveal-card">
                <ProjectCardAnimated project={project} />
              </div>
            ))}
          </div>

          {/* View More Button */}
          {projects.length > 6 && (
            <div className="w-full px-4 mt-12 text-center portfolio-reveal-cta">
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-3 bg-white hover:bg-gray-100 text-dark rounded-full transition-colors font-medium"
              >
                SEE ALL PROJECTS
              </Link>
            </div>
          )}
        </div>
      </section>

      <CertificateGrid />
    </PortfolioScrollReveal>
  );
}
