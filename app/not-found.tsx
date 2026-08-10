"use client";

import Link from "next/link";
import { Home, Search, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D1F3C] text-white px-6 py-16 font-sans relative overflow-hidden">
            {/* Background Decorative Blur Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1A4F9E]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0DB678]/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

            <div className="relative max-w-xl w-full text-center space-y-8">
                {/* Floating Animated Graphic */}
                <div className="relative inline-flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md animate-bounce duration-1000">
                        <Compass className="w-16 h-16 text-[#0DB678] animate-spin [animation-duration:12s]" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 to-pink-500 text-white font-extrabold text-sm px-3.5 py-1 rounded-full shadow-lg border border-white/20">404</span>
                </div>

                {/* Animated Typography */}
                <div className="space-y-3">
                    <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-[#0DB678] bg-clip-text text-transparent">Lost in Space?</h1>
                    <p className="text-white/70 text-base max-w-md mx-auto leading-relaxed">The page you are looking for has been moved, deleted, or doesn&apos;t exist.</p>
                </div>

                {/* Full-width Animated Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <Link href="/" className="w-full sm:w-auto no-underline">
                        <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0DB678] hover:bg-[#0a9864] text-white text-sm font-bold font-['Outfit'] border-none cursor-pointer shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                            <Home className="w-4 h-4" />
                            <span>Return to Home</span>
                        </button>
                    </Link>
                    <Link href="/properties" className="w-full sm:w-auto no-underline">
                        <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-bold font-['Outfit'] cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                            <Search className="w-4 h-4" />
                            <span>Browse Properties</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
