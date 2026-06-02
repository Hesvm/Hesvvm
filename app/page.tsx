import { getPublishedProjects } from "@/lib/getProjects";

export const dynamic = 'force-dynamic';
import { ProjectGrid } from "@/components/ProjectGrid";
import { HeroContact } from "@/components/HeroContact";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hesvm",
  description: "Selected works & notes",
  openGraph: {
    title: "Hesvm",
    description: "Selected works & notes",
    images: [
      {
        url: "/images/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Hesvm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hesvm",
    description: "Selected works & notes",
    images: ["/images/og-hero.jpg"],
  },
};

export default async function Home() {
  const projects = await getPublishedProjects();
  return (
    <main
        className="site-content"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
          paddingTop: "30px",
          paddingBottom: "120px",
        }}
      >
        {/* Hero Section */}
        <section
          className="home-hero"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "100px",
          }}
        >
          {/* Avatar with SVG dashed border */}
          <div className="hero-avatar" style={{ position: "relative", marginBottom: "20px", flexShrink: 0 }}>
            {/* Rounded dashed circle — only SVG supports stroke-linecap on dashes */}
            <svg
              width="57.5" height="57.5"
              viewBox="0 0 57.5 57.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <circle
                cx="28.75" cy="28.75" r="25.875"
                stroke="#D9D4CC"
                strokeWidth="2.875"
                strokeLinecap="round"
                strokeDasharray="1.15 4.6"
              />
            </svg>
            {/* Photo — inset from outer edge to create gap */}
            <div style={{
              position: "absolute",
              inset: "9.2px",
              borderRadius: "50%",
              overflow: "hidden",
            }}>
              <Image
                src="/images/avatar-hero.png"
                alt="Hesam"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Name */}
          <h1
            className="hero-name"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1,
              margin: "0 0 14px 0",
              color: "var(--color-text-primary)",
            }}
          >
            Hesvm
          </h1>

          {/* Tagline */}
          <p
            className="hero-tagline"
            style={{
              color: "var(--text-muted)",
              margin: "0 0 18px 0",
            }}
          >
            Product Designer, Making software feel less like software.
            <br />
            Done it for startups, agencies & myself.
          </p>

          <HeroContact />
        </section>

        {/* Works heading + Project Grid */}
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2
            className="works-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "33px",
              lineHeight: 1,
              margin: "0 0 32px 0",
              color: "var(--color-text-primary)",
              alignSelf: "flex-start",
              width: "min(100%, 460px)",
            }}
          >
            Works
          </h2>
          <ProjectGrid projects={projects} />
        </section>
      </main>
  );
}
