"use client";

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { SharedProjectImage } from "@/components/SharedProjectImage";
import { useRouter } from "next/navigation";
import { useIsHoverCapable } from "@/hooks/useIsHoverCapable";

export function ProjectCard({
  project,
  isHovered,
  anyHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isHovered?: boolean;
  anyHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const router = useRouter();
  const isHoverCapable = useIsHoverCapable();

  const handleMouseEnter = () => {
    onMouseEnter?.();
    router.prefetch(`/projects/${project.slug}`);
  };

  const handleFocus = () => {
    router.prefetch(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        filter: isHoverCapable && anyHovered && !isHovered ? "blur(2px)" : "none",
        opacity: isHoverCapable && anyHovered && !isHovered ? 0.45 : 1,
        transition: "filter 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div
        onClick={() => router.push(`/projects/${project.slug}`)}
        onFocus={handleFocus}
        style={{ cursor: "url('/cursors/link.cur'), pointer" }}
      >
        <div
          className="project-card-thumbnail"
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "12px",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isHoverCapable && isHovered ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          <SharedProjectImage
            layoutId={`project-image-${project.slug}`}
            src={project.thumbnail_url ?? ''}
            alt={project.title}
            style={{ width: "100%", height: "100%" }}
            sizes="(max-width: 767px) 50vw, 184px"
          />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "22px",
            fontWeight: 400,
            margin: "0 0 3px 0",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "16px",
            color: "var(--color-text-year)",
            margin: 0,
          }}
        >
          {project.year}
        </p>
      </div>
    </motion.div>
  );
}
