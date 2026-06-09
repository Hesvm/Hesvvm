'use client'

import type { MouseEvent, PointerEvent } from 'react'
import type { Status } from '@/types/status'

type StatusBubbleProps = {
  status: Status | null
  preview?: boolean
}

const labels: Record<Status['type'], string> = {
  song: 'Recently listening',
  movie: 'Recently watching',
  game: 'Recently playing',
  book: 'Recently reading',
  manual: 'Current status',
}

export function getStatusLabel(status: Status) {
  if (status.type === 'manual') return status.subtitle || labels.manual
  return labels[status.type]
}

type StatusMediaProps = {
  status: Status
}

type StatusMediaImageProps = StatusMediaProps & {
  className?: string
}

function StatusMediaImage({ status, className = '' }: StatusMediaImageProps) {
  const mediaClassName = className ? `statusMediaImage ${className}` : 'statusMediaImage'
  const fallbackClassName = className ? `statusMediaFallback ${className}` : 'statusMediaFallback'

  if (status.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={mediaClassName} src={status.photo} alt="" />
  }

  return <span className={fallbackClassName}>{status.title.trim().slice(0, 1) || 'S'}</span>
}

function SongStatusMedia({ status }: StatusMediaProps) {
  return (
    <span className="statusMediaFrame statusMediaFrame--song">
      <span className="songDisc">
        <StatusMediaImage status={status} />
      </span>
    </span>
  )
}

function handleMoviePointerMove(event: PointerEvent<HTMLSpanElement>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  const centeredX = (x - 50) / 50
  const centeredY = (y - 50) / 50

  event.currentTarget.style.setProperty('--movie-light-x', `${x}%`)
  event.currentTarget.style.setProperty('--movie-light-y', `${y}%`)
  event.currentTarget.style.setProperty('--movie-float-x', `${centeredX * 2}px`)
  event.currentTarget.style.setProperty('--movie-float-y', `${-2 + centeredY}px`)
}

function handleMoviePointerLeave(event: PointerEvent<HTMLSpanElement>) {
  event.currentTarget.style.setProperty('--movie-light-x', '50%')
  event.currentTarget.style.setProperty('--movie-light-y', '30%')
  event.currentTarget.style.setProperty('--movie-float-x', '0px')
  event.currentTarget.style.setProperty('--movie-float-y', '-2px')
}

function MovieStatusMedia({ status }: StatusMediaProps) {
  return (
    <span className="statusMediaFrame statusMediaFrame--movie">
      <span
        className="movieFrame"
        onPointerMove={handleMoviePointerMove}
        onPointerLeave={handleMoviePointerLeave}
      >
        <span className="moviePosterLayer">
          <StatusMediaImage status={status} className="moviePoster" />
        </span>
        <span className="movieInteractiveGlow" />
        <span className="movieSoftBeam" />
      </span>
    </span>
  )
}

function GameStatusMedia({ status }: StatusMediaProps) {
  return (
    <span className="statusMediaFrame statusMediaFrame--game">
      <StatusMediaImage status={status} />
    </span>
  )
}

function BookStatusMedia({ status }: StatusMediaProps) {
  return (
    <span className="statusMediaFrame statusMediaFrame--book">
      <span className="bookThumb">
        <span className="bookPage bookPage--back" />
        <span className="bookPage bookPage--page3" />
        <span className="bookPage bookPage--page2" />
        <span className="bookPage bookPage--page1" />
        <span className="bookCover">
          <StatusMediaImage status={status} />
        </span>
      </span>
    </span>
  )
}

function ManualStatusMedia({ status }: StatusMediaProps) {
  return (
    <span className="statusMediaFrame statusMediaFrame--manual">
      <StatusMediaImage status={status} />
    </span>
  )
}

function StatusMedia({ status }: StatusMediaProps) {
  switch (status.type) {
    case 'song':
      return <SongStatusMedia status={status} />
    case 'movie':
      return <MovieStatusMedia status={status} />
    case 'game':
      return <GameStatusMedia status={status} />
    case 'book':
      return <BookStatusMedia status={status} />
    case 'manual':
      return <ManualStatusMedia status={status} />
  }
}

export function StatusBubble({ status, preview = false }: StatusBubbleProps) {
  if (!status || !status.title.trim()) return null

  const label = getStatusLabel(status)
  const className = `status-bubble status-bubble-${status.type}`
  const content = (
    <>
      <svg
        className="status-bubble-shape"
        width="285"
        height="182"
        viewBox="0 0 285 182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g filter="url(#status-bubble-shadow)">
          <path
            d="M92.7949 113.343C94.2328 112.922 95.6099 113.062 96.9258 113.762C98.2458 114.455 99.1233 115.507 99.5586 116.918C99.9867 118.331 99.8444 119.684 99.1318 120.977C98.4266 122.273 97.3557 123.135 95.9199 123.562C94.4819 123.983 93.105 123.844 91.7891 123.144C90.4692 122.451 89.5915 121.399 89.1562 119.988C88.728 118.575 88.8703 117.223 89.583 115.93C90.2882 114.633 91.359 113.77 92.7949 113.343ZM213.197 49.7998C222.919 49.8001 230.8 57.6808 230.8 67.4023V88.1973C230.8 97.9188 222.919 105.8 213.197 105.8H91.5137C91.6828 107.321 91.3803 108.788 90.6035 110.2C89.5852 112.069 88.0309 113.315 85.9414 113.937C83.8493 114.549 81.854 114.351 79.9561 113.344C78.054 112.343 76.7862 110.816 76.1533 108.764C75.8466 107.753 75.7407 106.765 75.833 105.8H71.4023C61.6808 105.8 53.8001 97.9188 53.7998 88.1973V67.4023C53.8001 57.6808 61.6808 49.8001 71.4023 49.7998H213.197Z"
            fill="white"
          />
        </g>
        <defs>
          <filter id="status-bubble-shadow" x="0" y="0" width="284.6" height="181.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="26.9" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
      <span className="status-bubble-object" aria-hidden="true">
        <StatusMedia status={status} />
      </span>
      <span className="status-bubble-copy">
        <span className="status-bubble-label">{label}</span>
        <span className="status-bubble-title">{status.title}</span>
        {status.type === 'manual' && status.subtitle ? (
          <span className="status-bubble-subtitle">{status.subtitle}</span>
        ) : null}
      </span>
    </>
  )
  const ariaLabel = `${label}: ${status.title}`

  function handlePreviewClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
  }

  if (status.link && !preview) {
    return (
      <a
        className={className}
        href={status.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {content}
      </a>
    )
  }

  if (status.link && preview) {
    return (
      <a
        className={className}
        href={status.link}
        aria-label={ariaLabel}
        onClick={handlePreviewClick}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={className} role="status" aria-label={ariaLabel}>
      {content}
    </div>
  )
}
