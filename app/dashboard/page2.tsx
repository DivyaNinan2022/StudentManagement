'use client'
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "@/components/Dashboard/Draggable";
import Droppable from "@/components/Dashboard/Droppable";


export default function page() {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null);
  }
}
