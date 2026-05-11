"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AnimatePresenceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <div key={pathname} style={{ position: "relative" }}>
        {children}
      </div>
    </AnimatePresence>
  );
}
