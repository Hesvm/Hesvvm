import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
