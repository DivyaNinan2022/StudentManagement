import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const emailType = searchParams.get("email");
    console.log("emailType === ", emailType);
    if (emailType === "All" || !emailType) {
      const res = await pool?.query("SELECT email FROM user_table");
      return NextResponse.json(res?.rows, { status: 200 });
    } else {
      const res = await pool?.query(
        "SELECT username FROM user_table where email=$1;",
        [emailType]
      );
      return NextResponse.json(res?.rows, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching priority:", error);
    return NextResponse.json(
      { message: "Error fetching priorities" },
      { status: 500 }
    );
  }
}
