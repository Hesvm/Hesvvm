"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { motion } from "framer-motion";
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
      img.src = project.thumbnail;
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
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            width: "184px",
            height: "184px",
            backgroundColor: "var(--color-card)",
            overflow: "hidden",
            position: "relative",
            marginBottom: "12px",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
            boxShadow: isHovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "20px",
            fontWeight: 400,
            margin: "0 0 4px 0",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>
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
