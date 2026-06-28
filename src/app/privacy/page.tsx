// src/app/privacy/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Atlas by MatchMed',
}

const SECTIONS = [
  { num: '01', title: 'Introduction', content: 'MatchMed, LLC operates matchmed.app and the MatchMed platform. This Privacy Policy explains how we collect, safeguard, and disclose personal information. By using the Service, you agree to the collection and use of information in accordance with this Policy.' },
  { num: '02', title: 'Types of data collected', content: 'We may collect: account and registration information (name, email, phone); professional credentials including NPI, specialty, training status, and preferred locations; profile information such as CV and areas of expertise; preferences including desired positions and career interests; communications when you submit requests; payment information; and cookies and tracking data.' },
  { num: '03', title: 'Purposes of collection', content: 'We use collected information to provide and maintain the Service; verify professional identity using NPI and public registry data; generate and display analytics about ophthalmology practices; facilitate connections between physicians and practices, staffing firms, and industry partners; provide notifications about relevant opportunities; and provide customer support and improve the Service.' },
  { num: '04', title: 'Usage and tracking technologies', content: 'We use cookies, beacons, tags, and other tracking technologies to collect data about your use of the Services. Most browsers allow you to remove or stop accepting cookies. We do not currently respond to Do Not Track signals.' },
  { num: '05', title: 'Communications', content: 'We may send promotional emails; you can unsubscribe at any time. If you opted in at registration, we may send SMS/MMS messages; opt out anytime by texting STOP. Transactional and compliance-related emails are sent regardless of marketing preferences.' },
  { num: '06', title: 'Retention of data', content: 'We retain personal information while your account is active or as needed to provide the Service. Upon a verified deletion request, we will action it within 45 days except where retention is required for legal compliance. Transaction data may be retained for accounting or tax purposes.' },
  { num: '07', title: 'Disclosure of data', content: 'We may disclose personal information where required by law; in the context of a business transaction; to service providers under confidentiality obligations; to fulfill your instructions to share your profile with industry partners (if opted in); or with your consent. Industry partners who receive your information are subject to contractual restrictions on its use. You may withdraw this consent at any time by contacting admin@matchmed.app.' },
  { num: '08', title: 'Security of data', content: 'We strive to use commercially acceptable means to protect your personal information. No method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
  { num: '09', title: 'Your privacy rights', content: 'Regardless of your state of residence, you have the right to know, access, correct, and delete your personal information; opt out of tracking and sales of your personal information; and withdraw consent at any time. To exercise these rights, contact admin@matchmed.app. We will respond within 45 days.' },
  { num: '10', title: 'California Consumer Privacy Act (CCPA)', content: 'California residents have additional rights under the CCPA, including the right to know, access, delete, and opt out of the sale of personal information. We do not sell personal information without explicit consent. Contact admin@matchmed.app to exercise your CCPA rights.' },
  { num: '11', title: 'Eligibility', content: 'Our Services are not intended for individuals under the age of 18. We do not knowingly collect personally identifiable information from minors. Our Services are intended for physicians and healthcare professionals operating in the United States.' },
  { num: '12', title: 'Changes to this privacy policy', content: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new Policy and updating the effective date. Changes are effective when posted.' },
  { num: '13', title: 'Contact us', content: 'If you have any questions about this Privacy Policy, please contact us at admin@matchmed.app.' },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#F7F6F2', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Minimal nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: '1px solid rgba(20,18,16,0.10)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#141210', letterSpacing: -0.3, textDecoration: 'none' }}>
          Atlas
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#8A8680', textDecoration: 'none' }}>
          Back to home
        </Link>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 3rem 6rem' }}>
        {/* Header */}
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8680', marginBottom: '1.5rem' }}>
          MatchMed, LLC
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, color: '#141210', marginBottom: '0.75rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: '#8A8680', marginBottom: '3rem' }}>Effective Date: March 30, 2026</p>

        {/* Contact callout */}
        <div style={{ borderLeft: '2px solid #1C4A45', paddingLeft: '1.25rem', marginBottom: '3rem' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C4A45', marginBottom: 4 }}>Questions?</div>
          <p style={{ fontSize: 14, color: '#8A8680' }}>
            Contact <a href="mailto:admin@matchmed.app" style={{ color: '#1C4A45', textDecoration: 'none' }}>admin@matchmed.app</a>
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((s) => (
          <section key={s.num} id={`p${s.num}`} style={{ marginBottom: '0' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 10, fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#8A8680',
              margin: '2.5rem 0 0.75rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(20,18,16,0.10)',
            }}>
              <span style={{ color: '#1C4A45', fontWeight: 600 }}>{s.num}</span>
              {s.title}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#8A8680' }}>{s.content}</p>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ padding: '2rem 3rem', borderTop: '1px solid rgba(20,18,16,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#8A8680' }}>
        <span>© 2026 MatchMed LLC.</span>
        <Link href="/" style={{ color: '#8A8680', textDecoration: 'none' }}>Back to home</Link>
      </footer>
    </div>
  )
}
