import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
          paddingLeft: "var(--page-padding)",
          paddingRight: "var(--page-padding)",
          paddingTop: "48px",
          paddingBottom: "120px",
        }}
      >
        {/* Back arrow */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            color: "var(--color-text-primary)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "40px",
            opacity: 0.7,
          }}
        >
          ← Back
        </Link>

        {/* Cover image */}
        <div
          style={{
            maxWidth: "592px",
            marginBottom: "40px",
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            width={592}
            height={434}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "55px",
              display: "block",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ maxWidth: "592px" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "48px",
              fontWeight: 400,
              margin: "0 0 12px 0",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              color: "rgba(30, 35, 71, 0.5)",
              margin: "0 0 40px 0",
            }}
          >
            {project.category}
          </p>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              color: "var(--color-text-primary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>
      </main>
    </PageTransition>
  );
}
