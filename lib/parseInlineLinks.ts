import React from 'react'

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

export function parseInlineLinks(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  INLINE_LINK_RE.lastIndex = 0
  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    nodes.push(
      React.createElement(
        'a',
        {
          key: match.index,
          href: match[2],
          target: '_blank',
          rel: 'noopener noreferrer',
          style: { textDecoration: 'underline', color: 'inherit' },
        },
        match[1]
      )
    )
    last = match.index + match[0].length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes
}
