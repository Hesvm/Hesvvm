'use client'

import { useState } from 'react'
import { VideoBlock as VideoBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

function isValidEmbedUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')
}

function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return url
}

interface Props {
  block: VideoBlockType
  onChange: (b: VideoBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function VideoBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const valid = block.url && isValidEmbedUrl(block.url)

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

      <div style={{ paddingRight: 60 }}>
        <input
          type="url"
          value={block.url}
          onChange={e => onChange({ ...block, url: e.target.value })}
          placeholder="YouTube or Vimeo URL"
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
            marginBottom: 8,
          }}
        />
      </div>

      {/* iframe preview */}
      {valid && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          <iframe
            src={toEmbedUrl(block.url)}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

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
