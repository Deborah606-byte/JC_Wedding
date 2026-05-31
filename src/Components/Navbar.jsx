import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import headerFlower from '../assets/FLOWERS HERO.jpeg'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Wedding Party', to: '/wedding-party' },
  { label: 'Guestbook', to: '/guestbook' },
  { label: 'Order Of Events', to: '/order-of-events' },
]

// Flower decoration anchored to a side corner of the header.
// Single orchid subject — crop to the orchid side, mirror on the right.
function FlowerCorner({ side = 'left', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Zoom into the orchid cluster (left ~45% of the source photo) so the blooms
          fill the corner instead of the dark venue background. Mirrored on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${headerFlower})`,
          backgroundSize: '230% auto',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          transform: side === 'right' ? 'scaleX(-1)' : 'none',
        }}
      />
      {/* Inner cream fade — only the inner third softens into the header cream */}
      <div
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          [side === 'right' ? 'left' : 'right']: 0,
          background: `linear-gradient(${side === 'right' ? 'to right' : 'to left'}, #F8F4EC 0%, rgba(248,244,236,0.4) 70%, rgba(248,244,236,0) 100%)`,
        }}
      />
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* ── TOP BLOCK: cream backdrop + decorative flowers + centered script + leaf divider ── */}
      <div className="relative bg-[#F8F4EC] overflow-hidden">
        {/* Decorative blossoms — cropped from FLOWERS HERO.jpeg, mirrored across both corners */}
        <FlowerCorner
          side="left"
          className="absolute left-0 top-0 h-full w-[180px] sm:w-[240px] md:w-[320px] lg:w-[380px] pointer-events-none select-none"
        />
        <FlowerCorner
          side="right"
          className="absolute right-0 top-0 h-full w-[180px] sm:w-[240px] md:w-[320px] lg:w-[380px] pointer-events-none select-none"
        />
        {/* Soft cream wash on the centre only, so the script stays legible without smothering the corner flowers */}
        <div className="absolute inset-y-0 left-1/4 right-1/4 bg-gradient-to-r from-transparent via-[#F8F4EC]/70 to-transparent pointer-events-none" />

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          aria-label="Josephine & Christopher — Home"
          className="relative flex flex-col items-center gap-3 md:gap-4 group px-6 pt-10 md:pt-14 pb-7 md:pb-10"
        >
          <span className="font-script text-[#2D4C3B] text-[28px] sm:text-4xl md:text-[56px] lg:text-[72px] leading-[1.05] tracking-wide whitespace-nowrap transition-transform duration-300 group-hover:scale-[1.02]">
            Josephine &amp; Christopher
          </span>

          {/* Leaf-laurel divider */}
          <span className="flex items-center justify-center gap-2 mt-1">
            <span className="block h-px w-12 sm:w-20 md:w-28 bg-[#2D4C3B]/35" />
            <svg width="56" height="16" viewBox="0 0 72 18" fill="none" stroke="#2D4C3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <ellipse cx="14" cy="9" rx="7" ry="2.4" transform="rotate(-20 14 9)" />
              <ellipse cx="22" cy="11.5" rx="5" ry="1.8" transform="rotate(-15 22 11.5)" />
              <ellipse cx="29" cy="9.5" rx="4" ry="1.4" transform="rotate(-25 29 9.5)" />
              <circle cx="36" cy="9" r="1.4" fill="#2D4C3B" stroke="none" />
              <ellipse cx="58" cy="9" rx="7" ry="2.4" transform="rotate(20 58 9)" />
              <ellipse cx="50" cy="11.5" rx="5" ry="1.8" transform="rotate(15 50 11.5)" />
              <ellipse cx="43" cy="9.5" rx="4" ry="1.4" transform="rotate(25 43 9.5)" />
            </svg>
            <span className="block h-px w-12 sm:w-20 md:w-28 bg-[#2D4C3B]/35" />
          </span>
        </Link>
      </div>

      {/* ── STICKY BAR: nav links (desktop) / RSVP + hamburger (mobile). ── */}
      <header
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
        className="sticky top-0 z-50 bg-[#F8F4EC]/90 backdrop-blur-md backdrop-saturate-150 border-y border-stone-200/50 shadow-sm"
      >
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-14 px-6 py-4">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="relative inline-flex flex-col items-center group"
              >
                <span
                  className={`text-[11.5px] lg:text-[12px] tracking-[0.22em] uppercase transition-colors duration-200 ${
                    active
                      ? 'font-bold text-[#0F0F0F]'
                      : 'font-semibold text-[#0F0F0F]/70 group-hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block h-[2px] bg-[#2D4C3B] mt-1.5 transition-all duration-300 ${
                    active ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-60'
                  }`}
                />
              </Link>
            )
          })}

          <Link
            to="/rsvp"
            className={`text-[11.5px] lg:text-[12px] font-semibold tracking-[0.22em] uppercase px-5 py-2.5 transition-colors duration-200 ${
              location.pathname === '/rsvp'
                ? 'bg-[#3a6050] text-white'
                : 'bg-[#2D4C3B] text-white hover:bg-[#3a6050]'
            }`}
          >
            RSVP
          </Link>
        </nav>

        {/* Mobile bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-2.5">
          <Link
            to="/rsvp"
            onClick={() => setMenuOpen(false)}
            className="text-[10.5px] font-semibold tracking-[0.22em] uppercase px-4 py-1.5 bg-[#2D4C3B] text-white"
          >
            RSVP
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2 text-[#0F0F0F]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col px-5 pb-5 pt-2 bg-[#F8F4EC]">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[12px] tracking-[0.22em] uppercase py-3 border-b border-stone-200/60 ${
                    active ? 'font-bold text-[#0F0F0F]' : 'font-semibold text-[#0F0F0F]/70 hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
    </>
  )
}
