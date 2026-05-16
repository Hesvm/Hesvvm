'use client'

import { useState, useEffect, useRef, use } from 'react'
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

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProjectEditorPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()

  const [project, setProject] = useState<Partial<Project>>({
    title: '',
    slug: '',
    subtitle: '',
    thumbnail_url: null,
    status: 'draft',
    blocks: [],
  })
  const [isReordering, setIsReordering] = useState(false)
  const [slugManual, setSlugManual] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [navBtn, setNavBtn] = useState<'save' | 'deploy'>('save')
  const [navBtnLoading, setNavBtnLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectRef = useRef(project)
  projectRef.current = project
  const isNewRef = useRef(id === 'new')
  const currentIdRef = useRef(id)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (id === 'new') return
    fetch(`/api/admin/projects/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setProject(data as Project)
          setSlugManual(true)
          setNavBtn('deploy')
        }
      })
  }, [id])

  function updateProject(patch: Partial<Project>) {
    setProject(prev => {
      const next = { ...prev, ...patch }
      scheduleAutosave(next)
      return next
    })
  }

  function scheduleAutosave(data: Partial<Project>) {
    if (isNewRef.current) return
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
    setNavBtnLoading(true)
    try {
      const data = { ...projectRef.current, status: 'draft' as const }
      if (isNewRef.current) {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const inserted = await res.json() as Project & { error?: string }
        if (inserted.error) throw new Error(inserted.error)
        isNewRef.current = false
        currentIdRef.current = inserted.id
        setProject(inserted)
        router.replace(`/admin/projects/${inserted.id}`)
      } else {
        const res = await fetch(`/api/admin/projects/${currentIdRef.current}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const result = await res.json() as { error?: string }
        if (result.error) throw new Error(result.error)
        setProject(p => ({ ...p, status: 'draft' }))
      }
      setNavBtn('deploy')
    } catch { /* no-op */ }
    setNavBtnLoading(false)
  }

  async function handleDeploy() {
    setNavBtnLoading(true)
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
      }
    } catch { /* no-op */ }
    setNavBtnLoading(false)
  }

  function insertBlock(type: BlockType) {
    const blockId = crypto.randomUUID()
    let newBlock: ContentBlock

    switch (type) {
      case 'text':
        newBlock = { id: blockId, type: 'text', content: '' }
        break
      case 'title':
        newBlock = { id: blockId, type: 'title', content: '' }
        break
      case 'image':
        newBlock = { id: blockId, type: 'image', src: '' }
        break
      case 'image-pair':
        newBlock = { id: blockId, type: 'image-pair', left: { src: '' }, right: { src: '' } }
        break
      case 'divider':
        newBlock = { id: blockId, type: 'divider', variant: (Math.ceil(Math.random() * 5)) as 1 | 2 | 3 | 4 | 5 }
        break
      case 'link':
        newBlock = { id: blockId, type: 'link', url: '', label: '' }
        break
      case 'video':
        newBlock = { id: blockId, type: 'video', url: '' }
        break
      case 'quote':
        newBlock = { id: blockId, type: 'quote', content: '' }
        break
    }

    const blocks = project.blocks ?? []
    updateProject({ blocks: [...blocks, newBlock] })
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
      const data = await res.json() as { url: string }
      updateProject({ thumbnail_url: data.url })
    } finally {
      setThumbnailUploading(false)
    }
  }

  const slug = project.slug ?? ''

  const navbarActions = (
    <button
      onClick={navBtn === 'save' ? handleSave : handleDeploy}
      disabled={navBtnLoading}
      style={{
        fontSize: 12,
        fontFamily: font,
        fontWeight: 500,
        color: navBtnLoading ? '#aaa' : '#fff',
        background: navBtnLoading ? '#ccc' : '#1a1a1a',
        border: 'none',
        borderRadius: 6,
        padding: '5px 12px',
        cursor: navBtnLoading ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {navBtnLoading ? '…' : navBtn === 'save' ? 'Save draft' : 'Deploy'}
    </button>
  )

  return (
    <div style={{ fontFamily: font }}>
      {mounted && document.getElementById('navbar-actions') &&
        createPortal(navbarActions, document.getElementById('navbar-actions')!)}

      <div style={{ display: 'flex', height: 'calc(100vh - 48px)' }}>
        {/* LEFT PANEL */}
        <div style={{
          width: 320,
          borderRight: '1px solid #e8e8e8',
          overflowY: 'auto',
          padding: 24,
          flexShrink: 0,
        }}>
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
                  <span style={{ background: '#f0f0f0', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 400, marginLeft: 4 }}>
                    auto
                  </span>
                )}
              </label>
              <input
                type="text"
                value={slug}
                onChange={e => {
                  setSlugManual(true)
                  updateProject({ slug: e.target.value })
                }}
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
                  <img
                    src={project.thumbnail_url}
                    alt="Thumbnail"
                    style={{ width: '100%', borderRadius: 6, objectFit: 'cover', display: 'block', marginBottom: 6 }}
                  />
                </div>
              )}
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <div style={{
                  border: '1px dashed #d1d5db',
                  borderRadius: 6,
                  padding: '10px 12px',
                  fontSize: 13,
                  color: '#6b7280',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}>
                  {thumbnailUploading ? 'Uploading...' : project.thumbnail_url ? 'Replace thumbnail' : 'Upload thumbnail'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) void handleThumbnailUpload(file)
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
          <div style={{ maxWidth: 530, margin: '0 auto', padding: '32px 24px' }}>
            {(project.blocks ?? []).length === 0 ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                color: '#9ca3af',
                fontSize: 14,
                fontFamily: font,
                border: '2px dashed #e8e8e8',
                borderRadius: 12,
              }}>
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
