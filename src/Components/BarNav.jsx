import { NavLink, useNavigate } from "react-router-dom";
import { ChevronLeft, House } from "lucide-react";
import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";

export default function BarNav({ title = "Page" }) {
  const navigate = useNavigate();

  const navItems = [
    { label: "Equipment", path: "/Equipments-List" },
    { label: "Maintenance", path: "/Maintenance-Plan" },
    { label: "Reports", path: "/Reports" },
    { label: "Breakdown", path: "/Breakdown-History" },
    { label: "Spare Parts", path: "/Spare-Parts" },
    { label: "Users", path: "/User-Management" },
  ];

  return (
    <div className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left */}
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

            <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
              <AnimatedThemeToggler
                duration={500}
                size={20}
                className="text-sky-500 hover:bg-black dark:hover:bg-white p-2 rounded-full transition-colors"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition border ${isActive
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                    : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}