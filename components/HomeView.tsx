'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { ProjectGrid } from './ProjectGrid';
import { FramesGrid } from './FramesGrid';
import { HomeSegmentedControl, HomeTab } from './HomeSegmentedControl';
import { extractFramesFromProjects } from '@/data/frames';

export function HomeView({
  projects,
  isFa = false,
  heroSection,
}: {
  projects: Project[];
  isFa?: boolean;
  heroSection: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<HomeTab>('works');
  const frames = extractFramesFromProjects(projects);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        paddingTop: '30px',
        paddingBottom: '120px',
        direction: isFa ? 'rtl' : 'ltr',
        width: activeTab === 'frames' ? 'min(calc(100% - 32px), 820px)' : 'min(calc(100% - (2 * var(--page-padding))), 540px)',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Hero Section */}
      {heroSection}

      {/* Switch & Content Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Toggle Switch */}
        <div
          style={{
            position: 'sticky',
            top: '20px',
            zIndex: 30,
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
        >
          <HomeSegmentedControl
            activeTab={activeTab}
            onChange={setActiveTab}
            isFa={isFa}
          />
        </div>

        {/* Dynamic Content: Works or Frames */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'works' ? (
              <motion.div
                key="works-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 'min(100%, 520px)' }}>
                  <ProjectGrid projects={projects} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="frames-tab"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FramesGrid frames={frames} isFa={isFa} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
