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

  // Preview-enabled branch — portal + animation added in subsequent tasks
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
