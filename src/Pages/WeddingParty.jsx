import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import moh from '../assets/wedding/maid of honour.jpeg'
import bm1 from '../assets/wedding/Blessing Ehimwenma Normwengho.jpeg'
import bm2 from '../assets/wedding/Elohor Felix.jpeg'
import bm3 from '../assets/wedding/Evelynlee.jpeg'
import bm4 from '../assets/wedding/Melody Oke.jpeg'
import bm5 from '../assets/wedding/Racheal Richie.jpeg'
import gm1 from '../assets/wedding/Mighty Shalom.jpeg'
import gm2 from '../assets/wedding/MANAGER OGHENEYOLE PROMISE.jpeg'
import gm3 from '../assets/wedding/Abraham Daniel.jpeg'

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
        <p className="font-display italic font-bold text-[#2D4C3B] text-[16px] lg:text-[17px] mt-1">{name}</p>
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
                imageSrc={moh}
                imageAlt="Ella Oghogho Ekhator"
                label="MAID OF HONOUR"
                name="Ella Oghogho Ekhator"
                bio="[Bio — TBD]"
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm1}
                imageAlt="Blessing Ehimwenma Normwengho"
                name="Blessing Ehimwenma Normwengho"
                bio="[Bio — TBD]"
              />
            </StaggerItem>

            <StaggerItem>
              <PersonCard
                imageSrc={bm2}
                imageAlt="Elohor Felix"
                name="Elohor Felix"
                bio="[Bio — TBD]"
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm3}
                imageAlt="Evelynlee"
                name="Evelynlee"
                bio="[Bio — TBD]"
              />
            </StaggerItem>

            <StaggerItem>
              <PersonCard
                imageSrc={bm4}
                imageAlt="Melody Oke"
                name="Melody Oke"
                bio="[Bio — TBD]"
              />
            </StaggerItem>

            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={bm5}
                imageAlt="Racheal Richie"
                name="Racheal Richie"
                bio="[Bio — TBD]"
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
                imageAlt="Mighty Shalom"
                label="BEST MAN"
                name="Mighty Shalom"
                bio="[Bio — TBD]"
              />
            </StaggerItem>
            <StaggerItem className="lg:mt-16">
              <PersonCard
                imageSrc={gm2}
                imageAlt="Manager Ogheneyole Promise"
                name="Manager Ogheneyole Promise"
                bio="[Bio — TBD]"
              />
            </StaggerItem>
            <StaggerItem>
              <PersonCard
                imageSrc={gm3}
                imageAlt="Abraham Daniel"
                name="Abraham Daniel"
                bio="[Bio — TBD]"
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

    </PageTransition>
  )
}
