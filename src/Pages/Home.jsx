import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import Lightbox, { useLightbox } from '../Components/Lightbox'
import usePageTitle from '../hooks/usePageTitle'

import heroImg  from '../assets/home-hero.webp'
import venueImg from '../assets/section1.webp'
import heritageImg from '../assets/hero.webp'
import moment1  from '../assets/pic1.webp'
import moment2  from '../assets/ourservices.webp'
import moment3  from '../assets/secondservice.webp'
import moment4  from '../assets/one.webp'
import moment5  from '../assets/first.webp'
import moment6  from '../assets/happy.webp'
import moment7  from '../assets/32089.webp'
import moment8  from '../assets/47639.webp'

const EASE = [0.22, 1, 0.36, 1]

// ── Decorative botanical sprig ──
function Sprig({ className = '' }) {
  return (
    <svg width="22" height="32" viewBox="0 0 20 28" fill="none" className={className} aria-hidden="true">
      <path d="M10 28 C10 28 10 14 10 0 M10 14 C10 14 2 10 0 4 M10 14 C10 14 18 10 20 4 M10 20 C10 20 4 18 2 13 M10 20 C10 20 16 18 18 13"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

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
          loading="lazy"
          decoding="async"
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
    <section className="relative w-full h-[78vh] lg:h-[92vh] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Josephine & Christopher"
        style={{ y, scale }}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-[115%] object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />

      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="text-white/85 text-[10px] tracking-[0.5em] uppercase font-semibold drop-shadow"
        >
          Benin City
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="font-script text-white text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-wide drop-shadow-lg"
        >
          Josephine &amp; Christopher
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="font-display italic text-white/95 text-base sm:text-lg lg:text-xl drop-shadow mt-1"
        >
          A Celebration of Love, Faith &amp; Family
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="text-white/80 text-[12px] sm:text-[13px] tracking-[0.3em] uppercase font-medium drop-shadow mt-3"
        >
          Saturday · October 24, 2026
        </motion.p>
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle()
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
                className="text-[12px] sm:text-[13.5px] font-semibold tracking-wide text-white bg-[#0F0F0F] hover:bg-[#2D4C3B] px-5 sm:px-9 py-2.5 sm:py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Leave a Love Note
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHERE OUR FOREVER BEGINS (Venue) ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <Reveal x={-40} y={0} className="w-full lg:w-[45%] flex-shrink-0">
              <div className="relative rounded-sm overflow-hidden shadow-xl group">
                <img
                  src={venueImg}
                  alt="Benin City"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 lg:h-[440px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex flex-col gap-5 lg:w-[55%]">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4C3B] font-semibold">
                The Setting
              </p>
              <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-[44px] leading-[1.15]">
                Where Our Forever<br />Begins.
              </h2>
              <p className="text-[#2D4C3B] text-[12px] tracking-[0.25em] uppercase font-semibold">
                Benin City, Edo State, Nigeria &middot; October 24, 2026
              </p>
              <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
                In the heart of Benin City, surrounded by the people we love most, we will begin the next chapter of our lives together.
              </p>
              <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
                A beautiful celebration of love, joyful memories, heartfelt prayers, laughter, and forever.
              </p>
              <Link
                to="/order-of-events"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#2D4C3B] border border-[#2D4C3B]/30 px-5 py-2.5 rounded-sm hover:bg-[#2D4C3B] hover:text-white transition-all duration-300 w-fit mt-2"
              >
                View More Details →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <Reveal>
            <Sprig className="text-[#2D4C3B]/45" />
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
            Our Journey
          </Reveal>
          <Reveal delay={0.15} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-[42px] leading-[1.2]">
            From schoolmates, <br />to friends, to forever.
          </Reveal>
          <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/60 text-[15.5px] leading-[1.95] max-w-lg mt-2">
            What began within the walls of Edo State Polytechnic, Usen slowly became a journey of friendship, faith, growth, and love.
          </Reveal>
          <Reveal delay={0.3} as="p" className="text-[#0F0F0F]/60 text-[15.5px] leading-[1.95] max-w-lg">
            Through shared moments, fellowship, laughter, prayers, and years of knowing each other, God was quietly writing a story more beautiful than we ever imagined.
          </Reveal>
          <Reveal delay={0.4}>
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#2D4C3B] border border-[#2D4C3B]/30 px-5 py-2.5 rounded-sm hover:bg-[#2D4C3B] hover:text-white transition-all duration-300 mt-4"
            >
              Read Our Story →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── BUILT ON FAITH & FRIENDSHIP — dark green band ── */}
      <section className="relative bg-[#2D4C3B] py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-10 left-10 text-white/15 hidden lg:block">
          <Sprig className="w-10 h-14" />
        </div>
        <div className="absolute bottom-10 right-10 text-white/15 hidden lg:block rotate-180">
          <Sprig className="w-10 h-14" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-[10px] tracking-[0.45em] uppercase text-white/55 font-semibold mb-8">
            Built on Faith &amp; Friendship
          </Reveal>
          <Reveal delay={0.1} as="blockquote" className="font-display italic text-white text-3xl lg:text-[44px] leading-[1.3] mb-8">
            Before the love story, <br />there was friendship.<br />
            Before forever, <br />there was faith.
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-px bg-white/30 w-20 mx-auto mb-6" />
            <p className="text-white/75 text-[14.5px] leading-[1.95] max-w-md mx-auto italic">
              And through every season, love continued to grow beautifully between us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ROOTED IN FAITH, FAMILY & HERITAGE ── */}
      <section className="bg-[#f7f6f2] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            <Reveal x={40} y={0} delay={0.15} className="flex flex-col gap-5 lg:w-[55%] lg:order-2">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4C3B] font-semibold">
                Two Families, One Love
              </p>
              <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-[42px] leading-[1.15]">
                Rooted in Faith,<br />Family &amp; Heritage.
              </h2>
              <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
                From Evboesi to Irrua, our story is deeply connected to love, family, culture, faith, and God&rsquo;s grace.
              </p>

              <div className="flex items-center gap-4 my-2 max-w-sm">
                <span className="font-display italic text-[#2D4C3B] text-lg">Evboesi</span>
                <div className="flex-1 h-px bg-[#2D4C3B]/25" />
                <span className="font-display italic text-[#2D4C3B]/50 text-xl">&amp;</span>
                <div className="flex-1 h-px bg-[#2D4C3B]/25" />
                <span className="font-display italic text-[#2D4C3B] text-lg">Irrua</span>
              </div>

              <p className="font-display italic text-[#0F0F0F]/70 text-[15px] leading-[1.9] max-w-md">
                And now, two families become one.
              </p>
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#2D4C3B] border border-[#2D4C3B]/30 px-5 py-2.5 rounded-sm hover:bg-[#2D4C3B] hover:text-white transition-all duration-300 w-fit mt-2"
              >
                View Wedding Details →
              </Link>
            </Reveal>

            <Reveal x={-40} y={0} className="w-full lg:w-[45%] flex-shrink-0 lg:order-1">
              <div className="relative rounded-sm overflow-hidden shadow-xl group">
                <img
                  src={heritageImg}
                  alt="Our families"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 lg:h-[440px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── MOMENTS ALONG THE WAY ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <Reveal as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
              A Visual Diary
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl">
              Moments Along The Way
            </Reveal>
            <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/55 text-[14.5px] leading-[1.95] max-w-md mt-1">
              The laughter. The memories. The little moments. The answered prayers. Every step has led beautifully to this season of forever.
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

      {/* ── TO OUR FAVORITE PEOPLE — stationery card ── */}
      <section className="bg-[#f7f6f2] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="relative bg-white shadow-[0_30px_60px_-30px_rgba(45,76,59,0.25)] flex flex-col lg:flex-row overflow-hidden">

              {/* Left — green ribbon panel */}
              <div className="relative bg-[#2D4C3B] text-white px-8 py-10 lg:px-10 lg:py-14 lg:w-[38%] flex flex-col items-center justify-center text-center gap-4">
                <Sprig className="text-white/60" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/80 font-semibold">
                  A Note of Thanks
                </p>
                <div className="h-px bg-white/30 w-10" />
                <p className="font-display italic text-white text-lg leading-snug max-w-[14ch]">
                  With all our love &amp; gratitude.
                </p>
              </div>

              {/* Right — text panel */}
              <div className="relative px-8 py-10 lg:px-12 lg:py-14 flex-1 flex flex-col gap-5">
                {/* Faint stamp circle (top-right) */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full border border-[#2D4C3B]/20 hidden lg:flex items-center justify-center" aria-hidden="true">
                  <span className="font-display italic text-[#2D4C3B]/40 text-xs leading-tight text-center">J &amp; C<br/>2026</span>
                </div>

                <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-[40px] leading-[1.15]">
                  To Our Favorite People.
                </h2>
                <p className="text-[#0F0F0F]/65 text-[15px] leading-[1.95] max-w-md">
                  Thank you for being part of our journey, our memories, our prayers, and our joy.
                </p>
                <p className="text-[#0F0F0F]/65 text-[15px] leading-[1.95] max-w-md">
                  Celebrating this beautiful moment with you means more to us than words could ever express.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOREVER STARTS HERE — closing ── */}
      <section className="bg-white py-20 lg:py-28 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <Reveal>
            <Sprig className="text-[#2D4C3B]/45" />
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
            Forever Starts Here
          </Reveal>
          <Reveal delay={0.15} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-5xl leading-tight">
            October 24, 2026<br />
            <span className="text-[#2D4C3B]">Benin City, Nigeria.</span>
          </Reveal>
          <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/60 text-[15px] leading-[1.95] max-w-md">
            And we truly cannot wait to celebrate with you.
          </Reveal>
          <Reveal delay={0.35} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold mt-6">
            With love,
          </Reveal>
          <Reveal delay={0.4} as="p" className="font-script text-[#2D4C3B] text-5xl lg:text-6xl leading-none">
            Josephine &amp; Christopher
          </Reveal>
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
