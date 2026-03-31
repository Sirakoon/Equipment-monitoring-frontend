import { useState, useEffect } from "react"; // เพิ่ม useEffect และ useState
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronLeft, House, LogIn, UserCircle } from "lucide-react"; // เพิ่ม Icon
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import LoginModal from "./LoginModal"; // อย่าลืม Import Modal ของคุณ

export default function BarNav({ title = "Page" }) {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ตรวจสอบสถานะการ Login จาก LocalStorage เมื่อ Component โหลด
  useEffect(() => {
    const savedUser = localStorage.getItem("user"); // สมมติว่าเก็บไว้ในชื่อ 'user'
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { label: "Equipment", path: "/Equipments-List" },
    { label: "Maintenance", path: "/Maintenance-Plan" },
    { label: "Reports", path: "/Reports" },
    { label: "Breakdown", path: "/Breakdown-History" },
    { label: "Spare Parts", path: "/Spare-Parts" },
    { label: "Users", path: "/User-Management" },
    { label: "Support", path: "/Support" },
  ];

  return (
    <>
      <div className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
              >
                <House size={16} />
                Home
              </button>

              <div className="ml-2">
                <h1 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                  {title}
                </h1>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 ml-2">
                <AnimatedThemeToggler
                  duration={500}
                  size={20}
                  className="text-sky-500 p-2"
                />
              </div>
            </div>

            {/* Right Section: Navigation + User/Login */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-medium transition border ${
                        isActive
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Conditional Rendering: User Profile vs Login Button */}
              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-zinc-700">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 dark:text-zinc-400">Welcome,</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-zinc-100">
                      {user.username}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                    title="Logout"
                  >
                    <UserCircle size={24} />
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
        </div>
      </div>

      {/* Render Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(userData) => {
          setUser(userData);
          setIsLoginOpen(false);
          localStorage.setItem("user", JSON.stringify(userData));
        }}
      />
    </>
  );
}