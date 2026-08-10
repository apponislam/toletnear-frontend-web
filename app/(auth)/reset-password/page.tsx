'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1E293B', transition: 'border-color 0.15s' } as const

  if (success) return (
    <div className="w-full text-center py-6">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-2">Password Reset Successful!</h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Your password has been updated successfully. You can now login with your new password.
      </p>
      <Link href="/login" style={{ textDecoration: 'none' }}>
        <button 
          className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white font-semibold text-sm cursor-pointer hover:bg-[#153f7e] transition-all"
        >
          Sign In Now
        </button>
      </Link>
    </div>
  )

  return (
    <div className="w-full">
      <div style={{ padding: '24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* Mobile Logo */}
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
            Set New Password
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
            Create a new secure password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>New Password</label>
            <input required type="password" value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))} placeholder="••••••••" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Repeat New Password</label>
            <input required type="password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="••••••••" style={inputStyle} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}>
            Reset Password
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 14, color: '#6B7280' }}>
          <Link href="/login" style={{ color: '#1A4F9E', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
