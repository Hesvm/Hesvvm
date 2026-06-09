import { supabaseAdmin } from './supabase-admin'
import type { Status, StatusRow, StatusType } from '@/types/status'

const previewStatusTypes: StatusType[] = ['song', 'movie', 'game', 'book', 'manual']

function getPreviewStatus(): Status {
  const type = previewStatusTypes[Math.floor(Math.random() * previewStatusTypes.length)]
  const now = new Date().toISOString()
  const previewByType: Record<StatusType, Pick<Status, 'title' | 'subtitle' | 'link'>> = {
    song: {
      title: 'Count Me Out',
      link: 'https://open.spotify.com',
    },
    movie: {
      title: 'Aftersun',
      link: 'https://letterboxd.com',
    },
    game: {
      title: 'GTA VI',
      link: 'https://www.rockstargames.com',
    },
    book: {
      title: 'ZAG',
      link: 'https://www.martyneumeier.com/zag',
    },
    manual: {
      title: 'Projects',
      subtitle: 'Open for',
      link: 'mailto:hello@hesvm.space',
    },
  }

  return {
    id: `preview-status-${type}`,
    type,
    ...previewByType[type],
    photo: '/images/avatar-hero.png',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  }
}

export function mapStatusRow(row: StatusRow): Status {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    link: row.link ?? undefined,
    photo: row.photo ?? undefined,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getActiveStatus(): Promise<Status | null> {
  const { data, error } = await supabaseAdmin
    .from('statuses')
    .select('*')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) {
    if (process.env.NODE_ENV === 'production') {
      if (error) console.error('Failed to fetch active status')
      return null
    }

    return getPreviewStatus()
  }

  return mapStatusRow(data as StatusRow)
}
