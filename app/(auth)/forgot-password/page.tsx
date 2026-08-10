'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotFormValues) => {
    router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`)
  }

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: 9,
    border: `1.5px solid ${hasError ? '#EF4444' : '#E2E8F0'}`,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'Inter, sans-serif',
    color: '#1E293B',
    transition: 'border-color 0.15s',
  })

  return (
    <div className="w-full">
      <div style={{ padding: '24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* Logo Header */}
          <div style={{ marginBottom: 20 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 36, height: 36, backgroundColor: '#1A4F9E', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <rect x="9" y="12" width="6" height="10" fill="white" rx="1"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 24, color: '#1A4F9E', letterSpacing: '-0.5px' }}>
                To<span style={{ color: '#0DB678' }}>Let</span>
              </span>
            </Link>
          </div>

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#0D1F3C', margin: '0 0 6px' }}>
            Forgot Password
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
            Enter your email address to receive verification code
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              style={inputStyle(!!errors.email)}
              {...register('email')}
            />
            {errors.email && (
              <p style={{ color: '#EF4444', fontSize: 12, margin: '4px 0 0' }}>{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}
          >
            Send OTP Code
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
