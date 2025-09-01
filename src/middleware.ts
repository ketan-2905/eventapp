import { type NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "./lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  const isProtected = ["/dashboard", "/account"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !req.auth?.user) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
}
