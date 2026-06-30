'use client'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore'

interface Props {
  selectedCar: string
}

interface FormState {
  firstName: string
  lastName: string
  phone: string
  passport: string
  startDate: string
  endDate: string
}

interface Errors {
  firstName?: string
  lastName?: string
  phone?: string
  passport?: string
  startDate?: string
  endDate?: string
}

type AvailStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'error'

const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,123,26,0.2)',
  borderRadius: '2px',
  padding: '14px 16px',
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  fontSize: '14px',
  color: 'var(--cream)',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: 'var(--cream-muted)',
  marginBottom: '8px',
}

function validate(form: FormState): Errors {
  const errs: Errors = {}
  if (!form.firstName || form.firstName.length < 2 || !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(form.firstName))
    errs.firstName = 'First name must be at least 2 letters.'
  if (!form.lastName || form.lastName.length < 2 || !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(form.lastName))
    errs.lastName = 'Last name must be at least 2 letters.'
  if (!form.phone || !/^\d{8,}$/.test(form.phone.replace(/\s/g, '')))
    errs.phone = 'Phone must be at least 8 digits.'
  if (!form.passport || form.passport.length < 6 || !/^[a-zA-Z0-9]+$/.test(form.passport))
    errs.passport = 'Passport number must be at least 6 alphanumeric characters.'
  const today = new Date(); today.setHours(0, 0, 0, 0)
  if (!form.startDate) errs.startDate = 'Start date is required.'
  else if (new Date(form.startDate) < today) errs.startDate = 'Start date cannot be in the past.'
  if (!form.endDate) errs.endDate = 'End date is required.'
  else if (form.startDate && new Date(form.endDate) <= new Date(form.startDate))
    errs.endDate = 'End date must be after start date.'
  return errs
}

function getRateLimitKey() {
  return `ns_attempts_${new Date().toISOString().slice(0, 13)}`
}

function checkRateLimit(): boolean {
  const key = getRateLimitKey()
  const attempts = parseInt(localStorage.getItem(key) || '0', 10)
  return attempts < 3
}

function incrementAttempts() {
  const key = getRateLimitKey()
  const attempts = parseInt(localStorage.getItem(key) || '0', 10)
  localStorage.setItem(key, String(attempts + 1))
}

interface FieldProps {
  name: keyof FormState
  label: string
  type?: string
  min?: string
  form: FormState
  errs: Errors
  touched: Partial<Record<keyof FormState, boolean>>
  onChange: (field: keyof FormState, value: string) => void
  onBlur: (field: keyof FormState) => void
}

// Defined outside BookingForm so React keeps the same component identity across
// re-renders — defining it inside the render function recreated it every keystroke,
// which remounted the underlying <input> DOM node and dropped focus after each letter.
function Field({ name, label, type = 'text', min, form, errs, touched, onChange, onBlur }: FieldProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={LABEL_STYLE}>{label}</label>
      <input
        type={type}
        min={min}
        value={form[name]}
        onChange={e => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        style={{
          ...FIELD_STYLE,
          borderColor: touched[name] && errs[name] ? '#ef4444' : 'rgba(201,123,26,0.2)',
          colorScheme: 'dark',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--amber)')}
      />
      {touched[name] && errs[name] && (
        <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', fontFamily: 'Inter, sans-serif' }}>
          {errs[name]}
        </p>
      )}
    </div>
  )
}

export default function BookingForm({ selectedCar }: Props) {
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', phone: '', passport: '', startDate: '', endDate: '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<AvailStatus>('idle')
  const [rateLimited, setRateLimited] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const errs = validate(form)
  const isValid = Object.keys(errs).length === 0

  function handleChange(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setStatus('idle')
  }

  function handleBlur(field: keyof FormState) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  async function handleBook() {
    setTouched({ firstName: true, lastName: true, phone: true, passport: true, startDate: true, endDate: true })
    if (!isValid) return

    if (!checkRateLimit()) {
      setRateLimited(true)
      return
    }
    incrementAttempts()

    setStatus('checking')

    try {
      const start = new Date(form.startDate)
      const end = new Date(form.endDate)

      const q = query(
        collection(db, 'reservations'),
        where('carName', '==', selectedCar),
        where('status', '!=', 'cancelled')
      )

      const snapshot = await getDocs(q)
      let overlap = false

      snapshot.forEach(doc => {
        const data = doc.data()
        const existStart = data.startDate?.toDate?.() || new Date(data.startDate)
        const existEnd = data.endDate?.toDate?.() || new Date(data.endDate)
        if (start < existEnd && end > existStart) {
          overlap = true
        }
      })

      setStatus(overlap ? 'unavailable' : 'available')
    } catch (err) {
      setStatus('error')
    }
  }

  async function handleConfirm() {
    try {
      await addDoc(collection(db, 'reservations'), {
        carName: selectedCar,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        passportNumber: form.passport,
        startDate: Timestamp.fromDate(new Date(form.startDate)),
        endDate: Timestamp.fromDate(new Date(form.endDate)),
        status: 'confirmed',
        createdAt: Timestamp.now(),
      })
      setShowConfirm(true)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <>
      <section id="booking" style={{ background: 'var(--bg-deep)', padding: '120px 48px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="font-caption" style={{ color: 'var(--amber)', marginBottom: '16px' }}>reservations</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 300,
              color: 'var(--cream)',
            }}>
              Book Your Car
            </h2>
          </div>

          {/* Selected car display */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(201,123,26,0.3)',
            borderRadius: '4px',
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 14L4 8H16L18 14H2Z" stroke="#C97B1A" strokeWidth="1.2" fill="none" />
              <circle cx="6" cy="14" r="1.5" stroke="#C97B1A" strokeWidth="1.2" fill="none" />
              <circle cx="14" cy="14" r="1.5" stroke="#C97B1A" strokeWidth="1.2" fill="none" />
            </svg>
            <div>
              <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--cream-muted)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                Selected vehicle
              </span>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '20px', color: 'var(--cream)', fontWeight: 400 }}>
                {selectedCar || 'Please select a car from the fleet above'}
              </p>
            </div>
          </div>

          {rateLimited && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '16px', marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                Too many attempts. Please try again later.
              </p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }} className="form-grid">
            <Field name="firstName" label="First Name" form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />
            <Field name="lastName" label="Last Name" form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <Field name="phone" label="Phone Number" type="tel" form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />
          <Field name="passport" label="Passport Number" form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }} className="form-grid">
            <Field name="startDate" label="Start Date" type="date" min={new Date().toISOString().split('T')[0]} form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />
            <Field name="endDate" label="End Date" type="date" min={form.startDate || new Date().toISOString().split('T')[0]} form={form} errs={errs} touched={touched} onChange={handleChange} onBlur={handleBlur} />
          </div>

          <button
            className="btn-amber"
            onClick={handleBook}
            disabled={!selectedCar || rateLimited}
            style={{
              width: '100%',
              opacity: !selectedCar || rateLimited ? 0.5 : 1,
              pointerEvents: !selectedCar || rateLimited ? 'none' : 'all',
            }}
          >
            {status === 'checking' ? 'Checking availability…' : 'Check Availability'}
          </button>

          {/* Availability status */}
          {status === 'available' && (
            <div style={{ marginTop: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '4px',
                marginBottom: '20px',
              }}>
                <span style={{ color: '#22c55e', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#22c55e', fontFamily: 'Inter, sans-serif', fontSize: '14px', letterSpacing: '1px' }}>
                  Available
                </span>
              </div>
              <button className="btn-amber" onClick={handleConfirm} style={{ width: '100%' }}>
                Confirm Booking
              </button>
            </div>
          )}

          {status === 'unavailable' && (
            <div style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '4px',
            }}>
              <span style={{ color: '#ef4444', fontSize: '18px' }}>✕</span>
              <span style={{ color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                Not available, please enter another date.
              </span>
            </div>
          )}

          {status === 'error' && (
            <div style={{ marginTop: '32px', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '14px', textAlign: 'center' }}>
              Something went wrong. Please try again.
            </div>
          )}
        </div>

      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false) }}
        >
          <div className="modal-card" style={{
            background: '#1E0F00',
            border: '1px solid var(--amber)',
            borderRadius: '4px',
            padding: '60px 48px',
            maxWidth: '560px',
            width: '100%',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '24px', fontSize: '32px' }}>✦</div>

            <h3 style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: '32px',
              fontWeight: 400,
              color: 'var(--cream)',
              marginBottom: '24px',
            }}>
              Your car is booked.
            </h3>

            <p className="font-body" style={{ color: 'var(--cream-muted)', marginBottom: '32px', lineHeight: 1.8 }}>
              Thank you! Your car is booked. Please come to:
              <br />
              <strong style={{ color: 'var(--amber-light)', display: 'block', marginTop: '12px', fontSize: '16px' }}>
                Local N02 RDC Lots. Bouzar Section 96 G/P 167 Lot. 02 Tizi-Ouzou
              </strong>
              <br />
              to pick up your car and validate your payment.
              <br /><br />
              <span style={{ color: 'var(--amber)', fontSize: '13px', letterSpacing: '1px' }}>
                nslocation2026@gmail.com
              </span>
            </p>

            <button
              className="btn-amber"
              onClick={() => setShowConfirm(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  )
}
