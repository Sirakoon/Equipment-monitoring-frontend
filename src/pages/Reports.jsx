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