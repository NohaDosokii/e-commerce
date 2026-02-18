'use client'

import React, { createContext, useEffect, useState } from 'react'
import { getUserCart } from '../_actions/getUserCartActions'
import { ProductType } from "../_types/product.type"

export type CartItem = {
  product: ProductType;
  count: number;
  price: number;
};

export type CartContextType = {
  products: CartItem[];
  setProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartId: string | null;
  numOfCartItems: number;
  setnumOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  totalCartPrice: number;
  settotalCartPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const cartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CartItem[]>([])
  const [cartId, setcartId] = useState<string | null>(null)
  const [numOfCartItems, setnumOfCartItems] = useState(0)
  const [totalCartPrice, settotalCartPrice] = useState(0)

  async function getData() {
    const userCart = await getUserCart()
    console.log('userCartFromContext', userCart);

    setProducts(userCart.data.products || [])
    setcartId(userCart.cartId || null)
    setnumOfCartItems(userCart.numOfCartItems || 0)
    settotalCartPrice(userCart.data.totalCartPrice || 0)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <cartContext.Provider value={{
      products,
      setProducts,
      cartId,
      numOfCartItems,
      setnumOfCartItems,
      totalCartPrice,
      settotalCartPrice
    }}>
      {children}
    </cartContext.Provider>
  )
}
