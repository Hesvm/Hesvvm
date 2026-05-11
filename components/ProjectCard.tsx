"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProjectCard({
  project,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const router = useRouter();

  const handleMouseEnter = () => {
    onMouseEnter?.();
    // Preload hero image into browser cache before navigation
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = project.thumbnail;
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
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
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
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
            fontSize: "24px",
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
    </div>
  );
}
