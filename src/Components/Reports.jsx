import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  FileBarChart2,
  Download,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import BarNav from "./BarNav";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        // const res = await fetch("http://localhost:7500/api/reports");
        // if (!res.ok) throw new Error("Failed to fetch reports");
        // const data = await res.json();
        // setReports(data);

        setTimeout(() => {
          setReports([
            {
              id: 1,
              reportNo: "RPT-2026-001",
              title: "Monthly Breakdown Report",
              type: "Breakdown",
              period: "March 2026",
              generatedDate: "2026-03-20",
              generatedBy: "System",
              format: "PDF",
              status: "Ready",
              description: "Summary of equipment breakdown events, downtime, and major causes for the month.",
              fileSize: "1.8 MB",
            },
            {
              id: 2,
              reportNo: "RPT-2026-002",
              title: "PM Completion Report",
              type: "Maintenance",
              period: "March 2026",
              generatedDate: "2026-03-21",
              generatedBy: "Maintenance Admin",
              format: "Excel",
              status: "Ready",
              description: "Completion status of preventive maintenance plans and overdue tasks.",
              fileSize: "920 KB",
            },
            {
              id: 3,
              reportNo: "RPT-2026-003",
              title: "Equipment Health Summary",
              type: "Equipment",
              period: "Q1 2026",
              generatedDate: "2026-03-22",
              generatedBy: "System",
              format: "PDF",
              status: "Generating",
              description: "Health score summary and critical equipment risk overview.",
              fileSize: "-",
            },
            {
              id: 4,
              reportNo: "RPT-2026-004",
              title: "Spare Parts Usage Report",
              type: "Inventory",
              period: "March 2026",
              generatedDate: "2026-03-18",
              generatedBy: "Store Keeper",
              format: "Excel",
              status: "Failed",
              description: "Monthly spare parts consumption, stock movement, and low stock analysis.",
              fileSize: "-",
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (err) {
        setError(err.message || "Failed to load reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = typeFilter === "all" ? true : item.type === typeFilter;
      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: reports.length,
      ready: reports.filter((r) => r.status === "Ready").length,
      generating: reports.filter((r) => r.status === "Generating").length,
      failed: reports.filter((r) => r.status === "Failed").length,
    };
  }, [reports]);

  const typeOptions = useMemo(() => {
    return [...new Set(reports.map((item) => item.type))];
  }, [reports]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Ready":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "Generating":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Failed":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Reports" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Reports Center</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Browse generated reports, review operational summaries, and prepare exports for maintenance and equipment analysis.
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
            title="Total Reports"
            value={summary.total}
            icon={<FileBarChart2 size={18} />}
            color="sky"
          />
          <SummaryCard
            title="Ready"
            value={summary.ready}
            icon={<CheckCircle2 size={18} />}
            color="emerald"
          />
          <SummaryCard
            title="Generating"
            value={summary.generating}
            icon={<Clock3 size={18} />}
            color="amber"
          />
          <SummaryCard
            title="Failed"
            value={summary.failed}
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
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by report name, report no, period, generated by"
                  className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
                <option value="Ready">Ready</option>
                <option value="Generating">Generating</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-gray-500 dark:text-zinc-400">
            Loading reports...
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
                <h2 className="text-lg font-semibold">Report List</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing {filteredReports.length} of {reports.length} reports
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredReports.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-zinc-500">
                        {item.reportNo}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {item.type} • {item.period}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <InfoItem label="Generated Date" value={item.generatedDate} />
                    <InfoItem label="Generated By" value={item.generatedBy} />
                    <InfoItem label="Format" value={item.format} />
                    <InfoItem label="File Size" value={item.fileSize} />
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                      Description
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
                    >
                      View Report
                    </button>

                    <button
                      type="button"
                      disabled={item.status !== "Ready"}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition inline-flex items-center gap-2 ${
                        item.status === "Ready"
                          ? "border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
                          : "border border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
                      }`}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
                <p className="text-gray-500 dark:text-zinc-400">
                  No reports found for the selected filters.
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