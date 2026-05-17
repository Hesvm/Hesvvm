"use client";

import { SharedProjectImage } from "@/components/SharedProjectImage";

export default function ProjectHero({
  thumbnail,
  slug,
}: {
  thumbnail: string | null;
  slug: string;
}) {
  if (!thumbnail) return null;

  return (
    <div
      className="project-hero"
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SharedProjectImage
        layoutId={`project-image-${slug}`}
        src={thumbnail}
        alt={slug}
        style={{ width: "100%", height: "100%" }}
        sizes="(max-width: 767px) 100vw, 530px"
        priority
      />
    </div>
  );
}
