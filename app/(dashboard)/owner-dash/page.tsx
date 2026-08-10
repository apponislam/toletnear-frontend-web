"use client";

import { useState } from "react";
import { properties } from "@/data";

export default function OwnerDashboard() {
    const [myProperties] = useState(properties.slice(0, 3));

    return (
        <div>
            <div className="bg-[#0D1F3C] text-white py-9 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-[#0DB678] text-xs font-semibold uppercase tracking-wider">Owner Portal</span>
                        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold mt-1 mb-1">Property Owner Dashboard</h1>
                        <p className="text-white/60 text-sm m-0">Manage your active listings, incoming tenant requests & performance</p>
                    </div>
                    <a href="/post-property" className="no-underline">
                        <button className="px-5 py-2.5 rounded-lg border-none bg-[#0DB678] text-white text-sm font-semibold cursor-pointer font-['Outfit'] hover:bg-[#0a9864] transition-colors">+ Add New Property</button>
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-7">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        ["Active Listings", "3", "🏢"],
                        ["Total Inquiries", "28", "💬"],
                        ["Total Views", "1,420", "👁"],
                        ["Monthly Earnings", "৳96,000", "💰"],
                    ].map(([label, val, icon]) => (
                        <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
                            <div className="text-3xl p-3 bg-blue-50 rounded-xl">{icon}</div>
                            <div>
                                <div className="text-slate-500 text-xs mb-0.5">{label}</div>
                                <div className="font-['Outfit'] font-extrabold text-2xl text-[#0D1F3C]">{val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Listings section */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] m-0">My Properties</h3>
                        <a href="/post-property" className="text-[#1A4F9E] text-xs font-semibold no-underline hover:underline">
                            + Post New
                        </a>
                    </div>

                    <div className="flex flex-col gap-4">
                        {myProperties.map((p) => (
                            <div key={p.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img src={p.image} alt={p.title} className="w-20 h-16 rounded-lg object-cover bg-slate-200 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm mb-1">{p.title}</h4>
                                        <p className="text-slate-500 text-xs mb-1">
                                            📍 {p.location} • ৳{p.rent.toLocaleString()}/mo
                                        </p>
                                        <span className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">Active</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href={`/properties/${p.id}`} className="no-underline">
                                        <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors">View</button>
                                    </a>
                                    <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors">Edit</button>
                                    <button className="px-3.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium cursor-pointer hover:bg-red-100 transition-colors">Unlist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
