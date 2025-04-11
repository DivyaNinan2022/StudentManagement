"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Cookies from "js-cookie";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "./Container";
import { Item } from "./sortable_item";
import { updateDragStatusFnSlice } from "@/redux/dashboardSlice";
import { useDispatch } from "react-redux";
import {
  getTaskFnSlice,
  getTaskForOtherUsersSlice,
} from "@/redux/addTaskSlice";

interface dragProps {
  draftValues: string[];
  pendingValues: string[];
  progressValues: string[];
  completedValues: string[];
  taskValues?: Record<string, { assignee: string; tasktitle: string }[]>;
  setTaskValues?: Dispatch<
    SetStateAction<
      Record<string, { id: string; assignee: string; tasktitle: string }[]>
    >
  >;
}
export default function DraggableComponents({
  draftValues,
  pendingValues,
  progressValues,
  completedValues,
  taskValues,
  setTaskValues,
}: dragProps) {
  const permission = Cookies.get("LoginUserPermission") || "";
  const username = Cookies.get("UserEmail") || "";
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [items, setItems] = useState<Record<string, string[]>>({
    // Draft: draftValues?.map((item: any) => item.tasktitle) || [],
    Draft: draftValues || [],
    Pending: pendingValues || [],
    inProgress: progressValues || [],
    Completed: completedValues || [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setItems({
        Draft: draftValues || [],
        Pending: pendingValues || [],
        inProgress: progressValues || [],
        Completed: completedValues || [],
      });
    }
  }, [draftValues, pendingValues, progressValues, completedValues]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id: string) {
    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event: { active: any }) {
    setActiveId(event.active.id);
  }

  const handleDragEnd = async (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (!over) return;

    const id = active.id;
    const overId = over.id;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId) ?? overId;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      if (!prev[activeContainer]?.includes(id)) return prev; // Ensure the item exists before moving

      const activeItems = prev[activeContainer].filter((item) => item !== id);
      const overItems = [...prev[overContainer]];
      const overIndex = overItems.indexOf(overId);
      const newIndex = overIndex >= 0 ? overIndex : overItems.length;

      overItems.splice(newIndex, 0, id); // Insert item at the new position

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter((item) => item !== id),
        [overContainer]: [...(prev[overContainer] || []), id], // Handle empty containers
      };
    });
    const data = {
      id: id?.id,
      status: overContainer,
    };
    dispatch<any>(updateDragStatusFnSlice(data)).then((res: any) => {
      if (res?.payload && res?.payload?.data) {
        if (permission == "1") {
          dispatch<any>(getTaskFnSlice());
        } else {
          dispatch<any>(getTaskForOtherUsersSlice(username));
        }
      }
    });
    setActiveId(null);
  };

  // function handleDragEnd(event: { active: any; over: any }) {
  //   const { active, over } = event;

  //   if (!over) return;
  //   const id = active.id;
  //   const overId = over.id;
  //   const activeContainer = findContainer(active.id);
  //   const overContainer: any = findContainer(over.id);

  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer !== overContainer
  //   ) {
  //     return;
  //   }

  //   const activeIndex = items[activeContainer].indexOf(active.id);
  //   const overIndex = items[overContainer].indexOf(over.id);

  //   if (activeIndex !== overIndex) {
  //     setItems((prev) => ({
  //       ...prev,
  //       [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
  //     }));
  //     console.log("data in handleDragEndddd", overContainer);
  //     const data = {
  //       id: overContainer.id,
  //       status: overContainer.status,
  //     };
  //     dispatch<any>(updateDragStatusFnSlice(data));
  //   }
  //   setActiveId(null);
  //   console.log(id, "data in handleDraendddddddddddddddd", overContainer);
  // }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        // screenReaderInstructions={{
        //     draggable:
        //       "Use the arrow keys to move the item. Press space bar to pick up, and space bar again to drop.",
        //   }}
      >
        <Container id="Draft" items={items.Draft} data={draftValues} />
        <Container id="Pending" items={items.Pending} data={pendingValues} />
        <Container
          id="inProgress"
          items={items.inProgress}
          data={progressValues}
        />
        <Container
          id="Completed"
          items={items.Completed}
          data={completedValues}
        />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
