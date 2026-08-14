import posthog from 'posthog-js'
import type { CaptureResult } from 'posthog-js'
import {
  hasStandardUtmParams,
  isCampaignAttributionPropertyKey,
} from '@/lib/posthog-attribution'

const URL_PROPERTY_KEYS = new Set([
  '$current_url',
  '$referrer',
  '$initial_current_url',
  '$initial_referrer',
  '$session_entry_url',
])

const ELEMENT_TEXT_KEYS = new Set(['$el_text', '$el_text_content'])

function isPostHogEnabled(token: string | undefined): boolean {
  if (!token) return false
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV
  return vercelEnv === 'production'
}

function stripUrlQueryAndHash(raw: string): string {
  try {
    const absolute = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw)
    const url = absolute ? new URL(raw) : new URL(raw, 'http://local.invalid')
    url.search = ''
    url.hash = ''
    if (!absolute) return `${url.pathname}${url.search}${url.hash}`
    return url.toString()
  } catch {
    return raw.split(/[?#]/, 1)[0] || raw
  }
}

function beforeSend(event: CaptureResult | null): CaptureResult | null {
  if (!event) return event
  const properties = { ...(event.properties as Record<string, unknown> | undefined) }
  if (properties.product_surface == null) {
    properties.product_surface = 'marketing'
  }
  for (const [key, value] of Object.entries(properties)) {
    if (typeof value !== 'string') continue
    if (isCampaignAttributionPropertyKey(key)) continue
    if (URL_PROPERTY_KEYS.has(key) || key.toLowerCase().includes('url') || key.toLowerCase().includes('referrer')) {
      properties[key] = stripUrlQueryAndHash(value)
    }
    if (ELEMENT_TEXT_KEYS.has(key)) {
      properties[key] = ''
    }
  }
  return { ...event, properties }
}

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (isPostHogEnabled(token)) {
  posthog.init(token!, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    autocapture: false,
    capture_pageview: true,
    person_profiles: 'identified_only',
    disable_session_recording: true,
    capture_heatmaps: true,
    capture_exceptions: false,
    disable_surveys: true,
    enable_recording_console_log: false,
    cross_subdomain_cookie: true,
    disable_capture_url_hashes: true,
    save_campaign_params: true,
    before_send: beforeSend,
    loaded(ph) {
      // Native $initial_utm_* lives in the SDK cookie until identify(). With
      // person_profiles: identified_only, create a person on UTM landings so
      // first-touch campaign props are stored before the Atlas domain hop.
      if (hasStandardUtmParams()) ph.createPersonProfile()
    },
    debug: false,
  })
}
