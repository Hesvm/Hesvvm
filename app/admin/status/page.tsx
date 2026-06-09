'use client'

import { useEffect, useMemo, useState } from 'react'
import { StatusBubble } from '@/components/StatusBubble'
import type { Status, StatusType } from '@/types/status'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
const statusTypes: StatusType[] = ['song', 'movie', 'game', 'book', 'manual']

type StatusForm = {
  id?: string
  type: StatusType
  title: string
  subtitle: string
  link: string
  photo: string
  isActive: boolean
}

const emptyForm: StatusForm = {
  type: 'song',
  title: '',
  subtitle: '',
  link: '',
  photo: '',
  isActive: false,
}

type TypeConfig = {
  titleLabel: string
  titlePlaceholder: string
  photoLabel: string
  photoPlaceholder: string
  linkLabel: string
  linkPlaceholder: string
  subtitleLabel?: string
  subtitlePlaceholder?: string
}

const TYPE_CONFIG: Record<StatusType, TypeConfig> = {
  song: {
    titleLabel: 'Song title',
    titlePlaceholder: 'e.g. Count Me Out',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Album cover URL',
    linkLabel: 'Song link',
    linkPlaceholder: 'Spotify / Apple Music / YouTube link',
  },
  movie: {
    titleLabel: 'Movie title',
    titlePlaceholder: 'e.g. Dune: Part Two',
    photoLabel: 'Poster photo',
    photoPlaceholder: 'Poster image URL',
    linkLabel: 'Movie link',
    linkPlaceholder: 'Letterboxd / IMDb / trailer link',
  },
  game: {
    titleLabel: 'Game title',
    titlePlaceholder: 'e.g. Death Stranding 2',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Game cover URL',
    linkLabel: 'Game link',
    linkPlaceholder: 'Steam / PlayStation / website link',
  },
  book: {
    titleLabel: 'Book title',
    titlePlaceholder: 'e.g. ZAG',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Book cover URL',
    linkLabel: 'Book link',
    linkPlaceholder: 'Goodreads / Amazon / publisher link',
  },
  manual: {
    titleLabel: 'Title',
    titlePlaceholder: 'e.g. Building tiny AI apps',
    subtitleLabel: 'Subtitle',
    subtitlePlaceholder: 'e.g. Current focus',
    photoLabel: 'Photo',
    photoPlaceholder: 'Image URL',
    linkLabel: 'Link',
    linkPlaceholder: 'Optional related link',
  },
}

function labelStyle(): React.CSSProperties {
  return {
    display: 'block',
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: 4,
  }
}

function inputStyle(disabled = false): React.CSSProperties {
  return {
    width: '100%',
    border: '1px solid #e8e8e8',
    borderRadius: 6,
    outline: 'none',
    fontSize: 13,
    fontFamily: font,
    color: disabled ? '#aaa' : '#1a1a1a',
    padding: '8px 10px',
    background: disabled ? '#f3f3f3' : '#fafafa',
    boxSizing: 'border-box',
  }
}

function statusToForm(status: Status): StatusForm {
  return {
    id: status.id,
    type: status.type,
    title: status.title,
    subtitle: status.subtitle ?? '',
    link: status.link ?? '',
    photo: status.photo ?? '',
    isActive: status.isActive,
  }
}

type FieldErrors = Partial<Record<'type' | 'title' | 'subtitle' | 'link' | 'photo', string>>

function validateFields(f: StatusForm): FieldErrors {
  const errors: FieldErrors = {}
  if (!f.type) errors.type = 'Type is required'
  if (!f.title.trim()) errors.title = `${TYPE_CONFIG[f.type]?.titleLabel ?? 'Title'} is required`
  if (!f.photo.trim()) errors.photo = `${TYPE_CONFIG[f.type]?.photoLabel ?? 'Photo'} is required`
  if (!f.link.trim()) errors.link = `${TYPE_CONFIG[f.type]?.linkLabel ?? 'Link'} is required`
  if (f.type === 'manual' && !f.subtitle.trim()) errors.subtitle = 'Subtitle is required for manual status'
  return errors
}

function fieldErrorStyle(): React.CSSProperties {
  return { fontSize: 11, color: '#9A4B42', margin: '4px 0 0' }
}

export default function AdminStatusPage() {
  const [statuses, setStatuses] = useState<Status[]>([])
  const [form, setForm] = useState<StatusForm>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [photoError, setPhotoError] = useState(false)

  const isEditing = Boolean(form.id)
  const activeStatus = useMemo(() => statuses.find(status => status.isActive), [statuses])
  const now = new Date().toISOString()
  const previewStatus: Status = {
    id: form.id ?? 'preview',
    type: form.type,
    title: form.title || 'Untitled status',
    subtitle: form.type === 'manual' ? form.subtitle || 'Current status' : undefined,
    link: form.link || undefined,
    photo: form.photo || undefined,
    isActive: form.isActive,
    createdAt: now,
    updatedAt: now,
  }

  useEffect(() => { void fetchStatuses() }, [])

  async function fetchStatuses() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/statuses')
    const data = await res.json() as Status[] | { error?: string }
    if (!res.ok || !Array.isArray(data)) {
      setError('Could not load statuses. Check that the statuses table migration has been run.')
      setStatuses([])
    } else {
      setStatuses(data)
    }
    setLoading(false)
  }

  function updateForm(patch: Partial<StatusForm>) {
    setError('')
    if ('photo' in patch) setPhotoError(false)
    const next = { ...form, ...patch }
    if (patch.type && patch.type !== 'manual') next.subtitle = ''
    setForm(next)
    if (touched.size > 0) setFieldErrors(validateFields(next))
  }

  function handleBlur(field: string) {
    setTouched(prev => new Set(prev).add(field))
    setFieldErrors(validateFields(form))
  }

  function resetFormState() {
    setForm(emptyForm)
    setTouched(new Set())
    setFieldErrors({})
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(new Set(['type', 'title', 'subtitle', 'link', 'photo']))
    const errors = validateFields(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSaving(true)
    setError('')
    const endpoint = form.id ? `/api/admin/statuses/${form.id}` : '/api/admin/statuses'
    const res = await fetch(endpoint, {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json() as Status | { error?: string }
    setSaving(false)

    if (!res.ok || 'error' in data) {
      setError(('error' in data && data.error) ? data.error : 'Save failed.')
      return
    }

    resetFormState()
    await fetchStatuses()
  }

  async function handleDelete(status: Status) {
    if (!confirm(`Delete "${status.title}"?`)) return
    const res = await fetch(`/api/admin/statuses/${status.id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Delete failed.')
      return
    }
    setStatuses(prev => prev.filter(item => item.id !== status.id))
    if (form.id === status.id) resetFormState()
  }

  async function handleSetActive(status: Status, isActive: boolean) {
    const res = await fetch(`/api/admin/statuses/${status.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...statusToForm(status), isActive }),
    })
    const data = await res.json() as Status | { error?: string }
    if (!res.ok || 'error' in data) {
      setError(('error' in data && data.error) ? data.error : 'Status update failed.')
      return
    }
    await fetchStatuses()
  }

  async function handlePhotoUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `statuses/${form.type}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setUploading(true)
    setError('')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json() as { url?: string; error?: string }
    setUploading(false)

    if (!res.ok || !data.url) {
      setError(data.error ?? 'Upload failed.')
      return
    }
    updateForm({ photo: data.url })
  }

  const cfg = TYPE_CONFIG[form.type]

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto', fontFamily: font }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Status</h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#888' }}>
            {activeStatus ? `Active: ${activeStatus.title}` : 'No active status'}
          </p>
        </div>
        <button
          onClick={resetFormState}
          style={{ fontSize: 13, padding: '8px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: font }}
        >
          Create Status
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 28, alignItems: 'start' }}>
        <section>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...Array(4)].map((_, i) => <div key={i} style={{ height: 64, background: '#f5f5f5', borderRadius: 6 }} />)}
            </div>
          ) : statuses.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14 }}>No statuses yet. Create your first one.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {statuses.map(status => (
                <article key={status.id} style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto', gap: 12, alignItems: 'center', padding: 12, border: '1px solid #eee', borderRadius: 8, background: status.isActive ? '#fbfaf7' : '#fff' }}>
                  {status.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={status.photo} alt="" style={{ width: 52, height: 52, objectFit: 'cover', display: 'block', borderRadius: 8, background: '#f1f1f1' }} />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: 8, background: '#f1f1f1' }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#777', textTransform: 'uppercase' }}>{status.type}</span>
                      {status.isActive
                        ? <span style={{ fontSize: 11, color: '#4F6B4E', background: '#EDF4EC', padding: '2px 7px', borderRadius: 99, fontWeight: 500 }}>Active</span>
                        : <span style={{ fontSize: 11, color: '#999', background: '#f3f3f3', padding: '2px 7px', borderRadius: 99 }}>Inactive</span>
                      }
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{status.title}</div>
                    <div style={{ fontSize: 12, color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{status.subtitle || status.link || 'No subtitle or link'}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => setForm(statusToForm(status))} style={{ fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#333', fontFamily: font }}>Edit</button>
                    <button onClick={() => handleSetActive(status, !status.isActive)} style={{ fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontFamily: font }}>
                      {status.isActive ? 'Deactivate' : 'Set active'}
                    </button>
                    <button onClick={() => handleDelete(status)} style={{ fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e', fontFamily: font }}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', borderRadius: 8, padding: 18, background: '#fff', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{isEditing ? 'Edit Status' : 'Create Status'}</h2>
          {error ? <div style={{ fontSize: 12, color: '#9A4B42', background: '#F6ECE9', borderRadius: 6, padding: '8px 10px' }}>{error}</div> : null}

          <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, background: '#fbfaf7', padding: '16px 14px 4px' }}>
            <div style={{ ...labelStyle(), marginBottom: 10 }}>Preview</div>
            <div className="statusStack" style={{ margin: '0 auto', height: 118 }}>
              <StatusBubble status={previewStatus} preview />
            </div>
          </div>

          <div>
            <label htmlFor="status-type" style={labelStyle()}>Type</label>
            <select id="status-type" value={form.type} onChange={e => updateForm({ type: e.target.value as StatusType })} onBlur={() => handleBlur('type')} style={inputStyle()}>
              {statusTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            {touched.has('type') && fieldErrors.type ? <p style={fieldErrorStyle()}>{fieldErrors.type}</p> : null}
          </div>

          <div>
            <label htmlFor="status-title" style={labelStyle()}>{cfg.titleLabel}</label>
            <input id="status-title" value={form.title} onChange={e => updateForm({ title: e.target.value })} onBlur={() => handleBlur('title')} style={inputStyle()} placeholder={cfg.titlePlaceholder} />
            {touched.has('title') && fieldErrors.title ? <p style={fieldErrorStyle()}>{fieldErrors.title}</p> : null}
          </div>

          {form.type === 'manual' ? (
            <div>
              <label htmlFor="status-subtitle" style={labelStyle()}>{cfg.subtitleLabel}</label>
              <input
                id="status-subtitle"
                value={form.subtitle}
                onChange={e => updateForm({ subtitle: e.target.value })}
                onBlur={() => handleBlur('subtitle')}
                style={inputStyle()}
                placeholder={cfg.subtitlePlaceholder}
              />
              {touched.has('subtitle') && fieldErrors.subtitle ? <p style={fieldErrorStyle()}>{fieldErrors.subtitle}</p> : null}
            </div>
          ) : null}

          <div>
            <label htmlFor="status-link" style={labelStyle()}>{cfg.linkLabel}</label>
            <input id="status-link" value={form.link} onChange={e => updateForm({ link: e.target.value })} onBlur={() => handleBlur('link')} style={inputStyle()} placeholder={cfg.linkPlaceholder} />
            {touched.has('link') && fieldErrors.link ? <p style={fieldErrorStyle()}>{fieldErrors.link}</p> : null}
          </div>

          <div>
            <label htmlFor="status-photo" style={labelStyle()}>{cfg.photoLabel}</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input id="status-photo" value={form.photo} onChange={e => updateForm({ photo: e.target.value })} onBlur={() => handleBlur('photo')} style={inputStyle()} placeholder={cfg.photoPlaceholder} />
              <label style={{ fontSize: 12, padding: '8px 10px', background: '#f3f3f3', borderRadius: 6, color: uploading ? '#aaa' : '#555', whiteSpace: 'nowrap', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" disabled={uploading} onChange={e => e.target.files?.[0] && void handlePhotoUpload(e.target.files[0])} style={{ display: 'none' }} />
              </label>
              {form.photo && !photoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.photo}
                  alt="Photo preview"
                  onError={() => setPhotoError(true)}
                  style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '1px solid #e8e8e8' }}
                />
              ) : null}
            </div>
            {touched.has('photo') && fieldErrors.photo ? <p style={fieldErrorStyle()}>{fieldErrors.photo}</p> : null}
          </div>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#555' }}>
            <input id="status-active" type="checkbox" checked={form.isActive} onChange={e => updateForm({ isActive: e.target.checked })} />
            Active on public site
          </label>

          <button disabled={saving} type="submit" style={{ fontSize: 13, padding: '9px 14px', background: saving ? '#aaa' : '#111', color: '#fff', border: 'none', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: font }}>
            {saving ? 'Saving...' : isEditing ? 'Save Status' : 'Create Status'}
          </button>
        </form>
      </div>
    </div>
  )
}
