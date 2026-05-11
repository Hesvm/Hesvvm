import Image from "next/image";

export default function ProjectHero({ thumbnail }: { thumbnail: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "0",
        overflow: "hidden",
        position: "relative",
        marginBottom: "24px",
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
