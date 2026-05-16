'use client'

import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>
      <div style={{
        height: 48,
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 10,
      }}>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#555' }}>
          Portfolio Admin
        </span>
        <button
          onClick={handleLogout}
          style={{
            fontSize: 12,
            color: '#999',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          Logout
        </button>
      </div>
      <div>{children}</div>
    </div>
  )
}
