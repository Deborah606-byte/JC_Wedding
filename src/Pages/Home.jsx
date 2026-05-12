import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import Lightbox, { useLightbox } from '../Components/Lightbox'

import heroImg  from '../assets/home-hero.png'
import venueImg from '../assets/section1.png'
import moment1  from '../assets/pic1.png'
import moment2  from '../assets/ourservices.png'
import moment3  from '../assets/secondservice.png'
import moment4  from '../assets/one.png'
import moment5  from '../assets/first.png'
import moment6  from '../assets/happy.jpg'
import moment7  from '../assets/32089.jpg'
import moment8  from '../assets/47639.jpg'

const EASE = [0.22, 1, 0.36, 1]

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
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative font-display text-[34px] sm:text-5xl lg:text-7xl text-[#0F0F0F] tracking-tight leading-none h-[1em] w-[1.6em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#0F0F0F]/40 font-medium">
        {label}
      </span>
    </div>
  )
}

// ── Pre-Wedding moments ──
const moments = [
  { id: 1, src: moment1, account: 'Josephine & Christopher', caption: 'A moment together', likes: '2.3K' },
  { id: 2, src: moment2, account: 'Josephine & Christopher', caption: 'Pre-wedding portrait', likes: '2.8K' },
  { id: 3, src: moment3, account: 'Josephine & Christopher', caption: 'Garden afternoon', likes: '3.1K' },
  { id: 4, src: moment4, account: 'Josephine & Christopher', caption: 'Soft light', likes: '2.4K' },
  { id: 5, src: moment5, account: 'Josephine & Christopher', caption: 'Laughter and love', likes: '2.9K' },
  { id: 6, src: moment6, account: 'Josephine & Christopher', caption: 'Quiet joy', likes: '3.4K' },
  { id: 7, src: moment7, account: 'Josephine & Christopher', caption: 'Hand in hand', likes: '2.6K' },
  { id: 8, src: moment8, account: 'Josephine & Christopher', caption: 'Forever begins', likes: '3.0K' },
]

function MomentCard({ src, account, caption, likes, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="bg-white rounded-sm overflow-hidden border border-stone-200 flex flex-col group"
    >
      <button
        onClick={onClick}
        type="button"
        aria-label={`Open ${caption}`}
        className="relative overflow-hidden aspect-square cursor-zoom-in"
      >
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </button>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-semibold text-[#0F0F0F] truncate">{account}</span>
          <span className="text-[10px] text-[#0F0F0F]/45 truncate">{caption}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#0F0F0F]/35">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-[#0F0F0F]/45 font-medium">{likes}</span>
        </div>
      </div>
    </motion.div>
  )
}

const lightboxImages = moments.map((m) => ({ src: m.src, alt: m.caption }))

// ── Hero with parallax ──
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const scale = useTransform(scrollY, [0, 800], [1, 1.08])

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Josephine & Christopher"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[115%] object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="font-script text-white text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-wide drop-shadow-lg px-4 text-center"
        >
          Josephine &amp; Christopher
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="text-white/80 text-[13px] tracking-[0.3em] uppercase font-medium drop-shadow"
        >
          Saturday · October 24, 2026
        </motion.p>
      </div>
    </section>
  )
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown('2026-10-24T16:00:00')
  const lb = useLightbox(lightboxImages)

  return (
    <PageTransition>

      <Hero />

      {/* ── COUNTDOWN ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8">
          <Reveal as="p" className="font-display italic text-[#0F0F0F]/50 text-lg tracking-wide">
            The Final Countdown
          </Reveal>
          <Reveal delay={0.15} className="flex items-start justify-center gap-3 sm:gap-8 lg:gap-16 w-full">
            <CountUnit value={days} label="Days" />
            <CountUnit value={hours} label="Hours" />
            <CountUnit value={minutes} label="Minutes" />
            <CountUnit value={seconds} label="Seconds" />
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-2 inline-flex items-center gap-3 sm:gap-8 p-1.5 sm:p-2 pl-6 sm:pl-20 pr-1.5 sm:pr-8 bg-white rounded-full shadow-[0_10px_30px_-12px_rgba(15,15,15,0.25)] ring-1 ring-stone-200/70 max-w-full">
              <Link
                to="/rsvp"
                className="text-[12px] sm:text-[13.5px] font-medium tracking-wide text-[#0F0F0F] hover:text-[#2D4C3B] transition-colors duration-200 whitespace-nowrap"
              >
                RSVP Now
              </Link>
              <Link
                to="/guestbook"
                style={{ color: '#ffffff' }}
                className="text-[12px] sm:text-[13.5px] font-semibold tracking-wide text-white bg-[#0F0F0F] hover:bg-[#2D4C3B] px-5 sm:px-9 py-2.5 sm:py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Leave a Love Note
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <Reveal x={-40} y={0} className="w-full lg:w-[45%] flex-shrink-0">
              <div className="relative rounded-sm overflow-hidden shadow-xl group">
                <img
                  src={venueImg}
                  alt="Benin City"
                  className="w-full h-72 lg:h-96 object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex flex-col gap-4 lg:gap-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold">
                The Setting
              </p>
              <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl leading-snug">
                A Celebration<br />in Benin City
              </h2>
              <p className="text-[#0F0F0F]/55 text-sm leading-relaxed">
                Edo State, Nigeria<br />
                October 24, 2026
              </p>
              <Link
                to="/order-of-events"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#2D4C3B] border border-[#2D4C3B]/30 px-5 py-2.5 rounded-sm hover:bg-[#2D4C3B] hover:text-white transition-all duration-300 w-fit"
              >
                View More Details →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── COUPLE'S LETTER ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
          <Reveal>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-[#2D4C3B]/40" aria-hidden="true">
              <path d="M10 28 C10 28 10 14 10 0 M10 14 C10 14 2 10 0 4 M10 14 C10 14 18 10 20 4 M10 20 C10 20 4 18 2 13 M10 20 C10 20 16 18 18 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </Reveal>

          <Reveal delay={0.1} as="p" className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl leading-relaxed">
            To our dearest family and friends
          </Reveal>

          <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
            It is with hearts full of joy that we invite you to celebrate the beginning of our forever.
            Our journey together has been a tapestry woven with laughter, growth, and undeniable love.
          </Reveal>
          <Reveal delay={0.3} as="p" className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
            We cannot wait to share this sacred moment with the people who have shaped our lives and
            supported us through every chapter. Your presence is the greatest gift we could receive.
          </Reveal>

          <Reveal delay={0.4} as="p" className="font-script text-[#2D4C3B] text-4xl lg:text-5xl leading-none mt-3">
            Josephine &amp; Christopher
          </Reveal>
        </div>
      </section>

      {/* ── PRE-WEDDING MOMENTS ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="flex flex-col items-center gap-2 mb-10">
            <Reveal as="h2" className="font-display italic text-[#0F0F0F] text-2xl lg:text-3xl tracking-wide">
              Moments Together
            </Reveal>
            <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.28em] uppercase text-[#0F0F0F]/40 font-medium">
              A few favorites on the way to the altar
            </Reveal>
          </div>

          <StaggerGroup
            stagger={0.06}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {moments.map((m, i) => (
              <StaggerItem key={m.id}>
                <MomentCard {...m} onClick={() => lb.open(i)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={lb.index}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />

    </PageTransition>
  )
}
