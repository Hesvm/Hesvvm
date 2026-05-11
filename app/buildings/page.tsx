'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { BuildingRow } from '@/components/BuildingRow';
import { buildings } from '@/data/buildings';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function BuildingsPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Page Title */}
        <h1 className="font-serif italic text-[2rem] text-[#1a1a1a] text-center">
          My buildings
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm text-[#666] mt-2 text-center">
          Things I built for myself that might be useful to you.
        </p>

        {/* Buildings List */}
        <motion.div
          className="mt-12 flex flex-col divide-y divide-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {buildings.map((building) => (
            <BuildingRow key={building.name} building={building} />
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
