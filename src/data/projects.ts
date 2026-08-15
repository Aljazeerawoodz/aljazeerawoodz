import type { Bi } from "./types";

/**
 * No completed Al Jazeera Woodz projects were supplied with this build, so
 * this list intentionally starts empty rather than inventing case studies.
 * Drop real project entries in here — with real photography in
 * /public/projects/<slug>/ — once they're available, and the /projects
 * grid + filters will pick them up automatically.
 */
export type ServiceSlug = "interior-fitout" | "joinery" | "kitchens-cabinets" | "custom-furniture";
export type ProjectCategory = "residential" | "commercial" | "retail";

export interface Project {
  slug: string;
  title: Bi;
  location: Bi;
  service: ServiceSlug;
  category: ProjectCategory;
  year: string;
  summary: Bi;
  coverImage: string;
  gallery: string[];
}

export const projects: Project[] = [];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
