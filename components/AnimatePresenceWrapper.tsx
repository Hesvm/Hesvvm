"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";

export default function AnimatePresenceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setClickedSlug } = useTransition();

  return (
    <LayoutGroup id="project-layout">
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setClickedSlug(null)}
      >
        <div key={pathname} style={{ position: "relative" }}>
          {children}
        </div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
