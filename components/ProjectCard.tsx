"use client";

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { SharedProjectImage } from "@/components/SharedProjectImage";
import { useRouter } from "next/navigation";
import { useIsHoverCapable } from "@/hooks/useIsHoverCapable";
import { useCallback, useEffect, useRef } from "react";

const HERO_IMAGE_QUALITY = 75;
const HERO_IMAGE_SIZES = "(max-width: 767px) 100vw, 540px";
const NEXT_IMAGE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function getOptimizedImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${HERO_IMAGE_QUALITY}`;
}

function getApproximateOptimizedHeroImageUrl(src: string) {
  const cssWidth = window.innerWidth <= 767 ? window.innerWidth : 540;
  const targetWidth = cssWidth * window.devicePixelRatio;
  const width =
    NEXT_IMAGE_WIDTHS.find((candidate) => candidate >= targetWidth) ??
    NEXT_IMAGE_WIDTHS[NEXT_IMAGE_WIDTHS.length - 1];

  return getOptimizedImageUrl(src, width);
}

function getOptimizedHeroImageSrcSet(src: string) {
  return NEXT_IMAGE_WIDTHS.map(
    (width) => `${getOptimizedImageUrl(src, width)} ${width}w`
  ).join(", ");
}

function preloadHeroImage(src: string) {
  const optimizedHeroImageUrl = getApproximateOptimizedHeroImageUrl(src);
  let link = document.querySelector<HTMLLinkElement>(
    `link[rel="preload"][as="image"][data-project-hero-preload="${encodeURIComponent(src)}"]`
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = optimizedHeroImageUrl;
    link.fetchPriority = "high";
    link.setAttribute("imagesrcset", getOptimizedHeroImageSrcSet(src));
    link.setAttribute("imagesizes", HERO_IMAGE_SIZES);
    link.dataset.projectHeroPreload = encodeURIComponent(src);
    document.head.appendChild(link);
  }

  const img = new window.Image();
  img.decoding = "async";
  img.fetchPriority = "high";
  img.src = optimizedHeroImageUrl;
  void img.decode?.().catch(() => {});
}

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
  const isHoverCapable = useIsHoverCapable();
  const cardRef = useRef<HTMLDivElement>(null);
  const routePrefetchedRef = useRef(false);
  const imagePreloadedRef = useRef(false);

  const prefetchProjectRoute = useCallback(() => {
    if (routePrefetchedRef.current) return;
    routePrefetchedRef.current = true;
    void router.prefetch(`/projects/${project.slug}`);
  }, [project.slug, router]);

  const preloadProjectImage = useCallback(() => {
    if (imagePreloadedRef.current || !project.thumbnail_url) return;
    imagePreloadedRef.current = true;
    preloadHeroImage(project.thumbnail_url);
  }, [project.thumbnail_url]);

  const warmProject = useCallback(() => {
    prefetchProjectRoute();
    preloadProjectImage();
  }, [prefetchProjectRoute, preloadProjectImage]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        warmProject();
        observer.disconnect();
      },
      { threshold: 0.01 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [warmProject]);

  const handleMouseEnter = () => {
    onMouseEnter?.();
    warmProject();
  };

  const handleFocus = () => {
    warmProject();
  };

  const preloadProjectRoute = () => {
    warmProject();
  };

  const handleClick = () => {
    warmProject();
    router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        filter: isHoverCapable && anyHovered && !isHovered ? "blur(2px)" : "none",
        opacity: isHoverCapable && anyHovered && !isHovered ? 0.45 : 1,
        transition: "filter 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div
        onPointerDown={preloadProjectRoute}
        onClick={handleClick}
        onFocus={handleFocus}
        style={{ cursor: "url('/cursors/link.cur'), pointer" }}
      >
        <div
          className="project-card-thumbnail"
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "12px",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isHoverCapable && isHovered ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          <SharedProjectImage
            layoutId={`project-image-${project.slug}`}
            src={project.thumbnail_url ?? ''}
            alt={project.title}
            style={{ width: "100%", height: "100%" }}
            sizes="(max-width: 767px) 50vw, 156px"
          />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "22px",
            fontWeight: 400,
            margin: "0 0 3px 0",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "16px",
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
