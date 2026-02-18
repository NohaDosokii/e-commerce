'use client'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export let wishlistContext = createContext<{
  wishlist: string[],
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>
}>({
  wishlist: [],
  setWishlist: () => {}
})

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const { data: session, status } = useSession()

  async function getData() {
  
    if (!session?.user) {
      setWishlist([])
      return
    }
    
    try {
      const { data } = await axios.get("/api/wishlist")
      console.log("Wishlist from API:", data)
      
      if (data.status === "success") {
        setWishlist(data.products || [])
      }
    } catch (err) {
      console.log("Error fetching wishlist:", err)
      setWishlist([])
    }
  }

  useEffect(() => {
    if (status !== 'loading') {
      getData()
    }
  }, [session, status])

  return (
    <wishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </wishlistContext.Provider>
  )
}