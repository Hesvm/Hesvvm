"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type TransitionState = {
  clickedSlug: string | null
  setClickedSlug: (slug: string | null) => void
}

const TransitionContext = createContext<TransitionState>({
  clickedSlug: null,
  setClickedSlug: () => {},
})

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [clickedSlug, setClickedSlug] = useState<string | null>(null)
  return (
    <TransitionContext.Provider value={{ clickedSlug, setClickedSlug }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)
