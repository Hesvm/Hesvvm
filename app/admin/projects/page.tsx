'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types/project'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false })
    setProjects(data ?? [])
    setLoading(false)
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Projects</h1>
        <button
          onClick={() => router.push('/admin/projects/new')}
          style={{
            fontSize: 13,
            padding: '8px 16px',
            background: '#111',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ height: 52, background: '#f5f5f5', borderRadius: 4 }} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p style={{ color: '#999', fontSize: 14 }}>No projects yet. Create your first one.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8e8e8' }}>
              {['Thumbnail', 'Title', 'Slug', 'Category', 'Year', 'Status', 'Last updated', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px 12px' }}>
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url}
                      alt=""
                      style={{ width: 48, height: 48, objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: 48, height: 48, background: '#e8e8e8' }} />
                  )}
                </td>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{project.title}</td>
                <td style={{ padding: '10px 12px', color: '#888', fontFamily: 'monospace', fontSize: 12 }}>{project.slug}</td>
                <td style={{ padding: '10px 12px', color: '#666' }}>{project.category}</td>
                <td style={{ padding: '10px 12px', color: '#666' }}>{project.year}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    background: project.status === 'published' ? '#d1fae5' : '#f3f4f6',
                    color: project.status === 'published' ? '#065f46' : '#6b7280',
                    fontWeight: 500,
                  }}>
                    {project.status}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', color: '#888', fontSize: 12 }}>
                  {new Date(project.updated_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <button
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                    style={{ fontSize: 12, marginRight: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    style={{ fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
