"use client";

import { useState } from "react";
import { properties } from "@/data";
import HeroSection from "@/components/root/landing/HeroSection";
import PopularLocationsSection from "@/components/root/landing/PopularLocationsSection";
import FeaturedPropertiesSection from "@/components/root/landing/FeaturedPropertiesSection";
import PropertyTypesSection from "@/components/root/landing/PropertyTypesSection";
import HowItWorksSection from "@/components/root/landing/HowItWorksSection";
import CTASection from "@/components/root/landing/CTASection";
import TestimonialsSection from "@/components/root/landing/TestimonialsSection";

export default function HomePage() {
    const [search, setSearch] = useState({ location: "", type: "", rentMin: "", rentMax: "", beds: "" });
    const featured = properties.slice(0, 6);

    return (
        <div>
            <HeroSection search={search} setSearch={setSearch} />
            <PopularLocationsSection />
            <FeaturedPropertiesSection properties={featured} />
            <PropertyTypesSection />
            <HowItWorksSection />
            <CTASection />
            <TestimonialsSection />
        </div>
    );
}
