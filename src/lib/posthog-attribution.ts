import posthog from 'posthog-js'
import { atlasOrigin } from '@/lib/atlas-public-search'

/**
 * Cross-site PostHog identity handoff for marketing → Atlas.
 *
 * www.matchmed.app shares a cookie parent with atlas.matchmed.app, but
 * matchmedatlas.com does not. Passing distinct_id + session_id in the URL hash
 * (then stripping it on Atlas) is PostHog's documented cross-website method.
 * Hash is not sent to the Atlas server.
 */

export const PH_DISTINCT_ID_PARAM = 'ph_distinct_id'
export const PH_SESSION_ID_PARAM = 'ph_session_id'

const STANDARD_UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export function isCampaignAttributionPropertyKey(key: string): boolean {
  const k = key.toLowerCase()
  if (k.startsWith('utm_')) return true
  if (k.startsWith('$initial_utm_')) return true
  if (k.startsWith('$session_entry_utm_')) return true
  return false
}

export function hasStandardUtmParams(search: string = typeof window === 'undefined' ? '' : window.location.search): boolean {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  return STANDARD_UTM_KEYS.some(key => {
    const value = params.get(key)
    return Boolean(value && value.trim())
  })
}

/** Writes $initial_utm_* onto a person profile before a cross-domain hop. */
export function rememberCampaignPerson(): void {
  if (typeof window === 'undefined') return
  if (!hasStandardUtmParams()) return
  if (typeof posthog?.createPersonProfile !== 'function') return
  posthog.createPersonProfile()
}

/** Append PostHog IDs for a navigation to a different registrable domain. */
export function withPostHogAttribution(href: string): string {
  if (typeof window === 'undefined') return href
  if (typeof posthog?.get_distinct_id !== 'function') return href

  let url: URL
  try {
    url = new URL(href, window.location.origin)
  } catch {
    return href
  }
  if (url.origin === window.location.origin) return href
  let atlas: URL
  try {
    atlas = new URL(atlasOrigin())
  } catch {
    return href
  }
  if (url.origin !== atlas.origin) return href

  const distinctId = posthog.get_distinct_id()
  if (!distinctId) return href
  const sessionId =
    typeof posthog.get_session_id === 'function' ? posthog.get_session_id() : ''

  const hash = new URLSearchParams(url.hash.replace(/^#/, ''))
  hash.set(PH_DISTINCT_ID_PARAM, distinctId)
  if (sessionId) hash.set(PH_SESSION_ID_PARAM, sessionId)
  url.hash = hash.toString()
  return url.toString()
}
