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
        left: "max(0px, calc(50vw - 444px))",
        top: "48px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "0",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        cursor: "pointer",
      }}
      aria-label="Back to home"
    >
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1 6L6 11" stroke="#8F94AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  );
}
