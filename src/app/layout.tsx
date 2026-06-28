// src/app/layout.tsx — updated with Cormorant Garamond added

import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  weight: ['600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atlas by MatchMed — Ophthalmology Workforce Intelligence',
  description:
    'Eight years of Medicare data covering 22,000+ physicians and 6,400+ practices. Know a practice before you commit to it.',
  openGraph: {
    title: 'Atlas by MatchMed',
    description: 'Ophthalmology workforce intelligence built on CMS Medicare data.',
    url: 'https://matchmed.app',
    siteName: 'MatchMed',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
