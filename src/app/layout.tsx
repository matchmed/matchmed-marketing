// src/app/layout.tsx

import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'

const serif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
