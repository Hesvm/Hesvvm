'use client'

import { useRef, useState } from 'react'
import { VideoBlock as VideoBlockType } from '@/types/project'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

function isValidEmbedUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')
}

function toEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return url
}

interface Props {
  block: VideoBlockType
  onChange: (b: VideoBlockType) => void
  onDelete: () => void
  isReordering: boolean
  slug: string
  dragHandleProps?: Record<string, unknown>
}

export default function VideoBlock({ block, onChange, onDelete, isReordering, slug, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEmbed = block.url && isValidEmbedUrl(block.url)
  const playback = block.playback ?? 'auto'

  async function handleUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'mp4'
    const path = `blocks/${slug}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setUploading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url: string }
      onChange({ ...block, url: data.url })
    } catch (err) {
      console.error('Video upload failed', err)
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

      {/* URL input + upload button row */}
      <div style={{ display: 'flex', gap: 8, paddingRight: 60, marginBottom: 8 }}>
        <input
          type="url"
          value={block.url}
          onChange={e => onChange({ ...block, url: e.target.value })}
          placeholder="YouTube or Vimeo URL"
          readOnly={isReordering}
          style={{
            flex: 1,
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
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || isReordering}
          style={{
            background: '#f3f4f6',
            border: '1px solid #e8e8e8',
            borderRadius: 6,
            padding: '8px 14px',
            fontFamily: font,
            fontSize: 13,
            cursor: uploading || isReordering ? 'default' : 'pointer',
            color: '#374151',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {uploading ? 'Uploading…' : 'Upload video'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* Playback toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, paddingRight: 60, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#6b7280', fontFamily: font, marginRight: 4 }}>Playback:</span>
        {(['auto', 'click'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => onChange({ ...block, playback: mode })}
            style={{
              padding: '4px 12px',
              borderRadius: 20,
              border: '1px solid #e8e8e8',
              background: playback === mode ? '#1a1a1a' : 'transparent',
              color: playback === mode ? '#fff' : '#6b7280',
              fontFamily: font,
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: playback === mode ? 500 : 400,
            }}
          >
            {mode === 'auto' ? 'Auto' : 'Click'}
          </button>
        ))}
      </div>

      {/* Preview */}
      {block.url && (
        <div style={{ marginBottom: 8 }}>
          {isEmbed ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden' }}>
              <iframe
                src={toEmbedUrl(block.url)}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              src={block.url}
              controls
              style={{ width: '100%', borderRadius: 8, display: 'block', maxHeight: 300 }}
            />
          )}
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
