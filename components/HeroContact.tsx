"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Platform = "linkedin" | "x" | "email";

// ── Icons ──────────────────────────────────────────────────────────────────

const LINKEDIN_ICON = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.0855 0H1.12266C0.824912 0 0.539359 0.123912 0.328819 0.344478C0.11828 0.565043 0 0.864193 0 1.17612V14.7563C0 15.0682 0.11828 15.3673 0.328819 15.5879C0.539359 15.8085 0.824912 15.9324 1.12266 15.9324H14.0855C14.3833 15.9324 14.6688 15.8085 14.8794 15.5879C15.0899 15.3673 15.2082 15.0682 15.2082 14.7563V1.17612C15.2082 0.864193 15.0899 0.565043 14.8794 0.344478C14.6688 0.123912 14.3833 0 14.0855 0ZM4.53288 13.5724H2.24638V5.96358H4.53288V13.5724ZM3.38804 4.90916C3.12868 4.90763 2.87556 4.82565 2.66063 4.67356C2.4457 4.52146 2.27859 4.30608 2.18039 4.05458C2.0822 3.80309 2.05732 3.52676 2.10889 3.26046C2.16046 2.99417 2.28617 2.74985 2.47016 2.55833C2.65415 2.36681 2.88817 2.23668 3.14269 2.18437C3.3972 2.13205 3.66081 2.1599 3.90023 2.26438C4.13966 2.36886 4.34418 2.54531 4.48797 2.77145C4.63177 2.99758 4.7084 3.26328 4.7082 3.535C4.71065 3.71691 4.67811 3.89748 4.61252 4.06595C4.54694 4.23441 4.44965 4.38731 4.32645 4.51555C4.20326 4.64378 4.05669 4.74472 3.89546 4.81234C3.73424 4.87997 3.56167 4.9129 3.38804 4.90916ZM12.9607 13.579H10.6753V9.42223C10.6753 8.19632 10.1779 7.81793 9.53574 7.81793C8.85771 7.81793 8.19235 8.35343 8.19235 9.45321V13.579H5.90584V5.96911H8.10469V7.02352H8.13426C8.35499 6.55551 9.12808 5.75557 10.3078 5.75557C11.5836 5.75557 12.9618 6.54887 12.9618 8.87234L12.9607 13.579Z" fill="currentColor"/>
  </svg>
);

const X_ICON = (
  <svg width="13" height="12" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.23983 7.70552L0 0H4.94239L8.79418 4.76254L12.9092 0.0214433H15.6312L10.1103 6.38983L16.6566 14.484H11.7289L7.55824 9.33359L3.10559 14.4697H0.368835L6.23983 7.70552ZM12.4472 13.0563L3.0305 1.4277H4.22359L13.6284 13.0563H12.4472Z" fill="currentColor"/>
  </svg>
);

const EMAIL_ICON = (
  <svg width="13" height="12" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 0H4.5C1.8 0 0 1.35 0 4.5V10.8C0 13.95 1.8 15.3 4.5 15.3H13.5C16.2 15.3 18 13.95 18 10.8V4.5C18 1.35 16.2 0 13.5 0ZM13.923 5.481L11.106 7.731C10.512 8.208 9.756 8.442 9 8.442C8.244 8.442 7.479 8.208 6.894 7.731L4.077 5.481C3.789 5.247 3.744 4.815 3.969 4.527C4.203 4.239 4.626 4.185 4.914 4.419L7.731 6.669C8.415 7.218 9.576 7.218 10.26 6.669L13.077 4.419C13.365 4.185 13.797 4.23 14.022 4.527C14.256 4.815 14.211 5.247 13.923 5.481Z" fill="currentColor"/>
  </svg>
);

const LIGHTNING_ICON = (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6.3124 4.25228H4.83314V0.741574C4.83314 -0.0775894 4.39751 -0.243373 3.86612 0.371L3.48314 0.814714L0.242182 4.56921C-0.203032 5.08119 -0.0163291 5.50052 0.653884 5.50052H2.13314V9.01123C2.13314 9.83039 2.56878 9.99617 3.10016 9.3818L3.48314 8.93809L6.7241 5.18359C7.16932 4.67161 6.98261 4.25228 6.3124 4.25228Z" fill="#FFDC41"/>
  </svg>
);

const COPY_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M6.27539 2.3374C6.27539 1.81315 6.27539 1.55103 6.18989 1.34459C6.13335 1.208 6.05045 1.0839 5.94592 0.979372C5.84139 0.874844 5.71729 0.791941 5.5807 0.735402C5.37427 0.649902 5.11214 0.649902 4.58789 0.649902L2.90039 0.649902C1.83952 0.649902 1.30964 0.649902 0.980016 0.979527C0.650391 1.30915 0.650391 1.83903 0.650391 2.8999V4.5874C0.650391 5.11165 0.650391 5.37378 0.735891 5.58022C0.792429 5.7168 0.875332 5.8409 0.97986 5.94543C1.08439 6.04996 1.20849 6.13286 1.34508 6.1894C1.55152 6.2749 1.81364 6.2749 2.33789 6.2749M5.15039 4.0249H8.52539C9.14671 4.0249 9.65039 4.52858 9.65039 5.1499V8.5249C9.65039 9.14622 9.14671 9.6499 8.52539 9.6499H5.15039C4.52907 9.6499 4.02539 9.14622 4.02539 8.5249V5.1499C4.02539 4.52858 4.52907 4.0249 5.15039 4.0249Z" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const ARROW_OUT_ICON = (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
    <path d="M0.699219 6.7002L6.69922 0.700195M1.69922 0.700195H6.69922V5.7002" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// X stat icons (from provided SVG assets)
const RepostIcon = () => (
  <svg width="14" height="11" viewBox="0 0 18 14" fill="none" aria-hidden="true">
    <path d="M3.70868 0.29375C3.31806 -0.096875 2.68368 -0.096875 2.29306 0.29375L0.293056 2.29375C0.00555551 2.58125 -0.0788194 3.00938 0.0774306 3.38438C0.233681 3.75938 0.599306 4 1.00243 4H2.00243V11C2.00243 12.6562 3.34618 14 5.00243 14H9.00243C9.55556 14 10.0024 13.5531 10.0024 13C10.0024 12.4469 9.55556 12 9.00243 12H5.00243C4.44931 12 4.00243 11.5531 4.00243 11V4H5.00243C5.40556 4 5.77118 3.75625 5.92743 3.38125C6.08368 3.00625 5.99618 2.57813 5.71181 2.29063L3.71181 0.290625L3.70868 0.29375ZM14.2962 13.7062C14.6868 14.0969 15.3212 14.0969 15.7118 13.7062L17.7118 11.7063C17.9993 11.4188 18.0837 10.9906 17.9274 10.6156C17.7712 10.2406 17.4056 10 17.0024 10H16.0024V3C16.0024 1.34375 14.6587 0 13.0024 0H9.00243C8.44931 0 8.00243 0.446875 8.00243 1C8.00243 1.55313 8.44931 2 9.00243 2H13.0024C13.5556 2 14.0024 2.44687 14.0024 3V10H13.0024C12.5993 10 12.2337 10.2437 12.0774 10.6187C11.9212 10.9937 12.0087 11.4219 12.2931 11.7094L14.2931 13.7094L14.2962 13.7062Z" fill="currentColor"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="14" height="13" viewBox="0 0 20 19" fill="none" aria-hidden="true">
    <path d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z" fill="currentColor"/>
  </svg>
);

const ViewsIcon = () => (
  <svg width="10" height="12" viewBox="0 0 13 15" fill="none" aria-hidden="true">
    <path d="M1.75 15H0.75C0.551088 15 0.360322 14.921 0.21967 14.7803C0.0790177 14.6397 0 14.4489 0 14.25V9.75C0 9.55109 0.0790177 9.36032 0.21967 9.21967C0.360322 9.07902 0.551088 9 0.75 9H1.75C1.94891 9 2.13968 9.07902 2.28033 9.21967C2.42098 9.36032 2.5 9.55109 2.5 9.75V14.25C2.5 14.4489 2.42098 14.6397 2.28033 14.7803C2.13968 14.921 1.94891 15 1.75 15ZM8.75 15H7.75C7.55109 15 7.36032 14.921 7.21967 14.7803C7.07902 14.6397 7 14.4489 7 14.25V6.75C7 6.55109 7.07902 6.36032 7.21967 6.21967C7.36032 6.07902 7.55109 6 7.75 6H8.75C8.94891 6 9.13968 6.07902 9.28033 6.21967C9.42098 6.36032 9.5 6.55109 9.5 6.75V14.25C9.5 14.4489 9.42098 14.6397 9.28033 14.7803C9.13968 14.921 8.94891 15 8.75 15ZM12.25 15H11.25C11.0511 15 10.8603 14.921 10.7197 14.7803C10.579 14.6397 10.5 14.4489 10.5 14.25V3.25C10.5 3.05109 10.579 2.86032 10.7197 2.71967C10.8603 2.57902 11.0511 2.5 11.25 2.5H12.25C12.4489 2.5 12.6397 2.57902 12.7803 2.71967C12.921 2.86032 13 3.05109 13 3.25V14.25C13 14.4489 12.921 14.6397 12.7803 14.7803C12.6397 14.921 12.4489 15 12.25 15ZM5.25 15H4.25C4.05109 15 3.86032 14.921 3.71967 14.7803C3.57902 14.6397 3.5 14.4489 3.5 14.25V0.75C3.5 0.551088 3.57902 0.360322 3.71967 0.21967C3.86032 0.0790177 4.05109 0 4.25 0H5.25C5.44891 0 5.63968 0.0790177 5.78033 0.21967C5.92098 0.360322 6 0.551088 6 0.75V14.25C6 14.4489 5.92098 14.6397 5.78033 14.7803C5.63968 14.921 5.44891 15 5.25 15Z" fill="currentColor"/>
  </svg>
);

// ── Pills config ───────────────────────────────────────────────────────────

const PILLS: { id: Platform; label: string; icon: React.ReactNode; href: string }[] = [
  { id: "linkedin", label: "LinkedIn", icon: LINKEDIN_ICON, href: "https://linkedin.com/in/hesammousavi" },
  { id: "x",        label: "X posts",  icon: X_ICON,        href: "https://x.com/hesammousavi" },
  { id: "email",    label: "Email",    icon: EMAIL_ICON,    href: "mailto:hesammousavizadeh@gmail.com" },
];

// ── LinkedIn preview ───────────────────────────────────────────────────────

function LinkedInPreview() {
  return (
    <a
      href="https://linkedin.com/in/hesammousavi"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div className="contact-preview-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", overflow: "hidden",
            flexShrink: 0, background: "var(--surface-secondary)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar-hero.png"
              alt="Hesam Mousavizadeh"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
              WebkitFontSmoothing: "antialiased",
            }}>
              Hesam Mousavizadeh
            </div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased", lineHeight: 1.4,
            }}>
              Product Designer
            </div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "-0.01em",
              WebkitFontSmoothing: "antialiased",
            }}>
              611 connections
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {([3, 4, 5] as const).map((n) => (
            <div
              key={n}
              style={{
                flex: 1, aspectRatio: "1", borderRadius: 8,
                overflow: "hidden", background: "var(--surface-secondary)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/li-post-${n}.png`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

// ── X posts preview ────────────────────────────────────────────────────────

function XPreview() {
  return (
    <a
      href="https://x.com/hesammousavi"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div className="contact-preview-inner">
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          lineHeight: 1.45,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          margin: "0 0 10px 0",
          WebkitFontSmoothing: "antialiased",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}>
          You spend 5% of your time creating. You spend 95% of your time on social media creating a strategy.
        </p>

        <div style={{ display: "flex", gap: 14, alignItems: "center", color: "var(--text-muted)" }}>
          {[
            { icon: <RepostIcon />, value: 3 },
            { icon: <LikeIcon />,   value: 163 },
            { icon: <ViewsIcon />,  value: "15K" },
          ].map(({ icon, value }, j) => (
            <div key={j} style={{
              display: "flex", alignItems: "center", gap: 5,
              fontFamily: "var(--font-sans)", fontSize: 12,
              WebkitFontSmoothing: "antialiased",
            }}>
              {icon}
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

// ── Email preview ──────────────────────────────────────────────────────────

const EMAIL_ADDRESS = "hesammousavizadeh@gmail.com";

function EmailPreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL_ADDRESS;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="contact-preview-inner" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Buttons row — each fills half the width */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="email-action-pill"
          onClick={handleCopy}
          style={{ flex: 1, justifyContent: "center" }}
        >
          {COPY_ICON}
          {copied ? "Copied!" : "Copy email"}
        </button>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="email-action-pill"
          style={{ flex: 1, justifyContent: "center" }}
        >
          {ARROW_OUT_ICON}
          Open in Mail
        </a>
      </div>

      {/* Reply-time note — centered, below buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        {LIGHTNING_ICON}
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 12,
          color: "var(--text-muted)", letterSpacing: "-0.02em",
          WebkitFontSmoothing: "antialiased",
        }}>
          Usually responds within 4 hours
        </span>
      </div>
    </div>
  );
}

// ── Preview router ─────────────────────────────────────────────────────────

function PreviewContent({ platform }: { platform: Platform }) {
  if (platform === "linkedin") return <LinkedInPreview />;
  if (platform === "x")        return <XPreview />;
  return <EmailPreview />;
}

// ── Main component ─────────────────────────────────────────────────────────

export function HeroContact() {
  const [active, setActive] = useState<Platform | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePillEnter = useCallback((id: Platform) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(id);
  }, []);

  const handleWrapperLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActive(null), 50);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div
        className="contact-pills-wrapper"
        onMouseLeave={handleWrapperLeave}
        role="group"
        aria-label="Contact options"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "var(--text-muted)",
            flexShrink: 0,
            lineHeight: 1.43,
            paddingRight: "2px",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Contact me:
        </span>

        {PILLS.map(({ id, label, icon, href }) => {
          const isActive = active === id;
          const isDimmed = active !== null && !isActive;
          const isExternal = href.startsWith("http");
          return (
            <a
              key={id}
              href={href}
              className="contact-pill"
              aria-expanded={isActive}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onMouseEnter={() => handlePillEnter(id)}
              style={{
                opacity: isDimmed ? 0.55 : 1,
                color: isActive ? "var(--text-primary)" : undefined,
                background: isActive ? "rgba(0,0,0,0.08)" : undefined,
                textDecoration: "none",
              }}
            >
              {icon}
              {label}
            </a>
          );
        })}

        {/* Desktop hover preview — absolute, no layout shift */}
        <AnimatePresence>
          {active && (
            <motion.div
              id="contact-preview-panel"
              role="region"
              aria-label={`${active} contact preview`}
              className="contact-preview-card contact-preview-desktop"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ position: "absolute", top: "calc(100% + 12px)", left: 0, zIndex: 10 }}
              onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
              onMouseLeave={handleWrapperLeave}
            >
              <PreviewContent platform={active} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
