"use client";

import { useState, use } from "react";
import Link from "next/link";
import { properties } from "@/data";
import PropertyCard from "@/components/PropertyCard";

interface Props {
    params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: Props) {
    const { id } = use(params);
    const property = properties.find((p) => p.id === id) || properties[0];

    const [activeImg, setActiveImg] = useState(0);
    const [saved, setSaved] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const similar = properties.filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type)).slice(0, 3);
    const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

    const ordinal = (n: number) => {
        if (n === 1) return "1st";
        if (n === 2) return "2nd";
        if (n === 3) return "3rd";
        return `${n}th`;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-5 text-xs text-slate-500 flex-wrap">
                <Link href="/" className="no-underline text-[#1A4F9E] hover:underline">
                    Home
                </Link>
                <span>/</span>
                <Link href="/properties" className="no-underline text-[#1A4F9E] hover:underline">
                    Properties
                </Link>
                <span>/</span>
                <span className="max-w-65 truncate">{property.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start">
                {/* Left col */}
                <div>
                    {/* Gallery */}
                    <div className="rounded-2xl overflow-hidden bg-slate-200 h-105">
                        <img src={property.images[activeImg]} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                        {property.images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImg(i)} className={`w-21.5 h-16 rounded-lg overflow-hidden border-2 bg-slate-200 cursor-pointer p-0 shrink-0 transition-colors ${i === activeImg ? "border-[#1A4F9E]" : "border-transparent"}`}>
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Title */}
                    <div className="mt-6.5">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {property.verified && <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">✓ Verified</span>}
                            <span className="bg-[#EBF2FF] text-[#1A4F9E] text-xs font-medium px-2.5 py-0.5 rounded-full">{property.type}</span>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2.5 py-0.5 rounded-full">{property.furnished}</span>
                        </div>
                        <h1 className="font-['Outfit'] text-26px font-extrabold text-[#0D1F3C] mb-2.5 leading-tight">{property.title}</h1>
                        <p className="flex items-center gap-1.5 text-slate-500 text-sm m-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {property.location}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 rounded-2xl p-4.5 mt-5.5 mb-6.5 border border-slate-100">
                            {[
                                { label: "Bedrooms", value: property.beds > 0 ? `${property.beds} Beds` : "N/A", icon: "🛏" },
                                { label: "Bathrooms", value: `${property.baths} Baths`, icon: "🚿" },
                                { label: "Area", value: `${property.sqft.toLocaleString()} sqft`, icon: "📐" },
                                { label: "Floor", value: ordinal(property.floor), icon: "🏢" },
                            ].map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="text-2xl mb-1">{s.icon}</div>
                                    <div className="font-['Outfit'] font-semibold text-slate-800 text-sm">{s.value}</div>
                                    <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-6.5">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-3">Description</h3>
                            <p className="text-slate-700 leading-relaxed text-sm m-0">{property.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6.5">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-3.5">Amenities</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {property.amenities.map((a) => (
                                    <span key={a} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-medium">
                                        ✓ {a}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="mb-7">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-3">Location</h3>
                            <div className="bg-slate-100 rounded-2xl h-55 flex items-center justify-center border border-slate-300 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]" />
                                <div className="text-center relative bg-white/90 px-6 py-4 rounded-xl shadow-xs">
                                    <div className="text-3xl mb-1.5">📍</div>
                                    <div className="font-semibold text-slate-700 text-sm">{property.location}</div>
                                    <div className="text-slate-500 text-xs mt-1">Map integration available on request</div>
                                </div>
                            </div>
                        </div>

                        {/* Similar */}
                        {similar.length > 0 && (
                            <div>
                                <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-4">Similar Properties</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {similar.map((p) => (
                                        <PropertyCard key={p.id} property={p} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sticky top-20">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl">
                        <div className="mb-5">
                            <div className="font-['Outfit'] text-32px font-extrabold text-[#1A4F9E]">{fmt(property.rent)}</div>
                            <div className="text-slate-500 text-xs">per month</div>
                        </div>

                        {/* Owner card */}
                        <div className="flex items-center gap-2.5 mb-5 p-3.5 bg-slate-50 rounded-xl">
                            <img src={property.owner.image} alt={property.owner.name} className="w-12 h-12 rounded-full object-cover bg-slate-200 shrink-0" />
                            <div>
                                <div className="font-semibold text-slate-800 text-sm">{property.owner.name}</div>
                                <div className="text-slate-500 text-xs">{property.owner.role}</div>
                                {property.owner.verified && <span className="text-[#0DB678] text-xs font-semibold">✓ Verified</span>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2.5 mb-5">
                            <button onClick={() => setContactOpen(true)} className="w-full py-3.5 rounded-xl border-none bg-[#1A4F9E] text-white text-sm font-bold cursor-pointer font-['Outfit'] flex items-center justify-center gap-2 hover:bg-[#153f7e] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Call Owner
                            </button>
                            <Link href="/messaging" className="no-underline">
                                <button className="w-full py-3.5 rounded-xl border border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] text-sm font-semibold cursor-pointer hover:bg-blue-100/70 transition-colors">💬 Send Message</button>
                            </Link>
                            <button onClick={() => setSaved(!saved)} className={`w-full py-3.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${saved ? "border-red-400 bg-red-50 text-red-500" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                                {saved ? "❤️ Saved" : "🤍 Save Property"}
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="border-t border-slate-200 pt-4 mb-3.5">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ["Available", property.available],
                                    ["Floor", ordinal(property.floor)],
                                    ["Furnished", property.furnished],
                                    ["City", property.city],
                                ].map(([k, v]) => (
                                    <div key={k}>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">{k}</div>
                                        <div className="text-slate-800 text-xs font-medium">{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full py-2 rounded-lg border border-slate-200 bg-white text-slate-400 text-xs cursor-pointer flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors">🚩 Report this listing</button>
                    </div>
                </div>
            </div>

            {/* Contact modal */}
            {contactOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setContactOpen(false)}>
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-['Outfit'] text-xl font-bold mb-1">Owner Contact</h3>
                        <p className="text-slate-500 text-sm mb-5">Direct contact details for this property</p>
                        <div className="bg-slate-50 rounded-xl p-4 mb-5">
                            <div className="font-semibold text-slate-800 text-sm mb-1">{property.owner.name}</div>
                            <div className="text-slate-500 text-xs mb-2.5">
                                {property.owner.role} {property.owner.verified ? "✓ Verified" : ""}
                            </div>
                            <a href={`tel:${property.owner.phone}`} className="text-[#1A4F9E] text-base font-bold no-underline font-['Outfit']">
                                📞 {property.owner.phone}
                            </a>
                        </div>
                        <div className="flex gap-2.5">
                            <button onClick={() => setContactOpen(false)} className="flex-1 py-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer text-sm font-medium hover:bg-slate-50">
                                Close
                            </button>
                            <Link href="/messaging" className="flex-1 no-underline">
                                <button className="w-full py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer text-sm font-semibold hover:bg-[#153f7e]">Message</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
