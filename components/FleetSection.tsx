'use client'

const CARS = [
  { name: 'Trok 2026', photo: '/images/trok2026.jpg', category: 'Premium SUV', price: '654.5 € / 18 000 DZD' },
  { name: 'Trok 1.0', photo: '/images/trok1.0.jpg', category: 'Compact SUV', price: '436.3 € / 12 000 DZD' },
  { name: 'Porsche Cayenne', photo: '/images/porsche.jpg', category: 'Luxury Sport', price: '1 818 € / 50 000 DZD' },
  { name: 'Range Rover Sport', photo: '/images/range_rover_sport.jpg', category: 'Luxury SUV', price: '1 818 € / 50 000 DZD' },
  { name: 'Range Rover Velar', photo: '/images/range_rover_velar.jpg', category: 'Premium SUV', price: '1 818 € / 50 000 DZD' },
  { name: 'Skoda Kamiq', photo: '/images/skoda_kamiq.jpg', category: 'Compact SUV', price: '363 € / 10 000 DZD' },
  { name: 'Skoda Fabia', photo: '/images/skoda_fabia.jpg', category: 'Compact', price: '290.9 € / 8 000 DZD' },
]

interface Props {
  onBookCar: (carName: string) => void
}

export default function FleetSection({ onBookCar }: Props) {
  return (
    <section id="fleet" style={{ background: 'var(--bg-section)', padding: '120px 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(44px, 5.5vw, 76px)',
          fontWeight: 300,
          fontStyle: 'italic',
          background: 'linear-gradient(135deg, #FFF8E7 0%, #C97B1A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
        }}>
          Our Fleet
        </h2>
        <p className="font-body" style={{ color: 'var(--cream-muted)' }}>
          Choose your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {CARS.map((car) => (
          <div
            key={car.name}
            className="card-hover"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(201,123,26,0.15)',
              borderRadius: '4px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              borderRadius: '2px',
              marginBottom: '24px',
              background: 'rgba(201,123,26,0.05)',
            }}>
              <img
                src={car.photo}
                alt={car.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>

            <p className="font-caption" style={{ color: 'var(--cream-muted)', marginBottom: '8px' }}>
              {car.category}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: '26px',
              fontWeight: 500,
              color: 'var(--cream)',
              marginBottom: '8px',
            }}>
              {car.name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '14px',
              color: 'var(--amber-light)',
              marginBottom: '24px',
              letterSpacing: '1px',
            }}>
              {car.price} — per day
            </p>

            <button
              className="btn-amber"
              onClick={() => {
                onBookCar(car.name)
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '14px 32px', fontSize: '12px' }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
