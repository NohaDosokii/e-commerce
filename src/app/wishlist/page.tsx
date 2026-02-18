'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { wishlistContext } from '@/app/providers/wishlistContextProvider'
import Link from 'next/link'
import { Heart, Trash, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react" 
import { ProductType } from '../_types/product.type'
import AddToCartBtn from '../_components/productCard/AddToCartBtn'

export default function WishlistPage() {
  const { wishlist, setWishlist } = useContext(wishlistContext)
  const [products, setProducts] = useState<ProductType[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) 
  const router = useRouter()
  const { data: session, status } = useSession() 
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      if (!hasShownToast.current) {
        toast.info('Please login to view your wishlist items', { position: 'top-center' });
        hasShownToast.current = true;
      }
      router.push('/signup');
      return;
    }

    async function fetchWishlistData() {
      if (status !== "authenticated") return; 

      setIsLoading(true) 
      try {
        const { data } = await axios.get('/api/wishlist')
        if (data.status === 'success') {
          setProducts(data.data || [])
          const ids = data.data?.map((p: any) => p.id) || []
          setWishlist(ids)
        }
      } catch (err) {
        console.error("Wishlist fetch error:", err)
        toast.error('Failed to load wishlist')
      } finally {
        setIsLoading(false) 
      }
    }

    fetchWishlistData()
  }, [status, router, setWishlist]) 

  async function removeFromWishlist(productId: string) {
    setActionLoading(productId)
    try {
      const { data } = await axios.delete(`/api/wishlist?productId=${productId}`)
      if (data.status === 'success') {
        setWishlist(wishlist.filter((id) => id !== productId))
        setProducts(products.filter((p) => p.id !== productId))
        toast.success('Removed successfully', { position: 'top-center' })
      }
    } catch {
      toast.error('Failed to remove', { position: 'top-center' })
    } finally {
      setActionLoading(null)
    }
  }

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="py-10">
        <div className="max-w-6xl mx-auto bg-gray-50 p-6 md:p-10 rounded-xl min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#77756b] mx-auto mb-4" />
            <p className="text-[#524f46] text-lg">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    )
  }
  if (!session) return null;

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto bg-gray-50 p-6 md:p-10 rounded-xl">
        <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>

        {(!products || products.length === 0) ? (
          <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-12 max-w-md text-center">
              <Heart className="w-24 h-24 text-[#77756b] mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-[#524f46] mb-2">
                Your Wishlist is Empty
              </h2>
              <p className="text-[#77756b] mb-6">
                Save your favorite items here!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-5 shadow-sm gap-4 bg-white"
              >
                <div className="flex items-center gap-4">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </Link>
                  <div>
                    <Link href={`/product/${product.id}`}>
                      <h2 className="font-semibold text-lg hover:underline">
                        {product.title}
                      </h2>
                    </Link>
                    <p className="text-gray-500 text-sm">{product.brand?.name}</p>
                    <p className="text-gray-400 text-sm">{product.category?.name}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <p className="text-[#3E3C34] font-semibold text-lg">
                    {product.priceAfterDiscount ?? product.price} $
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      disabled={actionLoading === product.id}
                      className="flex items-center justify-center gap-3 text-red-600 font-semibold px-4 py-2 hover:bg-red-50 rounded-md transition w-full sm:w-auto cursor-pointer"
                    >
                      {actionLoading === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash size={16} />
                      )}
                      Remove
                    </button>

                    <div className="w-full sm:w-40">
                      <AddToCartBtn
                        productId={product.id}
                        onAdded={() => {
                          setWishlist(wishlist.filter((id) => id !== product.id))
                          setProducts(products.filter((p) => p.id !== product.id))
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-[#2D2E2E] font-semibold cursor-pointer flex items-center gap-2"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}