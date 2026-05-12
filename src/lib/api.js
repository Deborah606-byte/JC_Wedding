const API_URL = import.meta.env.VITE_GAS_URL

export const isApiConfigured = Boolean(API_URL)

async function postAction(action, payload) {
  if (!API_URL) throw new Error('Backend not configured (missing VITE_GAS_URL)')
  const res = await fetch(API_URL, {
    method: 'POST',
    // text/plain avoids a CORS preflight that Apps Script can't answer.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload }),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Submission failed')
  return data
}

export function submitRsvp(payload) {
  return postAction('rsvp', payload)
}

export function submitBlessing(payload) {
  return postAction('guestbook', payload)
}

export async function fetchBlessings() {
  if (!API_URL) throw new Error('Backend not configured (missing VITE_GAS_URL)')
  const res = await fetch(`${API_URL}?action=guestbook`, { redirect: 'follow' })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Could not load blessings')
  return data.entries || []
}
