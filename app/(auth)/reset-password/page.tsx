"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const resetSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: ResetFormValues) => {
        console.log("Reset Password Submitted:", data);
        setSuccess(true);
    };

    const getInputClass = (hasError: boolean) => `w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors font-sans text-slate-800 ${hasError ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-600"}`;

    if (success)
        return (
            <div className="w-full text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="font-['Outfit'] text-2xl font-bold text-[#0D1F3C] mb-2">Password Reset Successful!</h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">Your password has been updated successfully. You can now login with your new password.</p>
                <Link href="/login" className="no-underline">
                    <button className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white font-semibold text-sm cursor-pointer hover:bg-[#153f7e] transition-colors">Sign In Now</button>
                </Link>
            </div>
        );

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

                    <h2 className="font-['Outfit'] text-22px font-bold text-[#0D1F3C] mb-1.5 mt-0">Set New Password</h2>
                    <p className="text-slate-500 text-sm m-0">Create a new secure password for your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">New Password</label>
                        <input type="password" placeholder="••••••••" className={getInputClass(!!errors.newPassword)} {...register("newPassword")} />
                        {errors.newPassword && <p className="text-red-500 text-xs mt-1 mb-0">{errors.newPassword.message}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Repeat New Password</label>
                        <input type="password" placeholder="••••••••" className={getInputClass(!!errors.confirmPassword)} {...register("confirmPassword")} />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 mb-0">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white text-base font-bold cursor-pointer font-['Outfit'] mt-1 hover:bg-[#153f7e] transition-colors">
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-5.5 text-sm text-slate-500">
                    <Link href="/login" className="text-[#1A4F9E] font-medium no-underline hover:underline">
                        ← Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
