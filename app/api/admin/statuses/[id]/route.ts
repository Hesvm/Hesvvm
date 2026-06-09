import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { mapStatusRow } from '@/lib/getStatus'
import type { StatusRow } from '@/types/status'
import { sanitizeStatusPayload, validateStatusPayload } from '@/lib/statusPayload'
import { requireAdminSession } from '@/lib/adminAuth'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdminSession(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const { data, error } = await supabaseAdmin.from('statuses').select('*').eq('id', id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(mapStatusRow(data as StatusRow))
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdminSession(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const body = await req.json()
  const payload = sanitizeStatusPayload(body)
  const validationError = validateStatusPayload(payload)

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  if (payload.is_active) {
    const { error: activeError } = await supabaseAdmin
      .from('statuses').update({ is_active: false })
      .eq('is_active', true)

    if (activeError) return NextResponse.json({ error: activeError.message }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('statuses')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(mapStatusRow(data as StatusRow))
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdminSession(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const { error } = await supabaseAdmin.from('statuses').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
