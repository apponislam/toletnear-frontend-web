"use client";

import { useState } from "react";

export default function PostPropertyPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        title: "",
        type: "Apartment",
        rent: "",
        location: "",
        city: "Dhaka",
        beds: "2",
        baths: "2",
        sqft: "",
        floor: "3",
        furnished: "Unfurnished",
        description: "",
    });

    const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm outline-none text-slate-800 bg-white focus:border-blue-500 transition-colors";

    if (submitted)
        return (
            <div className="max-w-md mx-auto px-6 py-20 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-2">Property Posted Successfully!</h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">Your property listing has been submitted for review. It will be live on ToLet within 24 hours after verification.</p>
                <a href="/owner-dash" className="no-underline">
                    <button className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white font-semibold text-sm cursor-pointer hover:bg-[#153f7e] transition-colors">Go to Dashboard</button>
                </a>
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="font-['Outfit'] text-28px font-bold text-[#0D1F3C] mb-1">Post a New Property</h1>
                <p className="text-slate-500 text-sm m-0">Fill in the details below to list your rental property on ToLet</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
                <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Property Title *</label>
                    <input required placeholder="e.g. Modern 3 BHK Apartment in Dhanmondi" value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Property Type</label>
                        <select value={form.type} onChange={(e) => setField("type", e.target.value)} className={inputCls}>
                            {["Apartment", "Family House", "Bachelor Room", "Sublet", "Office", "Shop", "Commercial Space"].map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Monthly Rent (৳) *</label>
                        <input required type="number" placeholder="25000" value={form.rent} onChange={(e) => setField("rent", e.target.value)} className={inputCls} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Area / Road / Landmark *</label>
                        <input required placeholder="e.g. Road 27, Dhanmondi" value={form.location} onChange={(e) => setField("location", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">City</label>
                        <select value={form.city} onChange={(e) => setField("city", e.target.value)} className={inputCls}>
                            {["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"].map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Bedrooms</label>
                        <select value={form.beds} onChange={(e) => setField("beds", e.target.value)} className={inputCls}>
                            {["0", "1", "2", "3", "4", "5+"].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Bathrooms</label>
                        <select value={form.baths} onChange={(e) => setField("baths", e.target.value)} className={inputCls}>
                            {["1", "2", "3", "4+"].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Floor Level</label>
                        <input type="number" placeholder="3" value={form.floor} onChange={(e) => setField("floor", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Total Sqft</label>
                        <input type="number" placeholder="1250" value={form.sqft} onChange={(e) => setField("sqft", e.target.value)} className={inputCls} />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Furnishing Status</label>
                    <div className="grid grid-cols-3 gap-2.5">
                        {["Unfurnished", "Semi-furnished", "Furnished"].map((f) => (
                            <button
                                type="button"
                                key={f}
                                onClick={() => setField("furnished", f)}
                                className={`py-2 rounded-lg border text-xs cursor-pointer transition-colors ${form.furnished === f ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] font-semibold" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Description</label>
                    <textarea rows={4} placeholder="Describe your property, nearby facilities, rules, etc." value={form.description} onChange={(e) => setField("description", e.target.value)} className={`${inputCls} resize-y`} />
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl border-none bg-[#1A4F9E] text-white text-base font-bold cursor-pointer font-['Outfit'] mt-2 hover:bg-[#153f7e] transition-colors">
                    Submit Property Listing
                </button>
            </form>
        </div>
    );
}
