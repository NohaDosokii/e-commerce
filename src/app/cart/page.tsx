'use client'
import { Minus, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useRef } from "react";
import { cartContext } from "../providers/cartContextProvider";
import { updateCart } from "../_actions/updateCartItem";
import { toast } from "sonner";
import { deleteItemCart } from "../_actions/removeCartItem";
import { deleteAllCartItems } from "../_actions/removeAllCart";
import { getUserCart } from "../_actions/getUserCartActions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession(); 
  const hasShownToast = useRef(false); 
  
  const cart = useContext(cartContext);
  
  const {
    products,
    totalCartPrice,
    numOfCartItems,
    setProducts,
    setnumOfCartItems,
    settotalCartPrice
  } = cart || {};

  useEffect(() => {
    if (status === "unauthenticated") {
      if (!hasShownToast.current) {
        toast.info('Please login to access your shopping cart', { position: 'top-center' });
        hasShownToast.current = true;
      }
      router.push('/signup');
    } else if (status === "authenticated") {
      async function loadCart() {
        try {
          const data = await getUserCart();
          if (data && data.data && setProducts) {
            setProducts(data.data.products);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      }
      loadCart();
    }
  }, [status, router, setProducts]); 

  if (!cart) return null;
  if (status === "loading") return <div className="text-center py-20">Loading...</div>;
  if (!session) return null;

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto bg-gray-50 p-6 md:p-10 rounded-xl">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {!products || products.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-semibold ">
                  Your cart is empty 🛒
                </h2>
              </div>
            ) : (
              products.map((item: any) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border rounded-lg p-5 shadow-sm bg-white"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.imageCover}
                      alt="product"
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">{item.product.title}</h2>
                      <p className="text-gray-500 text-sm">{item.product.brand.name}</p>
                      <p className="text-gray-400 text-sm">{item.product.category.name}</p>

                      <div className="flex items-center border rounded mt-2 w-fit">
                        <button
                          type="button"
                          className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            toast.promise(updateCart(item.product.id, item.count - 1), {
                              loading: "Updating...",
                              success: (newData) => {
                                setProducts?.(newData.data.products);
                                settotalCartPrice?.(newData.data.totalCartPrice);
                                return "Updated successfully";
                              },
                              error: "Failed to update",
                              position: 'top-center' 
                            })
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="px-4">{item.count}</span>

                        <button
                          type="button"
                          className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            toast.promise(updateCart(item.product.id, item.count + 1), {
                              loading: "Updating...",
                              success: (newData) => {
                                setProducts?.(newData.data.products);
                                settotalCartPrice?.(newData.data.totalCartPrice);
                                return "Updated successfully";
                              },
                              error: "Failed to update",
                              position: 'top-center' 
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[#3E3C34] font-semibold">
                      {item.price * item.count} EGP
                    </p>

                    <button
                      onClick={() =>
                        toast.promise(deleteItemCart(item.product.id), {
                          loading: "Removing...",
                          success: (newData) => {
                            setProducts?.(newData.data.products);
                            setnumOfCartItems?.(newData.numOfCartItems);
                            settotalCartPrice?.(newData.data.totalCartPrice);
                            return "Removed successfully";
                          },
                          error: "Failed to remove",
                          position: 'top-center' 
                        })
                      }
                      className="flex items-center gap-2 mt-4 cursor-pointer text-red-600 font-semibold px-3 py-1 rounded hover:bg-red-100"
                    >
                      <Trash size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => router.push('/')}
                className="text-[#2D2E2E] font-semibold cursor-pointer"
              >
                ← Continue Shopping
              </button>
              
              <button
                onClick={() =>
                  toast.promise(deleteAllCartItems(), {
                    loading: "Clearing...",
                    success: () => {
                      setProducts?.([]);
                      setnumOfCartItems?.(0);
                      settotalCartPrice?.(0);
                      return "Cart cleared successfully";
                    },
                    error: "Failed to clear cart",
                    position: 'top-center' 
                  })
                }
                className="flex items-center gap-1 border border-red-300 font-semibold cursor-pointer text-red-600 px-2 py-1.5 rounded shadow-sm hover:bg-red-100"
              >
                <Trash size={16} />
                Clear Cart
              </button>
            </div>
          </div>
        
          <div className="col-span-12 lg:col-span-4">
            <div className="border rounded-lg p-5 shadow-sm bg-white">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-600 mb-5">
                <span>Total Items</span>
                <span className="text-black font-medium">{numOfCartItems}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-5">
                <span>Total Price</span>
                <span className="text-blue-600">{totalCartPrice} EGP</span>
              </div>
              <button
                onClick={() => router.push('/payment')}
                className="w-full font-semibold cursor-pointer mb-1 bg-blue-600 text-white py-2 rounded hover:shadow-md hover:shadow-blue-500/50 transition"
              >
                Checkout
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}