export default function AboutSection() {
  const columns = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 24L16 8L28 24H4Z" stroke="#C97B1A" strokeWidth="1.5" fill="none" />
          <circle cx="16" cy="18" r="3" stroke="#C97B1A" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      label: 'PREMIUM FLEET',
      heading: 'Luxury Vehicles',
      body: 'Hand-selected cars maintained to perfection. Every vehicle is a statement.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="#C97B1A" strokeWidth="1.5" fill="none" />
          <path d="M10 16L14 20L22 12" stroke="#C97B1A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'INSURANCE INCLUDED',
      heading: 'Fully Insured',
      body: 'Complete insurance coverage included with every rental. Drive with total peace of mind.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#C97B1A" strokeWidth="1.5" fill="none" />
          <path d="M16 8V16L21 21" stroke="#C97B1A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'AVAILABLE',
      heading: 'Ready Now',
      body: 'Book today, drive today. Our fleet is ready when you are — no waiting, no delays.',
    },
  ]

  return (
    <section
      id="about"
      style={{ background: 'var(--bg-section)', padding: '120px 48px' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {columns.map((col, i) => (
          <div
            key={i}
            className="about-col"
            style={{
              padding: '60px 48px',
              borderRight: i < 2 ? '1px solid rgba(201,123,26,0.12)' : 'none',
              borderLeft: i === 0 ? '1px solid rgba(201,123,26,0.12)' : 'none',
            }}
          >
            <div style={{ marginBottom: '24px' }}>{col.icon}</div>
            <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
              {col.label}
            </p>
            <h3 className="font-h3" style={{ color: 'var(--cream)', marginBottom: '16px' }}>
              {col.heading}
            </h3>
            <p className="font-body" style={{ color: 'var(--cream-muted)' }}>
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
