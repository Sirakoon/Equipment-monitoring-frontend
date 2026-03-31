const API_BASE = "http://localhost:7500/api";

export const endpoints = {
  auth: `${API_BASE}/auth`,
  users: `${API_BASE}/users`,
  equipments: `${API_BASE}/equipments`,
  maintenancePlans: `${API_BASE}/maintenance-plans`,
  breakdownHistory: `${API_BASE}/breakdown-history`,
  spareParts: `${API_BASE}/spare-parts`,
  reports: `${API_BASE}/reports`,
  support: `${API_BASE}/support`,
};