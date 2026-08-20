import type { Project } from '@/lib/data/projects';
import type { Certificate } from '@/lib/data/certificates';

/**
 * Get related projects based on category
 * Returns max 6 projects that match the given category
 */
export function getRelatedProjects(
  allProjects: Project[],
  currentProjectId: string
): Project[] {
  // Find current project to get its category
  const currentProject = allProjects.find(p => p.id === currentProjectId);

  if (!currentProject) return [];

  // Get projects with same category, excluding current
  const related = allProjects
    .filter(p => p.category === currentProject.category && p.id !== currentProjectId)
    .slice(0, 6);

  return related;
}

/**
 * Get related certificates
 * Returns max 6 certificates (can be filtered by issuer or just show latest)
 */
export function getRelatedCertificates(
  allCertificates: Certificate[],
  currentCertificateId: string
): Certificate[] {
  // Find current certificate to get issuer
  const currentCert = allCertificates.find(c => c.id === currentCertificateId);

  if (!currentCert) return [];

  // Get certificates from same issuer, excluding current
  const related = allCertificates
    .filter(c => c.issuer === currentCert.issuer && c.id !== currentCertificateId)
    .slice(0, 6);

  return related;
}
