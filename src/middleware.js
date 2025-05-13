import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/login).*)"],
};

export function middleware(request) {
  const { nextUrl, cookies, method } = request;
  const isLogged = cookies.get("isLogged")?.value;

  if (
    nextUrl.pathname.startsWith("/api/movies") ||
    nextUrl.pathname.startsWith("/api/showtime")
  ) {
    if (["POST", "PUT", "DELETE"].includes(method)) {
      if (isLogged != process.env.SESSION_ID) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    }
  }
  if (nextUrl.pathname.startsWith("/admin")) {
    if (isLogged != process.env.SESSION_ID) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (nextUrl.pathname.startsWith("/login")) {
    if (isLogged == process.env.SESSION_ID) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
