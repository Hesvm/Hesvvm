'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { BuildingRow } from '@/components/BuildingRow';
import { experiments } from '@/data/lab';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function LabPage() {
  return (
    <PageTransition>
      <main className="site-content py-16">
        {/* Page Title */}
        <h1 className="font-serif italic text-[1.5rem] md:text-[2rem] text-[var(--text-strong)] text-center">
          Lab
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm text-[var(--text-secondary)] mt-2 text-center">
          Experiments, prototypes, and playground projects.
        </p>

        {/* Experiments List */}
        <motion.div
          className="mt-12 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {experiments.map((experiment) => (
            <BuildingRow key={experiment.name} building={experiment} />
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
