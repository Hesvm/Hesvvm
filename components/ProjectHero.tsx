import Image from "next/image";

export default function ProjectHero({
  thumbnail,
  slug,
}: {
  thumbnail: string;
  slug: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      <Image
        src={thumbnail}
        alt={slug}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </div>
  );
}
