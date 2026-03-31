import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const reportService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.reports, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch reports");
      return await response.json();
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.reports}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch report");
      return await response.json();
    } catch (error) {
      console.error("Error fetching report:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.reports, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create report");
      return await response.json();
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${endpoints.reports}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete report");
      return await response.json();
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error;
    }
  },
};