import Image from "next/image";
import Divider from "@/components/Divider";
import ScrollBlock from "@/components/ScrollBlock";
import { ContentBlock } from "@/data/projects";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="mx-auto flex flex-col gap-12" style={{ maxWidth: "760px" }}>
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <ScrollBlock key={index}>
              <div
                className="mx-auto text-lg"
                style={{
                  maxWidth: "680px",
                  fontFamily: "var(--font-sans)",
                  lineHeight: "1.75",
                  color: "var(--color-text-primary)",
                  fontSize: "18px",
                }}
              >
                {block.content}
              </div>
            </ScrollBlock>
          );
        }

        if (block.type === "image") {
          return (
            <ScrollBlock key={index}>
              <div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "480px",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={block.src}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {block.subtitle && (
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      color: "var(--color-text-muted)",
                      textAlign: "center",
                      marginTop: "12px",
                    }}
                  >
                    {block.subtitle}
                  </div>
                )}
              </div>
            </ScrollBlock>
          );
        }

        if (block.type === "image-pair") {
          return (
            <ScrollBlock key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "24px",
                }}
                className="flex-col md:flex-row"
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      position: "relative",
                      height: "360px",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={block.left.src}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {block.left.subtitle && (
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--color-text-muted)",
                        textAlign: "center",
                        marginTop: "12px",
                      }}
                    >
                      {block.left.subtitle}
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      position: "relative",
                      height: "360px",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={block.right.src}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {block.right.subtitle && (
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--color-text-muted)",
                        textAlign: "center",
                        marginTop: "12px",
                      }}
                    >
                      {block.right.subtitle}
                    </div>
                  )}
                </div>
              </div>
              <style jsx>{`
                @media (max-width: 768px) {
                  div[style*="flex-direction: row"] {
                    flex-direction: column !important;
                  }
                  div[style*="flex-direction: row"] > div {
                    flex: none !important;
                  }
                }
              `}</style>
            </ScrollBlock>
          );
        }

        if (block.type === "divider") {
          return <Divider key={index} variant={block.variant} />;
        }

        return null;
      })}
    </div>
  );
}
