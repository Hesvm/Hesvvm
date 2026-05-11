"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "fixed",
        left: "40px",
        top: "40px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        backgroundColor: "var(--color-card)",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "18px",
        color: "var(--color-text-primary)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 150ms ease",
      }}
      aria-label="Back to home"
    >
      ←
    </motion.button>
  );
}
