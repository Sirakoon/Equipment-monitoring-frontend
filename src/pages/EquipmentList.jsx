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
import { equipmentService } from "../service/equipmentService";

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
        const data = await equipmentService.getAll();
        setEquipments(data);
      } catch (err) {
        setError(err.message || "Failed to load equipments");
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      const matchArea = areaFilter === "all" ? true : item.area === areaFilter;

      return matchSearch && matchStatus && matchArea;
    });
  }, [equipments, searchTerm, statusFilter, areaFilter]);

  const areas = useMemo(() => {
    return [...new Set(equipments.map((e) => e.area))];
  }, [equipments]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Running":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "Idle":
        return "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300";
      case "Maintenance":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
      case "Breakdown":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Running":
        return <CheckCircle2 size={16} />;
      case "Breakdown":
        return <AlertTriangle size={16} />;
      case "Maintenance":
        return <Wrench size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <BarNav title="Equipment List" />

      <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900 dark:text-zinc-100">
        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            >
              <option value="all">All Status</option>
              <option value="Running">Running</option>
              <option value="Idle">Idle</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Breakdown">Breakdown</option>
            </select>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 flex items-center gap-2"
            >
              <RefreshCw size={18} /> Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading equipments...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEquipments.map((equipment) => (
              <div
                key={equipment.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Cpu size={20} className="text-sky-600" />
                    <div>
                      <h3 className="font-bold text-sm">{equipment.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">
                        {equipment.equipmentNo}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(
                      equipment.status
                    )}`}
                  >
                    {getStatusIcon(equipment.status)}
                    {equipment.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Model:</span>
                    <span className="font-medium">{equipment.model}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-gray-400 mt-1" />
                    <span className="text-gray-600 dark:text-zinc-400">{equipment.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Health:</span>
                    <span className="font-bold text-sky-600">{equipment.healthScore}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Last PM:</span>
                    <span>{equipment.lastMaintenance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredEquipments.length === 0 && (
          <div className="text-center py-12 text-gray-500">No equipments found</div>
        )}
      </div>
    </div>
  );
}
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