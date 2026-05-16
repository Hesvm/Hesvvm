'use client'

import { useState, useRef } from 'react'
import { ImageBlock as ImageBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: ImageBlockType
  onChange: (b: ImageBlockType) => void
  onDelete: () => void
  isReordering: boolean
  slug: string
  dragHandleProps?: Record<string, unknown>
}

export default function ImageBlock({ block, onChange, onDelete, isReordering, slug, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `blocks/${slug}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setUploading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url: string }
      onChange({ ...block, src: data.url })
    } finally {
      setUploading(false)
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
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center', zIndex: 2 }}>
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

      {/* Image or upload zone */}
      {block.src ? (
        <div
          style={{ position: 'relative', marginBottom: 8 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt ?? ''}
            style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 6, display: 'block' }}
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
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 20px',
                  fontFamily: font,
                  fontSize: 14,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {uploading ? 'Uploading...' : 'Replace'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !isReordering && fileInputRef.current?.click()}
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: 8,
            minHeight: 160,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isReordering ? 'default' : 'pointer',
            marginBottom: 8,
            color: '#9ca3af',
            fontSize: 14,
          }}
        >
          {uploading ? 'Uploading...' : 'Upload image'}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) void handleUpload(file)
        }}
      />

      {/* Alt text */}
      <input
        type="text"
        value={block.alt ?? ''}
        onChange={e => onChange({ ...block, alt: e.target.value })}
        placeholder="Alt text"
        readOnly={isReordering}
        style={{
          width: '100%',
          border: 'none',
          borderBottom: '1px solid #f0f0f0',
          outline: 'none',
          fontSize: 12,
          fontFamily: font,
          color: '#6b7280',
          padding: '4px 0',
          marginBottom: 4,
          background: 'transparent',
          boxSizing: 'border-box',
        }}
      />

      {/* Subtitle */}
      <input
        type="text"
        value={block.subtitle ?? ''}
        onChange={e => onChange({ ...block, subtitle: e.target.value })}
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
