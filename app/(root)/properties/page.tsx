"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data";
import PropertyCard from "@/components/PropertyCard";

const TYPES = ["Apartment", "Family House", "Bachelor Room", "Sublet", "Office", "Shop", "Commercial Space"];

function PropertiesContent() {
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        location: "",
        type: "",
        rentMin: "",
        rentMax: "",
        beds: "",
        furnished: "",
        sortBy: "newest",
    });
    const [view, setView] = useState<"grid" | "list">("grid");

    useEffect(() => {
        setFilters((f) => ({
            ...f,
            location: searchParams.get("location") || "",
            type: searchParams.get("type") || "",
            rentMin: searchParams.get("rentMin") || "",
            rentMax: searchParams.get("rentMax") || "",
            beds: searchParams.get("beds") || "",
        }));
    }, [searchParams]);

    const filtered = useMemo(() => {
        return properties
            .filter((p) => {
                if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase()) && !p.city.toLowerCase().includes(filters.location.toLowerCase()) && !p.area.toLowerCase().includes(filters.location.toLowerCase())) return false;
                if (filters.type && p.type !== filters.type) return false;
                if (filters.rentMin && p.rent < parseInt(filters.rentMin)) return false;
                if (filters.rentMax && p.rent > parseInt(filters.rentMax)) return false;
                if (filters.beds && p.beds < parseInt(filters.beds)) return false;
                if (filters.furnished && p.furnished !== filters.furnished) return false;
                return true;
            })
            .sort((a, b) => {
                if (filters.sortBy === "rent-asc") return a.rent - b.rent;
                if (filters.sortBy === "rent-desc") return b.rent - a.rent;
                return parseInt(b.id) - parseInt(a.id);
            });
    }, [filters]);

    const clearFilters = () => setFilters({ location: "", type: "", rentMin: "", rentMax: "", beds: "", furnished: "", sortBy: "newest" });
    const hasFilters = !!(filters.location || filters.type || filters.rentMin || filters.rentMax || filters.beds || filters.furnished);

    const sel = (key: string, val: string) => setFilters((f) => ({ ...f, [key]: val }));

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
                <h1 className="font-['Outfit'] text-28px font-bold text-[#0D1F3C] mb-1">Rental Properties in Bangladesh</h1>
                <p className="text-slate-500 text-sm m-0">
                    {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
                </p>
            </div>

            {/* Main filter bar */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-3.5 flex flex-wrap gap-2.5 items-center">
                <input placeholder="Search location, area, city..." value={filters.location} onChange={(e) => sel("location", e.target.value)} className="flex-1 min-w-50 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500" />
                <select value={filters.type} onChange={(e) => sel("type", e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500">
                    <option value="">All Types</option>
                    {TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <select value={filters.furnished} onChange={(e) => sel("furnished", e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500">
                    <option value="">Furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-furnished">Semi-furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                </select>
                <select value={filters.sortBy} onChange={(e) => sel("sortBy", e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500">
                    <option value="newest">Newest First</option>
                    <option value="rent-asc">Rent: Low to High</option>
                    <option value="rent-desc">Rent: High to Low</option>
                </select>
                <div className="flex gap-1.5">
                    {(["grid", "list"] as const).map((v) => (
                        <button key={v} onClick={() => setView(v)} className={`p-2 rounded-lg border cursor-pointer transition-colors ${view === v ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E]" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}>
                            {v === "grid" ? (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                    <line x1="8" y1="12" x2="21" y2="12" />
                                    <line x1="8" y1="18" x2="21" y2="18" />
                                    <line x1="3" y1="6" x2="3.01" y2="6" strokeLinecap="round" strokeWidth="3" />
                                    <line x1="3" y1="12" x2="3.01" y2="12" strokeLinecap="round" strokeWidth="3" />
                                    <line x1="3" y1="18" x2="3.01" y2="18" strokeLinecap="round" strokeWidth="3" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Advanced filters row */}
            <div className="flex gap-2.5 mb-6 flex-wrap items-center">
                <input type="number" placeholder="Min rent (৳)" value={filters.rentMin} onChange={(e) => sel("rentMin", e.target.value)} className="w-36 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500" />
                <input type="number" placeholder="Max rent (৳)" value={filters.rentMax} onChange={(e) => sel("rentMax", e.target.value)} className="w-36 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500" />
                <select value={filters.beds} onChange={(e) => sel("beds", e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none text-slate-700 bg-white focus:border-blue-500">
                    <option value="">Any Bedrooms</option>
                    {["1", "2", "3", "4"].map((n) => (
                        <option key={n} value={n}>
                            {n}+ Bed{n !== "1" ? "s" : ""}
                        </option>
                    ))}
                </select>
                {hasFilters && (
                    <button onClick={clearFilters} className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 text-red-500 text-sm cursor-pointer font-medium hover:bg-red-100 transition-colors">
                        ✕ Clear Filters
                    </button>
                )}
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 px-6 bg-white rounded-2xl border border-slate-200">
                    <div className="text-5xl mb-4">🏠</div>
                    <h3 className="font-['Outfit'] text-xl font-bold text-[#0D1F3C] mb-2">No properties found</h3>
                    <p className="text-slate-500 text-sm mb-5">Try adjusting your filters to see more results</p>
                    <button onClick={clearFilters} className="px-6 py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-semibold hover:bg-[#153f7e] transition-colors">
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "flex flex-col gap-3.5"}>
                    {filtered.map((p) => (
                        <PropertyCard key={p.id} property={p} view={view} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-center text-slate-500">Loading properties...</div>}>
            <PropertiesContent />
        </Suspense>
    );
}
