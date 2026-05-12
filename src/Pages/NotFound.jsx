import { Link } from 'react-router-dom'
import PageTransition from '../Components/PageTransition'
import Reveal from '../Components/Reveal'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="bg-[#F8F4EC] min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center flex flex-col items-center gap-6">

          <Reveal as="p" className="text-[10px] tracking-[0.35em] uppercase text-[#2D4C3B] font-semibold">
            404 · Page Not Found
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-script text-[#2D4C3B] text-6xl lg:text-7xl leading-none">
              This page has wandered off
            </h1>
          </Reveal>

          <Reveal delay={0.25} as="p" className="text-[#0F0F0F]/55 text-[14px] leading-[1.85] max-w-sm">
            The link you followed may have been mistyped or the page may have moved. Let&rsquo;s get you back to the celebration.
          </Reveal>

          <Reveal delay={0.35} className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <Link
              to="/"
              style={{ color: '#ffffff' }}
              className="text-[11px] font-semibold tracking-[0.22em] uppercase px-6 py-3 bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
            >
              Return Home
            </Link>
            <Link
              to="/rsvp"
              className="text-[11px] font-semibold tracking-[0.22em] uppercase px-6 py-3 border border-[#2D4C3B]/40 text-[#2D4C3B] hover:bg-[#2D4C3B] hover:text-white transition-colors duration-200"
            >
              RSVP
            </Link>
          </Reveal>

        </div>
      </section>
    </PageTransition>
  )
}
