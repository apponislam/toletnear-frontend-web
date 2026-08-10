"use client";

import Link from "next/link";
import { Property } from "@/data";
import PropertyCard from "@/components/PropertyCard";

interface FeaturedPropertiesSectionProps {
    properties: Property[];
}

export default function FeaturedPropertiesSection({ properties }: FeaturedPropertiesSectionProps) {
    return (
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
                {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </section>
    );
}
