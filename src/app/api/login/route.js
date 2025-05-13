import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();
  const cookieStore = await cookies();

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookieStore.set("isLogged", process.env.SESSION_ID);

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, error: "Invalid credentials" },
    { status: 401 }
  );
}
