import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await pool?.query("SELECT * FROM addTasks ORDER BY id DESC;");
//     return NextResponse.json(res?.rows, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching priorities:", error);
//     return NextResponse.json(
//       { message: "Error fetching priorities" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = 8;
    const offset = (parseInt(page, 10) - 1) * limit;

    // Always fetch total count first
    const totalRes = await pool?.query("SELECT COUNT(*) FROM addTasks;");
    const totalCount = parseInt(totalRes?.rows[0]?.count || "0", 10);

    let res;

    if (page === "All") {
      res = await pool?.query("SELECT * FROM addTasks ORDER BY id DESC;");
    } else {
      res = await pool?.query(
        "SELECT * FROM addTasks ORDER BY id DESC LIMIT $1 OFFSET $2;",
        [limit, offset]
      );
    }

    return NextResponse.json(
      {
        data: res?.rows || [],
        totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Read and parse the request body once
    const body = await req.json();

    // Destructure values from the parsed body
    const {
      tasktitle,
      description,
      startdate,
      enddate,
      priority,
      assignee,
      email,
      status,
    } = body.data;

    // Ensure all required fields are present (optional validation)
    if (!tasktitle || !startdate || !enddate || !assignee || !email) {
      return NextResponse.json(
        { message: "Missing required fields11111111111111" },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await pool?.query(
      `INSERT INTO addtasks 
          (id, tasktitle, description, startdate, enddate, priority, assignee, email, status) 
         VALUES 
          ('wwd_tsm_' || LPAD(nextval('task_id_seq')::TEXT, 6, '0'), $1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *;`,
      [
        tasktitle,
        description,
        startdate,
        enddate,
        priority,
        assignee,
        email,
        status,
      ]
    );

    return NextResponse.json(result?.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ message: "Error adding task" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    // Read and parse the request body
    const body = await req.json();
    const {
      tasktitle,
      description,
      startdate,
      enddate,
      priority,
      assignee,
      email,
      status,
      id,
    } = body?.data;

    // Validate required fields
    if (!id || !tasktitle || !startdate || !enddate || !assignee || !email) {
      return NextResponse.json(
        { message: "Missing required fields2222222" },
        { status: 400 }
      );
    }

    // Corrected UPDATE SQL Query
    const result = await pool?.query(
      `UPDATE addtasks 
       SET tasktitle = $1, 
           description = $2, 
           startdate = $3, 
           enddate = $4, 
           priority = $5, 
           assignee = $6, 
           email = $7, 
           status = $8 
       WHERE id = $9 
       RETURNING *;`,
      [
        tasktitle,
        description,
        startdate,
        enddate,
        priority,
        assignee,
        email,
        status,
        id,
      ]
    );

    // Check if any row was updated
    if (result?.rowCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result?.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}
