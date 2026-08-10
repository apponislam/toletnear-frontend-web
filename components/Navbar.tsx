"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    const isLoggedIn = true;
    const [userRole] = useState<"tenant" | "owner" | "admin">("owner");

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "Post Property", href: "/post-property" },
    ];

    const dashHref = userRole === "admin" ? "/admin-dash" : userRole === "owner" ? "/owner-dash" : "/tenant-dash";

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 no-underline">
                        <div className="w-8.5 h-8.5 bg-[#1A4F9E] rounded-xl flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                            </svg>
                        </div>
                        <span className="font-['Outfit'] font-extrabold text-22px text-[#1A4F9E] tracking-tight">
                            To<span className="text-[#0DB678]">Let</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={link.label} href={link.href} className={`px-4 py-1.75 rounded-lg text-sm font-medium transition-all no-underline ${isActive ? "bg-[#EBF2FF] text-[#1A4F9E]" : "text-slate-700 hover:bg-slate-100"}`}>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth */}
                    <div className="hidden md:flex items-center gap-2.5">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                                    <div className="w-7 h-7 rounded-full bg-[#1A4F9E] flex items-center justify-center text-white text-xs font-bold">MR</div>
                                    Md. Rafiqul
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {profileOpen && (
                                    <div className="absolute right-0 top-[110%] bg-white rounded-xl shadow-xl border border-slate-200 min-w-47.5 overflow-hidden z-50 py-1">
                                        <Link href={dashHref} onClick={() => setProfileOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 no-underline">
                                            Dashboard
                                        </Link>
                                        <Link href="/messaging" onClick={() => setProfileOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 no-underline">
                                            Messages
                                        </Link>
                                        <Link href="/post-property" onClick={() => setProfileOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 no-underline">
                                            Post Property
                                        </Link>
                                        <div className="border-t border-slate-200 my-1" />
                                        <button className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer border-none bg-transparent">Sign Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="px-5 py-2 rounded-lg border border-[#1A4F9E] bg-white text-[#1A4F9E] text-sm font-medium no-underline hover:bg-blue-50 transition-all">
                                    Login
                                </Link>
                                <Link href="/register" className="px-5 py-2 rounded-lg bg-[#1A4F9E] text-white text-sm font-semibold no-underline hover:bg-[#153f7e] transition-all">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden bg-transparent border-none cursor-pointer p-2">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                            {mobileOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-slate-200 py-3">
                        {navLinks.map((link) => (
                            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block w-full text-left py-2.5 px-1 text-slate-700 text-base no-underline hover:text-[#1A4F9E]">
                                {link.label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <Link href={dashHref} onClick={() => setMobileOpen(false)} className="block w-full text-left py-2.5 px-1 text-slate-700 text-base no-underline hover:text-[#1A4F9E]">
                                Dashboard
                            </Link>
                        )}
                        <div className="border-t border-slate-200 mt-2 pt-3 flex gap-2">
                            <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2 rounded-lg border border-[#1A4F9E] bg-white text-[#1A4F9E] text-center text-sm no-underline font-medium">
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2 rounded-lg bg-[#1A4F9E] text-white text-center text-sm no-underline font-semibold">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
