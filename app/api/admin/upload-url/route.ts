import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  const { path } = await req.json() as { path: string }

  if (!path) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.storage
    .from('portfolio-images')
    .createSignedUploadUrl(path)

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create upload URL' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('portfolio-images')
    .getPublicUrl(path)

  return NextResponse.json({ signedUrl: data.signedUrl, token: data.token, publicUrl })
}
