"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksThunk,
  addTaskThunk,
  toggleTaskThunk,
  Task,
} from "../../redux/taskSlice";
import { RootState, AppDispatch } from "../../redux/store";
import "../../css/task.css";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const [taskName, setTaskName] = useState("");
  const taskListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(fetchTasksThunk() as any);
  }, []);

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      dispatch(addTaskThunk(taskName) as any);
      setTaskName("");
    }
  };

  const handleToggleTask = (task: Task) => {
    dispatch(toggleTaskThunk({ id: task.id, status: !task.status }));
  };

  useEffect(() => {
    if (taskListRef.current) {
      taskListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [tasks]);

  return (
    <div className="container">
      <h1>Task Management</h1>
      <input
        type="text"
        className="inputStyleTable"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div className="task-list-container ">
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul ref={taskListRef} className="ulStyle">
            {tasks && tasks.length > 0 ? (
              tasks.map((task: Task) => (
                <li key={task.id} className="listStyle">
                  {task.title}
                  <button onClick={() => handleToggleTask(task)} className="buttonStyle">
                    {task.status ? "Undo" : "Complete"}
                  </button>
                </li>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
