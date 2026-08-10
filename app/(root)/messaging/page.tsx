'use client'

import { useState } from 'react'
import Link from 'next/link'

const CONVS = [
  { id: '1', name: 'Aminul Hossain', property: 'Modern 3BR Apartment, Mirpur DOHS', time: '2:34 PM', lastMsg: 'Is the apartment still available?', unread: 2, online: true, avatar: 'AH', color: '#1A4F9E' },
  { id: '2', name: 'Sadia Rahman', property: '2BHK in Gulshan 2', time: '11:20 AM', lastMsg: 'When can I schedule a visit?', unread: 0, online: false, avatar: 'SR', color: '#7C3AED' },
  { id: '3', name: 'Md. Karim', property: 'Spacious Family House, Uttara', time: 'Yesterday', lastMsg: 'Thank you for the information!', unread: 0, online: true, avatar: 'MK', color: '#059669' },
  { id: '4', name: 'Nasima Begum', property: 'Premium Sublet, Bashundhara', time: 'Mon', lastMsg: 'What utilities are included?', unread: 1, online: false, avatar: 'NB', color: '#D97706' },
]

const INIT_MSGS = [
  { id: '1', from: 'them' as const, text: 'Hello! Is the Modern 3 Bedroom Apartment in Mirpur DOHS still available for rent?', time: '2:20 PM' },
  { id: '2', from: 'me' as const, text: "Yes, it's still available! The property is ready from February 1st, 2024.", time: '2:24 PM' },
  { id: '3', from: 'them' as const, text: 'Great! Can I schedule a visit this weekend? Also, is negotiation possible on the rent?', time: '2:28 PM' },
  { id: '4', from: 'me' as const, text: 'You can visit this Saturday at 11 AM. The rent is fixed at ৳25,000 but we can discuss the advance payment.', time: '2:31 PM' },
  { id: '5', from: 'them' as const, text: 'Is the apartment still available?', time: '2:34 PM' },
]

export default function MessagingPage() {
  const [activeConv, setActiveConv] = useState(CONVS[0])
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(INIT_MSGS)

  const send = () => {
    if (!newMsg.trim()) return
    setMessages(m => [...m, { id: Date.now().toString(), from: 'me' as const, text: newMsg, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }])
    setNewMsg('')
  }

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', backgroundColor: '#F4F7FC' }}>
      {/* Sidebar */}
      <div style={{ width: 320, flexShrink: 0, backgroundColor: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: '#0D1F3C', margin: 0 }}>Messages</h2>
            <Link href="/" style={{ textDecoration: 'none', color: '#6B7280', fontSize: 13 }}>← Back</Link>
          </div>
          <input placeholder="Search conversations..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ overflow: 'auto', flex: 1 }}>
          {CONVS.map(conv => (
            <button key={conv.id} onClick={() => setActiveConv(conv)} style={{ width: '100%', display: 'flex', gap: 12, padding: '14px 20px', borderBottom: '1px solid #F1F5F9', border: 'none', background: conv.id === activeConv.id ? '#F0F5FF' : '#fff', cursor: 'pointer', textAlign: 'left', borderLeft: `3px solid ${conv.id === activeConv.id ? '#1A4F9E' : 'transparent'}`, transition: 'all 0.1s' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: conv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14 }}>{conv.avatar}</div>
                <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', backgroundColor: conv.online ? '#0DB678' : '#D1D5DB', border: '2px solid #fff' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{conv.name}</span>
                  <span style={{ color: '#9CA3AF', fontSize: 11 }}>{conv.time}</span>
                </div>
                <div style={{ color: '#64748B', fontSize: 12, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.property}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 155 }}>{conv.lastMsg}</span>
                  {conv.unread > 0 && <span style={{ backgroundColor: '#1A4F9E', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 4px' }}>{conv.unread}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '14px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: activeConv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14 }}>{activeConv.avatar}</div>
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', backgroundColor: activeConv.online ? '#0DB678' : '#D1D5DB', border: '2px solid #fff' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0D1F3C', fontSize: 15 }}>{activeConv.name}</div>
            <div style={{ color: activeConv.online ? '#0DB678' : '#9CA3AF', fontSize: 12 }}>{activeConv.online ? 'Online' : 'Offline'}</div>
          </div>
          <div style={{ marginLeft: 'auto', backgroundColor: '#F0F5FF', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#1A4F9E', fontWeight: 500, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            🏠 {activeConv.property}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: '#F8FAFC' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '65%', padding: '11px 15px', borderRadius: msg.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', backgroundColor: msg.from === 'me' ? '#1A4F9E' : '#fff', color: msg.from === 'me' ? '#fff' : '#1E293B', fontSize: 14, lineHeight: 1.55, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: msg.from === 'me' ? 'none' : '1px solid #E2E8F0' }}>
                {msg.text}
                <div style={{ fontSize: 11, color: msg.from === 'me' ? 'rgba(255,255,255,0.6)' : '#9CA3AF', marginTop: 5, textAlign: 'right' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ backgroundColor: '#fff', padding: '14px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Type a message... (Enter to send)"
            style={{ flex: 1, padding: '11px 16px', borderRadius: 24, border: '1.5px solid #E2E8F0', fontSize: 14, outline: 'none', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}
          />
          <button onClick={send} disabled={!newMsg.trim()} style={{ padding: '11px 22px', borderRadius: 24, border: 'none', backgroundColor: newMsg.trim() ? '#1A4F9E' : '#E2E8F0', color: newMsg.trim() ? '#fff' : '#9CA3AF', cursor: newMsg.trim() ? 'pointer' : 'default', fontWeight: 600, fontSize: 14, transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            Send
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
