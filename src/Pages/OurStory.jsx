import Layout from '../components/Layout'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import storyImg1   from '../assets/happy.jpg'   // When We Met photo
import storyImg2   from '../assets/32089.jpg'   // First Date photo
import storyImg3   from '../assets/47639.jpg'   // The Proposal photo
import collected1  from '../assets/happy.jpg'
import collected2  from '../assets/happy.jpg'
import collected3  from '../assets/happy.jpg'
import collected4  from '../assets/happy.jpg'
import collected5  from '../assets/happy.jpg'

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
    body: 'In the heart of the Lekki Conservation Centre, surrounded by the whispers of the canopy walk, he asked a question that would change the rest of our lives.',
    img: storyImg3,
    imgLeft: true,
  },
]

// ── Chapter block ──────────────────────────────────────────
function Chapter({ date, title, body, img, imgLeft }) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-0 w-full">

      {/* Image side */}
      <div className={`w-full lg:w-1/2 ${imgLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-72 lg:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Text side */}
      <div
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
      </div>

    </div>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function OurStory() {
  return (
    <Layout>

      {/* ── 1. HERO HEADER ── */}
      <section className="bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* Top label */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-4">
            The Journey
          </p>

          {/* Two-column: big title left, intro text right */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <h1 className="font-display text-[#0F0F0F] text-5xl lg:text-7xl leading-[1.05] flex-shrink-0">
              A Botanical<br />
              <span className="italic">Love Story.</span>
            </h1>
            <p className="text-[#0F0F0F]/55 text-[15px] leading-[1.9] max-w-sm lg:pb-2">
              From the shared quiet of a university library to the vibrant gardens of Lagos,
              this is the story of two souls finding their rhythm in the wild beauty of the world.
            </p>
          </div>

          {/* Thin divider */}
          <div className="mt-12 h-px bg-stone-200 w-full" />
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

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-[#0F0F0F] text-2xl lg:text-3xl">
              Collected Moments
            </h2>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#0F0F0F]/35 font-medium hidden md:block">
              A Visual Diary
            </p>
          </div>

          {/* Asymmetric collage grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[420px] lg:h-[560px]">
            {/* Large left */}
            <div className="col-span-1 row-span-2 overflow-hidden rounded-sm">
              <img src={collected1} alt="Moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Top middle */}
            <div className="col-span-1 row-span-1 overflow-hidden rounded-sm">
              <img src={collected2} alt="Moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Top right — split into 2 */}
            <div className="col-span-1 row-span-1 grid grid-rows-2 gap-2">
              <div className="overflow-hidden rounded-sm">
                <img src={collected3} alt="Moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden rounded-sm">
                <img src={collected4} alt="Moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            {/* Bottom middle spanning 2 cols */}
            <div className="col-span-2 row-span-1 overflow-hidden rounded-sm">
              <img src={collected5} alt="Moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PULL QUOTE ── */}
      <section className="bg-[#f7f6f2] pb-20 lg:pb-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="h-px bg-stone-300 mb-12 mx-auto w-24" />
          <blockquote className="font-display italic text-[#0F0F0F] text-2xl lg:text-3xl leading-relaxed mb-5">
            "In every walk with nature, one receives far more than he seeks."
          </blockquote>
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#2D4C3B] font-semibold">
            — John Muir
          </p>
        </div>
      </section>

    </Layout>
  )
}

