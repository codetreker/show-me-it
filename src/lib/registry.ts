import registryData from "../../mockup-registry.json";

export interface MockupMeta {
  label: string;
  description: string;
  author: string;
  date: string;
  status: string;
}

export interface ProjectMeta {
  label: string;
  mockups: Record<string, MockupMeta>;
}

export interface Registry {
  projects: Record<string, ProjectMeta>;
}

export function getRegistry(): Registry {
  return registryData as Registry;
}

export function getProject(slug: string): ProjectMeta | undefined {
  return getRegistry().projects[slug];
}

export function getMockup(
  projectSlug: string,
  mockupSlug: string
): MockupMeta | undefined {
  return getProject(projectSlug)?.mockups[mockupSlug];
}

export function allProjectSlugs(): string[] {
  return Object.keys(getRegistry().projects);
}

export function allMockupParams(): { project: string; mockup: string }[] {
  const registry = getRegistry();
  const params: { project: string; mockup: string }[] = [];
  for (const [project, projectMeta] of Object.entries(registry.projects)) {
    for (const mockup of Object.keys(projectMeta.mockups)) {
      params.push({ project, mockup });
    }
  }
  return params;
}
