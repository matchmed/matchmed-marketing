// src/app/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import QuoteCarousel from './QuoteCarousel'
import FAQAccordion from './FAQAccordion'

export const metadata: Metadata = {
  title: 'Atlas by MatchMed — Ophthalmology Workforce Intelligence',
  description:
    'Eight years of Medicare data covering 22,000+ physicians and 6,400+ practices. Know a practice before you commit to it.',
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { label: '23.6%',             value: 'of ophthalmologists graduating since 2016 have changed practices' },
  { label: '8+ years',          value: 'of longitudinal data across the US workforce' },
  { label: 'No recruiters',     value: 'no surveys, no self-reporting, just data' },
  { label: 'Job-switching',     value: 'rising in each successive graduating class since 2016' },
  { label: 'Physician-founded', value: 'built by an ophthalmologist for ophthalmologists' },
]

const HERO_STATS = [
  { number: '22,000+', label: 'ophthalmologists tracked\nacross the full US workforce' },
  { number: '6,400+',  label: 'practices profiled with\nlongitudinal tenure data' },
  { number: '8 yrs',   label: 'of longitudinal data\nunderlying every profile' },
]

const INSTITUTIONS = [
  'Bascom Palmer',
  'Duke',
  'Emory',
  'Columbia',
  'Vanderbilt',
  'Indiana University',
  'Baylor Scott & White',
  'University of Iowa',
  'University of Rochester',
]

const FEATURES = [
  {
    title: 'Physician tenure & departure history',
    body:  'See how long doctors actually stay at a practice, and whether recent departures follow a pattern worth understanding before you sign.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <circle cx="16" cy="10" r="4" />
        <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <circle cx="26" cy="10" r="3" />
        <path d="M29 24c0-4-2.7-7.5-6.5-8.8" />
      </svg>
    ),
  },
  {
    title: 'Geographic search & map view',
    body:  'Scan practices across any region on an interactive map. Filter by state, city, or draw your own search area.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <circle cx="16" cy="13" r="4" />
        <path d="M16 2C10.5 2 6 6.5 6 12c0 7 10 18 10 18s10-11 10-18c0-5.5-4.5-10-10-10z" />
      </svg>
    ),
  },
  {
    title: 'Current & former physician roster',
    body:  "See who is at a practice today, who has left, and when. Reach out to former physicians directly to hear their experience firsthand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 12h24M10 6V4M22 6V4" />
      </svg>
    ),
  },
  {
    title: 'Open job listings',
    body:  'Browse positions from practices actively recruiting, with practice intelligence already attached. No recruiter required.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <rect x="4" y="10" width="24" height="18" rx="2" />
        <path d="M11 10V7a5 5 0 0 1 10 0v3" />
      </svg>
    ),
  },
]

const HOW_STEPS = [
  {
    step:  'Step one',
    title: 'Search any practice or physician',
    body:  'Browse by name, location, or subspecialty. Atlas covers virtually every ophthalmology practice across the US.',
  },
  {
    step:  'Step two',
    title: 'Review the practice profile',
    body:  'See who is currently at a practice, who has left, how long physicians typically stay, and how the practice compares to others in the region.',
  },
  {
    step:  'Step three',
    title: 'Shortlist and compare',
    body:  "Save the practices you're evaluating and compare them side by side before committing to site visits or contract negotiations.",
  },
]

// ─── STYLE CONSTANTS ──────────────────────────────────────────────────────────

const S = {
  hairline:   '1px solid rgba(20,18,16,0.10)',
  teal:       '#1C4A45',
  ink:        '#141210',
  mid:        '#8A8680',
  canvas:     '#F7F6F2',
  sectionPad: '4rem 3rem' as const,
  label: {
    fontSize: 10, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: '#8A8680', opacity: 0.7,
  },
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      style={{ background: S.teal, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', height: 36, display: 'flex', alignItems: 'center' }}
      aria-hidden="true"
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0 2.5rem', borderRight: '1px solid rgba(255,255,255,0.15)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.4)', marginRight: '0.5rem' }}>{item.label}</span>
            {item.value}
          </span>
        ))}
      </div>
    </div>
  )
}

function NavLogo() {
  return (
    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 20 }}>
      {/* Compass mark */}
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" aria-label="Atlas compass mark">
        <circle cx="50" cy="50" r="47" stroke="#1C4A45" strokeWidth="1.4"/>
        <polygon points="50,8 57,43 92,50 57,57 50,92 43,57 8,50 43,43" fill="#1C4A45"/>
        <circle cx="50" cy="50" r="4.4" fill="#F7F6F2"/>
      </svg>

      {/* Divider */}
      <span style={{ width: 1, height: 32, background: 'rgba(20,18,16,0.12)', display: 'block' }} />

      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 0.8,
          color: '#1C4A45',
          letterSpacing: '-0.01em',
        }}>
          Atlas
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#5E7A75',
        }}>
          by Matchmed
        </span>
      </div>
    </Link>
  )
}

function Nav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: S.hairline }}>
      <NavLogo />
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {[['Features', '#features'], ['Testimonials', '#testimonials'], ['Process', '#how-it-works'], ['FAQs', '#faqs'], ['Methodology', '/methodology']].map(([label, href]) => (
          <Link key={label} href={href} style={{ fontSize: 13, color: S.mid, letterSpacing: '0.01em' }}>
            {label}
          </Link>
        ))}
        <Link
          href="https://atlas.matchmed.app"
          style={{ fontSize: 13, fontWeight: 500, color: S.canvas, background: S.ink, borderRadius: 3, padding: '8px 18px' }}
        >
          Open Atlas
        </Link>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{ borderBottom: S.hairline }}>
      <div style={{ padding: '5rem 3rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.teal, marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: S.teal }} />
            Ophthalmology workforce intelligence
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px, 5vw, 58px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: -1, color: S.ink, marginBottom: '2rem' }}>
            Know a practice<br />
            before you <em style={{ fontStyle: 'italic', color: S.teal }}>commit</em><br />
            to it.
          </h1>
          <p style={{ fontSize: 16, color: S.mid, lineHeight: 1.7, maxWidth: 380, marginBottom: '2.5rem' }}>
            Eight years of Medicare data. 22,000+ physicians. The due diligence layer that should have existed when you were making this decision.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="https://atlas.matchmed.app/practices" style={{ fontSize: 14, fontWeight: 500, color: S.canvas, background: S.teal, borderRadius: 3, padding: '11px 24px' }}>
              Explore practices
            </Link>
            <Link href="#how-it-works" style={{ fontSize: 13, color: S.mid, display: 'flex', alignItems: 'center', gap: 6 }}>
              See how it works
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {HERO_STATS.map((stat, i) => (
            <div key={i} style={{ padding: '1.5rem 0', borderTop: S.hairline, ...(i === HERO_STATS.length - 1 ? { borderBottom: S.hairline } : {}) }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 400, color: S.ink, letterSpacing: -1.5, lineHeight: 1, marginBottom: 4 }}>
                {stat.number}
              </div>
              <div style={{ fontSize: 13, color: S.mid, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstitutionStrip() {
  return (
    <div style={{ padding: '1rem 3rem', borderBottom: S.hairline, display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.mid, opacity: 0.6, whiteSpace: 'nowrap' }}>
        Used by physicians at
      </span>
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
        {INSTITUTIONS.map((name) => (
          <span key={name} style={{ fontSize: 13, color: S.ink, fontWeight: 300 }}>{name}</span>
        ))}
      </div>
    </div>
  )
}

function ProblemSection() {
  return (
    <section style={{ borderBottom: S.hairline }}>
      <div style={{ padding: '4rem 3rem' }}>
        <div style={{ ...S.label, marginBottom: '3rem' }}>The problem</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.5 }}>
            You&apos;re making a<br />
            <em style={{ fontStyle: 'italic', color: S.teal }}>multi-year decision</em><br />
            with almost no data.
          </h2>
          <div style={{ fontSize: 15, color: S.mid, lineHeight: 1.8 }}>
            <p>Most physicians choose their first attending job based on a handful of site visits and what the recruiter tells them. There&apos;s no independent way to verify practice stability, understand physician turnover, or see what volume actually looks like over time.</p>
            <p style={{ marginTop: '1.25rem', fontSize: 15, color: S.ink, fontWeight: 500 }}>
              No recruiters. No guesswork. Just data that&apos;s always been public, finally organized for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FindingSection() {
  const darkBorder = '1px solid rgba(255,255,255,0.1)'
  return (
    <section style={{ borderBottom: darkBorder, background: '#1C4A45' }}>
      <div style={{ padding: '4rem 3rem' }}>
        <div style={{ ...S.label, marginBottom: '3rem', color: 'rgba(255,255,255,0.5)', opacity: 1 }}>A finding from the data</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 9vw, 110px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: -4, color: '#F7F6F2' }}>
          23.6%
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, maxWidth: 340, marginTop: '1.5rem' }}>
          of ophthalmologists graduating since 2016 have changed practices at least once. The rate is rising with each successive graduating class.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'rgba(255,255,255,0.1)', border: darkBorder, marginTop: '4rem' }}>
        {[
          { num: 'Rising',  label: 'Job-switching rate in each successive graduating class since 2016' },
          { num: 'Zero',    label: 'Recruiters, surveys, or self-reported data involved in any score' },
        ].map(({ num, label }) => (
          <div key={num} style={{ background: 'rgba(255,255,255,0.07)', padding: '2rem 1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#F7F6F2', letterSpacing: -1 }}>{num}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.5 }}>{label}</div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" style={{ borderBottom: S.hairline, background: '#EDEBE4' }}>
      <div style={{ padding: S.sectionPad }}>
        <div style={{ ...S.label, marginBottom: '3rem' }}>What Atlas shows you</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              style={{
                padding: '2.5rem 0',
                borderTop: S.hairline,
                paddingRight: i % 2 === 0 ? '4rem' : 0,
                paddingLeft:  i % 2 === 1 ? '4rem' : 0,
                borderLeft:   i % 2 === 1 ? S.hairline : undefined,
              }}
            >
              <div style={{ color: S.teal, marginBottom: '1.25rem' }}>{feat.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: S.ink, marginBottom: '0.6rem', letterSpacing: -0.2 }}>{feat.title}</div>
              <p style={{ fontSize: 14, color: S.mid, lineHeight: 1.7 }}>{feat.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ borderBottom: S.hairline }}>
      <div style={{ padding: S.sectionPad }}>
        <div style={{ ...S.label, marginBottom: '3rem' }}>How it works</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: S.hairline }}>
          {HOW_STEPS.map((s, i) => (
            <div
              key={s.step}
              style={{
                padding: '2.5rem 0',
                paddingRight: i < 2 ? '2rem' : 0,
                paddingLeft:  i > 0 ? '2rem' : 0,
                borderRight:  i < 2 ? S.hairline : undefined,
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: S.mid, marginBottom: '1.25rem', opacity: 0.6 }}>{s.step}</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: S.ink, marginBottom: '0.6rem', letterSpacing: -0.2 }}>{s.title}</div>
              <p style={{ fontSize: 13, color: S.mid, lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const darkBorder = '1px solid rgba(255,255,255,0.1)'
  return (
    <section style={{ borderBottom: darkBorder, background: '#1C4A45' }}>
      <div style={{ padding: S.sectionPad, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -0.8, lineHeight: 1.1, maxWidth: 480, color: '#F7F6F2' }}>
          Start your search before<br />
          your first <em style={{ fontStyle: 'italic', color: '#9DB6B0' }}>site visit.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', flexShrink: 0 }}>
          <Link href="https://atlas.matchmed.app/practices" style={{ fontSize: 15, fontWeight: 500, color: '#1C4A45', background: '#F7F6F2', borderRadius: 3, padding: '13px 28px' }}>
            Explore Atlas
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            Free to browse. No subscription required to view practice profiles.
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ padding: '2rem 3rem', borderTop: S.hairline }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: S.mid }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Physician-founded. Data-driven. Built for Ophthalmology.</span>
          <span>© 2026 MatchMed LLC.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/methodology" style={{ color: S.mid }}>Methodology</Link>
          <Link href="/terms" style={{ color: S.mid }}>Terms</Link>
          <Link href="/privacy" style={{ color: S.mid }}>Privacy</Link>
          <Link href="mailto:admin@matchmed.app"                      style={{ color: S.mid }}>Contact</Link>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ background: S.canvas, color: S.ink, fontFamily: 'var(--font-sans)', minHeight: '100vh' }}>
      <Ticker />
      <Nav />
      <Hero />
      <InstitutionStrip />
      <ProblemSection />
      <FindingSection />
      <FeaturesSection />
      <QuoteCarousel />
      <HowItWorksSection />
      <FAQAccordion />
      <CTASection />
      <Footer />
    </div>
  )
}