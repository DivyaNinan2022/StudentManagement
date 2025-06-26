import {  dragData } from "@/redux/addTaskSlice";
import axios from "axios";

const API_URL = process.env.API_URL || "api/dashboard";

export const updateDragStatus = async (data: dragData) => {
  const response = await axios.put(API_URL, { data});
  return response.data;
};
export const fetchAllTasks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};