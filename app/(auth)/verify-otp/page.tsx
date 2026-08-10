"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP code must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP code must be numbers only"),
});

function VerifyOtpContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "your email";

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        setError(null);
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        setError(null);
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pastedData) return;
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);
        const nextFocusIndex = Math.min(pastedData.length, 5);
        otpRefs.current[nextFocusIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        const result = otpSchema.safeParse({ otp: otpCode });

        if (!result.success) {
            setError(result.error.issues[0]?.message || "Invalid OTP code");
            return;
        }

        router.push("/reset-password");
    };

    return (
        <div className="w-full">
            <div className="py-6">
                <div className="text-center mb-7">
                    {/* Logo Header */}
                    <div className="mb-5">
                        <Link href="/" className="inline-flex items-center gap-2 no-underline">
                            <div className="w-9 h-9 bg-[#1A4F9E] rounded-xl flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                                </svg>
                            </div>
                            <span className="font-['Outfit'] font-extrabold text-2xl text-[#1A4F9E] tracking-tight">
                                To<span className="text-[#0DB678]">Let</span>
                            </span>
                        </Link>
                    </div>

                    <h2 className="font-['Outfit'] text-22px font-bold text-[#0D1F3C] mb-1.5 mt-0">Verify OTP Code</h2>
                    <p className="text-slate-500 text-sm m-0">
                        Enter the 6-digit OTP sent to <span className="font-semibold text-slate-800">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-3 text-center">Enter 6-Digit OTP Code</label>
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        otpRefs.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    onPaste={handleOtpPaste}
                                    className={`w-11 h-12.5 rounded-xl border-2 text-center text-xl font-bold outline-none transition-all ${
                                        error ? "border-red-500 bg-white text-red-500" : digit ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E]" : "border-slate-200 bg-white text-slate-800 focus:border-[#1A4F9E]"
                                    }`}
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500 text-xs mt-2 text-center mb-0">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={otp.join("").length < 6}
                        className={`w-full py-3 rounded-xl border-none text-white text-base font-bold font-['Outfit'] mt-2 transition-colors ${otp.join("").length === 6 ? "bg-[#1A4F9E] cursor-pointer hover:bg-[#153f7e]" : "bg-slate-400 cursor-not-allowed"}`}
                    >
                        Verify Code
                    </button>
                </form>

                <div className="text-center mt-5.5 text-sm text-slate-500">
                    <Link href="/forgot-password" className="text-[#1A4F9E] font-medium no-underline hover:underline">
                        ← Resend or change email
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="text-center py-6 text-slate-500">Loading...</div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
