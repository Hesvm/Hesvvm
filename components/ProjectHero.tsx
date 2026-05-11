import Image from "next/image";

export default function ProjectHero({ thumbnail }: { thumbnail: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "560px",
        borderRadius: "var(--card-radius)",
        overflow: "hidden",
        position: "relative",
        marginBottom: "48px",
      }}
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </div>
  );
}
