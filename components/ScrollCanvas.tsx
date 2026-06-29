'use client'
import { useEffect, useRef } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const TOTAL_FRAMES = 315

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const rafRef = useRef<number>(0)
  const lastFrameRef = useRef<number>(-1)
  const progress = useScrollProgress()

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      renderFrame(lastFrameRef.current)
    }

    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Pick up preloaded frames from LoadingScreen
  useEffect(() => {
    function tryGetFrames() {
      const frames = (window as any).__frames__ as HTMLImageElement[] | undefined
      if (frames && frames.length > 0) {
        imagesRef.current = frames
      } else {
        setTimeout(tryGetFrames, 100)
      }
    }
    tryGetFrames()
  }, [])

  function renderFrame(frameIndex: number) {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    const imgs = imagesRef.current
    if (!imgs.length) return

    const idx = Math.max(0, Math.min(imgs.length - 1, frameIndex))
    const img = imgs[idx]
    if (!img || !img.complete || img.naturalWidth === 0) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Cover the canvas
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const x = (canvas.width - w) / 2
    const y = (canvas.height - h) / 2

    ctx.drawImage(img, x, y, w, h)
    lastFrameRef.current = idx
  }

  // Drive frame from scroll progress
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const frameStep = isMobile ? 2 : 1
    const availableFrames = Math.ceil(TOTAL_FRAMES / frameStep)

    const targetFrame = Math.floor(progress * (availableFrames - 1))

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      renderFrame(targetFrame)
    })
  }, [progress])

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      height: '100vh',
      background: 'var(--bg-deep)',
      overflow: 'hidden',
    }}>
      {/* Warm amber glow behind canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,123,26,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          zIndex: 2,
        }}
      />
    </div>
  )
}
