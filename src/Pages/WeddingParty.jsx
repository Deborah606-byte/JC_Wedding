import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import bm1 from '../assets/maid1.webp'  
import bm2 from '../assets/maid2.webp'  
import bm3 from '../assets/maid3.webp'  
import bm4 from '../assets/maid4.webp'  
import gm1 from '../assets/men1.webp'   
import gm2 from '../assets/men2.webp'   
import gm3 from '../assets/men3.webp'  

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
          loading="lazy"
          decoding="async"
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
  usePageTitle('Wedding Party')
  return (
    <PageTransition>

      {/* ── 1. HERO ── */}
      <section className="bg-white pt-14 pb-10 lg:pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
            Meet the Inner Circle
          </Reveal>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
            <Reveal delay={0.1}>
              <h1 className="font-display text-[#2D4C3B] text-5xl lg:text-6xl leading-tight flex-shrink-0">
                The Wedding Party
              </h1>
            </Reveal>
            <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-xs lg:pt-3">
              The people who've been there since chapter one. Our confidants, our troublemakers, and our forever friends.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. BRIDESMAIDS ── */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionTitle title="The Bridesmaids" />
          </Reveal>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            <StaggerItem>
              <PersonCard
                imageSrc={bm1}
                imageAlt="Sarah Jenkins"
                label="MAID OF HONOR"
                name="Sarah Jenkins"
                bio="Met in 3rd grade over a shared love of glitter pens. Sarah is the architect of our wildest adventures and the keeper of all my secrets since 1998."
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm2}
                imageAlt="Elena Rodriguez"
                name="Elena Rodriguez"
                bio="The one who will definitely start the dance battle and knows every word to 2000s R&B."
              />
            </StaggerItem>

            <StaggerItem>
              <PersonCard
                imageSrc={bm3}
                imageAlt="Chloe Bennett"
                name="Chloe Bennett"
                bio="My college roommate and the voice of reason. Chloe has a PhD in 'Calming Me Down'."
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm4}
                imageAlt="Maya Lin"
                name="Maya Lin"
                bio="Friendship forged in the fires of design school. Maya is our botanical curator and lifelong partner in crime."
              />
            </StaggerItem>

            <StaggerItem>
              <PersonCard
                imageSrc={bm2}
                imageAlt="Priya Kumar"
                name="Priya Kumar"
                bio="My yoga partner and travel co-conspirator. Priya plans our trips with spreadsheet-grade precision."
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm1}
                imageAlt="Zoe Hart"
                name="Zoe Hart"
                bio="The art-school maverick. Zoe will be the loudest at the reception and first on the dance floor."
              />
            </StaggerItem>

          </StaggerGroup>
        </div>
      </section>

      {/* ── 3. GROOMSMEN ── */}
      <section className="bg-[#f7f6f2] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal as="h2" className="font-display text-[#0F0F0F]/80 text-xl lg:text-2xl mb-10">The Groomsmen</Reveal>

          <StaggerGroup stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            <StaggerItem>
              <PersonCard
                imageSrc={gm1}
                imageAlt="David Thorne"
                label="BEST MAN"
                name="David Thorne"
                bio="The guy who once convinced me that moving to London with £500 was a brilliant tactical maneuver. We made it."
              />
            </StaggerItem>
            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={gm2}
                imageAlt="Marcus Vane"
                name="Marcus Vane"
                bio="Expert in craft beer; mediocre at golf; and the first person I call when something breaks. Usually it's my car."
              />
            </StaggerItem>
            <StaggerItem>
              <PersonCard
                imageSrc={gm3}
                imageAlt="Julian Chen"
                name="Julian Chen"
                bio="The culinary genius of the group. If the reception food is good, it's because Julian approved the tasting menu."
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

    </PageTransition>
  )
}
