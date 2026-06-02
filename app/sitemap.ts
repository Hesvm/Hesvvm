import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedProjects } from "@/lib/getProjects";

// Re-generate on each request so newly published projects appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/notes`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/buildings`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getPublishedProjects();
    projectRoutes = projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // If the data source is unavailable, still return the static routes.
  }

  return [...staticRoutes, ...projectRoutes];
}
