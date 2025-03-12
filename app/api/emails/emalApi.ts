import axios from "axios";

const API_URL = process.env.API_URL || "api/emails"; // Example API

export const fetchEmails = async (type: string) => {
  if (type !== "All") {
    const response = await axios.get(`${API_URL}?email=${type}`);
    return response.data;
  } else {
    const response = await axios.get(API_URL);
    return response.data;
  }
};
export const getAssigneeName = async (email: string) => {
  const response = await axios.post(API_URL, { email });
  return response.data;
};
