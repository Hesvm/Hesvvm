"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

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

interface CardPos {
  top: number;
  left: number;
}

const CARD_WIDTH = 244;
const CARD_HEIGHT_ESTIMATE = 220;
const OFFSET = 8;
const VIEWPORT_PAD = 8;

function computePosition(rect: DOMRect): CardPos {
  let top = rect.bottom + OFFSET;
  if (top + CARD_HEIGHT_ESTIMATE > window.innerHeight - VIEWPORT_PAD) {
    top = rect.top - CARD_HEIGHT_ESTIMATE - OFFSET;
  }
  let left = rect.left;
  left = Math.max(
    VIEWPORT_PAD,
    Math.min(left, window.innerWidth - CARD_WIDTH - VIEWPORT_PAD)
  );
  return { top, left };
}

function PreviewCardPortal({
  preview,
  pos,
}: {
  preview: PreviewData;
  pos: CardPos;
}) {
  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        width: CARD_WIDTH,
        background: "#ffffff",
        borderRadius: 26,
        boxShadow:
          "0 8px 40px rgba(20,20,20,0.12), 0 2px 8px rgba(20,20,20,0.05)",
        overflow: "hidden",
        padding: "10px 10px 0 10px",
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
        pointerEvents: "none",
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
    </div>,
    document.body
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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<CardPos>({ top: 0, left: 0 });

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

  function show() {
    if (!linkRef.current) return;
    setPos(computePosition(linkRef.current.getBoundingClientRect()));
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={rel}
      className={`smart-link${className ? ` ${className}` : ""}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span className="smart-link-underline" aria-hidden="true" />
      {visible && <PreviewCardPortal preview={preview} pos={pos} />}
    </a>
  );
}
