import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const jwt = await getToken({ req })
    
   
    if (!jwt) {
       
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
   
    matcher: ['/cart', '/payment', '/allorders'] 
}