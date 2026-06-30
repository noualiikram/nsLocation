'use client'

export default function FinalCTA() {
  function scrollToBooking() {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      background: 'linear-gradient(180deg, #140A00, #0A0500)',
      padding: '160px 48px',
      textAlign: 'center',
    }}>
      <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '24px' }}>
        NS Location
      </p>
      <h2 style={{
        fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
        fontSize: 'clamp(44px, 6vw, 80px)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--cream)',
        marginBottom: '40px',
      }}>
        NS Location. Perfect Roads.
      </h2>
      <p className="font-body" style={{ color: 'var(--cream-muted)', marginBottom: '48px' }}>
        NS Location. Every ride. An experience.
      </p>
      <button className="btn-amber" onClick={scrollToBooking}>
        Rent your car now →
      </button>

      <div style={{
        marginTop: '120px',
        paddingTop: '40px',
        borderTop: '1px solid rgba(201,123,26,0.12)',
      }}>
        {/* Contact block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '32px',
        }}>
          <span style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '12px',
            letterSpacing: '3px',
            color: 'var(--cream-muted)',
            textTransform: 'uppercase',
          }}>
            NS Location
          </span>
          <a
            href="mailto:nslocation2026@gmail.com"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '1px',
              color: 'var(--amber)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amber-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amber)')}
          >
            nslocation2026@gmail.com
          </a>
          <span style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--cream-muted)',
            letterSpacing: '0.5px',
          }}>
            Local N02 RDC Lots. Bouzar Section 96 G/P 167 Lots. 02 Tizi-Ouzou
          </span>
          <a
            href="tel:+213557665769"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--cream-muted)',
              textDecoration: 'none',
              letterSpacing: '1px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amber)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream-muted)')}
          >
            +213 557665769
          </a>
        </div>

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '12px',
          color: 'rgba(200,168,122,0.4)',
          textAlign: 'center',
        }}>
          © {new Date().getFullYear()} NS Location. All rights reserved.
        </p>
      </div>
    </section>
  )
}
