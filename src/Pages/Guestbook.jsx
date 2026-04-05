import { useState } from 'react'
import Layout from '../components/Layout'

// 🖼️ Replace with your actual asset imports
import botanicalImg from '../assets/happy.jpg'   // flower/botanical photo bottom-left
import guestImg1    from '../assets/happy.jpg'      // Uncle David card photo

// ── Sample blessings data ──────────────────────────────────
const initialBlessings = [
  {
    id: 1,
    name: 'Sarah & Michael',
    date: 'June 12, 2024',
    message: 'To the most beautiful couple. May your journey together be as stunning as this day. We still remember that first camping trip where we knew you two were made for each other. All our love!',
    type: 'plain',
    tag: null,
  },
  {
    id: 2,
    name: 'Uncle David',
    date: 'June 11, 2024',
    message: 'Watching you grow from a curious little girl into the woman you are today has been the joy of my life. Michael is a lucky man, but then again, you both are.',
    type: 'photo',
    tag: 'A Life-Long Blessing',
    img: guestImg1,
  },
  {
    id: 3,
    name: 'The Miller Cousins',
    date: 'June 10, 2024',
    message: "Can't wait to tear up the dance floor with you both! So incredibly happy to welcome Michael into the family (officially!). Cheers to a lifetime of adventures.",
    type: 'featured',
    tag: null,
  },
  {
    id: 4,
    name: 'Elena & Thomas',
    date: 'June 10, 2024',
    message: 'A marriage is not just two people, but two stories becoming one. We are so honored to be part of this chapter.',
    type: 'minimal',
    tag: null,
  },
]

// ── Blessing card variants ─────────────────────────────────
function PlainCard({ name, date, message }) {
  return (
    <div className="bg-white border border-stone-200 rounded-sm p-6 flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-[#2D4C3B] flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-[#0F0F0F] text-[15px]">{name}</span>
          <span className="text-[11px] text-[#0F0F0F]/35 flex-shrink-0 ml-4">{date}</span>
        </div>
        <p className="text-[#0F0F0F]/60 text-[13.5px] leading-[1.75] italic">"{message}"</p>
      </div>
    </div>
  )
}

function PhotoCard({ name, date, message, tag, img }) {
  return (
    <div className="bg-white border border-stone-200 rounded-sm overflow-hidden flex flex-col sm:flex-row">
      {img && (
        <div className="sm:w-44 flex-shrink-0">
          <img src={img} alt={name} className="w-full h-44 sm:h-full object-cover" />
        </div>
      )}
      <div className="p-6 flex flex-col justify-center gap-3">
        <span className="font-semibold text-[#0F0F0F] text-[16px]">{name}</span>
        <p className="text-[#0F0F0F]/60 text-[13.5px] leading-[1.75] italic">"{message}"</p>
        {tag && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D4C3B] font-semibold">{tag}</span>
        )}
      </div>
    </div>
  )
}

function FeaturedCard({ name, message }) {
  return (
    <div className="bg-[#2D4C3B] rounded-sm p-7 relative overflow-hidden">
      {/* Faint leaf watermark */}
      <div className="absolute bottom-3 right-4 opacity-10 text-white">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s0-8-7-8c0 0 3 5 2 11z"/>
        </svg>
      </div>
      <h3 className="font-display italic text-white text-xl mb-4">{name}</h3>
      <p className="text-white/75 text-[13.5px] leading-[1.8] italic">"{message}"</p>
    </div>
  )
}

function MinimalCard({ name, date, message }) {
  return (
    <div className="py-6 border-b border-stone-200 flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-display italic text-[#0F0F0F] text-lg">{name}</span>
          <span className="text-[10px] text-[#0F0F0F]/35 tracking-wide">{date}</span>
        </div>
        <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.75] italic">"{message}"</p>
      </div>
      {/* Share icon */}
      <button className="flex-shrink-0 w-9 h-9 rounded-md border border-stone-200 flex items-center justify-center hover:border-[#2D4C3B] transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F0F0F]/40">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
      </button>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function Guestbook() {
  const [blessings, setBlessings] = useState(initialBlessings)
  const [showAll, setShowAll] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const visibleBlessings = showAll ? blessings : blessings.slice(0, 4)

  const handleSubmit = () => {
    if (!form.name.trim() || !form.message.trim()) return
    const newBlessing = {
      id: Date.now(),
      name: form.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      message: form.message,
      type: 'minimal',
      tag: null,
    }
    setBlessings([newBlessing, ...blessings])
    setForm({ name: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="bg-[#f7f6f2] pt-16 pb-14 lg:pt-20 lg:pb-18 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4C3B] font-semibold mb-5">
            Guestbook
          </p>
          <h1 className="font-display text-[#0F0F0F] text-4xl lg:text-6xl leading-[1.1] mb-6">
            Leave a blessing,<br />
            <span className="italic">share a memory</span>
          </h1>
          <p className="text-[#0F0F0F]/55 text-[15px] leading-[1.85] max-w-md mx-auto">
            Your presence is our greatest gift, but your words are our most cherished
            keepsake. Please share a note for us to look back on for years to come.
          </p>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT ── */}
      <section className="bg-[#f7f6f2] pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── LEFT: Form + botanical photo ── */}
            <div className="w-full lg:w-[38%] flex flex-col gap-4 lg:sticky lg:top-28">

              {/* Write form */}
              <div className="bg-white border border-stone-200 rounded-sm p-7">
                <h2 className="font-display italic text-[#0F0F0F] text-xl mb-6">Write to us</h2>

                <div className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#0F0F0F]/40 font-semibold block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. The Anderson Family"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[14px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#0F0F0F]/40 font-semibold block mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share a blessing or a favorite memory…"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full border-0 border-b border-stone-200 focus:border-[#2D4C3B] outline-none pb-2 text-[14px] text-[#0F0F0F] placeholder-[#0F0F0F]/25 bg-transparent resize-none transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#2D4C3B] text-white text-[11px] font-semibold tracking-[0.25em] uppercase py-3.5 rounded-sm hover:bg-[#3a6050] transition-colors duration-300 flex items-center justify-center gap-2 mt-2"
                  >
                    {submitted ? 'Blessing Sent ✓' : (
                      <>
                        Send Blessing
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Botanical photo */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={botanicalImg}
                  alt="Botanical"
                  className="w-full h-48 lg:h-56 object-cover"
                />
              </div>
            </div>

            {/* ── RIGHT: Blessing cards ── */}
            <div className="flex-1 flex flex-col gap-4">
              {visibleBlessings.map((b) => {
                if (b.type === 'plain')    return <PlainCard    key={b.id} {...b} />
                if (b.type === 'photo')    return <PhotoCard    key={b.id} {...b} />
                if (b.type === 'featured') return <FeaturedCard key={b.id} {...b} />
                if (b.type === 'minimal')  return <MinimalCard  key={b.id} {...b} />
                return null
              })}

              {/* View all toggle */}
              {blessings.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="self-end flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#0F0F0F]/40 hover:text-[#2D4C3B] transition-colors font-medium mt-2"
                >
                  {showAll ? 'Show Less ↑' : 'View All Memories ↓'}
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

    </Layout>
  )
}

