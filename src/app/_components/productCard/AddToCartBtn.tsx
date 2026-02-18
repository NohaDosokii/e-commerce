'use client'
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader, ShoppingCart } from 'lucide-react'
import { AddToCartBtnProps } from './ProductCard.types'
import axios from 'axios'
import { toast } from 'sonner'
import { cartContext } from '@/app/providers/cartContextProvider'
import { useSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation'

export default function AddToCartBtn({ productId, onAdded }: AddToCartBtnProps) {
  const { data: session } = useSession() 
  const router = useRouter()
  const cart = useContext(cartContext);
  
  const [loading, setLoading] = useState(false)

  if (!cart) return null;
  const { setnumOfCartItems, settotalCartPrice } = cart;

  async function addToCart() {

    if (!session) {
      toast.info('Please login first to add products to your cart', { position: 'top-center' });
      router.push('/signup');
      return;
    }

    try {
      setLoading(true)
      const { data } = await axios.post('/api/hamada', { productId })

      if (data.status === 'success') {
        toast.success('Product added to cart successfully', { position: 'top-center' })
        setnumOfCartItems(data.numOfCartItems)
        settotalCartPrice(data.data.totalCartPrice)
        onAdded?.()
      }
    } catch (err) {
      toast.error('Failed to add product', { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={addToCart} disabled={loading} className="w-full my-1 cursor-pointer text-xl bg-[#66635c]">
      {loading ? <Loader className="animate-spin" /> : <ShoppingCart />}
      Add to cart
    </Button>
  )
}