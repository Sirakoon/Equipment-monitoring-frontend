import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  Wrench,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import BarNav from "../Components/BarNav";

export default function BreakdownHis() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        setError("");

        // const res = await fetch("http://localhost:7500/api/breakdown-history");
        // if (!res.ok) throw new Error("Failed to fetch breakdown history");
        // const data = await res.json();
        // setHistories(data);

        setTimeout(() => {
          setHistories([
            {
              id: 1,
              breakdownNo: "BD-2026-001",
              equipmentNo: "EQ-001",
              machine: "Compressor A",
              area: "Utility Room",
              line: "Utility",
              issue: "Motor overload",
              severity: "High",
              status: "Closed",
              startTime: "2026-03-20 09:15",
              endTime: "2026-03-20 10:05",
              downtimeMin: 50,
              rootCause: "Cooling fan blocked by dust accumulation",
              actionTaken: "Cleaned fan cover and reset overload relay",
              technician: "Somchai",
              reportedBy: "Operator A",
            },
            {
              id: 2,
              breakdownNo: "BD-2026-002",
              equipmentNo: "EQ-002",
              machine: "SMT Machine B",
              area: "SMT Line 2",
              line: "SMT",
              issue: "Sensor error",
              severity: "Medium",
              status: "In Progress",
              startTime: "2026-03-21 13:20",
              endTime: "-",
              downtimeMin: 35,
              rootCause: "Sensor offset out of calibration",
              actionTaken: "Waiting for calibration tool and verification",
              technician: "Anan",
              reportedBy: "Line Leader",
            },
            {
              id: 3,
              breakdownNo: "BD-2026-003",
              equipmentNo: "EQ-004",
              machine: "Hydraulic Press D",
              area: "Press Shop",
              line: "Press",
              issue: "Hydraulic pressure low",
              severity: "High",
              status: "Open",
              startTime: "2026-03-22 08:40",
              endTime: "-",
              downtimeMin: 90,
              rootCause: "Possible seal leakage in pressure unit",
              actionTaken: "Temporary stop and waiting spare seal kit",
              technician: "Kittipong",
              reportedBy: "Supervisor B",
            },
            {
              id: 4,
              breakdownNo: "BD-2026-004",
              equipmentNo: "EQ-003",
              machine: "Cooling Fan C",
              area: "Assembly Zone",
              line: "Assembly",
              issue: "Bearing noise abnormal",
              severity: "Low",
              status: "Closed",
              startTime: "2026-03-18 15:10",
              endTime: "2026-03-18 15:45",
              downtimeMin: 35,
              rootCause: "Bearing wear from long runtime",
              actionTaken: "Replaced bearing and checked alignment",
              technician: "Napat",
              reportedBy: "Technician C",
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (err) {
        setError(err.message || "Failed to load breakdown history");
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const filteredHistories = useMemo(() => {
    return histories.filter((item) => {
      const matchSearch =
        item.breakdownNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.area.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchSeverity =
        severityFilter === "all" ? true : item.severity === severityFilter;

      return matchSearch && matchStatus && matchSeverity;
    });
  }, [histories, searchTerm, statusFilter, severityFilter]);

  const summary = useMemo(() => {
    return {
      total: histories.length,
      open: histories.filter((h) => h.status === "Open").length,
      inProgress: histories.filter((h) => h.status === "In Progress").length,
      closed: histories.filter((h) => h.status === "Closed").length,
    };
  }, [histories]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      case "In Progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Closed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
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
      <BarNav title="Breakdown History" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Breakdown History</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Review equipment incidents, downtime records, root causes, and corrective actions.
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

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Incidents"
            value={summary.total}
            icon={<AlertTriangle size={18} />}
            color="sky"
          />
          <SummaryCard
            title="Open"
            value={summary.open}
            icon={<Clock3 size={18} />}
            color="rose"
          />
          <SummaryCard
            title="In Progress"
            value={summary.inProgress}
            icon={<Wrench size={18} />}
            color="amber"
          />
          <SummaryCard
            title="Closed"
            value={summary.closed}
            icon={<CheckCircle2 size={18} />}
            color="emerald"
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
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by breakdown no, equipment no, machine, issue, area"
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
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Severity
              </label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Severity</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-gray-500 dark:text-zinc-400">
            Loading breakdown history...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 p-6 text-rose-600 dark:text-rose-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Incident List</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing {filteredHistories.length} of {histories.length} incidents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredHistories.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-zinc-500">
                        {item.breakdownNo}
                      </p>
                      <h3 className="text-lg font-bold mt-1">
                        {item.machine} ({item.equipmentNo})
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {item.area} • {item.line}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                      <span
                        className={`text-sm font-semibold ${getSeverityClass(item.severity)}`}
                      >
                        {item.severity} Severity
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                      Issue
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {item.issue}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <InfoItem label="Start Time" value={item.startTime} />
                    <InfoItem label="End Time" value={item.endTime} />
                    <InfoItem label="Downtime" value={`${item.downtimeMin} min`} />
                    <InfoItem label="Technician" value={item.technician} />
                    <InfoItem label="Reported By" value={item.reportedBy} />
                    <InfoItem label="Area" value={item.area} />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                      Root Cause
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {item.rootCause}
                    </p>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                      Action Taken
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {item.actionTaken}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
                      Create Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredHistories.length === 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
                <p className="text-gray-500 dark:text-zinc-400">
                  No breakdown history found for the selected filters.
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
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  };

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
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