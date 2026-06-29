'use client'
import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    let lastProgress = 0

    function update() {
      const scrollTop = window.scrollY
      // Scope to the 500vh animation section only (not full page).
      // The sticky unsticks at scrollY = (500 - 1) * innerHeight = 499 * innerHeight.
      // Dividing by full page height meant the last frames never played because
      // below-fold sections pushed progress below 1.0 before the animation ended.
      const sectionHeight = window.innerHeight * 499
      const p = Math.min(1, Math.max(0, scrollTop / sectionHeight))
      if (Math.abs(p - lastProgress) > 0.0001) {
        lastProgress = p
        setProgress(p)
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}
