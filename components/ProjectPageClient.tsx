"use client";

import { Project } from "@/data/projects";
import BackButton from "@/components/BackButton";
import ProjectHero from "@/components/ProjectHero";
import ContentRenderer from "@/components/ContentRenderer";

export default function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        padding: "0 var(--page-padding) 80px",
      }}
    >
      <BackButton />

      <div style={{ maxWidth: "760px", margin: "0 auto", paddingTop: "32px" }}>
        <ProjectHero thumbnail={project.thumbnail} slug={project.slug} />

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "42px",
            fontWeight: 400,
            margin: "0 0 6px 0",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "rgba(0,0,0,0.4)",
            margin: "0 0 28px 0",
          }}
        >
          {project.category}
        </p>

        <ContentRenderer blocks={project.blocks} />
      </div>
    </div>
  );
}
