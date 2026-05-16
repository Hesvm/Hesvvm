import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Project, ImageBlock, ImagePairBlock } from '@/types/project'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: project } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const p = project as Project
  const imagePaths: string[] = []

  if (p.thumbnail_url) {
    const path = extractStoragePath(p.thumbnail_url)
    if (path) imagePaths.push(path)
  }

  for (const block of p.blocks) {
    if (block.type === 'image') {
      const path = extractStoragePath((block as ImageBlock).src)
      if (path) imagePaths.push(path)
    }
    if (block.type === 'image-pair') {
      const b = block as ImagePairBlock
      const left = extractStoragePath(b.left.src)
      const right = extractStoragePath(b.right.src)
      if (left) imagePaths.push(left)
      if (right) imagePaths.push(right)
    }
  }

  if (imagePaths.length > 0) {
    await supabaseAdmin.storage.from('portfolio-images').remove(imagePaths)
  }

  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function extractStoragePath(url: string): string | null {
  try {
    const marker = '/portfolio-images/'
    const idx = url.indexOf(marker)
    if (idx === -1) return null
    return url.slice(idx + marker.length)
  } catch {
    return null
  }
}
