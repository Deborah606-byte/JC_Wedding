import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import PageTransition from '../Components/PageTransition'
import Reveal from '../Components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import heroFlowers1  from '../assets/order of events.png'   // hero image (main)
import event01Img    from '../assets/court wedding.png'    // Court Wedding
import event02Img    from '../assets/traditional marriage.png'    // Traditional Marriage
import event03ImgA   from '../assets/flower5.webp'    // Bridal Shower
import event03ImgB   from '../assets/flower6.webp'    // Bachelor Party
import event05Img    from '../assets/flower1.webp'    // Reception & Celebration
import event06Img    from '../assets/flower2.webp'    // Thanksgiving Service

// ── Shared number label ────────────────────────────────────
function EventNumber({ n, className = '', style }) {
  const colorClassName = className.trim().length ? className : 'text-[#0F0F0F]/20'
  return (
    <span
      style={style}
      className={`font-display text-5xl lg:text-6xl leading-none select-none ${colorClassName}`}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}

// ── Hero with parallax ──
function OrderHero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const flowerY = useTransform(scrollY, [0, 600], [0, 80])

  return (
    <section ref={ref} className="bg-white overflow-hidden pt-8 lg:pt-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[380px]">

          <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">
            <div className="w-full">
              <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-4">
                The Celebration Week
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-[#0F0F0F] text-4xl lg:text-5xl leading-[1.05] mb-5">
                  The Order<br />
                  <span className="italic">of Events</span>
                </h1>
              </Reveal>
              <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/45 text-[14px] leading-[1.85] max-w-xs">
                Five days of celebration in Benin City — from the civil ceremony to a closing thanksgiving, woven together by family, tradition, and faith.
              </Reveal>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-[42%] flex-shrink-0 relative h-52 lg:h-full"
          >
            <motion.img
              src={heroFlowers1}
              alt="Josephine & Christopher"
              style={{ y: flowerY }}
              fetchPriority="high"
              decoding="async"
              className="w-full h-[120%] object-cover object-[center_25%]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function OrderOfEvents() {
  usePageTitle('Order of Events')
  return (
    <PageTransition>

      <OrderHero />

      {/* ── EVENT 01: Welcome Drinks ── */}
      <section className="bg-white py-14 lg:py-20 border-t border-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            <Reveal x={-40} y={0} className="lg:w-[38%] flex-shrink-0 flex flex-col gap-3">
              <EventNumber n={1} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Court Wedding</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Wednesday · October 21
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1">
                The civil ceremony at the marriage registry — where Josephine and Christopher are joined in law before close family.
              </p>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex-1 overflow-hidden">
              <img src={event01Img} alt="Court Wedding" loading="lazy" decoding="async" className="w-full h-60 lg:h-72 object-cover object-[center_20%] hover:scale-105 transition-transform duration-700" />
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── EVENT 02: The Ceremony ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

            <Reveal x={-40} y={0} className="lg:w-[52%] flex-shrink-0 relative">
              <img src={event02Img} alt="Traditional Marriage" loading="lazy" decoding="async" className="w-full h-72 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-4 right-0 translate-x-4 lg:translate-x-8 bg-white shadow-lg p-4 w-52"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D4C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="font-display italic text-[#0F0F0F] text-[13px]">Bride's Family</span>
                </div>
                <p className="text-[11px] text-[#0F0F0F]/45 leading-relaxed">
                  Benin City · Guests are encouraged to wear traditional attire.
                </p>
              </motion.div>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex-1 flex flex-col gap-3 lg:pt-10">
              <EventNumber n={2} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Traditional Marriage</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Thursday · October 22
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1 max-w-xs">
                The honoring of culture and heritage. Families gather for the customary rites, blessings, and the joining of two homes.
              </p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── EVENT 03: Cocktail Hour ── */}
      <section className="bg-white py-14 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            <Reveal x={-40} y={0} className="lg:w-[34%] flex-shrink-0 flex flex-col gap-3">
              <EventNumber n={3} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Bridal Shower &amp; Bachelor Party</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Friday · October 23
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1">
                Two celebrations, one day — the bride and groom mark the eve of the wedding apart with their closest friends.
              </p>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex-1 grid grid-cols-2 gap-3">
              <div className="overflow-hidden relative group">
                <img src={event03ImgA} alt="Bridal Shower" loading="lazy" decoding="async" className="w-full h-52 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#2D4C3B]">
                  Bridal Shower
                </span>
              </div>
              <div className="overflow-hidden mt-6 relative group">
                <img src={event03ImgB} alt="Bachelor Party" loading="lazy" decoding="async" className="w-full h-52 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#2D4C3B]">
                  Bachelor Party
                </span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── EVENT 04: Dinner & Dancing (full-width green) ── */}
      <section className="bg-[#2D4C3B] text-[#FFFFFF] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <Reveal>
            <EventNumber n={4} className="text-[#FFFFFF]/20" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display italic text-3xl lg:text-5xl leading-tight">
              White Wedding
            </h2>
          </Reveal>
          <Reveal delay={0.2} as="p" className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#FFFFFF]/50">
            Saturday · October 24 · 9:00 AM
          </Reveal>
          <Reveal delay={0.3} as="p" className="text-[14px] leading-[1.85] max-w-md mt-2 text-[#FFFFFF]/60">
            We exchange vows before God, family, and friends as we begin our new journey together in love and faith.
          </Reveal>
          <Reveal delay={0.45} className="mt-5">
            <div className="flex items-start gap-3 max-w-md text-left bg-white/[0.06] border border-white/15 px-5 py-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#FFFFFF]/70">
                  Wedding Venue
                </p>
                <p className="text-[12.5px] leading-[1.7] mt-1.5 text-[#FFFFFF]/85">
                  Assurance Of Salvation Ministries Inc Fire Centre,<br />
                  Irhinmwirin Mega Church (FC8)<br />
                  No. 2 Freedom Street, Off Enogie Palace Road,<br />
                  Through St. Saviour, Benin City
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EVENT 05: Reception & Celebration ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            <Reveal x={-40} y={0} className="lg:w-[52%] flex-shrink-0 overflow-hidden">
              <img src={event05Img} alt="Reception & Celebration" loading="lazy" decoding="async" className="w-full h-72 lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex-1 flex flex-col gap-3">
              <EventNumber n={5} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Reception &amp; Celebration</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Saturday · Immediately After the Ceremony
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1 max-w-sm">
                Join us for an evening of love, music, dining, dancing, and unforgettable memories as we celebrate together into the night.
              </p>
              <div className="flex items-start gap-2.5 mt-3 max-w-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D4C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                    Reception Venue
                  </p>
                  <p className="text-[12.5px] text-[#0F0F0F]/60 leading-[1.7] mt-1">
                    1st Igiewie Street, Off Enogie Palace Road,<br />
                    St. Saviour Road, Benin City
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── EVENT 06: Thanksgiving Service ── */}
      <section className="bg-white py-14 lg:py-20 border-t border-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            <Reveal x={-40} y={0} className="lg:w-[38%] flex-shrink-0 flex flex-col gap-3">
              <EventNumber n={6} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Thanksgiving Service</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Sunday · October 25, 2026
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1">
                With grateful hearts, we gather for a thanksgiving service to appreciate God&rsquo;s faithfulness, love, and blessings throughout our wedding celebrations.
              </p>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15} className="flex-1 overflow-hidden">
              <img src={event06Img} alt="Thanksgiving Service" loading="lazy" decoding="async" className="w-full h-60 lg:h-72 object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>

          </div>
        </div>
      </section>

    </PageTransition>
  )
}
