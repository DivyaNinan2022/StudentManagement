import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Read and parse the request body once
    const body = await req.json();

    // Destructure values from the parsed body
    const { username, email, password } = body.data;
    // Ensure all required fields are present (optional validation)
    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "Missing required fields444444444" },
        { status: 400 }
      );
    }

    // Insert into database
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool?.query(
      `INSERT INTO user_table 
          (user_id, username, email, password) 
         VALUES 
          ('wwd_user_' || LPAD(CAST(nextval('task_id_seq') AS TEXT), 6, '0'), $1, $2, $3) 
         RETURNING *;`,
      [username, email, hashedPassword]
    );

    return NextResponse.json(result?.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ message: "Error adding user" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password") || "";

  try {
    const res = await pool?.query(`SELECT * FROM user_table WHERE email = $1;`, [username]);

    if (res?.rowCount && res?.rowCount > 0) {
      const user = res.rows[0];
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Remove password field before returning response
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

