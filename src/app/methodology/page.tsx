// src/app/methodology/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Scoring Methodology — Atlas by MatchMed',
}

const S = {
  hairline: '1px solid rgba(20,18,16,0.10)',
  teal:     '#1C4A45',
  ink:      '#141210',
  mid:      '#8A8680',
  canvas:   '#F7F6F2',
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 500, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: S.mid,
      margin: '3rem 0 1rem',
      paddingBottom: '0.75rem',
      borderBottom: S.hairline,
    }}>
      {children}
    </div>
  )
}

function ScoreCard({ title, weight, weightColor = S.teal, weightBg = '#E8F0EF', children }: {
  title: string; weight: string; weightColor?: string; weightBg?: string; children: ReactNode
}) {
  return (
    <div style={{ border: S.hairline, borderRadius: 4, padding: '1.5rem', marginBottom: 10, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: S.ink, letterSpacing: -0.2 }}>{title}</div>
        <span style={{ fontSize: 11, fontWeight: 500, color: weightColor, background: weightBg, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.03em' }}>{weight}</span>
      </div>
      {children}
    </div>
  )
}

export default function MethodologyPage() {
  return (
    <div style={{ background: S.canvas, minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      <nav className="subpage-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: S.hairline }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: S.ink, letterSpacing: -0.3, textDecoration: 'none' }}>
          Atlas
        </Link>
        <Link href="/" style={{ fontSize: 13, color: S.mid, textDecoration: 'none' }}>
          Back to home
        </Link>
      </nav>

      <div className="subpage-content" style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 3rem 6rem' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '1.5rem' }}>
          Atlas by MatchMed
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, color: S.ink, marginBottom: '0.75rem' }}>
          About the Retention Index
        </h1>
        <p style={{ fontSize: 15, color: S.mid, lineHeight: 1.7, marginBottom: '3rem' }}>
          Every number on Atlas is derived from publicly available government data. No surveys, no self-reporting, no recruiter claims. Here's exactly how we calculate what you see.
        </p>

        <SectionLabel>Data source</SectionLabel>
        <div style={{ borderLeft: '2px solid #1C4A45', paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: S.ink }}>Medicare Part B Provider Data, <a href="https://data.cms.gov/" target="_blank" rel="noopener" style={{ color: S.teal, textDecoration: 'none' }}>Centers for Medicare &amp; Medicaid Services (CMS)</a>.</strong> This dataset captures physician-practice affiliations across annual snapshots. The Retention Index is calculated from 2019 onwards, using the complete longitudinal record of every physician who has appeared on a practice's Medicare roster. No proprietary, self-reported, or third-party data is used. Practices cannot edit, remove, or influence what appears in this data.
          </p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.6, marginTop: '0.75rem', opacity: 0.7 }}>
            Atlas is not affiliated with, endorsed by, or sponsored by the Centers for Medicare &amp; Medicaid Services or any other federal agency.
          </p>
        </div>

        <SectionLabel>The core idea</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1rem' }}>Every physician who joins a practice either stays or leaves. How long they stayed is an observed historical pattern. A longer observed stay and a shorter observed stay are different signals in the data, and Atlas weights them differently.</p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '2rem' }}>A departure within about two years may warrant closer diligence. A departure around five years may reflect a workforce pattern worth understanding in context — for example partnership timing or growth expectations. Atlas does not establish why any physician left. The Retention Index summarizes these observed patterns so physicians know where additional questions may be useful.</p>

        <SectionLabel>The measures</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1.5rem' }}>The Retention Index is scaled 0–100. Higher values reflect greater observed physician retention.</p>

        <ScoreCard title="Attrition Resistance" weight="Primary component">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Measures the weighted departure load of physicians who have left the practice. Unlike a simple short-exit count, every departure is weighted by how long the physician stayed, with shorter observed stays carrying more influence in the measure.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: '1rem' }}>
            <thead>
              <tr>
                {['Tenure at departure', 'Weight', 'Diligence context'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.mid, padding: '6px 12px', borderBottom: S.hairline }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['0 – 2 years', 'Highest', 'May warrant closer diligence'],
                ['2 – 4 years', 'High', 'May be relevant when evaluating partnership-track timing'],
                ['4 – 6 years', 'Moderate', 'May reflect a workforce pattern worth understanding in context'],
                ['6 – 10 years', 'Low', 'Ambiguous; many ordinary explanations'],
                ['10+ years', 'Minimal', 'Often near career-stage; treated as lower signal'],
              ].map(([tenure, weight, signal]) => (
                <tr key={tenure}>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline, color: S.ink, fontSize: 13 }}>{tenure}</td>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline }}>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 12,
                      background: '#E8F0EF',
                      color: S.teal,
                    }}>{weight}</span>
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline, color: S.mid, fontSize: 13 }}>{signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            Any individual departure may have a personal explanation, and Atlas assigns none. Across thousands of practices and years of CMS data, idiosyncratic reasons average out. A repeated pattern of departures at a similar career stage may be worth discussing with the practice and current or former physicians.
          </div>
        </ScoreCard>

        <ScoreCard title="Tenure Strength" weight="Secondary component">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Measures how long physicians currently at the practice have stayed. Calculated from the active roster only. Physicians who have already left no longer contribute to this metric.</p>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            Tenure Strength reflects the current workforce only. Departed physicians are not used to describe current roster tenure.
          </div>
        </ScoreCard>

        <ScoreCard title="Cluster Signals" weight="Index modifier" weightColor={S.teal} weightBg="#E8F0EF">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Two pattern-level signals that apply a downward modifier when triggered.</p>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: S.ink, marginBottom: '0.4rem' }}>Temporal cluster</div>
            <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: '0 0 1rem' }}>Fires when a meaningful concentration of departures occurs within a defined rolling window. This may coincide with events such as leadership change or acquisition and may warrant additional diligence. Applies a <strong>downward Retention Index adjustment</strong>.</p>
            <div style={{ fontSize: 13, fontWeight: 500, color: S.ink, marginBottom: '0.4rem' }}>Tenure similarity cluster</div>
            <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: 0 }}>Fires when multiple physicians departed after a similar amount of time. A repeated exit point at a similar career stage is a historical workforce pattern worth understanding in context. Applies a <strong>downward Retention Index adjustment</strong>.</p>
          </div>
        </ScoreCard>

        <ScoreCard title="Median years since medical school" weight="Context only" weightColor={S.mid} weightBg="#F1EFE8">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Median years since medical school graduation among physicians on the current roster. Shown as context and not included in the Retention Index.</p>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            A more senior roster may be relevant when considering succession or future workforce transition. Seniority is neither inherently positive nor negative.
          </div>
        </ScoreCard>

        <ScoreCard title="Retention Index" weight="Composite">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>
            The Retention Index is a standardized measure derived from CMS-observed physician retention patterns. It summarizes historical workforce stability across the physicians Atlas observes at a practice. It is a weighted composite of Attrition Resistance and Tenure Strength, adjusted by cluster signals.
          </p>
          <div style={{ background: '#F1EFE8', borderRadius: 4, padding: '1rem 1.25rem', fontFamily: 'monospace', fontSize: 13, color: S.ink, marginBottom: '0.75rem', lineHeight: 1.8 }}>
            Retention Index =<br />
            &nbsp;&nbsp;[(<span style={{ color: S.teal, fontWeight: 600 }}>Attrition Resistance</span> × primary weight)<br />
            &nbsp;&nbsp;+ (<span style={{ color: S.teal, fontWeight: 600 }}>Tenure Strength</span> × secondary weight)]<br />
            &nbsp;&nbsp;× <span style={{ color: S.teal, fontWeight: 600 }}>Cluster Modifier</span> (if applicable)
          </div>
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: 0 }}>Specific component weights are proprietary. The Retention Index is not a rating of practice quality and does not establish why any individual physician joined or left. It is intended as one input into broader practice diligence.</p>
        </ScoreCard>

        <SectionLabel>Retention Index change since 2019</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1.5rem' }}>Where available, Atlas can compare the current Retention Index with a 2019 baseline. A positive or negative change describes movement in the historical measure over time — not an automatic judgment of practice quality.</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: '2rem' }}>
          {[
            { color: S.teal, symbol: '▲ +', label: 'Higher than 2019 baseline' },
            { color: S.mid,     symbol: '—',   label: 'No meaningful change' },
            { color: S.mid, symbol: '▼ −', label: 'Lower than 2019 baseline' },
          ].map(({ color, symbol, label }) => (
            <div key={label} style={{ flex: 1, background: '#fff', border: S.hairline, borderRadius: 4, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color, marginBottom: 4 }}>{symbol}</div>
              <div style={{ fontSize: 11, color: S.mid }}>{label}</div>
            </div>
          ))}
        </div>

        <SectionLabel>What the Retention Index is not</SectionLabel>
        <div style={{ borderLeft: `2px solid ${S.teal}`, paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.8, margin: 0 }}>
            The Retention Index is <strong style={{ color: S.ink }}>not</strong> a rating of practice quality, clinical quality, patient outcomes, compensation, or workplace culture. It summarizes historical workforce stability and does not establish why any physician joined or left. It is intended as one input into broader practice diligence.
            <br /><br />
            Use Atlas alongside site visits, peer conversations, and contract review with an attorney.
          </p>
        </div>

        <SectionLabel>Data errors and corrections</SectionLabel>
        <div style={{ background: '#fff', border: S.hairline, borderRadius: 4, padding: '1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, marginBottom: '0.75rem' }}>The Retention Index is derived from CMS Medicare Part B data, which may occasionally contain inaccuracies. If you believe an index value reflects a data error, contact us to flag the issue.</p>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            Email <a href="mailto:admin@matchmed.app" style={{ color: S.teal, textDecoration: 'none' }}>admin@matchmed.app</a> with subject line <strong style={{ color: S.ink }}>Data Inquiry – [Practice Name]</strong>.
          </p>
        </div>

        <div style={{ padding: '1.5rem', border: S.hairline, borderRadius: 4, background: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.75rem' }}>Legal &amp; methodological disclaimers</div>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: '0 0 0.5rem' }}>The Retention Index and related measures are derived from CMS Medicare Part B public datasets. MatchMed makes no representations regarding the completeness, accuracy, or timeliness of underlying CMS data.</p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: '0 0 0.5rem' }}>They are statistical estimates, not factual declarations. They do not establish causation or assign a reason for physician departures.</p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            MatchMed, LLC is not liable for any employment, contracting, or other decisions made in reliance on Atlas Retention Index values. Use is subject to our{' '}
            <Link href="/terms" style={{ color: S.teal, textDecoration: 'none' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: S.teal, textDecoration: 'none' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <footer style={{ padding: '2rem 3rem', borderTop: S.hairline, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: S.mid }}>
        <span>© 2026 MatchMed LLC.</span>
        <Link href="/" style={{ color: S.mid, textDecoration: 'none' }}>Back to home</Link>
      </footer>
    </div>
  )
}
