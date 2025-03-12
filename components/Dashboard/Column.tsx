"use client";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({ title, tasks, setTasks }: any) {
  const { setNodeRef } = useDroppable({ id: title });
  return (
    <div ref={setNodeRef} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <SortableContext
        items={tasks.filter((t: { status: any }) => t.status === title)}
      >
        {tasks
          .filter((task: { status: any }) => task.status === title)
          .map((task: any) => (
            <TaskCard key={task?.id} task={task} />
          ))}
      </SortableContext>
    </div>
  );
}
