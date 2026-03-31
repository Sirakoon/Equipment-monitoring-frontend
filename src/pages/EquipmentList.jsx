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
        setEquipments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load equipments");
        setEquipments([]);
      } finally {
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