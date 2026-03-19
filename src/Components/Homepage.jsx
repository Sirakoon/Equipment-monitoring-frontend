import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";

function Homepage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="min-h-screen flex justify-center items-center w">
            <div className="bg-white rounded-3xl min-h-128 min-w-200 border border-gray-400">
                <div className="relative">
                    <h1 className="text-center text-black mt-25 text-2xl">
                        Welcome To Management System
                    </h1>
                    <p className="text-black text-center mt-8 mb-10">
                        Please select a system to continue
                    </p>
                </div>

                {/* Tab filter */}
                <div className="flex  justify-center mb-10 relative">
                    <div className="inline-flex border border-gray-300 rounded-2xl h-10 min-w-60 backdrop-blur">
                        {[
                            { key: 'all', label: 'ALL' },
                            { key: 'test1', label: 'Test1' },
                            { key: 'test2', label: 'Test2' },
                            { key: 'test3', label: 'Test3' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-3  rounded-xl font-bold transition-all duration-300 text-base relative cursor-pointer
                                    ${activeTab === tab.key
                                        ? "bg-[#755575] text-white"
                                        : "text-[#8E798E] hover:text-[#5B3E5B] hover:bg-white/40"
                                    }
                                    `}
                            >
                                {tab.label}
                            </button>
                        ))
                        }
                    </div>
                </div>

                {/* Menu Botton grid */}

                <div className="grid grid-cols-3 text-black gap-y-10 justify-items-center ">
                    {(activeTab == "all" || activeTab === "test1" || activeTab === "test2" || activeTab === "test3") && (
                        <button
                            onClick={() => navigate('/Equipments-List')}
                            className="py-2 bg-sky-600 border border-3xl border-sky-600 max-w-45 w-full mx-auto rounded-3xl text-white 
                            hover:bg-red-500 hover:text-black ">
                            Equipment List
                        </button>
                    )}

                    {(activeTab === "all" || activeTab === "test1") && (
                        <button >
                            Dashboard summary
                        </button>
                    )}

                    {(activeTab === "all" || activeTab === "test1") && (
                        <button>
                            test1
                        </button>
                    )}

                    {(activeTab === "all" || activeTab === "test2") && (
                        <button>
                            test2
                        </button>
                    )}

                    {(activeTab === "all" || activeTab === "test3") && (
                        <button>
                            test3
                        </button>
                    )}


                </div>

                {/* log in control && theme control */}
                <div className="flex justify-between ml-5 mr-8 mt-12">

                    <AnimatedThemeToggler
                        duration={500}
                        size={24}
                        className="text-blue-500 hover:text-blue-600"
                    />

                    <h1 className="text-black">
                        Login section
                    </h1>
                </div>



            </div>
        </div>

    )
}
export default Homepage