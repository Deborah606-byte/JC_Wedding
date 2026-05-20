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
    <footer className="bg-[#2D4C3B]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {footerLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-[10.5px] tracking-[0.2em] uppercase text-[#FFFFFF] hover:text-[#FFFFFF]/70 transition-colors duration-300 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-[10.5px] text-[#FFFFFF] tracking-wider whitespace-nowrap">
          © 2026 · Benin City, Nigeria
        </p>
      </div>
    </footer>
  )
}
