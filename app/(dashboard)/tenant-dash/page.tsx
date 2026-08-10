"use client";

import { useState } from "react";
import { properties } from "@/data";
import Link from "next/link";

export default function TenantDashboard() {
    const [tab, setTab] = useState<"saved" | "inquiries" | "applications">("saved");
    const savedProps = properties.slice(0, 3);

    const inquiries = [
        { id: "1", prop: properties[0], date: "Oct 12, 2024", status: "Pending", msg: "Is this flat available for visit this Saturday?" },
        { id: "2", prop: properties[1], date: "Oct 8, 2024", status: "Accepted", msg: "I would like to rent from next month." },
    ];

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-[#1A4F9E] text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-2">
                        Tenant Portal
                    </span>
                    <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-[#0D1F3C] tracking-tight">
                        Welcome back, Md. Rafiqul
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Track your saved properties, inquiries, and rental application statuses.
                    </p>
                </div>
                <Link href="/properties" className="no-underline shrink-0">
                    <button className="px-5 py-3 rounded-xl border-none bg-[#1A4F9E] hover:bg-[#153f7e] text-white text-sm font-bold cursor-pointer font-['Outfit'] shadow-xs transition-all flex items-center gap-2">
                        <span>🔍</span> Find Properties
                    </button>
                </Link>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex gap-2 overflow-x-auto">
                {[
                    ["saved", "❤️ Saved Properties", "3"],
                    ["inquiries", "💬 My Inquiries", "2"],
                    ["applications", "📄 Rental Applications", "1"],
                ].map(([t, label, count]) => (
                    <button
                        key={t}
                        onClick={() => setTab(t as any)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all border-none ${
                            tab === t
                                ? "bg-[#1A4F9E] text-white shadow-xs"
                                : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                    >
                        <span>{label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            tab === t ? "bg-white text-[#1A4F9E]" : "bg-slate-100 text-slate-700"
                        }`}>
                            {count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {tab === "saved" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savedProps.map((p) => (
                        <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                            <div className="relative">
                                <img src={p.image} alt={p.title} className="w-full h-44 object-cover bg-slate-100" />
                                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#1A4F9E] border border-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs">
                                    ৳{p.rent.toLocaleString()}/mo
                                </span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="text-[11px] text-slate-500 font-semibold mb-1">📍 {p.location}</div>
                                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{p.title}</h4>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Owner: {p.owner.name}</span>
                                    <Link href={`/properties/${p.id}`} className="no-underline">
                                        <button className="px-3.5 py-1.5 rounded-lg bg-[#1A4F9E] text-white text-xs font-semibold cursor-pointer border-none hover:bg-[#153f7e] transition-colors">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "inquiries" && (
                <div className="space-y-3.5">
                    {inquiries.map((inq) => (
                        <div key={inq.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={inq.prop.image} alt={inq.prop.title} className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                            inq.status === "Accepted" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                        }`}>
                                            {inq.status}
                                        </span>
                                        <span className="text-slate-400 text-xs">• {inq.date}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{inq.prop.title}</h4>
                                    <p className="text-slate-600 text-xs italic bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        &ldquo;{inq.msg}&rdquo;
                                    </p>
                                </div>
                            </div>
                            <Link href="/messaging" className="no-underline shrink-0 self-end md:self-center">
                                <button className="px-4 py-2 rounded-xl border border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors">
                                    Open Chat
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {tab === "applications" && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center py-12">
                    <div className="text-4xl mb-3">📄</div>
                    <h3 className="font-['Outfit'] text-base font-bold text-[#0D1F3C]">1 Active Rental Application Submitted</h3>
                    <p className="text-slate-500 text-xs max-w-md mx-auto mt-1 mb-4">
                        Your application for <span className="font-semibold text-slate-700">{properties[0].title}</span> is currently under review by landlord {properties[0].owner.name}.
                    </p>
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                        Status: Owner Reviewing Documents
                    </span>
                </div>
            )}
        </div>
    );
}
