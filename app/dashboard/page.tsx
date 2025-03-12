"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getTaskFnSlice, getTaskForOtherUsersSlice } from "@/redux/addTaskSlice";
import Column from "@/components/Dashboard/Column";
import Loader from "@/components/Loader";
import { loginSelector } from "@/redux/signUpSlice";

const columns = ["Draft", "inProgress", "Pending", "Done"];

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { permission } = useSelector(loginSelector);
  useEffect(() => {
    if (permission === 1) {
      dispatch(getTaskFnSlice());
    } else {
      dispatch(getTaskForOtherUsersSlice("peter@peter.com"));
    }
  }, [dispatch]);

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.addTask
  );

  const [taskValues, setTaskValues] = useState(tasks);

  useEffect(() => {
    setTaskValues(tasks);
  }, [tasks]);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = taskValues.find((task) => task.id === active.id);
    const newColumn = over.id; // This is the column where the task is dropped

    if (!activeTask || !newColumn || activeTask.status === newColumn) return;

    // Update task status when moved to another column
    setTaskValues((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeTask.id ? { ...task, status: newColumn } : task
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
      {loading  ? (
        <Loader />
      ) : (
        <>
          {/* Progress Chart */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taskValues} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="title" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="progress" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Kanban Task Board */}
          <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {columns.map((status) => (
                <SortableContext
                  key={status}
                  id={status} // This is important for identifying where the task is dropped
                  items={taskValues
                    ?.filter((task) => task.id !== undefined) // Ensure IDs are defined
                    .map((task) => String(task.id))} // Convert all IDs to strings
                  strategy={verticalListSortingStrategy}
                >
                  <Column
                    title={status}
                    tasks={taskValues}
                    setTasks={setTaskValues}
                  />
                </SortableContext>
              ))}
            </div>
          </DndContext>
        </>
      )}
    </div>
  );
}
