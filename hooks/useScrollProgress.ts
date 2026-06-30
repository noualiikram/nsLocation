'use client'
import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    let lastProgress = 0

    function update() {
      const scrollTop = window.scrollY
      // Animation section is 500vh tall, sticky is 100vh tall.
      // 1vh = window.innerHeight / 100, so 500vh = 5 × innerHeight.
      // The sticky unsticks after scrolling (500vh - 100vh) = 400vh = 4 × innerHeight.
      const sectionHeight = window.innerHeight * 4
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
