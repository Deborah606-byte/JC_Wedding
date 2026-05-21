import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Wedding Party', to: '/wedding-party' },
  { label: 'Guestbook', to: '/guestbook' },
  { label: 'Order of Events', to: '/order-of-events' },
]

// Decorative cherry-blossom branch (one-sided; flipped via CSS for the opposite corner)
function BlossomBranch({ side = 'left', className = '' }) {
  return (
    <svg
      viewBox="0 0 220 340"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none' }}
    >
      {/* Main branch */}
      <path
        d="M0 50 C40 70 70 100 90 150 C108 196 130 240 160 320"
        stroke="#9C8A6E"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* Side branches */}
      <path d="M40 70 C60 60 78 56 105 60" stroke="#9C8A6E" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M80 130 C100 120 122 124 145 134" stroke="#9C8A6E" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M105 200 C125 200 144 210 160 230" stroke="#9C8A6E" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M30 30 C18 22 12 18 4 18" stroke="#9C8A6E" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.45" />

      {/* Leaves */}
      <g opacity="0.55">
        <ellipse cx="50" cy="90" rx="8" ry="3" fill="#A8B89A" transform="rotate(-25 50 90)" />
        <ellipse cx="78" cy="145" rx="9" ry="3.4" fill="#A8B89A" transform="rotate(-20 78 145)" />
        <ellipse cx="120" cy="170" rx="9" ry="3.4" fill="#A8B89A" transform="rotate(15 120 170)" />
        <ellipse cx="138" cy="230" rx="9" ry="3.4" fill="#A8B89A" transform="rotate(35 138 230)" />
      </g>

      {/* Blossom clusters */}
      {[
        { cx: 105, cy: 60, s: 1 },
        { cx: 12, cy: 18, s: 0.9 },
        { cx: 145, cy: 134, s: 1.05 },
        { cx: 160, cy: 230, s: 1 },
        { cx: 95, cy: 200, s: 0.85 },
        { cx: 175, cy: 295, s: 0.9 },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.cx} ${b.cy}) scale(${b.s})`} opacity="0.85">
          <circle cx="0" cy="-5.5" r="4.6" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.4" />
          <circle cx="5.4" cy="-2" r="4.6" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.4" />
          <circle cx="3.4" cy="4.4" r="4.6" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.4" />
          <circle cx="-3.4" cy="4.4" r="4.6" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.4" />
          <circle cx="-5.4" cy="-2" r="4.6" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.4" />
          <circle cx="0" cy="0" r="1.6" fill="#D4A574" />
        </g>
      ))}

      {/* Tiny buds */}
      <g opacity="0.7">
        <circle cx="65" cy="115" r="2" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.3" />
        <circle cx="125" cy="105" r="2" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.3" />
        <circle cx="118" cy="245" r="2" fill="#FFFDFA" stroke="#E5C8B0" strokeWidth="0.3" />
      </g>
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* ── TOP BLOCK: blossoms + script names + leaf divider. Scrolls away with the page. ── */}
      <div className="relative bg-[#F8F4EC] overflow-hidden">
        {/* Cherry blossom branches — left & right corners */}
        <BlossomBranch
          side="left"
          className="absolute left-0 top-0 h-full w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] pointer-events-none select-none"
        />
        <BlossomBranch
          side="right"
          className="absolute right-0 top-0 h-full w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] pointer-events-none select-none"
        />

        {/* Soft center fade so blossoms melt into the cream */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F8F4EC]/85 to-transparent pointer-events-none" />

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="relative flex flex-col items-center gap-3 md:gap-4 group px-6 pt-8 md:pt-12 pb-6 md:pb-8"
        >
          <span className="font-script text-[#2D4C3B] text-[28px] sm:text-4xl md:text-[56px] lg:text-[72px] leading-[1.05] tracking-wide whitespace-nowrap transition-transform duration-300 group-hover:scale-[1.02]">
            Josephine &amp; Christopher
          </span>

          {/* Leaf-laurel divider */}
          <span className="flex items-center justify-center gap-2 mt-1">
            <span className="block h-px w-12 sm:w-20 md:w-28 bg-[#2D4C3B]/35" />
            <svg width="56" height="16" viewBox="0 0 72 18" fill="none" stroke="#2D4C3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {/* Left leaf spray */}
              <ellipse cx="14" cy="9" rx="7" ry="2.4" transform="rotate(-20 14 9)" />
              <ellipse cx="22" cy="11.5" rx="5" ry="1.8" transform="rotate(-15 22 11.5)" />
              <ellipse cx="29" cy="9.5" rx="4" ry="1.4" transform="rotate(-25 29 9.5)" />
              {/* Center dot */}
              <circle cx="36" cy="9" r="1.4" fill="#2D4C3B" stroke="none" />
              {/* Right leaf spray (mirrored) */}
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
        className="sticky top-0 z-50 bg-[#F8F4EC]/85 backdrop-blur-md backdrop-saturate-150 border-y border-stone-200/50 shadow-sm"
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
                  className={`text-[11.5px] lg:text-[12px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200 ${
                    active ? 'text-[#2D4C3B]' : 'text-[#0F0F0F]/70 group-hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </span>
                {/* Active underline */}
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
            className={`text-[11.5px] lg:text-[12px] font-semibold tracking-[0.22em] uppercase px-5 py-2 transition-colors duration-200 ${
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
                  className={`text-[12px] tracking-[0.22em] uppercase font-semibold py-3 border-b border-stone-200/60 ${
                    active ? 'text-[#2D4C3B]' : 'text-[#0F0F0F]/70 hover:text-[#2D4C3B]'
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
