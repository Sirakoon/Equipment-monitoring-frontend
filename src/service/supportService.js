import { endpoints } from "../api";
import { authService } from "./authService";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const supportService = {
  // Get all support tickets
  async getAll() {
    try {
      const response = await fetch(endpoints.support, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch support tickets");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error fetching support tickets");
    }
  },

  // Get single ticket by ID
  async getById(id) {
    try {
      const response = await fetch(`${endpoints.support}/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch ticket");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error fetching ticket");
    }
  },

  // Create new support ticket
  async create(data) {
    try {
      const response = await fetch(endpoints.support, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create support ticket");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error creating support ticket");
    }
  },

  // Update support ticket
  async update(id, data) {
    try {
      const response = await fetch(`${endpoints.support}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update support ticket");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error updating support ticket");
    }
  },

  // Get tickets by status
  async getByStatus(status) {
    try {
      const response = await fetch(`${endpoints.support}/status/${status}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch tickets by status");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error fetching tickets");
    }
  },

  // Get tickets by priority
  async getByPriority(priority) {
    try {
      const response = await fetch(`${endpoints.support}/priority/${priority}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch tickets by priority");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error fetching tickets");
    }
  },

  // Get support statistics
  async getStatistics() {
    try {
      const response = await fetch(`${endpoints.support}/stats`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch support statistics");
      return await response.json();
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return { data: { total: 0, open: 0, resolved: 0 } };
    }
  },

  // Add comment to ticket
  async addComment(id, comment, author) {
    try {
      const response = await fetch(`${endpoints.support}/${id}/comment`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ comment, author }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error adding comment");
    }
  },

  // Close ticket
  async closeTicket(id, resolution) {
    try {
      const response = await fetch(`${endpoints.support}/${id}/close`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ resolution }),
      });
      if (!response.ok) throw new Error("Failed to close ticket");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Error closing ticket");
    }
  },
};
