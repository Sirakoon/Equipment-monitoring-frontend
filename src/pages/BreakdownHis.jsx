import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, AlertTriangle } from "lucide-react";
import BarNav from "../Components/BarNav";
import { breakdownService } from "../service/breakdownService";

export default function BreakdownHis() {
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchBreakdowns = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await breakdownService.getAll();
        setBreakdowns(data);
      } catch (err) {
        setError(err.message || "Failed to load breakdown history");
        setLoading(false);
      }
    };

    fetchBreakdowns();
  }, []);

  const filteredBreakdowns = useMemo(() => {
    return breakdowns.filter((item) => {
      const matchSearch =
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.failureType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [breakdowns, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Open":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Breakdown History" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search breakdowns..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <option value="all">All Status</option>
            <option value="Resolved">Resolved</option>
            <option value="In Progress">In Progress</option>
            <option value="Open">Open</option>
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
          <div className="text-center py-12">Loading breakdown history...</div>
        ) : (
          <div className="grid gap-4">
            {filteredBreakdowns.map((breakdown) => (
              <div
                key={breakdown.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-rose-600 mt-1" />
                    <div>
                      <h3 className="font-bold">{breakdown.breakdownNo}</h3>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        Equipment: {breakdown.equipmentNo}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                      breakdown.status
                    )}`}
                  >
                    {breakdown.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Failure Type</p>
                    <p className="font-medium">{breakdown.failureType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Downtime</p>
                    <p className="font-medium">{breakdown.downtime} hours</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-zinc-400">Reported</p>
                    <p className="font-medium">
                      {new Date(breakdown.reportDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 text-sm">
                  <p className="text-gray-600 dark:text-zinc-400 mb-1">
                    <strong>Description:</strong>
                  </p>
                  <p>{breakdown.description}</p>
                </div>

                {breakdown.rootCause && (
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-900/50 text-sm">
                    <p className="text-amber-800 dark:text-amber-200">
                      <strong>Root Cause:</strong> {breakdown.rootCause}
                    </p>
                    {breakdown.solution && (
                      <p className="text-amber-700 dark:text-amber-300 mt-1">
                        <strong>Solution:</strong> {breakdown.solution}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBreakdowns.length === 0 && (
          <div className="text-center py-12 text-gray-500">No breakdown records found</div>
        )}
      </div>
    </div>
  );
}
