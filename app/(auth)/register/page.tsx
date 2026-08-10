"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
    .object({
        name: z.string().min(2, "Full name must be at least 2 characters"),
        phone: z.string().min(11, "Phone number must be at least 11 digits"),
        role: z.enum(["tenant", "owner", "admin"]),
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            phone: "",
            role: "tenant",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const currentRole = watch("role");

    const onSubmit = (data: RegisterFormValues) => {
        console.log("Register Submitted:", data);
        if (data.role === "admin") router.push("/admin-dash");
        else if (data.role === "owner") router.push("/owner-dash");
        else router.push("/tenant-dash");
    };

    const getInputClass = (hasError: boolean) => `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors font-sans text-slate-800 ${hasError ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-600"}`;

    return (
        <div className="w-full">
            <div className="py-6">
                <div className="text-center mb-6">
                    {/* Logo Header */}
                    <div className="mb-4.5">
                        <Link href="/" className="inline-flex items-center gap-2 no-underline">
                            <div className="w-8.5 h-8.5 bg-[#1A4F9E] rounded-xl flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <rect x="9" y="12" width="6" height="10" fill="white" rx="1" />
                                </svg>
                            </div>
                            <span className="font-['Outfit'] font-extrabold text-22px text-[#1A4F9E] tracking-tight">
                                To<span className="text-[#0DB678]">Let</span>
                            </span>
                        </Link>
                    </div>

                    <h2 className="font-['Outfit'] text-xl font-bold text-[#0D1F3C] mb-1 mt-0">Create Account</h2>
                    <p className="text-slate-500 text-xs m-0">{"Join Bangladesh's largest rental marketplace"}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                        <input placeholder="Md. Rafiqul Islam" className={getInputClass(!!errors.name)} {...register("name")} />
                        {errors.name && <p className="text-red-500 text-xs mt-1 mb-0">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                        <input placeholder="01700-000000" className={getInputClass(!!errors.phone)} {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 mb-0">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">I am a...</label>
                        <div className="grid grid-cols-3 gap-1.5">
                            {(
                                [
                                    ["tenant", "🏠 Tenant"],
                                    ["owner", "🔑 Owner"],
                                    ["admin", "⚙️ Agent"],
                                ] as const
                            ).map(([role, label]) => (
                                <button
                                    type="button"
                                    key={role}
                                    onClick={() => setValue("role", role)}
                                    className={`py-2 px-1 rounded-lg border text-xs cursor-pointer transition-colors ${currentRole === role ? "border-[#1A4F9E] bg-[#EBF2FF] text-[#1A4F9E] font-semibold" : "border-slate-200 bg-white text-slate-700 font-normal hover:bg-slate-50"}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                        <input type="email" placeholder="name@example.com" className={getInputClass(!!errors.email)} {...register("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1 mb-0">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                        <input type="password" placeholder="••••••••" className={getInputClass(!!errors.password)} {...register("password")} />
                        {errors.password && <p className="text-red-500 text-xs mt-1 mb-0">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm Password</label>
                        <input type="password" placeholder="••••••••" className={getInputClass(!!errors.confirmPassword)} {...register("confirmPassword")} />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 mb-0">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl border-none bg-[#1A4F9E] text-white text-sm font-bold cursor-pointer font-['Outfit'] mt-1 hover:bg-[#153f7e] transition-colors">
                        Create Account
                    </button>
                </form>

                <div className="text-center mt-4.5 text-xs text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#1A4F9E] font-semibold no-underline hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
