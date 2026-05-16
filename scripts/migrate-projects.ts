import { createClient } from '@supabase/supabase-js'
import { projects } from '../data/projects'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function generateId(): string {
  return crypto.randomUUID()
}

async function migrate() {
  console.log(`Migrating ${projects.length} projects to Supabase...`)

  for (const project of projects) {
    // Transform blocks: add uuid id to each block, map href→url for link blocks
    const blocks = project.blocks.map((block) => {
      const base = { id: generateId() }
      if (block.type === 'link') {
        return { ...base, ...block, url: (block as any).href, href: undefined }
      }
      return { ...base, ...block }
    })

    const row = {
      id: generateId(),
      slug: project.slug,
      title: project.title,
      category: project.category ?? '',
      year: project.year ?? '',
      tags: project.tags ?? [],
      thumbnail_url: project.thumbnail ?? null,
      status: 'published' as const,
      blocks,
    }

    const { error } = await supabaseAdmin
      .from('projects')
      .upsert(row, { onConflict: 'slug' })

    if (error) {
      console.error(`❌ Failed: ${project.slug} —`, error.message)
    } else {
      console.log(`✅ Migrated: ${project.slug}`)
    }
  }

  console.log('Done.')
}

migrate().catch(console.error)
