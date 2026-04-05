import { useState } from 'react'
import Layout from '../Components/Layout'

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

// ── Page ───────────────────────────────────────────────────
export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    guests: 'One Guest',
    meal: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.meal) return
    setSubmitted(true)
  }

  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[420px] lg:min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background botanical image */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Green tinted overlay */}
        <div className="absolute inset-0 bg-[#2D4C3B]/30" />
        {/* Soft vignette bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />

        {/* Text */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-20">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white font-semibold drop-shadow">
            Join Us in Celebration
          </p>
          <h1 className="font-display italic text-[#2D4C3B] text-4xl lg:text-6xl xl:text-7xl leading-[1.1] drop-shadow-sm max-w-3xl">
            Kindly respond by the fifteenth of July
          </h1>
          <p className="text-[#0F0F0F]/65 text-[14px] leading-[1.85] max-w-md mt-2">
            We look forward to celebrating this special milestone with those we love most in the heart of the botanical gardens.
          </p>
        </div>
      </section>

      {/* ── 2. RSVP FORM ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row shadow-sm border border-stone-100">

            {/* Left: dark floral photo with venue overlay */}
            <div className="lg:w-[42%] flex-shrink-0 relative overflow-hidden">
              <img
                src={rsvpFloral}
                alt="The Conservatory"
                className="w-full h-64 lg:h-full object-cover"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Venue info bottom */}
              <div className="absolute bottom-6 left-6">
                <p className="font-display italic text-white text-xl lg:text-2xl drop-shadow">
                  The Conservatory
                </p>
                <p className="text-white/65 text-[11px] tracking-[0.2em] uppercase mt-1">
                  November 15, 2025 · London
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
                      className="bg-[#2D4C3B] text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#3a6050] transition-colors duration-300 flex-shrink-0"
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
          </div>
        </div>
      </section>

      {/* ── 3. PRACTICAL INFORMATION ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl mb-2">
              Practical Information
            </h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold">
              The Details of the Day
            </p>
          </div>

          {/* 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-start">

            {/* Col 1: The Sanctuary / Location */}
            <div className="flex flex-col gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <h3 className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl mb-2">The Sanctuary</h3>
                <p className="text-[#0F0F0F]/50 text-[13px] leading-[1.8]">
                  Royal Botanical Gardens, Main Conservatory. Please arrive 30 minutes early to be seated.
                </p>
              </div>
              {/* Map pin illustration */}
              <div className="flex justify-center mt-4">
                <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
                  <ellipse cx="26" cy="26" rx="22" ry="22" fill="#e5e5e5" stroke="#ccc" strokeWidth="1"/>
                  <circle cx="26" cy="26" r="8" fill="#bbb"/>
                  <path d="M26 48 C26 48 26 64 26 64" stroke="#ccc" strokeWidth="3" strokeLinecap="round"/>
                  <ellipse cx="26" cy="65" rx="6" ry="2" fill="#e5e5e5"/>
                </svg>
              </div>
            </div>

            {/* Col 2: Dress Code — dark green card */}
            <div className="bg-[#2D4C3B] text-white p-8 flex flex-col items-center text-center gap-5">
              {/* Hanger icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8c5b5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 18H3.62a1 1 0 0 1-.76-1.64L12 6"/><path d="M12 6a2 2 0 1 1 1.73-3"/><line x1="12" y1="6" x2="12" y2="4"/>
              </svg>
              <div>
                <h3 className="font-display italic text-white text-xl lg:text-2xl mb-2">The Dress Code</h3>
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/50 font-semibold mb-5">
                  Black Tie Preferred
                </p>
                <div className="w-8 h-px bg-white/20 mx-auto mb-5" />
                <p className="text-white/65 text-[13px] leading-[1.8]">
                  We invite you to join us in formal attire. Think timeless elegance and botanical tones.
                </p>
              </div>
            </div>

            {/* Col 3: The Timeline */}
            <div className="flex flex-col gap-4">
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
            </div>

          </div>
        </div>
      </section>

    </Layout>
  )
}

