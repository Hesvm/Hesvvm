import Image from "next/image";
import Divider from "@/components/Divider";
import ProjectLink from "@/components/ProjectLink";
import Reveal from "@/components/Reveal";
import { ContentBlock } from "@/types/project";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div style={{ maxWidth: "530px", display: "flex", flexDirection: "column", gap: "32px" }}>
      {blocks.map((block, i) => {
        const delay = Math.min(i * 0.08, 0.24);

        if (block.type === "text") {
          return (
            <Reveal key={block.id} delay={delay}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  lineHeight: "1.65",
                  color: "var(--color-text-primary)",
                  fontSize: "14px",
                }}
              >
                {block.content}
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
                {block.content}
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
          return (
            <Reveal key={block.id} delay={delay}>
              <div className="content-image-pair">
                <div style={{ flex: 1 }}>
                  <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
                    <Image src={block.left.src} alt={block.left.alt ?? ""} fill style={{ objectFit: "cover" }} />
                  </div>
                  {block.left.subtitle && (
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px" }}>
                      {block.left.subtitle}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
                    <Image src={block.right.src} alt={block.right.alt ?? ""} fill style={{ objectFit: "cover" }} />
                  </div>
                  {block.right.subtitle && (
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px" }}>
                      {block.right.subtitle}
                    </div>
                  )}
                </div>
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
          return (
            <Reveal key={block.id} delay={delay}>
              <div>
                {isEmbed && (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                    <iframe
                      src={block.url}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                )}
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
                  {block.content}
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
