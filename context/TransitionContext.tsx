"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type CardRect = { x: number; y: number; width: number; height: number }

type TransitionState = {
  clickedSlug: string | null
  setClickedSlug: (slug: string | null) => void
  cardRect: CardRect | null
  setCardRect: (rect: CardRect | null) => void
  thumbnail: string | null
  setThumbnail: (src: string | null) => void
}

const TransitionContext = createContext<TransitionState>({
  clickedSlug: null,
  setClickedSlug: () => {},
  cardRect: null,
  setCardRect: () => {},
  thumbnail: null,
  setThumbnail: () => {},
})

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [clickedSlug, setClickedSlug] = useState<string | null>(null)
  const [cardRect, setCardRect] = useState<CardRect | null>(null)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  return (
    <TransitionContext.Provider value={{ clickedSlug, setClickedSlug, cardRect, setCardRect, thumbnail, setThumbnail }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)
