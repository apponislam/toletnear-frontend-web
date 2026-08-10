'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0D1F3C] text-white/65">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-11">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="font-['Outfit'] font-extrabold text-2xl text-white mb-3.5">
              To<span className="text-[#0DB678]">Let</span>
            </div>
            <p className="text-xs leading-relaxed mb-4 text-white/55">
              {"Bangladesh's most trusted rental marketplace. Find your perfect place to live or list your property with confidence."}
            </p>
            <div className="flex gap-2">
              {['FB', 'TW', 'IN', 'YT'].map(s => (
                <div key={s} className="w-8.5 h-8.5 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer text-xs font-bold text-white/70 hover:bg-white/20 transition-all">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-['Outfit'] font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            {[
              ['Home', '/'],
              ['Properties', '/properties'],
              ['Post Property', '/post-property'],
              ['About Us', '/'],
              ['Contact', '/']
            ].map(([label, href]) => (
              <Link key={label} href={href} className="block text-white/60 hover:text-white text-xs py-1.5 no-underline transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white font-['Outfit'] font-semibold text-sm mb-4 uppercase tracking-wider">Property Types</h4>
            {['Apartment', 'Family House', 'Bachelor Room', 'Sublet', 'Office Space', 'Commercial'].map(t => (
              <Link key={t} href="/properties" className="block text-white/60 hover:text-white text-xs py-1.5 no-underline transition-colors">
                {t}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white font-['Outfit'] font-semibold text-sm mb-4 uppercase tracking-wider">Popular Areas</h4>
            {['Mirpur, Dhaka', 'Gulshan, Dhaka', 'Uttara, Dhaka', 'Dhanmondi', 'Chattogram', 'Sylhet'].map(l => (
              <Link key={l} href="/properties" className="block text-white/60 hover:text-white text-xs py-1.5 no-underline transition-colors">
                {l}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white font-['Outfit'] font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            {[
              { icon: '📍', text: 'House 12, Road 3, Dhanmondi, Dhaka 1205' },
              { icon: '📞', text: '+880 1700-123456' },
              { icon: '✉️', text: 'support@tolet.com.bd' },
              { icon: '🕐', text: 'Sat–Thu: 9 AM – 6 PM' },
            ].map(c => (
              <div key={c.icon} className="flex gap-2 mb-2.5 text-xs text-white/60 leading-normal">
                <span className="shrink-0">{c.icon}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2024 ToLet Bangladesh. All rights reserved.</span>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-white/60">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white/60">Terms & Conditions</span>
            <span className="cursor-pointer hover:text-white/60">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
