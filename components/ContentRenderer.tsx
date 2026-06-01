"use client";

import React from "react";
import Image from "next/image";
import Divider from "@/components/Divider";
import ProjectLink from "@/components/ProjectLink";
import Reveal from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { ContentBlock } from "@/types/project";

function parseRichLinks(text: string): React.ReactNode[] {
  // Local regex per call — avoids shared lastIndex state across concurrent renders
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const linkText = match[1];
    const urlPart = match[2];
    const parts = urlPart.split("||");

    if (parts.length === 4) {
      const [url, image, title, subtitle] = parts;
      nodes.push(
        <SmartLink
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          preview={{ image, title, subtitle }}
        >
          {linkText}
        </SmartLink>
      );
    } else {
      nodes.push(
        <a
          key={match.index}
          href={urlPart}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          {linkText}
        </a>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderRichText(text: string): React.ReactNode {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((para, pi) => (
    <p key={pi} style={{ margin: pi === 0 ? 0 : "1em 0 0" }}>
      {para.split("\n").flatMap((line, li, arr) => {
        const nodes = parseRichLinks(line);
        return li < arr.length - 1 ? [...nodes, <br key={`br-${li}`} />] : nodes;
      })}
    </p>
  ));
}

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div style={{ maxWidth: "var(--content-max-width)", display: "flex", flexDirection: "column", gap: "32px" }}>
      {blocks.map((block, i) => {
        const delay = Math.min(i * 0.08, 0.24);

        if (block.type === "text") {
          return (
            <Reveal key={block.id} delay={delay}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "1.3",
                  letterSpacing: "-0.035em",
                  fontSynthesis: "none",
                  color: "var(--color-text-primary)",
                }}
              >
                {renderRichText(block.content)}
              </div>
            </Reveal>
          );
        }

        if (block.type === "title") {
          return (
            <Reveal key={block.id} delay={delay}>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  margin: 0,
                }}
              >
                {parseRichLinks(block.content)}
              </h2>
            </Reveal>
          );
        }

        if (block.type === "image") {
          return (
            <Reveal key={block.id} delay={delay}>
              <div>
                <div className="content-image-single">
                  <Image
                    src={block.src}
                    alt={block.alt ?? ""}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {block.subtitle && (
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "16px",
                      color: "var(--color-text-muted)",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    {block.subtitle}
                  </div>
                )}
              </div>
            </Reveal>
          );
        }

        if (block.type === "image-pair") {
          const renderPairSlot = (media: typeof block.left) => (
            <div style={{ flex: 1 }}>
              <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "18px", backgroundColor: "#000" }}>
                {media.mediaType === "video" ? (
                  <video src={media.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay muted loop playsInline />
                ) : (
                  <Image src={media.src} alt={media.alt ?? ""} fill style={{ objectFit: "cover" }} />
                )}
              </div>
              {media.subtitle && (
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px" }}>
                  {media.subtitle}
                </div>
              )}
            </div>
          )
          return (
            <Reveal key={block.id} delay={delay}>
              <div className="content-image-pair">
                {renderPairSlot(block.left)}
                {renderPairSlot(block.right)}
              </div>
            </Reveal>
          );
        }

        if (block.type === "divider") {
          return (
            <Reveal key={block.id} delay={delay}>
              <Divider variant={block.variant} />
            </Reveal>
          );
        }

        if (block.type === "link") {
          return (
            <Reveal key={block.id} delay={delay}>
              <ProjectLink href={block.url} label={block.label} />
            </Reveal>
          );
        }

        if (block.type === "video") {
          const isEmbed = block.url.includes("youtube") || block.url.includes("vimeo") || block.url.includes("youtu.be");
          const playback = block.playback ?? 'auto';
          return (
            <Reveal key={block.id} delay={delay}>
              <div>
                {isEmbed ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                    <iframe
                      src={block.url}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                ) : block.url ? (
                  <video
                    src={block.url}
                    autoPlay={playback === 'auto'}
                    muted={playback === 'auto'}
                    loop={playback === 'auto'}
                    controls={playback === 'click'}
                    playsInline
                    style={{ width: "100%", borderRadius: "12px", display: "block" }}
                  />
                ) : null}
                {block.subtitle && (
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px" }}>
                    {block.subtitle}
                  </div>
                )}
              </div>
            </Reveal>
          );
        }

        if (block.type === "quote") {
          return (
            <Reveal key={block.id} delay={delay}>
              <div style={{ borderLeft: "2px solid var(--border-subtle)", paddingLeft: "20px" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "18px", color: "var(--color-text-primary)", margin: "0 0 8px 0", lineHeight: 1.5 }}>
                  {parseRichLinks(block.content)}
                </p>
                {block.attribution && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-text-muted)", margin: 0 }}>
                    {block.attribution}
                  </p>
                )}
              </div>
            </Reveal>
          );
        }

        return null;
      })}
    </div>
  );
}
