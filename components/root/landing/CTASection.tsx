"use client";

import Link from "next/link";

export default function CTASection() {
    return (
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
    );
}
