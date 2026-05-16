'use client'

import { useRef, useState, useEffect } from 'react'
import { QuoteBlock as QuoteBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: QuoteBlockType
  onChange: (b: QuoteBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function QuoteBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  useEffect(() => {
    autoResize()
  }, [block.content])

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

      {/* Quote fields */}
      <div style={{ paddingRight: 60 }}>
        <textarea
          ref={textareaRef}
          value={block.content}
          readOnly={isReordering}
          onChange={e => {
            onChange({ ...block, content: e.target.value })
          }}
          onInput={autoResize}
          placeholder="Quote content..."
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 15,
            fontFamily: font,
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: '#1a1a1a',
            background: 'transparent',
            minHeight: 60,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        />

        <input
          type="text"
          value={block.attribution ?? ''}
          onChange={e => onChange({ ...block, attribution: e.target.value })}
          placeholder="— Attribution"
          readOnly={isReordering}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 13,
            fontFamily: font,
            color: '#6b7280',
            padding: '4px 0',
            background: 'transparent',
            boxSizing: 'border-box',
            marginTop: 4,
          }}
        />
      </div>

      {/* Preview */}
      {block.content && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</span>
          <div style={{
            marginTop: 8,
            paddingLeft: 16,
            borderLeft: '2px solid #e0e0e0',
          }}>
            <p style={{ margin: 0, fontSize: 15, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1.6 }}>{block.content}</p>
            {block.attribution && (
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>{block.attribution}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
