"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props: { id: any }) {
  const { id } = props;
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  // Utility to convert string to consistent pastel HSL color
  const getColorFromName = (name: string = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 60%, 85%)`; // pastel color
  };

  const backgroundColor = getColorFromName(id?.assignee);

  const style: React.CSSProperties = {
    minWidth: "16vw",
    maxWidth: "18vw",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px",
    margin: "3 0",
    background: backgroundColor,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderRadius: 8, // optional polish
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // optional polish
  };

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      requestAnimationFrame(() => {
        const isOverflowing = el.scrollWidth > el.clientWidth;
        setIsOverflowed(isOverflowing);
      });
    }
  }, [id.tasktitle]);

  return (
    <div style={style} className="">
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
          width: "100%",
          textAlign: "center",
        }}
        title={id.tasktitle}
      >
        {id.tasktitle}
      </span>
    </div>
  );
}

export default function SortableItem(props: { id: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}
