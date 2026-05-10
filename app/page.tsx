import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PageTransition } from "@/components/PageTransition";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <PageTransition>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
          paddingLeft: "var(--page-padding)",
          paddingRight: "var(--page-padding)",
          paddingTop: "80px",
          paddingBottom: "120px",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "var(--avatar-size)",
              height: "var(--avatar-size)",
              borderRadius: "50%",
              border: "4px dashed var(--color-accent)",
              overflow: "hidden",
              marginBottom: "19px",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/avatar.jpg"
              alt="Hesam"
              width={77}
              height={77}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "normal",
              fontSize: "33px",
              fontWeight: 400,
              margin: "0 0 43px 0",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.5px",
            }}
          >
            Hesam
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "20px",
              color: "var(--color-text-muted)",
              margin: "0 0 45px 0",
            }}
          >
            Designer & Developer
          </p>

          {/* Social row */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              href="https://linkedin.com/in/hesammousavi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "var(--color-text-primary)", opacity: 0.7, lineHeight: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
            <Link
              href="https://x.com/hesammousavi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              style={{ color: "var(--color-text-primary)", opacity: 0.7, lineHeight: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.672-5.8 6.672H2.561l7.746-8.973L1.1 2.25h6.772l4.6 6.088 5.25-6.088zM17.15 18.75h1.832L5.928 4.123H4.009l13.141 14.627z" />
              </svg>
            </Link>
            <a
              href="/resume.pdf"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Resume ↓
            </a>
          </div>
        </section>

        {/* Project Grid */}
        <section style={{ display: "flex", justifyContent: "center" }}>
          <ProjectGrid projects={projects} />
        </section>
      </main>
    </PageTransition>
  );
}
