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
          About the scores
        </h1>
        <p style={{ fontSize: 15, color: S.mid, lineHeight: 1.7, marginBottom: '3rem' }}>
          Every number on Atlas is derived from publicly available government data. No surveys, no self-reporting, no recruiter claims. Here's exactly how we calculate what you see.
        </p>

        <SectionLabel>Data source</SectionLabel>
        <div style={{ borderLeft: '2px solid #1C4A45', paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: S.ink }}>Medicare Part B Provider Data, <a href="https://data.cms.gov/" target="_blank" rel="noopener" style={{ color: S.teal, textDecoration: 'none' }}>Centers for Medicare &amp; Medicaid Services (CMS)</a>.</strong> This dataset captures physician-practice affiliations across annual snapshots. Atlas scores are calculated from 2019 onwards, using the complete longitudinal record of every physician who has appeared on a practice's Medicare roster. No proprietary, self-reported, or third-party data is used. Practices cannot edit, remove, or influence what appears in this data.
          </p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.6, marginTop: '0.75rem', opacity: 0.7 }}>
            Atlas is not affiliated with, endorsed by, or sponsored by the Centers for Medicare &amp; Medicaid Services or any other federal agency.
          </p>
        </div>

        <SectionLabel>The core idea</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1rem' }}>Every physician who joins a practice either stays or leaves. Staying is an endorsement. The longer they stay, the stronger it is. Leaving is a withdrawal of that endorsement, and the weight of that withdrawal depends on how long they stayed before deciding to go.</p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '2rem' }}>A physician who leaves in under two years saw something immediately disqualifying. A physician who leaves after five years likely hit a structural ceiling: partnership that never materialized, growth that stalled. Both matter. The Retention Score captures both, weighted by how invested each physician was when they left.</p>

        <SectionLabel>The scores</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1.5rem' }}>Each score is scaled 0–100. Higher reflects stronger physician retention.</p>

        <ScoreCard title="Attrition Resistance" weight="Primary component">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Measures the weighted departure load of physicians who have left the practice. Unlike a simple short-exit count, every departure is weighted by how long the physician stayed, with shorter departures carrying significantly more penalty.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: '1rem' }}>
            <thead>
              <tr>
                {['Tenure at departure', 'Penalty', 'Signal'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.mid, padding: '6px 12px', borderBottom: S.hairline }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['0 – 2 years', 'Highest', 'Immediate red flag. Something disqualifying found quickly'],
                ['2 – 4 years', 'High', 'Classic churn. Dysfunction discovered within partnership track'],
                ['4 – 6 years', 'Moderate', 'Partnership or growth failure. A structural ceiling hit'],
                ['6 – 10 years', 'Low', 'Baseline signal. Ambiguous, many possible explanations'],
                ['10+ years', 'Minimal', 'Near-retirement territory. Lower signal weight'],
              ].map(([tenure, penalty, signal]) => (
                <tr key={tenure}>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline, color: S.ink, fontSize: 13 }}>{tenure}</td>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline }}>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 12,
                      background: penalty === 'Highest' ? '#FCEBEB' : penalty === 'High' ? '#FAEEDA' : penalty === 'Moderate' ? '#FAEEDA' : penalty === 'Low' ? '#EAF3DE' : '#F1EFE8',
                      color: penalty === 'Highest' || penalty === 'High' ? '#A32D2D' : penalty === 'Moderate' ? '#854F0B' : penalty === 'Low' ? '#3B6D11' : S.mid,
                    }}>{penalty}</span>
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: S.hairline, color: S.mid, fontSize: 13 }}>{signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            Any individual departure may have a personal explanation. But across 6,400 practices and eight years of data, idiosyncratic reasons average out. A practice with a systematic pattern of departures at a specific career stage is showing something structural, regardless of what any single physician says when they leave.
          </div>
        </ScoreCard>

        <ScoreCard title="Tenure Strength" weight="Secondary component">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Measures how long physicians currently at the practice have stayed. Calculated from the active roster only. Physicians who have already left no longer contribute to this metric.</p>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            Departed physicians should not continue to prop up a practice's score after they leave. Tenure Strength reflects the current workforce: the physicians who will actually be your colleagues if you join.
          </div>
        </ScoreCard>

        <ScoreCard title="Cluster Signals" weight="Score modifier" weightColor="#854F0B" weightBg="#FAEEDA">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Two pattern-level signals that apply a downward modifier when triggered.</p>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: S.ink, marginBottom: '0.4rem' }}>Temporal cluster</div>
            <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: '0 0 1rem' }}>Fires when a meaningful concentration of departures occurs within a defined rolling window. Signals a systemic event such as leadership change, acquisition, or cultural disruption. Applies a <strong>downward score adjustment</strong>.</p>
            <div style={{ fontSize: 13, fontWeight: 500, color: S.ink, marginBottom: '0.4rem' }}>Tenure similarity cluster</div>
            <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: 0 }}>Fires when multiple physicians departed after a similar amount of time. Signals a structural failure at a specific career stage. Applies a <strong>downward score adjustment</strong>.</p>
          </div>
        </ScoreCard>

        <ScoreCard title="Experience Level" weight="Context only" weightColor={S.mid} weightBg="#F1EFE8">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>Measures the collective seniority of the current roster. Derived from median years since medical school graduation. Displayed as context alongside the Retention Score but not included in the composite.</p>
          <div style={{ fontSize: 12, color: S.teal, background: '#E8F0EF', borderLeft: `2px solid ${S.teal}`, padding: '10px 14px', lineHeight: 1.6 }}>
            Experience level reflects practice maturity. Senior-heavy rosters can carry succession and PE acquisition risk that would be incorrectly rewarded if included in a retention composite.
          </div>
        </ScoreCard>

        <ScoreCard title="Retention Score" weight="Composite">
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, marginBottom: '1rem' }}>A weighted composite of Attrition Resistance and Tenure Strength, adjusted by cluster signals.</p>
          <div style={{ background: '#F1EFE8', borderRadius: 4, padding: '1rem 1.25rem', fontFamily: 'monospace', fontSize: 13, color: S.ink, marginBottom: '0.75rem', lineHeight: 1.8 }}>
            Retention Score =<br />
            &nbsp;&nbsp;[(<span style={{ color: S.teal, fontWeight: 600 }}>Attrition Resistance</span> × primary weight)<br />
            &nbsp;&nbsp;+ (<span style={{ color: S.teal, fontWeight: 600 }}>Tenure Strength</span> × secondary weight)]<br />
            &nbsp;&nbsp;× <span style={{ color: S.teal, fontWeight: 600 }}>Cluster Modifier</span> (if applicable)
          </div>
          <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7, margin: 0 }}>Specific component weights are proprietary.</p>
        </ScoreCard>

        <SectionLabel>Delta scores: change since 2019</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid, marginBottom: '1.5rem' }}>Every metric is compared against a 2019 baseline. Delta scores show whether a practice has improved, deteriorated, or remained stable over time.</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: '2rem' }}>
          {[
            { color: '#3B6D11', symbol: '▲ +', label: 'More stable than 2019' },
            { color: S.mid,     symbol: '—',   label: 'No meaningful change' },
            { color: '#A32D2D', symbol: '▼ −', label: 'Less stable than 2019' },
          ].map(({ color, symbol, label }) => (
            <div key={label} style={{ flex: 1, background: '#fff', border: S.hairline, borderRadius: 4, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color, marginBottom: 4 }}>{symbol}</div>
              <div style={{ fontSize: 11, color: S.mid }}>{label}</div>
            </div>
          ))}
        </div>

        <SectionLabel>What the score is not</SectionLabel>
        <div style={{ borderLeft: `2px solid ${S.teal}`, paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.8, margin: 0 }}>
            The Retention Score is <strong style={{ color: S.ink }}>not</strong> a measure of clinical quality, patient outcomes, compensation, or workplace culture. It answers one question: <em>based on how physicians have historically moved through this practice, how well does it retain the people who join it?</em>
            <br /><br />
            Use Atlas as one input in your due diligence, alongside site visits, peer conversations, and contract review with an attorney.
          </p>
        </div>

        <SectionLabel>Data errors and corrections</SectionLabel>
        <div style={{ background: '#fff', border: S.hairline, borderRadius: 4, padding: '1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, marginBottom: '0.75rem' }}>Atlas scores are derived from CMS Medicare Part B data, which may occasionally contain inaccuracies. If you believe a score reflects a data error, contact us to flag the issue.</p>
          <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            Email <a href="mailto:admin@matchmed.app" style={{ color: S.teal, textDecoration: 'none' }}>admin@matchmed.app</a> with subject line <strong style={{ color: S.ink }}>Data Inquiry – [Practice Name]</strong>.
          </p>
        </div>

        <div style={{ padding: '1.5rem', border: S.hairline, borderRadius: 4, background: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.75rem' }}>Legal &amp; methodological disclaimers</div>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: '0 0 0.5rem' }}>All scores are derived from CMS Medicare Part B public datasets. MatchMed makes no representations regarding the completeness, accuracy, or timeliness of underlying CMS data.</p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: '0 0 0.5rem' }}>Scores are statistical estimates, not factual declarations. They do not establish causation or assign blame for physician departures.</p>
          <p style={{ fontSize: 12, color: S.mid, lineHeight: 1.7, margin: 0 }}>
            MatchMed, LLC is not liable for any employment, contracting, or other decisions made in reliance on Atlas scores. Use is subject to our{' '}
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
