import axios from "axios";

const API_URL = process.env.API_URL || "api/priority"; 

export const fetchPriorities = async () => {
  const response = await axios.get(API_URL);
  // const response = await axios.get(`${API_URL}?type=${type}`);
  return response.data;
};
