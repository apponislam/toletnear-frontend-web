"use client";

export default function HowItWorksSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] text-center mb-1.5">How It Works</h2>
            <p className="text-slate-500 text-sm text-center mb-10">Find your next home in three simple steps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { step: "01", title: "Search a Property", desc: "Use our smart search filters to find properties matching your budget, location, and preferences across Bangladesh.", icon: "🔍" },
                    { step: "02", title: "Contact the Owner", desc: "Message or call the property owner or agent directly through our secure, verified platform.", icon: "📞" },
                    { step: "03", title: "Move Into Your New Place", desc: "Schedule a visit, finalize the deal, and move into your perfect new home with confidence.", icon: "🏠" },
                ].map((s) => (
                    <div key={s.step} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs relative overflow-hidden">
                        <div className="absolute -top-2 -right-1 font-['Outfit'] text-7xl font-extrabold text-blue-50/80 leading-none select-none pointer-events-none">{s.step}</div>
                        <div className="text-4xl mb-4">{s.icon}</div>
                        <h3 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-2.5">{s.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed m-0">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
