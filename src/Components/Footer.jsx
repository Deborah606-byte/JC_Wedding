import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Guestbook', to: '/guestbook' },
  { label: 'Wedding Party', to: '/wedding-party' },
  { label: 'Order of Events', to: '/order-of-events' },
  { label: 'RSVP', to: '/rsvp' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f7f6f2] via-[#f7f6f2] to-white border-t border-stone-200">
      {/* Top decorative line */}
      <div className="flex items-center justify-center pt-14 pb-10">
        <div className="flex flex-col items-center gap-5">
          {/* Monogram / ornament */}
          <div className="text-[#2D4C3B] opacity-40">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2 L18 34 M2 18 L34 18 M6 6 L30 30 M30 6 L6 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
              <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
          </div>

          {/* Couple name */}
          <h2 className="font-display italic text-2xl lg:text-3xl text-[#2D4C3B] tracking-wide">
            Josephine & Christopher
          </h2>

          {/* Tagline */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#0F0F0F]/45 font-medium">
            Together Forever · November 2025
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 w-44">
            <div className="flex-1 h-px bg-stone-300/80" />
            <div className="w-1 h-1 rounded-full bg-[#2D4C3B]/45" />
            <div className="flex-1 h-px bg-stone-300/80" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-[11px] tracking-[0.2em] uppercase text-[#0F0F0F]/55 hover:text-[#2D4C3B] transition-colors duration-300 font-medium relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-[#2D4C3B]/60 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200/80 py-6 px-6">
        <p className="text-center text-[11px] text-[#0F0F0F]/40 tracking-wider">
          © 2025 Josephine & Christopher — A Botanical Love Story. Designed with love.
        </p>
      </div>
    </footer>
  )
}
