import { supabaseAdmin } from './supabase-admin'
import type { Project } from '@/types/project'

export async function getPublishedProjects(): Promise<Project[]> {
  const { data } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  return (data ?? []) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
  return (data ?? null) as Project | null
}
