import Image from 'next/image';
import type { Certificate } from '@/lib/data/certificates';

/**
 * CertificateCard Component - Server Component
 *
 * Displays a single certificate with:
 * - Optimized image using next/image with responsive sizes
 * - Certificate title, issuer, and date
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
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="mb-8 w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="card-body-cert rounded-md shadow-md overflow-hidden">
        <Image
          src={certificate.image}
          alt={`${certificate.title} - ${certificate.issuer}`}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-auto hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </div>
  );
}
