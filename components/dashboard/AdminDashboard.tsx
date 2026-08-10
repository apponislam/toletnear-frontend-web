"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/data";
import DashboardTabs from "./DashboardTabs";
import StatCard from "./StatCard";

export default function AdminDashboardView() {
    const [tab, setTab] = useState("Overview");

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="font-['Outfit'] text-26px font-bold text-[#0D1F3C] mb-6.5">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-7">
                <StatCard label="Total Users" value="12,450" icon="👥" />
                <StatCard label="Total Properties" value="8,320" icon="🏠" color="bg-emerald-100" textColor="text-emerald-600" />
                <StatCard label="Pending Approval" value="47" icon="⏳" color="bg-amber-100" textColor="text-amber-600" />
                <StatCard label="Reports" value="12" icon="🚩" color="bg-red-100" textColor="text-red-600" />
            </div>

            <DashboardTabs tabs={["Overview", "Properties", "Users", "Reports"]} active={tab} setActive={setTab} />

            {tab === "Overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-4 px-5 border-b border-slate-100 flex justify-between items-center">
                            <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">Pending Approvals</span>
                            <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">47</span>
                        </div>
                        {properties.slice(0, 4).map((p, i) => (
                            <div key={p.id} className={`flex items-center gap-3 p-3 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                                <img src={p.image} alt="" className="w-12.5 h-9.5 rounded-md object-cover bg-slate-200 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-800 text-xs truncate">{p.title}</div>
                                    <div className="text-slate-500 text-[11px]">{p.owner.name}</div>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                    <button className="px-2.5 py-1 rounded-md border-none bg-emerald-100 text-emerald-600 cursor-pointer text-xs font-semibold hover:bg-emerald-200 transition-colors">✓ Approve</button>
                                    <button className="px-2.5 py-1 rounded-md border-none bg-red-100 text-red-600 cursor-pointer text-xs font-semibold hover:bg-red-200 transition-colors">✕ Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-4 px-5 border-b border-slate-100">
                            <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">Recent Registrations</span>
                        </div>
                        {[
                            { name: "Md. Rafiqul Islam", role: "Property Owner", time: "1h ago", city: "Dhaka" },
                            { name: "Sadia Rahman", role: "Tenant", time: "3h ago", city: "Chattogram" },
                            { name: "Jahangir Alam", role: "Agent", time: "5h ago", city: "Sylhet" },
                            { name: "Nasrin Begum", role: "Tenant", time: "8h ago", city: "Dhaka" },
                        ].map((u, i) => (
                            <div key={i} className={`flex items-center gap-2.5 p-3 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                                <div className="w-9 h-9 rounded-full bg-[#EBF2FF] flex items-center justify-center font-['Outfit'] font-bold text-[#1A4F9E] text-sm shrink-0">
                                    {u.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-800 text-xs">{u.name}</div>
                                    <div className="text-slate-500 text-[11px]">
                                        {u.role} · {u.city}
                                    </div>
                                </div>
                                <div className="text-slate-400 text-[11px]">{u.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === "Properties" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 px-5 border-b border-slate-100 flex justify-between items-center">
                        <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">All Properties (8,320)</span>
                        <input placeholder="Search properties..." className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none w-48" />
                    </div>
                    {properties.map((p, i) => (
                        <div key={p.id} className={`flex items-center gap-3.5 p-3 px-5 ${i < properties.length - 1 ? "border-b border-slate-100" : ""}`}>
                            <img src={p.image} alt="" className="w-14.5 h-11 rounded-lg object-cover bg-slate-200 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800 text-xs truncate">{p.title}</div>
                                <div className="text-slate-500 text-[11px]">
                                    {p.location} · {p.owner.name}
                                </div>
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${p.verified ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                                {p.verified ? "Verified" : "Pending"}
                            </span>
                            <div className="flex gap-1.5 shrink-0">
                                <Link href={`/properties/${p.id}`} className="no-underline">
                                    <button className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 cursor-pointer text-xs hover:bg-slate-50 transition-colors">View</button>
                                </Link>
                                <button className="px-2.5 py-1 rounded-md border-none bg-red-100 text-red-600 cursor-pointer text-xs hover:bg-red-200 transition-colors">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "Users" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 px-5 border-b border-slate-100">
                        <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">User Management (12,450)</span>
                    </div>
                    {[
                        { name: "Md. Rafiqul Islam", email: "rafiqul@example.com", role: "Property Owner", city: "Dhaka", status: "Active", props: 4 },
                        { name: "Farida Khatun", email: "farida@example.com", role: "Tenant", city: "Dhaka", status: "Active", props: 0 },
                        { name: "Jahangir Hossain", email: "jahangir@example.com", role: "Property Owner", city: "Sylhet", status: "Suspended", props: 2 },
                        { name: "Sadia Rahman", email: "sadia@example.com", role: "Agent", city: "Chattogram", status: "Active", props: 7 },
                    ].map((u, i) => (
                        <div key={i} className={`flex items-center gap-3.5 p-3.5 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                            <div className="w-9.5 h-9.5 rounded-full bg-[#EBF2FF] flex items-center justify-center font-['Outfit'] font-bold text-[#1A4F9E] text-sm shrink-0">
                                {u.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-slate-800 text-sm">{u.name}</div>
                                <div className="text-slate-500 text-xs">
                                    {u.email} · {u.role} · {u.city}
                                </div>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${u.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>{u.status}</span>
                            <div className="flex gap-1.5 shrink-0">
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer text-xs hover:bg-slate-50 transition-colors">View</button>
                                <button className={`px-3 py-1.5 rounded-lg border-none text-xs cursor-pointer transition-colors ${u.status === "Active" ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`}>
                                    {u.status === "Active" ? "Suspend" : "Activate"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "Reports" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 px-5 border-b border-slate-100">
                        <span className="font-['Outfit'] font-semibold text-base text-[#0D1F3C]">Reported Content (12)</span>
                    </div>
                    {[
                        { title: "Fake listing in Dhanmondi", type: "Property", reporter: "Aminul Islam", reason: "Fraudulent listing", date: "2024-01-18" },
                        { title: "User posting duplicate ads", type: "User", reporter: "Farhan Ahmed", reason: "Spam activity", date: "2024-01-17" },
                        { title: "Misleading price in Uttara", type: "Property", reporter: "Sadia Begum", reason: "Wrong information", date: "2024-01-16" },
                    ].map((r, i) => (
                        <div key={i} className={`flex items-center gap-3.5 p-3.5 px-5 ${i < 2 ? "border-b border-slate-100" : ""}`}>
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-lg shrink-0">🚩</div>
                            <div className="flex-1">
                                <div className="font-semibold text-slate-800 text-sm">{r.title}</div>
                                <div className="text-slate-500 text-xs">
                                    By {r.reporter} · {r.reason} · {r.date}
                                </div>
                            </div>
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0">{r.type}</span>
                            <div className="flex gap-1.5 shrink-0">
                                <button className="px-3 py-1.5 rounded-lg border-none bg-red-100 text-red-600 cursor-pointer text-xs font-semibold hover:bg-red-200 transition-colors">Remove</button>
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer text-xs hover:bg-slate-50 transition-colors">Dismiss</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
