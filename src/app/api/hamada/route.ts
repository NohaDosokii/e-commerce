import axios from "axios"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const token = await getUserToken()
  const { productId } = await req.json()

  const { data } = await axios.post(
    'https://ecommerce.routemisr.com/api/v1/cart',
    { productId },
    {
      headers: {
        token: token as string
      }
    }
  )

  return NextResponse.json(data)
}

export async function getUserToken() {
  const myCookies =  await cookies()

  const tokenFromCookies =
    myCookies.get('next-auth.session-token') ||
    myCookies.get('__Secure-next-auth.session-token')

  if (!tokenFromCookies?.value) return null

  const decodedJwt = await decode({
    token: tokenFromCookies.value,
    secret: process.env.NEXTAUTH_SECRET!
  })

  return decodedJwt?.userTokenFromBackend
}
