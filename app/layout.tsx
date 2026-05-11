import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";

export const metadata: Metadata = {
  title: "Hesam",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: "120px", backgroundColor: "var(--color-bg)" }}>
        {/* Persistent background — always mounted, prevents any flash during DOM gap */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--color-bg)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
        <Navbar />
      </body>
    </html>
  );
}
