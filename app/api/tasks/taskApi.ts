import axios from "axios";

const API_URL = process.env.API_URL || 'api/tasks' // Example API

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export async function getServerSideProps() {
  try {
    const res = await axios.get("api/tasks"); // Adjust if deployed
    return {
      props: { tasks: res.data }, // Pass data to page
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      props: { tasks: [] }, // Fallback empty array
    };
  }
}
export const addTask = async (title: string) => {
  const response = await axios.post(API_URL, { title, status: 'Draft' });
  return response.data;
};

export const toggleTask = async (id: number | string, status: boolean) => {
  const response = await axios.patch(`${API_URL}/${id}`, { status });
  return response.data;
};
