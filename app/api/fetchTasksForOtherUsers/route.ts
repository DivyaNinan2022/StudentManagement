import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const res = await pool?.query(`SELECT * FROM addtasks WHERE email = $1;`, [
      email,
    ]);
    console.log("ressss111", res);
    return NextResponse.json(res?.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 }
    );
  }
}
