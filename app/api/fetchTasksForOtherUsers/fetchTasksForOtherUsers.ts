import axios from "axios";

const API_URL = process.env.API_URL || "/api/fetchTasksForOtherUsers"; // Ensure leading "/"

export const fetchTasksForOtherUsers = async (email: string) => {

  try {
    const response = await axios.get(`${API_URL}?email=${email}`);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.status, error.message);
    console.error("Full Error Object:", error);
    throw error;
  }
};
