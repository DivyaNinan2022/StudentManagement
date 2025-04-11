import axios from "axios";

const API_URL = process.env.API_URL || "api/searchByEmail"; // Example API

export const fetchTasksByEmail = async (value: string) => {
    const response = await axios.get(`${API_URL}?email=${value}`);
  return response.data;
};
