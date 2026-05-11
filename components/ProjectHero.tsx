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
      layoutDependency={false}
      style={{
        borderRadius: 0,
        overflow: "hidden",
        width: "100%",
        height: "420px",
        position: "relative",
        marginBottom: "24px",
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
        mass: 1,
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
