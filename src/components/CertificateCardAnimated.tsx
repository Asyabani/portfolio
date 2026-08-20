'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Certificate } from '@/lib/data/certificates';
// import { useLoaderReady } from '@/hooks/useLoaderReady';

type CertificateCardAnimatedProps = {
  certificate: Certificate;
};

export function CertificateCardAnimated({
  certificate,
}: CertificateCardAnimatedProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const isDetail = certificate.linkType === 'detail';
  const hasLink = certificate.linkType !== 'none';

  const cardContent = (
    <div
      className="card-body shadow-md overflow-hidden relative aspect-video"
      style={{ borderRadius: '15px' }}
    >
      <Image
        src={certificate.image}
        alt={`${certificate.title} - ${certificate.issuer}`}
        width={800}
        height={600}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
  );

  if (!hasLink) {
    return (
      <div ref={divRef} className="card">
        {cardContent}
      </div>
    );
  }

  if (isDetail) {
    return (
      <Link
        ref={linkRef}
        href={`/certificates/${certificate.id}`}
        className="card block"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      ref={linkRef}
      href={certificate.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card block"
    >
      {cardContent}
    </a>
  );
}
