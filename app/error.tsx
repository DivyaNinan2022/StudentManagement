"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);9446929568
  }, [error]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>⚠️ Something went wrong!</h1>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
      >
        Try Again
      </button>
    </div>
  );
}
