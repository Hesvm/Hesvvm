import { useState, useEffect } from 'react'

export function useIsHoverCapable() {
  const [isHoverCapable, setIsHoverCapable] = useState(false)

  useEffect(() => {
    setIsHoverCapable(window.matchMedia('(hover: hover)').matches)
  }, [])

  return isHoverCapable
}
