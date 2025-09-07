import { type NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "./lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  const isProtected = ["/dashboard", "/account", "/auth/register", "/campus"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtected) {
    if (!req.auth?.user) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // If profile is NOT completed → force them to register
    if (!req.auth.user.profileCompleted && req.nextUrl.pathname !== "/auth/register") {
      return NextResponse.redirect(new URL("/auth/register", req.url))
    }

    // If profile IS completed and they try to access /auth/register → send them to /campus/events
    // console.log("Middleware check:", req.auth.user);
    
    if (req.auth.user.profileCompleted && req.nextUrl.pathname === "/auth/register") {
      return NextResponse.redirect(new URL("/campus/events", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/auth/register",
    "/campus/:path*",
  ],
}
