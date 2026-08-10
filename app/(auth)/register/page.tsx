'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '', role: 'tenant' as 'tenant' | 'owner' | 'admin', confirmPassword: '' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.role === 'admin') router.push('/admin-dash')
    else if (form.role === 'owner') router.push('/owner-dash')
    else router.push('/tenant-dash')
  }

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1E293B', transition: 'border-color 0.15s' } as const

  return (
    <div className="w-full">
      <div style={{ padding: '24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* Logo visible on small screens when left panel is hidden */}
          <div className="lg:hidden" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, backgroundColor: '#1A4F9E', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <rect x="9" y="12" width="6" height="10" fill="white" rx="1"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: '#1A4F9E' }}>
              To<span style={{ color: '#0DB678' }}>Let</span>
            </span>
          </div>

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 21, fontWeight: 700, color: '#0D1F3C', margin: '0 0 4px' }}>
            Create Account
          </h2>
          <p style={{ color: '#6B7280', fontSize: 13, margin: 0 }}>
            {"Join Bangladesh's largest rental marketplace"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Full Name</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Md. Rafiqul Islam" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Phone Number</label>
            <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="01700-000000" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>I am a...</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {([['tenant', '🏠 Tenant'], ['owner', '🔑 Owner'], ['admin', '⚙️ Agent']] as const).map(([role, label]) => (
                <button type="button" key={role} onClick={() => setForm(f => ({ ...f, role }))} style={{ padding: '8px 4px', borderRadius: 8, border: `2px solid ${form.role === role ? '#1A4F9E' : '#E2E8F0'}`, backgroundColor: form.role === role ? '#EBF2FF' : '#fff', color: form.role === role ? '#1A4F9E' : '#374151', cursor: 'pointer', fontSize: 12, fontWeight: form.role === role ? 600 : 400 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Email Address</label>
            <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@example.com" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Password</label>
            <input required type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Confirm Password</label>
            <input required type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6B7280' }}>
          Already have an account? <Link href="/login" style={{ color: '#1A4F9E', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
