"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/data";
import PropertyCard from "@/components/PropertyCard";
import DashboardTabs from "./DashboardTabs";

export default function TenantDashboardView() {
    const [tab, setTab] = useState("Saved");
    const saved = properties.slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="font-['Outfit'] text-26px font-bold text-[#0D1F3C] mb-6">Tenant Dashboard</h1>
            <DashboardTabs tabs={["Saved", "Contacted", "Messages", "Profile"]} active={tab} setActive={setTab} />

            {tab === "Saved" && (
                <div>
                    <div className="flex justify-between items-center mb-4.5">
                        <h2 className="font-['Outfit'] text-lg font-semibold text-[#0D1F3C] m-0">Saved Properties ({saved.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5">
                        {saved.map((p) => (
                            <PropertyCard key={p.id} property={p} />
                        ))}
                    </div>
                </div>
            )}

            {tab === "Contacted" && (
                <div>
                    <h2 className="font-['Outfit'] text-lg font-semibold text-[#0D1F3C] mb-4">Recently Contacted</h2>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {properties.slice(0, 4).map((p, i) => (
                            <div key={p.id} className={`flex items-center gap-3.5 p-3.5 px-5 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                                <img src={p.image} alt={p.title} className="w-15 h-11 rounded-lg object-cover bg-slate-200 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-800 text-sm truncate">{p.title}</div>
                                    <div className="text-slate-500 text-xs">{p.location}</div>
                                </div>
                                <div className="font-['Outfit'] font-bold text-[#1A4F9E] text-base shrink-0">৳{p.rent.toLocaleString()}</div>
                                <Link href={`/properties/${p.id}`} className="no-underline">
                                    <button className="px-3.5 py-1.5 rounded-lg border border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] cursor-pointer text-xs font-medium shrink-0 hover:bg-blue-100 transition-colors">
                                        View
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === "Messages" && (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200">
                    <div className="text-5xl mb-3.5">💬</div>
                    <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-2">Your Messages</h3>
                    <p className="text-slate-500 mb-4.5 text-sm">View and manage all your property conversations</p>
                    <Link href="/messaging" className="no-underline">
                        <button className="px-6 py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-semibold hover:bg-[#153f7e] transition-colors">
                            Open Messaging
                        </button>
                    </Link>
                </div>
            )}

            {tab === "Profile" && (
                <div className="bg-white rounded-2xl p-7 border border-slate-200 max-w-lg">
                    <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-5">Profile Settings</h3>
                    {[
                        ["Full Name", "Farida Khatun"],
                        ["Email", "farida@example.com"],
                        ["Phone", "01711-234567"],
                        ["City", "Dhaka"],
                    ].map(([label, val]) => (
                        <div key={label} className="mb-3.5">
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">{label}</label>
                            <input defaultValue={val} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500" />
                        </div>
                    ))}
                    <button className="px-6 py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-semibold text-sm hover:bg-[#153f7e] transition-colors">
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
}
