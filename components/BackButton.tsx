"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      style={{
        position: "fixed",
        left: "max(16px, calc(50vw - 329px))",
        top: "64px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "999px",
        backgroundColor: "var(--surface-primary)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-soft)",
        cursor: "pointer",
      }}
      aria-label="Back to home"
    >
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1 6L6 11" stroke="#969189" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
