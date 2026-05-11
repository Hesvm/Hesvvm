"use client";

import { useState } from "react";

export default function ProjectLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
        textDecoration: "none",
        opacity: hovered ? 0.45 : 1,
        transition: "opacity 0.2s ease",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          fontWeight: 500,
          color: "var(--color-text-primary)",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: "100%",
          height: "1.5px",
          backgroundColor: "var(--color-text-primary)",
          borderRadius: "100px",
        }}
      />
    </a>
  );
}
