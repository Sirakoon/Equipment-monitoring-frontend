export function getEquipmentStatusClass(status) {
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
}

export function getPriorityClass(priority) {
  switch (priority) {
    case "High":
      return "text-rose-600 dark:text-rose-400";
    case "Medium":
      return "text-amber-600 dark:text-amber-400";
    case "Low":
      return "text-emerald-600 dark:text-emerald-400";
    default:
      return "text-gray-500 dark:text-zinc-400";
  }
}

export function getBreakdownStatusClass(status) {
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
}

export function getStockStatusClass(status) {
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
}

export function getUserStatusClass(status) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
    case "Inactive":
      return "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}

export function getReportStatusClass(status) {
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
}