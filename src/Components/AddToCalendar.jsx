const TITLE = "Josephine & Christopher's Wedding"
const DETAILS = 'Join Josephine and Christopher as they celebrate their wedding in Benin City, Nigeria.'
const LOCATION = 'Benin City, Edo State, Nigeria'

// Saturday, October 24, 2026 at 4:00 PM (West Africa Time, UTC+1) → 15:00 UTC
// End: 11:30 PM WAT → 22:30 UTC
const START_UTC = '20261024T150000Z'
const END_UTC   = '20261024T223000Z'

function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITLE,
    dates: `${START_UTC}/${END_UTC}`,
    details: DETAILS,
    location: LOCATION,
  })
  return `https://www.google.com/calendar/render?${params}`
}

function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//josephine-christopher//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:josephine-christopher-2026-10-24@wedding',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DETAILS}`,
    `LOCATION:${LOCATION}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'josephine-christopher-wedding.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function AddToCalendar({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#ffffff' }}
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase px-5 py-3 bg-[#2D4C3B] text-white hover:bg-[#3a6050] transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Google Calendar
      </a>
      <button
        onClick={downloadIcs}
        type="button"
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase px-5 py-3 border border-[#2D4C3B]/40 text-[#2D4C3B] hover:bg-[#2D4C3B] hover:text-white transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download .ics
      </button>
    </div>
  )
}
