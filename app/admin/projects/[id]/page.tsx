'use client'

import { useState, useEffect, useRef, use, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Project, ContentBlock, BlockType } from '@/types/project'
import BlockEditor from '@/components/admin/BlockEditor'
import FloatingBar from '@/components/admin/FloatingBar'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

function toSlug(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function labelStyle(): React.CSSProperties {
  return {
    display: 'block',
    fontSize: 11,
    fontFamily: font,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 4,
  }
}

function inputStyle(extraStyle?: React.CSSProperties): React.CSSProperties {
  return {
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
    ...extraStyle,
  }
}

type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProjectEditorPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()

  const [project, setProject] = useState<Partial<Project>>({
    title: '', slug: '', subtitle: '', thumbnail_url: null, status: 'draft', blocks: [],
  })
  const [isNew, setIsNew] = useState(id === 'new')
  const [isReordering, setIsReordering] = useState(false)
  const [slugManual, setSlugManual] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [ogUploading, setOgUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const toastCounter = useRef(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectRef = useRef(project)
  projectRef.current = project
  const currentIdRef = useRef(id === 'new' ? '' : id)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (id === 'new') return
    fetch(`/api/admin/projects/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setProject(data as Project)
          setSlugManual(true)
          setIsNew(false)
        }
      })
  }, [id])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const toastId = ++toastCounter.current
    setToasts(prev => [...prev, { id: toastId, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3500)
  }, [])

  function updateProject(patch: Partial<Project>) {
    setProject(prev => {
      const next = { ...prev, ...patch }
      scheduleAutosave(next)
      return next
    })
  }

  function scheduleAutosave(data: Partial<Project>) {
    if (!currentIdRef.current) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => { void silentSave(data) }, 2000)
  }

  async function silentSave(data: Partial<Project>) {
    try {
      await fetch(`/api/admin/projects/${currentIdRef.current}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch { /* silent */ }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const data = { ...projectRef.current, status: 'draft' as const }
      if (!currentIdRef.current) {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const inserted = await res.json() as Project & { error?: string }
        if (inserted.error) throw new Error(inserted.error)
        currentIdRef.current = inserted.id
        setProject(inserted)
        setIsNew(false)
        router.replace(`/admin/projects/${inserted.id}`)
        addToast('Saved as draft', 'success')
      } else {
        const res = await fetch(`/api/admin/projects/${currentIdRef.current}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const result = await res.json() as { error?: string }
        if (result.error) throw new Error(result.error)
        setProject(p => ({ ...p, status: 'draft' }))
        addToast('Saved as draft', 'success')
      }
    } catch (err) {
      addToast((err as Error).message || 'Save failed', 'error')
    }
    setSaving(false)
  }

  async function handleDeploy() {
    setDeploying(true)
    try {
      const data = { ...projectRef.current, status: 'published' as const }
      const res = await fetch(`/api/admin/projects/${currentIdRef.current}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json() as { error?: string }
      if (result.error) throw new Error(result.error)
      setProject(p => ({ ...p, status: 'published' }))
      if (process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL) {
        await fetch(process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL, { method: 'POST' })
        addToast('Deployed — Vercel build triggered', 'success')
      } else {
        addToast('Published', 'success')
      }
    } catch (err) {
      addToast((err as Error).message || 'Deploy failed', 'error')
    }
    setDeploying(false)
  }

  function insertBlock(type: BlockType) {
    const blockId = crypto.randomUUID()
    let newBlock: ContentBlock

    switch (type) {
      case 'text': newBlock = { id: blockId, type: 'text', content: '' }; break
      case 'title': newBlock = { id: blockId, type: 'title', content: '' }; break
      case 'image': newBlock = { id: blockId, type: 'image', src: '' }; break
      case 'image-pair': newBlock = { id: blockId, type: 'image-pair', left: { src: '' }, right: { src: '' } }; break
      case 'divider': newBlock = { id: blockId, type: 'divider', variant: (Math.ceil(Math.random() * 5)) as 1|2|3|4|5 }; break
      case 'link': newBlock = { id: blockId, type: 'link', url: '', label: '' }; break
      case 'video': newBlock = { id: blockId, type: 'video', url: '' }; break
      case 'quote': newBlock = { id: blockId, type: 'quote', content: '' }; break
    }

    updateProject({ blocks: [...(project.blocks ?? []), newBlock] })
  }

  async function handleThumbnailUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `thumbnails/${project.slug ?? 'project'}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setThumbnailUploading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url?: string; error?: string }
      if (data.error) throw new Error(data.error)
      updateProject({ thumbnail_url: data.url! })
      addToast('Thumbnail uploaded', 'success')
    } catch (err) {
      addToast((err as Error).message || 'Upload failed', 'error')
    }
    setThumbnailUploading(false)
  }

  async function handleOgUpload(file: File) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `og/${project.slug ?? 'project'}-${Date.now()}.${ext}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)
    setOgUploading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json() as { url?: string; error?: string }
      if (data.error) throw new Error(data.error)
      updateProject({ og_image_url: data.url! })
      addToast('OG image uploaded', 'success')
    } catch (err) {
      addToast((err as Error).message || 'Upload failed', 'error')
    }
    setOgUploading(false)
  }

  const slug = project.slug ?? ''

  const navbarActions = mounted && document.getElementById('navbar-actions')
    ? createPortal(
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              fontSize: 12, fontFamily: font, fontWeight: 500,
              color: '#555', background: '#f0f0f0',
              border: 'none', borderRadius: 6, padding: '5px 12px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button
            onClick={handleDeploy}
            disabled={isNew || deploying}
            style={{
              fontSize: 12, fontFamily: font, fontWeight: 500,
              color: '#fff', background: (isNew || deploying) ? '#aaa' : '#1a1a1a',
              border: 'none', borderRadius: 6, padding: '5px 12px',
              cursor: (isNew || deploying) ? 'not-allowed' : 'pointer',
            }}
            title={isNew ? 'Save draft first' : 'Publish and trigger Vercel deploy'}
          >
            {deploying ? 'Deploying…' : 'Deploy'}
          </button>
        </div>,
        document.getElementById('navbar-actions')!
      )
    : null

  return (
    <div style={{ fontFamily: font }}>
      {navbarActions}

      {/* Toasts */}
      <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '10px 18px',
            borderRadius: 8,
            fontSize: 13,
            fontFamily: font,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            background: t.type === 'success' ? '#111' : t.type === 'error' ? '#dc2626' : '#555',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>
            {t.message}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 48px)' }}>
        {/* LEFT PANEL */}
        <div style={{ width: 320, borderRight: '1px solid #e8e8e8', overflowY: 'auto', padding: 24, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle()}>Title</label>
              <input
                type="text"
                value={project.title ?? ''}
                onChange={e => {
                  const title = e.target.value
                  const patch: Partial<Project> = { title }
                  if (!slugManual) patch.slug = toSlug(title)
                  updateProject(patch)
                }}
                style={inputStyle({ fontSize: 18, fontWeight: 600 })}
                placeholder="Project title"
              />
            </div>

            <div>
              <label style={labelStyle()}>
                Slug{' '}
                {!slugManual && (
                  <span style={{ background: '#f0f0f0', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 400, marginLeft: 4 }}>auto</span>
                )}
              </label>
              <input
                type="text"
                value={slug}
                onChange={e => { setSlugManual(true); updateProject({ slug: e.target.value }) }}
                style={inputStyle({ fontFamily: 'monospace', fontSize: 12 })}
                placeholder="project-slug"
              />
            </div>

            <div>
              <label style={labelStyle()}>Subtitle</label>
              <input
                type="text"
                value={project.subtitle ?? ''}
                onChange={e => updateProject({ subtitle: e.target.value })}
                style={inputStyle()}
                placeholder="e.g. Product Design · 2024"
              />
            </div>

            <div>
              <label style={labelStyle()}>Thumbnail</label>
              {project.thumbnail_url && (
                <div style={{ marginBottom: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.thumbnail_url} alt="Thumbnail" style={{ width: '100%', borderRadius: 6, objectFit: 'cover', display: 'block', marginBottom: 6 }} />
                </div>
              )}
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <div style={{ border: '1px dashed #d1d5db', borderRadius: 6, padding: '10px 12px', fontSize: 13, color: '#6b7280', textAlign: 'center', cursor: 'pointer' }}>
                  {thumbnailUploading ? 'Uploading…' : project.thumbnail_url ? 'Replace thumbnail' : 'Upload thumbnail'}
                </div>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void handleThumbnailUpload(f) }} />
              </label>
            </div>

            <div>
              <label style={labelStyle()}>OG Image <span style={{ textTransform: 'none', fontSize: 10, color: '#bbb', marginLeft: 2 }}>for social sharing</span></label>
              {project.og_image_url && (
                <div style={{ marginBottom: 8, position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.og_image_url} alt="OG" style={{ width: '100%', aspectRatio: '1200/630', objectFit: 'cover', borderRadius: 6, display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 3 }}>1200×630</div>
                </div>
              )}
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <div style={{ border: '1px dashed #d1d5db', borderRadius: 6, padding: '10px 12px', fontSize: 13, color: '#6b7280', textAlign: 'center', cursor: 'pointer' }}>
                  {ogUploading ? 'Uploading…' : project.og_image_url ? 'Replace OG image' : 'Upload OG image'}
                </div>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void handleOgUpload(f) }} />
              </label>
              <p style={{ fontSize: 10, color: '#bbb', margin: '4px 0 0', fontFamily: font }}>Recommended: 1200×630px</p>
            </div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
          <div style={{ maxWidth: 530, margin: '0 auto', padding: '32px 24px' }}>
            {(project.blocks ?? []).length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: '#9ca3af', fontSize: 14, fontFamily: font, border: '2px dashed #e8e8e8', borderRadius: 12 }}>
                Use the + button below to add content blocks
              </div>
            ) : (
              <BlockEditor
                blocks={project.blocks ?? []}
                onChange={blocks => updateProject({ blocks })}
                isReordering={isReordering}
                selectedBlockId={null}
                onSelectBlock={() => {}}
                slug={slug}
              />
            )}
          </div>
        </div>
      </div>

      <FloatingBar
        projectSlug={slug}
        onInsertBlock={insertBlock}
        onToggleReorder={() => setIsReordering(r => !r)}
        isReordering={isReordering}
      />
    </div>
  )
}
