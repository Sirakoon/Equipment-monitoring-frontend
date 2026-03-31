import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const userService = {
  async getAll() {
    try {
      const response = await fetch(endpoints.users, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch users");
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${endpoints.users}/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch user");
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(endpoints.users, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create user");
      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.users}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update user");
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${endpoints.users}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete user");
      return await response.json();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
