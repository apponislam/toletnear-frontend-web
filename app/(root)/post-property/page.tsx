"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Building2,
    MapPin,
    DollarSign,
    Grid,
    CheckCircle2,
    Upload,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    ShieldCheck
} from "lucide-react";

export default function PostPropertyPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    // Form state with complete real-world property fields
    const [form, setForm] = useState({
        // Step 1: Basic Info
        title: "",
        type: "Apartment",
        purpose: "Rent", // Rent or Sublet
        city: "Dhaka",
        area: "Dhanmondi",
        address: "",

        // Step 2: Property Details & Specs
        rent: "",
        serviceCharge: "",
        deposit: "",
        availableFrom: "",
        beds: "3",
        baths: "2",
        balconies: "2",
        sqft: "1250",
        floor: "3",
        totalFloors: "7",
        furnished: "Semi-furnished",
        preferredTenant: "Family", // Family, Bachelor, Female, Any

        // Step 3: Amenities & Features
        amenities: [
            "Lift / Elevator",
            "24/7 Security",
            "Generator Backup",
            "Car Parking",
            "Gas Cylinder / Pipeline",
        ] as string[],

        // Step 4: Description & Photos
        description: "",
        imageUrls: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
        ] as string[],

        // Contact info
        ownerName: "Md. Rafiqul",
        ownerPhone: "+880 1712-345678",
        ownerEmail: "rafiqul@example.com",
    });

    const setField = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const toggleAmenity = (item: string) => {
        setForm((prev) => {
            const exists = prev.amenities.includes(item);
            return {
                ...prev,
                amenities: exists
                    ? prev.amenities.filter((a) => a !== item)
                    : [...prev.amenities, item],
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const availableAmenitiesList = [
        "Lift / Elevator",
        "24/7 Security & CCTV",
        "Generator Backup",
        "Car Parking",
        "Bike Parking",
        "Pipeline Gas",
        "Gas Cylinder",
        "WiFi Included",
        "Washing Machine",
        "Air Conditioner (AC)",
        "Balcony View",
        "WASA Water Line",
    ];

    const inputCls =
        "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#1A4F9E] focus:ring-1 focus:ring-[#1A4F9E] transition-all";

    if (submitted) {
        return (
            <div className="max-w-md mx-auto px-6 py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm">
                    🎉
                </div>
                <div className="space-y-2">
                    <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#0D1F3C]">
                        Property Submitted!
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                        Your property listing <span className="font-bold text-slate-700">&ldquo;{form.title || "Rental Unit"}&rdquo;</span> is submitted for verification and will be live within 24 hours.
                    </p>
                </div>
                <div className="pt-2 flex flex-col gap-3">
                    <Link href="/owner-dash" className="no-underline">
                        <button className="w-full py-3.5 rounded-xl bg-[#1A4F9E] hover:bg-[#153f7e] text-white font-bold text-sm cursor-pointer border-none shadow-md transition-all">
                            Go to Owner Dashboard
                        </button>
                    </Link>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setStep(1);
                        }}
                        className="w-full py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-all"
                    >
                        Post Another Property
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans">
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#1A4F9E] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> List Your Property
                </div>
                <h1 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-[#0D1F3C] tracking-tight">
                    Post a New Property Rental
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Complete all steps below to showcase your listing to thousands of verified tenants across Bangladesh.
                </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-8">
                <div className="grid grid-cols-4 gap-2 text-center relative">
                    {[
                        { stepNum: 1, title: "Basic Info", icon: Building2 },
                        { stepNum: 2, title: "Pricing & Specs", icon: DollarSign },
                        { stepNum: 3, title: "Amenities", icon: Grid },
                        { stepNum: 4, title: "Photos & Review", icon: Upload },
                    ].map((item) => {
                        const Icon = item.icon;
                        const isDone = step > item.stepNum;
                        const isCurrent = step === item.stepNum;
                        return (
                            <div
                                key={item.stepNum}
                                onClick={() => item.stepNum < step && setStep(item.stepNum)}
                                className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                                    isCurrent
                                        ? "text-[#1A4F9E] font-bold"
                                        : isDone
                                        ? "text-emerald-600 font-semibold"
                                        : "text-slate-400 font-medium"
                                }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                        isCurrent
                                            ? "bg-[#1A4F9E] text-white shadow-md shadow-blue-900/20"
                                            : isDone
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-slate-100 text-slate-400"
                                    }`}
                                >
                                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className="text-[11px] sm:text-xs hidden sm:inline">{item.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Form Wrapper */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                {/* STEP 1: BASIC INFO */}
                {step === 1 && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">
                                Step 1: Basic Property Information
                            </h3>
                            <p className="text-slate-400 text-xs mt-0.5">Title, property category, location details</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Property Title *
                            </label>
                            <input
                                required
                                placeholder="e.g. Modern 3 BHK Apartment with Lake View in Dhanmondi"
                                value={form.title}
                                onChange={(e) => setField("title", e.target.value)}
                                className={inputCls}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Property Type
                                </label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setField("type", e.target.value)}
                                    className={inputCls}
                                >
                                    {[
                                        "Apartment",
                                        "Family House",
                                        "Bachelor Room",
                                        "Sublet",
                                        "Office Space",
                                        "Shop / Commercial",
                                    ].map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Listing Purpose
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Rent", "Sublet"].map((p) => (
                                        <button
                                            type="button"
                                            key={p}
                                            onClick={() => setField("purpose", p)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                                                form.purpose === p
                                                    ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E]"
                                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    City *
                                </label>
                                <select
                                    value={form.city}
                                    onChange={(e) => setField("city", e.target.value)}
                                    className={inputCls}
                                >
                                    {[
                                        "Dhaka",
                                        "Chattogram",
                                        "Sylhet",
                                        "Rajshahi",
                                        "Khulna",
                                        "Barishal",
                                        "Rangpur",
                                        "Mymensingh",
                                    ].map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Area / Neighborhood *
                                </label>
                                <input
                                    required
                                    placeholder="e.g. Dhanmondi, Mirpur DOHS, Uttara Sector 4"
                                    value={form.area}
                                    onChange={(e) => setField("area", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Full Address / House No (Optional)
                            </label>
                            <input
                                placeholder="e.g. House #12, Road #27, Block C"
                                value={form.address}
                                onChange={(e) => setField("address", e.target.value)}
                                className={inputCls}
                            />
                        </div>
                    </div>
                )}

                {/* STEP 2: PRICING & SPECS */}
                {step === 2 && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">
                                Step 2: Pricing & Technical Specs
                            </h3>
                            <p className="text-slate-400 text-xs mt-0.5">Rent cost, deposit, rooms, sqft, and tenant preference</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Monthly Rent (৳) *
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder="25000"
                                    value={form.rent}
                                    onChange={(e) => setField("rent", e.target.value)}
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Service Charge / Bill (৳)
                                </label>
                                <input
                                    type="number"
                                    placeholder="3500"
                                    value={form.serviceCharge}
                                    onChange={(e) => setField("serviceCharge", e.target.value)}
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Advance / Deposit (৳)
                                </label>
                                <input
                                    type="number"
                                    placeholder="50000"
                                    value={form.deposit}
                                    onChange={(e) => setField("deposit", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Bedrooms
                                </label>
                                <select
                                    value={form.beds}
                                    onChange={(e) => setField("beds", e.target.value)}
                                    className={inputCls}
                                >
                                    {["1", "2", "3", "4", "5+"].map((n) => (
                                        <option key={n} value={n}>
                                            {n} Beds
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Baths
                                </label>
                                <select
                                    value={form.baths}
                                    onChange={(e) => setField("baths", e.target.value)}
                                    className={inputCls}
                                >
                                    {["1", "2", "3", "4+"].map((n) => (
                                        <option key={n} value={n}>
                                            {n} Baths
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Floor Level
                                </label>
                                <input
                                    type="number"
                                    placeholder="3"
                                    value={form.floor}
                                    onChange={(e) => setField("floor", e.target.value)}
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Area (Sqft)
                                </label>
                                <input
                                    type="number"
                                    placeholder="1250"
                                    value={form.sqft}
                                    onChange={(e) => setField("sqft", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Furnishing Status
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Unfurnished", "Semi-furnished", "Furnished"].map((f) => (
                                        <button
                                            type="button"
                                            key={f}
                                            onClick={() => setField("furnished", f)}
                                            className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                                form.furnished === f
                                                    ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E]"
                                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Preferred Tenant Type
                                </label>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {["Family", "Bachelor", "Female", "Any"].map((pt) => (
                                        <button
                                            type="button"
                                            key={pt}
                                            onClick={() => setField("preferredTenant", pt)}
                                            className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                                form.preferredTenant === pt
                                                    ? "border-[#0DB678] bg-emerald-50 text-[#0DB678]"
                                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                        >
                                            {pt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: AMENITIES */}
                {step === 3 && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">
                                Step 3: Select Amenities & Features
                            </h3>
                            <p className="text-slate-400 text-xs mt-0.5">Check all facilities available with this rental property</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {availableAmenitiesList.map((item) => {
                                const isChecked = form.amenities.includes(item);
                                return (
                                    <div
                                        key={item}
                                        onClick={() => toggleAmenity(item)}
                                        className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                                            isChecked
                                                ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E]"
                                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="accent-[#1A4F9E] w-4 h-4 rounded-md"
                                        />
                                        <span>{item}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* STEP 4: PHOTOS & DESCRIPTION */}
                {step === 4 && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C]">
                                Step 4: Description & Photos
                            </h3>
                            <p className="text-slate-400 text-xs mt-0.5">Provide detailed overview and photos of your property</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Detailed Property Description *
                            </label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Describe key features, nearby schools/hospitals, security details, utility bills policy, etc."
                                value={form.description}
                                onChange={(e) => setField("description", e.target.value)}
                                className={`${inputCls} resize-y`}
                            />
                        </div>

                        {/* Image Preview & Upload placeholder */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Upload Property Photos
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                                {form.imageUrls.map((url, idx) => (
                                    <div key={idx} className="relative rounded-2xl overflow-hidden h-28 border border-slate-200 shadow-xs">
                                        <img src={url} alt="Property" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="border-2 border-dashed border-slate-300 rounded-2xl h-28 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors p-2 text-center">
                                    <Upload className="w-6 h-6 mb-1 text-[#1A4F9E]" />
                                    <span className="text-[10px] font-bold text-[#1A4F9E]">Add More Photos</span>
                                </div>
                            </div>
                        </div>

                        {/* Verification Notice */}
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>
                                Your property will be instantly checked by our automated land-registry system before publishing live.
                            </span>
                        </div>
                    </div>
                )}

                {/* Stepper Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Previous Step
                        </button>
                    ) : <div />}

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-3.5 rounded-xl bg-[#1A4F9E] hover:bg-[#153f7e] text-white text-xs font-bold border-none cursor-pointer shadow-md transition-all flex items-center gap-2"
                        >
                            Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-8 py-3.5 rounded-xl bg-[#0DB678] hover:bg-[#0a9864] text-white text-xs font-bold border-none cursor-pointer shadow-lg shadow-emerald-950/20 transition-all flex items-center gap-2"
                        >
                            <span>Submit Property Listing</span>
                            <CheckCircle2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
