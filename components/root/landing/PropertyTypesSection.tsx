"use client";

import Link from "next/link";

const CATEGORIES = [
    { name: "Apartment", icon: "🏢", count: 1240 },
    { name: "Family House", icon: "🏠", count: 380 },
    { name: "Bachelor Room", icon: "🛏", count: 520 },
    { name: "Sublet", icon: "🔑", count: 290 },
    { name: "Office", icon: "💼", count: 180 },
    { name: "Shop", icon: "🏪", count: 95 },
    { name: "Commercial Space", icon: "🏗", count: 67 },
];

export default function PropertyTypesSection() {
    return (
        <section className="bg-white py-14 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-1.5 text-center">Browse by Property Type</h2>
                <p className="text-slate-500 text-sm text-center mb-8">Choose the property type that suits your needs</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.name} href={`/properties?type=${encodeURIComponent(cat.name)}`} className="no-underline">
                            <button className="w-full py-5 px-3 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer transition-all text-center hover:border-blue-400 hover:bg-blue-50/50">
                                <div className="text-3xl mb-2.5">{cat.icon}</div>
                                <div className="font-['Outfit'] font-semibold text-slate-800 text-sm">{cat.name}</div>
                                <div className="text-slate-500 text-xs mt-1">{cat.count.toLocaleString()} listings</div>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
