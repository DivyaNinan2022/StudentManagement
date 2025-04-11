import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const emailType = searchParams.get("email");
    const res = await pool?.query(
      "SELECT * FROM addtasks WHERE email ILIKE $1;",
      [`%${emailType}%`]
    );
    return NextResponse.json(res?.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching priority:", error);
    return NextResponse.json(
      { message: "Error fetching priorities" },
      { status: 500 }
    );
  }
}
