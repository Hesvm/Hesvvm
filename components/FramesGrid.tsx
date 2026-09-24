'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FrameItem } from '@/data/frames';

export function FramesGrid({
  frames,
  isFa = false,
}: {
  frames: FrameItem[];
  isFa?: boolean;
}) {
  // Distribute frames across 3 columns for balanced masonry heights
  const col1: FrameItem[] = [];
  const col2: FrameItem[] = [];
  const col3: FrameItem[] = [];

  frames.forEach((frame, idx) => {
    if (idx % 3 === 0) col1.push(frame);
    else if (idx % 3 === 1) col2.push(frame);
    else col3.push(frame);
  });

  const columns = [col1, col2, col3];

  if (!frames || frames.length === 0) {
    return (
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontFamily: isFa ? 'var(--font-persian)' : 'var(--font-sans)',
        }}
      >
        {isFa ? 'تصویری برای نمایش وجود ندارد.' : 'No frames found.'}
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        direction: isFa ? 'rtl' : 'ltr',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          alignItems: 'start',
        }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {col.map((frame) => {
              const href = isFa
                ? `/fa/projects/${frame.projectSlug}`
                : `/projects/${frame.projectSlug}`;

              return (
                <Link
                  key={frame.id}
                  href={href}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      y: -2,
                      filter: 'brightness(1.03)',
                    }}
                    style={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface-secondary)',
                      cursor: 'pointer',
                      transition: 'transform 180ms ease, filter 180ms ease',
                    }}
                  >
                    <img
                      src={frame.image}
                      alt={frame.title || frame.projectName}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '16px',
                      }}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

