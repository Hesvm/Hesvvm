import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { mapStatusRow } from '@/lib/getStatus'
import { sanitizeStatusPayload, validateStatusPayload } from '@/lib/statusPayload'
import { requireAdminSession } from '@/lib/adminAuth'
import type { StatusRow } from '@/types/status'

export async function GET(req: NextRequest) {
  const unauthorized = requireAdminSession(req)
  if (unauthorized) return unauthorized

  const { data, error } = await supabaseAdmin
    .from('statuses')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json((data as StatusRow[]).map(mapStatusRow))
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdminSession(req)
  if (unauthorized) return unauthorized

  const body = await req.json()
  const payload = sanitizeStatusPayload(body)
  const validationError = validateStatusPayload(payload)

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  if (payload.is_active) {
    const { error: activeError } = await supabaseAdmin
      .from('statuses')
      .update({ is_active: false })
      .eq('is_active', true)

    if (activeError) return NextResponse.json({ error: activeError.message }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('statuses')
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(mapStatusRow(data as StatusRow))
}
