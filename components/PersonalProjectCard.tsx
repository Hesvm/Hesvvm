'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building } from '@/data/buildings';


export function PersonalProjectCard({
  project,
  isFa = false,
}: {
  project: Building;
  isFa?: boolean;
}) {
  const isComingSoon = project.status === 'ComingSoon';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F0EFEA",
        border: "none",
        borderRadius: "22px",
        padding: "24px",
        boxShadow: "none",
        transition: "transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease",
        height: "100%",
        direction: isFa ? "rtl" : "ltr",
        textAlign: isFa ? "right" : "left",
      }}
      whileHover={{
        y: -3,
        backgroundColor: "#EAE7E0",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div>
        {/* App Icon */}
        {project.icon ? (
          <div
            style={{
              position: "relative",
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              overflow: "hidden",
              backgroundColor: "var(--surface-secondary)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Image
              src={project.icon}
              alt={project.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              backgroundColor: "var(--surface-secondary)",
              border: "1px dashed var(--border-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-disabled)",
              fontSize: "18px",
            }}
          >
            ✦
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: isFa ? "var(--font-persian)" : "var(--font-sans)",
            fontSize: "19px",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "18px 0 6px 0",
            letterSpacing: isFa ? "0" : "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: isFa ? "var(--font-persian)" : "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: "0 0 20px 0",
            letterSpacing: isFa ? "0" : "-0.01em",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "auto",
        }}
      >
        {!isComingSoon && (project.siteUrl || project.appStoreUrl || project.url) ? (
          <a
            href={project.siteUrl || project.appStoreUrl || project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              color: "var(--text-primary)",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: isFa ? "var(--font-persian)" : "var(--font-sans)",
              textDecoration: "none",
              transition: "all 140ms ease",
            }}
            className="hover:shadow-md hover:bg-white"
          >
            <span>{isFa ? "ببینم" : "View"}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "inline-block",
                flexShrink: 0,
                transform: isFa ? "scaleX(-1)" : "none",
              }}
            >
              <path
                d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              color: "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: isFa ? "var(--font-persian)" : "var(--font-sans)",
            }}
          >
            {isFa ? "به‌زودی" : "Coming soon"}
          </span>
        )}
      </div>
    </motion.div>
  );
}
