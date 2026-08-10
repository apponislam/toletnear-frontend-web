'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { properties } from '@/data'
import PropertyCard from '@/components/PropertyCard'

interface Props {
  params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: Props) {
  const { id } = use(params)
  const property = properties.find(p => p.id === id) || properties[0]

  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const similar = properties.filter(p => p.id !== property.id && (p.city === property.city || p.type === property.type)).slice(0, 3)
  const fmt = (n: number) => `৳${n.toLocaleString('en-BD')}`

  const ordinal = (n: number) => {
    if (n === 1) return '1st'
    if (n === 2) return '2nd'
    if (n === 3) return '3rd'
    return `${n}th`
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 22, fontSize: 13, color: '#6B7280', flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#1A4F9E' }}>Home</Link>
        <span>/</span>
        <Link href="/properties" style={{ textDecoration: 'none', color: '#1A4F9E' }}>Properties</Link>
        <span>/</span>
        <span style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{property.title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }} className="lg:grid-cols-[1fr_360px]">
        {/* Left col */}
        <div>
          {/* Gallery */}
          <div style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#E2E8F0', height: 420 }}>
            <img src={property.images[activeImg]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {property.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ width: 86, height: 64, borderRadius: 8, overflow: 'hidden', border: `2.5px solid ${i === activeImg ? '#1A4F9E' : 'transparent'}`, background: '#E2E8F0', cursor: 'pointer', padding: 0, flexShrink: 0, transition: 'border-color 0.15s' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Title */}
          <div style={{ marginTop: 26 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
              {property.verified && <span style={{ backgroundColor: '#DCFCE7', color: '#16A34A', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✓ Verified</span>}
              <span style={{ backgroundColor: '#EBF2FF', color: '#1A4F9E', fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20 }}>{property.type}</span>
              <span style={{ backgroundColor: '#F3F4F6', color: '#6B7280', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>{property.furnished}</span>
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: '#0D1F3C', margin: '0 0 10px', lineHeight: 1.2 }}>{property.title}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6B7280', fontSize: 15, margin: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {property.location}
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, backgroundColor: '#F8FAFC', borderRadius: 14, padding: '18px', marginTop: 22, marginBottom: 26 }}>
              {[
                { label: 'Bedrooms', value: property.beds > 0 ? `${property.beds} Beds` : 'N/A', icon: '🛏' },
                { label: 'Bathrooms', value: `${property.baths} Baths`, icon: '🚿' },
                { label: 'Area', value: `${property.sqft.toLocaleString()} sqft`, icon: '📐' },
                { label: 'Floor', value: ordinal(property.floor), icon: '🏢' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, marginBottom: 5 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{s.value}</div>
                  <div style={{ color: '#9CA3AF', fontSize: 12, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 26 }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 12px' }}>Description</h3>
              <p style={{ color: '#374151', lineHeight: 1.75, fontSize: 15, margin: 0 }}>{property.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 26 }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 14px' }}>Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {property.amenities.map(a => (
                  <span key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 24, backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', fontSize: 13, fontWeight: 500 }}>
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 12px' }}>Location</h3>
              <div style={{ backgroundColor: '#E8EDF5', borderRadius: 14, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #CBD5E1', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px)' }} />
                <div style={{ textAlign: 'center', position: 'relative', backgroundColor: 'rgba(255,255,255,0.9)', padding: '16px 24px', borderRadius: 12 }}>
                  <div style={{ fontSize: 32, marginBottom: 6 }}>📍</div>
                  <div style={{ fontWeight: 600, color: '#374151', fontSize: 15 }}>{property.location}</div>
                  <div style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }}>Map integration available on request</div>
                </div>
              </div>
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 16px' }}>Similar Properties</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                  {similar.map(p => <PropertyCard key={p.id} property={p} />)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, color: '#1A4F9E' }}>{fmt(property.rent)}</div>
              <div style={{ color: '#6B7280', fontSize: 14 }}>per month</div>
            </div>

            {/* Owner card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '14px', backgroundColor: '#F8FAFC', borderRadius: 10 }}>
              <img src={property.owner.image} alt={property.owner.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#E2E8F0', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 15 }}>{property.owner.name}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{property.owner.role}</div>
                {property.owner.verified && <span style={{ color: '#0DB678', fontSize: 11, fontWeight: 600 }}>✓ Verified</span>}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button onClick={() => setContactOpen(true)} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Owner
              </button>
              <Link href="/messaging" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '13px', borderRadius: 10, border: '1.5px solid #1A4F9E', backgroundColor: '#EBF2FF', color: '#1A4F9E', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  💬 Send Message
                </button>
              </Link>
              <button onClick={() => setSaved(!saved)} style={{ width: '100%', padding: '13px', borderRadius: 10, border: `1.5px solid ${saved ? '#EF4444' : '#E2E8F0'}`, backgroundColor: saved ? '#FEF2F2' : '#fff', color: saved ? '#EF4444' : '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                {saved ? '❤️ Saved' : '🤍 Save Property'}
              </button>
            </div>

            {/* Meta */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, marginBottom: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Available', property.available], ['Floor', ordinal(property.floor)], ['Furnished', property.furnished], ['City', property.city]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: '#9CA3AF', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>{k}</div>
                    <div style={{ color: '#1E293B', fontSize: 13, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <button style={{ width: '100%', padding: '9px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', color: '#9CA3AF', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              🚩 Report this listing
            </button>
          </div>
        </div>
      </div>

      {/* Contact modal */}
      {contactOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setContactOpen(false)}>
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '32px', maxWidth: 400, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>Owner Contact</h3>
            <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 20px' }}>Direct contact details for this property</p>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 15, marginBottom: 4 }}>{property.owner.name}</div>
              <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 10 }}>{property.owner.role} {property.owner.verified ? '✓ Verified' : ''}</div>
              <a href={`tel:${property.owner.phone}`} style={{ color: '#1A4F9E', fontSize: 16, fontWeight: 700, textDecoration: 'none', fontFamily: 'Outfit, sans-serif' }}>📞 {property.owner.phone}</a>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setContactOpen(false)} style={{ flex: 1, padding: '11px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Close</button>
              <Link href="/messaging" style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: '#1A4F9E', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Message</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
