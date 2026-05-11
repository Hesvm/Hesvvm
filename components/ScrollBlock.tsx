"use client"

import { motion } from "framer-motion"
import { useScrollFade } from "@/hooks/useScrollFade"

export default function ScrollBlock({ children }: { children: React.ReactNode }) {
  const { ref, isInView } = useScrollFade()

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isInView ? 1 : 0.15,
        y: isInView ? 0 : 16,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
