export function calculateDowntime(startTime, endTime) {
  if (!startTime || !endTime) return 0;

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  const diffMs = end - start;

  if (diffMs <= 0) return 0;

  return Math.floor(diffMs / 60000);
}

export function calculateDowntimeText(startTime, endTime) {
  const totalMinutes = calculateDowntime(startTime, endTime);

  if (totalMinutes <= 0) return "0 min";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;

  return `${hours} hr ${minutes} min`;
}