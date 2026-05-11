"use client";

import { motion } from "framer-motion";
import { useScrollFade } from "@/hooks/useScrollFade";

export default function ScrollBlock({ children }: { children: React.ReactNode }) {
  const { ref, opacity } = useScrollFade();

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
