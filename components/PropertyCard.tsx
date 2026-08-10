'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Property } from '../data'

interface Props {
  property: Property
  onClick?: (p: Property) => void
  view?: 'grid' | 'list'
}

const Bed = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
const Bath = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/></svg>
const Area = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
const Pin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>

export default function PropertyCard({ property, onClick, view = 'grid' }: Props) {
  const [saved, setSaved] = useState(false)
  const fmt = (n: number) => `৳${n.toLocaleString('en-BD')}`

  const CardContent = (
    <>
      {view === 'list' ? (
        <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }} className="hover:shadow-lg">
          <div style={{ width: 220, flexShrink: 0, position: 'relative', backgroundColor: '#E2E8F0' }}>
            <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {property.verified && <span style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#0DB678', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>✓ Verified</span>}
          </div>
          <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: 0 }}>{property.title}</h3>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A4F9E', whiteSpace: 'nowrap' }}>{fmt(property.rent)}<span style={{ fontSize: 12, fontWeight: 400, color: '#9CA3AF' }}>/mo</span></span>
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6B7280', fontSize: 13, margin: '6px 0 0' }}><Pin /> {property.location}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
              {property.beds > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#374151', fontSize: 13 }}><Bed /> {property.beds} Beds</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#374151', fontSize: 13 }}><Bath /> {property.baths} Baths</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#374151', fontSize: 13 }}><Area /> {property.sqft.toLocaleString()} sqft</span>
              <span style={{ marginLeft: 'auto', backgroundColor: '#EBF2FF', color: '#1A4F9E', fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20 }}>{property.type}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:shadow-xl hover:-translate-y-0.5">
          <div style={{ position: 'relative', backgroundColor: '#E2E8F0', height: 200 }}>
            <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
              {property.verified && <span style={{ backgroundColor: '#0DB678', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>✓ Verified</span>}
              <span style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, padding: '3px 9px', borderRadius: 20 }}>{property.type}</span>
            </div>
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? '#EF4444' : 'none'} stroke={saved ? '#EF4444' : '#6B7280'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
          <div style={{ padding: '14px 16px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', margin: '0 0 6px', lineHeight: 1.4 }}>{property.title}</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6B7280', fontSize: 12, margin: '0 0 10px' }}><Pin /> {property.location}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
              {property.beds > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12 }}><Bed /> {property.beds}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12 }}><Bath /> {property.baths}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12 }}><Area /> {property.sqft.toLocaleString()}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 700, color: '#1A4F9E' }}>{fmt(property.rent)}<span style={{ fontSize: 11, fontWeight: 400, color: '#9CA3AF' }}>/mo</span></span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  if (onClick) {
    return <div onClick={() => onClick(property)}>{CardContent}</div>
  }

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      {CardContent}
    </Link>
  )
}
