import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  isOpen: boolean;
  loadingNavBar: boolean;
}

const initialState: ToggleState = {
  isOpen: false,
  loadingNavBar: false,
};

const navBarSlice = createSlice({
  name: "navBarSlice",
  initialState,
  reducers: {
    toggleNavBar: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setLoadingNavBar: (state, action: PayloadAction<boolean>) => {
      state.loadingNavBar = action.payload;
    },
  },
});

export const { toggleNavBar, setLoadingNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;
