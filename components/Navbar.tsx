"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLOR_ACTIVE = "#181818";
const COLOR_IDLE = "#969189";

const springConfig = { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.6 };

function HomeIcon({ color }: { color: string }) {
  return (
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.4952 3.44305C16.7239 3.44324 17.7684 3.93624 18.8252 4.71732C19.8552 5.47863 21.0118 6.6025 22.4508 7.99641L27.2096 12.6071L27.2869 12.6891C27.6456 13.1152 27.634 13.7554 27.2429 14.168C26.8511 14.5808 26.2175 14.6196 25.7809 14.2748L25.6967 14.2007L25.3552 13.8695L25.3552 16.7245C25.3552 18.7804 25.3574 20.4342 25.1849 21.7306C25.0082 23.0586 24.6298 24.1773 23.7513 25.0651C22.8726 25.9528 21.7653 26.3347 20.4506 26.5133C19.1673 26.6876 17.5304 26.6853 15.4952 26.6853C13.4599 26.6853 11.8231 26.6876 10.5397 26.5133C9.30709 26.3459 8.25687 26.0003 7.40632 25.2262L7.23898 25.0651C6.36022 24.1772 5.98215 23.0588 5.80538 21.7306C5.63291 20.4341 5.63511 18.7804 5.63511 16.7245L5.63511 13.8685L5.29261 14.2007C4.85693 14.6227 4.16532 14.608 3.74745 14.168C3.32973 13.7279 3.34413 13.0292 3.77975 12.6071L8.5395 7.99641L9.56797 7.00289C10.5485 6.06328 11.3926 5.28825 12.1651 4.71732C13.2219 3.93634 14.2663 3.44305 15.4952 3.44305ZM15.866 12.6516C13.7147 12.6516 11.9704 14.4138 11.9704 16.5871C11.9704 18.7604 13.7147 20.5226 15.866 20.5226C18.0172 20.5224 19.7607 18.7603 19.7607 16.5871C19.7607 14.4139 18.0172 12.6517 15.866 12.6516Z" fill={color}/>
    </svg>
  );
}

function PersonalProjectsIcon({ color }: { color: string }) {
  return (
    <div style={{ width: 31, height: 31, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="21" height="21" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.877 0C46.2079 -5.81784e-08 47.5262 0.262086 48.7559 0.771484C49.9854 1.28087 51.1029 2.02756 52.0439 2.96875C52.9851 3.90992 53.7289 5.02513 54.2383 6.25488C54.7476 7.48454 55.0098 8.80282 55.0098 10.1338C55.0097 11.4648 54.7476 12.7831 54.2383 14.0127C53.7289 15.2423 52.9822 16.3597 52.041 17.3008L51.5488 17.7959C51.4141 17.9303 51.3074 18.0899 51.2344 18.2656C51.1614 18.4415 51.123 18.6308 51.123 18.8213C51.1231 19.0116 51.1614 19.2002 51.2344 19.376C51.3073 19.5517 51.4141 19.7113 51.5488 19.8457L52.041 20.3408C52.9822 21.282 53.7289 22.4001 54.2383 23.6299C54.7476 24.8595 55.0098 26.1778 55.0098 27.5088C55.0097 28.8397 54.7476 30.1581 54.2383 31.3877C53.7402 32.5899 53.018 33.6845 52.1064 34.6123C52.0857 34.6334 52.0649 34.6549 52.0439 34.6758L51.5518 35.1738C51.2804 35.4453 51.1279 35.8134 51.1279 36.1973C51.1279 36.5811 51.2804 36.9492 51.5518 37.2207L52.0439 37.7158C53.9134 39.6228 54.9545 42.1908 54.9414 44.8613C54.9283 47.5318 53.8616 50.089 51.9736 51.9775C50.0856 53.866 47.5286 54.9336 44.8584 54.9473C42.1884 54.9608 39.6209 53.9197 37.7139 52.0508L37.2158 51.5557C36.9444 51.2843 36.5761 51.132 36.1924 51.1318C35.8085 51.1318 35.4395 51.2842 35.168 51.5557L34.6699 52.0479C32.7694 53.9478 30.1921 55.0146 27.5049 55.0146C24.8177 55.0146 22.2403 53.9478 20.3398 52.0479L19.8418 51.5557C19.5703 51.2843 19.2022 51.1319 18.8184 51.1318C18.4345 51.1318 18.0664 51.2842 17.7949 51.5557L17.2969 52.0479C15.3897 53.917 12.8216 54.9608 10.1514 54.9473C7.48108 54.9336 4.92415 53.8661 3.03613 51.9775C1.14812 50.089 0.0814402 47.5318 0.0683594 44.8613C0.0552811 42.1908 1.0964 39.6228 2.96582 37.7158L3.46094 37.2207C3.73236 36.9492 3.88477 36.5812 3.88477 36.1973C3.88475 35.8134 3.73235 35.4453 3.46094 35.1738L2.96875 34.6758C2.85111 34.5581 2.73647 34.4375 2.625 34.3145C1.84473 33.4534 1.21716 32.4636 0.771484 31.3877C0.262156 30.1581 5.18762e-05 28.8397 0 27.5088C-5.81763e-08 26.1779 0.262229 24.8595 0.771484 23.6299C1.28086 22.4001 2.02755 21.282 2.96875 20.3408L3.46094 19.8457C3.59577 19.7112 3.70338 19.5519 3.77637 19.376C3.84931 19.2002 3.88667 19.0116 3.88672 18.8213C3.88672 18.6308 3.84936 18.4415 3.77637 18.2656C3.70338 18.0898 3.59571 17.9303 3.46094 17.7959L2.96875 17.3008C2.02763 16.3597 1.28085 15.2423 0.771484 14.0127C0.262149 12.7831 4.46147e-05 11.4648 0 10.1338C-5.81771e-08 8.80285 0.262216 7.48452 0.771484 6.25488C1.28086 5.02513 2.02462 3.90992 2.96582 2.96875C3.90688 2.02754 5.02432 1.28089 6.25391 0.771484C7.48357 0.262069 8.80182 5.81795e-08 10.1328 0C11.4638 2.0857e-07 12.7821 0.262069 14.0117 0.771484C15.2413 1.28089 16.3587 2.02754 17.2998 2.96875L17.7949 3.46484C18.0664 3.73604 18.4346 3.88867 18.8184 3.88867C19.2021 3.88863 19.5703 3.7361 19.8418 3.46484L20.3398 2.97168C21.787 1.5245 23.6385 0.549586 25.6504 0.174805C26.2649 0.0603645 26.8858 0.00300798 27.5049 0.00292969C28.124 0.00300096 28.7449 0.0603575 29.3594 0.174805C31.3713 0.549545 33.2228 1.52451 34.6699 2.97168L35.168 3.46484C35.4394 3.73611 35.8077 3.88857 36.1914 3.88867C36.5753 3.88867 36.9443 3.73627 37.2158 3.46484L37.7109 2.96875C38.652 2.02768 39.7695 1.28082 40.999 0.771484C42.2285 0.262236 43.5462 3.05947e-05 44.877 0ZM18.0098 11.0078C14.1438 11.0078 11.0098 14.1418 11.0098 18.0078V37.0078C11.0098 40.8738 14.1438 44.0078 18.0098 44.0078H37.0098C40.8758 44.0078 44.0098 40.8738 44.0098 37.0078V18.0078C44.0098 14.1418 40.8758 11.0078 37.0098 11.0078H18.0098Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function LabIcon({ color }: { color: string }) {
  return (
    <div style={{ width: 31, height: 31, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.84 21.998H8.16c-4.19 0-5.02-2.53-3.66-5.61l1.44-3.27s3.06-.12 6.06.88c3 1 5.83-.89 5.83-.89l.19-.12 1.49 3.41c1.34 3.08.46 5.6-3.67 5.6ZM15.44 6.74h-.16l2.13 4.86-.41.26c-.02.01-2.28 1.46-4.53.72-2.35-.79-4.71-.93-5.87-.95l2.14-4.89h-.3c-.65 0-1.25-.26-1.68-.69A2.375 2.375 0 0 1 8.44 2h7.11c.66 0 1.25.27 1.68.7.56.56.85 1.38.63 2.25-.26 1.08-1.3 1.79-2.42 1.79Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function WritesIcon({ color }: { color: string }) {
  return (
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.135 6.85471C21.8812 4.60092 18.1249 4.60092 15.8711 6.85471L9.95484 12.7709C9.01576 13.71 8.45231 15.0247 8.45231 16.4333L8.45231 21.2227L5.44725 24.2277C5.07162 24.6034 5.07162 25.2607 5.44725 25.6363C5.63507 25.7303 5.91679 25.8242 6.10461 25.8242C6.29243 25.8242 6.57415 25.7303 6.76197 25.5424L15.6832 16.9029C16.0589 16.5273 16.7162 16.5273 17.0919 16.9029C17.4675 17.2785 17.4675 17.9359 17.0919 18.3115L14.7442 20.6592L13.8051 21.5983L12.866 22.5374L14.5563 22.5374C15.8711 22.5374 17.2797 21.9739 18.2188 21.0348L24.135 15.1186C25.2619 14.0856 25.8253 12.5831 25.8253 10.9867C25.8253 9.39023 25.2619 7.98161 24.135 6.85471Z" fill={color}/>
    </svg>
  );
}

function UkFlagIcon({ color }: { color?: string }) {
  return (
    <div style={{ width: 31, height: 31, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 182 182" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", display: "block" }}>
        <g clipPath="url(#clip0_uk_flag)">
          <path d="M91 182C141.258 182 182 141.258 182 91C182 40.7421 141.258 0 91 0C40.7421 0 0 40.7421 0 91C0 141.258 40.7421 182 91 182Z" fill="white"/>
          <path d="M18.8113 35.5967C11.6632 44.8968 6.2732 55.616 3.13477 67.2608H50.4754L18.8113 35.5967Z" fill="#0052B4"/>
          <path d="M178.865 67.2614C175.727 55.6169 170.337 44.8978 163.189 35.5977L131.525 67.2614H178.865Z" fill="#0052B4"/>
          <path d="M3.13477 114.739C6.27355 126.384 11.6635 137.103 18.8113 146.403L50.4743 114.739H3.13477Z" fill="#0052B4"/>
          <path d="M146.403 18.8116C137.103 11.6635 126.384 6.27355 114.739 3.13477V50.475L146.403 18.8116Z" fill="#0052B4"/>
          <path d="M35.5967 163.188C44.8968 170.337 55.616 175.726 67.2604 178.865V131.525L35.5967 163.188Z" fill="#0052B4"/>
          <path d="M67.2601 3.13477C55.6156 6.27355 44.8965 11.6635 35.5967 18.8113L67.2601 50.4747V3.13477Z" fill="#0052B4"/>
          <path d="M114.739 178.865C126.384 175.726 137.103 170.337 146.403 163.189L114.739 131.525V178.865Z" fill="#0052B4"/>
          <path d="M131.525 114.739L163.189 146.403C170.337 137.103 175.727 126.384 178.865 114.739H131.525Z" fill="#0052B4"/>
          <path d="M181.23 79.1305H102.87H102.87V0.770301C98.9842 0.264469 95.0228 0 91 0C86.9764 0 83.0158 0.264469 79.1305 0.770301V79.1298V79.1302H0.770301C0.264469 83.0158 0 86.9772 0 91C0 95.0236 0.264469 98.9842 0.770301 102.869H79.1298H79.1302V181.23C83.0158 181.736 86.9764 182 91 182C95.0228 182 98.9842 181.736 102.869 181.23V102.87V102.87H181.23C181.736 98.9842 182 95.0236 182 91C182 86.9772 181.736 83.0158 181.23 79.1305V79.1305Z" fill="#D80027"/>
          <path d="M114.739 114.74L155.347 155.347C157.214 153.48 158.996 151.528 160.696 149.505L125.93 114.739H114.739V114.74Z" fill="#D80027"/>
          <path d="M67.26 114.739H67.2593L26.6523 155.346C28.5193 157.214 30.4711 158.995 32.4945 160.695L67.26 125.929V114.739Z" fill="#D80027"/>
          <path d="M67.2611 67.2607V67.26L26.6538 26.6523C24.7861 28.5193 23.0045 30.4711 21.3047 32.4945L56.0706 67.2604H67.2611V67.2607Z" fill="#D80027"/>
          <path d="M114.739 67.2615L155.347 26.6534C153.48 24.7858 151.528 23.0042 149.505 21.3047L114.739 56.0706V67.2615Z" fill="#D80027"/>
        </g>
        <defs>
          <clipPath id="clip0_uk_flag">
            <rect width="182" height="182" rx="91" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

const enNavItems = [
  { href: "/", label: "Works", Icon: HomeIcon },
  { href: "/buildings", label: "Personal Projects", Icon: PersonalProjectsIcon },
  { href: "/lab", label: "Lab", Icon: LabIcon },
  { href: "/notes", label: "Writings", Icon: WritesIcon },
];

function getActiveIndex(pathname: string, isFa: boolean) {
  if (isFa) {
    if (pathname === "/fa" || pathname === "/fa/") return 0;
    if (pathname.startsWith("/fa/buildings")) return 1;
    if (pathname.startsWith("/fa/lab")) return 2;
    if (pathname.startsWith("/fa/notes")) return 3;
    return -1;
  }
  if (pathname === "/") return 0;
  if (pathname.startsWith("/buildings")) return 1;
  if (pathname.startsWith("/lab")) return 2;
  if (pathname.startsWith("/notes")) return 3;
  return -1;
}

export function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const isFa = pathname.startsWith('/fa');
  const activeIndex = getActiveIndex(pathname, isFa);

  const englishEquivalentPath = isFa
    ? pathname.replace(/^\/fa(?:\/|$)/, "/") || "/"
    : "/";

  const navItems = isFa
    ? [
        { href: "/fa", label: "آثار", Icon: HomeIcon },
        { href: "/fa/buildings", label: "پروژه‌های شخصی", Icon: PersonalProjectsIcon },
        { href: "/fa/lab", label: "آزمایشگاه", Icon: LabIcon },
        { href: "/fa/notes", label: "نوشته‌ها", Icon: WritesIcon },
        { href: englishEquivalentPath, label: "English", Icon: UkFlagIcon },
      ]
    : enNavItems;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setHoveredIndex(null);
  }, [pathname]);

  // Don't show tooltip on the active route, and ensure index is within navItems bounds
  const visibleTooltipIndex =
    hoveredIndex !== null &&
    hoveredIndex !== activeIndex &&
    hoveredIndex >= 0 &&
    hoveredIndex < navItems.length
      ? hoveredIndex
      : null;

  const currentTooltipItem = visibleTooltipIndex !== null ? navItems[visibleTooltipIndex] : null;

  const menuRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  useEffect(() => {
    if (visibleTooltipIndex !== null && menuRef.current && tooltipRef.current) {
      const items = menuRef.current.children;
      const targetElement = items[visibleTooltipIndex] as HTMLElement | undefined;
      if (!targetElement) return;

      const menuRect = menuRef.current.getBoundingClientRect();
      const itemRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const left = itemRect.left - menuRect.left + (itemRect.width - tooltipRect.width) / 2;
      setTooltipLeft(Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)));
    }
  }, [visibleTooltipIndex]);

  return (
    <nav
      className="navbar-nav"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      {/* Tooltip */}
      <div className="navbar-tooltip">
        <AnimatePresence>
          {visibleTooltipIndex !== null && currentTooltipItem && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={springConfig}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "-18px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <motion.div
              ref={tooltipRef}
              animate={{ x: tooltipLeft }}
              transition={springConfig}
              style={{
                display: "inline-flex",
                height: "28px",
                padding: "0 12px",
                borderRadius: "100px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--surface-primary)",
                border: "none",
                boxShadow: "var(--shadow-medium)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{
                fontFamily: isFa ? "var(--font-persian)" : "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: COLOR_ACTIVE,
                lineHeight: 1,
              }}>
                {currentTooltipItem.label}
              </span>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Pill */}
      <div
        ref={menuRef}
        className="navbar-pill"
        style={{
          display: "flex",
          flexDirection: isFa ? "row-reverse" : "row",
          alignItems: "center",
          height: "60px",
          borderRadius: "100px",
          backgroundColor: "var(--surface-primary)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          const isHovered = hoveredIndex === idx;
          const color = isActive || isHovered ? COLOR_ACTIVE : COLOR_IDLE;
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              aria-label={item.label}
              style={{ lineHeight: 0, display: "block", transition: "color 150ms ease" }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <item.Icon color={color} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
