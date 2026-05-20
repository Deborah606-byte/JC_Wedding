import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import { submitBlessing, fetchBlessings, isApiConfigured } from '../lib/api'
import usePageTitle from '../hooks/usePageTitle'

// 🖼️ Replace with your actual asset imports
import botanicalImg from '../assets/happy.webp'   // flower/botanical photo bottom-left

// ── Card type cycle (visual variety for backend-driven entries) ──
const CARD_TYPES = ['featured', 'plain', 'minimal', 'plain']

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

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

function FeaturedCard({ name, message }) {
  return (
    <div className="bg-[#2D4C3B] text-white rounded-sm p-7 relative overflow-hidden">
      {/* Faint leaf watermark */}
      <div className="absolute bottom-3 right-4 opacity-10 text-white">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s0-8-7-8c0 0 3 5 2 11z"/>
        </svg>
      </div>
      <h3 className="font-display italic text-xl mb-4">{name}</h3>
      <p className="text-[13.5px] leading-[1.8] italic">"{message}"</p>
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
  usePageTitle('Guestbook')
  const [blessings, setBlessings] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    let cancelled = false
    if (!isApiConfigured) {
      setLoading(false)
      return
    }
    fetchBlessings()
      .then(entries => {
        if (cancelled) return
        const decorated = entries.map((e, i) => ({
          id: e.timestamp + i,
          name: e.name,
          message: e.message,
          date: formatDate(e.timestamp),
          type: CARD_TYPES[i % CARD_TYPES.length],
          tag: null,
        }))
        setBlessings(decorated)
      })
      .catch(err => {
        if (cancelled) return
        setLoadError(err.message || 'Could not load blessings.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const visibleBlessings = showAll ? blessings : blessings.slice(0, 4)

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim() || submitting) return
    // Honeypot — if filled, silently "succeed" without submitting.
    if (honeypot) {
      setForm({ name: '', message: '' })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      await submitBlessing({ name: form.name, message: form.message })
      setForm({ name: '', message: '' })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setSubmitError(err.message || 'Could not send. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTransition>

      {/* ── 1. HERO ── */}
      <section className="bg-[#f7f6f2] pt-16 pb-14 lg:pt-20 lg:pb-18 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal as="p" className="text-[10px] tracking-[0.35em] uppercase text-[#2D4C3B] font-semibold mb-5">
            Guestbook
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[#0F0F0F] text-4xl lg:text-6xl leading-[1.1] mb-6">
              Leave a blessing,<br />
              <span className="italic">share a memory</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/55 text-[15px] leading-[1.85] max-w-md mx-auto">
            Your presence is our greatest gift, but your words are our most cherished
            keepsake. Please share a note for us to look back on for years to come.
          </Reveal>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT ── */}
      <section className="bg-[#f7f6f2] pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── LEFT: Form + botanical photo ── */}
            <Reveal x={-30} y={0} className="w-full lg:w-[38%] flex flex-col gap-4 lg:sticky lg:top-28">

              {/* Write form */}
              <div className="bg-white border border-stone-200 rounded-sm p-7">
                <h2 className="font-display italic text-[#0F0F0F] text-xl mb-6">Write to us</h2>

                <div className="flex flex-col gap-5">
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
                    disabled={submitting}
                                       className="w-full bg-[#2D4C3B] text-[11px] font-semibold tracking-[0.25em] uppercase py-3.5 rounded-sm hover:bg-[#3a6050] transition-colors duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending…' : submitted ? 'Blessing Sent ✓' : (
                      <>
                        Send Blessing
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>

                  {submitted && (
                    <p className="text-[12px] text-[#2D4C3B] bg-[#2D4C3B]/[0.06] border border-[#2D4C3B]/15 px-3 py-2 leading-relaxed">
                      Thank you. Your blessing has been received and will appear here once the couple approves it.
                    </p>
                  )}
                  {submitError && (
                    <p className="text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">
                      {submitError}
                    </p>
                  )}
                </div>
              </div>

              {/* Botanical photo */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={botanicalImg}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 lg:h-56 object-cover"
                />
              </div>
            </Reveal>

            {/* ── RIGHT: Blessing cards ── */}
            <div className="flex-1 flex flex-col gap-4">
              {loading && (
                <div className="flex flex-col gap-4" aria-label="Loading blessings" aria-busy="true">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="bg-white border border-stone-200 rounded-sm p-6 flex gap-4 animate-pulse">
                      <div className="w-9 h-9 rounded-md bg-stone-200 flex-shrink-0" />
                      <div className="flex-1 min-w-0 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="h-3 bg-stone-200 rounded w-1/3" />
                          <div className="h-3 bg-stone-100 rounded w-20" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 bg-stone-100 rounded w-full" />
                          <div className="h-2.5 bg-stone-100 rounded w-11/12" />
                          <div className="h-2.5 bg-stone-100 rounded w-4/5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && loadError && (
                <div className="bg-red-50 border border-red-200 rounded-sm px-6 py-5 text-[13px] text-red-700">
                  {loadError}
                </div>
              )}

              {!loading && !loadError && blessings.length === 0 && (
                <div className="bg-white border border-stone-200 rounded-sm px-6 py-10 text-center">
                  <p className="font-display italic text-[#0F0F0F] text-lg mb-1">No blessings yet</p>
                  <p className="text-[13px] text-[#0F0F0F]/50">Be the first to leave a note for the couple.</p>
                </div>
              )}

              <StaggerGroup stagger={0.1} className="flex flex-col gap-4">
                {visibleBlessings.map((b) => (
                  <StaggerItem key={b.id}>
                    {b.type === 'plain'    && <PlainCard    {...b} />}
                    {b.type === 'featured' && <FeaturedCard {...b} />}
                    {b.type === 'minimal'  && <MinimalCard  {...b} />}
                  </StaggerItem>
                ))}

                {/* View all toggle */}
                {blessings.length > 4 && (
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => setShowAll(!showAll)}
                    className="self-end flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#0F0F0F]/40 hover:text-[#2D4C3B] transition-colors font-medium mt-2"
                  >
                    {showAll ? 'Show Less ↑' : 'View All Memories ↓'}
                  </motion.button>
                )}
              </StaggerGroup>
            </div>

          </div>
        </div>
      </section>

    </PageTransition>
  )
}
