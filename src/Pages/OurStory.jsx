import { motion } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import Lightbox, { useLightbox } from '../Components/Lightbox'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — rename your files in src/assets/ to match
// ─────────────────────────────────────────────────────────
import storyImg1   from '../assets/happy.jpg'      // Where It Began
import storyImg2   from '../assets/32089.jpg'      // Faith & Fellowship
import storyImg3   from '../assets/pic1.png'       // Growing Together
import storyImg4   from '../assets/47639.jpg'      // The Proposal
import storyImg5   from '../assets/home-hero.png'  // Forever Begins
import collected1  from '../assets/happy.jpg'
import collected2  from '../assets/32089.jpg'
import collected3  from '../assets/47639.jpg'
import collected4  from '../assets/pic1.png'
import collected5  from '../assets/home-hero.png'

// ── Timeline chapters ──────────────────────────────────────
const chapters = [
  {
    id: 1,
    label: 'Edo State Polytechnic, Usen',
    title: 'Where It Began',
    body: 'We first met as students — simply schoolmates navigating lectures, assignments, and the future ahead of us. Neither of us knew that behind those ordinary moments, God was quietly preparing something extraordinary.',
    img: storyImg1,
    imgLeft: true,
  },
  {
    id: 2,
    label: 'Nigeria Fellowship of Evangelical Students',
    title: 'Faith Brought Us Closer',
    body: 'Our journey truly began through fellowship and service. Christopher served as Bible Study Secretary; Josephine served as General Secretary. From prayer meetings to programmes and long conversations, friendship grew naturally — laying the foundation for something much deeper.',
    img: storyImg2,
    imgLeft: false,
  },
  {
    id: 3,
    label: 'Stage by Stage',
    title: 'From Friendship to Love',
    body: 'From schoolmates to fellowship members, to executives serving side by side, to genuine friends, and at last to love. Somewhere along the journey, we stopped imagining the future separately and began seeing it together.',
    img: storyImg3,
    imgLeft: true,
  },
  {
    id: 4,
    label: 'The Question',
    title: 'The Proposal',
    body: 'After years of friendship, prayers, and growth, Christopher asked the question that would change our lives forever. With a full heart and joyful tears, Josephine said yes — yes to love, to partnership, to purpose, to forever.',
    img: storyImg4,
    imgLeft: false,
  },
  {
    id: 5,
    label: 'October 2026',
    title: 'Forever Begins',
    body: 'As we prepare for our wedding, our hearts are filled with gratitude — for every season, every lesson, and every person who has been part of our journey. Most of all, for a God who wrote a story more beautiful than we could have imagined.',
    img: storyImg5,
    imgLeft: true,
  },
]

// ── Chapter block ──────────────────────────────────────────
function Chapter({ label, title, body, img, imgLeft }) {
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
          {label}
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
            Our Story
          </Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <Reveal delay={0.1}>
              <h1 className="font-display text-[#0F0F0F] text-5xl lg:text-7xl leading-[1.05] flex-shrink-0">
                From Schoolmates<br />
                <span className="italic">to Soulmates.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25} as="div" className="max-w-sm lg:pb-2 flex flex-col gap-4">
              <p className="text-[#0F0F0F]/55 text-[15px] leading-[1.9]">
                Every love story is beautiful, but ours is deeply rooted in friendship, faith, service, growth, and God&rsquo;s perfect timing.
              </p>
              <p className="text-[#0F0F0F]/55 text-[15px] leading-[1.9]">
                What started within the walls of Edo State Polytechnic, Usen became something far greater than either of us imagined.
              </p>
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

      {/* ── 2. MEET THE COUPLE ── */}
      <section className="bg-[#f7f6f2] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">

          <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-8">
            Meet The Couple
          </Reveal>

          <Reveal delay={0.05} as="p" className="text-[#0F0F0F]/60 text-[14px] leading-[1.9] mb-10 font-display italic">
            Together with our families,
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display italic text-[#0F0F0F] text-lg lg:text-xl leading-relaxed">
              Dr. Ekhator Julius &amp; Mrs. Itohan Augustina Ighodaro
            </p>
            <p className="text-[#0F0F0F]/55 text-[12.5px] tracking-wide mt-1.5">
              of Evboesi, Orhionmwon LGA, Edo State
            </p>
          </Reveal>

          <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/35 text-[14px] my-6 font-display italic">
            and
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-display italic text-[#0F0F0F] text-lg lg:text-xl leading-relaxed">
              Late Barrister F.U. Ineomon &amp; Mrs. Franca Ineomon
            </p>
            <p className="text-[#0F0F0F]/55 text-[12.5px] tracking-wide mt-1.5">
              of Eidenu, Irrua, Esan Central LGA, Edo State
            </p>
          </Reveal>

          <Reveal delay={0.4} as="p" className="text-[#0F0F0F]/60 text-[14px] leading-[1.9] mt-12 mb-2 max-w-xl mx-auto">
            joyfully celebrate the solemnization of the Holy Matrimony of their beloved children,
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="font-display text-[#0F0F0F] text-3xl lg:text-5xl mt-10 leading-[1.15]">
              Christopher Oziengbe<br />
              <span className="italic text-[#2D4C3B]">Ineomon</span>
            </h2>
            <p className="font-display italic text-[#2D4C3B] text-2xl lg:text-3xl my-5">&amp;</p>
            <h2 className="font-display text-[#0F0F0F] text-3xl lg:text-5xl leading-[1.15]">
              Josephine Osemwonyemwen<br />
              <span className="italic text-[#2D4C3B]">Ekhator</span>
            </h2>
          </Reveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-stone-300 mt-12 mb-10 mx-auto w-16 origin-center"
          />

          <Reveal delay={0.6} as="p" className="text-[#0F0F0F]/60 text-[14px] leading-[1.95] max-w-md mx-auto italic">
            To many friends and loved ones, she is fondly known as <span className="font-display">Jossy Nation</span> — full of warmth, joy, and vibrant energy. To Christopher, she became a best friend, answered prayer, peace, and forever.
          </Reveal>
        </div>
      </section>

      {/* ── 3. TIMELINE CHAPTERS ── */}
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

      {/* ── 4. COLLECTED MOMENTS ── */}
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

      {/* ── 5. PULL QUOTE ── */}
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
            &ldquo;Built on friendship, grounded in faith, and covered in love.&rdquo;
          </Reveal>
          <Reveal delay={0.15} as="p" className="text-[11px] tracking-[0.25em] uppercase text-[#2D4C3B] font-semibold">
            — Christopher &amp; Josephine
          </Reveal>
        </div>
      </section>

      {/* ── 6. CLOSING ── */}
      <section className="bg-white py-20 lg:py-28 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-[10px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-5">
            Closing
          </Reveal>
          <Reveal delay={0.1} as="h2" className="font-display text-[#0F0F0F] text-3xl lg:text-5xl mb-6 leading-tight">
            See You In <span className="italic">Benin City.</span>
          </Reveal>
          <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/55 text-[15px] leading-[1.9] max-w-md mx-auto mb-10">
            We cannot wait to celebrate love, family, faith, laughter, and forever with you. October 2026 will forever remain one of the most meaningful seasons of our lives, and it means so much to have you share it with us.
          </Reveal>
          <Reveal delay={0.3} as="p" className="text-[11px] tracking-[0.3em] uppercase text-[#2D4C3B] font-semibold mb-2">
            With love,
          </Reveal>
          <Reveal delay={0.4} as="p" className="font-display italic text-[#0F0F0F] text-xl lg:text-2xl">
            Christopher &amp; Josephine
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
