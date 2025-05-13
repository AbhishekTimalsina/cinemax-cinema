import { cookies } from "next/headers";

export async function GET(request) {
  (await cookies()).delete("isLogged");
  return Response.json({ success: true });
}
