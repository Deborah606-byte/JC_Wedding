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
      className={`w-full sticky top-0 z-50 border-b border-stone-200/70 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >

      {/* Top: Centered Logo Block */}
      <div
        className={`flex flex-col items-center justify-center px-6 overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0 py-0 pointer-events-none' : 'max-h-40 pt-5 pb-3 opacity-100'
        }`}
      >
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
        <div className="mt-3 flex items-center gap-3 w-44">
          <div className="flex-1 h-px bg-stone-200" />
          <div className="w-1 h-1 rounded-full bg-[#2D4C3B]/40" />
          <div className="flex-1 h-px bg-stone-200" />
        </div>
      </div>

      {/* Bottom: Desktop Nav Links */}
      <nav className="hidden md:flex border-t border-stone-200/70">
        <div className="flex items-center justify-center gap-8 lg:gap-12 px-6 py-3 w-full flex-wrap">
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-[13px] tracking-wide transition-colors duration-200 relative pb-1 after:absolute after:left-0 after:right-0 after:-bottom-[9px] after:h-[2px] after:bg-[#2D4C3B] after:origin-left after:transition-transform after:duration-300 ${
                  active
                    ? 'font-semibold text-[#2D4C3B] after:scale-x-100'
                    : 'font-medium text-[#0F0F0F]/60 hover:text-[#2D4C3B] after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {/* RSVP Button */}
          <Link
            to="/rsvp"
            style={{ color: '#ffffff' }}
            className="text-[12px] font-semibold tracking-widest uppercase px-6 py-2 rounded-full bg-[#2D4C3B] text-white shadow-sm hover:shadow-md hover:bg-[#3a6050] transition-all duration-200"
          >
            RSVP
          </Link>
        </div>
      </nav>

      {/* Mobile: Hamburger + Dropdown */}
      <div className="md:hidden border-t border-stone-200/70">
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
          <nav className="flex flex-col items-center gap-4 px-6 pb-7 pt-3 bg-white/80 backdrop-blur-md">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[13px] tracking-wide ${
                    active ? 'font-semibold text-[#2D4C3B]' : 'font-medium text-[#0F0F0F]/60 hover:text-[#2D4C3B]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              to="/rsvp"
              onClick={() => setMenuOpen(false)}
              style={{ color: '#ffffff' }}
              className="text-[12px] font-semibold tracking-widest uppercase px-7 py-2.5 rounded-full bg-[#2D4C3B] text-white shadow-sm mt-1"
            >
              RSVP
            </Link>
          </nav>
        </div>
      </div>

    </header>
  )
}
