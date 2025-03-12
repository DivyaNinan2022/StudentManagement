import axios from "axios";

const API_URL = process.env.API_URL || "/api/fetchTasksForOtherUsers"; // Ensure leading "/"

export const fetchTasksForOtherUsers = async (email: string) => {
  console.log("📧 Email sent to API:", email);
  console.log("📡 Fetching from:", `${API_URL}?email=${email}`);

  try {
    const response = await axios.get(`${API_URL}?email=${email}`);
    console.log("✅ API Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.status, error.message);
    console.error("❌ Full Error Object:", error);
    throw error; // Ensure caller knows the request failed
  }
};
