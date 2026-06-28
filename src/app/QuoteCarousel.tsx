'use client'

import { useState } from 'react'

const QUOTES = [
  {
    text: "I thought it was comprehensive and informative! I haven't seen that information regarding old/current roster and duration of tenure presented anywhere before. I think the angle of looking at stability is really useful.",
    attr: 'Mark O., MD, PGY3',
  },
  {
    text: "Amazing resource! Seems powerful to help those out of training know the full stories behind interviews.",
    attr: 'Jordan S., MD, Attending Physician',
  },
  {
    text: "The site is already way more sophisticated than I anticipated. I'm even using Atlas as a sort of master list of practices by region since I'm not aware of any other resource that has this capability.",
    attr: 'Esteban P., MD, PGY4',
  },
  {
    text: "It's been tremendously helpful particularly in giving me a list of people who have left the practice so I can reach out to them and see what their motivation was for departing.",
    attr: 'Keke L., MD, PGY4',
  },
]

const S = {
  hairline: '1px solid rgba(20,18,16,0.10)',
  ink:      '#141210',
  mid:      '#8A8680',
  canvas:   '#F7F6F2',
}

export default function QuoteCarousel() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + QUOTES.length) % QUOTES.length)
  const next = () => setCurrent((c) => (c + 1) % QUOTES.length)

  return (
    <section id="testimonials" style={{ borderBottom: S.hairline, background: '#EDEBE4' }}>
      <div className="landing-quote-pad" style={{ padding: '3rem' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, opacity: 0.7, marginBottom: '3rem' }}>
          What physicians say
        </div>
        <div style={{ marginBottom: '2.5rem' }}>
          <blockquote style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.5,
            color: S.ink,
            letterSpacing: -0.3,
            maxWidth: 820,
            marginBottom: '1.5rem',
          }}>
            &ldquo;{QUOTES[current].text}&rdquo;
          </blockquote>
          <p style={{ fontSize: 13, color: S.mid }}>{QUOTES[current].attr}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[prev, next].map((fn, i) => (
            <button
              key={i}
              onClick={fn}
              aria-label={i === 0 ? 'Previous quote' : 'Next quote'}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: S.hairline, background: S.ink, color: S.canvas,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {i === 0 ? <path d="M10 4L6 8l4 4" /> : <path d="M6 4l4 4-4 4" />}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}