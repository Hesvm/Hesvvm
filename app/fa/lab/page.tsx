'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { BuildingRowFa } from '@/components/fa/BuildingRowFa';
import { faExperiments } from '@/data/fa/lab';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function FaLabPage() {
  return (
    <PageTransition>
      <main className="site-content py-16" style={{ direction: 'rtl' }}>
        {/* Page Title */}
        <h1 className="font-persian font-bold text-[1.75rem] md:text-[2.25rem] text-[var(--text-strong)] text-center">
          آزمایشگاه
        </h1>

        {/* Subtitle */}
        <p className="font-persian text-sm text-[var(--text-secondary)] mt-2 text-center">
          آزمایش‌ها، پروتوتایپ‌ها و پروژه‌های تجربی.
        </p>

        {/* Lab List */}
        <motion.div
          className="mt-12 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {faExperiments.map((experiment) => (
            <BuildingRowFa key={experiment.name} building={experiment} />
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
