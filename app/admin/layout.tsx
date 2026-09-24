'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#555' }}>
            Portfolio Admin
          </span>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[
              { href: '/admin/projects', label: 'Projects' },
              { href: '/admin/status', label: 'Status' },
            ].map(item => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: 12,
                    color: active ? '#111' : '#999',
                    textDecoration: 'none',
                    padding: '5px 9px',
                    borderRadius: 6,
                    background: active ? '#f3f3f3' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div id="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }} />
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
      </div>
      <div>{children}</div>
    </div>
  )
}
