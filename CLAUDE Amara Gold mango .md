# CLAUDE.md — NS Location Project Context

## Project Overview

**NS Location** is a luxury scroll-animation website for a premium car rentall company.

- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, HTML5 Canvas API
- No Three.js. No GSAP. Canvas only.
- Fonts: Cormorant Garamond (headings) + Inter (body) from Google Fonts
- Deploy target: Vercel

---

## Brand Identity

| Key         | Value                                                                  |
| Name        | NS Location                                                             |
| Tagline     | NS Location. Perfect Roads.                                          |
| Sub-tagline | NS Location. Every ride. An experience.                          |
| Aesthetic   | Porsche meets Range-Rover meets Hertz Premium — élegant, puissant, cinematic        |
| Feel        | Assis dans une voiture de luxe sur une route vide au coucher de soleil. Libre, premium, inoubliable. |

---

## Color System

--bg-deep: #0d0102;        /* near-black warm amber — main background */
--bg-section: #140A00;     /* deep warm black */
--bg-card: #1E0F00;        /* card background */
--amber: #C97B1A;          /* deep amber — primary accent */
--amber-light: #F0A830;    /* bright mango gold — glows and highlights */
--saffron: #FFD166;        /* saffron yellow — highlight accent */
--cream: #FFF8E7;          /* warm cream — primary text */
--cream-muted: #C8A87A;    /* warm tan — secondary text */
--gradient-hero: linear-gradient(180deg, #0A0500 0%, #140A00 50%, #0A0500 100%);
--gradient-gold: linear-gradient(135deg, #C97B1A 0%, #F0A830 50%, #C97B1A 100%);
--gradient-text: linear-gradient(135deg, #FFF8E7 0%, #C97B1A 40%, #F0A830 100%);

---

## Typography System

### Google Fonts Import (in layout.tsx)
- Cormorant Garamond: weights 300, 400, 500, 600, 700 (include italic variants)
- Inter: weights 300, 400, 500

### Scale (desktop)

| Role    | Size  | Weight | Letter-spacing | Font                      | Notes        |
| Display | 100px | 300    | -2px           | Cormorant Garamond italic | Hero/CTA     |
| H1      | 76px  | 300    | -1.5px         | Cormorant Garamond        |              |
| H2      | 52px  | 400    | -1px           | Cormorant Garamond        |              |
| H3      | 32px  | 500    | ---            | Cormorant Garamond        |              |
| Body    | 16px  | 300    | ---            | Inter                     | line-height 1.85 |
| Caption | 11px  | 400    | 4px            | Inter                     | UPPERCASE    |
| CTA     | 13px  | 500    | 3px            | Inter                     | UPPERCASE    |

---

## Scroll Animation Architecture

### Source
- Video file: scroll-animation.mp4 in project root
- Extract frames: ffmpeg -i scroll-animation.mp4 -vf fps=30 public/frames/frame_%04d.webp
- Output format: .webp to /public/frames/

### Canvas Setup
- Full viewport, position: sticky, background #0A0500
- Total scroll height: 500vh
- Frame driven by scroll progress (0–1)
- Warm amber radial glow behind canvas: radial-gradient(rgba(201,123,26,0.07) at center) — gives the bottle a sun-warmed emanation

### 3-Act Story

| Act | Scroll % | Scene                                                          |
| 1   | 0–28%    | Premium Car, parked, sealed, glowing under cold blue light |
| 2   | 30–68%   | Car turns → luxury interior revealed → front end appears    |
| 3   | 72–100%  | Car turns back → rotates → returns to its first position |

---

## Text Overlay Specs

### Section 1 — Cold Pressed (visible 0%–22%)
- Position: bottom-left, 10% from left, 15% from bottom
- Label: premium rental — 11px Inter, letter-spacing 4px, color #C97B1A, uppercase
- Headline: "Drive.\nExellence." — 84px Cormorant Garamond, weight 300, italic, gradient text #FFF8E7 → #C97B1A, line-height 1.0
- Subtext: "Exceptional vehicules. An unforgettable experience." — 16px Inter weight 300, color #C8A87A, margin-top 24px

### Section 2 — The Burst (visible 30%–55%)
- Position: top-right, 8% from right, 18% from top
- Label: THE PRESTIGE MOMENT — same label style
- Headline: "Worthy\nRoad." — 76px Cormorant Garamond, weight 400, color #FFF8E7
- Subtext: "100% insured. Ready to hit the road." — same subtext style, color #C8A87A

### Section 3 — The Return (visible 60%–78%)
- Position: center, perfectly centered horizontally
- Label: BACK TO PERFECTION — centered
- Headline: "The Road\nReimagined." — 92px Cormorant Garamond, weight 300, italic, gradient #C97B1A → #F0A830 → #FFF8E7, centered
- Subtext: "Every ride an experience." — centered, color #C8A87A

### Section 4 — CTA (visible 84%–100%)
- Position: perfectly centered
- Headline: "Take the wheel." — 96px Cormorant Garamond, weight 300, color #FFF8E7, centered
- Subtext: "Best prices. Premium fleet. Available now." — 15px Inter, color #C8A87A, centered
- CTA Button:
  Text: Rent your car now →
  13px Inter, weight 500, letter-spacing 3px
  Background: linear-gradient(135deg, #C97B1A, #F0A830)
  Color: #0A0500
  Padding: 18px 52px
  Border-radius: 0px (sharp — luxury)
  Hover: scale(1.03) with 0.3s ease
  Box-shadow: 0 0 50px rgba(201, 123, 26, 0.45)

---

## Navbar

- Fixed, full width, initially transparent
- After scroll past 100px: background: rgba(10,5,0,0.88), backdrop-filter: blur(20px)
- Left: AMARA GOLD — 13px Inter, weight 500, letter-spacing 4px, color #FFF8E7
- Right links: Fleet Pricing Contact — 12px Inter, letter-spacing 2px, color #C8A87A, hover → #C97B1A with 0.3s transition
- Far right pill: BOOK NOW
  Border: 1px solid #C97B1A, color #C97B1A, padding 8px 20px, border-radius 2px
  Hover: background #C97B1A, color #0A0500

---

## Loading Screen

- Background: #0A0500
- Center: AMARA GOLD — 14px Inter, letter-spacing 6px, color #C97B1A
- Progress bar: 200px wide, 1px height
  Track: rgba(255,255,255,0.08)
  Fill: linear-gradient(90deg, #C97B1A, #F0A830)
- Below bar: percentage counter — 11px Inter, color #C8A87A
- Dismiss: 0.8s opacity fade when frames fully loaded
- Site does not render until 100% of frames are preloaded

---

## Below-Fold Sections

### About Us
- Background: #140A00, full bleed
- 3 columns: PREMIUM FLEET / INSURANCE INCLUDED / AVAILABLE
  Each: amber SVG icon, 11px amber label, 26px Cormorant Garamond heading, 15px Inter body in #C8A87A
- Column dividers: 1px solid rgba(201,123,26,0.12)

### Why Choose us
- Background: #0A0500, full bleed
- Centered quote: "From your call\nto the road." — 52px Cormorant Garamond italic, color #FFF8E7, centered
- Amber divider: 60px wide, 1px, centered, color #C97B1A

### Our Vehicules
- Background: #140A00
- 3 floating cards:
  Card bg: #1E0F00, border: 1px solid rgba(201,123,26,0.15), border-radius 4px, padding 40px
  Each: amber percentage circle, ingredient name in Cormorant Garamond, note in Inter
  Labels: 100% premium vehicles / 0% hidden fees / 0% fair
  Hover: border-color rgba(201,123,26,0.5), translateY(-4px) with transition

 ---

## Fleet Section

- Background: #140A00, full bleed
- Title: "Our Fleet" - 76px Cormorant Garamond, weight 300, italic, gradient #FFF8E7 → #C97B1A, centered
- Subtitle: "Choose your experience." - 16px Inter, color #C8A87A, centered
- Grid: 3 columns (desktop), 1 column (mobile)

### Cars List:
1. Trok 2026
2. Trok 1.0
3. Porsche Cayenne
4. Range Rover Sport
5. Range Rover Velar
6. Skoda Kamiq
7. Skoda Fabia

### Each Car Card
- Card bg: #1E0F00,  border: 1px solid rgba(201,123,26,0,15), border-radius 4px, padding 32px 
- Top: car photo
- Car name: 26px Cormorant Garamond, color #FFF8E7 
- Category label: 11px Inter, letter-spacing 4px, UPPERCASE, color #C8A87A 
- "Rent Now" button: same amber CTA button style 
- Hover: border-color rgba(201,123,26,0.5), translateY(-4px) with transition
### Car Cards Interaction

 - Each card displays: car photo, car name, price per day in € and DZD
 - Photo: placeholder image named "car-placeholder.png"
 - Price format: "XX / XX DZD — per day"
 - "Book Now" button: on click → smooth scroll to booking form below

 ### Cars Data:
 1. Trok 2026 | photo: trok2026.jpg | price: 654.5 € / 18000 DZD 
 2. Trok 1.0 | photo: trok1.0.jpg | price: 436.3 € / 12000 DZD
 3. Porsche Cayenne | photo: porsche.jpg | price 1818 € / 50000 DZD
 4. Range Rover Sport | photo: range_rover_sport.jpg | price 1818 € / 50000 DZD
 5. Range Rover Velar | photo: range_rover_velar.jpg | price 1818 € / 50000 DZD
 6. Skoda Kamiq | photo: skoda_kamiq.jpg | price 363 € / 10000 DZD
 7. Skoda Fabia | photo: skoda_fabia.jpg | price 290.9 € / 8000 DZD

 ### Booking Form

 - Title: "Book Your Car" — same heading style as other sections
 - Fields: First name | Last Name | Phone Number | Passport Number
 - Date: Start Date picker + End Date Picker (calendar style)
 - Selected car name shown at top of form (auto-filled when clicking book now)
 - Submit button: "book" — same amber CTA style

 ### Booking Logic:
 - On "Book" click → check car availability for selected dates
 - If "AVAILABLE" → show green label: "Availabel" + " Confirm Booking" button
 - If NOT AVAILABLE → show red label: "Not available, please enter another date"
 - On "Confirm booking" click → show confirmation modal

 ### Confirmation Modal:
 - Text: "Thank you! Your car is booked. Please come to: [Local N02 RDC Lots. Bouzar Section 96 G/P 167 Lot. 02 Tizi-Ouzou] to pick up your car and validate your paiement."
 - Email: nslocation2026@gmail.com
 - Button: "Done" — on click → modal disappears, stays on website
 - Modal style: dark overlay rgba(0,0,0,0.85), card bg #1EF0F00, border 1px solid #C97B1A 

 ---
### Final CTA Section
- Background: linear-gradient(180deg, #140A00, #0A0500)
- Centered "Taste the Gold." heading
- Same amber CTA button as scroll overlay

---

## Micro-Details (Non-Negotiable)

### Grain Texture Overlay
/* Full page, pointer-events: none, z-index top */
/* SVG feTurbulence filter noise */
opacity: 0.04;
position: fixed;
inset: 0;
pointer-events: none;

### Scroll Progress Bar
- position: fixed, top 0, left 0
- height: 1px, background: linear-gradient(90deg, #C97B1A, #F0A830)
- Width driven by window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100

### Custom Cursor
- Inner: 8px filled circle, color #C97B1A
- Outer: 28px ring, border: 1px solid #C97B1A, follows with ~100ms lag
- On CTA hover: outer ring scales to 48px

### Warm Amber Canvas Glow
- radial-gradient(rgba(201,123,26,0.07) at center) positioned behind canvas
- Gives the mango bottle a sun-warmed tropical emanation

### Page Transition
- Fade in on load: opacity 0 → 1 over 0.7s

---

## Performance Rules

- Preload ALL frames before showing any content
- Use requestAnimationFrame for canvas rendering — never setInterval
- Mobile (< 768px): skip every 2nd frame
- Cache frames: source '/frames/:path*', Cache-Control: public, max-age=31536000, immutable
- All frame images must be .webp

---

## SEO & Metadata

title: 'NS Location — Premium Cars. Perfect Roads.'
description: 'premium car rental. Available now.'
themeColor: '#0A0500'
openGraph.images: ['/frames/frame_0001.webp']

---

## File Structure Reference

/
├── public/
│   └── frames/                    ← .webp frames extracted from video
├── app/
│   ├── layout.tsx                 ← fonts, metadata, grain overlay, cursor
│   ├── page.tsx                   ← main scroll page
│   └── globals.css                ← CSS variables, base resets
├── components/
│   ├── Navbar.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollCanvas.tsx           ← Canvas + frame animation + amber glow
│   ├── TextOverlay.tsx            ← Section text with opacity transitions
│   ├── OriginSection.tsx
│   ├── ProcessQuote.tsx
│   ├── IngredientsSection.tsx
│   └── FinalCTA.tsx
├── hooks/
│   └── useScrollProgress.ts
├── scroll-animation.mp4
└── next.config.js

---

## Claude Code Behavior Rules

- Never use Three.js, GSAP, Framer Motion, or any animation library — Canvas + CSS only
- Every color must reference the CSS variable system above — no hardcoded hex in components
- Tailwind for layout/spacing only; typography and color styles via CSS variables
- Always build mobile-responsive (frame-skip logic on < 768px)
- Prioritize perceived performance: loading screen → instant canvas → lazy below-fold sections
- The warm amber canvas glow is mandatory — it is central to the "golden hour mango grove" atmosphere
- Every section must feel warm, tropical, and crave-inducing — check the design philosophy before writing any new component

---

## Firebase Configuration

- projectId: "nouali-smail-voitures1"
- authDomain: "nouali-smail-voitures1.firebaseapp.com"
- apiKey: "AIzaSyBIXzS-6O20Z-RVxAQeVZR1Pf6yIlV054A"
- storageBucket: "nouali-smail-voitures1.firebasestorage.app"
- messagingSenderId: "601908734123"
- appId: "1:601908734123:web:ed0a32a3e0b4e40ae3efee"

### Firestore Rules:
- Collection: "reservations"
- Fields per booking: carName, lastName, phone, passportNumber, startDate, endDate, status
- Availability check: query reservations where carName matches AND dates overlap
- If no overlap found → show green label: "Available" + "Confirm Booking" button
- If overlap found → show red label: "Not available, please enter another date"
---

## Security Rules

### Firebase Firestore Rules:
- Only allow create if all required fields are present
- Required fields: carName, firstName, lastName, phone, passportNumber, startDate, endDate
- Allow read to check availability (public read on reservations)
- Never allow delete or update from client side
- Only allow write from the website booking form

### API Key Protection (.env file):
- Store all Firebase keys in .env.local file (never commit to Github)
- Variable names must start with NEXT_PUBLIC_
- NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBIXzS-6O20Z-RVxAQeVZR1Pf6yIlV054A"
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="nouali-smail-voitures1.firebaseapp.com"
- NEXT_PUBLIC_FIREBASE_PROJECT_ID="nouali-smail-voitures1"
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= "nouali-smail-voitures1.firebasestorage.app"
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER ID="601908734123"
- NEXT_PUBLIC_FIREBASE_APP ID="1:601908734123:web:ed0a32a3e0b4e40ae3efee"
- Add .env.local to .gitignore file

### Form Validation:
- First name: required, minimum 2 characters, letters only
- Last name: required, minimum 2 characters, letters only
- Phone number: required, numbers only, minimum 8 digits
- Passport number: required, minimum 6 characters, alphaneumeric
- Start date: required, cannot be in the past
- End date: required, must be after start date
- Show red error message under each field if invalid
- Disable "Book" button untill all fields are valid

### Rate Limiting:
- Maximum 5 booking attempts per IP address per hour
- If limit exceeded → show message: "Too many attempts. Please try again later."
- Use Vercel Edge middleware for rate limiting

---