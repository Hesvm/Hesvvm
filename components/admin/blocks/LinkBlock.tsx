'use client'

import { useState } from 'react'
import { LinkBlock as LinkBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: LinkBlockType
  onChange: (b: LinkBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function LinkBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 8,
      padding: 16,
      position: 'relative',
      fontFamily: font,
      backgroundColor: '#fff',
    }}>
      {/* Top-right controls */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
        <button
          {...dragHandleProps}
          style={{ cursor: isReordering ? 'grab' : 'default', background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1 }}
        >
          ☰
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          style={{ background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1, cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div style={{
          marginBottom: 10,
          padding: '8px 12px',
          background: '#fff5f5',
          border: '1px solid #fecaca',
          borderRadius: 6,
          fontSize: 13,
          color: '#dc2626',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <span>Delete this block?</span>
          <button onClick={() => { onDelete(); setConfirmDelete(false) }} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Yes</button>
          <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: '1px solid #dc2626', color: '#dc2626', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 60 }}>
        <input
          type="url"
          value={block.url}
          onChange={e => onChange({ ...block, url: e.target.value })}
          placeholder="https://..."
          readOnly={isReordering}
          style={{
            width: '100%',
            border: '1px solid #e8e8e8',
            borderRadius: 6,
            outline: 'none',
            fontSize: 13,
            fontFamily: font,
            color: '#1a1a1a',
            padding: '8px 10px',
            background: '#fafafa',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="text"
          value={block.label}
          onChange={e => onChange({ ...block, label: e.target.value })}
          placeholder="Link label"
          readOnly={isReordering}
          style={{
            width: '100%',
            border: '1px solid #e8e8e8',
            borderRadius: 6,
            outline: 'none',
            fontSize: 13,
            fontFamily: font,
            color: '#1a1a1a',
            padding: '8px 10px',
            background: '#fafafa',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Preview */}
      {(block.label || block.url) && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</span>
          <div style={{ marginTop: 6 }}>
            <a
              href={block.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontFamily: font,
                color: '#1a1a1a',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
              onClick={e => e.preventDefault()}
            >
              {block.label || block.url}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
