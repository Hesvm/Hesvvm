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
  const description = project.subtitle || firstText?.content.slice(0, 160) || project.category || undefined;

  const ogImage = project.og_image_url ?? project.thumbnail_url

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: ogImage ? [ogImage] : [],
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

  if (!project) notFound();

  return <ProjectPageClient project={project!} />;
}
