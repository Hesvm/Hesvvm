'use client';

import { motion } from 'framer-motion';
import { Building } from '@/data/buildings';

const statusColors = {
  Live: { border: '#10b981', text: '#10b981' },    // green
  Beta: { border: '#f59e0b', text: '#f59e0b' },    // amber
  Archived: { border: '#9ca3af', text: '#9ca3af' }, // gray
};

export function BuildingRow({ building }: { building: Building }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
      }}
      className="flex items-center justify-between py-4 px-0 hover:bg-gray-50 transition-colors duration-150"
    >
      {/* Icon + Name + Tagline (left group) */}
      <div className="flex items-center gap-4">
        <img
          src={building.icon}
          alt={building.name}
          className="w-[52px] h-[52px] object-cover bg-gray-100"
        />
        <div className="flex flex-col gap-0.5">
          <p className="font-sans font-semibold text-base text-[#1a1a1a]">
            {building.name}
          </p>
          <p className="font-serif italic text-[18px] text-[#888]">
            {building.tagline}
          </p>
        </div>
      </div>

      {/* Status Badge + Open Button (right group) */}
      <div className="flex items-center gap-3 ml-auto">
        <div
          className="px-2 py-0.5 rounded-full border font-sans text-[0.7rem] font-medium"
          style={{
            borderColor: statusColors[building.status].border,
            color: statusColors[building.status].text,
          }}
        >
          {building.status}
        </div>

        <a
          href={building.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[36px] h-[36px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-150 hover:scale-105"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.83333 5.16667L11 1M11 3.77778V1H8.22222M11 7.11111V9.88889C11 10.1836 10.8829 10.4662 10.6746 10.6746C10.4662 10.8829 10.1836 11 9.88889 11H2.11111C1.81643 11 1.53381 10.8829 1.32544 10.6746C1.11706 10.4662 1 10.1836 1 9.88889V2.11111C1 1.81643 1.11706 1.53381 1.32544 1.32544C1.53381 1.11706 1.81643 1 2.11111 1H4.88889" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
