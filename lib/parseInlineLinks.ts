import React from 'react'
import { SmartLink } from '@/components/SmartLink'

// Matches both plain links [text](url) and smart links [text](url||image||title||subtitle)
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

    const linkText = match[1]
    const urlPart = match[2]
    const parts = urlPart.split('||')

    if (parts.length === 4) {
      // Smart link: url||image||title||subtitle
      const [url, image, title, subtitle] = parts
      nodes.push(
        React.createElement(
          SmartLink,
          {
            key: match.index,
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            preview: { image, title, subtitle },
            children: linkText,
          }
        )
      )
    } else {
      // Plain link
      nodes.push(
        React.createElement(
          'a',
          {
            key: match.index,
            href: urlPart,
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { textDecoration: 'underline', color: 'inherit' },
          },
          linkText
        )
      )
    }

    last = match.index + match[0].length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes
}
