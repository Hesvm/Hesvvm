"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectHero({
  thumbnail,
  slug,
}: {
  thumbnail: string;
  slug: string;
}) {
  return (
    <motion.div
      layoutId={`project-image-${slug}`}
      style={{
        borderRadius: 0,
        overflow: "hidden",
        width: "100%",
        height: "420px",
        position: "relative",
        marginBottom: "24px",
        willChange: "transform",
      }}
      transition={{
        type: "tween",
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </motion.div>
  );
}
