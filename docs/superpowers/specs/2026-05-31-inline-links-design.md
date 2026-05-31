# Inline Links in Text Blocks — Design Spec

**Date:** 2026-05-31  
**Scope:** Admin block editor + ContentRenderer

---

## Summary

Add Ctrl+K support to text-containing admin blocks so editors can wrap selected text in a markdown-style inline link `[text](url)`. The renderer parses these links and outputs `<a>` elements. No schema change — `content` stays a plain string.

---

## Affected Blocks

- `TextBlock`
- `QuoteBlock`
- `TitleBlock`

---

## Editor Behavior (Ctrl+K handler)

Applies identically to all three blocks via a `keydown` listener on the `<textarea>` element.

### Steps

1. Intercept `Ctrl+K` (and `Meta+K` on Mac) — prevent default browser behavior.
2. Read `selectionStart` and `selectionEnd` from the textarea ref.
3. Prompt for a URL via `window.prompt('URL:')`.
4. If the user cancels → do nothing.
5. If text is selected:
   - Replace the selection with `[selectedText](url)`.
   - Move cursor to end of inserted text.
6. If nothing is selected:
   - Insert `[](url)` at the cursor position.
   - Move cursor inside the `[` brackets so the user can type the label immediately.
7. Fire `onChange` with the updated content string.

---

## Renderer (parseInlineLinks utility)

A `parseInlineLinks(text: string): React.ReactNode[]` function lives at the top of `ContentRenderer.tsx`.

### Algorithm

```
regex: /\[([^\]]+)\]\(([^)]+)\)/g
```

Split the string into alternating text and match segments. For each match, emit:

```tsx
<a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
  {label}
</a>
```

Plain text segments are emitted as strings. The function returns a `React.ReactNode[]` array safe to use as React children.

### Applied in ContentRenderer

| Block type | Field rendered with parseInlineLinks |
|---|---|
| `text` | `block.content` |
| `title` | `block.content` |
| `quote` | `block.content` (attribution stays plain) |

---

## Files Changed

| File | Change |
|---|---|
| `components/admin/blocks/TextBlock.tsx` | Add Ctrl+K keydown handler |
| `components/admin/blocks/QuoteBlock.tsx` | Add Ctrl+K keydown handler |
| `components/admin/blocks/TitleBlock.tsx` | Add Ctrl+K keydown handler |
| `components/ContentRenderer.tsx` | Add `parseInlineLinks` utility; apply to text/title/quote renders |

---

## Out of Scope

- No toolbar button or popover UI — `window.prompt` is sufficient.
- No bold/italic or other rich text features.
- Attribution field in QuoteBlock stays plain text.
- No migration of existing content needed (format is additive).
