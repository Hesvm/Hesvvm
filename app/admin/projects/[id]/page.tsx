'use client'

import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [isReordering, setIsReordering] = useState(false)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [slugManual, setSlugManual] = useState(false)
  const [deployToast, setDeployToast] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectRef = useRef(project)
  projectRef.current = project
  const isNewRef = useRef(id === 'new')
  const currentIdRef = useRef(id)

  // Fetch existing project
  useEffect(() => {
    if (id === 'new') return
    supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProject(data as Project)
          setSlugManual(true)
        }
      })
  }, [id])

  function updateProject(patch: Partial<Project>) {
    setProject(prev => {
      const next = { ...prev, ...patch }
      scheduleSave(next)
      return next
    })
  }

  function scheduleSave(data: Partial<Project>) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      void save(data)
    }, 1500)
  }

  async function save(data: Partial<Project>) {
    setSaveStatus('saving')
    try {
      if (isNewRef.current) {
        const { data: inserted, error } = await supabase
          .from('projects')
          .insert(data)
          .select()
          .single()
        if (error) throw error
        if (inserted) {
          isNewRef.current = false
          currentIdRef.current = (inserted as Project).id
          router.replace(`/admin/projects/${(inserted as Project).id}`)
        }
      } else {
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', currentIdRef.current)
        if (error) throw error
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('error')
    }
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
        newBlock = {
          id: blockId,
          type: 'image-pair',
          left: { src: '' },
          right: { src: '' },
        }
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
    const insertAfterIndex = selectedBlockId
      ? blocks.findIndex(b => b.id === selectedBlockId)
      : blocks.length - 1
    const newBlocks = [...blocks]
    newBlocks.splice(insertAfterIndex + 1, 0, newBlock)
    updateProject({ blocks: newBlocks })
  }

  async function handleDeploy() {
    await supabase.from('projects').update({ status: 'published' }).eq('id', currentIdRef.current)
    updateProject({ status: 'published' })
    if (process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL) {
      await fetch(process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL, { method: 'POST' })
    }
    setDeployToast(true)
    setTimeout(() => setDeployToast(false), 3000)
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
  const status = project.status ?? 'draft'

  return (
    <div style={{ fontFamily: font }}>
      {/* Deploy toast */}
      {deployToast && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a1a',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: font,
          zIndex: 500,
        }}>
          Deploy triggered ✓
        </div>
      )}

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
            {/* Title */}
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

            {/* Slug */}
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

            {/* Subtitle */}
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

            {/* Status */}
            <div>
              <label style={labelStyle()}>Status</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['draft', 'published'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => updateProject({ status: s })}
                    style={{
                      flex: 1,
                      padding: '7px 0',
                      border: '1px solid #e8e8e8',
                      borderRadius: 6,
                      background: status === s ? '#1a1a1a' : '#fafafa',
                      color: status === s ? '#fff' : '#6b7280',
                      fontSize: 13,
                      fontFamily: font,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbnail */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail_url}
                    alt="Thumbnail preview"
                    style={{ width: 120, height: 80, borderRadius: 4, objectFit: 'cover', display: 'block' }}
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
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                slug={slug}
              />
            )}
          </div>
        </div>
      </div>

      <FloatingBar
        saveStatus={saveStatus}
        projectSlug={slug}
        projectStatus={status}
        onInsertBlock={insertBlock}
        onToggleReorder={() => setIsReordering(r => !r)}
        isReordering={isReordering}
        onDeploy={handleDeploy}
        onStatusChange={s => updateProject({ status: s })}
      />
    </div>
  )
}
