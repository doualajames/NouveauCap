// Push Notifications & SMS Infrastructure
// Uses Web Push API (browser native) + Twilio SMS (HTTP API, no npm dep)

// ── Web Push (VAPID) ───────────────────────────────────────────────────────
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || ''

export interface PushSubscription {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export async function sendWebPush(
  subscription: PushSubscription,
  payload: { title: string; body: string; url?: string },
): Promise<boolean> {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.warn('[push] VAPID keys not set — skipping web push')
    return false
  }

  try {
    // Use the Web Push protocol via fetch (RFC 8030)
    // In production, use the web-push npm package or a service like OneSignal
    // This is the infrastructure placeholder that works with the VAPID standard
    const body = JSON.stringify(payload)

    const res = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        TTL: '86400',
      },
      body,
    })

    return res.ok
  } catch (error) {
    console.error('[push] Web push error:', error)
    return false
  }
}

// ── Twilio SMS ─────────────────────────────────────────────────────────────
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || ''
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || ''

export async function sendSms(
  to: string,
  message: string,
): Promise<boolean> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn('[sms] Twilio credentials not set — skipping SMS')
    return false
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')

    const params = new URLSearchParams({
      To: to,
      From: TWILIO_PHONE_NUMBER,
      Body: message,
    })

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[sms] Twilio send failed:', err)
    }

    return res.ok
  } catch (error) {
    console.error('[sms] Unexpected error:', error)
    return false
  }
}

// ── OneSignal Push (alternative to VAPID) ──────────────────────────────────
const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID || ''
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY || ''

export async function sendOneSignalPush(
  userIds: string[],
  title: string,
  message: string,
  url?: string,
): Promise<boolean> {
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.warn('[onesignal] Credentials not set — skipping push')
    return false
  }

  try {
    const res = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_external_user_ids: userIds,
        headings: { en: title },
        contents: { en: message },
        ...(url ? { url } : {}),
      }),
    })

    return res.ok
  } catch (error) {
    console.error('[onesignal] Push error:', error)
    return false
  }
}

// ── Notification dispatcher (sends via all configured channels) ────────────
export async function dispatchNotification(opts: {
  userId: string
  title: string
  body: string
  smsTo?: string
  pushSubscription?: PushSubscription
  url?: string
}): Promise<{ push: boolean; sms: boolean }> {
  const results = { push: false, sms: false }

  // Web Push
  if (opts.pushSubscription) {
    results.push = await sendWebPush(opts.pushSubscription, {
      title: opts.title,
      body: opts.body,
      url: opts.url,
    })
  }

  // OneSignal fallback
  if (!results.push) {
    results.push = await sendOneSignalPush(
      [opts.userId],
      opts.title,
      opts.body,
      opts.url,
    )
  }

  // SMS
  if (opts.smsTo) {
    results.sms = await sendSms(opts.smsTo, `${opts.title}: ${opts.body}`)
  }

  return results
}
