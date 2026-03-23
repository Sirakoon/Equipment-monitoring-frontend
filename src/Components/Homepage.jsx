import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LogIn,
    Server,
    Database,
    RefreshCw,
    ShieldCheck,
    Cpu,
    Wrench,
    AlertTriangle,
    Package,
    FileBarChart2,
    Users,
    Activity,
    ClipboardList,
    ChevronRight,
} from "lucide-react";
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import LoginModal from "./LoginModal";

function Homepage() {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const infraCards = [
        {
            title: "API Status",
            value: "Online",
            sub: "All services operational",
            icon: <Server size={20} />,
            color: "emerald",
        },
        {
            title: "Database",
            value: "Connected",
            sub: "MSSQL connection healthy",
            icon: <Database size={20} />,
            color: "sky",
        },
        {
            title: "Last Sync",
            value: "2 min ago",
            sub: "Latest equipment update",
            icon: <RefreshCw size={20} />,
            color: "amber",
        },
        {
            title: "Auth Service",
            value: "Secure",
            sub: "JWT authentication active",
            icon: <ShieldCheck size={20} />,
            color: "purple",
        },
    ];

    const kpiCards = [
        {
            title: "Total Equipment",
            value: "128",
            sub: "Registered in master data",
            icon: <Cpu size={20} />,
            color: "sky",
        },
        {
            title: "Open Work Orders",
            value: "14",
            sub: "Maintenance tasks in progress",
            icon: <Wrench size={20} />,
            color: "green",
        },
        {
            title: "Breakdown Today",
            value: "4",
            sub: "Failure logs reported today",
            icon: <AlertTriangle size={20} />,
            color: "rose",
        },
        {
            title: "Low Stock Parts",
            value: "6",
            sub: "Inventory below threshold",
            icon: <Package size={20} />,
            color: "orange",
        },
    ];

    const modules = [
        {
            label: "Equipment Master",
            desc: "Manage equipment data, machine profile, and asset records",
            icon: <ClipboardList size={20} />,
            path: "/Equipments-List",
        },
        {
            label: "Maintenance Records",
            desc: "Track preventive and corrective maintenance history",
            icon: <Wrench size={20} />,
            path: "/Maintenance-Plan",
        },
        {
            label: "Failure Logs",
            desc: "Store breakdown events, root cause, and downtime records",
            icon: <AlertTriangle size={20} />,
            path: "/Breakdown-History",
        },
        {
            label: "Inventory Control",
            desc: "Monitor spare parts stock, usage, and reorder points",
            icon: <Package size={20} />,
            path: "/Spare-Parts",
        },
        {
            label: "Reports & Analytics",
            desc: "Generate dashboard views and backend-driven operational reports",
            icon: <FileBarChart2 size={20} />,
            path: "/Reports",
        },
        {
            label: "User Access Control",
            desc: "Manage authentication, roles, and access permissions",
            icon: <Users size={20} />,
            path: "/User-Management",
        },
    ];

    const activities = [
        "EQ-102 status updated from Running to Breakdown",
        "Work Order WO-2026-014 created for Compressor-03",
        "Bearing stock adjusted by -2 units",
        "PM checklist completed for SMT Line 2",
        "New user role assigned to maintenance supervisor",
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-6 transition-colors duration-500">
            <div className="mx-auto w-full max-w-7xl bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-xl p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-2">
                            Backend System Overview
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-zinc-100">
                            Equipment Management Platform
                        </h1>
                        <p className="text-gray-500 dark:text-zinc-400 mt-3 max-w-3xl">
                            API-driven platform for equipment master data, maintenance records,
                            failure logs, spare parts inventory, and operational reporting.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-4xl bg-black dark:bg-white border border-gray-200 dark:border-zinc-700">
                            <span className="text-sm text-white dark:text-black font-medium">
                                Theme
                            </span>
                            <AnimatedThemeToggler
                                duration={500}
                                size={20}
                                className="text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950 p-2 rounded-full transition-colors"
                            />
                        </div>

                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-all"
                        >
                            <LogIn size={18} />
                            Login
                        </button>
                    </div>
                </div>

                {/* Infra health */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-4">
                        System Health
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {infraCards.map((card) => (
                            <StatusCard key={card.title} {...card} />
                        ))}
                    </div>
                </section>

                {/* KPI */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-4">
                        Operational Data
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {kpiCards.map((card) => (
                            <StatusCard key={card.title} {...card} />
                        ))}
                    </div>
                </section>

                {/* Modules + Activity */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <section className="xl:col-span-2">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-4">
                            Core Backend Modules
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {modules.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className="text-left group rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400">
                                            {item.icon}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                                                    {item.label}
                                                </h3>
                                                <ChevronRight
                                                    size={18}
                                                    className="text-gray-300 dark:text-zinc-600 group-hover:text-gray-600 dark:group-hover:text-zinc-300 transition"
                                                />
                                            </div>

                                            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/40 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity size={18} className="text-sky-500" />
                            <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">
                                Recent Backend Activity
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {activities.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
                                >
                                    <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                            Full-stack internal platform focused on backend data flow
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                            Covers API design, authentication, database operations, inventory logic, maintenance workflow, and reporting.
                        </p>
                    </div>

                    <div className="text-sm text-gray-400 dark:text-zinc-500">
                        Backend Portfolio View
                    </div>
                </div>
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </div>
    );
}

function StatusCard({ title, value, sub, icon, color }) {
    const colorMap = {
        sky: "text-sky-600 bg-sky-100 dark:bg-sky-950/30 dark:text-sky-400",
        emerald:
            "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400",
        amber:
            "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400",
        purple:
            "text-purple-600 bg-purple-100 dark:bg-purple-950/30 dark:text-purple-400",
        green:
            "text-green-600 bg-green-100 dark:bg-green-950/30 dark:text-green-400",
        rose: "text-rose-600 bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400",
        orange:
            "text-orange-600 bg-orange-100 dark:bg-orange-950/30 dark:text-orange-400",
    };

    return (
        <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">
                        {title}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-zinc-100 mt-2">
                        {value}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-zinc-500 mt-2">{sub}</p>
                </div>

                <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
            </div>
        </div>
    );
}

export default Homepage;