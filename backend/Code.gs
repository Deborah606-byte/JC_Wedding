/**
 * Josephine & Christopher Wedding — Backend
 * Google Apps Script bound to a Google Sheet.
 *
 * ─────────────────────────────────────────────────────────
 * ONE-TIME SETUP (do this in Google Sheets):
 * ─────────────────────────────────────────────────────────
 * 1. Create a new Google Sheet (or open the one you'll use).
 * 2. Create TWO tabs (rename them exactly):
 *
 *    Tab name: RSVP
 *    Row 1:   Timestamp | Name | Guests | Meal | Note
 *
 *    Tab name: Guestbook
 *    Row 1:   Timestamp | Name | Message | Status
 *
 * 3. Go to Extensions → Apps Script. Delete any starter code
 *    and paste THIS ENTIRE FILE.
 *
 * 4. Click Deploy → New deployment → Type: Web app.
 *      • Description: Wedding API
 *      • Execute as:  Me
 *      • Who has access: Anyone
 *    Click Deploy. Authorize when prompted.
 *
 * 5. Copy the "Web app URL" (ends with /exec).
 *    Paste it into your project's .env.local file as:
 *      VITE_GAS_URL=https://script.google.com/macros/s/XXXX/exec
 *
 * 6. Restart `npm run dev` to pick up the new env var.
 *
 * ─────────────────────────────────────────────────────────
 * MODERATING THE GUESTBOOK:
 * ─────────────────────────────────────────────────────────
 *  • Open the Guestbook tab.
 *  • New entries appear with Status = "pending".
 *  • To publish a message: change its Status cell to "approved".
 *  • The website fetches approved entries on each page load.
 *
 * ─────────────────────────────────────────────────────────
 * RE-DEPLOYING AFTER CODE CHANGES:
 * ─────────────────────────────────────────────────────────
 *  • Deploy → Manage deployments → pencil/edit icon → Version: New version → Deploy.
 *  • The URL stays the same.
 */

const RECIPIENT_EMAIL = 'jossynationekhator@gmail.com'
const SHEET_NAMES = { RSVP: 'RSVP', GUESTBOOK: 'Guestbook' }

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    if (body.action === 'rsvp') return handleRsvp(body)
    if (body.action === 'guestbook') return handleGuestbook(body)
    return jsonResponse({ ok: false, error: 'Unknown action' })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message || err) })
  }
}

function doGet(e) {
  try {
    const action = ((e && e.parameter) || {}).action
    if (action === 'guestbook') {
      return jsonResponse({ ok: true, entries: getApprovedBlessings() })
    }
    return jsonResponse({ ok: true, status: 'alive' })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message || err) })
  }
}

function handleRsvp(body) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAMES.RSVP)
  if (!sheet) throw new Error('RSVP sheet not found. Create a tab named "RSVP".')
  sheet.appendRow([new Date(), body.name || '', body.guests || '', body.meal || '', body.note || ''])
  try {
    sendRsvpEmail(body)
  } catch (err) {
    // Don't fail the whole submission if email fails — the row is saved.
    Logger.log('Email failed: ' + err)
  }
  return jsonResponse({ ok: true })
}

function handleGuestbook(body) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAMES.GUESTBOOK)
  if (!sheet) throw new Error('Guestbook sheet not found. Create a tab named "Guestbook".')
  sheet.appendRow([new Date(), body.name || '', body.message || '', 'pending'])
  return jsonResponse({ ok: true })
}

function getApprovedBlessings() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAMES.GUESTBOOK)
  if (!sheet) return []
  const lastRow = sheet.getLastRow()
  if (lastRow < 2) return []
  const rows = sheet.getRange(2, 1, lastRow - 1, 4).getValues()
  return rows
    .filter(r => String(r[3] || '').trim().toLowerCase() === 'approved')
    .map(r => ({
      timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      name: String(r[1] || ''),
      message: String(r[2] || ''),
    }))
    .reverse()
}

function sendRsvpEmail(body) {
  const subject = `New RSVP — ${body.name || 'Unknown guest'}`
  const lines = [
    'A new RSVP has been submitted.',
    '',
    `Name:    ${body.name || '(blank)'}`,
    `Guests:  ${body.guests || '(blank)'}`,
    `Meal:    ${body.meal || '(blank)'}`,
    `Note:    ${body.note || '(none)'}`,
    '',
    `Received: ${new Date().toString()}`,
  ]
  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: lines.join('\n'),
  })
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
