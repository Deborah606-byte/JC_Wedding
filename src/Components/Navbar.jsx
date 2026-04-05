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
    <header className="bg-white border-b border-stone-100 w-full sticky top-0 z-50 shadow-sm">

      {/* Top: Centered Logo Block */}
      <div className="flex flex-col items-center justify-center pt-5 pb-3 px-6">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src={logo}
            alt="JC Monogram"
            className="h-10 w-auto object-contain mb-1.5"
          />
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="font-display italic text-[#2D4C3B] text-2xl lg:text-[1.75rem] tracking-wide leading-none hover:opacity-80 transition-opacity">
            Josephine &amp; Christopher
          </span>
        </Link>
      </div>

      {/* Bottom: Desktop Nav Links */}
      <nav className="hidden md:flex border-t border-stone-100">
        <div className="flex items-center justify-center gap-8 lg:gap-12 px-6 py-2.5 w-full flex-wrap">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-[13.5px] tracking-wide transition-colors duration-200 relative pb-0.5 ${
                  active
                    ? 'font-bold text-[#0F0F0F]'
                    : 'font-normal text-[#0F0F0F]/55 hover:text-[#2D4C3B]'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-[11px] left-0 right-0 h-[2px] bg-[#2D4C3B]" />
                )}
              </Link>
            )
          })}

          {/* RSVP Button */}
          <Link
            to="/rsvp"
            className="text-[12px] font-semibold tracking-widest uppercase px-5 py-1.5 rounded-sm bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
          >
            RSVP
          </Link>
        </div>
      </nav>

      {/* Mobile: Hamburger + Dropdown */}
      <div className="md:hidden border-t border-stone-100">
        <div className="flex items-center justify-center py-2 px-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2 text-[#0F0F0F]"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col items-center gap-4 px-6 pb-6 pt-2">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[13px] tracking-wide ${
                    active ? 'font-bold text-[#0F0F0F]' : 'text-[#0F0F0F]/55 hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              to="/rsvp"
              onClick={() => setMenuOpen(false)}
              className="text-[12px] font-semibold tracking-widest uppercase px-6 py-2 rounded-sm bg-[#2D4C3B] text-white mt-1"
            >
              RSVP
            </Link>
          </nav>
        </div>
      </div>

    </header>
  )
}
