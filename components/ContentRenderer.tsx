import Image from "next/image";
import Divider from "@/components/Divider";
import { ContentBlock } from "@/data/projects";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div style={{ maxWidth: "760px", display: "flex", flexDirection: "column", gap: "32px" }}>
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div key={index}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  lineHeight: "1.65",
                  color: "var(--color-text-primary)",
                  fontSize: "15px",
                }}
              >
                {block.content}
              </div>
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <div key={index}>
              <div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "380px",
                    borderRadius: "0",
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
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    {block.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        }

        if (block.type === "image-pair") {
          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      borderRadius: "0",
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
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "12px",
                        color: "var(--color-text-muted)",
                        textAlign: "center",
                        marginTop: "8px",
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
                      aspectRatio: "1 / 1",
                      borderRadius: "0",
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
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "12px",
                        color: "var(--color-text-muted)",
                        textAlign: "center",
                        marginTop: "8px",
                      }}
                    >
                      {block.right.subtitle}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
