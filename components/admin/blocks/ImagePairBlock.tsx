'use client'

import { useState, useRef } from 'react'
import { ImagePairBlock as ImagePairBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

type Side = 'left' | 'right'

interface Props {
  block: ImagePairBlockType
  onChange: (b: ImagePairBlockType) => void
  onDelete: () => void
  isReordering: boolean
  slug: string
  dragHandleProps?: Record<string, unknown>
}

export default function ImagePairBlock({ block, onChange, onDelete, isReordering, slug, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)
  const [uploadingLeft, setUploadingLeft] = useState(false)
  const [uploadingRight, setUploadingRight] = useState(false)
  const leftInputRef = useRef<HTMLInputElement>(null)
  const rightInputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File, side: Side) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `blocks/${slug}-${Date.now()}-${side}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    if (side === 'left') setUploadingLeft(true)
    else setUploadingRight(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url: string }
      onChange({ ...block, [side]: { ...block[side], src: data.url } })
    } finally {
      if (side === 'left') setUploadingLeft(false)
      else setUploadingRight(false)
    }
  }

  function handleSwap() {
    onChange({ ...block, left: block.right, right: block.left })
  }

  function renderSide(side: Side) {
    const col = block[side]
    const hovering = side === 'left' ? hoverLeft : hoverRight
    const uploading = side === 'left' ? uploadingLeft : uploadingRight
    const inputRef = side === 'left' ? leftInputRef : rightInputRef
    const setHovering = side === 'left' ? setHoverLeft : setHoverRight

    return (
      <div style={{ flex: 1 }}>
        {col.src ? (
          <div
            style={{ position: 'relative', marginBottom: 8 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={col.src}
              alt={col.alt ?? ''}
              style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 6, display: 'block' }}
            />
            {hovering && !isReordering && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <button
                  onClick={() => inputRef.current?.click()}
                  style={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 16px',
                    fontFamily: font,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {uploading ? 'Uploading...' : 'Replace'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => !isReordering && inputRef.current?.click()}
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: 8,
              minHeight: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isReordering ? 'default' : 'pointer',
              marginBottom: 8,
              color: '#9ca3af',
              fontSize: 13,
            }}
          >
            {uploading ? 'Uploading...' : 'Upload image'}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file, side)
          }}
        />

        <input
          type="text"
          value={col.subtitle ?? ''}
          onChange={e => onChange({ ...block, [side]: { ...col, subtitle: e.target.value } })}
          placeholder="Caption (optional)"
          readOnly={isReordering}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 12,
            fontFamily: font,
            color: '#9ca3af',
            padding: '4px 0',
            background: 'transparent',
            boxSizing: 'border-box',
          }}
        />
      </div>
    )
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
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center', zIndex: 2 }}>
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

      {/* Columns */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        {renderSide('left')}

        {/* Swap button */}
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 60 }}>
          <button
            onClick={handleSwap}
            disabled={isReordering}
            style={{
              background: 'none',
              border: '1px solid #e8e8e8',
              borderRadius: 6,
              padding: '6px 8px',
              cursor: isReordering ? 'default' : 'pointer',
              fontSize: 16,
              color: '#6b7280',
              lineHeight: 1,
            }}
            title="Swap images"
          >
            ⇄
          </button>
        </div>

        {renderSide('right')}
      </div>
    </div>
  )
}
