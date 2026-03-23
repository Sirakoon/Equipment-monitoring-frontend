import { useEffect, useMemo, useState } from "react";
import { Search, Filter, RefreshCw, CalendarDays, Wrench, AlertTriangle, CircleDashed } from "lucide-react";
import BarNav from "../Components/BarNav";

export default function MaintenancePlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state รอผูก API/filter จริง
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");

        // ตัวอย่างตอนต่อ API จริง
        // const res = await fetch("http://localhost:7500/api/maintenance-plans");
        // if (!res.ok) throw new Error("Failed to fetch maintenance plans");
        // const data = await res.json();
        // setPlans(data);

        setTimeout(() => {
          setPlans([
            {
              id: 1,
              planNo: "MP-2026-001",
              machine: "Compressor A",
              equipmentNo: "EQ-001",
              area: "Utility Room",
              type: "Preventive Maintenance",
              dueDate: "2026-03-28",
              status: "Scheduled",
              priority: "High",
              technician: "Somchai",
              frequency: "Monthly",
              progress: 15,
              description: "Check pressure, clean filter, inspect vibration, lubricate bearings",
            },
            {
              id: 2,
              planNo: "MP-2026-002",
              machine: "SMT Machine B",
              equipmentNo: "EQ-014",
              area: "SMT Line 2",
              type: "Corrective Maintenance",
              dueDate: "2026-03-30",
              status: "In Progress",
              priority: "Medium",
              technician: "Anan",
              frequency: "As Required",
              progress: 55,
              description: "Sensor calibration and conveyor alignment check",
            },
            {
              id: 3,
              planNo: "MP-2026-003",
              machine: "Cooling Fan C",
              equipmentNo: "EQ-021",
              area: "Assembly Zone",
              type: "Preventive Maintenance",
              dueDate: "2026-04-02",
              status: "Pending Approval",
              priority: "Low",
              technician: "Napat",
              frequency: "Quarterly",
              progress: 0,
              description: "Inspection checklist waiting supervisor approval",
            },
            {
              id: 4,
              planNo: "MP-2026-004",
              machine: "Hydraulic Press D",
              equipmentNo: "EQ-030",
              area: "Press Shop",
              type: "Preventive Maintenance",
              dueDate: "2026-03-26",
              status: "Overdue",
              priority: "High",
              technician: "Kittipong",
              frequency: "Monthly",
              progress: 20,
              description: "Oil pressure inspection and seal replacement",
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (err) {
        setError(err.message || "Failed to load maintenance plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter((item) => {
      const matchSearch =
        item.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.planNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.area.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchPriority =
        priorityFilter === "all" ? true : item.priority === priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [plans, searchTerm, statusFilter, priorityFilter]);

  const summary = useMemo(() => {
    return {
      total: plans.length,
      scheduled: plans.filter((p) => p.status === "Scheduled").length,
      inProgress: plans.filter((p) => p.status === "In Progress").length,
      overdue: plans.filter((p) => p.status === "Overdue").length,
    };
  }, [plans]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300";
      case "In Progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Pending Approval":
        return "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
      case "Overdue":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      case "Completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "text-rose-600 dark:text-rose-400";
      case "Medium":
        return "text-amber-600 dark:text-amber-400";
      case "Low":
        return "text-emerald-600 dark:text-emerald-400";
      default:
        return "text-gray-500 dark:text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Maintenance Plan" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Maintenance Planning</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Track preventive and corrective maintenance plans, schedule execution, and monitor task status.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Plans"
            value={summary.total}
            icon={<CalendarDays size={18} />}
            color="sky"
          />
          <SummaryCard
            title="Scheduled"
            value={summary.scheduled}
            icon={<CircleDashed size={18} />}
            color="blue"
          />
          <SummaryCard
            title="In Progress"
            value={summary.inProgress}
            icon={<Wrench size={18} />}
            color="amber"
          />
          <SummaryCard
            title="Overdue"
            value={summary.overdue}
            icon={<AlertTriangle size={18} />}
            color="rose"
          />
        </div>

        {/* Filters */}
        <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 md:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-gray-500 dark:text-zinc-400" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Search
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by machine, plan no, equipment no, area"
                  className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Overdue">Overdue</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* State */}
        {loading && (
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-gray-500 dark:text-zinc-400">
            Loading maintenance plans...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 p-6 text-rose-600 dark:text-rose-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Table Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Plan List</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing {filteredPlans.length} of {plans.length} maintenance plans
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredPlans.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-zinc-500">
                        {item.planNo}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{item.machine}</h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {item.equipmentNo} • {item.area}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                      <span className={`text-sm font-semibold ${getPriorityClass(item.priority)}`}>
                        {item.priority} Priority
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <InfoItem label="Type" value={item.type} />
                    <InfoItem label="Due Date" value={item.dueDate} />
                    <InfoItem label="Technician" value={item.technician} />
                    <InfoItem label="Frequency" value={item.frequency} />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                      Description
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Progress
                      </p>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {item.progress}%
                      </p>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky-600 transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
                    >
                      View Detail
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                    >
                      Edit Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
                <p className="text-gray-500 dark:text-zinc-400">
                  No maintenance plans found for the selected filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color }) {
  const colorMap = {
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  };

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 dark:text-zinc-500">{label}</p>
      <p className="text-sm font-medium mt-1">{value}</p>
    </div>
  );
}