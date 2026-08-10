"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Building2,
    KeyRound,
    ShieldAlert,
    PlusCircle,
    Building,
    MessageSquare,
    Globe,
    ChevronLeft,
    ChevronRight,
    X,
    LucideIcon
} from "lucide-react";

interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
}

interface SidebarGroup {
    group: string;
    items: SidebarItem[];
}

interface AppSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export default function AppSidebar({
    sidebarOpen,
    setSidebarOpen,
    mobileOpen,
    setMobileOpen,
}: AppSidebarProps) {
    const pathname = usePathname();

    const sidebarItems: SidebarGroup[] = [
        {
            group: "PORTALS",
            items: [
                { label: "Owner Dashboard", href: "/owner-dash", icon: Building2 },
                { label: "Tenant Dashboard", href: "/tenant-dash", icon: KeyRound },
                { label: "Admin Portal", href: "/admin-dash", icon: ShieldAlert },
            ],
        },
        {
            group: "PROPERTY MANAGEMENT",
            items: [
                { label: "Post New Property", href: "/post-property", icon: PlusCircle },
                { label: "All Properties", href: "/properties", icon: Building, badge: "12" },
                { label: "Messages & Chats", href: "/messaging", icon: MessageSquare, badge: "2" },
            ],
        },
        {
            group: "WEBSITE ROUTE",
            items: [{ label: "Back to Public Site", href: "/", icon: Globe }],
        },
    ];

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
                />
            )}

            {/* App Sidebar Component */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shadow-lg lg:shadow-xs ${
                    mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
                } ${
                    sidebarOpen ? "lg:w-64" : "lg:w-20"
                }`}
            >
                {/* Brand Header */}
                <div className={`h-16 flex items-center px-4 border-b border-slate-100 ${
                    sidebarOpen ? "justify-between" : "justify-center relative"
                }`}>
                    <Link href="/" className="flex items-center gap-2.5 no-underline overflow-hidden shrink-0">
                        <div className="w-9 h-9 bg-[#1A4F9E] rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col">
                                <span className="font-['Outfit'] font-extrabold text-lg text-[#1A4F9E] leading-none">
                                    To<span className="text-[#0DB678]">Let</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Control Panel</span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Collapse Toggle Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`hidden lg:flex w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 items-center justify-center cursor-pointer transition-colors shrink-0 ${
                            sidebarOpen ? "" : "absolute -right-3 top-4 bg-white shadow-md z-10 w-6 h-6 border-slate-300"
                        }`}
                        title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        {sidebarOpen ? (
                            <ChevronLeft className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Sidebar Navigation Items */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {sidebarItems.map((group) => (
                        <div key={group.group}>
                            {sidebarOpen ? (
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                                    {group.group}
                                </div>
                            ) : (
                                <div className="h-px bg-slate-100 my-2" />
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const IconComponent = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all no-underline ${
                                                isActive
                                                    ? "bg-[#1A4F9E] text-white shadow-xs"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                            title={!sidebarOpen ? item.label : undefined}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComponent className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                                                {sidebarOpen && <span className="truncate">{item.label}</span>}
                                            </div>
                                            {sidebarOpen && item.badge && (
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                        isActive
                                                            ? "bg-white text-[#1A4F9E]"
                                                            : "bg-emerald-100 text-emerald-700"
                                                    }`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Profile Card */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="w-9 h-9 rounded-xl bg-[#1A4F9E] flex items-center justify-center font-bold text-white text-xs shrink-0">
                            MR
                        </div>
                        {sidebarOpen && (
                            <div className="overflow-hidden flex-1">
                                <h4 className="font-['Outfit'] font-bold text-xs text-slate-800 truncate">Md. Rafiqul</h4>
                                <p className="text-[10px] text-emerald-600 font-semibold truncate">Verified Owner & Tenant</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
