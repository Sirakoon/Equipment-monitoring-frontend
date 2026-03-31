import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, Package, AlertTriangle } from "lucide-react";
import BarNav from "../Components/BarNav";
import { sparePartService } from "../service/sparePartService";

export default function SparePart() {
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await sparePartService.getAll();
        setSpareParts(data);
      } catch (err) {
        setError(err.message || "Failed to load spare parts");
        setLoading(false);
      }
    };

    fetchSpareParts();
  }, []);

  const filteredSpareParts = useMemo(() => {
    return spareParts.filter((item) => {
      const matchSearch =
        item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [spareParts, searchTerm, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: spareParts.length,
      inStock: spareParts.filter((p) => p.status === "In Stock").length,
      lowStock: spareParts.filter(
        (p) => p.quantity <= p.reorderLevel && p.quantity > 0
      ).length,
      outOfStock: spareParts.filter((p) => p.quantity === 0).length,
    };
  }, [spareParts]);

  const getStatusColor = (status, quantity, reorderLevel) => {
    if (quantity === 0) {
      return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
    }
    if (quantity <= reorderLevel) {
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
    }
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Spare Parts" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Total Parts</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">In Stock</p>
            <p className="text-2xl font-bold text-emerald-600">{summary.inStock}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600">{summary.lowStock}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-zinc-800">
            <p className="text-gray-600 dark:text-zinc-400 text-sm">Out of Stock</p>
            <p className="text-2xl font-bold text-rose-600">{summary.outOfStock}</p>
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
              placeholder="Search spare parts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <option value="all">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
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
          <div className="text-center py-12">Loading spare parts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSpareParts.map((part) => (
              <div
                key={part.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2">
                    <Package size={20} className="text-sky-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-sm">{part.partName}</h3>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">
                        {part.partNo}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      part.status,
                      part.quantity,
                      part.reorderLevel
                    )}`}
                  >
                    {part.quantity === 0
                      ? "Out of Stock"
                      : part.quantity <= part.reorderLevel
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Category:</span>
                    <span className="font-medium">{part.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Quantity:</span>
                    <span className="font-bold">{part.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Reorder Level:</span>
                    <span>{part.reorderLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Unit Cost:</span>
                    <span className="font-medium">${part.unitCost}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Supplier:</span>
                    <span>{part.supplier}</span>
                  </div>
                </div>

                {part.quantity <= part.reorderLevel && part.quantity > 0 && (
                  <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    Reorder soon
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredSpareParts.length === 0 && (
          <div className="text-center py-12 text-gray-500">No spare parts found</div>
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
