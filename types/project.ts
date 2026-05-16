export type BlockType =
  | 'text'
  | 'title'
  | 'image'
  | 'image-pair'
  | 'divider'
  | 'link'
  | 'video'
  | 'quote'

export type TextBlock = {
  id: string
  type: 'text'
  content: string
}

export type TitleBlock = {
  id: string
  type: 'title'
  content: string
}

export type ImageBlock = {
  id: string
  type: 'image'
  src: string
  subtitle?: string
  alt?: string
}

export type ImagePairBlock = {
  id: string
  type: 'image-pair'
  left: { src: string; subtitle?: string; alt?: string }
  right: { src: string; subtitle?: string; alt?: string }
}

export type DividerBlock = {
  id: string
  type: 'divider'
  variant: 1 | 2 | 3 | 4 | 5
}

export type LinkBlock = {
  id: string
  type: 'link'
  url: string
  label: string
}

export type VideoBlock = {
  id: string
  type: 'video'
  url: string
  subtitle?: string
}

export type QuoteBlock = {
  id: string
  type: 'quote'
  content: string
  attribution?: string
}

export type ContentBlock =
  | TextBlock
  | TitleBlock
  | ImageBlock
  | ImagePairBlock
  | DividerBlock
  | LinkBlock
  | VideoBlock
  | QuoteBlock

export type Project = {
  id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  year?: string
  tags?: string[]
  thumbnail_url: string | null
  status: 'draft' | 'published'
  blocks: ContentBlock[]
  created_at: string
  updated_at: string
}
