'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface LinkDialogResult {
  url: string
  preview?: { image: string; title: string; subtitle: string }
}

interface Props {
  open: boolean
  onConfirm: (result: LinkDialogResult) => void
  onCancel: () => void
}

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

const fieldStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #e8e8e8',
  borderRadius: 6,
  padding: '8px 10px',
  fontSize: 13,
  fontFamily: font,
  outline: 'none',
  color: '#1a1a1a',
  background: '#fff',
  boxSizing: 'border-box',
}

export function LinkDialog({ open, onConfirm, onCancel }: Props) {
  const [url, setUrl] = useState('')
  const [smart, setSmart] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const urlRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUrl('')
      setSmart(false)
      setImage('')
      setTitle('')
      setDescription('')
      setTimeout(() => urlRef.current?.focus(), 30)
    }
  }, [open])

  function confirm() {
    if (!url.trim()) return
    const result: LinkDialogResult = { url: url.trim() }
    if (smart && image.trim() && title.trim() && description.trim()) {
      result.preview = {
        image: image.trim(),
        title: title.trim(),
        subtitle: description.trim(),
      }
    }
    onConfirm(result)
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); confirm() }
    if (e.key === 'Escape') onCancel()
  }

  if (!open || typeof window === 'undefined') return null

  const canInsert = !!url.trim()
  const smartComplete = image.trim() && title.trim() && description.trim()

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseDown={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div
        style={{
          background: '#fff', borderRadius: 12, padding: 20, width: 340,
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', gap: 14,
          fontFamily: font,
        }}
        onKeyDown={onKey}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Insert link</div>

        {/* URL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: 11, fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>URL</label>
          <input
            ref={urlRef}
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com"
            style={fieldStyle}
          />
        </div>

        {/* Smart hover card toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={smart}
            onChange={e => setSmart(e.target.checked)}
            style={{ width: 14, height: 14, accentColor: '#1a1a1a', cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Smart hover card</span>
        </label>

        {/* Preview fields */}
        {smart && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: 12, background: '#f9f9f9', borderRadius: 8,
            border: '1px solid #f0f0f0',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Photo path</label>
              <input
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="/images/people/name.jpg"
                style={fieldStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Parsa Ghaffari"
                style={fieldStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Description</label>
              <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Ex CEO of Alien, specialist in founding startups"
                style={fieldStyle}
              />
            </div>
            {smart && !smartComplete && (
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Fill all three fields to enable the hover card.</div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 2 }}>
          <button
            onClick={onCancel}
            style={{
              border: '1px solid #e8e8e8', background: 'none', borderRadius: 6,
              padding: '6px 14px', fontSize: 13, cursor: 'pointer', color: '#6b7280', fontFamily: font,
            }}
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={!canInsert}
            style={{
              background: canInsert ? '#1a1a1a' : '#e5e7eb',
              color: canInsert ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: 6, padding: '6px 14px',
              fontSize: 13, fontWeight: 500, fontFamily: font,
              cursor: canInsert ? 'pointer' : 'not-allowed',
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
