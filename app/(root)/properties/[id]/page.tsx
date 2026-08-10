"use client";

import { use } from "react";
import { properties } from "@/data";
import PropertyView from "@/components/root/properties/propertyView/PropertyView";

interface Props {
    params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: Props) {
    const { id } = use(params);
    const property = properties.find((p) => p.id === id) || properties[0];

    return <PropertyView property={property} />;
}
