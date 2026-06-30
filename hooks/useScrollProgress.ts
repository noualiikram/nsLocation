'use client'
import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    let lastProgress = 0

    function update() {
      const scrollTop = window.scrollY
      // Read actual rendered height of the scroll container so any CSS unit
      // (vh, dvh, px) is handled correctly — avoids drift when mobile browser
      // toolbar shows/hides and window.innerHeight changes after layout.
      const el = document.querySelector<HTMLElement>('.scroll-outer')
      const sectionHeight = el
        ? el.offsetHeight - window.innerHeight
        : window.innerHeight * 4
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
