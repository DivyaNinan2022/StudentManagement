import {
  fetchAllTasks,
  updateDragStatus,
} from "@/app/api/dashboard/dashboardApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AddTask, dragData } from "./addTaskSlice";

interface DragStatusState {
  allTasks: AddTask[];
  dragDatas: dragData;
  loading: boolean;
  error: string | null;
}
const initialTaskForAddTask: AddTask = {
  id: "",
  tasktitle: "",
  description: "",
  startdate: "",
  enddate: "",
  priority: "",
  assignee: "",
  email: "",
  status: "Draft",
};

const initialState: DragStatusState = {
  allTasks: [initialTaskForAddTask],
  dragDatas: { id: "", status: "" },
  loading: false,
  error: null,
};

// Update  a task
export const updateDragStatusFnSlice = createAsyncThunk(
  "addTasks/updateTask",
  async (updatedData: dragData, { rejectWithValue }) => {
    try {
      const response = await updateDragStatus(updatedData);
      toast.success("Success! One Task is added");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding task");
    }
  }
);

//Get all tasks
export const getAllTaskFnSlice = createAsyncThunk(
  "addTasks/fetchAllTasks",
  async () => {
    const response = await fetchAllTasks();
    console.log("ressss", response);
    return response;
  }
);

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDragStatusFnSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.dragDatas = action.payload;
      })
      .addCase(updateDragStatusFnSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllTaskFnSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.allTasks = action.payload;
      });
    //   .addCase(updateDragStatusFnSlice.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.dragDatas = action.payload;
    //   });
  },
});

// export const { toggleNavBar, setLoadingNavBar } = dashboardSlice.actions;
export default dashboardSlice.reducer;
