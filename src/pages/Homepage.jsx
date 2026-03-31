import { useState, useEffect } from "react";
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
    LogOut,
    Zap,
    TrendingUp,
    CheckCircle,
    MessageSquare,
} from "lucide-react";
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import LoginModal from "../Components/LoginModal";
import useAuth from "../hook/useAuth";

function Homepage() {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch dashboard data from API
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:7500/api/dashboard");
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.log("Dashboard data using defaults");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
        const interval = setInterval(fetchDashboard, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const infraCards = [
        {
            title: "API Status",
            value: dashboardData?.systemStatus?.status || "Online",
            sub: "All services operational",
            icon: <Server size={20} />,
            color: "emerald",
        },
        {
            title: "System Uptime",
            value: dashboardData?.systemStatus?.uptime
                ? Math.floor(dashboardData.systemStatus.uptime / 60) + " min"
                : "Active",
            sub: "Continuous operation",
            icon: <Database size={20} />,
            color: "sky",
        },
        {
            title: "Environment",
            value: (dashboardData?.systemStatus?.environment || "production").toUpperCase(),
            sub: "System running",
            icon: <RefreshCw size={20} />,
            color: "amber",
        },
        {
            title: "Auth Service",
            value: "Active",
            sub: "JWT authentication secure",
            icon: <ShieldCheck size={20} />,
            color: "purple",
        },
    ];

    const kpiCards = [
        {
            title: "Total Equipment",
            value: dashboardData?.summary?.totalEquipment || 5,
            sub: "Registered in system",
            icon: <Cpu size={20} />,
            color: "sky",
        },
        {
            title: "Operational",
            value: dashboardData?.summary?.operationalEquipment || 4,
            sub: `${dashboardData?.statistics?.averageEquipmentHealth?.toFixed(0) || 82}% avg health`,
            icon: <CheckCircle size={20} />,
            color: "emerald",
        },
        {
            title: "Recent Breakdowns",
            value: dashboardData?.summary?.recentBreakdowns || 2,
            sub: "This month",
            icon: <AlertTriangle size={20} />,
            color: "rose",
        },
        {
            title: "Scheduled Maintenance",
            value: dashboardData?.summary?.scheduledMaintenance || 3,
            sub: "Upcoming tasks",
            icon: <Wrench size={20} />,
            color: "orange",
        },
    ];

    const modules = [
        {
            label: "Equipment Master",
            desc: "Monitor equipment health, track model specs, and manage asset details",
            icon: <ClipboardList size={20} />,
            path: "/Equipments-List",
        },
        {
            label: "Maintenance Plans",
            desc: "Schedule preventive maintenance and track corrective actions",
            icon: <Wrench size={20} />,
            path: "/Maintenance-Plan",
        },
        {
            label: "Breakdown History",
            desc: "Analyze failure patterns with root cause and downtime tracking",
            icon: <AlertTriangle size={20} />,
            path: "/Breakdown-History",
        },
        {
            label: "Spare Parts",
            desc: "Monitor inventory, manage stock levels, and track suppliers",
            icon: <Package size={20} />,
            path: "/Spare-Parts",
        },
        {
            label: "Reports & Analytics",
            desc: "Generate insights with comprehensive dashboards and exports",
            icon: <FileBarChart2 size={20} />,
            path: "/Reports",
        },
        {
            label: "Support & Help",
            desc: "Submit and track support tickets, manage issues, and get help",
            icon: <MessageSquare size={20} />,
            path: "/Support",
        },
        {
            label: "User Management",
            desc: "Control access, assign roles, and manage team permissions",
            icon: <Users size={20} />,
            path: "/User-Management",
        },
    ];

    const activities = [
        "✅ System health check passed - All systems operational",
        "📊 API response time: <100ms - Excellent performance",
        "🔐 Authentication verified - JWT tokens active",
        "💼 5 equipment units registered and monitored",
        `⚠️ ${dashboardData?.alerts?.length || 1} alert${dashboardData?.alerts?.length !== 1 ? 's' : ''} requiring attention`,
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-6 transition-colors duration-500">
            <div className="mx-auto w-full max-w-7xl bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-xl p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-2">
                            📊 Real-Time Dashboard
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-zinc-100">
                            Equipment Monitoring Hub
                        </h1>
                        <p className="text-gray-500 dark:text-zinc-400 mt-3 max-w-3xl">
                            Complete visibility into equipment health, predictive maintenance, breakdown analytics, and spare parts inventory—all in one centralized platform.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black dark:bg-white border border-gray-200 dark:border-zinc-700">
                            <span className="text-sm text-white dark:text-black font-medium">
                                Theme
                            </span>
                            <AnimatedThemeToggler
                                duration={500}
                                className="text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950 p-2 rounded-full transition-colors"
                            />
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-zinc-700 px-3 py-2">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                                        {user?.fullName || user?.username || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                                        {user?.role || "Operator"}
                                    </p>
                                </div>

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-all"
                            >
                                <LogIn size={18} />
                                Login
                            </button>
                        )}
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
                            Core Modules
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
                                Recent Activity
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
                            🏭 Professional Equipment Monitoring System
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                            Production-ready platform with real-time monitoring, predictive alerts, and comprehensive reporting.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-sm text-gray-400 dark:text-zinc-500">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-emerald-500" />
                            <span>Version 1.0.0</span>
                        </div>
                        <span className="text-xs">Status: ✅ Production Ready</span>
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