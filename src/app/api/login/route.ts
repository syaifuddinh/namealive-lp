import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 422 });
    }

    // Send request to backend API
    const response = await fetch(process.env.BACKEND_AUTH_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Login failed" }, { status: response.status });
    }

    // Extract JWT Token from backend response
    const token = data.data.token;
    if (!token) {
      return NextResponse.json({ message: "No token received" }, { status: 500 });
    }

    // Set the JWT token as an HTTP-only cookie
    const c = await cookies()
    c.set("token", token, {
      httpOnly: true, // Prevents JavaScript access (More secure)
      secure: process.env.NODE_ENV === "production", // Secure in production
      path: "/", // Available on all routes
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
