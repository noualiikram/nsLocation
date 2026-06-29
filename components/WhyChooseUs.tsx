export default function WhyChooseUs() {
  return (
    <section style={{
      background: 'var(--bg-deep)',
      padding: '120px 48px',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
        fontSize: 'clamp(32px, 4vw, 52px)',
        fontWeight: 400,
        fontStyle: 'italic',
        color: 'var(--cream)',
        lineHeight: 1.2,
        whiteSpace: 'pre-line',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {`From your call\nto the road.`}
      </h2>

      <div style={{
        width: '60px',
        height: '1px',
        background: 'var(--amber)',
        margin: '48px auto 0',
      }} />

      <p className="font-body" style={{
        color: 'var(--cream-muted)',
        marginTop: '32px',
        maxWidth: '500px',
        margin: '32px auto 0',
      }}>
        We make luxury accessible. One call, one car, one unforgettable road.
      </p>
    </section>
  )
}
