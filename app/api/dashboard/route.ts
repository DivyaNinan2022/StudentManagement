import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req: NextRequest) {
  try {
    // Read and parse the request body
    const body = await req.json();

    const { status, id } = body?.data;
    // Validate required fields
    if (!id || !status) {
      return NextResponse.json(
        { message: "Missing required fieldddddddddddddddds" },
        { status: 400 }
      );
    }

    // Corrected UPDATE SQL Query
    const result = await pool?.query(
      `UPDATE addtasks 
       SET status = $1 
       WHERE id = $2 
       RETURNING *;`,
      [status, id]
    );

    // Check if any row was updated
    if (result?.rowCount === 0) {
      return NextResponse.json(
        { message: "Status not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: result?.rows[0], saveStatus: true, saveStatusMessage: "Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { message: "Error updating status" },
      { status: 500 }
    );
  }
}
