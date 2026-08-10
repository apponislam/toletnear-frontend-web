"use client";

import { useState } from "react";
import { properties } from "@/data";

export default function AdminDashboard() {
    const [allProps] = useState(properties);

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-amber-700 text-xs font-bold uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
                        Super Admin Portal
                    </span>
                    <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-[#0D1F3C] tracking-tight">
                        System Administration
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Platform metrics overview, user management, and pending property verifications.
                    </p>
                </div>
            </div>

            {/* Admin Metric Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Users", val: "12,450", icon: "👥", tag: "Active Users" },
                    { label: "Total Properties", val: "1,890", icon: "🏢", tag: "Platform Wide" },
                    { label: "Pending Verification", val: "14", icon: "⏳", tag: "Needs Review", alert: true },
                    { label: "Reports Flagged", val: "3", icon: "🚩", tag: "High Priority" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                            <div className="font-['Outfit'] font-extrabold text-2xl text-[#0D1F3C]">{stat.val}</div>
                            <div className={`text-[11px] font-semibold mt-1 ${stat.alert ? "text-amber-600" : "text-slate-500"}`}>{stat.tag}</div>
                        </div>
                        <div className="text-2xl p-3 bg-[#EBF2FF] border border-blue-100 rounded-xl">{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Verification Queue Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                        <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">Property Verification Queue</h3>
                        <p className="text-slate-400 text-xs mt-0.5">Review land papers and owner details before publishing</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                        14 Submissions Pending
                    </span>
                </div>

                <div className="space-y-3.5">
                    {allProps.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all gap-4">
                            <div className="flex items-center gap-4">
                                <img src={p.image} alt={p.title} className="w-20 h-16 rounded-xl object-cover bg-slate-200 shrink-0 border border-slate-200" />
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{p.title}</h4>
                                    <p className="text-slate-600 text-xs mb-1">
                                        👤 Owner: <span className="font-semibold text-slate-800">{p.owner.name}</span> ({p.owner.phone})
                                    </p>
                                    <div className="text-slate-400 text-xs">
                                        📍 {p.location} &nbsp;|&nbsp; Rent: <span className="font-semibold text-[#1A4F9E]">৳{p.rent.toLocaleString()}/mo</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                <button className="px-4 py-2 rounded-xl border-none bg-[#0DB678] hover:bg-[#0a9864] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors">
                                    Approve
                                </button>
                                <button className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-bold cursor-pointer hover:bg-red-100 transition-colors">
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
