'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1F3C', color: 'rgba(255,255,255,0.65)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 40, marginBottom: 44 }}>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 14 }}>
              To<span style={{ color: '#0DB678' }}>Let</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, marginBottom: 18, color: 'rgba(255,255,255,0.55)' }}>
              {"Bangladesh's most trusted rental marketplace. Find your perfect place to live or list your property with confidence."}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['FB', 'TW', 'IN', 'YT'].map(s => (
                <div key={s} style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', transition: 'background 0.15s' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Quick Links</h4>
            {[
              ['Home', '/'],
              ['Properties', '/properties'],
              ['Post Property', '/post-property'],
              ['About Us', '/'],
              ['Contact', '/']
            ].map(([label, href]) => (
              <Link key={label} href={href} style={{ display: 'block', border: 'none', background: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, padding: '5px 0', textAlign: 'left', transition: 'color 0.15s', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Property Types</h4>
            {['Apartment', 'Family House', 'Bachelor Room', 'Sublet', 'Office Space', 'Commercial'].map(t => (
              <Link key={t} href="/properties" style={{ display: 'block', border: 'none', background: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, padding: '5px 0', textAlign: 'left', textDecoration: 'none' }}>
                {t}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Popular Areas</h4>
            {['Mirpur, Dhaka', 'Gulshan, Dhaka', 'Uttara, Dhaka', 'Dhanmondi', 'Chattogram', 'Sylhet'].map(l => (
              <Link key={l} href="/properties" style={{ display: 'block', border: 'none', background: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, padding: '5px 0', textAlign: 'left', textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Contact</h4>
            {[
              { icon: '📍', text: 'House 12, Road 3, Dhanmondi, Dhaka 1205' },
              { icon: '📞', text: '+880 1700-123456' },
              { icon: '✉️', text: 'support@tolet.com.bd' },
              { icon: '🕐', text: 'Sat–Thu: 9 AM – 6 PM' },
            ].map(c => (
              <div key={c.icon} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0 }}>{c.icon}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          <span>© 2024 ToLet Bangladesh. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms & Conditions</span>
            <span style={{ cursor: 'pointer' }}>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
