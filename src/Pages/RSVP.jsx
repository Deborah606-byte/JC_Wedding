import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import { submitRsvp } from '../lib/api'
import AddToCalendar from '../Components/AddToCalendar'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import heroBg    from '../assets/flower1.png'   // full-width botanical background
import rsvpFloral from '../assets/flower2.png'   // dark floral/roses photo left of form

// ── Wedding-day programme ──
const programme = [
  { event: 'White Wedding Ceremony', time: '4:00 PM' },
  { event: 'Reception & Celebration', time: 'After Ceremony' },
]

// ── Venue data ──
const venues = [
  {
    label: 'Wedding Ceremony',
    name: 'Assurance Of Salvation Ministries Inc Fire Centre',
    sub: 'Irhinmwirin Mega Church (FC8)',
    address: 'No. 2 Freedom Street, Off Enogie Palace Road, Through St. Saviour, Benin City',
    mapQuery: 'Assurance Of Salvation Ministries Fire Centre Irhinmwirin Benin City',
  },
  {
    label: 'Reception',
    name: 'Reception Venue',
    sub: null,
    address: '1st Igiewie Street, Off Enogie Palace Road, St. Saviour Road, Benin City',
    mapQuery: '1st Igiewie Street, Off Enogie Palace Road, St. Saviour Road, Benin City',
  },
]

// ── FAQ data ──
const faqs = [
  {
    q: 'When should I RSVP by?',
    a: 'Kindly respond no later than September 24, 2026. This helps us finalize seating, catering, and the small details that make the day flow smoothly.',
  },
  {
    q: 'What time should I arrive on the wedding day?',
    a: 'Please arrive at least 30 minutes before the 4:00 PM church ceremony so you can be seated before the processional begins.',
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
          className="flex-shrink-0 w-7 h-7 rounded-full border border-[#2D4C3B]/30 flex items-center justify-center text-[#2D4C3B] group-hover:bg-[#2D4C3B] group-hover:text-white transition-colors"
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
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
      <div className="absolute inset-0 bg-[#2D4C3B]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] tracking-[0.35em] uppercase text-white font-semibold drop-shadow"
        >
          Join Us in Celebration
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: '#ffffff' }}
          className="font-display italic text-white text-4xl lg:text-6xl xl:text-7xl leading-[1.1] drop-shadow-lg max-w-3xl"
        >
          Kindly respond by the twenty-fourth of September
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: 'rgba(255,255,255,0.85)' }}
          className="text-white/85 text-[14px] leading-[1.85] max-w-md mt-2 drop-shadow"
        >
          We look forward to celebrating this special milestone with those we love most in the heart of Benin City.
        </motion.p>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    attending: 'Yes, gladly',
    guests: 'One Guest',
    contact: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const handleSubmit = async () => {
    if (!form.name || !form.attending || submitting) return
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
                className="w-full h-64 lg:h-full object-cover"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Venue info bottom */}
              <div className="absolute bottom-6 left-6">
                <p className="font-display italic text-white text-xl lg:text-2xl drop-shadow">
                  The Celebration
                </p>
                <p className="text-white/65 text-[11px] tracking-[0.2em] uppercase mt-1">
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
                      style={{ color: '#ffffff' }}
                      className="bg-[#2D4C3B] text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#3a6050] transition-colors duration-300 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
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

      {/* ── 3. PRACTICAL INFORMATION ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <Reveal as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl mb-2">
              Practical Information
            </Reveal>
            <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold">
              The Details of the Day
            </Reveal>
          </div>

          {/* 3 columns */}
          <StaggerGroup stagger={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-start">

            {/* Col 1: Venues */}
            <StaggerItem className="flex flex-col gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <h3 className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl">Where We&rsquo;ll Be</h3>
              <div className="flex flex-col gap-5">
                {venues.map((v) => (
                  <div key={v.label} className="flex flex-col gap-1.5">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                      {v.label}
                    </p>
                    <p className="font-display italic text-[#0F0F0F] text-[15px] leading-tight">
                      {v.name}
                    </p>
                    {v.sub && (
                      <p className="text-[12px] text-[#0F0F0F]/55 leading-relaxed">{v.sub}</p>
                    )}
                    <p className="text-[12px] text-[#0F0F0F]/55 leading-relaxed">{v.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10.5px] tracking-[0.18em] uppercase font-semibold text-[#2D4C3B] hover:underline w-fit mt-1"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Col 2: Dress Code — dark green card */}
            <StaggerItem style={{ color: '#ffffff' }} className="bg-[#2D4C3B] p-8 flex flex-col items-center text-center gap-5">
              {/* Hanger icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8c5b5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 18H3.62a1 1 0 0 1-.76-1.64L12 6"/><path d="M12 6a2 2 0 1 1 1.73-3"/><line x1="12" y1="6" x2="12" y2="4"/>
              </svg>
              <div>
                <h3 style={{ color: '#ffffff' }} className="font-display italic text-xl lg:text-2xl mb-2">What to Wear</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)' }} className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-5">
                  Formal &amp; Traditional
                </p>
                <div className="w-8 h-px bg-white/20 mx-auto mb-5" />
                <p style={{ color: 'rgba(255,255,255,0.7)' }} className="text-[13px] leading-[1.8]">
                  Formal attire for the White Wedding on Saturday. Traditional Nigerian attire is warmly encouraged for the Traditional Marriage on Thursday.
                </p>
              </div>
            </StaggerItem>

            {/* Col 3: Programme of the Day */}
            <StaggerItem className="flex flex-col gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <h3 className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl">Saturday Programme</h3>
              <p className="text-[12px] text-[#0F0F0F]/50 leading-relaxed -mt-1">
                The order of the wedding day. Full week&rsquo;s schedule on the Order of Events page.
              </p>
              <div className="flex flex-col divide-y divide-stone-200">
                {programme.map(({ event, time }) => (
                  <div key={event} className="flex items-center justify-between gap-3 py-3">
                    <span className="text-[13.5px] text-[#0F0F0F]/70 leading-tight">{event}</span>
                    <span className="text-[11px] font-semibold text-[#2D4C3B] tracking-wide flex-shrink-0 text-right">{time}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/order-of-events"
                className="text-[10.5px] tracking-[0.18em] uppercase font-semibold text-[#2D4C3B] hover:underline w-fit"
              >
                Full Week&rsquo;s Schedule →
              </Link>
            </StaggerItem>

          </StaggerGroup>
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
      <section className="bg-[#f7f6f2] py-16 lg:py-24 border-t border-stone-100">
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
            <StaggerItem className="bg-white border border-stone-200 p-7 lg:p-8 flex flex-col gap-5">
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
            <StaggerItem
              style={{ color: '#ffffff' }}
              className="bg-[#2D4C3B] p-7 lg:p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 style={{ color: '#ffffff' }} className="font-display italic text-white text-xl">WhatsApp</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)' }} className="text-white/70 text-[13.5px] leading-[1.85] flex-1">
                For quick responses and assistance, message us on WhatsApp.
              </p>
              <a
                href="https://wa.me/2348084315949"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff' }}
                className="inline-flex items-center gap-2 font-display italic text-white text-lg hover:opacity-80 transition-opacity mt-auto"
              >
                +234 808 431 5949 →
              </a>
            </StaggerItem>

            {/* Email */}
            <StaggerItem className="bg-white border border-stone-200 p-7 lg:p-8 flex flex-col gap-5">
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
