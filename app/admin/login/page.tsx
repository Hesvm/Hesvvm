'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Wrong password')
    }
  }

  return (
    <div style={{
      height: 'calc(100vh - 48px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>
      <div style={{ width: 400 }}>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24, fontWeight: 400 }}>Admin</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 0',
              fontSize: 14,
              border: 'none',
              borderBottom: '1px solid #e0e0e0',
              outline: 'none',
              background: 'transparent',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 8 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 24,
              padding: '8px 20px',
              fontSize: 13,
              background: '#111',
              color: '#fff',
              border: 'none',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
