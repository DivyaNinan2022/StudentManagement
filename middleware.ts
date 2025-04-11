// middleware.ts (or middleware.js)
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Example: Redirect if not authenticated
  const isAuthenticated = req.cookies.get("token");
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next(); // Continue processing the request
}

// Define the matcher to specify routes where the middleware should apply
export const config = {
  matcher: ["/dashboard/:path*", "/tasklist/:path*", "/add_task_tms/:path*"],
};
