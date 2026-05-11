"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 184px)",
        columnGap: "85px",
        rowGap: "81px",
      }}
    >
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
