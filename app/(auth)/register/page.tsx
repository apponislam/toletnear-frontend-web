'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  role: z.enum(['tenant', 'owner', 'admin']),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phone: '',
      role: 'tenant',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const currentRole = watch('role')

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Register Submitted:', data)
    if (data.role === 'admin') router.push('/admin-dash')
    else if (data.role === 'owner') router.push('/owner-dash')
    else router.push('/tenant-dash')
  }

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '10px 14px',
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
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* Logo Header */}
          <div style={{ marginBottom: 18 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 34, height: 34, backgroundColor: '#1A4F9E', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <rect x="9" y="12" width="6" height="10" fill="white" rx="1"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: '#1A4F9E' }}>
                To<span style={{ color: '#0DB678' }}>Let</span>
              </span>
            </Link>
          </div>

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 21, fontWeight: 700, color: '#0D1F3C', margin: '0 0 4px' }}>
            Create Account
          </h2>
          <p style={{ color: '#6B7280', fontSize: 13, margin: 0 }}>
            {"Join Bangladesh's largest rental marketplace"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Full Name</label>
            <input
              placeholder="Md. Rafiqul Islam"
              style={inputStyle(!!errors.name)}
              {...register('name')}
            />
            {errors.name && <p style={{ color: '#EF4444', fontSize: 11, margin: '3px 0 0' }}>{errors.name.message}</p>}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Phone Number</label>
            <input
              placeholder="01700-000000"
              style={inputStyle(!!errors.phone)}
              {...register('phone')}
            />
            {errors.phone && <p style={{ color: '#EF4444', fontSize: 11, margin: '3px 0 0' }}>{errors.phone.message}</p>}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>I am a...</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {([['tenant', '🏠 Tenant'], ['owner', '🔑 Owner'], ['admin', '⚙️ Agent']] as const).map(([role, label]) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setValue('role', role)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 8,
                    border: `2px solid ${currentRole === role ? '#1A4F9E' : '#E2E8F0'}`,
                    backgroundColor: currentRole === role ? '#EBF2FF' : '#fff',
                    color: currentRole === role ? '#1A4F9E' : '#374151',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: currentRole === role ? 600 : 400,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              style={inputStyle(!!errors.email)}
              {...register('email')}
            />
            {errors.email && <p style={{ color: '#EF4444', fontSize: 11, margin: '3px 0 0' }}>{errors.email.message}</p>}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle(!!errors.password)}
              {...register('password')}
            />
            {errors.password && <p style={{ color: '#EF4444', fontSize: 11, margin: '3px 0 0' }}>{errors.password.message}</p>}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle(!!errors.confirmPassword)}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p style={{ color: '#EF4444', fontSize: 11, margin: '3px 0 0' }}>{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4 }}
          >
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
