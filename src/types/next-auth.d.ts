// types/next-auth.d.ts or types.d.ts
import "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string
      email: string
      name: string
    }
  }
}

declare module "next/server" {
  interface NextRequest {
    auth: Awaited<ReturnType<typeof import("@/auth").auth>>
  }
}
