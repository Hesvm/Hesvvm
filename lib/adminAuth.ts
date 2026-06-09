import { NextRequest, NextResponse } from 'next/server'

export function requireAdminSession(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value

  if (session === 'authenticated') return null

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
