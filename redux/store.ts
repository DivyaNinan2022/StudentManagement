// app/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import addTaskReducer from "./addTaskSlice";
import navbarReducer from "./navbarSlice";
import signUpReducer from "./signUpSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    tasks: tasksReducer,
    addTask: addTaskReducer,
    signUp: signUpReducer,
    dashboard: dashboardReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
