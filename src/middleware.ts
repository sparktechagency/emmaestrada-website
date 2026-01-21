// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/businessname",
  "/otp-verify",
];

const privateRoutes = [
  "/creator",
  "/creators",
  "/notifications",
  "/promotor",
  "/success",
  "/campaigns",
  "/bookings",
  "/verification",
  "/support",
  "/profile",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathNameIsOneThePrivateRoute = privateRoutes.some(item => 
    pathname.startsWith(item)
  );
  const accessToken = request.cookies.get("accessToken")?.value;

  // If user is not authenticated
  if (!accessToken) {
    // Allow access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect to login for private routes
    if (pathNameIsOneThePrivateRoute) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    // Allow other routes
    return NextResponse.next();
  }

  // If user is authenticated and trying to access auth routes
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/creator/:path*",
    "/creators/:path*",
    "/notifications/:path*",
    "/promotor/:path*",
    "/success/:path*",
    "/campaigns/:path*",
    "/bookings/:path*",
    "/verification/:path*",
    "/support/:path*",
    "/profile/:path*",
    "/login",
    "/reset-password",
    "/forgot-password",
    "/businessname",
    "/otp-verify",
  ],
};