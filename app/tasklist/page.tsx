"use client";

import TaskTableList from "@/components/TaskTableList";
import { getTaskFnSlice } from "@/redux/addTaskSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { setLoadingNavBar } from "@/redux/navbarSlice";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingNavBar(false));
      await dispatch(getTaskFnSlice());``
    };
    fetchData();
  }, []);

  // Get Redux state
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.addTask
  );

  const { isOpen, loadingNavBar } = useSelector(
    (state: RootState) => state.navbar
  );

  // Add `isEdit: false` to each task
const updatedTasks = tasks.map(task => ({ ...task, isEdit: true }));

  return (
    <div className={isOpen ? "mainContainer" : "mainContainerClosed"}>
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
      {loading || loadingNavBar ? <Loader /> : <TaskTableList tasks={updatedTasks} />}
    </div>
  );
}
