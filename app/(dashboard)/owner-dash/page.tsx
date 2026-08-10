"use client";

import { useState } from "react";
import { properties } from "@/data";
import Link from "next/link";

export default function OwnerDashboard() {
    const [myProperties] = useState(properties.slice(0, 3));

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-[#0DB678] text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2">
                        Owner Control Center
                    </span>
                    <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-[#0D1F3C] tracking-tight">
                        Property Owner Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage active listings, tenant inquiries, rental contracts, and revenue.
                    </p>
                </div>
                <Link href="/post-property" className="no-underline shrink-0">
                    <button className="px-5 py-3 rounded-xl border-none bg-[#0DB678] hover:bg-[#0a9864] text-white text-sm font-bold cursor-pointer font-['Outfit'] shadow-xs transition-all flex items-center gap-2">
                        <span>➕</span> Add New Property
                    </button>
                </Link>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Listings", val: "3", icon: "🏢", change: "+1 this month" },
                    { label: "Total Inquiries", val: "28", icon: "💬", change: "12 unread" },
                    { label: "Total Views", val: "1,420", icon: "👁", change: "+18% this week" },
                    { label: "Monthly Earnings", val: "৳96,000", icon: "💰", change: "Collected" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                            <div className="font-['Outfit'] font-extrabold text-2xl text-[#0D1F3C]">{stat.val}</div>
                            <div className="text-[11px] font-medium text-emerald-600 mt-1">{stat.change}</div>
                        </div>
                        <div className="text-2xl p-3 bg-blue-50 border border-blue-100 rounded-xl">{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Properties Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                        <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">My Managed Properties</h3>
                        <p className="text-slate-400 text-xs mt-0.5">3 active listings published on marketplace</p>
                    </div>
                    <Link href="/post-property" className="text-[#1A4F9E] text-xs font-bold no-underline hover:underline">
                        + Add Property
                    </Link>
                </div>

                <div className="space-y-3">
                    {myProperties.map((p) => (
                        <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all gap-4">
                            <div className="flex items-center gap-3.5">
                                <img src={p.image} alt={p.title} className="w-20 h-16 rounded-xl object-cover bg-slate-200 shrink-0 border border-slate-200" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            Active
                                        </span>
                                        <span className="text-slate-400 text-xs">• {p.type}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{p.title}</h4>
                                    <p className="text-slate-500 text-xs">
                                        📍 {p.location} &nbsp;|&nbsp; <span className="font-bold text-[#1A4F9E]">৳{p.rent.toLocaleString()}/mo</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                <Link href={`/properties/${p.id}`} className="no-underline">
                                    <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-50 transition-colors">
                                        View
                                    </button>
                                </Link>
                                <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-50 transition-colors">
                                    Edit
                                </button>
                                <button className="px-3.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-semibold cursor-pointer hover:bg-red-100 transition-colors">
                                    Unlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
