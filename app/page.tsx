'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// These three are the ONLY ones that need ssr:false
// ScrollCanvas + TextOverlay use browser Canvas/scroll APIs
// BookingForm imports Firebase which crashes the Node build worker
const ScrollCanvas = dynamic(() => import('@/components/ScrollCanvas'), { ssr: false })
const TextOverlay = dynamic(() => import('@/components/TextOverlay'), { ssr: false })
const BookingForm = dynamic(() => import('@/components/BookingForm'), { ssr: false })

// Everything else renders normally (useEffect / window only inside effects, safe on server)
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import AboutSection from '@/components/AboutSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import OurVehicles from '@/components/OurVehicles'
import FleetSection from '@/components/FleetSection'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [selectedCar, setSelectedCar] = useState('Porsche Cayenne')

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {/* Loading screen is SSR-rendered so dark background shows on first byte */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <>
          <Navbar />

          {/* Scroll animation — 500vh/dvh */}
          <div className="scroll-outer" style={{ position: 'relative' }}>
            <div className="scroll-sticky" style={{ position: 'sticky', top: 0, zIndex: 0 }}>
              <ScrollCanvas />
              <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
                <TextOverlay />
              </div>
            </div>
          </div>

          <AboutSection />
          <WhyChooseUs />
          <OurVehicles />
          <FleetSection onBookCar={setSelectedCar} />
          <BookingForm selectedCar={selectedCar} />
          <FinalCTA />
        </>
      )}
    </>
  )
}
