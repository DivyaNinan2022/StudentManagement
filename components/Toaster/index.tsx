"use client";

import zIndex from "@mui/material/styles/zIndex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored" // Options: "light", "dark", "colored"
      style={{ zIndex: 10000 }}
    />
  );
}
