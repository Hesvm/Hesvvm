import { supabaseAdmin } from './supabase-admin'
import type { Project } from '@/types/project'
import { projects as localProjects } from '@/data/projects'

function localProjectToRecord(project: (typeof localProjects)[number]): Project {
  return {
    id: `local-${project.slug}`,
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    tags: project.tags,
    thumbnail_url: project.thumbnail,
    og_image_url: null,
    og_title: null,
    og_description: null,
    status: 'published',
    created_at: '',
    updated_at: '',
    blocks: project.blocks.map((block, index) => {
      const base = { id: `${project.slug}-block-${index}` }

      if (block.type === 'link') {
        return {
          ...base,
          type: block.type,
          label: block.label,
          url: block.href,
        }
      }

      return { ...base, ...block }
    }),
  } as Project
}

const localPublishedProjects = localProjects.map(localProjectToRecord)

export async function getPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error || !data?.length) {
    return localPublishedProjects
  }

  return data as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return localPublishedProjects.find((project) => project.slug === slug) ?? null
  }

  return data as Project
}
