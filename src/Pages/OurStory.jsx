import { motion } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import Lightbox, { useLightbox } from '../Components/Lightbox'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import storyImg1   from '../assets/happy.jpg'   // When We Met photo
import storyImg2   from '../assets/32089.jpg'   // First Date photo
import storyImg3   from '../assets/47639.jpg'   // The Proposal photo
import collected1  from '../assets/happy.jpg'
import collected2  from '../assets/32089.jpg'
import collected3  from '../assets/47639.jpg'
import collected4  from '../assets/pic1.png'
import collected5  from '../assets/home-hero.png'

// ── Timeline chapters ──────────────────────────────────────
const chapters = [
  {
    id: 1,
    date: 'May 2018',
    title: 'When We Met',
    body: 'It started with a simple question about a biology textbook. Under the canopy of the campus oak trees, a conversation began that neither of us wanted to end.',
    img: storyImg1,
    imgLeft: true,
  },
  {
    id: 2,
    date: 'June 2018',
    title: 'First Date',
    body: 'Dinner at the Orchid Bistro. We spent four hours talking about everything from our favourite childhood plants to our wildest dreams for the future.',
    img: storyImg2,
    imgLeft: false,
  },
  {
    id: 3,
    date: 'October 2023',
    title: 'The Proposal',
    body: 'In the gardens of Benin City, surrounded by the whispers of the canopy and the scent of frangipani, he asked a question that would change the rest of our lives.',
    img: storyImg3,
    imgLeft: true,
  },
]

// ── Chapter block ──────────────────────────────────────────
function Chapter({ date, title, body, img, imgLeft }) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-0 w-full overflow-hidden">

      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full lg:w-1/2 ${imgLeft ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-72 lg:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0
          ${imgLeft ? 'lg:order-2' : 'lg:order-1 text-right lg:items-end'}`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-3">
          {date}
        </p>
        <h2 className="font-display text-[#0F0F0F] text-3xl lg:text-4xl mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-[#0F0F0F]/55 text-[15px] leading-[1.85] max-w-sm">
          {body}
        </p>
      </motion.div>

    </div>
  )
}

const collageImages = [
  { src: collected1, alt: 'Josephine and Christopher together' },
  { src: collected2, alt: 'Josephine and Christopher together' },
  { src: collected3, alt: 'Josephine and Christopher together' },
  { src: collected4, alt: 'Josephine and Christopher together' },
  { src: collected5, alt: 'Josephine and Christopher together' },
]

// ── Page ───────────────────────────────────────────────────
export default function OurStory() {
  const lb = useLightbox(collageImages)

  return (
    <PageTransition>

      {/* ── 1. HERO HEADER ── */}
      <section className="bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-4">
            The Journey
          </Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <Reveal delay={0.1}>
              <h1 className="font-display text-[#0F0F0F] text-5xl lg:text-7xl leading-[1.05] flex-shrink-0">
                A Botanical<br />
                <span className="italic">Love Story.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/55 text-[15px] leading-[1.9] max-w-sm lg:pb-2">
              From the shared quiet of a university library to the vibrant gardens of Benin City,
              this is the story of two souls finding their rhythm in the wild beauty of the world.
            </Reveal>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 h-px bg-stone-200 w-full origin-left"
          />
        </div>
      </section>

      {/* ── 2. TIMELINE CHAPTERS ── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-0 divide-y divide-stone-100">
            {chapters.map((ch) => (
              <div key={ch.id} className="py-12 lg:py-0 lg:h-[480px] overflow-hidden">
                <Chapter {...ch} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COLLECTED MOMENTS ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="flex items-end justify-between mb-8">
            <Reveal as="h2" className="font-display text-[#0F0F0F] text-2xl lg:text-3xl">
              Collected Moments
            </Reveal>
            <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.25em] uppercase text-[#0F0F0F]/35 font-medium hidden md:block">
              A Visual Diary
            </Reveal>
          </div>

          <StaggerGroup stagger={0.1} className="grid grid-cols-3 grid-rows-2 gap-2 h-[420px] lg:h-[560px]">
            <StaggerItem className="col-span-1 row-span-2 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(0)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 1 of 5">
                <img src={collected1} alt="Josephine and Christopher together" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
            <StaggerItem className="col-span-1 row-span-1 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(1)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 2 of 5">
                <img src={collected2} alt="Josephine and Christopher together" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
            <div className="col-span-1 row-span-1 grid grid-rows-2 gap-2">
              <StaggerItem className="overflow-hidden rounded-sm">
                <button onClick={() => lb.open(2)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 3 of 5">
                  <img src={collected3} alt="Josephine and Christopher together" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </button>
              </StaggerItem>
              <StaggerItem className="overflow-hidden rounded-sm">
                <button onClick={() => lb.open(3)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 4 of 5">
                  <img src={collected4} alt="Josephine and Christopher together" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </button>
              </StaggerItem>
            </div>
            <StaggerItem className="col-span-2 row-span-1 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(4)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 5 of 5">
                <img src={collected5} alt="Josephine and Christopher together" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* ── 4. PULL QUOTE ── */}
      <section className="bg-[#f7f6f2] pb-20 lg:pb-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-stone-300 mb-12 mx-auto w-24 origin-center"
          />
          <Reveal as="blockquote" className="font-display italic text-[#0F0F0F] text-2xl lg:text-3xl leading-relaxed mb-5">
            "In every walk with nature, one receives far more than he seeks."
          </Reveal>
          <Reveal delay={0.15} as="p" className="text-[11px] tracking-[0.25em] uppercase text-[#2D4C3B] font-semibold">
            — John Muir
          </Reveal>
        </div>
      </section>

      <Lightbox
        images={collageImages}
        index={lb.index}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />

    </PageTransition>
  )
}

