import Image from "next/image";

export default function ProjectHero({
  thumbnail,
  slug,
}: {
  thumbnail: string | null;
  slug: string;
}) {
  return (
    <div
      className="project-hero"
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={slug}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      )}
    </div>
  );
}
