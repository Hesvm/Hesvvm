"use client";

import { Project } from "@/types/project";
import BackButton from "@/components/BackButton";
import ProjectHero from "@/components/ProjectHero";
import ContentRenderer from "@/components/ContentRenderer";
import { useRouter } from "next/navigation";

export default function ProjectPageClient({ project }: { project: Project }) {
  const router = useRouter();
  const subtitle = project.subtitle || project.category;
  const mobileSubtitle = [project.year, subtitle].filter(Boolean).join(" - ");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        paddingBottom: "80px",
      }}
    >
      {/* Desktop back button — hidden on mobile */}
      <BackButton />

      {/* Mobile-only fixed header */}
      <div className="mobile-project-header">
        {/* Back button — absolute so it doesn't affect title centering */}
        <button
          className="mobile-project-back"
          onClick={() => router.back()}
          aria-label="Back to home"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L1 6L6 11" stroke="#969189" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Title — absolutely centered on full screen, pointer-events:none so button stays clickable */}
        <div className="mobile-project-header-title">
          <span style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "26px",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
          }}>
            {project.title}
          </span>
        </div>
      </div>

      <div className="project-content site-content">
        <ProjectHero thumbnail={project.thumbnail_url} slug={project.slug} />

        {/* Desktop-only title/subtitle block */}
        <div className="project-title-content">
          <h1
            className="project-detail-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 6px 0",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "18px",
                color: "var(--text-muted)",
                margin: "0 0 28px 0",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <ContentRenderer blocks={project.blocks} />
      </div>
    </div>
  );
}
