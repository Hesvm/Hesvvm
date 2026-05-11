import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

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
    <html lang="en" className={instrumentSerif.variable}>
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
