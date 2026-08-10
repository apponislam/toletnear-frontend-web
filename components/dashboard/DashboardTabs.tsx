"use client";

interface TabsProps {
    tabs: string[];
    active: string;
    setActive: (t: string) => void;
}

export default function DashboardTabs({ tabs, active, setActive }: TabsProps) {
    return (
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6.5 w-fit flex-wrap">
            {tabs.map((t) => (
                <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`px-4 py-2 rounded-lg border-none text-sm cursor-pointer transition-all ${
                        active === t
                            ? "bg-white text-[#1A4F9E] font-semibold shadow-xs"
                            : "bg-transparent text-slate-500 font-normal hover:text-slate-700"
                    }`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}
