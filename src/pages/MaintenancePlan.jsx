import { useEffect, useMemo, useState } from "react";
import { Search, Filter, RefreshCw, CalendarDays, Wrench, AlertTriangle, CircleDashed } from "lucide-react";
import BarNav from "../Components/BarNav";
import { maintenanceService } from "../service/maintenanceService";

export default function MaintenancePlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await maintenanceService.getAll();
        setPlans(data);
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
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.planNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase());

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
        return "text-gray-600 dark:text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Maintenance Plans" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Total Plans</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Scheduled</p>
            <p className="text-2xl font-bold text-sky-600">{summary.scheduled}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-amber-600">{summary.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Overdue</p>
            <p className="text-2xl font-bold text-rose-600">{summary.overdue}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search maintenance plans..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 flex items-center gap-2"
          >
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading maintenance plans...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Plan No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Equipment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Task Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Next Scheduled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3 text-sm font-medium">{plan.planNo}</td>
                    <td className="px-4 py-3 text-sm">{plan.equipmentNo}</td>
                    <td className="px-4 py-3 text-sm">{plan.taskType}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm font-semibold ${getPriorityClass(plan.priority)}`}>
                      {plan.priority}
                    </td>
                    <td className="px-4 py-3 text-sm">{plan.nextScheduled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredPlans.length === 0 && (
          <div className="text-center py-12 text-gray-500">No maintenance plans found</div>
        )}
      </div>
    </div>
  );
}
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