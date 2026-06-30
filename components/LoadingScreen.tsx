'use client'
import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 304

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const loadedRef = useRef(0)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const frameStep = isMobile ? 2 : 1
    const frames: HTMLImageElement[] = []
    let loaded = 0
    const toLoad: number[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      toLoad.push(i)
    }

    const total = toLoad.length

    const finish = () => {
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 800)
      }, 300)
    }

    toLoad.forEach((frameNum) => {
      const img = new Image()
      const num = String(frameNum).padStart(4, '0')
      // Cache-busting query: frame URLs are served with immutable 1-year caching,
      // so changing the video (same filenames) needs a new query key to force re-fetch
      img.src = `/frames/frame_${num}.webp?v=2`
      img.onload = img.onerror = () => {
        loaded++
        loadedRef.current = loaded
        const p = Math.round((loaded / total) * 100)
        setPct(p)
        if (loaded >= total) finish()
      }
      frames.push(img)
    })

    // expose frames globally for ScrollCanvas (set immediately so canvas can access them when loaded)
    ;(window as any).__frames__ = frames

    // Safety timeout: if frames stall for any reason, proceed after 15s
    const timeout = setTimeout(() => {
      if (!done) finish()
    }, 15000)

    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        // Hardcoded fallback + CSS variable — works even if stylesheet hasn't applied yet
        backgroundColor: '#0A0500',
        background: 'var(--bg-deep, #0A0500)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: done ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        letterSpacing: '6px',
        color: '#C97B1A',
        textTransform: 'uppercase',
        marginBottom: '32px',
      }}>
        NS Location
      </span>

      <div style={{
        width: '200px',
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #C97B1A, #F0A830)',
          transition: 'width 0.1s ease',
        }} />
      </div>

      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        color: '#C8A87A',
        marginTop: '16px',
        letterSpacing: '1px',
      }}>
        {pct}%
      </span>
    </div>
  )
}
