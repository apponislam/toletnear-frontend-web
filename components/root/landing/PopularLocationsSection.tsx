"use client";

import Link from "next/link";

const LOCATIONS = ["Dhaka", "Mirpur", "Uttara", "Dhanmondi", "Mohammadpur", "Bashundhara", "Chattogram", "Sylhet"];

export default function PopularLocationsSection() {
    return (
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
    );
}
