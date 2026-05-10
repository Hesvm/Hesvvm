"use client";

import { Project } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          style={{
            width: "184px",
            height: "184px",
            borderRadius: "var(--card-radius)",
            backgroundColor: "var(--color-card)",
            overflow: "hidden",
            position: "relative",
            marginBottom: "12px",
          }}
        >
          <Image
            src={project.icon}
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
            fontSize: "12px",
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
