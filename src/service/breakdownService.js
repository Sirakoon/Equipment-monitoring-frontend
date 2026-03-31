import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const breakdownService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.breakdownHistory, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch breakdown history");
      return await response.json();
    } catch (error) {
      console.error("Error fetching breakdown history:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.breakdownHistory}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch breakdown record");
      return await response.json();
    } catch (error) {
      console.error("Error fetching breakdown record:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.breakdownHistory, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create breakdown record");
      return await response.json();
    } catch (error) {
      console.error("Error creating breakdown record:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.breakdownHistory}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update breakdown record");
      return await response.json();
    } catch (error) {
      console.error("Error updating breakdown record:", error);
      throw error;
    }
  },
};
