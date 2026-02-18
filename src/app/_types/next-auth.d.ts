


import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    userTokenFromBackend?: string
  }

  interface Session {
    user?: {
      userTokenFromBackend?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userTokenFromBackend?: string
  }
}