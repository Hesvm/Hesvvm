'use client';

import { motion } from 'framer-motion';

export type HomeTab = 'works' | 'frames';

export function HomeSegmentedControl({
  activeTab,
  onChange,
  isFa = false,
}: {
  activeTab: HomeTab;
  onChange: (tab: HomeTab) => void;
  isFa?: boolean;
}) {
  const tabs: { id: HomeTab; label: string }[] = isFa
    ? [
        { id: 'works', label: 'آثار' },
        { id: 'frames', label: 'فریم‌ها' },
      ]
    : [
        { id: 'works', label: 'Works' },
        { id: 'frames', label: 'Frames' },
      ];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#F0EFEA',
        padding: '4px',
        borderRadius: '999px',
        position: 'relative',
        userSelect: 'none',
        border: 'none',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '7px 22px',
              fontSize: '14.5px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#141414' : '#88847E',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              outline: 'none',
              transition: 'color 160ms ease',
              fontFamily: isFa ? 'var(--font-persian)' : 'var(--font-sans)',
              letterSpacing: isFa ? '0' : '-0.01em',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="homeSegmentedIndicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '999px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 480, damping: 36 }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
