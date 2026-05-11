"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import BackButton from "@/components/BackButton";
import ProjectHero from "@/components/ProjectHero";
import ContentRenderer from "@/components/ContentRenderer";
import ScrollBlock from "@/components/ScrollBlock";

export default function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        padding: "0 var(--page-padding) 120px",
      }}
    >
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div style={{ paddingTop: "48px" }}>
          <ProjectHero thumbnail={project.thumbnail} />
        </div>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            paddingBottom: "48px",
          }}
        >
          <ScrollBlock>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "56px",
                fontWeight: 400,
                margin: "0 0 8px 0",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                color: "rgba(0,0,0,0.4)",
                margin: 0,
              }}
            >
              {project.category}
            </p>
          </ScrollBlock>
        </div>
        <ContentRenderer blocks={project.blocks} />
      </motion.div>
    </div>
  );
}
