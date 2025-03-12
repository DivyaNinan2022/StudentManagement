import { Task } from "@/lib/config";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch tasks from database
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("/api/tasks");
  return response.json();
});

// Add task to database
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title: string) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, status: false }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }
);

const taskSlice1 = createSlice({
  name: "tasks1",
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<string | number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = !task.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});

export const { toggleTask } = taskSlice1.actions;
export default taskSlice1.reducer;
