import { motion, useScroll, useTransform } from 'motion/react'
import PageTransition from '../Components/PageTransition'
import Reveal, { StaggerGroup, StaggerItem } from '../Components/Reveal'
import Lightbox, { useLightbox } from '../Components/Lightbox'
import usePageTitle from '../hooks/usePageTitle'

// ─────────────────────────────────────────────────────────
// 🖼️  IMAGES — swap any of these for real couple photos
// ─────────────────────────────────────────────────────────
import heroImg    from '../assets/happy.webp'      // Full-bleed page hero
import storyImg1  from '../assets/32089.webp'      // Where It Began
import storyImg2  from '../assets/pic1.webp'       // Faith & Fellowship
import storyImg3  from '../assets/47639.webp'      // From Friendship to Love
import storyImg4  from '../assets/home-hero.webp'  // The Proposal
import storyImg5  from '../assets/hero.webp'       // Forever Begins
import collected1 from '../assets/happy.webp'
import collected2 from '../assets/32089.webp'
import collected3 from '../assets/47639.webp'
import collected4 from '../assets/pic1.webp'
import collected5 from '../assets/home-hero.webp'

const EASE = [0.22, 1, 0.36, 1]

// ── Decorative botanical sprig (reused from Home's letter section) ──
function Sprig({ className = '' }) {
  return (
    <svg width="22" height="34" viewBox="0 0 20 28" fill="none" className={className} aria-hidden="true">
      <path d="M10 28 C10 28 10 14 10 0 M10 14 C10 14 2 10 0 4 M10 14 C10 14 18 10 20 4 M10 20 C10 20 4 18 2 13 M10 20 C10 20 16 18 18 13"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

// ── Timeline chapters ──────────────────────────────────────
const chapters = [
  {
    id: 1,
    roman: 'I',
    label: 'Edo State Polytechnic, Usen',
    title: 'Where It Began',
    body: 'We first met as students — simply schoolmates navigating lectures, assignments, and the future ahead of us. Neither of us knew that behind those ordinary moments, God was quietly preparing something extraordinary.',
    img: storyImg1,
    imgLeft: true,
  },
  {
    id: 2,
    roman: 'II',
    label: 'Nigeria Fellowship of Evangelical Students',
    title: 'Faith Brought Us Closer',
    body: 'Our journey truly began through fellowship and service. Christopher served as Bible Study Secretary; Josephine served as General Secretary. From prayer meetings to programmes and long conversations, friendship grew naturally — laying the foundation for something much deeper.',
    img: storyImg2,
    imgLeft: false,
  },
  {
    id: 3,
    roman: 'III',
    label: 'Stage by Stage',
    title: 'From Friendship to Love',
    body: 'From schoolmates to fellowship members, to executives serving side by side, to genuine friends, and at last to love. Somewhere along the journey, we stopped imagining the future separately and began seeing it together.',
    img: storyImg3,
    imgLeft: true,
  },
  {
    id: 4,
    roman: 'IV',
    label: 'The Question',
    title: 'The Proposal',
    body: 'After years of friendship, prayers, and growth, Christopher asked the question that would change our lives forever. With a full heart and joyful tears, Josephine said yes — yes to love, to partnership, to purpose, to forever.',
    img: storyImg4,
    imgLeft: false,
  },
  {
    id: 5,
    roman: 'V',
    label: 'October 2026',
    title: 'Forever Begins',
    body: 'As we prepare for our wedding, our hearts are filled with gratitude — for every season, every lesson, and every person who has been part of our journey. Most of all, for a God who wrote a story more beautiful than we could have imagined.',
    img: storyImg5,
    imgLeft: true,
  },
]

// ── Chapter block ──────────────────────────────────────────
function Chapter({ roman, label, title, body, img, imgLeft }) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch w-full">

      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`w-full lg:w-1/2 ${imgLeft ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="relative h-full overflow-hidden group">
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-80 lg:h-[540px] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className={`w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-14 lg:py-0
          ${imgLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className={`flex items-center gap-5 mb-5 ${imgLeft ? '' : 'lg:flex-row-reverse'}`}>
          <span className="font-display italic text-[#2D4C3B]/40 text-5xl lg:text-6xl leading-none tracking-wider select-none">
            {roman}
          </span>
          <div className="h-px bg-[#2D4C3B]/25 w-16 lg:w-20" />
        </div>
        <p className="text-[10px] tracking-[0.32em] uppercase text-[#2D4C3B] font-semibold mb-3">
          {label}
        </p>
        <h2 className="font-display text-[#0F0F0F] text-3xl lg:text-[40px] mb-5 leading-[1.15]">
          {title}
        </h2>
        <p className="text-[#0F0F0F]/60 text-[15px] leading-[1.9] max-w-md">
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

// ── Hero with parallax ────────────────────────────────────
function StoryHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const scale = useTransform(scrollY, [0, 800], [1, 1.08])

  return (
    <section className="relative w-full h-[78vh] lg:h-[92vh] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Josephine and Christopher"
        style={{ y, scale }}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="text-[10px] tracking-[0.45em] uppercase text-white/85 font-semibold mb-7 drop-shadow"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="font-display italic text-white text-5xl sm:text-6xl lg:text-8xl leading-[1.05] drop-shadow-lg max-w-4xl"
        >
          From Schoolmates<br />to Soulmates.
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
          className="h-px bg-white/45 w-24 my-9 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="font-script text-white text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg leading-none"
        >
          Christopher &amp; Josephine
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
      >
        <span className="text-[9px] tracking-[0.45em] uppercase font-medium">Read Our Story</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-white/60"
        />
      </motion.div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function OurStory() {
  usePageTitle('Our Story')
  const lb = useLightbox(collageImages)

  return (
    <PageTransition>

      {/* ── 1. HERO ── */}
      <StoryHero />

      {/* ── 2. OPENING INVOCATION ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <Reveal>
            <Sprig className="text-[#2D4C3B]/45" />
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
            From Friendship to Forever
          </Reveal>
          <Reveal delay={0.2} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-[42px] leading-[1.2]">
            Every love story is beautiful, but ours is deeply rooted in friendship, faith, service, growth, and God&rsquo;s perfect timing.
          </Reveal>
          <Reveal delay={0.3} as="p" className="text-[#0F0F0F]/60 text-[15.5px] leading-[1.95] max-w-lg mt-2">
            What started within the walls of Edo State Polytechnic, Usen became something far greater than either of us imagined. Looking back now, we can truly say God was writing our story long before we even understood it ourselves.
          </Reveal>
        </div>
      </section>

      {/* ── 3. MEET THE COUPLE (centerpiece) ── */}
      <section className="relative bg-[#2D4C3B] py-20 lg:py-32 overflow-hidden">
        {/* Corner sprigs */}
        <div className="absolute top-10 left-10 text-white/15 hidden lg:block">
          <Sprig className="w-10 h-14" />
        </div>
        <div className="absolute bottom-10 right-10 text-white/15 hidden lg:block rotate-180">
          <Sprig className="w-10 h-14" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          <Reveal as="p" className="text-[10px] tracking-[0.45em] uppercase text-white/55 font-semibold mb-10">
            Meet The Couple
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-display italic text-white/80 text-base lg:text-lg leading-[1.9] mb-14">
              Together with our families,
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-14">
            <Reveal delay={0.1} className="flex flex-col items-center md:items-end md:text-right">
              <p className="font-display italic text-white text-xl lg:text-[24px] leading-[1.45]">
                Dr. Ekhator Julius<br />
                &amp; Mrs. Itohan Augustina<br />
                Ighodaro
              </p>
              <p className="text-white/55 text-[12px] tracking-wide mt-4 leading-relaxed">
                of Evboesi, Orhionmwon LGA
              </p>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mt-1">
                Edo State, Nigeria
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-col items-center md:items-start md:text-left">
              <p className="font-display italic text-white text-xl lg:text-[24px] leading-[1.45]">
                Late Barrister F.U. Ineomon<br />
                &amp; Mrs. Franca<br />
                Ineomon
              </p>
              <p className="text-white/55 text-[12px] tracking-wide mt-4 leading-relaxed">
                of Eidenu, Irrua, Esan Central LGA
              </p>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mt-1">
                Edo State, Nigeria
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="h-px bg-white/25 w-20 mx-auto mb-10" />
            <p className="text-white/75 text-[13.5px] tracking-wide leading-[2] max-w-xl mx-auto">
              joyfully celebrate the solemnization of the<br />
              Holy Matrimony of their beloved children,
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-14">
            <p className="font-script text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Christopher
            </p>
            <p className="font-display italic text-white/55 text-2xl lg:text-3xl my-4">
              &amp;
            </p>
            <p className="font-script text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Josephine
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="h-px bg-white/25 w-20 mx-auto mt-14 mb-10" />
            <p className="text-white/75 text-[14px] leading-[2] max-w-lg mx-auto italic">
              To many friends and loved ones, she is fondly known as{' '}
              <span className="font-display text-white not-italic">Jossy Nation</span>{' '}
              — full of warmth, joy, and vibrant energy. To Christopher, she became a best friend, answered prayer, peace, and forever.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4. CHAPTERS INTRO ── */}
      <section className="bg-white pt-20 lg:pt-28 pb-4">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold mb-4">
            Five Chapters
          </Reveal>
          <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-5xl leading-tight mb-5">
            How It All Unfolded
          </Reveal>
          <Reveal delay={0.2} as="p" className="text-[#0F0F0F]/55 text-[15px] leading-[1.9] max-w-md mx-auto">
            Quiet moments that, looking back, were all part of one beautiful design.
          </Reveal>
        </div>
      </section>

      {/* ── 5. TIMELINE CHAPTERS ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          {chapters.map((ch, i) => (
            <div
              key={ch.id}
              className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f6f2]'}
            >
              <Chapter {...ch} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. PULL QUOTE — dark green band ── */}
      <section className="relative bg-[#2D4C3B] py-20 lg:py-28 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Sprig className="text-white/45 mx-auto mb-8" />
          </Reveal>
          <Reveal delay={0.1} as="blockquote" className="font-display italic text-white text-3xl lg:text-5xl leading-[1.3] mb-8">
            &ldquo;Built on friendship,<br />grounded in faith,<br />and covered in love.&rdquo;
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-px bg-white/30 w-20 mx-auto mb-6" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/65 font-semibold">
              — Christopher &amp; Josephine
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. COLLECTED MOMENTS ── */}
      <section className="bg-[#f7f6f2] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="flex flex-col items-center text-center gap-2 mb-12">
            <Reveal as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
              A Visual Diary
            </Reveal>
            <Reveal delay={0.1} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-4xl">
              Collected Moments
            </Reveal>
          </div>

          <StaggerGroup stagger={0.1} className="grid grid-cols-3 grid-rows-2 gap-2 h-[420px] lg:h-[560px]">
            <StaggerItem className="col-span-1 row-span-2 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(0)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 1 of 5">
                <img src={collected1} alt="Josephine and Christopher together" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
            <StaggerItem className="col-span-1 row-span-1 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(1)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 2 of 5">
                <img src={collected2} alt="Josephine and Christopher together" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
            <div className="col-span-1 row-span-1 grid grid-rows-2 gap-2">
              <StaggerItem className="overflow-hidden rounded-sm">
                <button onClick={() => lb.open(2)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 3 of 5">
                  <img src={collected3} alt="Josephine and Christopher together" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </button>
              </StaggerItem>
              <StaggerItem className="overflow-hidden rounded-sm">
                <button onClick={() => lb.open(3)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 4 of 5">
                  <img src={collected4} alt="Josephine and Christopher together" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </button>
              </StaggerItem>
            </div>
            <StaggerItem className="col-span-2 row-span-1 overflow-hidden rounded-sm">
              <button onClick={() => lb.open(4)} className="w-full h-full cursor-zoom-in" aria-label="Open photo 5 of 5">
                <img src={collected5} alt="Josephine and Christopher together" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </button>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* ── 8. CLOSING ── */}
      <section className="bg-white py-20 lg:py-32 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <Reveal>
            <Sprig className="text-[#2D4C3B]/45" />
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold">
            Closing
          </Reveal>
          <Reveal delay={0.15} as="h2" className="font-display italic text-[#0F0F0F] text-3xl lg:text-5xl leading-tight">
            See You In<br />Benin City.
          </Reveal>
          <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/60 text-[15px] leading-[1.95] max-w-md">
            We cannot wait to celebrate love, family, faith, laughter, and forever with you. October 2026 will forever remain one of the most meaningful seasons of our lives, and it means so much to have you share it with us.
          </Reveal>
          <Reveal delay={0.35} as="p" className="text-[10px] tracking-[0.4em] uppercase text-[#2D4C3B] font-semibold mt-6">
            With love,
          </Reveal>
          <Reveal delay={0.4} as="p" className="font-script text-[#2D4C3B] text-5xl lg:text-6xl leading-none">
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
