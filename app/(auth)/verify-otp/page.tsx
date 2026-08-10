'use client'

import { useState, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyOtpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pastedData) return
    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)
    const nextFocusIndex = Math.min(pastedData.length, 5)
    otpRefs.current[nextFocusIndex]?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/reset-password')
  }

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
            Verify OTP Code
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
            Enter the 6-digit OTP sent to <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 12, textAlign: 'center' }}>Enter 6-Digit OTP Code</label>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { otpRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  style={{
                    width: 44,
                    height: 50,
                    borderRadius: 10,
                    border: `2px solid ${digit ? '#1A4F9E' : '#E2E8F0'}`,
                    backgroundColor: digit ? '#EBF2FF' : '#fff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#1A4F9E',
                    outline: 'none',
                    transition: 'all 0.15s'
                  }}
                />
              ))}
            </div>
          </div>
          <button 
            type="submit" 
            disabled={otp.join('').length < 6}
            style={{ 
              width: '100%', 
              padding: '13px', 
              borderRadius: 10, 
              border: 'none', 
              backgroundColor: otp.join('').length === 6 ? '#1A4F9E' : '#94A3B8', 
              color: '#fff', 
              fontSize: 15, 
              fontWeight: 700, 
              cursor: otp.join('').length === 6 ? 'pointer' : 'not-allowed', 
              fontFamily: 'Outfit, sans-serif', 
              marginTop: 8 
            }}
          >
            Verify Code
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 14, color: '#6B7280' }}>
          <Link href="/forgot-password" style={{ color: '#1A4F9E', textDecoration: 'none', fontWeight: 500 }}>
            ← Resend or change email
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  )
}
