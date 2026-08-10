import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const AUTH_BG = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=1600&fit=crop&auto=format";

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F4F7FC]">
            {/* Left side 50% image section */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#0D1F3C]">
                <img src={AUTH_BG} alt="Rental Property" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0D1F3C] via-[#0D1F3C]/60 to-transparent" />

                {/* Top Logo */}
                <div className="relative z-10">
                    <a href="/" className="inline-flex items-center gap-2 text-decoration-none">
                        <div className="w-9 h-9 bg-[#1A4F9E] rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                            </svg>
                        </div>
                        <span className="font-['Outfit'] font-extrabold text-2xl text-white tracking-tight">
                            To<span className="text-[#0DB678]">Let</span>
                        </span>
                    </a>
                </div>

                {/* Bottom Banner Content */}
                <div className="relative z-10 text-white max-w-md">
                    <span className="inline-block bg-[#0DB678]/20 border border-[#0DB678]/40 text-[#0DB678] text-xs font-semibold px-3 py-1 rounded-full mb-4">Bangladesh's #1 Rental Portal</span>
                    <h1 className="font-['Outfit'] text-3xl font-extrabold leading-tight mb-3">Find & Manage Your Next Home Easily</h1>
                    <p className="text-white/70 text-sm leading-relaxed">Connect with verified property owners, explore thousands of active listings, and enjoy seamless rental agreements across Bangladesh.</p>
                </div>
            </div>

            {/* Right side 50% middle aligned form section */}
            <div className="flex items-center justify-center p-6 md:p-12 w-full min-h-screen lg:min-h-0">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}
