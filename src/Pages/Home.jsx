import { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match,
//     or update the filenames below to match your files.
// ─────────────────────────────────────────────────────────
import heroImg  from '../assets/home-hero.png'       // couple hero photo
import venueImg from '../assets/section1.png'      // venue / conservatory
import moment1  from '../assets/pic1.png'   // pre-wedding photo 1
import moment2  from '../assets/ourservices.png'   // pre-wedding photo 2
import moment3  from '../assets/secondservice.png'   // pre-wedding photo 3
import moment4  from '../assets/one.png'   // pre-wedding photo 4
import moment5  from '../assets/pic1.png'   // pre-wedding photo 5
import moment6  from '../assets/ourservices.png'   // pre-wedding photo 6
import moment7  from '../assets/ourservices.png'   // pre-wedding photo 7
import moment8  from '../assets/ourservices.png'   // pre-wedding photo 8

// ── Countdown ──────────────────────────────────────────────
function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-5xl lg:text-7xl text-[#0F0F0F] tracking-tight leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#0F0F0F]/40 font-medium">
        {label}
      </span>
    </div>
  )
}

// ── Pre-Wedding moments — update labels/likes to match your real posts ──
const moments = [
  { id: 1, src: moment1, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 2, src: moment2, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 3, src: moment3, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 4, src: moment4, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 5, src: moment5, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '3.1K' },
  { id: 6, src: moment6, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 7, src: moment7, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.8K' },
  { id: 8, src: moment8, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 9, src: moment1, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 10, src: moment2, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 11, src: moment3, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
  { id: 12, src: moment4, account: 'DestinationWeddings', caption: 'Josephine & Christopher', likes: '2.3K' },
]

// ── Instagram-style photo card ─────────────────────────────
function MomentCard({ src, account, caption, likes }) {
  return (
    <div className="bg-white rounded-sm overflow-hidden border border-stone-200 flex flex-col group">
      {/* Photo */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Card footer */}
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-semibold text-[#0F0F0F] truncate">{account}</span>
          <span className="text-[10px] text-[#0F0F0F]/45 truncate">{caption}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {/* Heart icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#0F0F0F]/35">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-[#0F0F0F]/45 font-medium">{likes}</span>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown('2025-11-15T16:00:00')

  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
        {/* Hero image — replace with your actual couple photo */}
        <img
          src={heroImg}
          alt="Josephine & Christopher"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Subtle dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

        {/* Overlay text */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 animate-[fadeUp_1.2s_ease_both]">
          <h1 className="font-display italic text-white text-4xl lg:text-6xl tracking-wide drop-shadow-lg">
            Josephine &amp; Christopher
          </h1>
          <p className="text-white/80 text-[13px] tracking-[0.3em] uppercase font-medium drop-shadow">
            Saturday · November 15, 2025
          </p>
        </div>
      </section>

      {/* ── 2. COUNTDOWN ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8">
          <p className="font-display italic text-[#0F0F0F]/50 text-lg tracking-wide">
            The Final Countdown
          </p>
          <div className="flex items-start justify-center gap-8 lg:gap-16 w-full">
            <CountUnit value={days} label="Days" />
            <CountUnit value={hours} label="Hours" />
            <CountUnit value={minutes} label="Minutes" />
            <CountUnit value={seconds} label="Seconds" />
          </div>
        </div>
      </section>

      {/* ── 3. VENUE ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Venue illustration — replace with your actual venue image */}
            <div className="w-full lg:w-[45%] flex-shrink-0">
              <div className="relative rounded-sm overflow-hidden shadow-xl">
                <img
                  src={venueImg}
                  alt="The Glass Conservatory at Syon Park"
                  className="w-full h-72 lg:h-96 object-cover"
                />
              </div>
            </div>

            {/* Venue info */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold">
                The Setting
              </p>
              <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl leading-snug">
                The Glass Conservatory<br />at Syon Park
              </h2>
              <p className="text-[#0F0F0F]/55 text-sm leading-relaxed">
                Brentford, London TW8 8JF<br />
                United Kingdom
              </p>
              <Link
                to="/order-of-events"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#2D4C3B] border border-[#2D4C3B]/30 px-5 py-2.5 rounded-sm hover:bg-[#2D4C3B] hover:text-white transition-all duration-300 w-fit"
              >
                View More Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. COUPLE'S LETTER ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
          {/* Small botanical ornament */}
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-[#2D4C3B]/40">
            <path d="M10 28 C10 28 10 14 10 0 M10 14 C10 14 2 10 0 4 M10 14 C10 14 18 10 20 4 M10 20 C10 20 4 18 2 13 M10 20 C10 20 16 18 18 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>

          <p className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl leading-relaxed">
            To our dearest family and friends
          </p>

          <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
            It is with hearts full of joy that we invite you to celebrate the beginning of our forever.
            Our journey together has been a tapestry woven with laughter, growth, and undeniable love.
          </p>
          <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
            We cannot wait to share this sacred moment with the people who have shaped our lives and
            supported us through every chapter. Your presence is the greatest gift we could receive.
          </p>

          <p className="font-display italic text-[#2D4C3B] text-lg mt-2">
            — Josephine &amp; Christopher
          </p>
        </div>
      </section>

      {/* ── 5. PRE-WEDDING MOMENTS ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <h2 className="font-display italic text-[#0F0F0F] text-2xl lg:text-3xl tracking-wide">
              Pre-Wedding Moments
            </h2>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#0F0F0F]/40 font-medium">
              Captured by the Botanical Curator
            </p>
          </div>

          {/* Instagram-style 4-column grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {moments.map((m) => (
              <MomentCard key={m.id} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Fade-up keyframe */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </Layout>
  )
}
