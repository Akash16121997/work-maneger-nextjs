import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("logintoken")?.value;
  const pathname = request.nextUrl.pathname;

  const authPages = ["/LoginPage", "/signup"];
  const protectedPages = ["/addtask", "/", "/ShowTask"];

  // 1️⃣ Logged-in user trying to access login/signup
  if (authPages.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2️⃣ Not logged-in user trying to access protected pages
  if (protectedPages.includes(pathname) && !authToken) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Unauthorized access to API" },
        { status: 401 },
      );
    }
    return NextResponse.redirect(new URL("/LoginPage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/LoginPage",
    "/signup",
    "/addtask",
    "/ShowTask",
    "/api/:path*",
  ],
};
