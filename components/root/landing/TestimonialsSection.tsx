"use client";

const TESTIMONIALS = [
    {
        name: "Farida Khatun",
        role: "Tenant, Dhaka",
        text: "Found my dream apartment in Bashundhara within 3 days. The process was smooth and the owner was genuine. Highly recommend ToLet!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&auto=format",
    },
    {
        name: "Rajib Ahmed",
        role: "Property Owner, Chattogram",
        text: "Listed my property and received genuine tenant inquiries within hours. The dashboard makes it easy to manage everything from one place.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format",
    },
    {
        name: "Shahnaz Parvin",
        role: "Tenant, Sylhet",
        text: "The search filters are incredibly useful. I could narrow down to exactly what I needed — furnished, 2 beds, near city center. Found the perfect place!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] text-center mb-1.5">What Our Users Say</h2>
            <p className="text-slate-500 text-sm text-center mb-9">Trusted by thousands of tenants and property owners across Bangladesh</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {TESTIMONIALS.map((t) => (
                    <div key={t.name} className="bg-white rounded-2xl p-6.5 border border-slate-200 shadow-xs">
                        <div className="flex gap-1 mb-3.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-base ${i < t.rating ? "text-amber-400" : "text-slate-200"}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-4.5">"{t.text}"</p>
                        <div className="flex items-center gap-2.5">
                            <img src={t.image} alt={t.name} className="w-10.5 h-10.5 rounded-full object-cover bg-slate-200" />
                            <div>
                                <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                                <div className="text-slate-500 text-xs">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
