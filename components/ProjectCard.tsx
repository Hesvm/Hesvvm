"use client";

import { useRef } from "react";
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
  const { clickedSlug, setClickedSlug, setCardRect, setThumbnail } = useTransition();
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);

  const isClicked = clickedSlug === project.slug;

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
          if (!imageRef.current) return;
          const rect = imageRef.current.getBoundingClientRect();
          setCardRect({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
          setThumbnail(project.thumbnail);
          setClickedSlug(project.slug);
          router.push(`/projects/${project.slug}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          ref={imageRef}
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
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            opacity: isClicked ? 0 : 1,
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
    </motion.div>
  );
}
