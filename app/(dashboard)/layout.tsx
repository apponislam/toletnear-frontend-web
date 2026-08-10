"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Globe, Menu } from "lucide-react";
import AppSidebar from "@/components/dashboard/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen flex bg-slate-100 font-sans antialiased text-slate-800">
            {/* Modular Reusable App Sidebar Component */}
            <AppSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Content Container (Offset dynamically based on sidebar state) */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                    sidebarOpen ? "lg:pl-64" : "lg:pl-20"
                }`}
            >
                {/* Dashboard Top Navigation Bar */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 max-w-md w-full">
                        {/* Mobile Hamburger Drawer Toggle */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-slate-600" />
                        </button>

                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search dashboard, properties, inquiries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A4F9E] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Action Header Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <Link href="/post-property" className="no-underline">
                            <button className="px-3.5 py-2 rounded-xl bg-[#0DB678] hover:bg-[#0a9864] text-white text-xs font-bold border-none cursor-pointer shadow-xs flex items-center gap-1.5 transition-all">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Add Listing</span>
                            </button>
                        </Link>

                        <Link
                            href="/"
                            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold no-underline transition-all hidden sm:flex items-center gap-1.5"
                        >
                            <Globe className="w-4 h-4 text-slate-500" />
                            <span>View Site</span>
                        </Link>
                    </div>
                </header>

                {/* Main Dashboard Pages */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F4F7FC]">
                    {children}
                </main>
            </div>
        </div>
    );
}
