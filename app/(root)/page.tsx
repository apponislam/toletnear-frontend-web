"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "../../data";
import PropertyCard from "../../components/PropertyCard";

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

const TESTIMONIALS = [
    {
        name: "Farida Khatun",
        role: "Tenant, Dhaka",
        text: "Found my dream apartment in Bashundhara within 3 days. The process was smooth and the owner was genuine. Highly recommend ToLet!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&auto=format",
    },
    {
        name: "Rajib Ahmed",
        role: "Property Owner, Chattogram",
        text: "Listed my property and received genuine tenant inquiries within hours. The dashboard makes it easy to manage everything from one place.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format",
    },
    {
        name: "Shahnaz Parvin",
        role: "Tenant, Sylhet",
        text: "The search filters are incredibly useful. I could narrow down to exactly what I needed — furnished, 2 beds, near city center. Found the perfect place!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    },
];

export default function HomePage() {
    const [search, setSearch] = useState({ location: "", type: "", rentMin: "", rentMax: "", beds: "" });
    const featured = properties.slice(0, 6);

    return (
        <div>
            {/* Hero */}
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
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl">
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
                                <div className="text-[#0DB678] font-['Outfit'] font-extrabold text-2xl">{num}</div>
                                <div className="text-white/60 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Locations */}
            <section className="max-w-7xl mx-auto px-6 pt-12">
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-1.5">Popular Locations</h2>
                <p className="text-slate-500 text-sm mb-5.5">{"Explore rental properties in Bangladesh's most sought-after areas"}</p>
                <div className="flex flex-wrap gap-2.5">
                    {LOCATIONS.map((loc) => (
                        <Link key={loc} href={`/properties?location=${encodeURIComponent(loc)}`} className="no-underline">
                            <button className="px-5 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium cursor-pointer transition-all flex items-center gap-1.5 hover:border-blue-400 hover:text-blue-700">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {loc}
                            </button>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Properties */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-1">Featured Properties</h2>
                        <p className="text-slate-500 text-sm m-0">Hand-picked verified listings for you</p>
                    </div>
                    <Link href="/properties" className="no-underline">
                        <button className="px-5 py-2 rounded-lg border border-[#1A4F9E] bg-white text-[#1A4F9E] text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-blue-50 transition-colors">View All →</button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featured.map((p) => (
                        <PropertyCard key={p.id} property={p} />
                    ))}
                </div>
            </section>

            {/* Browse by Type */}
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

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] text-center mb-1.5">How It Works</h2>
                <p className="text-slate-500 text-sm text-center mb-10">Find your next home in three simple steps</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { step: "01", title: "Search a Property", desc: "Use our smart search filters to find properties matching your budget, location, and preferences across Bangladesh.", icon: "🔍" },
                        { step: "02", title: "Contact the Owner", desc: "Message or call the property owner or agent directly through our secure, verified platform.", icon: "📞" },
                        { step: "03", title: "Move Into Your New Place", desc: "Schedule a visit, finalize the deal, and move into your perfect new home with confidence.", icon: "🏠" },
                    ].map((s) => (
                        <div key={s.step} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs relative overflow-hidden">
                            <div className="absolute -top-2 -right-1 font-['Outfit'] text-7xl font-extrabold text-blue-50/80 leading-none select-none pointer-events-none">{s.step}</div>
                            <div className="text-4xl mb-4">{s.icon}</div>
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-2.5">{s.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed m-0">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-linear-to-r from-[#0D1F3C] to-[#1A4F9E] py-14 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
                    <div>
                        <h2 className="font-['Outfit'] text-3xl font-extrabold text-white mb-3">Have a property for rent?</h2>
                        <p className="text-white/70 text-base mb-6 max-w-xl leading-relaxed">List your property on ToLet and reach thousands of genuine tenants. Verification, messaging, and dashboard included — all free to start.</p>
                        <div className="flex gap-3 flex-wrap">
                            <Link href="/post-property" className="no-underline">
                                <button className="px-7 py-3 rounded-xl border-none bg-[#0DB678] text-white text-sm font-bold cursor-pointer font-['Outfit'] hover:bg-[#0a9864] transition-colors">Post Your Property</button>
                            </Link>
                            <Link href="/register" className="no-underline">
                                <button className="px-7 py-3 rounded-xl border border-white/35 bg-transparent text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors">Learn More</button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-7 flex-wrap">
                        {[
                            ["৳0", "Free to List"],
                            ["48h", "Fast Approval"],
                            ["24/7", "Support"],
                        ].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="font-['Outfit'] text-3xl font-extrabold text-[#0DB678]">{val}</div>
                                <div className="text-white/60 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] text-center mb-1.5">What Our Users Say</h2>
                <p className="text-slate-500 text-sm text-center mb-9">Trusted by thousands of tenants and property owners across Bangladesh</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className="bg-white rounded-2xl p-6.5 border border-slate-200 shadow-xs">
                            <div className="flex gap-1 mb-3.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={`text-base ${i < t.rating ? "text-amber-400" : "text-slate-200"}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed mb-4.5">"{t.text}"</p>
                            <div className="flex items-center gap-2.5">
                                <img src={t.image} alt={t.name} className="w-10.5 h-10.5 rounded-full object-cover bg-slate-200" />
                                <div>
                                    <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                                    <div className="text-slate-500 text-xs">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
