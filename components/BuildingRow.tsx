'use client';

import { motion } from 'framer-motion';
import { Building } from '@/data/buildings';

export function BuildingRow({ building }: { building: Building }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
      }}
      className="flex items-center justify-between py-4 px-0"
    >
      {/* Icon + Name + Tagline (left group) */}
      <div className="flex items-center gap-5">
        <div className="relative h-[64px] w-[64px] shrink-0">
          <img
            src="/images/buildings/icon-frame.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          />
          <img
            src={building.icon}
            alt={building.name}
            className="absolute left-1/2 top-1/2 h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-[11px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-[18px] font-semibold text-[#1a1a1a]">
            {building.name}
          </p>
          <p className="font-serif italic text-[18px] text-[#888]">
            {building.tagline}
          </p>
        </div>
      </div>

      {/* Open Button (right group) */}
      <div className="flex items-center gap-3 ml-auto">
        <a
          href={building.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#F4F4F4] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.027)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="transition-colors group-hover:stroke-black" d="M6.83333 5.16667L11 1M11 3.77778V1H8.22222M11 7.11111V9.88889C11 10.1836 10.8829 10.4662 10.6746 10.6746C10.4662 10.8829 10.1836 11 9.88889 11H2.11111C1.81643 11 1.53381 10.8829 1.32544 10.6746C1.11706 10.4662 1 10.1836 1 9.88889V2.11111C1 1.81643 1.11706 1.53381 1.32544 1.32544C1.53381 1.11706 1.81643 1 2.11111 1H4.88889" stroke="#8F94AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
