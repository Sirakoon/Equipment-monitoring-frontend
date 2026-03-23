export function formatDateTime(dateStr) {
  if (!dateStr || dateStr === "-") return "-";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}