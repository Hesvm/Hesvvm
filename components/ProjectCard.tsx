"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";

export function ProjectCard({
  project,
  isHovered,
  anyHovered,
  isTransitioning,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isHovered?: boolean;
  anyHovered?: boolean;
  isTransitioning?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const { setClickedSlug } = useTransition();
  const router = useRouter();

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        filter: anyHovered && !isHovered ? "blur(2px)" : "none",
        opacity: isTransitioning ? 0 : anyHovered && !isHovered ? 0.45 : 1,
        transition: "filter 0.3s ease, opacity 0.3s ease",
        pointerEvents: isTransitioning ? "none" : "auto",
      }}
    >
      <div
        onClick={() => {
          setClickedSlug(project.slug);
          router.push(`/projects/${project.slug}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <motion.div
          layoutId={`project-image-${project.slug}`}
          style={{
            width: "184px",
            height: "184px",
            borderRadius: 0,
            backgroundColor: "var(--color-card)",
            overflow: "hidden",
            position: "relative",
            marginBottom: "12px",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
            boxShadow: isHovered ? "0 12px 32px rgba(0,0,0,0.036)" : "none",
            willChange: "transform",
          }}
          transition={{
            type: "tween",
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <motion.h3
          layoutId={`project-title-${project.slug}`}
          transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "24px",
            fontWeight: 400,
            margin: "0 0 4px 0",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </motion.h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "14px",
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
