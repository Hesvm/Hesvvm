"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="31" height="31" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    icon: (
      <svg width="31" height="31" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
  {
    href: "/notes",
    label: "Notes",
    icon: (
      <svg width="31" height="31" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h12v-2H3v2zm0-5h12v-2H3v2zm0-7v2h12V6H3zm14 9.5v-3l-1.5 1.5-1.5-1.5v3l1.5 1.5 1.5-1.5zM17 3l-5 5h4v9h2V8h4l-5-5z" />
      </svg>
    ),
  },
];

function getActiveIndex(pathname: string) {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/projects")) return 1;
  if (pathname.startsWith("/notes")) return 2;
  return -1;
}

export function Navbar() {
  const pathname = usePathname();
  const activeIndex = getActiveIndex(pathname);

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "48px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "27px",
          padding: "0 24px",
          height: "60px",
          width: "189px",
          borderRadius: "var(--navbar-radius)",
          backgroundColor: "var(--color-navbar-bg)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          justifyContent: "center",
        }}
      >
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              style={{ lineHeight: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.15 }}
                style={{
                  color: isActive
                    ? "var(--color-text-primary)"
                    : "var(--color-text-muted)",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {item.icon}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
