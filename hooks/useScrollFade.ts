import { useRef } from "react";
import { useInView, useScroll, useTransform, MotionValue } from "framer-motion";

export function useScrollFade(): {
  ref: React.RefObject<HTMLDivElement | null>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0.2]);

  return { ref, opacity };
}
