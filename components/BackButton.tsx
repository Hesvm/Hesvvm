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
        left: "20px",
        top: "48px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "0",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "18px",
        color: "var(--color-text-primary)",
      }}
      aria-label="Back to home"
    >
      ←
    </motion.button>
  );
}
