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
      <body style={{ paddingBottom: "120px" }}>
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
        <Navbar />
      </body>
    </html>
  );
}
