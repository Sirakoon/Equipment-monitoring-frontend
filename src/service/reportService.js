import { endpoints } from "../api";

export async function getReports() {
  const res = await fetch(endpoints.reports);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}