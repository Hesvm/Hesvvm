import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/getProjects";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const thumbnailUrl = project?.thumbnail_url;
  if (!thumbnailUrl) return new Response(null, { status: 404 });

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const absoluteUrl = thumbnailUrl.startsWith("http")
    ? thumbnailUrl
    : `${baseUrl}${thumbnailUrl}`;

  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={absoluteUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />,
    { width: 32, height: 32 }
  );
}
