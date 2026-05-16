'use client'

import { useState, useEffect, useRef } from 'react'
import { BlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

const BLOCK_TYPES: { type: BlockType; icon: string; label: string }[] = [
  { type: 'text', icon: 'T', label: 'Text' },
  { type: 'title', icon: 'H', label: 'Title' },
  { type: 'image', icon: '▭', label: 'Image' },
  { type: 'image-pair', icon: '▭▭', label: 'Image Pair' },
  { type: 'divider', icon: '—', label: 'Divider' },
  { type: 'link', icon: '🔗', label: 'Link' },
  { type: 'video', icon: '▶', label: 'Video' },
  { type: 'quote', icon: '"', label: 'Quote' },
]

interface Props {
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  projectSlug: string
  projectStatus: 'draft' | 'published'
  onInsertBlock: (type: BlockType) => void
  onToggleReorder: () => void
  isReordering: boolean
  deployHookUrl?: string
  onDeploy: () => void
  onStatusChange: (status: 'draft' | 'published') => void
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3.5V14.5M3.5 9H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function ReorderIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 6L9 2L13 6" stroke={active ? '#181818' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12L9 16L13 12" stroke={active ? '#181818' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PublishIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L12 6H6L9 2Z" fill="currentColor"/>
      <path d="M9 2V12M5 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function FloatingBar({
  saveStatus,
  projectSlug,
  projectStatus,
  onInsertBlock,
  onToggleReorder,
  isReordering,
  onDeploy,
}: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const plusBtnRef = useRef<HTMLButtonElement>(null)

  const COLOR_IDLE = '#969189'
  const COLOR_ACTIVE = '#181818'

  useEffect(() => {
    if (!popoverOpen) return
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        plusBtnRef.current && !plusBtnRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPopoverOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [popoverOpen])

  const saveLabel =
    saveStatus === 'saving' ? 'Saving…' :
    saveStatus === 'saved' ? '✓ Saved' :
    saveStatus === 'error' ? 'Save failed' : null

  const saveColor =
    saveStatus === 'saving' ? '#969189' :
    saveStatus === 'saved' ? '#16a34a' :
    saveStatus === 'error' ? '#dc2626' : 'transparent'

  const btnStyle = (active = false): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 36,
    borderRadius: 100,
    border: 'none',
    background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
    cursor: 'pointer',
    color: active ? COLOR_ACTIVE : COLOR_IDLE,
    transition: 'background 0.15s, color 0.15s',
    flexShrink: 0,
  })

  return (
    <div style={{
      position: 'fixed',
      bottom: 48,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      fontFamily: font,
    }}>
      {/* Save status label above bar */}
      {saveLabel && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: 12,
          color: saveColor,
          pointerEvents: 'none',
          fontFamily: font,
        }}>
          {saveLabel}
        </div>
      )}

      {/* Block type popover */}
      {popoverOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--surface-primary)',
            borderRadius: 16,
            boxShadow: 'var(--shadow-elevated)',
            padding: '6px 0',
            minWidth: 160,
            zIndex: 200,
          }}
        >
          {BLOCK_TYPES.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => { onInsertBlock(type); setPopoverOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '9px 16px',
                cursor: 'pointer',
                fontFamily: font,
                fontSize: 14,
                color: COLOR_ACTIVE,
                textAlign: 'left',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
            >
              <span style={{ width: 20, textAlign: 'center', fontSize: 13, color: COLOR_IDLE }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Pill bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 16px',
        height: 60,
        borderRadius: 100,
        backgroundColor: 'var(--surface-primary)',
        boxShadow: 'var(--shadow-elevated)',
      }}>
        {/* Add block */}
        <button
          ref={plusBtnRef}
          onClick={() => setPopoverOpen(p => !p)}
          style={btnStyle(popoverOpen)}
          title="Add block"
        >
          <PlusIcon />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />

        {/* Preview */}
        <button
          onClick={() => projectSlug && window.open(`/projects/${projectSlug}`, '_blank')}
          style={btnStyle()}
          title="Preview"
        >
          <EyeIcon />
        </button>

        {/* Reorder */}
        <button
          onClick={onToggleReorder}
          style={btnStyle(isReordering)}
          title="Reorder blocks"
        >
          <ReorderIcon active={isReordering} />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />

        {/* Publish */}
        <button
          onClick={projectStatus === 'published' ? onDeploy : undefined}
          disabled={projectStatus === 'draft'}
          style={{
            ...btnStyle(false),
            width: 'auto',
            padding: '0 14px',
            gap: 6,
            color: projectStatus === 'draft' ? COLOR_IDLE : COLOR_ACTIVE,
            cursor: projectStatus === 'draft' ? 'not-allowed' : 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
          title={projectStatus === 'draft' ? 'Set to Published to deploy' : 'Deploy'}
        >
          <PublishIcon />
          {projectStatus === 'published' ? 'Redeploy' : 'Publish'}
        </button>
      </div>
    </div>
  )
}
