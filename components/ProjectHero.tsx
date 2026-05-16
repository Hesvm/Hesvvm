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
    <SharedProjectImage
      layoutId={`project-image-${slug}`}
      src={thumbnail}
      alt={slug}
      style={{
        width: "100%",
        height: "420px",
        marginBottom: "24px",
      }}
      sizes="(max-width: 768px) 100vw, 530px"
      priority
    />
  );
}
