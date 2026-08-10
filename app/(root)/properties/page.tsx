"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data";
import PropertyFilterBar from "@/components/root/properties/PropertyFilterBar";
import PropertyGrid from "@/components/root/properties/PropertyGrid";

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

            <PropertyFilterBar filters={filters} sel={sel} view={view} setView={setView} hasFilters={hasFilters} clearFilters={clearFilters} />
            <PropertyGrid properties={filtered} view={view} clearFilters={clearFilters} />
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
