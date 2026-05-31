"use client";

import Image from "next/image";
import React from "react";

export interface PreviewData {
  image: string;
  title: string;
  subtitle: string;
}

interface SmartLinkProps {
  href: string;
  preview?: PreviewData;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

function PreviewCard({ preview }: { preview: PreviewData }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 244,
        background: "#ffffff",
        borderRadius: 26,
        boxShadow:
          "0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)",
        overflow: "hidden",
        padding: "10px 10px 0 10px",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 148,
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={preview.image}
          alt={preview.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="224px"
        />
      </div>
      <div style={{ padding: "11px 4px 14px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 3,
            letterSpacing: "-0.015em",
          }}
        >
          {preview.title}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "var(--text-muted)",
            lineHeight: 1.45,
          }}
        >
          {preview.subtitle}
        </div>
      </div>
    </div>
  );
}

export function SmartLink({
  href,
  preview,
  children,
  target,
  rel,
  className,
}: SmartLinkProps) {
  if (!preview) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`smart-link${className ? ` ${className}` : ""}`}
      >
        {children}
        <span className="smart-link-underline" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`smart-link${className ? ` ${className}` : ""}`}
    >
      {children}
      <span className="smart-link-underline" aria-hidden="true" />
      {/* Card with portal + animation wired in next task */}
      <PreviewCard preview={preview} />
    </a>
  );
}
