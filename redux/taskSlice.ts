import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, addTask, toggleTask } from "../app/api/tasks/taskApi";

export interface Task {
  id: number | string;
  title: string;
  status: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch tasks
export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    return await fetchTasks();
  }
);

// Add a new task
export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (title: string) => {
    return await addTask(title);
  }
);

// Toggle task status
export const toggleTaskThunk = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, status }: { id: number | string; status: boolean }) => {
    return await toggleTask(id, status);
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload); // Add new task to the top
      })
      .addCase(toggleTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index].status = action.payload.status;
        }
      });
  },
});

export default tasksSlice.reducer;
