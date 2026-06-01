'use client'

import React from 'react'
import { parseTokens, LinkToken } from '@/lib/parseTokens'

interface Props {
  content: string
  placeholder?: string
  onClickText: () => void
  onClickLink: (token: LinkToken) => void
  style?: React.CSSProperties
}

export function RichTextDisplay({ content, placeholder, onClickText, onClickLink, style }: Props) {
  const tokens = parseTokens(content)
  const isEmpty = content.trim() === ''

  return (
    <div
      onClick={onClickText}
      style={{
        cursor: 'text',
        minHeight: 40,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {isEmpty ? (
        <span style={{ color: '#9ca3af' }}>{placeholder ?? 'Click to edit…'}</span>
      ) : (
        tokens.map((token, i) => {
          if (token.type === 'text') {
            return <span key={i}>{token.value}</span>
          }
          return (
            <span
              key={i}
              onClick={e => { e.stopPropagation(); onClickLink(token) }}
              title={token.url}
              style={{
                color: '#1a6ef5',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(26, 110, 245, 0.4)',
                cursor: 'pointer',
              }}
            >
              {token.text}
            </span>
          )
        })
      )}
    </div>
  )
}
