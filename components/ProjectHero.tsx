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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut", delay: 0.4 }}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "420px",
        position: "relative",
        marginBottom: "24px",
      }}
    >
      <Image
        src={thumbnail}
        alt={slug}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </motion.div>
  );
}
