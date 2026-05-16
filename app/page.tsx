import { getPublishedProjects } from "@/lib/getProjects";
import { ProjectGrid } from "@/components/ProjectGrid";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const projects = await getPublishedProjects();
  return (
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
          {/* Avatar with SVG dashed border */}
          <div style={{ position: "relative", width: "97px", height: "97px", marginBottom: "10px", flexShrink: 0 }}>
            {/* Rounded dashed circle — only SVG supports stroke-linecap on dashes */}
            <svg
              width="97" height="97"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <circle
                cx="48.5" cy="48.5" r="45"
                stroke="#D9D4CC"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="4 7"
              />
            </svg>
            {/* Photo — inset 10px from outer edge to create gap */}
            <div style={{
              position: "absolute",
              inset: "10px",
              borderRadius: "50%",
              overflow: "hidden",
            }}>
              <Image
                src="/images/avatar.png"
                alt="Hesam"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "33px",
              fontWeight: 400,
              lineHeight: 1,
              margin: "0 0 3px 0",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.5px",
            }}
          >
            Hesvm
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              lineHeight: 1.35,
              color: "var(--color-text-muted)",
              margin: "0 0 28px 0",
            }}
          >
            Designing products in a world of non-senses
          </p>

          {/* Social row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Email */}
            <a
              href="mailto:hesammousavizadeh@gmail.com"
              aria-label="Email"
              className="social-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "36px",
                borderRadius: "100px",
                backgroundColor: "var(--surface-secondary)",
                lineHeight: 0,
                textDecoration: "none",
              }}
            >
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 0H4.5C1.8 0 0 1.35 0 4.5V10.8C0 13.95 1.8 15.3 4.5 15.3H13.5C16.2 15.3 18 13.95 18 10.8V4.5C18 1.35 16.2 0 13.5 0ZM13.923 5.481L11.106 7.731C10.512 8.208 9.756 8.442 9 8.442C8.244 8.442 7.479 8.208 6.894 7.731L4.077 5.481C3.789 5.247 3.744 4.815 3.969 4.527C4.203 4.239 4.626 4.185 4.914 4.419L7.731 6.669C8.415 7.218 9.576 7.218 10.26 6.669L13.077 4.419C13.365 4.185 13.797 4.23 14.022 4.527C14.256 4.815 14.211 5.247 13.923 5.481Z" fill="currentColor"/>
              </svg>
            </a>
            {/* X */}
            <Link
              href="https://x.com/hesammousavi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="social-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "36px",
                borderRadius: "100px",
                backgroundColor: "var(--surface-secondary)",
                lineHeight: 0,
              }}
            >
              <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.23983 7.70552L0 0H4.94239L8.79418 4.76254L12.9092 0.0214433H15.6312L10.1103 6.38983L16.6566 14.484H11.7289L7.55824 9.33359L3.10559 14.4697H0.368835L6.23983 7.70552ZM12.4472 13.0563L3.0305 1.4277H4.22359L13.6284 13.0563H12.4472Z" fill="currentColor"/>
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link
              href="https://linkedin.com/in/hesammousavi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "36px",
                borderRadius: "100px",
                backgroundColor: "var(--surface-secondary)",
                lineHeight: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0855 0H1.12266C0.824912 0 0.539359 0.123912 0.328819 0.344478C0.11828 0.565043 0 0.864193 0 1.17612V14.7563C0 15.0682 0.11828 15.3673 0.328819 15.5879C0.539359 15.8085 0.824912 15.9324 1.12266 15.9324H14.0855C14.3833 15.9324 14.6688 15.8085 14.8794 15.5879C15.0899 15.3673 15.2082 15.0682 15.2082 14.7563V1.17612C15.2082 0.864193 15.0899 0.565043 14.8794 0.344478C14.6688 0.123912 14.3833 0 14.0855 0ZM4.53288 13.5724H2.24638V5.96358H4.53288V13.5724ZM3.38804 4.90916C3.12868 4.90763 2.87556 4.82565 2.66063 4.67356C2.4457 4.52146 2.27859 4.30608 2.18039 4.05458C2.0822 3.80309 2.05732 3.52676 2.10889 3.26046C2.16046 2.99417 2.28617 2.74985 2.47016 2.55833C2.65415 2.36681 2.88817 2.23668 3.14269 2.18437C3.3972 2.13205 3.66081 2.1599 3.90023 2.26438C4.13966 2.36886 4.34418 2.54531 4.48797 2.77145C4.63177 2.99758 4.7084 3.26328 4.7082 3.535C4.71065 3.71691 4.67811 3.89748 4.61252 4.06595C4.54694 4.23441 4.44965 4.38731 4.32645 4.51555C4.20326 4.64378 4.05669 4.74472 3.89546 4.81234C3.73424 4.87997 3.56167 4.9129 3.38804 4.90916ZM12.9607 13.579H10.6753V9.42223C10.6753 8.19632 10.1779 7.81793 9.53574 7.81793C8.85771 7.81793 8.19235 8.35343 8.19235 9.45321V13.579H5.90584V5.96911H8.10469V7.02352H8.13426C8.35499 6.55551 9.12808 5.75557 10.3078 5.75557C11.5836 5.75557 12.9618 6.54887 12.9618 8.87234L12.9607 13.579Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Project Grid */}
        <section style={{ display: "flex", justifyContent: "center" }}>
          <ProjectGrid projects={projects} />
        </section>
      </main>
  );
}
