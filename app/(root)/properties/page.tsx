'use client'

import { useState, useMemo } from 'react'
import { properties } from '@/data'
import PropertyCard from '@/components/PropertyCard'

const TYPES = ['Apartment', 'Family House', 'Bachelor Room', 'Sublet', 'Office', 'Shop', 'Commercial Space']

export default function PropertiesPage() {
  const [filters, setFilters] = useState({ location: '', type: '', rentMin: '', rentMax: '', beds: '', furnished: '', sortBy: 'newest' })
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase()) && !p.city.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.type && p.type !== filters.type) return false
      if (filters.rentMin && p.rent < parseInt(filters.rentMin)) return false
      if (filters.rentMax && p.rent > parseInt(filters.rentMax)) return false
      if (filters.beds && p.beds < parseInt(filters.beds)) return false
      if (filters.furnished && p.furnished !== filters.furnished) return false
      return true
    }).sort((a, b) => {
      if (filters.sortBy === 'rent-asc') return a.rent - b.rent
      if (filters.sortBy === 'rent-desc') return b.rent - a.rent
      return parseInt(b.id) - parseInt(a.id)
    })
  }, [filters])

  const clearFilters = () => setFilters({ location: '', type: '', rentMin: '', rentMax: '', beds: '', furnished: '', sortBy: 'newest' })
  const hasFilters = !!(filters.location || filters.type || filters.rentMin || filters.rentMax || filters.beds || filters.furnished)

  const sel = (key: string, val: string) => setFilters(f => ({ ...f, [key]: val }))

  const inputStyle = { padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', color: '#374151', backgroundColor: '#fff' } as const

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 700, color: '#0D1F3C', margin: '0 0 4px' }}>Rental Properties in Bangladesh</h1>
        <p style={{ color: '#64748B', margin: 0 }}>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</p>
      </div>

      {/* Main filter bar */}
      <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 14, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <input placeholder="Search location, area, city..." value={filters.location} onChange={e => sel('location', e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
        <select value={filters.type} onChange={e => sel('type', e.target.value)} style={inputStyle}>
          <option value="">All Types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filters.furnished} onChange={e => sel('furnished', e.target.value)} style={inputStyle}>
          <option value="">Furnishing</option>
          <option value="Furnished">Furnished</option>
          <option value="Semi-furnished">Semi-furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
        <select value={filters.sortBy} onChange={e => sel('sortBy', e.target.value)} style={inputStyle}>
          <option value="newest">Newest First</option>
          <option value="rent-asc">Rent: Low to High</option>
          <option value="rent-desc">Rent: High to Low</option>
        </select>
        <div style={{ display: 'flex', gap: 5 }}>
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '8px 10px', borderRadius: 7, border: `1.5px solid ${view === v ? '#1A4F9E' : '#E2E8F0'}`, backgroundColor: view === v ? '#EBF2FF' : '#fff', color: view === v ? '#1A4F9E' : '#6B7280', cursor: 'pointer' }}>
              {v === 'grid' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6" strokeLinecap="round" strokeWidth="3"/><line x1="3" y1="12" x2="3.01" y2="12" strokeLinecap="round" strokeWidth="3"/><line x1="3" y1="18" x2="3.01" y2="18" strokeLinecap="round" strokeWidth="3"/></svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="number" placeholder="Min rent (৳)" value={filters.rentMin} onChange={e => sel('rentMin', e.target.value)} style={{ ...inputStyle, width: 148 }} />
        <input type="number" placeholder="Max rent (৳)" value={filters.rentMax} onChange={e => sel('rentMax', e.target.value)} style={{ ...inputStyle, width: 148 }} />
        <select value={filters.beds} onChange={e => sel('beds', e.target.value)} style={inputStyle}>
          <option value="">Any Bedrooms</option>
          {['1', '2', '3', '4'].map(n => <option key={n} value={n}>{n}+ Bed{n !== '1' ? 's' : ''}</option>)}
        </select>
        {hasFilters && (
          <button onClick={clearFilters} style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #FCA5A5', background: '#FEF2F2', color: '#EF4444', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', backgroundColor: '#fff', borderRadius: 16, border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🏠</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 700, color: '#0D1F3C', margin: '0 0 8px' }}>No properties found</h3>
          <p style={{ color: '#6B7280', margin: '0 0 20px' }}>Try adjusting your filters to see more results</p>
          <button onClick={clearFilters} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Clear All Filters</button>
        </div>
      ) : (
        <div style={view === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 } : { display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(p => <PropertyCard key={p.id} property={p} view={view} />)}
        </div>
      )}
    </div>
  )
}
