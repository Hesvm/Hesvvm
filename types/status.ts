export type StatusType = 'song' | 'movie' | 'game' | 'book' | 'manual'

export type Status = {
  id: string
  type: StatusType
  title: string
  subtitle?: string
  link?: string
  photo?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type StatusRow = {
  id: string
  type: StatusType
  title: string
  subtitle: string | null
  link: string | null
  photo: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

