'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToBooking(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToFleet(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToContact(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: solid ? 'rgba(10,5,0,0.88)' : 'transparent',
        backdropFilter: solid ? 'blur(20px)' : 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '4px',
        color: 'var(--cream)',
        textTransform: 'uppercase',
      }}>
        NS Location
      </span>

      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {['Fleet', 'Pricing', 'Contact'].map((label) => (
          <a
            key={label}
            href="#"
            className="nav-link"
            onClick={label === 'Fleet' ? scrollToFleet : label === 'Contact' ? scrollToContact : scrollToBooking}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '2px',
              color: 'var(--cream-muted)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amber)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream-muted)')}
          >
            {label}
          </a>
        ))}

        <button
          onClick={scrollToBooking}
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '12px',
            letterSpacing: '2px',
            color: 'var(--amber)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid var(--amber)',
            padding: '8px 20px',
            borderRadius: '2px',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--amber)'
            e.currentTarget.style.color = '#0A0500'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--amber)'
          }}
        >
          Book Now
        </button>
      </div>
    </nav>
  )
}
