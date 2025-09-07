import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

import "next/server"
import type { Session } from "next-auth"

declare module "next/server" {
  interface NextRequest {
    auth?: Session | null
  }
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role?: string
      profileCompleted?: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string
    profileCompleted?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: string
    profileCompleted?: boolean
  }
}
