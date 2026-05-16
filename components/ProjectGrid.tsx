"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isHovered={hoveredSlug === project.slug}
          anyHovered={hoveredSlug !== null}
          onMouseEnter={() => setHoveredSlug(project.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        />
      ))}
    </div>
  );
}
