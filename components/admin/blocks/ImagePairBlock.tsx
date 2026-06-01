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
  const [errorLeft, setErrorLeft] = useState<string | null>(null)
  const [errorRight, setErrorRight] = useState<string | null>(null)

  // 4 separate inputs — combined accept="image/*,video/*" grays out .mov/.mp4 on macOS
  const leftImageRef = useRef<HTMLInputElement>(null)
  const leftVideoRef = useRef<HTMLInputElement>(null)
  const rightImageRef = useRef<HTMLInputElement>(null)
  const rightVideoRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File, side: Side, forcedMediaType: 'image' | 'video') {
    const ext = file.name.split('.').pop() ?? 'bin'
    const isVideo = forcedMediaType === 'video'
    const path = `blocks/${slug}-${Date.now()}-${side}.${ext}`

    const setUploading = side === 'left' ? setUploadingLeft : setUploadingRight
    const setError = side === 'left' ? setErrorLeft : setErrorRight

    setUploading(true)
    setError(null)

    try {
      if (isVideo) {
        // Videos upload directly to Supabase via signed URL — bypasses Next.js body size limit
        const res = await fetch('/api/admin/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        })
        const urlData = await res.json() as { signedUrl?: string; publicUrl?: string; error?: string }
        if (!res.ok || !urlData.signedUrl) throw new Error(urlData.error ?? 'Failed to get upload URL')

        const uploadRes = await fetch(urlData.signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'video/mp4' },
          body: file,
        })
        if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.statusText}`)

        onChange({ ...block, [side]: { ...block[side], src: urlData.publicUrl!, mediaType: 'video' } })
      } else {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', path)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const data = await res.json() as { url?: string; error?: string }
        if (!res.ok || !data.url) throw new Error(data.error ?? 'Upload failed')
        onChange({ ...block, [side]: { ...block[side], src: data.url, mediaType: 'image' } })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleSwap() {
    onChange({ ...block, left: block.right, right: block.left })
  }

  function renderSide(side: Side) {
    const col = block[side]
    const hovering = side === 'left' ? hoverLeft : hoverRight
    const uploading = side === 'left' ? uploadingLeft : uploadingRight
    const error = side === 'left' ? errorLeft : errorRight
    const setError = side === 'left' ? setErrorLeft : setErrorRight
    const imageRef = side === 'left' ? leftImageRef : rightImageRef
    const videoRef = side === 'left' ? leftVideoRef : rightVideoRef
    const setHovering = side === 'left' ? setHoverLeft : setHoverRight
    const isVideo = col.mediaType === 'video'

    const slotBtnStyle: React.CSSProperties = {
      border: '1px solid #d1d5db',
      borderRadius: 6,
      padding: '6px 14px',
      fontFamily: font,
      fontSize: 12,
      cursor: isReordering ? 'default' : 'pointer',
      background: '#fafafa',
      color: '#374151',
    }

    const overlayBtnStyle: React.CSSProperties = {
      background: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '6px 14px',
      fontFamily: font,
      fontSize: 12,
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
    }

    return (
      <div style={{ flex: 1 }}>
        {col.src ? (
          <div
            style={{ position: 'relative', marginBottom: 8 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {isVideo ? (
              <video
                src={col.src}
                style={{ width: '100%', maxHeight: 280, borderRadius: 6, display: 'block', backgroundColor: '#000' }}
                controls
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={col.src}
                alt={col.alt ?? ''}
                style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 6, display: 'block' }}
              />
            )}
            {hovering && !isReordering && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
                {uploading ? (
                  <span style={{ ...overlayBtnStyle, color: '#555' }}>Uploading...</span>
                ) : (
                  <>
                    <button onClick={() => imageRef.current?.click()} style={overlayBtnStyle}>📷 Image</button>
                    <button onClick={() => videoRef.current?.click()} style={overlayBtnStyle}>🎬 Video</button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            border: '2px dashed #d1d5db',
            borderRadius: 8,
            minHeight: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 8,
          }}>
            {uploading ? (
              <span style={{ color: '#9ca3af', fontSize: 13 }}>Uploading...</span>
            ) : (
              <>
                <span style={{ color: '#9ca3af', fontSize: 12 }}>Choose type:</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button disabled={isReordering} onClick={() => !isReordering && imageRef.current?.click()} style={slotBtnStyle}>
                    📷 Image
                  </button>
                  <button disabled={isReordering} onClick={() => !isReordering && videoRef.current?.click()} style={slotBtnStyle}>
                    🎬 Video
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* image input — filtered to images only */}
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file, side, 'image')
            e.target.value = ''
          }}
        />
        {/* video input — NO accept filter, macOS grays out .mov/.mp4 with video/* */}
        <input
          ref={videoRef}
          type="file"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file, side, 'video')
            e.target.value = ''
          }}
        />

        {error && (
          <div
            onClick={() => setError(null)}
            style={{
              marginBottom: 6,
              padding: '5px 10px',
              background: '#fff5f5',
              border: '1px solid #fecaca',
              borderRadius: 6,
              fontSize: 11,
              color: '#dc2626',
              cursor: 'pointer',
              lineHeight: 1.4,
            }}
            title="Click to dismiss"
          >
            ⚠ {error}
          </div>
        )}

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

      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        {renderSide('left')}

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
            title="Swap"
          >
            ⇄
          </button>
        </div>

        {renderSide('right')}
      </div>
    </div>
  )
}
