import Layout from '../Components/Layout'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import bm1 from '../assets/maid1.png'  
import bm2 from '../assets/maid2.png'  
import bm3 from '../assets/maid3.png'  
import bm4 from '../assets/maid4.png'  
import gm1 from '../assets/men1.png'   
import gm2 from '../assets/men2.png'   
import gm3 from '../assets/men3.png'  

function SectionTitle({ title }) {
  return (
    <h2 className="font-display italic text-[#2D4C3B] text-2xl lg:text-3xl mb-10">{title}</h2>
  )
}

function PersonCard({ imageSrc, imageAlt, name, bio, label, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="overflow-hidden rounded-sm bg-white shadow-sm group">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-[320px] sm:h-[360px] lg:h-[400px] object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-1">
        {label ? (
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#2D4C3B] font-semibold">{label}</p>
        ) : null}
        <p className="font-display italic text-[#0F0F0F]/80 text-[16px] lg:text-[17px] mt-1">{name}</p>
        <p className="text-[#0F0F0F]/55 text-[13px] leading-[1.75] mt-2">{bio}</p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function WeddingParty() {
  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="bg-white pt-14 pb-10 lg:pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
            Meet the Inner Circle
          </p>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
            <h1 className="font-display text-[#2D4C3B] text-5xl lg:text-6xl leading-tight flex-shrink-0">
              The Wedding Party
            </h1>
            <p className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-xs lg:pt-3">
              The people who've been there since chapter one. Our confidants, our troublemakers, and our forever friends.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. BRIDESMAIDS ── */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionTitle title="The Bridesmaids" />

          {/* ROW 1: Sarah large left + Elena small right */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">

            {/* Sarah — large, name overlay bottom-left */}
            <div className="md:w-[55%] flex-shrink-0 flex flex-col gap-3">
              <div className="relative overflow-hidden group">
                <img
                  src={bm1}
                  alt="Sarah Jenkins"
                  className="w-full h-[380px] lg:h-[460px] object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
                {/* Name tag overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-2">
                  <p className="font-semibold text-[#0F0F0F] text-[13px] leading-none">Sarah Jenkins</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#0F0F0F]/50 mt-0.5">Maid of Honor</p>
                </div>
              </div>
              {/* Bio below Sarah */}
              <p className="text-[#0F0F0F]/50 text-[12.5px] leading-relaxed">
                Met in 3rd grade over a shared love of glitter pens. Sarah is the architect of our wildest adventures and the keeper of all my secrets since 1998.
              </p>
            </div>

            {/* Elena — small top-right, name + bio below */}
            <div className="flex-1 flex flex-col gap-3 md:pt-12">
              <div className="overflow-hidden group">
                <img
                  src={bm2}
                  alt="Elena Rodriguez"
                  className="w-full h-52 lg:h-64 object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="font-semibold text-[#0F0F0F] text-[14px]">Elena Rodriguez</p>
                <p className="text-[#0F0F0F]/50 text-[12.5px] leading-relaxed mt-1">
                  The one who will definitely start the dance battle and knows every word to 2000s R&B.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: Chloe small left + Maya large portrait right */}
          <div className="flex flex-col md:flex-row gap-4 items-start">

            {/* Chloe — small left, name + bio below */}
            <div className="md:w-[32%] flex-shrink-0 flex flex-col gap-3">
              <div className="overflow-hidden group">
                <img
                  src={bm3}
                  alt="Chloe Bennett"
                  className="w-full h-52 lg:h-64 object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="font-semibold text-[#0F0F0F] text-[14px]">Chloe Bennett</p>
                <p className="text-[#0F0F0F]/50 text-[12.5px] leading-relaxed mt-1">
                  My college roommate and the voice of reason. Chloe has a PhD in 'Calming Me Down'.
                </p>
              </div>
            </div>

            {/* Maya — large portrait right with bio card beside/below */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-[55%] overflow-hidden group flex-shrink-0">
                <img
                  src={bm4}
                  alt="Maya Lin"
                  className="w-full h-64 lg:h-80 object-cover object-top grayscale transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Bio card */}
              <div className="bg-[#f7f6f2] p-5 flex-1 self-stretch flex flex-col justify-center gap-3">
                <p className="font-semibold text-[#0F0F0F] text-[15px]">Maya Lin</p>
                <p className="text-[#0F0F0F]/55 text-[12.5px] leading-relaxed">
                  Friendship forged in the fires of design school. Maya is the botanical curator behind our floral vision and a lifelong partner in crime.
                </p>
                {/* Leaf */}
                <svg width="14" height="18" viewBox="0 0 24 24" fill="#2D4C3B" className="opacity-60">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s0-8-7-8c0 0 3 5 2 11z"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. GROOMSMEN ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="font-display text-[#0F0F0F]/80 text-xl lg:text-2xl mb-10">The Groomsmen</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            <PersonCard
              imageSrc={gm1}
              imageAlt="David Thorne"
              label="BEST MAN"
              name="David Thorne"
              bio="The guy who once convinced me that moving to London with £500 was a brilliant tactical maneuver. We made it."
            />
            <PersonCard
              imageSrc={gm2}
              imageAlt="Marcus Vane"
              className="lg:mt-16"
              name="Marcus Vane"
              bio="Expert in craft beer; mediocre at golf; and the first person I call when something breaks. Usually it's my car."
            />
            <PersonCard
              imageSrc={gm3}
              imageAlt="Julian Chen"
              name="Julian Chen"
              bio="The culinary genius of the group. If the reception food is good, it's because Julian approved the tasting menu."
            />
          </div>
        </div>
      </section>
    

    </Layout>
  )
}
