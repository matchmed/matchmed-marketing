'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Is this data actually public?',
    a: 'Yes. Every practice profile and physician record on Atlas is derived from Medicare Part B data published annually by the federal government. It has always been public. We built the infrastructure to make it searchable and useful.',
  },
  {
    q: 'Can practices manipulate their score?',
    a: 'No. Scores are calculated entirely from federal Medicare billing records. Practices have no ability to edit, remove, or influence what appears in that data. A recruiter telling you a practice is great does not change what the data shows.',
  },
  {
    q: 'How current is the data?',
    a: 'Atlas data is current. We update the database each time CMS releases new data.',
  },
  {
    q: 'Is it free?',
    a: 'Free for residents, fellows, and early-career attendings within their first five years of practice. NPI verification is required to confirm eligibility.',
  },
  {
    q: 'How do I know if a physician left vs. retired?',
    a: "We don't always know, and we say so. What the data shows is that a physician stopped appearing on a practice's Medicare roster. For physicians who graduated recently, retirement is unlikely. For senior physicians, it's a real possibility. Atlas flags career stage context so you can interpret departures accordingly.",
  },
]

const S = {
  hairline: '1px solid rgba(20,18,16,0.10)',
  teal:     '#1C4A45',
  ink:      '#141210',
  mid:      '#8A8680',
  canvas:   '#F7F6F2',
}

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faqs" style={{ borderBottom: S.hairline, background: '#EDEBE4' }}>
      <div style={{ padding: '4rem 3rem' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, opacity: 0.7, marginBottom: '3rem' }}>
          Frequently asked questions
        </div>
        <div>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{ borderTop: S.hairline, ...(i === FAQS.length - 1 ? { borderBottom: S.hairline } : {}) }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '2rem',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: S.ink, letterSpacing: -0.2 }}>
                  {faq.q}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke={S.mid}
                  strokeWidth="1.5"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>
              {open === i && (
                <p style={{
                  fontSize: 14,
                  color: S.mid,
                  lineHeight: 1.75,
                  paddingBottom: '1.25rem',
                  maxWidth: 640,
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
