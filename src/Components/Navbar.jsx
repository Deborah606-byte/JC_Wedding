import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`w-full sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >

      {/* Top: Centered Logo Block — collapses on scroll */}
      <div
        className={`flex flex-col items-center justify-center px-6 overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0 py-0 pointer-events-none' : 'max-h-28 pt-3 pb-1.5 opacity-100'
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="JC Monogram"
            className="h-7 w-auto object-contain"
          />
          <span className="font-display italic text-[#2D4C3B] text-xl lg:text-[1.4rem] tracking-wide leading-none hover:opacity-80 transition-opacity">
            Josephine &amp; Christopher
          </span>
        </Link>
      </div>

      {/* Bottom: Desktop Nav Links */}
      <nav className="hidden md:flex border-t border-stone-200/60">
        <div className="flex items-center justify-center gap-7 lg:gap-10 px-6 py-2.5 w-full flex-wrap">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-[12.5px] tracking-wide transition-colors duration-200 relative pb-1 after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-[#2D4C3B] after:transition-transform after:duration-300 ${
                  active
                    ? 'font-semibold text-[#2D4C3B] after:origin-left after:scale-x-100'
                    : 'font-medium text-[#0F0F0F]/60 hover:text-[#2D4C3B] after:origin-center after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {/* RSVP Button — solid green, square corners */}
          <Link
            to="/rsvp"
            style={{ color: '#ffffff' }}
            className="text-[11px] font-semibold tracking-[0.22em] uppercase px-5 py-2 bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
          >
            RSVP
          </Link>
        </div>
      </nav>

      {/* Mobile: Hamburger + Dropdown */}
      <div className="md:hidden border-t border-stone-200/60">
        <div className="flex items-center justify-between py-2 px-5">
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
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col px-5 pb-5 pt-2 bg-white">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[13px] tracking-wide py-3 border-b border-stone-100 ${
                    active ? 'font-semibold text-[#2D4C3B]' : 'font-medium text-[#0F0F0F]/65 hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

    </header>
  )
}
