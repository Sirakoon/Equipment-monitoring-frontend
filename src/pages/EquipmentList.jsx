import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  MapPin,
} from "lucide-react";
import BarNav from "../Components/BarNav";

export default function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true);
        setError("");

        // const res = await fetch("http://localhost:7500/api/equipments");
        // if (!res.ok) throw new Error("Failed to fetch equipments");
        // const data = await res.json();
        // setEquipments(data);

        setTimeout(() => {
          setEquipments([
            {
              id: 1,
              equipmentNo: "EQ-001",
              name: "Compressor A",
              model: "Atlas Copco GA55",
              serialNo: "SN-COMP-2026-001",
              category: "Air Compressor",
              area: "Utility Room",
              line: "Utility",
              owner: "Maintenance",
              status: "Running",
              criticality: "High",
              installDate: "2024-06-10",
              lastMaintenance: "2026-03-10",
              nextPmDate: "2026-03-28",
              healthScore: 88,
            },
            {
              id: 2,
              equipmentNo: "EQ-002",
              name: "SMT Machine B",
              model: "Panasonic NPM-D3",
              serialNo: "SN-SMT-2026-014",
              category: "SMT Machine",
              area: "SMT Line 2",
              line: "SMT",
              owner: "Production",
              status: "Idle",
              criticality: "High",
              installDate: "2023-11-01",
              lastMaintenance: "2026-03-15",
              nextPmDate: "2026-03-30",
              healthScore: 74,
            },
            {
              id: 3,
              equipmentNo: "EQ-003",
              name: "Cooling Fan C",
              model: "Mitsubishi CF-220",
              serialNo: "SN-FAN-2026-021",
              category: "Cooling System",
              area: "Assembly Zone",
              line: "Assembly",
              owner: "Facility",
              status: "Maintenance",
              criticality: "Medium",
              installDate: "2022-08-20",
              lastMaintenance: "2026-03-05",
              nextPmDate: "2026-04-02",
              healthScore: 61,
            },
            {
              id: 4,
              equipmentNo: "EQ-004",
              name: "Hydraulic Press D",
              model: "Komatsu H2-500",
              serialNo: "SN-PRESS-2026-030",
              category: "Press Machine",
              area: "Press Shop",
              line: "Press",
              owner: "Production",
              status: "Breakdown",
              criticality: "High",
              installDate: "2021-04-18",
              lastMaintenance: "2026-02-25",
              nextPmDate: "2026-03-26",
              healthScore: 39,
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (err) {
        setError(err.message || "Failed to load equipment list");
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      const matchSearch =
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.area.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchArea = areaFilter === "all" ? true : item.area === areaFilter;

      return matchSearch && matchStatus && matchArea;
    });
  }, [equipments, searchTerm, statusFilter, areaFilter]);

  const summary = useMemo(() => {
    return {
      total: equipments.length,
      running: equipments.filter((e) => e.status === "Running").length,
      maintenance: equipments.filter((e) => e.status === "Maintenance").length,
      breakdown: equipments.filter((e) => e.status === "Breakdown").length,
    };
  }, [equipments]);

  const areaOptions = useMemo(() => {
    return [...new Set(equipments.map((item) => item.area))];
  }, [equipments]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Running":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "Idle":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Maintenance":
        return "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300";
      case "Breakdown":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getCriticalityClass = (criticality) => {
    switch (criticality) {
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

  const getHealthBarClass = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Equipment List" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Equipment Master Data</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              View equipment details, operating status, maintenance schedule, and asset ownership.
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
            title="Total Equipment"
            value={summary.total}
            icon={<Cpu size={18} />}
            color="sky"
          />
          <SummaryCard
            title="Running"
            value={summary.running}
            icon={<CheckCircle2 size={18} />}
            color="emerald"
          />
          <SummaryCard
            title="Under Maintenance"
            value={summary.maintenance}
            icon={<Wrench size={18} />}
            color="amber"
          />
          <SummaryCard
            title="Breakdown"
            value={summary.breakdown}
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
                  placeholder="Search by equipment no, name, model, serial no, area"
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
                <option value="Running">Running</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Breakdown">Breakdown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Area
              </label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Areas</option>
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-gray-500 dark:text-zinc-400">
            Loading equipment list...
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
                <h2 className="text-lg font-semibold">Equipment List</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing {filteredEquipments.length} of {equipments.length} equipment items
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredEquipments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-zinc-500">
                        {item.equipmentNo}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {item.model}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                      <span
                        className={`text-sm font-semibold ${getCriticalityClass(item.criticality)}`}
                      >
                        {item.criticality} Critical
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <InfoItem label="Serial No" value={item.serialNo} />
                    <InfoItem label="Category" value={item.category} />
                    <InfoItem label="Area" value={item.area} />
                    <InfoItem label="Line" value={item.line} />
                    <InfoItem label="Owner" value={item.owner} />
                    <InfoItem label="Install Date" value={item.installDate} />
                    <InfoItem label="Last Maintenance" value={item.lastMaintenance} />
                    <InfoItem label="Next PM" value={item.nextPmDate} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Health Score
                      </p>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {item.healthScore}%
                      </p>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getHealthBarClass(
                          item.healthScore
                        )}`}
                        style={{ width: `${item.healthScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-zinc-400 mb-5">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>
                      Installed in <span className="font-medium text-gray-700 dark:text-zinc-300">{item.area}</span> under{" "}
                      <span className="font-medium text-gray-700 dark:text-zinc-300">{item.owner}</span> responsibility.
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
                      Edit Equipment
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEquipments.length === 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
                <p className="text-gray-500 dark:text-zinc-400">
                  No equipment found for the selected filters.
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