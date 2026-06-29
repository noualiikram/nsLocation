export default function OurVehicles() {
  const stats = [
    { pct: '100%', label: 'Premium Vehicles', note: 'Every car hand-selected for quality, condition and luxury.' },
    { pct: '0%', label: 'Hidden Fees', note: 'The price you see is the price you pay. No surprises.' },
    { pct: '0%', label: 'Compromise', note: 'Only the finest vehicles on the finest roads.' },
  ]

  return (
    <section style={{ background: 'var(--bg-section)', padding: '120px 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '20px' }}>
          our vehicles
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 400,
          color: 'var(--cream)',
        }}>
          Nothing but the best.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="card-hover"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(201,123,26,0.15)',
              borderRadius: '4px',
              padding: '40px',
            }}
          >
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '1px solid rgba(201,123,26,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}>
              <span style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                fontSize: '22px',
                fontWeight: 500,
                color: 'var(--amber-light)',
              }}>
                {s.pct}
              </span>
            </div>
            <h3 className="font-h3" style={{ color: 'var(--cream)', marginBottom: '16px', fontSize: '24px' }}>
              {s.label}
            </h3>
            <p className="font-body" style={{ color: 'var(--cream-muted)', fontSize: '15px' }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
