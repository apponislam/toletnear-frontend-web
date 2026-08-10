"use client";

import { useState } from "react";
import Link from "next/link";
import type { Property } from "../data";

interface Props {
    property: Property;
    onClick?: (p: Property) => void;
    view?: "grid" | "list";
}

const Bed = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
    </svg>
);
const Bath = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" x2="8" y1="5" y2="7" />
        <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
);
const Area = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18M9 21V9" />
    </svg>
);
const Pin = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A4F9E" strokeWidth="2.5">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function PropertyCard({ property, onClick, view = "grid" }: Props) {
    const [saved, setSaved] = useState(false);
    const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

    const CardContent = (
        <>
            {view === "list" ? (
                <div className="flex bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer hover:shadow-lg transition-all">
                    <div className="w-55 shrink-0 relative bg-slate-200">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        {property.verified && <span className="absolute top-2.5 left-2.5 bg-[#0DB678] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">✓ Verified</span>}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start gap-3">
                                <h3 className="text-base font-semibold text-slate-800 m-0">{property.title}</h3>
                                <span className="font-['Outfit'] text-lg font-bold text-[#1A4F9E] whitespace-nowrap">
                                    {fmt(property.rent)}
                                    <span className="text-xs font-normal text-slate-400">/mo</span>
                                </span>
                            </div>
                            <p className="flex items-center gap-1 text-slate-500 text-xs mt-1.5 mb-0">
                                <Pin /> {property.location}
                            </p>
                        </div>
                        <div className="flex items-center gap-3.5 mt-3">
                            {property.beds > 0 && (
                                <span className="flex items-center gap-1.5 text-slate-700 text-xs">
                                    <Bed /> {property.beds} Beds
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-slate-700 text-xs">
                                <Bath /> {property.baths} Baths
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-700 text-xs">
                                <Area /> {property.sqft.toLocaleString()} sqft
                            </span>
                            <span className="ml-auto bg-[#EBF2FF] text-[#1A4F9E] text-xs font-medium px-2.5 py-0.5 rounded-full">{property.type}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="relative bg-slate-200 h-50">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                            {property.verified && <span className="bg-[#0DB678] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">✓ Verified</span>}
                            <span className="bg-black/50 text-white text-xs px-2.5 py-0.5 rounded-full">{property.type}</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSaved(!saved);
                            }}
                            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center transition-all hover:scale-110"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? "#EF4444" : "none"} stroke={saved ? "#EF4444" : "#6B7280"} strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-slate-800 mb-1.5 leading-snug line-clamp-1">{property.title}</h3>
                        <p className="flex items-center gap-1 text-slate-500 text-xs mb-2.5">
                            <Pin /> {property.location}
                        </p>
                        <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-100">
                            {property.beds > 0 && (
                                <span className="flex items-center gap-1 text-slate-500 text-xs">
                                    <Bed /> {property.beds}
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-slate-500 text-xs">
                                <Bath /> {property.baths}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500 text-xs">
                                <Area /> {property.sqft.toLocaleString()}
                            </span>
                            <span className="ml-auto font-['Outfit'] text-base font-bold text-[#1A4F9E]">
                                {fmt(property.rent)}
                                <span className="text-xs font-normal text-slate-400">/mo</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    if (onClick) {
        return <div onClick={() => onClick(property)}>{CardContent}</div>;
    }

    return (
        <Link href={`/properties/${property.id}`} className="no-underline text-inherit block">
            {CardContent}
        </Link>
    );
}
