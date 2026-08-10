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

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1E293B', transition: 'border-color 0.15s' } as const

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F4F7FC' }}>
      <div style={{ maxWidth: 460, width: '100%' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '38px', border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 26, color: '#1A4F9E', marginBottom: 10 }}>
              To<span style={{ color: '#0DB678' }}>Let</span>
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 21, fontWeight: 700, color: '#0D1F3C', margin: '0 0 5px' }}>
              Create Account
            </h2>
            <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
              {"Join Bangladesh's largest rental marketplace"}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Md. Rafiqul Islam" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Phone Number</label>
              <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="01700-000000" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>I am a...</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {([['tenant', '🏠 Tenant'], ['owner', '🔑 Owner'], ['admin', '⚙️ Agent']] as const).map(([role, label]) => (
                  <button type="button" key={role} onClick={() => setForm(f => ({ ...f, role }))} style={{ padding: '10px 6px', borderRadius: 9, border: `2px solid ${form.role === role ? '#1A4F9E' : '#E2E8F0'}`, backgroundColor: form.role === role ? '#EBF2FF' : '#fff', color: form.role === role ? '#1A4F9E' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: form.role === role ? 600 : 400 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
              <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@example.com" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <input required type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Confirm Password</label>
              <input required type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>
              Create Account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6B7280' }}>
            Already have an account? <Link href="/login" style={{ color: '#1A4F9E', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
