import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import SortableItem from "./sortable_item";

const containerStyle: React.CSSProperties = {
  background: "#dff8f6",
  padding: 10,
  margin: 10,
  flex: 1,
  maxHeight: "70vh", // or any height constraint
  overflowY: "auto", // enables vertical scrolling
  borderRadius: 8,
};

export default function Container(props: { id: any; items: any; data?: any }) {
  const { id, items, data } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      className="scrollable-container"
    >
      <h3>{id.toUpperCase()}</h3>
      <TooltipProvider>
        {items &&
          items?.length > 0 &&
          items?.map((id: any, index: number) => (
            <Tooltip key={`${id}-${index}`}>
              <TooltipTrigger>
                <div
                  style={{
                    padding: "8px",
                    margin: "2px",
                    cursor: "grab",
                    minWidth: "50px",
                  }}
                  className={`sortable-item`}
                >
                  <SortableContext
                    id={id}
                    items={items}
                    strategy={verticalListSortingStrategy}
                  >
                    <SortableItem key={`${id}-${index}`} id={id} />
                  </SortableContext>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-black text-white text-sm px-3 py-2 rounded-md shadow-lg max-w-xs transition duration-200 ease-in-out"
              >
                assigned to {id?.assignee}
              </TooltipContent>
            </Tooltip>
          ))}
      </TooltipProvider>
    </div>
  );
}
