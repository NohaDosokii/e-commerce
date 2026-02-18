import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const nextauthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async function (userData) {
        console.log(userData)

        let res = await fetch(
          'https://ecommerce.routemisr.com/api/v1/auth/signin',
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
          }
        )
        let finalRes = await res.json()
        console.log(finalRes)
        
        if (finalRes.message == 'success') {
          return {
            id: finalRes.user._id,
            name: finalRes.user.name,
            email: finalRes.user.email,
            userTokenFromBackend: finalRes.token
          }
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
  jwt(params) {
    if (params.user) {

      (params.token as any).userTokenFromBackend = (params.user as any).userTokenFromBackend
    }
    return params.token
  },
  session(params) {

    return params.session
  },
},
  session: {
    maxAge: 60 * 60 * 24
  }
}