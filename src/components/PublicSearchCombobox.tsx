'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  atlasOrigin,
  formatPublicCityState,
  publicPlatformCounts,
  publicSearch,
  type PublicSearchPractice,
  type PublicSearchPhysician,
} from '@/lib/atlas-public-search'
import { captureAnalyticsEvent } from '@/lib/posthog-client'
import { rememberCampaignPerson, withPostHogAttribution } from '@/lib/posthog-attribution'

type Hit =
  | { kind: 'practice'; item: PublicSearchPractice }
  | { kind: 'physician'; item: PublicSearchPhysician }

const DEBOUNCE_MS = 300

/**
 * Marketing-site wrapper around the Atlas public_search / public_platform_counts RPCs.
 * Behavior matches Atlas PublicSearchCombobox; results deep-link to atlas.matchmed.app.
 */
export default function PublicSearchCombobox() {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchedPractices, setFetchedPractices] = useState<PublicSearchPractice[]>([])
  const [fetchedPhysicians, setFetchedPhysicians] = useState<PublicSearchPhysician[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [counts, setCounts] = useState<{ practices: number; physicians: number } | null>(null)

  const canSearch = debounced.length >= 3
  const practices = canSearch ? fetchedPractices : []
  const physicians = canSearch ? fetchedPhysicians : []
  const origin = atlasOrigin()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await publicPlatformCounts()
      if (!cancelled && data) {
        setCounts({
          practices: data.practice_count,
          physicians: data.physician_count,
        })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebounced(query.trim())
    }, DEBOUNCE_MS)
    return () => window.clearTimeout(handle)
  }, [query])

  useEffect(() => {
    if (!canSearch) return

    let cancelled = false
    const q = debounced
    ;(async () => {
      setLoading(true)
      setError(null)
      const { data, error: rpcError } = await publicSearch(q)
      if (cancelled) return
      if (rpcError) {
        setError('Search is temporarily unavailable. Please try again.')
        setFetchedPractices([])
        setFetchedPhysicians([])
        captureAnalyticsEvent('public_search_performed', {
          source: 'marketing',
          query_length: q.length,
          practice_results: 0,
          physician_results: 0,
          had_error: true,
        })
      } else {
        const nextPractices = data?.practices ?? []
        const nextPhysicians = data?.physicians ?? []
        setFetchedPractices(nextPractices)
        setFetchedPhysicians(nextPhysicians)
        captureAnalyticsEvent('public_search_performed', {
          source: 'marketing',
          query_length: q.length,
          practice_results: nextPractices.length,
          physician_results: nextPhysicians.length,
          had_error: false,
        })
      }
      setActiveIndex(-1)
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [canSearch, debounced])

  const flatHits: Hit[] = useMemo(() => {
    if (!canSearch) return []
    const rows: Hit[] = []
    for (const item of fetchedPractices) rows.push({ kind: 'practice', item })
    for (const item of fetchedPhysicians) rows.push({ kind: 'physician', item })
    return rows
  }, [canSearch, fetchedPractices, fetchedPhysicians])

  const showPanel = canSearch
  const noResults =
    showPanel && !loading && !error && practices.length === 0 && physicians.length === 0

  function goToHit(hit: Hit) {
    captureAnalyticsEvent(
      'public_search_result_selected',
      {
        source: 'marketing',
        result_kind: hit.kind,
      },
      { sendInstantly: true },
    )
    rememberCampaignPerson()
    const href =
      hit.kind === 'practice'
        ? `${origin}/practices/${hit.item.id}`
        : `${origin}/physicians/${hit.item.id}`
    window.location.assign(withPostHogAttribution(href))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showPanel || flatHits.length === 0) {
      if (e.key === 'Escape') {
        setQuery('')
        setDebounced('')
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % flatHits.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i <= 0 ? flatHits.length - 1 : i - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      goToHit(flatHits[activeIndex])
    } else if (e.key === 'Escape') {
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="landing-hero-search">
      <div className="public-search" role="search">
        <label htmlFor="marketing-public-search-input" className="sr-only">
          Search a practice or ophthalmologist
        </label>
        <input
          ref={inputRef}
          id="marketing-public-search-input"
          type="search"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Search a practice or ophthalmologist"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-controls={listId}
          aria-expanded={showPanel}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
          }
          className="public-search-input"
        />

        {showPanel && (
          <div
            id={listId}
            role="listbox"
            aria-label="Search results"
            className="public-search-panel"
          >
            {loading && (
              <div className="public-search-status" role="status">
                Searching…
              </div>
            )}
            {error && (
              <div className="public-search-status public-search-error" role="alert">
                {error}
              </div>
            )}
            {noResults && (
              <div className="public-search-status" role="status">
                No practices or ophthalmologists matched that search.
              </div>
            )}

            {!loading && !error && practices.length > 0 && (
              <div className="public-search-group">
                <div className="public-search-group-label">Practices</div>
                {practices.map((p, i) => {
                  const flatIndex = i
                  const active = flatIndex === activeIndex
                  const loc = formatPublicCityState(p.city, p.state)
                  return (
                    <button
                      key={p.id}
                      type="button"
                      id={`${listId}-opt-${flatIndex}`}
                      role="option"
                      aria-selected={active}
                      className={`public-search-option${active ? ' is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      onClick={() => goToHit({ kind: 'practice', item: p })}
                    >
                      <span className="public-search-option-title">
                        {p.practice_name || 'Practice'}
                      </span>
                      <span className="public-search-option-meta">
                        {[loc, p.location_count && p.location_count > 1
                          ? `${p.location_count} locations`
                          : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {!loading && !error && physicians.length > 0 && (
              <div className="public-search-group">
                <div className="public-search-group-label">Ophthalmologists</div>
                {physicians.map((d, i) => {
                  const flatIndex = practices.length + i
                  const active = flatIndex === activeIndex
                  const loc = formatPublicCityState(d.city, d.state)
                  return (
                    <button
                      key={d.id}
                      type="button"
                      id={`${listId}-opt-${flatIndex}`}
                      role="option"
                      aria-selected={active}
                      className={`public-search-option${active ? ' is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      onClick={() => goToHit({ kind: 'physician', item: d })}
                    >
                      <span className="public-search-option-title">
                        {d.physician_name || 'Physician'}
                      </span>
                      <span className="public-search-option-meta">
                        {[d.current_practice_name, loc].filter(Boolean).join(' · ')}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {counts && (
        <p className="landing-hero-search-counts">
          Tracking {counts.practices.toLocaleString()}+ practices and{' '}
          {counts.physicians.toLocaleString()}+ ophthalmologists
        </p>
      )}
    </div>
  )
}
