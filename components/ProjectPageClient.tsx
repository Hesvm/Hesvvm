"use client";

import { Project } from "@/types/project";
import BackButton from "@/components/BackButton";
import ProjectHero from "@/components/ProjectHero";
import ContentRenderer from "@/components/ContentRenderer";
import Reveal from "@/components/Reveal";
import { useRouter } from "next/navigation";

export default function ProjectPageClient({ project }: { project: Project }) {
  const router = useRouter();
  const subtitle = project.subtitle || project.category;

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

      {/* Desktop link button — hidden on mobile, only when project_url is set */}
      {project.project_url && (
        <a
          href={project.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="back-button-fixed project-link-button"
          aria-label="Open project"
          style={{
            position: "fixed",
            left: "max(16px, calc(50vw - 329px))",
            top: "112px",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            backgroundColor: "transparent",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-soft)",
            textDecoration: "none",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.83333 5.16667L11 1M11 3.77778V1H8.22222M11 7.11111V9.88889C11 10.1836 10.8829 10.4662 10.6746 10.6746C10.4662 10.8829 10.1836 11 9.88889 11H2.11111C1.81643 11 1.53381 10.8829 1.32544 10.6746C1.11706 10.4662 1 10.1836 1 9.88889V2.11111C1 1.81643 1.11706 1.53381 1.32544 1.32544C1.53381 1.11706 1.81643 1 2.11111 1H4.88889" stroke="#969189" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}

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

        {/* Link button — top right, only when project_url is set */}
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-project-link"
            aria-label="Open project"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.83333 5.16667L11 1M11 3.77778V1H8.22222M11 7.11111V9.88889C11 10.1836 10.8829 10.4662 10.6746 10.6746C10.4662 10.8829 10.1836 11 9.88889 11H2.11111C1.81643 11 1.53381 10.8829 1.32544 10.6746C1.11706 10.4662 1 10.1836 1 9.88889V2.11111C1 1.81643 1.11706 1.53381 1.32544 1.32544C1.53381 1.11706 1.81643 1 2.11111 1H4.88889" stroke="#969189" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}

        {/* Title — absolutely centered on full screen, pointer-events:none so button stays clickable */}
        <div className="mobile-project-header-title">
          <span style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "17px",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
            WebkitFontSmoothing: "antialiased",
          }}>
            {project.title}
          </span>
        </div>
      </div>

      <div className="project-content site-content">
        {(project.thumbnail_url || project.thumbnail_video_url) && (
          <Reveal>
            <ProjectHero
              thumbnail={project.thumbnail_url}
              thumbnailVideo={project.thumbnail_video_url}
              slug={project.slug}
            />
          </Reveal>
        )}

        {/* Desktop-only title/subtitle block */}
        <Reveal delay={0.08}>
          <div className="project-title-content">
            <h1
              className="project-detail-title"
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "normal",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: "0 0 6px 0",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {project.title}
            </h1>

            {subtitle && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "-0.02em",
                  color: "var(--text-muted)",
                  margin: "0 0 28px 0",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>

        <ContentRenderer blocks={project.blocks} />
      </div>
    </div>
  );
}
