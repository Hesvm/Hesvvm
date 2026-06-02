import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";

const awesomeBiPolar = localFont({
  src: "../public/fonts/AwesomeBi_polar-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hesvm",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={awesomeBiPolar.variable}>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
