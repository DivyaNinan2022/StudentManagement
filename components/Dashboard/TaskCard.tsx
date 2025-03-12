"use client";
import { useSortable } from "@dnd-kit/sortable";

export default function TaskCard({ task }: any) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
      id: task.id,
    });
  
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="p-3 bg-blue-50 rounded-lg mb-2 shadow cursor-grab"
        style={{ transform: `translate(${transform?.x}px, ${transform?.y}px)` }}
      >
        <p className="font-semibold">{task.tasktitle}</p>
        <div className="h-2 bg-gray-300 rounded mt-1">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>
    );
  }