import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const equipmentService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.equipments, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch equipments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching equipments:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.equipments}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch equipment");
      return await response.json();
    } catch (error) {
      console.error("Error fetching equipment:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.equipments, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create equipment");
      return await response.json();
    } catch (error) {
      console.error("Error creating equipment:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.equipments}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update equipment");
      return await response.json();
    } catch (error) {
      console.error("Error updating equipment:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${endpoints.equipments}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete equipment");
      return await response.json();
    } catch (error) {
      console.error("Error deleting equipment:", error);
      throw error;
    }
  },
};
