import Navbar from '@/components/Navbar'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FC' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  )
}
