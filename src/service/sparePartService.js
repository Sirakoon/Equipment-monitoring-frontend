import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const sparePartService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.spareParts, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch spare parts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.spareParts}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch spare part");
      return await response.json();
    } catch (error) {
      console.error("Error fetching spare part:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.spareParts, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create spare part");
      return await response.json();
    } catch (error) {
      console.error("Error creating spare part:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.spareParts}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update spare part");
      return await response.json();
    } catch (error) {
      console.error("Error updating spare part:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${endpoints.spareParts}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete spare part");
      return await response.json();
    } catch (error) {
      console.error("Error deleting spare part:", error);
      throw error;
    }
  },
};
