import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';
import { certificates } from '@/lib/data/certificates';
import { SITE_URL } from '@/lib/site';

// Static site: no per-entry timestamps in the data, so one build-time date.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/certificates`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/resume`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects
    .filter(project => project.linkType === 'detail')
    .map(project => ({
      url: `${SITE_URL}/portfolio/${project.id}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    }));

  const certificatePages: MetadataRoute.Sitemap = certificates
    .filter(certificate => certificate.linkType === 'detail')
    .map(certificate => ({
      url: `${SITE_URL}/certificates/${certificate.id}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    }));

  return [...pages, ...projectPages, ...certificatePages];
}
