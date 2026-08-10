"use client";

const TYPES = ["Apartment", "Family House", "Bachelor Room", "Sublet", "Office", "Shop", "Commercial Space"];

interface PropertyFilterBarProps {
    filters: {
        location: string;
        type: string;
        rentMin: string;
        rentMax: string;
        beds: string;
        furnished: string;
        sortBy: string;
    };
    sel: (key: string, val: string) => void;
    view: "grid" | "list";
    setView: (view: "grid" | "list") => void;
    hasFilters: boolean;
    clearFilters: () => void;
}

export default function PropertyFilterBar({ filters, sel, view, setView, hasFilters, clearFilters }: PropertyFilterBarProps) {
    return (
        <div>
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
        </div>
    );
}
