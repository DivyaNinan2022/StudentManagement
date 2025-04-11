"use client";

import TaskTableList from "@/components/TaskTableList";
import {
  AddTask,
  addTaskSelector,
  getEmailsFnInSlice,
  getPrioritiesFnInSlice,
  getTaskFnSlice,
} from "@/redux/addTaskSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { setLoadingNavBar } from "@/redux/navbarSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchTasks = async () => {
  const { data } = await axios.get("/api/addTask");
  return data;
};

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
 const {tasks} = useSelector(addTaskSelector)
  const { isOpen, loadingNavBar } = useSelector((state: RootState) => state.navbar);

  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const [updateTasks, setupdatedTask] = useState(tasks);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setLoadingNavBar(false));
      await dispatch(getTaskFnSlice());
    };
    fetchData();
    dispatch(getPrioritiesFnInSlice());
    dispatch(getEmailsFnInSlice());
  }, []);

  useEffect(() => {


  },[tasks]);


  // Add `isEdit: false` to each task
  const updatedTasks = data?.map((task: AddTask[]) => ({
    ...task,
    isEdit: true,
  }));

  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={isOpen ? "mainContainer" : "mainContainerClosed"}>
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
      {isLoading || loadingNavBar ? <Loader /> : <TaskTableList tasks={updatedTasks} />}
    </div>
  );
}
