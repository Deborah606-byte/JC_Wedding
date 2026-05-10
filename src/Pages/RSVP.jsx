import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import heroBg    from '../assets/flower1.png'   // full-width botanical background
import rsvpFloral from '../assets/flower2.png'   // dark floral/roses photo left of form

// ── Timeline data ──────────────────────────────────────────
const timeline = [
  { event: 'Ceremony',       time: '4:00 PM' },
  { event: 'Cocktail Hour',  time: '5:30 PM' },
  { event: 'Dinner & Toast', time: '7:00 PM' },
  { event: 'Dancing',        time: '9:00 PM' },
]

// ── FAQ data ──
const faqs = [
  {
    q: 'What time should I arrive?',
    a: 'Please arrive at least 30 minutes before the 4:00 PM ceremony so you can be seated and settled before the processional begins.',
  },
  {
    q: 'Is there a dress code?',
    a: 'Black tie preferred. We invite you to lean into timeless elegance and botanical tones — soft greens, ivory, deep neutrals, and floral accents are all welcome.',
  },
  {
    q: 'Can I bring a plus one?',
    a: 'We have reserved seats for the names listed on your invitation. If you would like to bring a guest who is not named, please contact the bridal party first.',
  },
  {
    q: 'Are children welcome?',
    a: 'We adore your little ones, but we have planned an adults-only celebration so that everyone can fully relax and enjoy the evening.',
  },
  {
    q: 'Where can I park?',
    a: 'Parking is available at both the church and the reception venue. Attendants will be on hand to direct you on arrival.',
  },
  {
    q: 'Will the celebration be indoors or outdoors?',
    a: 'A blend of both — the ceremony is indoors, while cocktails and parts of the reception are in the gardens. We recommend dressing for an evening that may begin warm and cool down later.',
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
          className="font-display italic text-[#2D4C3B] text-4xl lg:text-6xl xl:text-7xl leading-[1.1] drop-shadow-sm max-w-3xl"
        >
          Kindly respond by the twenty-fourth of September
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#0F0F0F]/65 text-[14px] leading-[1.85] max-w-md mt-2"
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
    guests: 'One Guest',
    meal: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleSubmit = () => {
    if (!form.name || !form.meal) return
    setSubmitted(true)
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
                  <p className="text-[#0F0F0F]/50 text-sm">We've received your RSVP and can't wait to celebrate with you.</p>
                </div>
              ) : (
                <>
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
                          className="w-full border border-stone-200 focus:border-[#2D4C3B] outline-none px-3 py-2 text-[13.5px] text-[#0F0F0F] bg-white appearance-none cursor-pointer transition-colors"
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

                  {/* Meal preference */}
                  <div>
                    <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-3">
                      Meal Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {['Beef Bourguignon', 'Roasted Sea Bass', 'Herb Gnocchi (V)'].map((option) => (
                        <label key={option} className="flex items-center gap-2.5 cursor-pointer group">
                          <div
                            onClick={() => setForm({ ...form, meal: option })}
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
                              form.meal === option
                                ? 'border-[#2D4C3B]'
                                : 'border-stone-300 group-hover:border-stone-400'
                            }`}
                          >
                            {form.meal === option && (
                              <div className="w-2 h-2 rounded-full bg-[#2D4C3B]" />
                            )}
                          </div>
                          <span
                            onClick={() => setForm({ ...form, meal: option })}
                            className="text-[13px] text-[#0F0F0F]/70 select-none"
                          >
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold block mb-2">
                      A Note for the Couple
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Dietary restrictions or a warm message…"
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                      className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[13.5px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent resize-none transition-colors"
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                    <button
                      onClick={handleSubmit}
                      style={{ color: '#ffffff' }}
                      className="bg-[#2D4C3B] text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#3a6050] transition-colors duration-300 flex-shrink-0"
                    >
                      Confirm Attendance
                    </button>
                    <p className="text-[11px] text-[#0F0F0F]/35 leading-relaxed">
                      Kindly contact the bridal party for special requests.
                    </p>
                  </div>
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

            {/* Col 1: The Sanctuary / Location */}
            <StaggerItem className="flex flex-col gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <h3 className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl mb-2">Ceremony &amp; Reception</h3>
                <p className="text-[#0F0F0F]/50 text-[13px] leading-[1.8]">
                  A church ceremony followed by the reception, both in Benin City, Nigeria. Please arrive 30 minutes early to be seated.
                </p>
              </div>
              {/* Map embed — Benin City */}
              <div className="mt-2 overflow-hidden rounded-sm border border-stone-200">
                <iframe
                  title="Map of Benin City, Nigeria"
                  src="https://maps.google.com/maps?q=Benin+City+Nigeria&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Benin+City+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#2D4C3B] hover:underline"
              >
                Open in Google Maps →
              </a>
            </StaggerItem>

            {/* Col 2: Dress Code — dark green card */}
            <StaggerItem style={{ color: '#ffffff' }} className="bg-[#2D4C3B] p-8 flex flex-col items-center text-center gap-5">
              {/* Hanger icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8c5b5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 18H3.62a1 1 0 0 1-.76-1.64L12 6"/><path d="M12 6a2 2 0 1 1 1.73-3"/><line x1="12" y1="6" x2="12" y2="4"/>
              </svg>
              <div>
                <h3 style={{ color: '#ffffff' }} className="font-display italic text-xl lg:text-2xl mb-2">The Dress Code</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-5">
                  Black Tie Preferred
                </p>
                <div className="w-8 h-px bg-white/20 mx-auto mb-5" />
                <p style={{ color: 'rgba(255,255,255,0.65)' }} className="text-[13px] leading-[1.8]">
                  We invite you to join us in formal attire. Think timeless elegance and botanical tones.
                </p>
              </div>
            </StaggerItem>

            {/* Col 3: The Timeline */}
            <StaggerItem className="flex flex-col gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <h3 className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl">The Timeline</h3>
              <div className="flex flex-col divide-y divide-stone-200">
                {timeline.map(({ event, time }) => (
                  <div key={event} className="flex items-center justify-between py-3">
                    <span className="text-[13.5px] text-[#0F0F0F]/70">{event}</span>
                    <span className="text-[12px] font-semibold text-[#2D4C3B] tracking-wide">{time}</span>
                  </div>
                ))}
              </div>
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

    </PageTransition>
  )
}
