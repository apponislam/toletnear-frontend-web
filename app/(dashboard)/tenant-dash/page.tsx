"use client";

import { useState } from "react";
import { properties } from "@/data";
import PropertyCard from "@/components/PropertyCard";

export default function TenantDashboard() {
    const [tab, setTab] = useState<"saved" | "inquiries" | "applications">("saved");
    const savedProps = properties.slice(0, 3);

    const inquiries = [
        { id: "1", prop: properties[0], date: "Oct 12, 2024", status: "Pending", msg: "Is this flat available for visit this Saturday?" },
        { id: "2", prop: properties[1], date: "Oct 8, 2024", status: "Accepted", msg: "I would like to rent from next month." },
    ];

    return (
        <div>
            <div className="bg-[#0D1F3C] text-white py-9 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-[#0DB678] text-xs font-semibold uppercase tracking-wider">Tenant Portal</span>
                        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold mt-1 mb-1">Welcome back, Md. Rafiqul</h1>
                        <p className="text-white/60 text-sm m-0">Manage your saved properties, inquiries, and applications</p>
                    </div>
                    <a href="/properties" className="no-underline">
                        <button className="px-5 py-2.5 rounded-lg border-none bg-[#0DB678] text-white text-sm font-semibold cursor-pointer font-['Outfit'] hover:bg-[#0a9864] transition-colors">Find More Properties</button>
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-7">
                <div className="flex gap-2 border-b border-slate-200 mb-7 overflow-x-auto">
                    {[
                        ["saved", "❤️ Saved Properties (3)"],
                        ["inquiries", "💬 My Inquiries (2)"],
                        ["applications", "📄 Rental Applications (1)"],
                    ].map(([t, label]) => (
                        <button
                            key={t}
                            onClick={() => setTab(t as any)}
                            className={`px-5 py-3 border-b-2 text-sm font-semibold cursor-pointer transition-colors bg-transparent border-t-0 border-x-0 ${tab === t ? "border-[#1A4F9E] text-[#1A4F9E]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {tab === "saved" && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {savedProps.map((p) => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    </div>
                )}

                {tab === "inquiries" && (
                    <div className="flex flex-col gap-3.5">
                        {inquiries.map((inq) => (
                            <div key={inq.id} className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img src={inq.prop.image} alt={inq.prop.title} className="w-16 h-16 rounded-xl object-cover bg-slate-200 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm mb-1">{inq.prop.title}</h4>
                                        <p className="text-slate-500 text-xs mb-1.5">{inq.msg}</p>
                                        <div className="text-slate-400 text-xs">{inq.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${inq.status === "Accepted" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{inq.status}</span>
                                    <a href="/messaging" className="no-underline">
                                        <button className="px-4 py-2 rounded-lg border border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] text-xs font-semibold cursor-pointer hover:bg-blue-100 transition-colors">View Chat</button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === "applications" && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                            <div>
                                <h4 className="font-bold text-slate-800 text-base mb-1">Modern 3 BHK Flat in Bashundhara R/A</h4>
                                <div className="text-slate-500 text-xs">Submitted on Oct 10, 2024 • Rent: ৳32,000/mo</div>
                            </div>
                            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">Under Review</span>
                        </div>
                        <div className="text-slate-600 text-sm leading-relaxed">Your application has been received by the owner. They will review your details and contact you shortly.</div>
                    </div>
                )}
            </div>
        </div>
    );
}
