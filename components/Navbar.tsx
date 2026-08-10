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
        <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 10px rgba(0,0,0,0.06)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "none" }}>
                        <div style={{ width: 34, height: 34, backgroundColor: "#1A4F9E", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 22, color: "#1A4F9E", letterSpacing: "-0.5px" }}>
                            To<span style={{ color: "#0DB678" }}>Let</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: isActive ? "#EBF2FF" : "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: isActive ? "#1A4F9E" : "#374151", transition: "all 0.15s", textDecoration: "none" }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
                        {isLoggedIn ? (
                            <div style={{ position: "relative" }}>
                                <button onClick={() => setProfileOpen(!profileOpen)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#374151" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#1A4F9E", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>MR</div>
                                    Md. Rafiqul
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {profileOpen && (
                                    <div style={{ position: "absolute", right: 0, top: "110%", backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0", minWidth: 190, overflow: "hidden", zIndex: 100 }}>
                                        <Link href={dashHref} onClick={() => setProfileOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#374151", textDecoration: "none" }}>
                                            Dashboard
                                        </Link>
                                        <Link href="/messaging" onClick={() => setProfileOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#374151", textDecoration: "none" }}>
                                            Messages
                                        </Link>
                                        <Link
                                            href="/post-property"
                                            onClick={() => setProfileOpen(false)}
                                            style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#374151", textDecoration: "none" }}
                                        >
                                            Post Property
                                        </Link>
                                        <div style={{ borderTop: "1px solid #E2E8F0" }} />
                                        <button style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, color: "#EF4444" }}>Sign Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login" style={{ padding: "8px 20px", borderRadius: 8, border: "1.5px solid #1A4F9E", background: "#fff", color: "#1A4F9E", cursor: "pointer", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                                    Login
                                </Link>
                                <Link href="/register" style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: "#1A4F9E", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
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
                    <div style={{ borderTop: "1px solid #E2E8F0", padding: "12px 0 16px" }} className="md:hidden">
                        {navLinks.map((link) => (
                            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 4px", border: "none", background: "none", cursor: "pointer", fontSize: 15, color: "#374151", textDecoration: "none" }}>
                                {link.label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <Link href={dashHref} onClick={() => setMobileOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 4px", border: "none", background: "none", cursor: "pointer", fontSize: 15, color: "#374151", textDecoration: "none" }}>
                                Dashboard
                            </Link>
                        )}
                        <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 8, paddingTop: 10, display: "flex", gap: 8 }}>
                            <Link href="/login" onClick={() => setMobileOpen(false)} style={{ flex: 1, padding: "9px", borderRadius: 7, border: "1.5px solid #1A4F9E", background: "#fff", color: "#1A4F9E", cursor: "pointer", fontSize: 14, textAlign: "center", textDecoration: "none" }}>
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setMobileOpen(false)} style={{ flex: 1, padding: "9px", borderRadius: 7, border: "none", background: "#1A4F9E", color: "#fff", cursor: "pointer", fontSize: 14, textAlign: "center", textDecoration: "none" }}>
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
