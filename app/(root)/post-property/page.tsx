'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AMENITIES = ['Generator', 'Lift', 'Parking', 'CCTV', 'Security Guard', 'WiFi', 'Rooftop', 'Gas', 'Water Supply', 'Swimming Pool', 'Gym', 'High-speed Internet']
const TYPES = ['Apartment', 'Family House', 'Bachelor Room', 'Sublet', 'Office', 'Shop', 'Commercial Space']
const AREAS = ['Mirpur', 'Gulshan', 'Dhanmondi', 'Uttara', 'Bashundhara', 'Mohammadpur', 'Banani', 'Chattogram', 'Sylhet', 'Rajshahi']
const STEP_TITLES = ['Basic Info', 'Details', 'Description', 'Photos', 'Contact & Preview']

export default function PostPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '', type: '', location: '', address: '',
    rent: '', beds: '', baths: '', sqft: '', floor: '', available: '',
    description: '', amenities: [] as string[], furnished: '',
    contactName: '', contactPhone: '', contactEmail: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const toggleAmenity = (a: string) => setForm(f => ({
    ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
  }))

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1E293B' } as const
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 } as const

  if (submitted) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: '48px 36px', border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>🎉</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0D1F3C', margin: '0 0 10px' }}>Property Submitted!</h2>
        <p style={{ color: '#6B7280', margin: '0 0 26px', lineHeight: 1.65 }}>Your listing is under review. {"We'll"} notify you within 24–48 hours once {"it's"} approved and live on ToLet.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/owner-dash" style={{ flex: 1, textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '11px', borderRadius: 9, border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: 14 }}>Dashboard</button>
          </Link>
          <button onClick={() => { setSubmitted(false); setStep(1) }} style={{ flex: 1, padding: '11px', borderRadius: 9, border: 'none', background: '#1A4F9E', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Post Another</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 4px' }}>Post Your Property</h1>
      <p style={{ color: '#64748B', margin: '0 0 28px' }}>Fill in the details to list your property on ToLet</p>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        {STEP_TITLES.map((title, i) => {
          const n = i + 1
          const done = n < step
          const active = n === step
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', flex: n < 5 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 33, height: 33, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, backgroundColor: done ? '#0DB678' : active ? '#1A4F9E' : '#E2E8F0', color: done || active ? '#fff' : '#9CA3AF', transition: 'all 0.2s' }}>
                  {done ? '✓' : n}
                </div>
                <span style={{ fontSize: 11, color: active ? '#1A4F9E' : done ? '#0DB678' : '#9CA3AF', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{title}</span>
              </div>
              {n < 5 && <div style={{ flex: 1, height: 2, backgroundColor: done ? '#0DB678' : '#E2E8F0', margin: '0 6px 18px', transition: 'background 0.2s' }} />}
            </div>
          )
        })}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: 0 }}>Basic Information</h3>
            <div>
              <label style={labelStyle}>Property Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g., Modern 3 Bedroom Apartment in Mirpur DOHS" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Property Type *</label>
                <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inputStyle, color: form.type ? '#1E293B' : '#9CA3AF' }}>
                  <option value="">Select type</option>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Area / Location *</label>
                <select value={form.location} onChange={e => set('location', e.target.value)} style={{ ...inputStyle, color: form.location ? '#1E293B' : '#9CA3AF' }}>
                  <option value="">Select area</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Full Address *</label>
              <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="House/Road/Block, Area, District, City" style={inputStyle} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 20px' }}>Property Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Monthly Rent (৳) *', key: 'rent', placeholder: '25000' },
                { label: 'Bedrooms', key: 'beds', placeholder: '3' },
                { label: 'Bathrooms *', key: 'baths', placeholder: '2' },
                { label: 'Property Size (sqft) *', key: 'sqft', placeholder: '1350' },
                { label: 'Floor Number', key: 'floor', placeholder: '5' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type="number" value={(form as any)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Available From *</label>
                <input type="date" value={form.available} onChange={e => set('available', e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: 0 }}>Description & Amenities</h3>
            <div>
              <label style={labelStyle}>Property Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5} placeholder="Describe your property — location advantages, nearby facilities, special features, house rules..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Amenities</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {AMENITIES.map(a => (
                  <button type="button" key={a} onClick={() => toggleAmenity(a)} style={{ padding: '7px 14px', borderRadius: 24, border: `1.5px solid ${form.amenities.includes(a) ? '#1A4F9E' : '#E2E8F0'}`, backgroundColor: form.amenities.includes(a) ? '#EBF2FF' : '#fff', color: form.amenities.includes(a) ? '#1A4F9E' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: form.amenities.includes(a) ? 600 : 400, transition: 'all 0.15s' }}>
                    {form.amenities.includes(a) ? '✓ ' : ''}{a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Furnishing Status *</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Furnished', 'Semi-furnished', 'Unfurnished'].map(f => (
                  <button type="button" key={f} onClick={() => set('furnished', f)} style={{ flex: 1, padding: '10px', borderRadius: 9, border: `2px solid ${form.furnished === f ? '#1A4F9E' : '#E2E8F0'}`, backgroundColor: form.furnished === f ? '#EBF2FF' : '#fff', color: form.furnished === f ? '#1A4F9E' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: form.furnished === f ? 600 : 400, transition: 'all 0.15s' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 6px' }}>Upload Photos</h3>
            <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 20px' }}>Upload high-quality photos to attract more tenants (max 10 photos)</p>
            <div style={{ border: '2.5px dashed #CBD5E1', borderRadius: 14, padding: '52px 24px', textAlign: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📷</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#374151', fontSize: 16, marginBottom: 6 }}>Click to upload or drag & drop</div>
              <div style={{ color: '#9CA3AF', fontSize: 13 }}>PNG, JPG, WEBP up to 10MB each</div>
              <button type="button" style={{ marginTop: 18, padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Browse Files</button>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {['https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=120&h=90&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=120&h=90&fit=crop&auto=format'].map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={img} alt="Property preview" style={{ width: 100, height: 76, borderRadius: 8, objectFit: 'cover', display: 'block' }} />
                  <button type="button" style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', backgroundColor: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: 0 }}>Contact Information</h3>
            {[
              { label: 'Contact Name *', key: 'contactName', placeholder: 'Md. Rafiqul Islam', type: 'text' },
              { label: 'Phone Number *', key: 'contactPhone', placeholder: '01700-000000', type: 'tel' },
              { label: 'Email Address', key: 'contactEmail', placeholder: 'email@example.com', type: 'email' },
            ].map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '16px 18px', border: '1px solid #E2E8F0', marginTop: 6 }}>
              <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700, color: '#374151', margin: '0 0 12px' }}>Listing Preview</h4>
              <div style={{ fontWeight: 600, color: '#0D1F3C', fontSize: 16, marginBottom: 4 }}>{form.title || 'Your Property Title'}</div>
              <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 8 }}>{form.location || 'Area, City'}{form.address ? ` — ${form.address}` : ''}</div>
              <div style={{ display: 'flex', gap: 14, fontSize: 13, color: '#374151', flexWrap: 'wrap' }}>
                <span>৳{form.rent ? parseInt(form.rent).toLocaleString() : '--'}/mo</span>
                {form.beds && <span>{form.beds} Beds</span>}
                {form.baths && <span>{form.baths} Baths</span>}
                {form.sqft && <span>{parseInt(form.sqft).toLocaleString()} sqft</span>}
                {form.furnished && <span>{form.furnished}</span>}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <button onClick={() => step > 1 ? setStep(s => s - 1) : router.push('/')} style={{ padding: '11px 24px', borderRadius: 9, border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 500, fontSize: 14 }}>
            {step === 1 ? '← Cancel' : '← Back'}
          </button>
          <button onClick={() => step < 5 ? setStep(s => s + 1) : setSubmitted(true)} style={{ padding: '11px 26px', borderRadius: 9, border: 'none', background: step === 5 ? '#0DB678' : '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Outfit, sans-serif' }}>
            {step < 5 ? `Next: ${STEP_TITLES[step]} →` : '🚀 Publish Property'}
          </button>
        </div>
      </div>
    </div>
  )
}
