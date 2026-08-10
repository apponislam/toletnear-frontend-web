"use client";

interface StatCardProps {
    label: string;
    value: string;
    icon: string;
    note?: string;
    color?: string;
    textColor?: string;
}

export default function StatCard({ label, value, icon, note, color = "bg-[#EBF2FF]", textColor = "text-[#1A4F9E]" }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-slate-500 text-xs mb-2">{label}</div>
                    <div className="font-['Outfit'] text-28px font-bold text-[#0D1F3C]">{value}</div>
                    {note && <div className="text-[#0DB678] text-xs mt-1.5">{note}</div>}
                </div>
                <div className={`w-11.5 h-11.5 rounded-xl ${color} flex items-center justify-center text-22px ${textColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
