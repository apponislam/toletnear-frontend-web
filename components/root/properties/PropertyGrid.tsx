"use client";

import { Property } from "@/data";
import PropertyCard from "@/components/PropertyCard";

interface PropertyGridProps {
    properties: Property[];
    view: "grid" | "list";
    clearFilters: () => void;
}

export default function PropertyGrid({ properties, view, clearFilters }: PropertyGridProps) {
    if (properties.length === 0) {
        return (
            <div className="text-center py-20 px-6 bg-white rounded-2xl border border-slate-200">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="font-['Outfit'] text-xl font-bold text-[#0D1F3C] mb-2">No properties found</h3>
                <p className="text-slate-500 text-sm mb-5">Try adjusting your filters to see more results</p>
                <button onClick={clearFilters} className="px-6 py-2.5 rounded-lg border-none bg-[#1A4F9E] text-white cursor-pointer font-semibold hover:bg-[#153f7e] transition-colors">
                    Clear All Filters
                </button>
            </div>
        );
    }

    return (
        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "flex flex-col gap-3.5"}>
            {properties.map((p) => (
                <PropertyCard key={p.id} property={p} view={view} />
            ))}
        </div>
    );
}
