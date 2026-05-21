import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import { submitRsvp } from '../lib/api'
import AddToCalendar from '../Components/AddToCalendar'
import usePageTitle from '../hooks/usePageTitle'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import heroBg    from '../assets/flower1.webp'   // full-width botanical background
import rsvpFloral from '../assets/flower2.webp'   // dark floral/roses photo left of form
import infoVenues from '../assets/flower3.webp'   // practical info: venues band
import infoAttire from '../assets/flower4.webp'   // practical info: dress code band
import progCeremony from '../assets/ourservices.webp' // order of the day: ceremony scene
import progTable    from '../assets/flower5.webp'    // order of the day: reception table
import progDinner   from '../assets/flower6.webp'    // order of the day: dinner/charcuterie
import progFlorals  from '../assets/flower2.webp'    // order of the day: dark floral close-up

// ── Wedding-day programme ──
const programme = [
  {
    event: 'White Wedding Ceremony',
    time: '9:00 AM',
    sub: 'We’ll say "I do" surrounded by love.',
    icon: 'church',
  },
  {
    event: 'Reception & Celebration',
    time: 'After Ceremony',
    sub: 'Dinner, drinks and dancing the night away!',
    icon: 'cheers',
  },
]

// ── Venue data ──
const venues = [
  {
    label: 'Wedding Ceremony',
    name: 'Assurance Of Salvation Ministries Inc Fire Centre',
    sub: 'Irhinmwirin Mega Church (FC8)',
    timeLabel: 'Ceremony',
    time: '9:00 AM (WAT)',
    address: 'No. 2 Freedom Street, Off Enogie Palace Road, Through St. Saviour, Benin City',
    mapQuery: 'Assurance Of Salvation Ministries Fire Centre Irhinmwirin Benin City',
    icon: 'church',
  },
  {
    label: 'Reception',
    name: 'Reception Venue',
    sub: null,
    timeLabel: 'Reception',
    time: 'After Ceremony',
    address: '1st Igiewie Street, Off Enogie Palace Road, St. Saviour Road, Benin City',
    mapQuery: '1st Igiewie Street, Off Enogie Palace Road, St. Saviour Road, Benin City',
    icon: 'cheers',
  },
]

function VenueIcon({ kind }) {
  if (kind === 'cheers') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 3l-3 7a4 4 0 0 0 6 4l-3-11z"/>
        <path d="M16 3l3 7a4 4 0 0 1-6 4l3-11z"/>
        <line x1="9" y1="14" x2="9" y2="21"/>
        <line x1="15" y1="14" x2="15" y2="21"/>
        <line x1="6" y1="21" x2="12" y2="21"/>
        <line x1="12" y1="21" x2="18" y2="21"/>
      </svg>
    )
  }
  // default: church
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="10" y1="4" x2="14" y2="4"/>
      <path d="M5 21V11l7-4 7 4v10"/>
      <path d="M5 21h14"/>
      <path d="M10 21v-5a2 2 0 0 1 4 0v5"/>
    </svg>
  )
}

// ── FAQ data ──
const faqs = [
  {
    q: 'When should I RSVP by?',
    a: 'Kindly respond no later than September 24, 2026. This helps us finalize seating, catering, and the small details that make the day flow smoothly.',
  },
  {
    q: 'What time should I arrive on the wedding day?',
    a: 'Please arrive at least 30 minutes before the 9:00 AM church ceremony so you can be seated before the processional begins.',
  },
  {
    q: 'Where exactly are the church and reception venues?',
    a: 'The church is in the Irhinmwirin area of Benin City, off Enogie Palace Road. The reception is a short distance away on 1st Igiewie Street, also off Enogie Palace Road. Full addresses and map links are below in the Practical Information section.',
  },
  {
    q: 'What should I wear?',
    a: 'Formal attire is encouraged for the White Wedding and Reception on Saturday. For the Traditional Marriage on Thursday, guests are warmly welcomed to wear traditional Nigerian attire.',
  },
  {
    q: 'Can I bring a plus one?',
    a: 'Reserved seats are for the names listed on your invitation. If you would like to bring an additional guest, please reach out before submitting your RSVP.',
  },
  {
    q: 'Will there be parking?',
    a: 'Parking will be available at both venues. Attendants will be on hand to direct you on arrival.',
  },
]

// ── Travel & directions data ──
const VENUE_QUERY = 'Assurance Of Salvation Ministries Fire Centre Irhinmwirin Benin City'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_QUERY)}`

const travelStops = [
  {
    key: 'airport',
    title: 'Arrive — Benin Airport (BNI)',
    sub: 'The closest option, with daily flights from Lagos and Abuja.',
    detail: 'Benin Airport (BNI) is roughly 20–30 minutes from the venue by taxi. Multiple daily flights operate from Lagos (MMA2) and Abuja. Book early; fares climb close to the date.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
      </svg>
    ),
  },
  {
    key: 'stay',
    title: 'Where to Stay',
    sub: 'A few recommended hotels near the venue.',
    detail: 'A short list of hotels near the church and reception will be shared closer to the date. If you would like a recommendation in the meantime, reach out via Contact Us.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-5 9 5v13"/><path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    key: 'around',
    title: 'Getting Around',
    sub: 'Bolt and local taxis operate throughout the city.',
    detail: 'Bolt is the most reliable ride-hailing option in Benin City. Local taxis are widely available — confirm the fare before setting off. Allow buffer time on the wedding morning for traffic near the church.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="9" rx="2"/><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/>
      </svg>
    ),
  },
  {
    key: 'venue',
    title: 'Venue Location',
    sub: 'Find the venue and best routes to get there.',
    detail: 'Assurance Of Salvation Ministries Inc Fire Centre, No. 2 Freedom Street, Off Enogie Palace Road, Through St. Saviour, Benin City. Use Get Directions for live turn-by-turn from your location.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

function TravelStopItem({ stop, isOpen, onToggle, isLast }) {
  return (
    <div className="relative pl-10">
      {/* Timeline rail */}
      {!isLast && (
        <span className="absolute left-[14px] top-9 bottom-0 w-px bg-[#2D4C3B]/20" aria-hidden="true" />
      )}
      {/* Timeline dot */}
      <span className="absolute left-[10px] top-7 w-2 h-2 rounded-full bg-[#2D4C3B]" aria-hidden="true" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 bg-white rounded-2xl shadow-[0_2px_18px_rgba(15,15,15,0.04)] border border-stone-100 px-5 py-4 text-left hover:border-[#2D4C3B]/30 transition-colors"
      >
        <span className="w-10 h-10 rounded-full bg-[#2D4C3B]/8 flex items-center justify-center text-[#2D4C3B] flex-shrink-0">
          {stop.icon}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[14.5px] font-semibold text-[#0F0F0F]">{stop.title}</span>
          <span className="block text-[12.5px] text-[#0F0F0F]/55 leading-[1.6] mt-0.5">{stop.sub}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 text-[#0F0F0F]/40"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#0F0F0F]/65 text-[13px] leading-[1.85] px-5 pt-3 pb-2">
              {stop.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="font-display italic text-[#0F0F0F] text-[17px] lg:text-lg group-hover:text-[#2D4C3B] transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-[#2D4C3B]/30 flex items-center justify-center text-[#2D4C3B] group-hover:bg-[#2D4C3B] group-hover:text-[#FFFFFF] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] pb-5 pr-10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Hero with parallax ──
function RsvpHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const scale = useTransform(scrollY, [0, 600], [1, 1.06])

  return (
    <section className="relative min-h-[420px] lg:min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.img
        src={heroBg}
        alt=""
        style={{ y, scale }}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
      <div className="absolute inset-0 bg-[#2D4C3B]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] tracking-[0.35em] uppercase text-[#FFFFFF] font-semibold drop-shadow"
        >
          Join Us in Celebration
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-[#FFFFFF] text-4xl lg:text-6xl xl:text-7xl leading-[1.1] drop-shadow-lg max-w-3xl"
        >
          Kindly respond by the twenty-fourth of September
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#FFFFFF]/85 text-[14px] leading-[1.85] max-w-md mt-2 drop-shadow"
        >
          We look forward to celebrating this special milestone with those we love most in the heart of Benin City.
        </motion.p>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function RSVP() {
  usePageTitle('RSVP')
  const [form, setForm] = useState({
    name: '',
    attending: 'Yes, gladly',
    guests: 'One Guest',
    contact: '',
    note: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [openTravel, setOpenTravel] = useState(0)

  const scrollToContact = (e) => {
    e?.preventDefault?.()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.attending || submitting) return
    // Honeypot — if filled, silently "succeed" without submitting.
    if (honeypot) { setSubmitted(true); return }
    setError('')
    setSubmitting(true)
    try {
      await submitRsvp(form)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTransition>

      <RsvpHero />


      {/* ── 2. RSVP FORM ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row shadow-sm border border-stone-100">

            {/* Left: dark floral photo with venue overlay */}
            <div className="lg:w-[42%] flex-shrink-0 relative overflow-hidden">
              <img
                src={rsvpFloral}
                alt="The Celebration"
                loading="lazy"
                decoding="async"
                className="w-full h-64 lg:h-full object-cover"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Venue info bottom */}
              <div className="absolute bottom-6 left-6">
                <p className="font-display italic text-[#FFFFFF] text-xl lg:text-2xl drop-shadow">
                  The Celebration
                </p>
                <p className="text-[#FFFFFF]/65 text-[11px] tracking-[0.2em] uppercase mt-1">
                  October 24, 2026 · Benin City, Nigeria
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="flex-1 bg-white p-8 lg:p-10 flex flex-col gap-6">
              <div>
                <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mb-2">
                  RSVP Particulars
                </h2>
                <div className="w-12 h-px bg-[#2D4C3B]" />
              </div>

              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#2D4C3B] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="font-display italic text-[#2D4C3B] text-xl">Thank you, {form.name}!</p>
                  <p className="text-[#0F0F0F]/55 text-sm max-w-xs">
                    We&rsquo;ve received your RSVP and can&rsquo;t wait to celebrate with you. Save the date below.
                  </p>
                  <div className="mt-3">
                    <AddToCalendar />
                  </div>
                </div>
              ) : (
                <>
                  {/* Honeypot — invisible to humans, attractive to bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />
                  {/* Attending */}
                  <div>
                    <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                      Will You Attend?
                    </label>
                    <div className="relative">
                      <select
                        value={form.attending}
                        onChange={e => setForm({ ...form, attending: e.target.value })}
                        className="w-full border border-stone-200 focus:border-[#2D4C3B] outline-none px-3 py-2 text-[13.5px] text-[#0F0F0F] bg-white appearance-none cursor-pointer transition-colors"
                      >
                        <option>Yes, gladly</option>
                        <option>No, with regret</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F0F0F]/40" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Name + Guest count row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                        Guest Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="As written on invitation"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[13.5px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <select
                          value={form.guests}
                          onChange={e => setForm({ ...form, guests: e.target.value })}
                          disabled={form.attending === 'No, with regret'}
                          className="w-full border border-stone-200 focus:border-[#2D4C3B] outline-none px-3 py-2 text-[13.5px] text-[#0F0F0F] bg-white appearance-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option>One Guest</option>
                          <option>Two Guests</option>
                          <option>Three Guests</option>
                          <option>Four Guests</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F0F0F]/40" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                      Phone or Email
                    </label>
                    <input
                      type="text"
                      placeholder="So the couple can reach you if needed"
                      value={form.contact}
                      onChange={e => setForm({ ...form, contact: e.target.value })}
                      className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[13.5px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent transition-colors"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                      A Note for the Couple
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Dietary needs or a warm message…"
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                      className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[13.5px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent resize-none transition-colors"
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-[#2D4C3B] text-[#FFFFFF] text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#3a6050] transition-colors duration-300 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending…' : 'Confirm Attendance'}
                    </button>
                    <p className="text-[11px] text-[#0F0F0F]/35 leading-relaxed">
                      Kindly contact the bridal party for special requests.
                    </p>
                  </div>
                  {error && (
                    <p className="text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. PRACTICAL INFORMATION — horizontal alternating bands ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14 lg:mb-20">
            <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
              The Details of the Day
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display text-[#0F0F0F] text-3xl lg:text-[44px] leading-[1.15]">
              Practical <span className="italic text-[#2D4C3B]">Information</span>
            </Reveal>
            {/* Leaf divider */}
            <Reveal delay={0.18} className="flex items-center justify-center gap-3 mt-6">
              <span className="block h-px w-20 bg-[#2D4C3B]/30" />
              <svg width="26" height="14" viewBox="0 0 36 18" fill="none" stroke="#2D4C3B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 9c4-5 10-7 16-5"/>
                <path d="M8 7.5c1-2 3-3 5-2.5"/>
                <path d="M14 6c1-2 3-2.5 4-2"/>
                <path d="M18 4c1-1.5 3-2 4-1"/>
                <ellipse cx="26" cy="9" rx="3.5" ry="1.6" transform="rotate(-25 26 9)"/>
                <ellipse cx="30" cy="11" rx="2.5" ry="1.2" transform="rotate(-25 30 11)"/>
              </svg>
              <span className="block h-px w-20 bg-[#2D4C3B]/30" />
            </Reveal>
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">

            {/* ── BAND I: Venues — image card left, venue cards right ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">

              {/* LEFT: Photo card */}
              <Reveal x={-40} y={0} className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl group h-full min-h-[420px]">
                  <img
                    src={infoVenues}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2D4C3B]/30 via-[#2D4C3B]/10 to-[#0F0F0F]/55" />

                  {/* LOCATIONS chip */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="text-[9.5px] tracking-[0.25em] uppercase text-white font-semibold">Locations</span>
                  </div>

                  {/* Decorative botanical line-art */}
                  <svg
                    className="absolute right-2 bottom-16 lg:bottom-24 opacity-35 pointer-events-none"
                    width="120"
                    height="180"
                    viewBox="0 0 120 180"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M80 170 Q72 130 78 95 Q84 60 76 25"/>
                    <ellipse cx="65" cy="140" rx="11" ry="4" transform="rotate(-35 65 140)"/>
                    <ellipse cx="92" cy="125" rx="11" ry="4" transform="rotate(35 92 125)"/>
                    <ellipse cx="60" cy="105" rx="10" ry="3.5" transform="rotate(-35 60 105)"/>
                    <ellipse cx="93" cy="92" rx="10" ry="3.5" transform="rotate(35 93 92)"/>
                    <ellipse cx="62" cy="72" rx="9" ry="3.2" transform="rotate(-35 62 72)"/>
                    <ellipse cx="90" cy="58" rx="9" ry="3.2" transform="rotate(35 90 58)"/>
                    <ellipse cx="68" cy="40" rx="7" ry="2.6" transform="rotate(-35 68 40)"/>
                    <ellipse cx="84" cy="30" rx="7" ry="2.6" transform="rotate(35 84 30)"/>
                  </svg>

                  {/* Title bottom-left */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-white text-3xl lg:text-[40px] leading-[1.05] drop-shadow">
                      The Venues<br/><span className="italic">for the Day.</span>
                    </h3>
                    <p className="text-white/85 text-[13px] leading-[1.7] mt-3 max-w-[18rem] drop-shadow">
                      All the important places you need to know.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* RIGHT: Two venue cards stacked */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {venues.map((v, i) => (
                  <Reveal x={40} y={0} delay={0.15 + i * 0.1} key={v.label}>
                    <div className="bg-white rounded-2xl shadow-[0_4px_28px_rgba(15,15,15,0.06)] flex items-stretch overflow-hidden">

                      {/* Number strip */}
                      <div className="bg-[#2D4C3B] text-white flex flex-col items-center justify-between py-6 px-3 w-[80px] flex-shrink-0 relative">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white">
                          <VenueIcon kind={v.icon} />
                        </div>
                        <span className="font-display italic text-2xl text-white/95 mt-4">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Center info */}
                      <div className="flex-1 px-5 lg:px-6 py-5 flex flex-col gap-3 min-w-0">
                        <p className="text-[10px] tracking-[0.24em] uppercase text-[#2D4C3B]/70 font-semibold">
                          {v.label}
                        </p>
                        <h4 className="font-display text-[#0F0F0F] text-[20px] lg:text-[22px] leading-[1.2]">
                          {v.name}
                        </h4>

                        {/* Time pill */}
                        <div className="inline-flex items-center gap-2 bg-[#f7f6f2] rounded-full pl-2.5 pr-3.5 py-1.5 w-fit">
                          <span className="w-5 h-5 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                          </span>
                          <span className="text-[11.5px] text-[#0F0F0F]/75 font-medium">
                            {v.timeLabel}: {v.time}
                          </span>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2.5">
                          <span className="text-[#2D4C3B] flex-shrink-0 mt-0.5">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                          </span>
                          <p className="text-[12.5px] text-[#0F0F0F]/65 leading-[1.7]">
                            {v.address}
                          </p>
                        </div>
                      </div>

                      {/* Right: Open in Google Maps CTA */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex flex-col items-center justify-center gap-2 border-l border-stone-100 px-4 lg:px-5 py-5 w-[120px] flex-shrink-0 text-center hover:bg-[#f7f6f2] transition-colors group/cta"
                      >
                        <span className="w-11 h-11 rounded-full bg-[#2D4C3B]/8 text-[#2D4C3B] flex items-center justify-center group-hover/cta:bg-[#2D4C3B] group-hover/cta:text-white transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                            <line x1="8" y1="2" x2="8" y2="18"/>
                            <line x1="16" y1="6" x2="16" y2="22"/>
                          </svg>
                        </span>
                        <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-[#2D4C3B] leading-[1.5]">
                          Open in<br/>Google Maps
                        </span>
                        <span className="text-[#2D4C3B] text-sm leading-none">→</span>
                      </a>

                      {/* Mobile-only Maps link */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden flex items-center justify-center border-l border-stone-100 px-4 text-[#2D4C3B] hover:bg-[#f7f6f2] transition-colors"
                        aria-label="Open in Google Maps"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                          <line x1="8" y1="2" x2="8" y2="18"/>
                          <line x1="16" y1="6" x2="16" y2="22"/>
                        </svg>
                      </a>

                    </div>
                  </Reveal>
                ))}
              </div>

            </div>

            {/* ── BAND II: Dress Code — image right, text left ── */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              <Reveal x={-40} y={0} className="w-full lg:w-[42%] flex-shrink-0 order-1 lg:order-2">
                <div className="relative overflow-hidden shadow-xl group">
                  <img
                    src={infoAttire}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-72 lg:h-[460px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2D4C3B]/25" />
                  <div className="absolute top-5 left-5">
                    <p className="font-display italic text-[#FFFFFF]/85 text-sm drop-shadow">II</p>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#FFFFFF] font-semibold drop-shadow mt-1">Attire</p>
                  </div>
                </div>
              </Reveal>

              <Reveal x={40} y={0} delay={0.15} className="flex-1 flex flex-col gap-5 order-2 lg:order-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold">
                  Dress Code
                </p>
                <h3 className="font-display italic text-[#0F0F0F] text-3xl lg:text-[40px] leading-[1.1]">
                  Formal &amp;<br/>Traditional.
                </h3>
                <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md mt-2">
                  Traditional Nigerian attire is welcomed for the Traditional Marriage on Thursday.
                </p>
                <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
                  Formal attire is warmly encouraged for the White Wedding and Reception on Saturday.
                </p>
                <div className="flex items-center gap-4 max-w-sm mt-3">
                  <span className="font-display italic text-[#2D4C3B] text-base">Thursday</span>
                  <div className="flex-1 h-px bg-[#2D4C3B]/25" />
                  <span className="font-display italic text-[#2D4C3B]/50 text-base">&amp;</span>
                  <div className="flex-1 h-px bg-[#2D4C3B]/25" />
                  <span className="font-display italic text-[#2D4C3B] text-base">Saturday</span>
                </div>
              </Reveal>
            </div>

            {/* ── BAND III: Order of the Day — horizontal timeline + photo strip ── */}
            <div className="flex flex-col items-center">

              {/* Heading */}
              <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#0F0F0F]/55 font-semibold mb-3">
                Saturday
              </Reveal>
              <Reveal delay={0.08} as="h3" className="font-display text-[#0F0F0F] text-3xl lg:text-[44px] leading-[1.05] text-center">
                The Order of the Day.
              </Reveal>
              {/* Arrow-leaf divider */}
              <Reveal delay={0.16} className="flex items-center justify-center gap-3 mt-5">
                <span className="block h-px w-16 bg-[#2D4C3B]/30" />
                <svg width="34" height="12" viewBox="0 0 40 14" fill="none" stroke="#2D4C3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 7 L11 3"/><path d="M6 7 L11 11"/>
                  <path d="M16 7 L21 3"/><path d="M16 7 L21 11"/>
                  <path d="M26 7 L31 3"/><path d="M26 7 L31 11"/>
                </svg>
                <span className="block h-px w-16 bg-[#2D4C3B]/30" />
              </Reveal>

              {/* Horizontal timeline */}
              <Reveal delay={0.25} className="relative w-full max-w-3xl mt-14 lg:mt-16">
                {/* Line */}
                <div className="absolute left-0 right-0 top-[34px] h-px bg-[#2D4C3B]/25" />
                {/* End-cap dots */}
                <span className="absolute left-0 top-[34px] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2D4C3B]" />
                <span className="absolute right-0 top-[34px] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2D4C3B]" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-6 lg:gap-x-16">
                  {programme.map((p, i) => (
                    <div key={p.event} className="flex flex-col items-center text-center">
                      {/* Icon circle (sits on the line) */}
                      <div className="relative z-10 w-[68px] h-[68px] rounded-full bg-[#2D4C3B] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(45,76,59,0.28)]">
                        <VenueIcon kind={p.icon} />
                      </div>
                      {/* Stem + dot below circle */}
                      <span className="block w-px h-3 bg-[#2D4C3B]/35 mt-1" aria-hidden="true" />
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#2D4C3B]" aria-hidden="true" />

                      {/* Event info */}
                      <p className="font-display italic text-[#0F0F0F]/70 text-[14.5px] mt-5">
                        {p.time}
                      </p>
                      <p className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F] mt-2">
                        {p.event}
                      </p>
                      <p className="font-display italic text-[#0F0F0F]/55 text-[13.5px] leading-[1.75] mt-2 max-w-[18rem]">
                        {p.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* 4-photo strip */}
              <Reveal delay={0.35} className="w-full mt-14 lg:mt-16">
                <StaggerGroup stagger={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-2.5">
                  {[
                    { src: progCeremony, alt: 'Wedding ceremony venue' },
                    { src: progTable, alt: 'Reception table florals' },
                    { src: progDinner, alt: 'Reception dinner' },
                    { src: progFlorals, alt: 'Floral details' },
                  ].map((img, i) => (
                    <StaggerItem key={i} className="relative overflow-hidden rounded-sm aspect-[4/3] group">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.45} className="mt-10 lg:mt-12">
                <Link
                  to="/order-of-events"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase font-semibold text-[#0F0F0F]/80 border border-[#0F0F0F]/25 px-7 py-3.5 hover:bg-[#2D4C3B] hover:text-white hover:border-[#2D4C3B] transition-all duration-300"
                >
                  Full Week&rsquo;s Schedule
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3.5 GIFTS ── PLACEHOLDER: replace bank/Opay/PalmPay values with real details */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
              With Gratitude
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-[44px] leading-[1.15]">
              Your Presence Is Our <span className="text-[#2D4C3B]">Present</span>
            </Reveal>
            {/* Bow divider */}
            <Reveal delay={0.18} className="flex items-center justify-center gap-3 mt-6">
              <span className="block h-px w-16 bg-[#2D4C3B]/30" />
              <svg width="22" height="14" viewBox="0 0 32 20" fill="none" stroke="#2D4C3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 10c-3-4-7-5-9-3s-1 6 2 7c2 .6 5-1 7-4z"/>
                <path d="M16 10c3-4 7-5 9-3s1 6-2 7c-2 .6-5-1-7-4z"/>
                <circle cx="16" cy="10" r="1.5" fill="#2D4C3B"/>
              </svg>
              <span className="block h-px w-16 bg-[#2D4C3B]/30" />
            </Reveal>
            <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-lg mx-auto mt-5">
              If you wish to bless us further, the following details are kindly provided for your convenience.
            </Reveal>
          </div>

          {/* Cards grid */}
          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 items-start">

            {/* Bank Transfer — light card */}
            <StaggerItem className="bg-[#f7f6f2] rounded-2xl shadow-[0_2px_24px_rgba(15,15,15,0.05)] p-7 lg:p-8 flex flex-col gap-5 md:mt-10">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2D4C3B]/10 flex items-center justify-center text-[#2D4C3B] flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6M3 10h18"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display italic text-[#0F0F0F] text-xl leading-tight">Bank Transfer</h3>
                  <p className="text-[12.5px] text-[#0F0F0F]/55 leading-snug mt-1">Direct transfer to our account</p>
                </div>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#0F0F0F]/45 font-semibold">Bank</p>
                    <p className="text-[#0F0F0F]/80 mt-0.5 text-[13.5px]">[Bank name &mdash; TBD]</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 4 21 10 15 10"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#0F0F0F]/45 font-semibold">Account Number</p>
                    <p className="text-[#0F0F0F]/80 mt-0.5 text-[13.5px] font-mono tracking-wider">0000 0000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#0F0F0F]/45 font-semibold">Account Name</p>
                    <p className="text-[#0F0F0F]/80 mt-0.5 text-[13.5px]">[Account holder &mdash; TBD]</p>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-2 bg-white/70 rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-[#2D4C3B] flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <p className="text-[12px] text-[#0F0F0F]/60 leading-[1.65]">
                  Please confirm payment for proper acknowledgment.
                </p>
              </div>
            </StaggerItem>

            {/* Opay — dark green, centered, elevated */}
            <StaggerItem className="relative bg-[#2D4C3B] text-[#FFFFFF] rounded-2xl shadow-[0_10px_36px_rgba(45,76,59,0.28)] p-7 lg:p-8 flex flex-col gap-5 overflow-hidden">
              {/* Dot pattern decoration top-right */}
              <svg className="absolute top-4 right-4 opacity-30 pointer-events-none" width="60" height="36" viewBox="0 0 60 36" fill="none" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, row) =>
                  Array.from({ length: 8 }).map((_, col) => (
                    <circle key={`${row}-${col}`} cx={4 + col * 7} cy={4 + row * 7} r="1" fill="#FFFFFF" />
                  ))
                )}
              </svg>

              {/* Centered header */}
              <div className="flex flex-col items-center text-center gap-3 pt-2">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#FFFFFF]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="12" y1="18" x2="12" y2="18.01"/>
                  </svg>
                </div>
                <h3 className="font-display italic text-[#FFFFFF] text-2xl">Opay</h3>
                <p className="text-[11.5px] tracking-[0.18em] text-[#FFFFFF]/65">Fast &middot; Secure &middot; Convenient</p>
              </div>

              {/* Divider */}
              <span className="block h-px bg-white/15" />

              {/* Fields */}
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#FFFFFF]/55 font-semibold">Phone Number</p>
                  <p className="text-[#FFFFFF] mt-0.5 text-[15px] font-semibold font-mono tracking-wider">+234 [TBD]</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#FFFFFF]/55 font-semibold">Account Name</p>
                  <p className="text-[#FFFFFF] mt-0.5 text-[15px] font-semibold">[Account holder &mdash; TBD]</p>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-auto bg-white/10 rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-[#FFFFFF] flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <p className="text-[12px] text-[#FFFFFF]/75 leading-[1.65]">
                  Payments via Opay are quick and secure.
                </p>
              </div>
            </StaggerItem>

            {/* PalmPay — light card */}
            <StaggerItem className="bg-[#f7f6f2] rounded-2xl shadow-[0_2px_24px_rgba(15,15,15,0.05)] p-7 lg:p-8 flex flex-col gap-5 md:mt-10">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2D4C3B]/10 flex items-center justify-center text-[#2D4C3B] flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/><path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display italic text-[#0F0F0F] text-xl leading-tight">PalmPay</h3>
                  <p className="text-[12.5px] text-[#0F0F0F]/55 leading-snug mt-1">Send using PalmPay instantly</p>
                </div>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="12" y1="18" x2="12" y2="18.01"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#0F0F0F]/45 font-semibold">Phone Number</p>
                    <p className="text-[#0F0F0F]/80 mt-0.5 text-[13.5px] font-mono tracking-wider">+234 [TBD]</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/10 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#0F0F0F]/45 font-semibold">Account Name</p>
                    <p className="text-[#0F0F0F]/80 mt-0.5 text-[13.5px]">[Account holder &mdash; TBD]</p>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-auto bg-white/70 rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-[#2D4C3B] flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <p className="text-[12px] text-[#0F0F0F]/60 leading-[1.65]">
                  Ensure details are correct before making payment.
                </p>
              </div>
            </StaggerItem>

          </StaggerGroup>

          {/* Appreciation banner */}
          <Reveal delay={0.3} className="mt-10 bg-[#f7f6f2] rounded-2xl px-6 lg:px-8 py-5 lg:py-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5 overflow-hidden relative">
            <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
              <span className="w-12 h-12 rounded-full bg-[#2D4C3B] text-white flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/>
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-[#0F0F0F] text-[14.5px]">Every gift is deeply appreciated.</p>
                <p className="text-[13px] text-[#0F0F0F]/60 leading-[1.7] mt-0.5">Thank you for being a part of our special day!</p>
              </div>
            </div>
            {/* Decorative gift box */}
            <svg className="opacity-25 flex-shrink-0 hidden sm:block" width="120" height="70" viewBox="0 0 120 70" fill="none" stroke="#2D4C3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {/* Main box */}
              <rect x="42" y="34" width="36" height="28" rx="1"/>
              <line x1="60" y1="34" x2="60" y2="62"/>
              <path d="M42 38h36"/>
              {/* Bow */}
              <path d="M60 34c-4-5-9-6-12-4s-1 7 3 7c3 0 7-1 9-3z"/>
              <path d="M60 34c4-5 9-6 12-4s1 7-3 7c-3 0-7-1-9-3z"/>
              {/* Smaller box */}
              <rect x="82" y="42" width="20" height="20" rx="1"/>
              <line x1="92" y1="42" x2="92" y2="62"/>
              <path d="M82 46h20"/>
              <path d="M92 42c-2-3-5-3-6-1.5s0 3.5 2 3.5"/>
              <path d="M92 42c2-3 5-3 6-1.5s0 3.5-2 3.5"/>
              {/* Hearts/sparkles */}
              <path d="M28 30l1.5 2 1.5-2"/>
              <path d="M112 30l1.5 2 1.5-2"/>
              <circle cx="22" cy="48" r="0.8" fill="#2D4C3B"/>
              <circle cx="108" cy="20" r="0.8" fill="#2D4C3B"/>
              <circle cx="36" cy="22" r="0.8" fill="#2D4C3B"/>
            </svg>
          </Reveal>

        </div>
      </section>

      {/* ── 3.6 TRAVEL & STAY — accordion timeline + map ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

            {/* LEFT: heading + accordion timeline */}
            <div className="flex flex-col">
              <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
                Travel &amp; Stay
              </Reveal>
              <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-4xl lg:text-5xl leading-[1.05]">
                Getting to<br/>Benin City
              </Reveal>
              <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-md mt-5">
                For our guests travelling from afar, a few helpful notes to make your journey easier.
              </Reveal>

              <Reveal delay={0.3} className="flex flex-col gap-4 mt-10">
                {travelStops.map((stop, i) => (
                  <TravelStopItem
                    key={stop.key}
                    stop={stop}
                    isOpen={openTravel === i}
                    onToggle={() => setOpenTravel(openTravel === i ? -1 : i)}
                    isLast={i === travelStops.length - 1}
                  />
                ))}
              </Reveal>
            </div>

            {/* RIGHT: map + venue footer */}
            <Reveal delay={0.2} className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(15,15,15,0.06)] overflow-hidden">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] bg-stone-100">
                <iframe
                  title="Wedding venue map — Benin City"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
                {/* Pin label overlay */}
                <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-start gap-2">
                  <span className="w-9 h-9 rounded-full bg-[#2D4C3B] text-white flex items-center justify-center shadow-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="bg-white rounded-md shadow-md px-2.5 py-1.5 text-left">
                    <span className="block text-[11.5px] font-semibold text-[#0F0F0F]">Event Venue</span>
                    <span className="block text-[10px] text-[#0F0F0F]/60">Benin City, Edo State</span>
                  </span>
                </div>
              </div>
              {/* Venue footer card */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-stone-100">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-[#2D4C3B]/8 text-[#2D4C3B] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-semibold text-[#0F0F0F]">Event Venue</span>
                    <span className="block text-[12px] text-[#0F0F0F]/55 truncate">Benin City, Edo State, Nigeria.</span>
                  </span>
                </div>
                <a
                  href={MAP_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.18em] uppercase px-4 py-2.5 bg-[#2D4C3B] text-white rounded-full hover:bg-[#3a6050] transition-colors flex-shrink-0"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                  Get Directions
                </a>
              </div>
            </Reveal>
          </div>

          {/* Travel Tips footer + Need Help */}
          <Reveal delay={0.4} className="mt-10 bg-white rounded-2xl shadow-[0_2px_18px_rgba(15,15,15,0.04)] border border-stone-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-[#2D4C3B]/8 text-[#2D4C3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[#0F0F0F]">Travel Tips</p>
                <p className="text-[12.5px] text-[#0F0F0F]/55 leading-[1.7]">
                  Flight schedules change frequently. We recommend booking early and allowing extra time for local transport.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 border border-[#2D4C3B]/30 text-[#2D4C3B] rounded-full hover:bg-[#2D4C3B] hover:text-white transition-colors flex-shrink-0"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3zM3 19a2 2 0 0 0 2 2h1v-7H3z"/>
              </svg>
              Need Help?
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FAQ ── */}
      <section className="bg-white py-16 lg:py-24 border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
              Frequently Asked
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl">
              Questions
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="border-t border-stone-200">
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. CONTACT US ── */}
      <section id="contact" className="bg-[#f7f6f2] py-16 lg:py-24 border-t border-stone-100 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
              Contact Us
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl mb-4">
              We&rsquo;re Here to Help
            </Reveal>
            <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-lg mx-auto">
              For enquiries, special requests, directions, or additional information regarding the celebration, kindly reach out through any of the contacts below.
            </Reveal>
          </div>

          {/* 3 columns: Call / WhatsApp / Email */}
          <StaggerGroup stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-5 items-stretch">

            {/* Call Us */}
            <StaggerItem className="bg-white rounded-2xl shadow-[0_2px_24px_rgba(15,15,15,0.05)] border border-stone-100 p-7 lg:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D4C3B]/10 flex items-center justify-center text-[#2D4C3B]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h3 className="font-display italic text-[#0F0F0F] text-xl">Call Us</h3>
              </div>
              <div className="flex flex-col divide-y divide-stone-100">
                {[
                  { name: 'Glory', number: '+234 701 786 5671' },
                  { name: 'Ella', number: '+234 701 345 2195' },
                  { name: 'Kelvin', number: '+234 902 407 1421' },
                  { name: 'Coordinator', number: '+234 902 407 1421' },
                ].map((c) => (
                  <div key={c.name + c.number} className="flex items-center justify-between gap-3 py-2.5 text-[13.5px]">
                    <span className="text-[#0F0F0F]/55">{c.name}</span>
                    <a
                      href={`tel:${c.number.replace(/\s/g, '')}`}
                      className="text-[#2D4C3B] font-medium hover:underline"
                    >
                      {c.number}
                    </a>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* WhatsApp — dark green card */}
            <StaggerItem className="bg-[#2D4C3B] rounded-2xl shadow-[0_6px_28px_rgba(45,76,59,0.22)] p-7 lg:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 className="font-display italic text-[#FFFFFF] text-xl">WhatsApp</h3>
              </div>
              <p className="text-[#FFFFFF]/70 text-[13.5px] leading-[1.85] flex-1">
                For quick responses and assistance, message us on WhatsApp.
              </p>
              <a
                href="https://wa.me/2348084315949"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display italic text-[#FFFFFF] text-lg hover:opacity-80 transition-opacity mt-auto"
              >
                +234 808 431 5949 →
              </a>
            </StaggerItem>

            {/* Email */}
            <StaggerItem className="bg-white rounded-2xl shadow-[0_2px_24px_rgba(15,15,15,0.05)] border border-stone-100 p-7 lg:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D4C3B]/10 flex items-center justify-center text-[#2D4C3B]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h3 className="font-display italic text-[#0F0F0F] text-xl">Email</h3>
              </div>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] flex-1">
                For longer enquiries, written requests, or anything more detailed.
              </p>
              <a
                href="mailto:jossyandchrisforever@gmail.com"
                className="text-[14px] font-medium text-[#2D4C3B] hover:underline break-all mt-auto"
              >
                jossyandchrisforever@gmail.com
              </a>
            </StaggerItem>

          </StaggerGroup>

          {/* Closing line */}
          <Reveal delay={0.4} className="text-center mt-14">
            <p className="font-display italic text-[#0F0F0F]/60 text-[15.5px] lg:text-base leading-[1.85] max-w-xl mx-auto">
              We look forward to celebrating this beautiful occasion with you in Benin City.
            </p>
          </Reveal>
        </div>
      </section>

    </PageTransition>
  )
}
