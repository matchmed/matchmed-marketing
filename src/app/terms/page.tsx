// src/app/terms/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Atlas by MatchMed',
}

const SECTIONS = [
  { num: '01', title: 'Introduction', content: 'These Terms of Service govern your access and use of matchmed.app and our MatchMed platform (the "Service") operated by MatchMed, LLC. By using the Service, you agree to be bound by these Terms, including our Privacy Policy. PLEASE READ CAREFULLY. BY ACCESSING THE SERVICE, YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD THESE TERMS.' },
  { num: '02', title: 'Eligibility', content: 'Our services are available to licensed physicians, medical professionals, physicians in post-graduate training, and entities lawfully authorized to employ physicians. Users must be at least 18 years of age and legally capable of entering into binding agreements.' },
  { num: '03', title: 'CCPA Compliance', content: 'California residents have rights under the CCPA, including the right to know, access, delete, and opt-out of the sale of personal information. See our Privacy Policy for details on exercising these rights.' },
  { num: '04', title: 'Facilitating Engagements', content: 'MatchMed operates Atlas, an ophthalmology workforce intelligence platform. The Service acts as a platform to facilitate connections between medical professionals and potential employers or industry partners. The Service does not provide physician or medical services and is not engaged in regulated employment or placement activities. Nothing under these Terms creates an employment relationship between the Service and any user.' },
  { num: '4A', title: 'Atlas scores and practice intelligence', content: 'Scores are derived exclusively from publicly available datasets, including Medicare Part B Provider Data published by CMS. Scores are historical and observational, not real-time. They are for informational purposes only and should not be used as the sole basis for employment or contracting decisions. Scores do not measure clinical quality, patient outcomes, compensation, or workplace culture. Specific component weights are proprietary trade secrets of MatchMed, LLC.' },
  { num: '05', title: 'Data processing and storage', content: 'By using our Service, you consent to the processing of your personal information in the United States. We may engage third-party service providers to process your personal data subject to confidentiality obligations.' },
  { num: '06', title: 'Subscriptions', content: 'Some parts of Service are billed on a subscription basis. Subscriptions auto-renew unless cancelled before the next billing cycle. Valid payment information is required. Should automatic billing fail, we will issue an electronic invoice.' },
  { num: '07', title: 'Communications and consent', content: 'By creating an account, we may send newsletters and service-related communications. Text message consent is collected separately at registration and is not a condition of account creation. You may opt out of text messages at any time by texting STOP. Industry partner communications require separate opt-in and may be withdrawn by contacting admin@matchmed.app.' },
  { num: '14', title: 'Prohibited uses', content: 'You may not use the Service in violation of any law, engage in hateful or harassing conduct, transmit spam, impersonate MatchMed or other users, or use automated means to access the Service. You may not introduce viruses or attempt to gain unauthorized access to any part of the Service.' },
  { num: '15', title: 'Accounts', content: 'You must be 18 or older to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.' },
  { num: '16', title: 'Intellectual property', content: 'The Service and its content remain the exclusive property of MatchMed and its licensors. You receive a limited, non-exclusive, non-transferable, revocable license to access and use the Service solely for personal, non-commercial use.' },
  { num: '22', title: 'Disclaimer of warranty', content: 'THESE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. MATCHMED MAKES NO WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.' },
  { num: '23', title: 'Limitation of liability', content: 'EXCEPT AS PROHIBITED BY LAW, MATCHMED WILL NOT BE LIABLE FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE. IF LIABILITY IS FOUND, IT WILL BE LIMITED TO THE AMOUNT PAID FOR SERVICES IN THE 12 MONTHS PRECEDING THE CLAIM.' },
  { num: '24', title: 'No class actions', content: 'YOU AND MATCHMED AGREE THAT EACH MAY BRING CLAIMS ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS ACTION. BOTH PARTIES WAIVE THE RIGHT TO A TRIAL BY JURY.' },
  { num: '24A', title: 'Dispute resolution and binding arbitration', content: 'Except for small claims court disputes, all disputes shall be resolved through final and binding arbitration under AAA Commercial Arbitration Rules. Before initiating arbitration, parties must attempt informal resolution for 30 days. Arbitration conducted in Wilmington, Delaware or via videoconference.' },
  { num: '24B', title: 'Indemnification', content: 'You agree to defend, indemnify, and hold harmless MatchMed and its officers, directors, employees, and agents from claims arising from your use of the Service, violation of these Terms, or any misrepresentation you make.' },
  { num: '25', title: 'Termination', content: 'We may terminate or suspend your account immediately, without notice, for breach of these Terms. Sections 4A, 16, 22, 23, 24, 24A, 24B, and 26 survive termination.' },
  { num: '26', title: 'Governing law', content: "These Terms are governed by the laws of the State of Delaware, consistent with MatchMed, LLC's state of incorporation." },
  { num: '32', title: 'Contact us', content: 'Send feedback, comments, or support requests to admin@matchmed.app.' },
]

const S = {
  hairline: '1px solid rgba(20,18,16,0.10)',
  teal:     '#1C4A45',
  ink:      '#141210',
  mid:      '#8A8680',
  canvas:   '#F7F6F2',
}

export default function TermsPage() {
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
          MatchMed, LLC
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, color: S.ink, marginBottom: '0.75rem' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: S.mid, marginBottom: '3rem' }}>Effective Date: March 30, 2026</p>

        <div style={{ borderLeft: '2px solid #1C4A45', paddingLeft: '1.25rem', marginBottom: '3rem' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.teal, marginBottom: 4 }}>Questions?</div>
          <p style={{ fontSize: 14, color: S.mid }}>
            Contact <a href="mailto:admin@matchmed.app" style={{ color: S.teal, textDecoration: 'none' }}>admin@matchmed.app</a>
          </p>
        </div>

        {SECTIONS.map((s) => (
          <section key={s.num} id={`s${s.num}`}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 10, fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: S.mid,
              margin: '2.5rem 0 0.75rem',
              paddingBottom: '0.75rem',
              borderBottom: S.hairline,
            }}>
              <span style={{ color: S.teal, fontWeight: 600 }}>{s.num}</span>
              {s.title}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: S.mid }}>{s.content}</p>
          </section>
        ))}
      </div>

      <footer style={{ padding: '2rem 3rem', borderTop: S.hairline, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: S.mid }}>
        <span>© 2026 MatchMed LLC.</span>
        <Link href="/" style={{ color: S.mid, textDecoration: 'none' }}>Back to home</Link>
      </footer>
    </div>
  )
}
