'use client'

import { useState } from 'react'
import Link from 'next/link'
import { properties } from '../../data'
import PropertyCard from '../../components/PropertyCard'

const HERO_BG = 'https://images.unsplash.com/photo-1765396576098-6a44270700d1?w=1600&h=900&fit=crop&auto=format'
const LOCATIONS = ['Dhaka', 'Mirpur', 'Uttara', 'Dhanmondi', 'Mohammadpur', 'Bashundhara', 'Chattogram', 'Sylhet']

const CATEGORIES = [
  { name: 'Apartment', icon: '🏢', count: 1240 },
  { name: 'Family House', icon: '🏠', count: 380 },
  { name: 'Bachelor Room', icon: '🛏', count: 520 },
  { name: 'Sublet', icon: '🔑', count: 290 },
  { name: 'Office', icon: '💼', count: 180 },
  { name: 'Shop', icon: '🏪', count: 95 },
  { name: 'Commercial Space', icon: '🏗', count: 67 },
]

const TESTIMONIALS = [
  { name: 'Farida Khatun', role: 'Tenant, Dhaka', text: 'Found my dream apartment in Bashundhara within 3 days. The process was smooth and the owner was genuine. Highly recommend ToLet!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&auto=format' },
  { name: 'Rajib Ahmed', role: 'Property Owner, Chattogram', text: 'Listed my property and received genuine tenant inquiries within hours. The dashboard makes it easy to manage everything from one place.', rating: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format' },
  { name: 'Shahnaz Parvin', role: 'Tenant, Sylhet', text: 'The search filters are incredibly useful. I could narrow down to exactly what I needed — furnished, 2 beds, near city center. Found the perfect place!', rating: 4, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format' },
]

export default function HomePage() {
  const [search, setSearch] = useState({ location: '', type: '', rentMin: '', rentMax: '', beds: '' })
  const featured = properties.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: 580, display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: '#0D1F3C' }}>
        <img src={HERO_BG} alt="Modern apartment building in Bangladesh" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(130deg, rgba(13,31,60,0.95) 0%, rgba(26,79,158,0.72) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '64px 24px', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, backgroundColor: 'rgba(13,182,120,0.18)', border: '1px solid rgba(13,182,120,0.35)', borderRadius: 20, padding: '4px 14px', marginBottom: 20 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#0DB678' }} />
              <span style={{ color: '#0DB678', fontSize: 13, fontWeight: 500 }}>{"Bangladesh's #1 Rental Marketplace"}</span>
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.12, margin: '0 0 18px', letterSpacing: '-1px' }}>
              Find Your Perfect<br />
              <span style={{ color: '#0DB678' }}>Place to Live</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, lineHeight: 1.65, maxWidth: 500, margin: '0 0 36px' }}>
              Discover flats, rooms, houses, and commercial properties for rent across Bangladesh. Verified listings, genuine owners.
            </p>
          </div>

          {/* Search box */}
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '22px 24px', boxShadow: '0 24px 64px rgba(0,0,0,0.32)', maxWidth: 900 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 14 }}>
              {[
                { label: 'Location', key: 'location', opts: LOCATIONS, placeholder: 'All Locations' },
                { label: 'Property Type', key: 'type', opts: CATEGORIES.map(c => c.name), placeholder: 'All Types' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <select value={(search as any)[f.key]} onChange={e => setSearch(s => ({ ...s, [f.key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#374151', backgroundColor: '#F8FAFC', outline: 'none' }}>
                    <option value="">{f.placeholder}</option>
                    {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Min Rent (৳)</label>
                <input type="number" placeholder="0" value={search.rentMin} onChange={e => setSearch(s => ({ ...s, rentMin: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, backgroundColor: '#F8FAFC', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Max Rent (৳)</label>
                <input type="number" placeholder="100,000" value={search.rentMax} onChange={e => setSearch(s => ({ ...s, rentMax: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, backgroundColor: '#F8FAFC', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Bedrooms</label>
                <select value={search.beds} onChange={e => setSearch(s => ({ ...s, beds: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#374151', backgroundColor: '#F8FAFC', outline: 'none' }}>
                  <option value="">Any</option>
                  {['1', '2', '3', '4'].map(n => <option key={n} value={n}>{n}{n === '4' ? '+' : ''} Bed{n !== '1' ? 's' : ''}</option>)}
                </select>
              </div>
            </div>
            <Link href="/properties" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Search Properties
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 30, flexWrap: 'wrap' }}>
            {[['10,000+', 'Active Listings'], ['50,000+', 'Happy Tenants'], ['5,000+', 'Verified Owners']].map(([num, label]) => (
              <div key={label}>
                <div style={{ color: '#0DB678', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22 }}>{num}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 6px' }}>Popular Locations</h2>
        <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 22px' }}>{"Explore rental properties in Bangladesh's most sought-after areas"}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {LOCATIONS.map(loc => (
            <Link key={loc} href="/properties" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '9px 20px', borderRadius: 24, border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }} className="hover:border-blue-400 hover:text-blue-700">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {loc}
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 5px' }}>Featured Properties</h2>
            <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>Hand-picked verified listings for you</p>
          </div>
          <Link href="/properties" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '9px 20px', borderRadius: 8, border: '1.5px solid #1A4F9E', background: '#fff', color: '#1A4F9E', fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>View All →</button>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {featured.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Browse by Type */}
      <section style={{ backgroundColor: '#fff', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 6px', textAlign: 'center' }}>Browse by Property Type</h2>
          <p style={{ color: '#64748B', fontSize: 15, textAlign: 'center', margin: '0 0 32px' }}>Choose the property type that suits your needs</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.name} href="/properties" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '22px 12px', borderRadius: 14, border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }} className="hover:border-blue-400 hover:bg-blue-50">
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{cat.name}</div>
                  <div style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }}>{cat.count.toLocaleString()} listings</div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', textAlign: 'center', margin: '0 0 6px' }}>How It Works</h2>
        <p style={{ color: '#64748B', fontSize: 15, textAlign: 'center', margin: '0 0 40px' }}>Find your next home in three simple steps</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            { step: '01', title: 'Search a Property', desc: 'Use our smart search filters to find properties matching your budget, location, and preferences across Bangladesh.', icon: '🔍' },
            { step: '02', title: 'Contact the Owner', desc: 'Message or call the property owner or agent directly through our secure, verified platform.', icon: '📞' },
            { step: '03', title: 'Move Into Your New Place', desc: 'Schedule a visit, finalize the deal, and move into your perfect new home with confidence.', icon: '🏠' },
          ].map(s => (
            <div key={s.step} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '28px 24px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -8, right: -4, fontFamily: 'Outfit, sans-serif', fontSize: 76, fontWeight: 800, color: '#F0F4FF', lineHeight: 1, pointerEvents: 'none' }}>{s.step}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(130deg, #0D1F3C 0%, #1A4F9E 100%)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }} className="md:grid-cols-[1fr_auto]">
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Have a property for rent?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, margin: '0 0 24px', maxWidth: 520, lineHeight: 1.6 }}>List your property on ToLet and reach thousands of genuine tenants. Verification, messaging, and dashboard included — all free to start.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/post-property" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '12px 28px', borderRadius: 10, border: 'none', backgroundColor: '#0DB678', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>Post Your Property</button>
              </Link>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '12px 28px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.35)', backgroundColor: 'transparent', color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>Learn More</button>
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[['৳0', 'Free to List'], ['48h', 'Fast Approval'], ['24/7', 'Support']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#0DB678' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', textAlign: 'center', margin: '0 0 6px' }}>What Our Users Say</h2>
        <p style={{ color: '#64748B', fontSize: 15, textAlign: 'center', margin: '0 0 36px' }}>Trusted by thousands of tenants and property owners across Bangladesh</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '26px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: i < t.rating ? '#F59E0B' : '#E2E8F0', fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.7, margin: '0 0 18px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={t.image} alt={t.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#E2E8F0' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: '#6B7280', fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
