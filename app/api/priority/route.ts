import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // const { searchParams } = new URL(req.url);
    // const type = searchParams.get("type");
    // if (type === "priority") {
      const res = await pool?.query("SELECT * FROM priority ORDER BY id DESC");
      return NextResponse.json(res?.rows, { status: 200 });
    // } else {
    //   const res = await pool?.query("SELECT email FROM user_table;");
    //   return NextResponse.json(res?.rows, { status: 200 });
    // }
  } catch (error) {
    console.error("Error fetching priority:", error);
    return NextResponse.json(
      { message: "Error fetching priorities" },
      { status: 500 }
    );
  }
}
