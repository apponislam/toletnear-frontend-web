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
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center">
      <div className="text-5xl mb-4">✉️</div>
      <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-2">Check Your Email</h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        We sent a password reset link to <strong className="text-gray-800">{form.email}</strong>. It expires in 30 minutes.
      </p>
      <button 
        onClick={() => { setForgotMode(false); setSent(false) }} 
        className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white font-semibold text-sm cursor-pointer hover:bg-[#153f7e] transition-all"
      >
        Back to Login
      </button>
    </div>
  )

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1E293B', transition: 'border-color 0.15s' } as const

  return (
    <div className="w-full">
      <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '36px', border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* Logo visible on small screens when left panel is hidden */}
          <div className="lg:hidden" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
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

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#0D1F3C', margin: '0 0 6px' }}>
            {forgotMode ? 'Reset Password' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
            {forgotMode ? 'Enter your email to receive a reset link' : 'Sign in to your ToLet account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 14, color: '#6B7280' }}>
          {forgotMode ? (
            <button onClick={() => setForgotMode(false)} style={{ border: 'none', background: 'none', color: '#1A4F9E', cursor: 'pointer', fontSize: 14 }}>← Back to login</button>
          ) : (
            <span>{"Don't have an account? "}<Link href="/register" style={{ color: '#1A4F9E', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></span>
          )}
        </div>
      </div>
    </div>
  )
}
