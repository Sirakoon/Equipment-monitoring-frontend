import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const maintenanceService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.maintenancePlans, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch maintenance plans");
      return await response.json();
    } catch (error) {
      console.error("Error fetching maintenance plans:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.maintenancePlans}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch maintenance plan");
      return await response.json();
    } catch (error) {
      console.error("Error fetching maintenance plan:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.maintenancePlans, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create maintenance plan");
      return await response.json();
    } catch (error) {
      console.error("Error creating maintenance plan:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.maintenancePlans}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update maintenance plan");
      return await response.json();
    } catch (error) {
      console.error("Error updating maintenance plan:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${endpoints.maintenancePlans}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete maintenance plan");
      return await response.json();
    } catch (error) {
      console.error("Error deleting maintenance plan:", error);
      throw error;
    }
  },
};
