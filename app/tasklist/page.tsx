"use client";

import TaskTableList from "@/components/TaskTableList";
import {
  AddTask,
  addTaskSelector,
  getEmailsFnInSlice,
  getPrioritiesFnInSlice,
  getTaskFnSlice,
  getTaskForOtherUsersSlice,
} from "@/redux/addTaskSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { setLoadingNavBar } from "@/redux/navbarSlice";
import Cookies from "js-cookie";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector(addTaskSelector);
  const { isOpen, loadingNavBar } = useSelector(
    (state: RootState) => state.navbar
  );

  const permission = Cookies.get("LoginUserPermission") || "";
  const username = Cookies.get("UserEmail") || "";

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingNavBar(false));
      if (permission === "1") {
        await dispatch(getTaskFnSlice());
      } else {
        await dispatch(getTaskForOtherUsersSlice(username));
      }
      dispatch(getPrioritiesFnInSlice());
      dispatch(getEmailsFnInSlice());
    };
    fetchData();
  }, []);

  const updatedTasks = tasks.map((task) => ({
    ...task,
    isEdit: true,
  }));

  if (loadingNavBar || loading) {
    return <Loader />;
  }

  return (
    <div className={isOpen ? "mainContainer" : "mainContainerClosed"}>
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
      <TaskTableList tasks={updatedTasks} />
    </div>
  );
}
