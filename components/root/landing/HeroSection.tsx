"use client";

import Link from "next/link";

const HERO_BG = "https://images.unsplash.com/photo-1765396576098-6a44270700d1?w=1600&h=900&fit=crop&auto=format";
const LOCATIONS = ["Dhaka", "Mirpur", "Uttara", "Dhanmondi", "Mohammadpur", "Bashundhara", "Chattogram", "Sylhet"];

const CATEGORIES = [
    { name: "Apartment", icon: "🏢", count: 1240 },
    { name: "Family House", icon: "🏠", count: 380 },
    { name: "Bachelor Room", icon: "🛏", count: 520 },
    { name: "Sublet", icon: "🔑", count: 290 },
    { name: "Office", icon: "💼", count: 180 },
    { name: "Shop", icon: "🏪", count: 95 },
    { name: "Commercial Space", icon: "🏗", count: 67 },
];

interface HeroSectionProps {
    search: { location: string; type: string; rentMin: string; rentMax: string; beds: string };
    setSearch: React.Dispatch<React.SetStateAction<{ location: string; type: string; rentMin: string; rentMax: string; beds: string }>>;
}

export default function HeroSection({ search, setSearch }: HeroSectionProps) {
    return (
        <section className="relative min-h-145 flex items-center overflow-hidden bg-[#0D1F3C]">
            <img src={HERO_BG} alt="Modern apartment building in Bangladesh" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0D1F3C]/95 to-[#1A4F9E]/75" />
            <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-[#0DB678]/20 border border-[#0DB678]/40 rounded-full px-3.5 py-1 mb-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0DB678]" />
                        <span className="text-[#0DB678] text-xs font-medium">{"Bangladesh's #1 Rental Marketplace"}</span>
                    </div>
                    <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                        Find Your Perfect
                        <br />
                        <span className="text-[#0DB678]">Place to Live</span>
                    </h1>
                    <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg mb-9">Discover flats, rooms, houses, and commercial properties for rent across Bangladesh. Verified listings, genuine owners.</p>
                </div>

                {/* Search box */}
                <div className="bg-white rounded-2xl p-6 shadow-2xl w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-3.5">
                        {[
                            { label: "Location", key: "location", opts: LOCATIONS, placeholder: "All Locations" },
                            { label: "Property Type", key: "type", opts: CATEGORIES.map((c) => c.name), placeholder: "All Types" },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">{f.label}</label>
                                <select value={(search as any)[f.key]} onChange={(e) => setSearch((s) => ({ ...s, [f.key]: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 outline-none focus:border-blue-500">
                                    <option value="">{f.placeholder}</option>
                                    {f.opts.map((o) => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Min Rent (৳)</label>
                            <input type="number" placeholder="0" value={search.rentMin} onChange={(e) => setSearch((s) => ({ ...s, rentMin: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Max Rent (৳)</label>
                            <input type="number" placeholder="100,000" value={search.rentMax} onChange={(e) => setSearch((s) => ({ ...s, rentMax: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Bedrooms</label>
                            <select value={search.beds} onChange={(e) => setSearch((s) => ({ ...s, beds: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-slate-50 outline-none focus:border-blue-500">
                                <option value="">Any</option>
                                {["1", "2", "3", "4"].map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                        {n === "4" ? "+" : ""} Bed{n !== "1" ? "s" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const params = new URLSearchParams();
                            if (search.location) params.set("location", search.location);
                            if (search.type) params.set("type", search.type);
                            if (search.rentMin) params.set("rentMin", search.rentMin);
                            if (search.rentMax) params.set("rentMax", search.rentMax);
                            if (search.beds) params.set("beds", search.beds);
                            const queryString = params.toString();
                            window.location.href = `/properties${queryString ? `?${queryString}` : ""}`;
                        }}
                        className="w-full py-3.5 rounded-xl border-none bg-[#1A4F9E] text-white text-base font-bold cursor-pointer font-['Outfit'] flex items-center justify-center gap-2 hover:bg-[#153f7e] transition-colors"
                    >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Search Properties
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-8 flex-wrap">
                    {[
                        ["10,000+", "Active Listings"],
                        ["50,000+", "Happy Tenants"],
                        ["5,000+", "Verified Owners"],
                    ].map(([num, label]) => (
                        <div key={label}>
                            <div className="text-[#0DB678] font-[#Outfit] font-extrabold text-2xl">{num}</div>
                            <div className="text-white/60 text-xs">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
