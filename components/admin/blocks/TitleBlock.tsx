'use client'

import { useRef, useState } from 'react'
import { TitleBlock as TitleBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: TitleBlockType
  onChange: (b: TitleBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function TitleBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      const el = inputRef.current
      if (!el) return
      // Save selection before any prompt (prompts lose focus)
      const { selectionStart: start, selectionEnd: end, value } = el
      const s = start ?? value.length
      const en = end ?? value.length
      const selected = value.slice(s, en)

      const url = window.prompt('URL:')
      if (!url) return

      let urlPart = url
      if (window.confirm('Add hover preview card?')) {
        const image = window.prompt('Image path (e.g. /images/people/parsa.jpg):') ?? ''
        const title = window.prompt('Preview title:') ?? ''
        const subtitle = window.prompt('Preview subtitle:') ?? ''
        if (image && title && subtitle) {
          urlPart = `${url}||${image}||${title}||${subtitle}`
        }
      }

      const insertion = selected ? `[${selected}](${urlPart})` : `[](${urlPart})`
      const next = value.slice(0, s) + insertion + value.slice(en)
      onChange({ ...block, content: next })
      const cursorPos = selected ? s + insertion.length : s + 1
      requestAnimationFrame(() => {
        el.setSelectionRange(cursorPos, cursorPos)
      })
    }
  }

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

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={block.content}
        readOnly={isReordering}
        onChange={e => onChange({ ...block, content: e.target.value })}
        onKeyDown={handleKeyDown}
        placeholder="Section title"
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: 22,
          fontFamily: font,
          fontWeight: 600,
          color: '#1a1a1a',
          background: 'transparent',
          paddingRight: 60,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
