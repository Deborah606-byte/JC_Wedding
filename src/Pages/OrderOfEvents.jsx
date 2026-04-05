import Layout from '../Components/Layout'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import heroFlowers1  from '../assets/flower1.png'   // top-right flowers (top)
import heroFlowers2  from '../assets/flower2.png'   // top-right flowers (bottom)
import event01Img    from '../assets/flower3.png'    // Welcome Drinks
import event02Img    from '../assets/flower4.png'  // The Ceremony
import event03ImgA   from '../assets/flower5.png' // Cocktail Hour left
import event03ImgB   from '../assets/flower6.png' // Cocktail Hour right
import event05Img    from '../assets/flower1.png'   // Grand Send-off

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

// ── Page ───────────────────────────────────────────────────
export default function OrderOfEvents() {
  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="bg-white overflow-hidden pt-8 lg:pt-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[380px]">

            <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">
              <div className="w-full">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-4">
                  The Weekend
                </p>
                <h1 className="font-display text-[#0F0F0F] text-4xl lg:text-5xl leading-[1.05] mb-5">
                  The Order<br />
                  <span className="italic">of Events</span>
                </h1>
                <p className="text-[#0F0F0F]/45 text-[14px] leading-[1.85] max-w-xs">
                  A curation of moments designed for connection, celebration, and the beauty of the botanical surroundings at Oakwood Estate.
                </p>
              </div>
            </div>

            <div className="lg:w-[42%] flex-shrink-0 relative h-52 lg:h-full">
              <img
                src={heroFlowers1}
                alt="Flowers"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-0 -translate-x-8 border-4 border-white shadow-xl w-[40%]">
                <img
                  src={heroFlowers2}
                  alt="Fern"
                  className="w-full h-28 lg:h-36 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── EVENT 01: Welcome Drinks ── */}
      <section className="bg-white py-14 lg:py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Text left */}
            <div className="lg:w-[38%] flex-shrink-0 flex flex-col gap-3">
              <EventNumber n={1} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Welcome Drinks</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Friday · 5:30 PM
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1">
                Join us for artisanal botanical cocktails and small plates under the glass conservatory at the North Wing.
              </p>
              <button className="text-[11px] tracking-[0.18em] text-[#0F0F0F]/40 hover:text-[#2D4C3B] transition-colors flex items-center gap-1 mt-1 w-fit">
                View Attire: Garden Chic →
              </button>
            </div>

            {/* Photo right */}
            <div className="flex-1 overflow-hidden">
              <img src={event01Img} alt="Welcome Drinks" className="w-full h-60 lg:h-72 object-cover hover:scale-105 transition-transform duration-700" />
            </div>

          </div>
        </div>
      </section>

      {/* ── EVENT 02: The Ceremony ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

            {/* Photo left */}
            <div className="lg:w-[52%] flex-shrink-0 relative">
              <img src={event02Img} alt="The Ceremony" className="w-full h-72 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700" />
              {/* Floating location card */}
              <div className="absolute bottom-4 right-0 translate-x-4 lg:translate-x-8 bg-white shadow-lg p-4 w-52">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D4C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="font-display italic text-[#0F0F0F] text-[13px]">The Sacred Grove</span>
                </div>
                <p className="text-[11px] text-[#0F0F0F]/45 leading-relaxed">
                  Please arrive by 3:45 PM for the processional.
                </p>
              </div>
            </div>

            {/* Text right */}
            <div className="flex-1 flex flex-col gap-3 lg:pt-10">
              <EventNumber n={2} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">The Ceremony</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Saturday · 4:00 PM
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1 max-w-xs">
                Under the canopy of the ancient Great Oak. We exchange vows in the presence of family and nature.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── EVENT 03: Cocktail Hour ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Text left */}
            <div className="lg:w-[34%] flex-shrink-0 flex flex-col gap-3">
              <EventNumber n={3} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Cocktail Hour</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Saturday · 5:00 PM
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1">
                Music on the lawn. Refreshing botanical spritzers and lawn games as the sun begins to set.
              </p>
            </div>

            {/* Two photos right */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="overflow-hidden">
                <img src={event03ImgA} alt="Cocktail Hour" className="w-full h-52 lg:h-64 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden mt-6">
                <img src={event03ImgB} alt="Cocktail Hour" className="w-full h-52 lg:h-64 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── EVENT 04: Dinner & Dancing (full-width green) ── */}
      <section style={{ color: '#ffffff' }} className="bg-[#2D4C3B] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <EventNumber n={4} style={{ color: 'rgba(255,255,255,0.2)' }} />
          <h2 style={{ color: '#ffffff' }} className="font-display italic text-3xl lg:text-5xl leading-tight">
            Dinner &amp; Dancing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-[10px] tracking-[0.28em] uppercase font-semibold">
            Saturday · 6:30 PM Until Late
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-[14px] leading-[1.85] max-w-md mt-2">
            A farm-to-table feast served family-style, followed by a night of movement and melody under the stars.
          </p>
          {/* Feature tags */}
          <div className="flex items-center gap-6 mt-4 flex-wrap justify-center">
            {['Main Hall', 'Live Quartet', 'Open Bar'].map((tag) => (
              <span key={tag} style={{ color: 'rgba(255,255,255,0.4)' }} className="text-[10px] tracking-[0.25em] uppercase font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT 05: Grand Send-off ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Large dark photo left */}
            <div className="lg:w-[52%] flex-shrink-0 overflow-hidden">
              <img src={event05Img} alt="Grand Send-off" className="w-full h-72 lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Text right */}
            <div className="flex-1 flex flex-col gap-3">
              <EventNumber n={5} />
              <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl mt-1">Grand Send-off</h2>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">
                Saturday · 11:45 PM
              </p>
              <p className="text-[#0F0F0F]/55 text-[13.5px] leading-[1.85] mt-1 max-w-xs">
                Sparklers and well-wishes as the new couple departs for their next chapter.
              </p>
            </div>

          </div>
        </div>
      </section>

    </Layout>
  )
}
