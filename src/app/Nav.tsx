'use client'

import Link from 'next/link'
import { useState } from 'react'

const S = {
  hairline: '1px solid rgba(20,18,16,0.10)',
  ink:      '#141210',
  mid:      '#8A8680',
  canvas:   '#F7F6F2',
}

const NAV_LINKS = [
  ['Features', '#features'],
  ['Testimonials', '#testimonials'],
  ['Process', '#how-it-works'],
  ['FAQs', '#faqs'],
  ['Methodology', '/methodology'],
] as const

function NavLogo() {
  return (
    <Link href="/" className="landing-nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" aria-label="Atlas compass mark">
        <circle cx="50" cy="50" r="47" stroke="#1C4A45" strokeWidth="1.4"/>
        <polygon points="50,8 57,43 92,50 57,57 50,92 43,57 8,50 43,43" fill="#1C4A45"/>
        <circle cx="50" cy="50" r="4.4" fill="#F7F6F2"/>
      </svg>
      <span style={{ width: 1, height: 32, background: 'rgba(20,18,16,0.12)', display: 'block' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span className="landing-wordmark-main" style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 0.8,
          color: '#1C4A45',
          letterSpacing: '-0.01em',
        }}>
          Atlas
        </span>
        <span className="landing-wordmark-sub" style={{
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

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="landing-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: S.hairline }}>
        <NavLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="landing-nav-links">
            {NAV_LINKS.map(([label, href]) => (
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
          <button
            type="button"
            className="landing-nav-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {menuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" />
              ) : (
                <>
                  <path d="M2 5h14M2 9h14M2 13h14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div className={`landing-nav-mobile-panel${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(([label, href]) => (
          <Link key={label} href={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
        <Link href="https://atlas.matchmed.app" onClick={closeMenu}>
          Open Atlas
        </Link>
      </div>
    </>
  )
}
