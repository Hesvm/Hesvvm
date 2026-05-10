"use client";

import { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 184px)",
        columnGap: "85px",
        rowGap: "81px",
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}
