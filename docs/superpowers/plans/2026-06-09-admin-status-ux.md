# Admin Status UX Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/admin/status` clearer and easier to use via type-specific labels, per-field inline validation, photo thumbnails, improved active/inactive badges, a deactivation guard, and proper form accessibility.

**Architecture:** All changes are contained in `app/admin/status/page.tsx`. A `TYPE_CONFIG` lookup object drives labels and placeholders per type. A `fieldErrors` state object replaces the single top-level error string for form validation; the top-level error string is kept only for API/network errors. `StatusBubble` and `lib/statusPayload.ts` are not modified.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, inline styles (no Tailwind classes for admin UI)

---

### Task 1: Add TYPE_CONFIG object and wire type-specific labels/placeholders

**Files:**
- Modify: `app/admin/status/page.tsx`

This task replaces the generic static labels ("Title", "Link", "Photo") with dynamic ones driven by the selected type.

- [ ] **Step 1: Read the current file**

Open `app/admin/status/page.tsx` and hold in context. The form section starts around line 261.

- [ ] **Step 2: Add the TYPE_CONFIG constant after the `emptyForm` declaration (around line 27)**

Insert immediately after the `emptyForm` block:

```ts
type TypeConfig = {
  titleLabel: string
  titlePlaceholder: string
  photoLabel: string
  photoPlaceholder: string
  linkLabel: string
  linkPlaceholder: string
  subtitleLabel?: string
  subtitlePlaceholder?: string
}

const TYPE_CONFIG: Record<StatusType, TypeConfig> = {
  song: {
    titleLabel: 'Song title',
    titlePlaceholder: 'e.g. Count Me Out',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Album cover URL',
    linkLabel: 'Song link',
    linkPlaceholder: 'Spotify / Apple Music / YouTube link',
  },
  movie: {
    titleLabel: 'Movie title',
    titlePlaceholder: 'e.g. Dune: Part Two',
    photoLabel: 'Poster photo',
    photoPlaceholder: 'Poster image URL',
    linkLabel: 'Movie link',
    linkPlaceholder: 'Letterboxd / IMDb / trailer link',
  },
  game: {
    titleLabel: 'Game title',
    titlePlaceholder: 'e.g. Death Stranding 2',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Game cover URL',
    linkLabel: 'Game link',
    linkPlaceholder: 'Steam / PlayStation / website link',
  },
  book: {
    titleLabel: 'Book title',
    titlePlaceholder: 'e.g. ZAG',
    photoLabel: 'Cover photo',
    photoPlaceholder: 'Book cover URL',
    linkLabel: 'Book link',
    linkPlaceholder: 'Goodreads / Amazon / publisher link',
  },
  manual: {
    titleLabel: 'Title',
    titlePlaceholder: 'e.g. Building tiny AI apps',
    subtitleLabel: 'Subtitle',
    subtitlePlaceholder: 'e.g. Current focus',
    photoLabel: 'Photo',
    photoPlaceholder: 'Image URL',
    linkLabel: 'Link',
    linkPlaceholder: 'Optional related link',
  },
}
```

- [ ] **Step 3: Derive the config inside the component and update form field labels/placeholders**

Inside `AdminStatusPage`, just before the `return`, add:

```ts
const cfg = TYPE_CONFIG[form.type]
```

Then update each form field to use `cfg`:

**Type select** — add `id="status-type"` and matching `htmlFor`:
```tsx
<div>
  <label htmlFor="status-type" style={labelStyle()}>{/* keep as "Type" */}Type</label>
  <select
    id="status-type"
    value={form.type}
    onChange={e => updateForm({ type: e.target.value as StatusType })}
    style={inputStyle()}
  >
    {statusTypes.map(type => <option key={type} value={type}>{type}</option>)}
  </select>
</div>
```

**Title field** — dynamic label + placeholder + id:
```tsx
<div>
  <label htmlFor="status-title" style={labelStyle()}>{cfg.titleLabel}</label>
  <input
    id="status-title"
    value={form.title}
    onChange={e => updateForm({ title: e.target.value })}
    style={inputStyle()}
    placeholder={cfg.titlePlaceholder}
  />
</div>
```

**Subtitle field** (manual only) — dynamic label + placeholder + id:
```tsx
{form.type === 'manual' ? (
  <div>
    <label htmlFor="status-subtitle" style={labelStyle()}>{cfg.subtitleLabel}</label>
    <input
      id="status-subtitle"
      value={form.subtitle}
      onChange={e => updateForm({ subtitle: e.target.value })}
      style={inputStyle()}
      placeholder={cfg.subtitlePlaceholder}
    />
  </div>
) : null}
```

**Link field** — dynamic label + placeholder + id:
```tsx
<div>
  <label htmlFor="status-link" style={labelStyle()}>{cfg.linkLabel}</label>
  <input
    id="status-link"
    value={form.link}
    onChange={e => updateForm({ link: e.target.value })}
    style={inputStyle()}
    placeholder={cfg.linkPlaceholder}
  />
</div>
```

**Photo field** — dynamic label + placeholder + id:
```tsx
<div>
  <label htmlFor="status-photo" style={labelStyle()}>{cfg.photoLabel}</label>
  <div style={{ display: 'flex', gap: 8 }}>
    <input
      id="status-photo"
      value={form.photo}
      onChange={e => updateForm({ photo: e.target.value })}
      style={inputStyle()}
      placeholder={cfg.photoPlaceholder}
    />
    <label style={{ fontSize: 12, padding: '8px 10px', background: '#f3f3f3', borderRadius: 6, color: uploading ? '#aaa' : '#555', whiteSpace: 'nowrap', cursor: uploading ? 'not-allowed' : 'pointer' }}>
      {uploading ? 'Uploading...' : 'Upload'}
      <input type="file" accept="image/*" disabled={uploading} onChange={e => e.target.files?.[0] && void handlePhotoUpload(e.target.files[0])} style={{ display: 'none' }} />
    </label>
  </div>
</div>
```

**Active checkbox** — add id:
```tsx
<label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#555' }}>
  <input
    id="status-active"
    type="checkbox"
    checked={form.isActive}
    onChange={e => updateForm({ isActive: e.target.checked })}
  />
  Active on public site
</label>
```

- [ ] **Step 4: Verify the app compiles**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): type-specific labels, placeholders, and accessible ids"
```

---

### Task 2: Add per-field inline validation

**Files:**
- Modify: `app/admin/status/page.tsx`

Replaces the single error string used for form validation with a `fieldErrors` map. The top-level `error` state remains for API/network errors only. Validation triggers on blur and on submit attempt.

- [ ] **Step 1: Add `fieldErrors` state and `touched` state**

Inside the component, after the existing state declarations:

```ts
type FieldErrors = Partial<Record<'type' | 'title' | 'subtitle' | 'link' | 'photo', string>>
const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
const [touched, setTouched] = useState<Set<string>>(new Set())
```

- [ ] **Step 2: Add a `validateFields` helper**

```ts
function validateFields(f: StatusForm): FieldErrors {
  const errors: FieldErrors = {}
  if (!f.type) errors.type = 'Type is required'
  if (!f.title.trim()) errors.title = `${TYPE_CONFIG[f.type]?.titleLabel ?? 'Title'} is required`
  if (!f.photo.trim()) errors.photo = `${TYPE_CONFIG[f.type]?.photoLabel ?? 'Photo'} is required`
  if (!f.link.trim()) errors.link = `${TYPE_CONFIG[f.type]?.linkLabel ?? 'Link'} is required`
  if (f.type === 'manual' && !f.subtitle.trim()) errors.subtitle = 'Subtitle is required for manual status'
  return errors
}
```

- [ ] **Step 3: Add a `handleBlur` function**

```ts
function handleBlur(field: string) {
  setTouched(prev => new Set(prev).add(field))
  setFieldErrors(validateFields(form))
}
```

- [ ] **Step 4: Update `updateForm` to re-validate already-touched fields**

Replace the existing `updateForm`. Compute `next` directly from the `form` snapshot (avoids calling `setFieldErrors` inside a functional updater, which is a React anti-pattern):

```ts
function updateForm(patch: Partial<StatusForm>) {
  setError('')
  if ('photo' in patch) setPhotoError(false)    // (photoError state added in Task 3 — add it then)
  const next = { ...form, ...patch }
  if (patch.type && patch.type !== 'manual') next.subtitle = ''
  setForm(next)
  if (touched.size > 0) setFieldErrors(validateFields(next))
}
```

Note: the `setPhotoError(false)` line is included here so Task 3 does **not** need to modify `updateForm` again — just add the `photoError` state declaration in Task 3.

- [ ] **Step 5: Update `handleSubmit` to use `fieldErrors`**

Replace the manual validation block at the top of `handleSubmit`:

```ts
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  // Mark all fields touched so errors show
  setTouched(new Set(['type', 'title', 'subtitle', 'link', 'photo']))
  const errors = validateFields(form)
  setFieldErrors(errors)
  if (Object.keys(errors).length > 0) return

  setSaving(true)
  setError('')
  // ... rest unchanged
```

- [ ] **Step 6: Add `onBlur` handlers and inline error rendering to each field**

Add a helper for inline error styling:

```ts
function fieldErrorStyle(): React.CSSProperties {
  return { fontSize: 11, color: '#9A4B42', marginTop: 4 }
}
```

**Type select:**
```tsx
<div>
  <label htmlFor="status-type" style={labelStyle()}>Type</label>
  <select
    id="status-type"
    value={form.type}
    onChange={e => updateForm({ type: e.target.value as StatusType })}
    onBlur={() => handleBlur('type')}
    style={inputStyle()}
  >
    {statusTypes.map(type => <option key={type} value={type}>{type}</option>)}
  </select>
  {touched.has('type') && fieldErrors.type ? <p style={fieldErrorStyle()}>{fieldErrors.type}</p> : null}
</div>
```

**Title field:**
```tsx
<div>
  <label htmlFor="status-title" style={labelStyle()}>{cfg.titleLabel}</label>
  <input
    id="status-title"
    value={form.title}
    onChange={e => updateForm({ title: e.target.value })}
    onBlur={() => handleBlur('title')}
    style={inputStyle()}
    placeholder={cfg.titlePlaceholder}
  />
  {touched.has('title') && fieldErrors.title ? <p style={fieldErrorStyle()}>{fieldErrors.title}</p> : null}
</div>
```

**Subtitle field:**
```tsx
{form.type === 'manual' ? (
  <div>
    <label htmlFor="status-subtitle" style={labelStyle()}>{cfg.subtitleLabel}</label>
    <input
      id="status-subtitle"
      value={form.subtitle}
      onChange={e => updateForm({ subtitle: e.target.value })}
      onBlur={() => handleBlur('subtitle')}
      style={inputStyle()}
      placeholder={cfg.subtitlePlaceholder}
    />
    {touched.has('subtitle') && fieldErrors.subtitle ? <p style={fieldErrorStyle()}>{fieldErrors.subtitle}</p> : null}
  </div>
) : null}
```

**Link field:**
```tsx
<div>
  <label htmlFor="status-link" style={labelStyle()}>{cfg.linkLabel}</label>
  <input
    id="status-link"
    value={form.link}
    onChange={e => updateForm({ link: e.target.value })}
    onBlur={() => handleBlur('link')}
    style={inputStyle()}
    placeholder={cfg.linkPlaceholder}
  />
  {touched.has('link') && fieldErrors.link ? <p style={fieldErrorStyle()}>{fieldErrors.link}</p> : null}
</div>
```

**Photo field:**
```tsx
<div>
  <label htmlFor="status-photo" style={labelStyle()}>{cfg.photoLabel}</label>
  <div style={{ display: 'flex', gap: 8 }}>
    <input
      id="status-photo"
      value={form.photo}
      onChange={e => updateForm({ photo: e.target.value })}
      onBlur={() => handleBlur('photo')}
      style={inputStyle()}
      placeholder={cfg.photoPlaceholder}
    />
    <label style={{ fontSize: 12, padding: '8px 10px', background: '#f3f3f3', borderRadius: 6, color: uploading ? '#aaa' : '#555', whiteSpace: 'nowrap', cursor: uploading ? 'not-allowed' : 'pointer' }}>
      {uploading ? 'Uploading...' : 'Upload'}
      <input type="file" accept="image/*" disabled={uploading} onChange={e => e.target.files?.[0] && void handlePhotoUpload(e.target.files[0])} style={{ display: 'none' }} />
    </label>
  </div>
  {touched.has('photo') && fieldErrors.photo ? <p style={fieldErrorStyle()}>{fieldErrors.photo}</p> : null}
</div>
```

- [ ] **Step 7: Reset `touched` and `fieldErrors` when resetting the form**

In the "Create Status" button click handler and after successful save:

```ts
// Existing: setForm(emptyForm)
// Add after:
setTouched(new Set())
setFieldErrors({})
```

Find these three locations in the file:
1. The "Create Status" button `onClick`: `setForm(emptyForm); setError('')` → add `setTouched(new Set()); setFieldErrors({})`
2. After `await fetchStatuses()` in `handleSubmit`: add `setTouched(new Set()); setFieldErrors({})`
3. In `handleDelete` after `if (form.id === status.id) setForm(emptyForm)` → add the two resets

- [ ] **Step 8: Verify TypeScript**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): per-field inline validation with blur/submit triggers"
```

---

### Task 3: Add photo thumbnail preview and broken-image fallback

**Files:**
- Modify: `app/admin/status/page.tsx`

Shows a small square thumbnail next to the photo input when `form.photo` is set. Hides it on image load error (broken URL).

- [ ] **Step 1: Add `photoError` state**

```ts
const [photoError, setPhotoError] = useState(false)
```

- [ ] **Step 2: Confirm the `setPhotoError(false)` guard is already in `updateForm`**

Task 2 included `if ('photo' in patch) setPhotoError(false)` in the updated `updateForm`. Verify that line is present — no further change to `updateForm` is needed here.

- [ ] **Step 3: Add the thumbnail after the photo input row**

Inside the photo `<div>`, after the upload label, add a conditional thumbnail:

```tsx
{form.photo && !photoError ? (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={form.photo}
    alt="Photo preview"
    onError={() => setPhotoError(true)}
    style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '1px solid #e8e8e8' }}
  />
) : null}
```

- [ ] **Step 4: Verify TypeScript**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): show photo thumbnail preview with broken-url fallback"
```

---

### Task 4: Add "Inactive" badge and improve list item active state

**Files:**
- Modify: `app/admin/status/page.tsx`

Every status row currently only shows an "Active" badge; inactive rows show nothing. This task adds an "Inactive" badge and improves the visual distinction.

- [ ] **Step 1: Update the status list article rendering**

Find the badges section in the list map (currently around line 231):

```tsx
{status.isActive ? <span style={{ fontSize: 11, color: '#4F6B4E', background: '#EDF4EC', padding: '2px 7px', borderRadius: 99 }}>Active</span> : null}
```

Replace with active/inactive badge:

```tsx
{status.isActive
  ? <span style={{ fontSize: 11, color: '#4F6B4E', background: '#EDF4EC', padding: '2px 7px', borderRadius: 99, fontWeight: 500 }}>Active</span>
  : <span style={{ fontSize: 11, color: '#999', background: '#f3f3f3', padding: '2px 7px', borderRadius: 99 }}>Inactive</span>
}
```

- [ ] **Step 2: Update the action button labels**

Find the activate/deactivate button in the list:

```tsx
{status.isActive ? 'Deactivate' : 'Set Active'}
```

Replace with:

```tsx
{status.isActive ? 'Deactivate' : 'Set active'}
```

(lowercase "active" per the spec)

- [ ] **Step 3: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): show Inactive badge on all inactive status rows"
```

---

### Task 5: Add deactivation guard for the only active status

**Files:**
- Modify: `app/admin/status/page.tsx`

When the user tries to deactivate the only active status, show a clear error rather than silently deactivating it or leaving an undefined UI state.

- [ ] **Step 1: Update `handleSetActive` to guard against deactivating the only active**

Find the `handleSetActive` function. Replace it with:

```ts
async function handleSetActive(status: Status, isActive: boolean) {
  // Guard: don't allow deactivating if this is the only active status
  if (!isActive && status.isActive) {
    const otherActive = statuses.some(s => s.id !== status.id && s.isActive)
    if (!otherActive) {
      setError('Cannot deactivate — this is the only active status. Set another status active first, or delete this one.')
      return
    }
  }

  const res = await fetch(`/api/admin/statuses/${status.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...statusToForm(status), isActive }),
  })
  const data = await res.json() as Status | { error?: string }
  if (!res.ok || 'error' in data) {
    setError(('error' in data && data.error) ? data.error : 'Status update failed.')
    return
  }
  setError('')
  await fetchStatuses()
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): guard against deactivating the only active status"
```

---

### Task 6: Improve empty state and final polish

**Files:**
- Modify: `app/admin/status/page.tsx`

Small polish pass: improve empty state copy, remove leftover `p` margin resets from inline error messages, verify the build passes.

- [ ] **Step 1: Update the empty state message**

Find:
```tsx
<p style={{ color: '#999', fontSize: 14 }}>No statuses yet. Create your first one.</p>
```

Replace with:
```tsx
<div style={{ padding: '40px 24px', textAlign: 'center', border: '1px dashed #e8e8e8', borderRadius: 8 }}>
  <p style={{ color: '#999', fontSize: 14, margin: 0 }}>No statuses yet.</p>
  <p style={{ color: '#bbb', fontSize: 13, margin: '6px 0 0' }}>Create your first one using the form →</p>
</div>
```

- [ ] **Step 2: Add `margin: 0` to inline error `<p>` tags**

All inline field error `<p>` tags should have `margin: 0` to prevent default browser paragraph spacing. Update `fieldErrorStyle()`:

```ts
function fieldErrorStyle(): React.CSSProperties {
  return { fontSize: 11, color: '#9A4B42', marginTop: 4, margin: '4px 0 0' }
}
```

- [ ] **Step 3: Run production build**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio" && npx next build 2>&1 | tail -20
```

Expected: build completes successfully, no type errors, no lint errors.

- [ ] **Step 4: Commit**

```bash
cd "/Users/hesam/Code-Projects/Hesam Portfolio"
git add app/admin/status/page.tsx
git commit -m "feat(admin): improve empty state and polish inline error spacing"
```

---

## QA Checklist

Before marking done, verify each item by opening `/admin/status`:

- [ ] Labels change when switching type (e.g. "Song title" for song, "Movie title" for movie)
- [ ] Subtitle field appears only for `manual`
- [ ] Subtitle field disappears and clears when switching away from `manual`
- [ ] Preview updates live as you type
- [ ] Preview shows "Untitled status" when title is empty
- [ ] Preview does not navigate when clicked
- [ ] All statuses show either "Active" or "Inactive" badge
- [ ] "Set active" / "Deactivate" buttons work correctly
- [ ] Setting one status active deactivates others (API behavior)
- [ ] Deactivating the only active status shows the guard error message
- [ ] Blurring an empty required field shows the inline error
- [ ] Submitting with empty fields shows all inline errors
- [ ] Photo URL thumbnail appears when a valid URL is entered
- [ ] Photo thumbnail disappears on broken URL
- [ ] Each form field has matching `htmlFor` + `id`
- [ ] `npx next build` passes clean
- [ ] Homepage bubble is unchanged (no regressions)
