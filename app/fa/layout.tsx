import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حسام | نمونه‌کارها و یادداشت‌ها",
  description: "طراح محصول؛ نمونه‌کارها و تجربیات",
};

export default function FaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="fa" className="font-persian" style={{ direction: "rtl", textAlign: "right" }}>
      {children}
    </div>
  );
}
