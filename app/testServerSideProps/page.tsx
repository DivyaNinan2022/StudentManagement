"use client";
import { useEffect, useState } from "react";
import { getServerSideProps } from "../api/tasks/taskApi";

function Page() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getServerSideProps();
        setTasks(data.props.tasks);
      } catch (err) {
        setError("Error fetching tasks");
        console.error("Server Error fetching tasks:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {Array.isArray(tasks) ? (
          tasks.map((task: any) => <li key={task.id}>{task.title}</li>)
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default Page;
