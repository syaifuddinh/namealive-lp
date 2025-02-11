import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const c = await cookies()
  c.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });

  return redirect("/login")
}
