"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/data";
import DashboardTabs from "./DashboardTabs";
import StatCard from "./StatCard";

export default function OwnerDashboardView() {
    const [tab, setTab] = useState("Overview");

    const inquiries = [
        { name: "Aminul Hossain", property: "Modern 3BR Apartment, Mirpur DOHS", time: "2h ago", status: "new" },
        { name: "Sadia Sultana", property: "2BHK in Gulshan 2", time: "5h ago", status: "replied" },
        { name: "Karim Ahmed", property: "Spacious Family House, Uttara", time: "1d ago", status: "new" },
        { name: "Nasima Begum", property: "Premium Sublet, Bashundhara", time: "2d ago", status: "replied" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6.5">
                <h1 className="font-['Outfit'] text-26px font-bold text-[#0D1F3C] m-0">Owner Dashboard</h1>
                <Link href="/post-property" className="no-underline">
                    <button className="px-5 py-2.5 rounded-lg border-none bg-[#0DB678] text-white cursor-pointer font-bold text-sm flex items-center gap-1.5 hover:bg-[#0a9864] transition-colors">
                        + Add Property
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-7">
                <StatCard label="Total Properties" value="4" icon="🏠" note="+1 this month" />
                <StatCard label="Active Listings" value="3" icon="✅" note="1 pending review" color="bg-emerald-100" textColor="text-emerald-600" />
                <StatCard label="Total Views" value="1,247" icon="👁" note="+234 this week" color="bg-amber-100" textColor="text-amber-600" />
                <StatCard label="Inquiries" value="28" icon="📩" note="8 unread" color="bg-red-100" textColor="text-red-600" />
            </div>

            <DashboardTabs tabs={["Overview", "Properties", "Inquiries", "Messages"]} active={tab} setActive={setTab} />

            {tab === "Overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-4 px-5 border-b border-slate-100 flex justify-between items-center">
                            <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">Recent Inquiries</span>
                            <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">8 Unread</span>
                        </div>
                        {inquiries.map((inq, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                                <div className="w-9.5 h-9.5 rounded-full bg-[#EBF2FF] flex items-center justify-center font-['Outfit'] font-bold text-[#1A4F9E] text-base shrink-0">
                                    {inq.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-800 text-sm">{inq.name}</div>
                                    <div className="text-slate-500 text-xs truncate">{inq.property}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-slate-400 text-xs mb-0.5">{inq.time}</div>
                                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${inq.status === "new" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                                        {inq.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h3 className="font-['Outfit'] text-sm font-bold text-[#0D1F3C] mb-4">Quick Actions</h3>
                        {[
                            { label: "Post New Property", href: "/post-property", icon: "➕", bg: "bg-emerald-100", color: "text-emerald-600" },
                            { label: "View Messages", href: "/messaging", icon: "💬", bg: "bg-[#EBF2FF]", color: "text-[#1A4F9E]" },
                            { label: "View All Properties", href: "/properties", icon: "🏠", bg: "bg-slate-100", color: "text-slate-700" },
                        ].map((a) => (
                            <Link key={a.label} href={a.href} className="no-underline">
                                <button className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer mb-2 text-sm text-slate-700 text-left hover:bg-slate-100 transition-colors">
                                    <span className={`w-7.5 h-7.5 rounded-lg ${a.bg} ${a.color} flex items-center justify-center text-sm shrink-0`}>{a.icon}</span>
                                    {a.label}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {tab === "Properties" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 px-5 border-b border-slate-100 flex justify-between items-center">
                        <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">My Properties (4)</span>
                        <Link href="/post-property" className="no-underline">
                            <button className="px-4 py-1.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer text-xs font-semibold hover:bg-[#153f7e] transition-colors">
                                + Add New
                            </button>
                        </Link>
                    </div>
                    {properties.slice(0, 4).map((p, i) => (
                        <div key={p.id} className={`flex items-center gap-3.5 p-3.5 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                            <img src={p.image} alt={p.title} className="w-16.5 h-12 rounded-lg object-cover bg-slate-200 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800 text-sm truncate">{p.title}</div>
                                <div className="text-slate-500 text-xs">
                                    {p.location} · ৳{p.rent.toLocaleString()}/mo
                                </div>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${i === 2 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
                                {i === 2 ? "Pending" : "Active"}
                            </span>
                            <div className="flex gap-1.5 shrink-0">
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer text-xs hover:bg-slate-50 transition-colors">Edit</button>
                                <button className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 cursor-pointer text-xs hover:bg-red-100 transition-colors">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "Inquiries" && (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200">
                    <div className="text-5xl mb-3.5">📩</div>
                    <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-2">28 Total Inquiries</h3>
                    <p className="text-slate-500 mb-4.5 text-sm">8 new messages waiting for your response</p>
                    <Link href="/messaging" className="no-underline">
                        <button className="px-6 py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-semibold hover:bg-[#153f7e] transition-colors">
                            View Messages
                        </button>
                    </Link>
                </div>
            )}

            {tab === "Messages" && (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200">
                    <Link href="/messaging" className="no-underline">
                        <button className="px-7 py-3 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-bold text-sm font-['Outfit'] hover:bg-[#153f7e] transition-colors">
                            Open Messaging Center
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
