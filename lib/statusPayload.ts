import type { StatusType } from '@/types/status'

const statusTypes: StatusType[] = ['song', 'movie', 'game', 'book', 'manual']

function cleanString(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export function sanitizeStatusPayload(body: Record<string, unknown>) {
  const type = statusTypes.includes(body.type as StatusType) ? body.type as StatusType : undefined
  const title = cleanString(body.title)
  const isManual = type === 'manual'

  return {
    type,
    title,
    subtitle: isManual ? cleanString(body.subtitle) : null,
    link: cleanString(body.link),
    photo: cleanString(body.photo),
    is_active: Boolean(body.isActive),
  }
}

type StatusPayload = ReturnType<typeof sanitizeStatusPayload>

export function validateStatusPayload(payload: StatusPayload) {
  if (!payload.type || !payload.title) return 'Type and title are required'
  if (!payload.link || !payload.photo) return 'Link and photo are required'
  if (payload.type === 'manual' && !payload.subtitle) return 'Manual statuses require a subtitle'

  return null
}
