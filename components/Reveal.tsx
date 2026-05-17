"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export default function Reveal({ children, delay = 0, style }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div style={style}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.78,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ ...style, willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
