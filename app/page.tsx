import { getPublishedProjects } from "@/lib/getProjects";
import { getActiveStatus } from "@/lib/getStatus";

export const dynamic = 'force-dynamic';
import { HeroContact } from "@/components/HeroContact";
import { StatusBubble } from "@/components/StatusBubble";
import { HomeView } from "@/components/HomeView";
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
  const activeStatus = await getActiveStatus();

  const heroSection = (
    <section
      key="en-home-hero"
      className="home-hero"
      style={{
        position: "relative",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "62px",
        width: "min(100%, 572px)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Horizontal row: Avatar + (Name & Bio & Social) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* Status Bubble + Avatar Stack */}
        <div className="statusStack">
          <StatusBubble status={activeStatus} />
          <div className="hero-avatar">
            <Image
              src="/images/avatar-hero.png"
              alt="Hesam"
              fill
              sizes="64px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Text column: Name, Tagline & Social Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            minWidth: 0,
          }}
        >
          <h1
            className="hero-name"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "29px",
              lineHeight: 1.1,
              margin: "0 0 6px 0",
              color: "var(--color-text-primary)",
            }}
          >
            Hesvm
          </h1>
          <p
            className="hero-tagline"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              margin: "0 0 14px 0",
              textAlign: "left",
            }}
          >
            Product Designer, Making software feel less like software.
            <br />
            Done it for startups, agencies & myself.
          </p>

          <HeroContact />
        </div>
      </div>
    </section>
  );

  return <HomeView projects={projects} isFa={false} heroSection={heroSection} />;
}
