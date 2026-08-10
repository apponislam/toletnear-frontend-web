"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
    label: string;
    href: string;
    icon: string;
    badge?: string;
}

interface SidebarGroup {
    group: string;
    items: SidebarItem[];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const sidebarItems: SidebarGroup[] = [
        {
            group: "PORTALS",
            items: [
                { label: "Owner Dashboard", href: "/owner-dash", icon: "🏢" },
                { label: "Tenant Dashboard", href: "/tenant-dash", icon: "🔑" },
                { label: "Admin Portal", href: "/admin-dash", icon: "🛡️" },
            ],
        },
        {
            group: "PROPERTY MANAGEMENT",
            items: [
                { label: "Post New Property", href: "/post-property", icon: "➕" },
                { label: "All Properties", href: "/properties", icon: "📋", badge: "12" },
                { label: "Messages & Chats", href: "/messaging", icon: "💬", badge: "2" },
            ],
        },
        {
            group: "WEBSITE ROUTE",
            items: [{ label: "Back to Public Site", href: "/", icon: "🌐" }],
        },
    ];

    return (
        <div className="min-h-screen flex bg-slate-100 font-sans antialiased text-slate-800">
            {/* White Clean App Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shadow-xs ${sidebarOpen ? "w-64" : "w-20"}`}>
                {/* Brand Header */}
                <div className={`h-16 flex items-center px-4 border-b border-slate-100 ${sidebarOpen ? "justify-between" : "justify-center relative"}`}>
                    <Link href="/" className="flex items-center gap-2.5 no-underline overflow-hidden shrink-0">
                        <div className="w-9 h-9 bg-[#1A4F9E] rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                            </svg>
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col">
                                <span className="font-['Outfit'] font-extrabold text-lg text-[#1A4F9E] leading-none">
                                    To<span className="text-[#0DB678]">Let</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Control Panel</span>
                            </div>
                        )}
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                            sidebarOpen ? "" : "absolute -right-3 top-4 bg-white shadow-md z-10 w-6 h-6 border-slate-300"
                        }`}
                        title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {sidebarOpen ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
                        </svg>
                    </button>
                </div>

                {/* Sidebar Links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {sidebarItems.map((group) => (
                        <div key={group.group}>
                            {sidebarOpen ? <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">{group.group}</div> : <div className="h-px bg-slate-100 my-2" />}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all no-underline ${isActive ? "bg-[#1A4F9E] text-white shadow-xs" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                            title={!sidebarOpen ? item.label : undefined}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-base shrink-0">{item.icon}</span>
                                                {sidebarOpen && <span className="truncate">{item.label}</span>}
                                            </div>
                                            {sidebarOpen && item.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white text-[#1A4F9E]" : "bg-emerald-100 text-emerald-700"}`}>{item.badge}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Profile Card */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="w-9 h-9 rounded-xl bg-[#1A4F9E] flex items-center justify-center font-bold text-white text-xs shrink-0">MR</div>
                        {sidebarOpen && (
                            <div className="overflow-hidden flex-1">
                                <h4 className="font-['Outfit'] font-bold text-xs text-slate-800 truncate">Md. Rafiqul</h4>
                                <p className="text-[10px] text-emerald-600 font-semibold truncate">Verified Owner & Tenant</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content (Offset dynamically when sidebar expands/collapses) */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-20"}`}>
                {/* Header Navbar for Dashboard */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between gap-4 shadow-2xs">
                    <div className="flex items-center gap-3 max-w-md w-full">
                        <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">🔍</span>
                            <input
                                type="text"
                                placeholder="Search dashboard, properties, inquiries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A4F9E] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/post-property" className="no-underline">
                            <button className="px-4 py-2 rounded-xl bg-[#0DB678] hover:bg-[#0a9864] text-white text-xs font-bold border-none cursor-pointer shadow-xs flex items-center gap-1.5 transition-all">
                                <span>➕</span>
                                <span className="hidden sm:inline">Add Listing</span>
                            </button>
                        </Link>

                        <Link href="/" className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold no-underline transition-all">
                            🌐 View Website
                        </Link>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <main className="flex-1 p-6 sm:p-8 bg-[#F4F7FC]">{children}</main>
            </div>
        </div>
    );
}
