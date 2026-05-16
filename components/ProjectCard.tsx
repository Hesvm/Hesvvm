"use client";

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { SharedProjectImage } from "@/components/SharedProjectImage";
import { useRouter } from "next/navigation";

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

  const handleMouseEnter = () => {
    onMouseEnter?.();
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = project.thumbnail_url ?? '';
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        filter: anyHovered && !isHovered ? "blur(2px)" : "none",
        opacity: anyHovered && !isHovered ? 0.45 : 1,
        transition: "filter 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div
        onClick={() => router.push(`/projects/${project.slug}`)}
        style={{ cursor: "url('/cursors/link.cur'), pointer" }}
      >
        <div
          style={{
            marginBottom: "12px",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          <SharedProjectImage
            layoutId={`project-image-${project.slug}`}
            src={project.thumbnail_url ?? ''}
            alt={project.title}
            style={{
              width: "184px",
              height: "184px",
              backgroundColor: "var(--color-card)",
            }}
            sizes="(max-width: 768px) 100vw, 530px"
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
