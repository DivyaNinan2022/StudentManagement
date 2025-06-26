"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Summary Cards Data
const summaryStats = [
  { count: 36, label: "Total Students Online", bg: "#1abc9c" },
  { count: 300, label: "Total Batches", bg: "#2ecc71" },
  { count: 11, label: "Total Mentors", bg: "#e74c3c" },
];

// Chart Data
const teachingPieData = [
  { name: "Active Male", value: 12 },
  { name: "Active Female", value: 15 },
];

const nonTeachingPieData = [
  { name: "Active Male", value: 3 },
  { name: "Active Female", value: 5 },
  { name: "Deactive Female", value: 5 },
];

const attendanceData = [
  { date: "2025-06-24",location: "Kochi", Online: 93, Offline: 81 },
  { date: "2025-06-24",location: "Calicut", Online: 99, Offline: 91 },
  {date: "2025-06-24", location: "Trivandrum", Online: 93, Offline: 93 },
  { date: "2025-06-24",location: "Banglore", Online: 93, Offline: 96 },
    { date: "2025-06-24",location: "Dubai", Online: 63, Offline: 83 },
  { date: "2025-06-24",location: "Delhi", Online: 13, Offline: 76 },
   { date: "2025-06-20",location: "Kochi", Online: 23, Offline: 61 },
  { date: "2025-06-20",location: "Calicut", Online: 39, Offline: 81 },
  {date: "2025-06-20", location: "Trivandrum", Online: 43, Offline: 73 },
  { date: "2025-06-20",location: "Banglore", Online: 13, Offline: 46 },
    { date: "2025-06-20",location: "Dubai", Online: 63, Offline: 53 },
  { date: "2025-06-20",location: "Delhi", Online: 33, Offline: 76 },
];

// Pie Colors
const pieColors = ["#3498db", "#2ecc71", "#e67e22"];

export default function DashboardStudent() {
   const [selectedDate, setSelectedDate] = useState("2025-06-24");

  const filteredData = attendanceData.filter(
    (entry) => entry.date === selectedDate
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {summaryStats.map((item, index) => (
          <div
            key={index}
            style={{
              background: item.bg,
              color: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              flex: "1 1 200px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              {item.count}
            </div>
            <div style={{ fontSize: "16px", marginTop: "5px" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {/* <div
        style={{
          display: "flex",
          gap: "20px",
          width:"100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      > */}
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        {/* Summary Cards */}
        {/* ... your existing summary card code ... */}

        {/* 👇 First Row: Teaching & Non-Teaching Pie Charts */}
    

        {/* 👇 Second Row: Attendance Bar Chart */}
            <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h4>Attendence List in each location</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Online" fill="#f1c40f" />
              <Bar dataKey="Offline" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
