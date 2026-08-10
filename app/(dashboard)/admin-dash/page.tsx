"use client";

import { useState } from "react";
import { properties } from "@/data";

export default function AdminDashboard() {
    const [allProps] = useState(properties);

    return (
        <div>
            <div className="bg-[#0D1F3C] text-white py-9 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-[#0DB678] text-xs font-semibold uppercase tracking-wider">Super Admin</span>
                        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold mt-1 mb-1">System Administration</h1>
                        <p className="text-white/60 text-sm m-0">Platform overview, user management, and pending property verifications</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-7">
                {/* Admin stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        ["Total Users", "12,450", "👥"],
                        ["Total Properties", "1,890", "🏢"],
                        ["Pending Verification", "14", "⏳"],
                        ["Reports Flagged", "3", "🚩"],
                    ].map(([label, val, icon]) => (
                        <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
                            <div className="text-3xl p-3 bg-[#EBF2FF] rounded-xl">{icon}</div>
                            <div>
                                <div className="text-slate-500 text-xs mb-0.5">{label}</div>
                                <div className="font-['Outfit'] font-extrabold text-2xl text-[#0D1F3C]">{val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Verification queue */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-4">Property Verification Queue</h3>

                    <div className="flex flex-col gap-3.5">
                        {allProps.slice(0, 4).map((p) => (
                            <div key={p.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img src={p.image} alt={p.title} className="w-20 h-16 rounded-lg object-cover bg-slate-200 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm mb-1">{p.title}</h4>
                                        <p className="text-slate-500 text-xs mb-1">
                                            Owner: {p.owner.name} • Phone: {p.owner.phone}
                                        </p>
                                        <div className="text-slate-400 text-xs">
                                            Rent: ৳{p.rent.toLocaleString()}/mo • {p.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 rounded-lg border-none bg-[#0DB678] text-white text-xs font-semibold cursor-pointer hover:bg-[#0a9864] transition-colors">Approve</button>
                                    <button className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-semibold cursor-pointer hover:bg-red-100 transition-colors">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
