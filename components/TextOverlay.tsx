'use client'
import { useScrollProgress } from '@/hooks/useScrollProgress'

function fade(progress: number, start: number, end: number, fadeRange = 0.04): number {
  if (progress < start) {
    const t = (progress - (start - fadeRange)) / fadeRange
    return Math.max(0, Math.min(1, t))
  }
  if (progress > end) {
    const t = 1 - (progress - end) / fadeRange
    return Math.max(0, Math.min(1, t))
  }
  return 1
}

export default function TextOverlay() {
  const progress = useScrollProgress()

  const s1 = fade(progress, 0, 0.22)
  const s2 = fade(progress, 0.30, 0.55)
  const s3 = fade(progress, 0.60, 0.78)
  const s4 = fade(progress, 0.84, 1.0)

  const base: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 10,
    transition: 'opacity 0.3s ease',
  }

  function scrollToBooking() {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Section 1 — bottom-left */}
      <div style={{ ...base, bottom: '15%', left: '5%', right: '5%', opacity: s1 }}>
        <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
          premium rental
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(48px, 6vw, 84px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.0,
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #FFF8E7 0%, #C97B1A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          whiteSpace: 'pre-line',
        }}>
          {`Drive.\nExcellence.`}
        </h1>
        <p className="font-body" style={{ color: 'var(--cream-muted)', marginTop: '24px', maxWidth: 'min(340px, 85vw)' }}>
          Exceptional vehicles. An unforgettable experience.
        </p>
      </div>

      {/* Section 2 — top-right */}
      <div style={{ ...base, top: '18%', right: '5%', maxWidth: 'min(400px, 90vw)', opacity: s2, textAlign: 'right' }}>
        <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
          the prestige moment
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(44px, 5.5vw, 76px)',
          fontWeight: 400,
          lineHeight: 1.05,
          color: 'var(--cream)',
          whiteSpace: 'pre-line',
        }}>
          {`Worthy\nRoad.`}
        </h2>
        <p className="font-body" style={{ color: 'var(--cream-muted)', marginTop: '24px', maxWidth: '320px', marginLeft: 'auto' }}>
          100% insured. Ready to hit the road.
        </p>
      </div>

      {/* Section 3 — center */}
      <div style={{ ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: s3, textAlign: 'center' }}>
        <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
          back to perfection
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(50px, 6.5vw, 92px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.05,
          background: 'linear-gradient(135deg, #C97B1A 0%, #F0A830 50%, #FFF8E7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          whiteSpace: 'pre-line',
        }}>
          {`The Road\nReimagined.`}
        </h2>
        <p className="font-body" style={{ color: 'var(--cream-muted)', marginTop: '24px' }}>
          Every ride an experience.
        </p>
      </div>

      {/* Section 4 — center CTA */}
      <div style={{ ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: s4, textAlign: 'center', pointerEvents: s4 > 0.5 ? 'all' : 'none' }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(52px, 6.5vw, 96px)',
          fontWeight: 300,
          lineHeight: 1.05,
          color: 'var(--cream)',
        }}>
          Take the wheel.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '15px',
          color: 'var(--cream-muted)',
          marginTop: '20px',
          marginBottom: '40px',
        }}>
          Best prices. Premium fleet. Available now.
        </p>
        <button
          className="btn-amber"
          onClick={scrollToBooking}
          style={{ pointerEvents: 'all' }}
        >
          Rent your car now →
        </button>
      </div>
    </>
  )
}
