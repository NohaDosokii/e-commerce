'use client'
import { wishlistContext } from "@/app/providers/wishlistContextProvider"
import axios from "axios"
import { Heart } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const { wishlist, setWishlist } = useContext(wishlistContext)
  const [loading, setLoading] = useState(false)
  
  const isFav = wishlist?.includes(productId) || false

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

  
    if (!session) {
      toast.info('Please login first to use Wishlist', { position: 'top-center' });
      router.push('/signup');
      return;
    }
    
    if (loading) return
    setLoading(true)

    try {
      const { data } = await axios.post("/api/wishlist", { productId })
      if (data.status === "success") {
        if (isFav) {
          setWishlist(wishlist.filter(id => id !== productId))
          toast.success("Removed from wishlist", { position: "top-center" })
        } else {
          setWishlist([...wishlist, productId])
          toast.success(" product added to wishlist successfully", { position: "top-center" })
        }
      }
    } catch (err) {
      toast.error("Process failed", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Heart
      onClick={toggleWishlist}
      className={`absolute bottom-5 right-3 cursor-pointer transition 
        ${isFav ? "fill-black text-black" : "text-[#77756b]"}
        ${loading ? "animate-pulse opacity-50" : ""}`}
      size={24}
    />
  )
}