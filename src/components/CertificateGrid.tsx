import { certificates } from '@/lib/data/certificates';
import { CertificateCardAnimated } from './CertificateCardAnimated';
import { FeaturedHeading } from './FeaturedHeading';
import Link from 'next/link';

/**
 * CertificateGrid Component - Server Component
 *
 * Displays a responsive grid of certificates.
 * Shows 6 certificates initially with link to view all.
 *
 * Performance optimizations:
 * - No 'use client' directive (Server Component)
 * - Static data imported from lib/data/certificates
 * - Zero client-side JavaScript
 * - All images use next/image with responsive sizes
 * - Grid layout is responsive (mobile: 1 col, tablet: 2 col, desktop: 3 col)
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/server-components
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching
 */
export function CertificateGrid() {
  const displayedCertificates = certificates.slice(0, 6);

  return (
    <section
      id="certificates"
      className="pt-36 pb-16 bg-[#f0f1fa] dark:bg-[#030711]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="w-full px-4">
          <div className="w-full mx-auto text-center mb-16">
            <FeaturedHeading
              text="Achievements"
              className="text-dark dark:text-white"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map(certificate => (
            <CertificateCardAnimated
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </div>

        {/* View More Button */}
        {certificates.length > 6 && (
          <div className="w-full px-4 mt-12 text-center">
            <Link
              href="/certificates"
              className="inline-flex items-center px-8 py-3 bg-white hover:bg-gray-100 text-dark rounded-full transition-colors font-medium"
            >
              SEE ALL CERTIFICATES
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
