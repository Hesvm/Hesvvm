import { getProjectBySlug, getPublishedProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";
import type { Metadata } from "next";
import type { TextBlock } from "@/types/project";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const firstText = project.blocks.find((b) => b.type === "text") as TextBlock | undefined;
  const description = firstText
    ? firstText.content.slice(0, 160)
    : project.category;

  return {
    title: project.title,
    description,
    openGraph: {
      images: project.thumbnail_url ? [project.thumbnail_url] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
