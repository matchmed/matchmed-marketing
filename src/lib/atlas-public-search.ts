/**
 * Thin client for Atlas public RPCs (publishable key only).
 * Same contract as matchmed-atlas `src/lib/public-search.ts` search/counts helpers.
 * Does not grant table access or broaden the anonymous data surface.
 */

export type PublicSearchPractice = {
  id: string
  practice_name: string | null
  city: string | null
  state: string | null
  location_count: number | null
}

export type PublicSearchPhysician = {
  id: string
  physician_name: string | null
  current_practice_name: string | null
  city: string | null
  state: string | null
}

export type PublicSearchResult = {
  practices: PublicSearchPractice[]
  physicians: PublicSearchPhysician[]
}

export type PublicPlatformCounts = {
  practice_count: number
  physician_count: number
  as_of: string | null
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function str(value: unknown): string | null {
  if (value == null) return null
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return null
}

function num(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

function publicConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !key) return null
  return { url: url.replace(/\/$/, ''), key }
}

async function rpc(name: string, payload: Record<string, unknown>): Promise<unknown> {
  const cfg = publicConfig()
  if (!cfg) throw new Error('Public search is not configured')

  const res = await fetch(`${cfg.url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error('Invalid search response')
    }
  }
  if (!res.ok) {
    const err = asObject(data)
    throw new Error(str(err?.message) || `Search failed (${res.status})`)
  }
  return data
}

export async function publicSearch(
  q: string,
): Promise<{ data: PublicSearchResult | null; error: string | null }> {
  try {
    const data = await rpc('public_search', { q })
    const obj = asObject(data)
    if (!obj) return { data: { practices: [], physicians: [] }, error: null }

    const practices = asArray(obj.practices)
      .map(row => {
        const r = asObject(row)
        if (!r || !str(r.id)) return null
        return {
          id: str(r.id)!,
          practice_name: str(r.practice_name),
          city: str(r.city),
          state: str(r.state),
          location_count: num(r.location_count),
        } satisfies PublicSearchPractice
      })
      .filter((row): row is PublicSearchPractice => row !== null)
      .slice(0, 5)

    const physicians = asArray(obj.physicians)
      .map(row => {
        const r = asObject(row)
        if (!r || !str(r.id)) return null
        return {
          id: str(r.id)!,
          physician_name: str(r.physician_name),
          current_practice_name: str(r.current_practice_name),
          city: str(r.city),
          state: str(r.state),
        } satisfies PublicSearchPhysician
      })
      .filter((row): row is PublicSearchPhysician => row !== null)
      .slice(0, 5)

    return { data: { practices, physicians }, error: null }
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Search failed' }
  }
}

export async function publicPlatformCounts(): Promise<{
  data: PublicPlatformCounts | null
  error: string | null
}> {
  try {
    const data = await rpc('public_platform_counts', {})
    const obj = asObject(data)
    if (!obj) return { data: null, error: 'empty counts' }
    return {
      data: {
        practice_count: num(obj.practice_count) ?? 0,
        physician_count: num(obj.physician_count) ?? 0,
        as_of: str(obj.as_of),
      },
      error: null,
    }
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Counts failed' }
  }
}

export function formatPublicCityState(city: string | null, state: string | null): string {
  const c = (city || '').trim()
  const s = (state || '').trim()
  if (c && s) return `${c}, ${s}`
  return c || s || ''
}

/** Public Atlas origin for profile deep-links from marketing. */
export function atlasOrigin(): string {
  return (process.env.NEXT_PUBLIC_ATLAS_ORIGIN || 'https://atlas.matchmed.app').replace(/\/$/, '')
}
