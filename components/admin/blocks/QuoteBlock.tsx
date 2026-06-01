'use client'

import { useRef, useState, useEffect } from 'react'
import { QuoteBlock as QuoteBlockType } from '@/types/project'
import { LinkDialog, LinkDialogResult, LinkDialogInitialData } from '@/components/admin/LinkDialog'
import { RichTextDisplay } from '@/components/admin/RichTextDisplay'
import { LinkToken } from '@/lib/parseTokens'

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

interface Props {
  block: QuoteBlockType
  onChange: (b: QuoteBlockType) => void
  onDelete: () => void
  isReordering: boolean
  dragHandleProps?: Record<string, unknown>
}

export default function QuoteBlock({ block, onChange, onDelete, isReordering, dragHandleProps }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editing, setEditing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogInitialData, setDialogInitialData] = useState<LinkDialogInitialData | undefined>()
  const [pendingToken, setPendingToken] = useState<LinkToken | null>(null)
  const [savedSel, setSavedSel] = useState<{ start: number; end: number; value: string } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isDialogOpenRef = useRef(false)

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  useEffect(() => { if (editing) autoResize() }, [editing, block.content])

  function enterEditMode() {
    setEditing(true)
    requestAnimationFrame(() => { textareaRef.current?.focus(); autoResize() })
  }

  function openDialog(initialData?: LinkDialogInitialData, token?: LinkToken) {
    isDialogOpenRef.current = true
    setDialogInitialData(initialData)
    setPendingToken(token ?? null)
    setDialogOpen(true)
  }

  function closeDialog() {
    isDialogOpenRef.current = false
    setDialogOpen(false)
    setDialogInitialData(undefined)
    setPendingToken(null)
    setSavedSel(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      const el = textareaRef.current
      if (!el) return
      setSavedSel({ start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0, value: el.value })
      openDialog()
    }
  }

  function handleLinkInsert(result: LinkDialogResult) {
    let urlPart = result.url
    if (result.preview) {
      const { image, title, subtitle } = result.preview
      urlPart = `${result.url}||${image}||${title}||${subtitle}`
    }

    if (pendingToken) {
      const newMarkdown = `[${pendingToken.text}](${urlPart})`
      onChange({ ...block, content: block.content.replace(pendingToken.raw, newMarkdown) })
    } else if (savedSel) {
      const { start, end, value } = savedSel
      const selected = value.slice(start, end)
      const insertion = selected ? `[${selected}](${urlPart})` : `[link](${urlPart})`
      const next = value.slice(0, start) + insertion + value.slice(end)
      onChange({ ...block, content: next })
      setEditing(true)
      requestAnimationFrame(() => {
        textareaRef.current?.focus()
        textareaRef.current?.setSelectionRange(start + insertion.length, start + insertion.length)
      })
    }
    closeDialog()
  }

  function handleRemoveLink() {
    if (pendingToken) {
      onChange({ ...block, content: block.content.replace(pendingToken.raw, pendingToken.text) })
    }
    closeDialog()
  }

  function handleBlur() {
    if (!isDialogOpenRef.current) setEditing(false)
  }

  return (
    <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16, position: 'relative', fontFamily: font, backgroundColor: '#fff' }}>
      {/* Top-right controls */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
        <button {...dragHandleProps} style={{ cursor: isReordering ? 'grab' : 'default', background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1 }}>☰</button>
        <button onClick={() => setConfirmDelete(true)} style={{ background: 'none', border: 'none', color: '#999', fontSize: 14, padding: '2px 4px', lineHeight: 1, cursor: 'pointer' }}>✕</button>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div style={{ marginBottom: 10, padding: '8px 12px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 6, fontSize: 13, color: '#dc2626', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>Delete this block?</span>
          <button onClick={() => { onDelete(); setConfirmDelete(false) }} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Yes</button>
          <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: '1px solid #dc2626', color: '#dc2626', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
        </div>
      )}

      <LinkDialog
        open={dialogOpen}
        initialData={dialogInitialData}
        onConfirm={handleLinkInsert}
        onCancel={closeDialog}
        onRemove={pendingToken ? handleRemoveLink : undefined}
      />

      {/* Quote fields */}
      <div style={{ paddingRight: 60 }}>
        {/* Display mode */}
        {!editing && !isReordering && (
          <RichTextDisplay
            content={block.content}
            placeholder="Quote content..."
            onClickText={enterEditMode}
            onClickLink={token => openDialog({ url: token.url, preview: token.preview }, token)}
            style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.6, color: '#1a1a1a', minHeight: 60 }}
          />
        )}

        {/* Edit mode textarea */}
        <textarea
          ref={textareaRef}
          value={block.content}
          readOnly={isReordering}
          onChange={e => onChange({ ...block, content: e.target.value })}
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Quote content..."
          style={{
            display: editing || isReordering ? 'block' : 'none',
            width: '100%', border: 'none', outline: 'none', resize: 'none',
            fontSize: 15, fontFamily: font, fontStyle: 'italic', lineHeight: 1.6,
            color: '#1a1a1a', background: 'transparent', minHeight: 60,
            overflow: 'hidden', boxSizing: 'border-box',
          }}
        />

        <input
          type="text"
          value={block.attribution ?? ''}
          onChange={e => onChange({ ...block, attribution: e.target.value })}
          placeholder="— Attribution"
          readOnly={isReordering}
          style={{
            width: '100%', border: 'none', outline: 'none', fontSize: 13,
            fontFamily: font, color: '#6b7280', padding: '4px 0',
            background: 'transparent', boxSizing: 'border-box', marginTop: 4,
          }}
        />
      </div>
    </div>
  )
}
