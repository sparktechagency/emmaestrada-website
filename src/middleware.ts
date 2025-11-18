import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/secure", "/admin", "/dashboard"];

export async function middleware(Request: NextRequest) {
  try {
    const { pathname } = Request.nextUrl;

    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtected) {
      const token = Request?.cookies?.get("accessToken")?.value;

      if (!token) {
        return NextResponse.redirect(new URL("/login", Request.url));
      }
    }
  } catch (error) {
    console.error("Error in middleware:", error);
  }
}


export const config = {
    matcher: ['/', '/product-details/id', '/profile/:path*']
}


