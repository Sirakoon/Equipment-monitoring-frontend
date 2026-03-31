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
import BarNav from "../Components/BarNav";
import { reportService } from "../service/reportService";

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
        const data = await reportService.getAll();
        setReports(data);
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
        item.reportNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = typeFilter === "all" ? true : item.reportType === typeFilter;
      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: reports.length,
      ready: reports.filter((r) => r.status === "Completed").length,
      generating: reports.filter((r) => r.status === "Generating").length,
      failed: reports.filter((r) => r.status === "Failed").length,
    };
  }, [reports]);

  const typeOptions = useMemo(() => {
    return [...new Set(reports.map((item) => item.reportType))];
  }, [reports]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
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
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Total Reports</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-emerald-600">{summary.ready}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Generating</p>
            <p className="text-2xl font-bold text-amber-600">{summary.generating}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Failed</p>
            <p className="text-2xl font-bold text-rose-600">{summary.failed}</p>
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
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <option value="all">All Types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
          <div className="text-center py-12">Loading reports...</div>
        ) : (
          <div className="grid gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <FileBarChart2 size={24} className="text-sky-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">{report.reportNo}</h3>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getStatusClass(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Type</p>
                    <p className="font-medium">{report.reportType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Period</p>
                    <p className="font-medium">{report.period}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Generated</p>
                    <p className="font-medium">{report.generatedDate}</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700 flex items-center gap-1 text-sm">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredReports.length === 0 && (
          <div className="text-center py-12 text-gray-500">No reports found</div>
        )}
      </div>
    </div>
  );
}
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