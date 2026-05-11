"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Project } from "@/data/projects";
import BackButton from "@/components/BackButton";
import ProjectHero from "@/components/ProjectHero";
import ContentRenderer from "@/components/ContentRenderer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectPageClient({ project }: { project: Project }) {
  // Phase 1: Lock — freeze scroll for the duration of the transition
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 900);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Phase 3: Atmosphere — background materialises behind the expanding card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--color-bg)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
          padding: "0 var(--page-padding) 80px",
        }}
      >
        <BackButton />

        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Phase 2: Expansion — shared image morphs from card via layoutId */}
          <div style={{ paddingTop: "32px" }}>
            <ProjectHero thumbnail={project.thumbnail} slug={project.slug} />
          </div>

          {/* Phase 2: Shared title — morphs from card h3, preserves left alignment */}
          <motion.h1
            layoutId={`project-title-${project.slug}`}
            transition={{ type: "tween", duration: 0.65, ease: EASE }}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "42px",
              fontWeight: 400,
              margin: "0 0 6px 0",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </motion.h1>

          {/* Phase 4 + 5: Content reveal with settle — appears after image lands */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 1.015 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{
              opacity: { duration: 0.35, ease: "easeOut", delay: 0.5 },
              y: { duration: 0.35, ease: "easeOut", delay: 0.5 },
              scale: { duration: 0.7, ease: EASE, delay: 0.55 },
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "rgba(0,0,0,0.4)",
                margin: "0 0 28px 0",
              }}
            >
              {project.category}
            </p>
            <ContentRenderer blocks={project.blocks} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
