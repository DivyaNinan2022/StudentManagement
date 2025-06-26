import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  toggleTask,
  updateTask,
} from "../app/api/addTask/addtaskApi";
import { fetchPriorities } from "@/app/api/priority/priorityApi";
import { RootState } from "./store";
import { fetchTasksForOtherUsers } from "@/app/api/fetchTasksForOtherUsers/fetchTasksForOtherUsers";
import { toast } from "react-toastify";
import { fetchEmails } from "@/app/api/emails/emalApi";
import { sendEmail } from "@/app/api/sendEmailApi/fetchApi";
import { fetchTasksByEmail } from "@/app/api/searchByEmail/searchEmailApi";

export interface PriorityType {
  id: number | null;
  value: string;
  description: string;
}

export interface Task {
  id: number | string;
  title: string;
  status: string;
}

export interface AddTask {
  id?: string;
  tasktitle: string;
  description: string;
  startdate: string;
  enddate: string;
  priority: string;
  assignee: string;
  email: string;
  status?: string;
}

export interface AddTaskWithCount {
  data: AddTask[];
  totalCount: number;
}

export interface dragData {
  id: string;
  status: string;
}

export type EmailType = {
  email: string;
};

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

const initailTaskForAddTaskWithCount: AddTaskWithCount = {
  data: [initialTaskForAddTask],
  totalCount: 8,
};
export interface AddTasksState {
  tasksWithCount?:AddTaskWithCount;
  allTaskWithUser?:AddTask[];
  priorities?: PriorityType[];
  updatedTask: AddTask;
  emails?: EmailType[];
  username: string;
  tasks: AddTask[];
  loading: boolean;
  error: string | null;
}

const initialStateForPriority: PriorityType[] = [
  {
    id: null,
    value: "",
    description: "",
  },
];

const initialState: AddTasksState = {
  priorities: initialStateForPriority,
  emails: [],
  tasks: [],
  updatedTask: initialTaskForAddTask,
  username: "",
  loading: false,
  error: null,
};

export const fetchTaskFnSlice = createAsyncThunk(
  "addTasks/fetchTasks",
  async (pageNo: string) => {
    return await fetchTasks(pageNo);
  }
);

// Add a new task
export const addTaskFnSlice = createAsyncThunk(
  "addTasks/addTask",
  async (data: AddTask, { rejectWithValue }) => {
    try {
      const response = await addTask(data);
      toast.success("Success! One Task is added");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding task");
    }
  }
);

// Update  a task
export const updateTaskFnSlice = createAsyncThunk(
  "addTasks/updateTask",
  async (updatedTask: AddTask, { rejectWithValue }) => {
    try {
      const response = await updateTask(updatedTask);
      toast.success("Success! One Task is added");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding task");
    }
  }
);

//Get all tasks
export const getTaskFnSlice = createAsyncThunk(
  "addTasks/fetchTasks",
  async (pageNo: string) => {
    const response = await fetchTasks(pageNo);
    return response;
  }
);

//Get all tasks for non-admin users
export const getTaskForOtherUsersSlice = createAsyncThunk(
  "addTasks/fetchTasksForOtherUsers",
  async (email: string) => {
    const response = await fetchTasksForOtherUsers(email);
    return response;
  }
);

//Get all priorities
export const getPrioritiesFnInSlice = createAsyncThunk(
  "addTasks/fetchPriorities",
  async () => {
    const response = await fetchPriorities();
    return response;
  }
);

//Get all emails
export const getEmailsFnInSlice = createAsyncThunk(
  "addTasks/getAllEmails",
  async () => {
    const response = await fetchEmails("All");
    return response;
  }
);

//send the emails
export const sendtEmailsFnInSlice = createAsyncThunk(
  "addTasks/getAllEmails",
  async (data: any) => {
    const response = await sendEmail(data);
    return response;
  }
);

//Get all emails
export const getEmailForAssigneeFnInSlice = createAsyncThunk(
  "addTasks/getEmailByAssignee",
  async (emailType: string) => {
    const response = await fetchEmails(emailType);
    return response;
  }
);

//Get all emails
export const searchByEmail = createAsyncThunk(
  "addTasks/searchByEmail",
  async (emailType: string) => {
    const response = await fetchTasksByEmail(emailType);
    return response;
  }
);

// Toggle task status
export const toggleTaskThunk = createAsyncThunk(
  "addTasks/toggleTask",
  async ({ id, status }: { id: number | string; status: boolean }) => {
    return await toggleTask(id, status);
  }
);

const addTasksSlice = createSlice({
  name: "addTasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskFnSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.tasksWithCount = action.payload;
      })
      .addCase(getTaskForOtherUsersSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskForOtherUsersSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.allTaskWithUser = action.payload;
      })
      .addCase(getTaskForOtherUsersSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })

      .addCase(updateTaskFnSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskFnSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedTask = action.payload;
      })
      .addCase(updateTaskFnSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update tasks";
      })
      // .addCase(fetchTaskFnSlice.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchTaskFnSlice.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.tasks = action.payload;
      // })
      // .addCase(fetchTaskFnSlice.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || "Failed to load tasks";
      // })
      .addCase(addTaskFnSlice.fulfilled, (state, action) => {
        state.tasksWithCount?.data?.unshift(action.payload); // Add new task to the top
      })
      // .addCase(toggleTaskThunk.fulfilled, (state, action) => {
      //   const index = state.tasks.findIndex(
      //     (task) => task.id === action.payload.id
      //   );
      //   if (index !== -1) {
      //     state.tasks[index].status = action.payload.status;
      //   }
      // })
      .addCase(getPrioritiesFnInSlice.fulfilled, (state, action) => {
        state.priorities = action.payload; // Store the response in state
      })
      .addCase(getPrioritiesFnInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load priorities";
      })
      .addCase(getEmailsFnInSlice.fulfilled, (state, action) => {
        state.emails = action.payload; // Store the response in state
      })
      .addCase(getEmailForAssigneeFnInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed emails";
      })
      .addCase(getEmailForAssigneeFnInSlice.fulfilled, (state, action) => {
        state.username = action.payload; // Store the response in state
      })
      .addCase(getEmailsFnInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed emails";
      })
      .addCase(searchByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(searchByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});
export const { clearTasks, setTasks } = addTasksSlice.actions;
export const addTaskSelector = (state: RootState) => state.addTask;
export default addTasksSlice.reducer;
