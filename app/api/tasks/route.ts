
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await pool?.query("SELECT * FROM tasks ORDER BY id DESC;");
    return NextResponse.json(res?.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const { title, status = false } = await req.json();
    const result = await pool?.query(
      "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *;",
      [title, status]
    );
    // Extract the inserted task from the result
    const newTask = result?.rows[0];
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ message: "Error adding task" }, { status: 500 });
  }
}
