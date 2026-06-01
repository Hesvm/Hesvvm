export type TextToken = {
  type: 'text'
  value: string
}

export type LinkToken = {
  type: 'link'
  text: string
  url: string
  preview?: { image: string; title: string; subtitle: string }
  raw: string // the full [text](url...) match, used for replacement
}

export type Token = TextToken | LinkToken

export function parseTokens(content: string): Token[] {
  const tokens: Token[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(content)) !== null) {
    if (match.index > last) {
      tokens.push({ type: 'text', value: content.slice(last, match.index) })
    }
    const parts = match[2].split('||')
    const token: LinkToken = {
      type: 'link',
      text: match[1],
      url: parts[0],
      raw: match[0],
    }
    if (parts.length === 4) {
      token.preview = { image: parts[1], title: parts[2], subtitle: parts[3] }
    }
    tokens.push(token)
    last = match.index + match[0].length
  }

  if (last < content.length) {
    tokens.push({ type: 'text', value: content.slice(last) })
  }

  return tokens
}
