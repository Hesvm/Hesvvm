'use client'

import { useRef, useState, useEffect } from 'react'
import { TextBlock as TextBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: TextBlockType
  onChange: (b: TextBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function TextBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
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
          style={{
            cursor: isReordering ? 'grab' : 'default',
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: 14,
            padding: '2px 4px',
            lineHeight: 1,
          }}
          title="Drag to reorder"
        >
          ☰
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: 14,
            padding: '2px 4px',
            lineHeight: 1,
            cursor: 'pointer',
          }}
          title="Delete block"
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
          <button
            onClick={() => { onDelete(); setConfirmDelete(false) }}
            style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            style={{ background: 'none', border: '1px solid #dc2626', color: '#dc2626', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={block.content}
        readOnly={isReordering}
        onChange={e => {
          onChange({ ...block, content: e.target.value })
        }}
        onInput={autoResize}
        placeholder="Write something..."
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: 14,
          fontFamily: font,
          lineHeight: 1.6,
          color: '#1a1a1a',
          background: 'transparent',
          paddingRight: 60,
          minHeight: 60,
          overflow: 'hidden',
        }}
      />
    </div>
  )
}
