import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Package,
  AlertTriangle,
  Boxes,
  ArrowDownUp,
  MapPin,
} from "lucide-react";
import BarNav from "../Components/BarNav";

export default function SparePart() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true);
        setError("");

        // const res = await fetch("http://localhost:7500/api/spare-parts");
        // if (!res.ok) throw new Error("Failed to fetch spare parts");
        // const data = await res.json();
        // setParts(data);

        setTimeout(() => {
          setParts([
            {
              id: 1,
              partNo: "SP-001",
              name: "Bearing 6204",
              category: "Bearing",
              equipmentType: "Motor / Fan",
              location: "Store A-01",
              supplier: "SKF Thailand",
              unit: "pcs",
              qty: 12,
              minStock: 10,
              maxStock: 40,
              reorderPoint: 15,
              lastUpdated: "2026-03-20",
              status: "Normal",
              usage30d: 8,
            },
            {
              id: 2,
              partNo: "SP-002",
              name: "Sensor Cable",
              category: "Electrical",
              equipmentType: "SMT Machine",
              location: "Store B-04",
              supplier: "Omron Dealer",
              unit: "pcs",
              qty: 5,
              minStock: 8,
              maxStock: 25,
              reorderPoint: 10,
              lastUpdated: "2026-03-21",
              status: "Low Stock",
              usage30d: 11,
            },
            {
              id: 3,
              partNo: "SP-003",
              name: "Hydraulic Seal Kit",
              category: "Hydraulic",
              equipmentType: "Press Machine",
              location: "Store C-02",
              supplier: "Parker",
              unit: "set",
              qty: 2,
              minStock: 4,
              maxStock: 12,
              reorderPoint: 4,
              lastUpdated: "2026-03-19",
              status: "Critical",
              usage30d: 3,
            },
            {
              id: 4,
              partNo: "SP-004",
              name: "Air Filter Element",
              category: "Filter",
              equipmentType: "Compressor",
              location: "Store A-03",
              supplier: "Atlas Copco",
              unit: "pcs",
              qty: 22,
              minStock: 6,
              maxStock: 30,
              reorderPoint: 8,
              lastUpdated: "2026-03-22",
              status: "Normal",
              usage30d: 6,
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (err) {
        setError(err.message || "Failed to load spare parts");
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  const filteredParts = useMemo(() => {
    return parts.filter((item) => {
      const matchSearch =
        item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStock =
        stockFilter === "all" ? true : item.status === stockFilter;

      const matchCategory =
        categoryFilter === "all" ? true : item.category === categoryFilter;

      return matchSearch && matchStock && matchCategory;
    });
  }, [parts, searchTerm, stockFilter, categoryFilter]);

  const summary = useMemo(() => {
    return {
      total: parts.length,
      normal: parts.filter((p) => p.status === "Normal").length,
      lowStock: parts.filter((p) => p.status === "Low Stock").length,
      critical: parts.filter((p) => p.status === "Critical").length,
    };
  }, [parts]);

  const categoryOptions = useMemo(() => {
    return [...new Set(parts.map((item) => item.category))];
  }, [parts]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Normal":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "Low Stock":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Critical":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getStockBarClass = (qty, maxStock) => {
    const ratio = (qty / maxStock) * 100;
    if (ratio >= 50) return "bg-emerald-500";
    if (ratio >= 25) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Spare Parts" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Spare Parts Inventory</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Monitor spare parts stock, reorder points, storage locations, and usage trends.
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
            title="Total Parts"
            value={summary.total}
            icon={<Boxes size={18} />}
            color="sky"
          />
          <SummaryCard
            title="Normal"
            value={summary.normal}
            icon={<Package size={18} />}
            color="emerald"
          />
          <SummaryCard
            title="Low Stock"
            value={summary.lowStock}
            icon={<AlertTriangle size={18} />}
            color="amber"
          />
          <SummaryCard
            title="Critical"
            value={summary.critical}
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
                  placeholder="Search by part no, name, category, location, supplier"
                  className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Stock Status
              </label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Status</option>
                <option value="Normal">Normal</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-gray-500 dark:text-zinc-400">
            Loading spare parts...
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
                <h2 className="text-lg font-semibold">Spare Parts List</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing {filteredParts.length} of {parts.length} parts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredParts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-zinc-500">
                        {item.partNo}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {item.category} • {item.equipmentType}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <InfoItem label="Qty On Hand" value={`${item.qty} ${item.unit}`} />
                    <InfoItem label="Reorder Point" value={`${item.reorderPoint} ${item.unit}`} />
                    <InfoItem label="Min Stock" value={`${item.minStock} ${item.unit}`} />
                    <InfoItem label="Max Stock" value={`${item.maxStock} ${item.unit}`} />
                    <InfoItem label="Supplier" value={item.supplier} />
                    <InfoItem label="Last Updated" value={item.lastUpdated} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Stock Level
                      </p>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {item.qty}/{item.maxStock} {item.unit}
                      </p>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getStockBarClass(
                          item.qty,
                          item.maxStock
                        )}`}
                        style={{ width: `${Math.min((item.qty / item.maxStock) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-zinc-400 mb-4">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>
                      Stored at{" "}
                      <span className="font-medium text-gray-700 dark:text-zinc-300">
                        {item.location}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-zinc-400 mb-5">
                    <ArrowDownUp size={16} className="mt-0.5 shrink-0" />
                    <span>
                      Usage in last 30 days:{" "}
                      <span className="font-medium text-gray-700 dark:text-zinc-300">
                        {item.usage30d} {item.unit}
                      </span>
                    </span>
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
                      Stock Movement
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredParts.length === 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
                <p className="text-gray-500 dark:text-zinc-400">
                  No spare parts found for the selected filters.
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