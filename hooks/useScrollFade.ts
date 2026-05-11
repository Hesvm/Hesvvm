"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

export function useScrollFade() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px"
  })

  return { ref, isInView }
}
