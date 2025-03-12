import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDetails, signUpApi } from "@/app/api/signUp/signUpApi";
import { RootState } from "./store";

export interface SignUpData {
  id?: number | string;
  email: string;
  username: string;
  password: string;
  permission?: number;
}

interface SignUpState {
  userData?: SignUpData;
  permission?: number | null;
  loading: boolean;
  error: string | null;
}
const initialStateForUserData = {
  id: "",
  email: "",
  username: "",
  password: "",
};
const initialState: SignUpState = {
  userData: initialStateForUserData,
  permission: null,
  loading: false,
  error: "",
};
interface LoginError {
  message: string;
}

// Add a new task
export const signUpFnSlice = createAsyncThunk(
  "signUp/signUpApi",
  async (data: SignUpData, { rejectWithValue }) => {
    try {
      const response = await signUpApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding User");
    }
  }
);

// Add a new task
export const getLoginDetails = createAsyncThunk<
  any, // Successful response type
  { email: string; password: string }, // Args type
  { rejectValue: LoginError; error?: string } // Rejected value type
>("signUp/LoginDetails", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await LoginDetails(email, password);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error adding User");
  }
});
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = initialStateForUserData;
    },
    clearError: (state) => {
      state.error = "";
    },
    setPermission: (state, action) => {
      state.permission =action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(signUpFnSlice.fulfilled, (state, action) => {
    //   state.userData = action.payload;
    // });

    builder
      .addCase(getLoginDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.permission = action.payload?.permission || null;
      })
      .addCase(getLoginDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoginDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Failed to login";
      });
  },
});
export const { clearError, clearUserData, setPermission } = signUpSlice.actions;
export const loginSelector = (state: RootState) => state.signUp;
export default signUpSlice.reducer;
