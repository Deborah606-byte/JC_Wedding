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
    // Hysteresis: collapse past 60, expand back below 20.
    // Prevents flip-flop at the threshold when the header changes height.
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(prev => {
        if (!prev && y > 60) return true
        if (prev && y < 20) return false
        return prev
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{ willChange: 'transform' }}
      className={`w-full sticky top-0 z-50 bg-[#F8F4EC]/75 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 transform-gpu ${
        scrolled ? 'shadow-[0_4px_24px_-14px_rgba(45,76,59,0.25)]' : ''
      }`}
    >
      {/* Top: JC monogram + script names — collapses on scroll */}
      <div
        className={`flex flex-col items-center justify-center px-6 overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-out ${
          scrolled
            ? 'max-h-0 opacity-0 py-0 pointer-events-none'
            : 'max-h-64 pt-6 md:pt-9 pb-2 md:pb-3 opacity-100'
        }`}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex flex-col items-center gap-1 md:gap-2 group"
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

      {/* Desktop nav links — always visible */}
      <nav className="hidden md:block">
        <div className={`flex items-center justify-center gap-8 lg:gap-12 px-6 transition-[padding] duration-300 ease-out ${
          scrolled ? 'py-3' : 'pb-5 md:pb-6 pt-1'
        }`}>
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-[15px] tracking-wide transition-colors duration-200 ${
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
            className="text-[12px] font-semibold tracking-[0.22em] uppercase px-6 py-2.5 bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
          >
            RSVP
          </Link>
        </div>
      </nav>

      {/* Mobile: compact bar with hamburger */}
      <div className="md:hidden">
        <div className={`flex items-center justify-between px-5 transition-[padding] duration-300 ease-out ${
          scrolled ? 'py-3' : 'pb-3 pt-1'
        }`}>
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
                  className={`text-[14px] tracking-wide py-3 border-b border-stone-100 ${
                    active ? 'font-bold text-[#0F0F0F]' : 'font-medium text-[#0F0F0F]/65 hover:text-[#2D4C3B]'
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
