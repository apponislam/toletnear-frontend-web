'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [forgotMode, setForgotMode] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (forgotMode) { setSent(true); return }
    router.push('/tenant-dash')
  }

  if (sent) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>✉️</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 700, color: '#0D1F3C', margin: '0 0 10px' }}>Check Your Email</h2>
        <p style={{ color: '#6B7280', margin: '0 0 24px', lineHeight: 1.6 }}>We sent a password reset link to <strong>{form.email}</strong>. It expires in 30 minutes.</p>
        <button onClick={() => { setForgotMode(false); setSent(false) }} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Back to Login</button>
      </div>
    </div>
  )

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
              {forgotMode ? 'Reset Password' : 'Welcome Back'}
            </h2>
            <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
              {forgotMode ? 'Enter your email to receive a reset link' : 'Sign in to your ToLet account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
              <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@example.com" style={inputStyle} />
            </div>
            {!forgotMode && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Password</label>
                  <button type="button" onClick={() => setForgotMode(true)} style={{ border: 'none', background: 'none', color: '#1A4F9E', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Forgot password?</button>
                </div>
                <input required type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" style={inputStyle} />
              </div>
            )}
            <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>
              {forgotMode ? 'Send Reset Link' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6B7280' }}>
            {forgotMode ? (
              <button onClick={() => setForgotMode(false)} style={{ border: 'none', background: 'none', color: '#1A4F9E', cursor: 'pointer', fontSize: 14 }}>← Back to login</button>
            ) : (
              <span>{"Don't have an account? "}<Link href="/register" style={{ color: '#1A4F9E', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
