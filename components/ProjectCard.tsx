"use client";

import { Project } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        filter: anyHovered && !isHovered ? "blur(2px)" : "none",
        opacity: anyHovered && !isHovered ? 0.45 : 1,
        transition: "filter 0.3s ease, opacity 0.3s ease",
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block">
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
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
            boxShadow: isHovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
          }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
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
      </Link>
    </motion.div>
  );
}
