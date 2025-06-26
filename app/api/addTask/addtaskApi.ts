import { AddTask } from "@/redux/addTaskSlice";
import axios from "axios";

const API_URL = process.env.API_URL || "api/addTask"; // Example API

export const fetchTasks = async (pageno: string) => {
  const response = await axios.get(`${API_URL}?page=${pageno}`);
  return response.data;
};

export const addTask = async (data: AddTask) => {
  const response = await axios.post(API_URL, { data});
  return response.data;
};

export const updateTask = async (data: AddTask) => {
  const response = await axios.put(API_URL, { data});
  return response.data;
};

export const toggleTask = async (id: number | string, status: boolean) => {
  const response = await axios.patch(`${API_URL}/${id}`, { status });
  return response.data;
};
