"use client"

import { motion } from "framer-motion"
import { useScrollFade } from "@/hooks/useScrollFade"

export default function ScrollBlock({ children }: { children: React.ReactNode }) {
  const { ref, isInView } = useScrollFade()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
