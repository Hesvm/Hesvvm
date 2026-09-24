import { getPublishedProjects } from "@/lib/getProjects";
import { getActiveStatus } from "@/lib/getStatus";

export const dynamic = 'force-dynamic';
import { HeroContactFa } from "@/components/fa/HeroContactFa";
import { StatusBubbleFa } from "@/components/fa/StatusBubbleFa";
import { HomeView } from "@/components/HomeView";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حسام | نمونه‌کارها و یادداشت‌ها",
  description: "پروداکت دیزاینر و مشغول ساختن چیزایی که ارزوشو داشتم!",
  openGraph: {
    title: "حسام",
    description: "نمونه‌کارها و پروژه‌ها",
    images: [
      {
        url: "/images/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "حسام",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حسام",
    description: "نمونه‌کارها و پروژه‌ها",
    images: ["/images/og-hero.jpg"],
  },
};

export default async function FaHome() {
  const projects = await getPublishedProjects();
  const activeStatus = await getActiveStatus();

  const heroSection = (
    <section
      key="fa-home-hero"
      className="home-hero"
      style={{
        position: "relative",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "right",
        marginBottom: "48px",
        width: "min(100%, 520px)",
        marginLeft: "auto",
        marginRight: "auto",
        direction: "rtl",
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
          <StatusBubbleFa status={activeStatus} />
          <div className="hero-avatar">
            <Image
              src="/images/avatar-hero.png"
              alt="حسام"
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
              fontFamily: "var(--font-persian)",
              fontWeight: 800,
              fontSize: "24px",
              lineHeight: 1.15,
              margin: "0 0 6px 0",
              color: "var(--color-text-primary)",
            }}
          >
            حسام
          </h1>
          <p
            className="hero-tagline"
            style={{
              fontFamily: "var(--font-persian)",
              fontSize: "14.5px",
              color: "var(--text-muted)",
              lineHeight: 1.55,
              margin: "0 0 14px 0",
              textAlign: "right",
            }}
          >
            پروداکت دیزاینر و مشغول ساختن چیزایی که ارزوشو داشتم!
          </p>

          <HeroContactFa />
        </div>
      </div>
    </section>
  );

  return <HomeView projects={projects} isFa={true} heroSection={heroSection} />;
}
