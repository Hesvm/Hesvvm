import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { TransitionProvider } from "@/context/TransitionContext";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";
import TransitionOverlay from "@/components/TransitionOverlay";

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
        <TransitionProvider>
          <TransitionOverlay />
          <AnimatePresenceWrapper>
            {children}
          </AnimatePresenceWrapper>
        </TransitionProvider>
        <Navbar />
      </body>
    </html>
  );
}
