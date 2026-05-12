import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/LOGO.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Guestbook', to: '/guestbook' },
  { label: 'Wedding Party', to: '/wedding-party' },
  { label: 'Order Of Events', to: '/order-of-events' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* ── TOP BLOCK: JC monogram + script names. Scrolls away with the page. ── */}
      <div className="bg-[#F8F4EC] pt-6 md:pt-9 pb-3 md:pb-5">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex flex-col items-center gap-1 md:gap-2 group px-6"
        >
          <img
            src={logo}
            alt="JC Monogram"
            className="h-11 sm:h-14 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="font-script text-[#2D4C3B] text-[26px] sm:text-3xl md:text-5xl lg:text-[3.75rem] leading-none tracking-wide whitespace-nowrap">
            Josephine &amp; Christopher
          </span>
        </Link>
      </div>

      {/* ── STICKY BAR: nav links (desktop) / RSVP + hamburger (mobile). Constant height = no jitter. ── */}
      <header
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
        className="sticky top-0 z-50 bg-[#F8F4EC]/80 backdrop-blur-md backdrop-saturate-150 border-y border-stone-200/40 shadow-sm"
      >
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 px-6 py-3.5">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-[14px] tracking-wide transition-colors duration-200 ${
                  active
                    ? 'font-bold text-[#0F0F0F]'
                    : 'font-medium text-[#0F0F0F]/60 hover:text-[#2D4C3B]'
                }`}
              >
                {label}
              </Link>
            )
          })}

          <Link
            to="/rsvp"
            style={{ color: '#ffffff' }}
            className="text-[11.5px] font-semibold tracking-[0.22em] uppercase px-5 py-2 bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
          >
            RSVP
          </Link>
        </nav>

        {/* Mobile bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-2.5">
          <Link
            to="/rsvp"
            onClick={() => setMenuOpen(false)}
            style={{ color: '#ffffff' }}
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
                  className={`text-[14px] tracking-wide py-3 border-b border-stone-200/60 ${
                    active ? 'font-bold text-[#0F0F0F]' : 'font-medium text-[#0F0F0F]/65 hover:text-[#2D4C3B]'
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
