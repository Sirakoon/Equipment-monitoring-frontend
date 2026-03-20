import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import LoginModal from "./LoginModal";

function Homepage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const tabs = [
        { key: 'all', label: 'ALL' },
        { key: 'test1', label: 'Test1' },
        { key: 'test2', label: 'Test2' },
        { key: 'test3', label: 'Test3' }
    ];

    return (
        
        <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-zinc-950 p-4 transition-colors duration-500">
            {/* Card หลัก */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] min-h-[500px] w-full max-w-4xl border border-gray-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl p-8 flex flex-col justify-between transition-colors duration-500">

                <div>
                    {/* Header */}
                    <div className="text-center mt-10">
                        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-zinc-100 tracking-tight">
                            Management System
                        </h1>
                        <p className="text-gray-500 dark:text-zinc-400 mt-3 mb-10">
                            Please select a system to continue
                        </p>
                    </div>

                    {/* Tab filter */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 
                                        ${activeTab === tab.key
                                            ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Button Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                        {(activeTab === "all" || ["test1", "test2", "test3"].includes(activeTab)) && (
                            <MenuButton
                                onClick={() => navigate('/Equipments-List')}
                                color="sky"
                                label="Equipment List"
                            />
                        )}

                        {(activeTab === "all" || activeTab === "test1") && (
                            <>
                                <MenuButton
                                    onClick={() => navigate('/Dashboard')}
                                    color="purple"
                                    label="Dashboard Summary"
                                />
                                <MenuButton color="green" label="Test 1 System" />
                            </>
                        )}

                        {(activeTab === "all" || activeTab === "test2") && (
                            <MenuButton color="orange" label="Test 2 System" />
                        )}

                        {(activeTab === "all" || activeTab === "test3") && (
                            <MenuButton color="emerald" label="Test 3 System" />
                        )}
                    </div>
                </div>

                {/* Footer section: Login */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 dark:text-zinc-500 font-medium">Theme</span>
                        <AnimatedThemeToggler
                            duration={500}
                            size={20}
                            className="text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 p-2 rounded-full transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all border border-gray-200 dark:border-zinc-700"
                    >
                        <LogIn size={18} />
                        Login
                    </button>
                </div>
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </div>
    );
}

function MenuButton({ label, color, onClick }) {

    const colorClasses = {
        sky: "border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-500",
        purple: "border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500",
        green: "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500",
        orange: "border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500",
        emerald: "border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600",
    };

    return (
        <button
            onClick={onClick}
            className={`py-3 px-4 border-2 rounded-2xl font-bold transition-all duration-300 hover:text-white transform hover:-translate-y-1 active:scale-95 ${colorClasses[color]}`}
        >
            {label}
        </button>
    );
}

export default Homepage;