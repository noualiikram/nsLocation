import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NS Location — NS Location. Perfect Roads.',
  description: 'Premium car rental. Available now.',
  metadataBase: new URL('https://ns-location.vercel.app'),
  openGraph: {
    images: ['/frames/frame_0001.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0500',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <style>{`
          body { font-family: var(--font-inter), sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: var(--font-cormorant), serif; }
        `}</style>
      </head>
      <body style={{ backgroundColor: '#0A0500' }}>
        {/* Grain overlay */}
        <div id="grain-overlay" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>

        {/* Custom cursor */}
        <div id="cursor-inner" />
        <div id="cursor-outer" />

        {/* Scroll progress bar */}
        <div id="scroll-progress" style={{ width: '0%' }} />

        <div id="page-wrapper">
          {children}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var inner = document.getElementById('cursor-inner');
            var outer = document.getElementById('cursor-outer');
            var outerX = 0, outerY = 0;
            var mouseX = 0, mouseY = 0;

            document.addEventListener('mousemove', function(e) {
              mouseX = e.clientX;
              mouseY = e.clientY;
              inner.style.left = e.clientX + 'px';
              inner.style.top = e.clientY + 'px';
            });

            function animateOuter() {
              outerX += (mouseX - outerX) * 0.15;
              outerY += (mouseY - outerY) * 0.15;
              outer.style.left = outerX + 'px';
              outer.style.top = outerY + 'px';
              requestAnimationFrame(animateOuter);
            }
            animateOuter();

            document.addEventListener('mouseover', function(e) {
              var el = e.target;
              if (el && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.classList.contains('btn-amber'))) {
                outer.classList.add('expanded');
              } else {
                outer.classList.remove('expanded');
              }
            });

            // Scroll progress
            var progressBar = document.getElementById('scroll-progress');
            function updateProgress() {
              var scrollTop = window.scrollY;
              var docHeight = document.body.scrollHeight - window.innerHeight;
              var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
              progressBar.style.width = pct + '%';
            }
            window.addEventListener('scroll', updateProgress, { passive: true });
          })();
        `}} />
      </body>
    </html>
  )
}
