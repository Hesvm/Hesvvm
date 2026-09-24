'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { PersonalProjectCard } from '@/components/PersonalProjectCard';
import { faBuildings } from '@/data/fa/buildings';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

export default function FaBuildingsPage() {
  return (
    <PageTransition>
      <main
        style={{
          width: "min(calc(100% - (2 * var(--page-padding))), 880px)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "64px",
          paddingBottom: "120px",
          direction: "rtl",
        }}
      >
        {/* Page Title */}
        <h1
          className="font-persian font-bold text-[1.75rem] md:text-[2.25rem] text-[var(--text-strong)] text-center"
          style={{ margin: "0 0 6px 0" }}
        >
          پروژه‌های شخصی
        </h1>

        {/* Subtitle */}
        <p
          className="font-persian text-sm text-[var(--text-secondary)] text-center"
          style={{ margin: "0 0 44px 0" }}
        >
          چیزهایی که برای خودم ساختم و شاید برای شما هم مفید باشه.
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
          {faBuildings.map((building, idx) => (
            <PersonalProjectCard key={building.id || building.name || idx} project={building} isFa={true} />
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
