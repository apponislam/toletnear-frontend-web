"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login Submitted:", data);
        router.push("/tenant-dash");
    };

    const getInputClass = (hasError: boolean) => `w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors font-sans text-slate-800 ${hasError ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-600"}`;

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

                    <h2 className="font-['Outfit'] text-22px font-bold text-[#0D1F3C] mb-1.5 mt-0">Welcome Back</h2>
                    <p className="text-slate-500 text-sm m-0">Sign in to your ToLet account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
                        <input type="email" placeholder="name@example.com" className={getInputClass(!!errors.email)} {...register("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1 mb-0">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-xs font-semibold text-slate-700">Password</label>
                            <Link href="/forgot-password" className="text-[#1A4F9E] text-xs no-underline font-medium hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <input type="password" placeholder="••••••••" className={getInputClass(!!errors.password)} {...register("password")} />
                        {errors.password && <p className="text-red-500 text-xs mt-1 mb-0">{errors.password.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 border-none bg-[#1A4F9E] text-white text-base font-bold cursor-pointer font-['Outfit'] mt-1 hover:bg-[#153f7e] transition-colors rounded-xl">
                        Sign In
                    </button>
                </form>

                <div className="text-center mt-5.5 text-sm text-slate-500">
                    <span>{"Don't have an account? "}</span>
                    <Link href="/register" className="text-[#1A4F9E] font-semibold no-underline hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
