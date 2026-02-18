'use client'


import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './cartContextProvider'

export default function MySessionProvider({children}:{children:React.ReactNode}) {
  return <>
  
 <SessionProvider>

  <CartContextProvider>


    {children}

  </CartContextProvider>
  
 </SessionProvider>


  
  </>
}
