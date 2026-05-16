"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CSSProperties } from "react";

export function SharedProjectImage({
  layoutId,
  src,
  alt,
  style,
  priority = false,
  sizes,
}: {
  layoutId: string;
  src: string;
  alt: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={false}
      style={{
        overflow: "hidden",
        borderRadius: 0,
        backgroundColor: "#FFFEFA",
        position: "relative",
        transformOrigin: "center center",
        ...style,
      }}
      transition={{
        layout: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority={priority}
        sizes={sizes}
      />
    </motion.div>
  );
}
