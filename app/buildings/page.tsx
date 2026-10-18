'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { PersonalProjectCard } from '@/components/PersonalProjectCard';
import { buildings } from '@/data/buildings';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

export default function BuildingsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <PageTransition>
      <main
        style={{
          width: "min(calc(100% - (2 * var(--page-padding))), 880px)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "64px",
          paddingBottom: "120px",
        }}
      >
        {/* Page Title */}
        <h1
          className="font-serif italic text-[1.5rem] md:text-[2rem] text-[var(--text-strong)] text-center"
          style={{ margin: "0 0 6px 0" }}
        >
          Projects
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-sm text-[var(--text-secondary)] text-center"
          style={{ margin: "0 0 44px 0" }}
        >
          Things I built for myself that might be useful to you.
        </p>

        {/* Projects Grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {buildings.map((building, idx) => {
            const key = building.id || building.name || String(idx);
            return (
              <PersonalProjectCard
                key={key}
                project={building}
                isFa={false}
                isHovered={hoveredId === key}
                anyHovered={hoveredId !== null}
                onMouseEnter={() => setHoveredId(key)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </motion.div>
      </main>
    </PageTransition>
  );
}
