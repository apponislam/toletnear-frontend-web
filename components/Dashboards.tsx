'use client'

import { useState } from 'react'
import Link from 'next/link'
import { properties, Property } from '@/data'
import PropertyCard from '@/components/PropertyCard'

function Tabs({ tabs, active, setActive }: { tabs: string[]; active: string; setActive: (t: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 3, backgroundColor: '#F1F5F9', borderRadius: 10, padding: 4, marginBottom: 26, width: 'fit-content', flexWrap: 'wrap' }}>
      {tabs.map(t => (
        <button key={t} onClick={() => setActive(t)} style={{ padding: '8px 18px', borderRadius: 7, border: 'none', backgroundColor: active === t ? '#fff' : 'transparent', color: active === t ? '#1A4F9E' : '#6B7280', cursor: 'pointer', fontWeight: active === t ? 600 : 400, fontSize: 14, boxShadow: active === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
          {t}
        </button>
      ))}
    </div>
  )
}

function StatCard({ label, value, icon, note, color = '#EBF2FF', textColor = '#1A4F9E' }: { label: string; value: string; icon: string; note?: string; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 700, color: '#0D1F3C' }}>{value}</div>
          {note && <div style={{ color: '#0DB678', fontSize: 12, marginTop: 5 }}>{note}</div>}
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: textColor }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export function TenantDashboard() {
  const [tab, setTab] = useState('Saved')
  const saved = properties.slice(0, 3)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 24px' }}>Tenant Dashboard</h1>
      <Tabs tabs={['Saved', 'Contacted', 'Messages', 'Profile']} active={tab} setActive={setTab} />

      {tab === 'Saved' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 600, color: '#0D1F3C', margin: 0 }}>Saved Properties ({saved.length})</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
            {saved.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      )}

      {tab === 'Contacted' && (
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 600, color: '#0D1F3C', margin: '0 0 16px' }}>Recently Contacted</h2>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {properties.slice(0, 4).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                <img src={p.image} alt={p.title} style={{ width: 60, height: 46, borderRadius: 8, objectFit: 'cover', backgroundColor: '#E2E8F0', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                  <div style={{ color: '#6B7280', fontSize: 12 }}>{p.location}</div>
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1A4F9E', fontSize: 15, flexShrink: 0 }}>৳{p.rent.toLocaleString()}</div>
                <Link href={`/properties/${p.id}`} style={{ textDecoration: 'none' }}>
                  <button style={{ padding: '6px 14px', borderRadius: 7, border: '1.5px solid #1A4F9E', background: '#EBF2FF', color: '#1A4F9E', cursor: 'pointer', fontSize: 13, fontWeight: 500, flexShrink: 0 }}>View</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Messages' && (
        <div style={{ textAlign: 'center', padding: '64px 24px', backgroundColor: '#fff', borderRadius: 14, border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>💬</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 8px' }}>Your Messages</h3>
          <p style={{ color: '#6B7280', margin: '0 0 18px' }}>View and manage all your property conversations</p>
          <Link href="/messaging" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Open Messaging</button>
          </Link>
        </div>
      )}

      {tab === 'Profile' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '28px', border: '1px solid #E2E8F0', maxWidth: 520 }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 20px' }}>Profile Settings</h3>
          {[['Full Name', 'Farida Khatun'], ['Email', 'farida@example.com'], ['Phone', '01711-234567'], ['City', 'Dhaka']].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
              <input defaultValue={val} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <button style={{ padding: '11px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Save Changes</button>
        </div>
      )}
    </div>
  )
}

export function OwnerDashboard() {
  const [tab, setTab] = useState('Overview')

  const inquiries = [
    { name: 'Aminul Hossain', property: 'Modern 3BR Apartment, Mirpur DOHS', time: '2h ago', status: 'new' },
    { name: 'Sadia Sultana', property: '2BHK in Gulshan 2', time: '5h ago', status: 'replied' },
    { name: 'Karim Ahmed', property: 'Spacious Family House, Uttara', time: '1d ago', status: 'new' },
    { name: 'Nasima Begum', property: 'Premium Sublet, Bashundhara', time: '2d ago', status: 'replied' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: 0 }}>Owner Dashboard</h1>
        <Link href="/post-property" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', borderRadius: 9, border: 'none', backgroundColor: '#0DB678', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            + Add Property
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Properties" value="4" icon="🏠" note="+1 this month" />
        <StatCard label="Active Listings" value="3" icon="✅" note="1 pending review" color="#DCFCE7" textColor="#16A34A" />
        <StatCard label="Total Views" value="1,247" icon="👁" note="+234 this week" color="#FEF3C7" textColor="#D97706" />
        <StatCard label="Inquiries" value="28" icon="📩" note="8 unread" color="#FEE2E2" textColor="#DC2626" />
      </div>

      <Tabs tabs={['Overview', 'Properties', 'Inquiries', 'Messages']} active={tab} setActive={setTab} />

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>Recent Inquiries</span>
              <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', fontSize: 12, fontWeight: 700, padding: '2px 9px', borderRadius: 12 }}>8 Unread</span>
            </div>
            {inquiries.map((inq, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1A4F9E', fontSize: 15, flexShrink: 0 }}>{inq.name.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{inq.name}</div>
                  <div style={{ color: '#6B7280', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.property}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 3 }}>{inq.time}</div>
                  <span style={{ backgroundColor: inq.status === 'new' ? '#DCFCE7' : '#F3F4F6', color: inq.status === 'new' ? '#16A34A' : '#6B7280', fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 10 }}>{inq.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', padding: '20px' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, color: '#0D1F3C', margin: '0 0 16px' }}>Quick Actions</h3>
            {[
              { label: 'Post New Property', href: '/post-property', icon: '➕', bg: '#DCFCE7', color: '#16A34A' },
              { label: 'View Messages', href: '/messaging', icon: '💬', bg: '#EBF2FF', color: '#1A4F9E' },
              { label: 'View All Properties', href: '/properties', icon: '🏠', bg: '#F3F4F6', color: '#374151' },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 9, border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', cursor: 'pointer', marginBottom: 8, fontSize: 14, color: '#374151', textAlign: 'left', transition: 'background 0.15s' }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: a.bg, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{a.icon}</span>
                  {a.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tab === 'Properties' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>My Properties (4)</span>
            <Link href="/post-property" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '7px 16px', borderRadius: 7, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>+ Add New</button>
            </Link>
          </div>
          {properties.slice(0, 4).map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
              <img src={p.image} alt={p.title} style={{ width: 66, height: 50, borderRadius: 8, objectFit: 'cover', backgroundColor: '#E2E8F0', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{p.location} · ৳{p.rent.toLocaleString()}/mo</div>
              </div>
              <span style={{ backgroundColor: i === 2 ? '#FEF3C7' : '#DCFCE7', color: i === 2 ? '#D97706' : '#16A34A', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 12, flexShrink: 0 }}>{i === 2 ? 'Pending' : 'Active'}</span>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: 13 }}>Edit</button>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#EF4444', cursor: 'pointer', fontSize: 13 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Inquiries' && (
        <div style={{ textAlign: 'center', padding: '64px 24px', backgroundColor: '#fff', borderRadius: 14, border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>📩</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: '0 0 8px' }}>28 Total Inquiries</h3>
          <p style={{ color: '#6B7280', margin: '0 0 18px' }}>8 new messages waiting for your response</p>
          <Link href="/messaging" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>View Messages</button>
          </Link>
        </div>
      )}

      {tab === 'Messages' && (
        <div style={{ textAlign: 'center', padding: '64px 24px', backgroundColor: '#fff', borderRadius: 14, border: '1px solid #E2E8F0' }}>
          <Link href="/messaging" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '13px 30px', borderRadius: 8, border: 'none', backgroundColor: '#1A4F9E', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Open Messaging Center</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export function AdminDashboard() {
  const [tab, setTab] = useState('Overview')

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: '#0D1F3C', margin: '0 0 26px' }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Users" value="12,450" icon="👥" />
        <StatCard label="Total Properties" value="8,320" icon="🏠" color="#DCFCE7" textColor="#16A34A" />
        <StatCard label="Pending Approval" value="47" icon="⏳" color="#FEF3C7" textColor="#D97706" />
        <StatCard label="Reports" value="12" icon="🚩" color="#FEE2E2" textColor="#DC2626" />
      </div>

      <Tabs tabs={['Overview', 'Properties', 'Users', 'Reports']} active={tab} setActive={setTab} />

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>Pending Approvals</span>
              <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', fontSize: 12, fontWeight: 700, padding: '2px 9px', borderRadius: 12 }}>47</span>
            </div>
            {properties.slice(0, 4).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                <img src={p.image} alt="" style={{ width: 50, height: 38, borderRadius: 6, objectFit: 'cover', backgroundColor: '#E2E8F0', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                  <div style={{ color: '#6B7280', fontSize: 11 }}>{p.owner.name}</div>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', backgroundColor: '#DCFCE7', color: '#16A34A', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>✓ Approve</button>
                  <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', backgroundColor: '#FEE2E2', color: '#DC2626', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>✕ Reject</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>Recent Registrations</span>
            </div>
            {[
              { name: 'Md. Rafiqul Islam', role: 'Property Owner', time: '1h ago', city: 'Dhaka' },
              { name: 'Sadia Rahman', role: 'Tenant', time: '3h ago', city: 'Chattogram' },
              { name: 'Jahangir Alam', role: 'Agent', time: '5h ago', city: 'Sylhet' },
              { name: 'Nasrin Begum', role: 'Tenant', time: '8h ago', city: 'Dhaka' },
            ].map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1A4F9E', fontSize: 14, flexShrink: 0 }}>{u.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>{u.name}</div>
                  <div style={{ color: '#6B7280', fontSize: 11 }}>{u.role} · {u.city}</div>
                </div>
                <div style={{ color: '#9CA3AF', fontSize: 11 }}>{u.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Properties' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>All Properties (8,320)</span>
            <input placeholder="Search properties..." style={{ padding: '7px 12px', borderRadius: 7, border: '1.5px solid #E2E8F0', fontSize: 13, outline: 'none', width: 200 }} />
          </div>
          {properties.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: i < properties.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <img src={p.image} alt="" style={{ width: 58, height: 44, borderRadius: 7, objectFit: 'cover', backgroundColor: '#E2E8F0', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>{p.title}</div>
                <div style={{ color: '#6B7280', fontSize: 11 }}>{p.location} · {p.owner.name}</div>
              </div>
              <span style={{ backgroundColor: p.verified ? '#DCFCE7' : '#FEF3C7', color: p.verified ? '#16A34A' : '#D97706', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, flexShrink: 0 }}>{p.verified ? 'Verified' : 'Pending'}</span>
              <div style={{ display: 'flex', gap: 5 }}>
                <Link href={`/properties/${p.id}`} style={{ textDecoration: 'none' }}>
                  <button style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: 12 }}>View</button>
                </Link>
                <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', backgroundColor: '#FEE2E2', color: '#DC2626', cursor: 'pointer', fontSize: 12 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Users' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>User Management (12,450)</span>
          </div>
          {[
            { name: 'Md. Rafiqul Islam', email: 'rafiqul@example.com', role: 'Property Owner', city: 'Dhaka', status: 'Active', props: 4 },
            { name: 'Farida Khatun', email: 'farida@example.com', role: 'Tenant', city: 'Dhaka', status: 'Active', props: 0 },
            { name: 'Jahangir Hossain', email: 'jahangir@example.com', role: 'Property Owner', city: 'Sylhet', status: 'Suspended', props: 2 },
            { name: 'Sadia Rahman', email: 'sadia@example.com', role: 'Agent', city: 'Chattogram', status: 'Active', props: 7 },
          ].map((u, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1A4F9E', fontSize: 14, flexShrink: 0 }}>{u.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{u.name}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{u.email} · {u.role} · {u.city}</div>
              </div>
              <span style={{ backgroundColor: u.status === 'Active' ? '#DCFCE7' : '#FEE2E2', color: u.status === 'Active' ? '#16A34A' : '#DC2626', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 12, flexShrink: 0 }}>{u.status}</span>
              <div style={{ display: 'flex', gap: 5 }}>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: 12 }}>View</button>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: 'none', backgroundColor: u.status === 'Active' ? '#FEE2E2' : '#DCFCE7', color: u.status === 'Active' ? '#DC2626' : '#16A34A', cursor: 'pointer', fontSize: 12 }}>{u.status === 'Active' ? 'Suspend' : 'Activate'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Reports' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 16, color: '#0D1F3C' }}>Reported Content (12)</span>
          </div>
          {[
            { title: 'Fake listing in Dhanmondi', type: 'Property', reporter: 'Aminul Islam', reason: 'Fraudulent listing', date: '2024-01-18' },
            { title: 'User posting duplicate ads', type: 'User', reporter: 'Farhan Ahmed', reason: 'Spam activity', date: '2024-01-17' },
            { title: 'Misleading price in Uttara', type: 'Property', reporter: 'Sadia Begum', reason: 'Wrong information', date: '2024-01-16' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🚩</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{r.title}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>By {r.reporter} · {r.reason} · {r.date}</div>
              </div>
              <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 12, flexShrink: 0 }}>{r.type}</span>
              <div style={{ display: 'flex', gap: 5 }}>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: 'none', backgroundColor: '#FEE2E2', color: '#DC2626', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Remove</button>
                <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: 12 }}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
