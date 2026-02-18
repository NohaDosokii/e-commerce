import React from 'react'
import { ProductCardPropsType } from './ProductCard.types'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartBtn from './AddToCartBtn'
import { Heart } from 'lucide-react'
import AddToWishlistBtn from '../wishlist/AddToWishlistBtn'

export default function ProductCard({ item }: ProductCardPropsType) {
  return (
    <div className="p-4">
      <div className="relative group"> 

      
        <Link href={`/product/${item.id}`}>
          <div className="relative cursor-pointer 
                          h-100 w-60 p-3 bg-white rounded-lg 
                          transition-transform duration-300 ease-in-out 
                          shadow-sm hover:shadow-xl hover:-translate-y-2">
            
            <div className="h-50 w-full relative mb-2">
              <Image
                className="object-contain "
                fill
                src={item.imageCover}
                alt={item.title}
              />
            </div>

            <p className="mb-1">{item.category.name}</p>
            <h2 className="text-md mb-1 font-medium">
              {item.title.split(" ", 2).join(" ")}
            </h2>
            

            {item.priceAfterDiscount ? (
              <div className="flex gap-2 mb-2">
                <h3 className="line-through text-lg text-red-900">{item.price}</h3>
                <h3 className="text-lg">{item.priceAfterDiscount} EGP</h3>
             
              </div>
            ) : (
              <h3 className="text-lg mb-2">{item.price} EGP</h3>
            )}
 <h3 className='font-semibold text-[#524f46]'>Brand : {item.brand.name}</h3>
            {item.priceAfterDiscount && (
              <span className="absolute top-0 right-0 p-2 text-sm rounded-lg bg-[#7e7a6c] text-white">
                Discount {((item.price - item.priceAfterDiscount) / item.price * 100).toFixed(0)}%
              </span>
              
            )}
<AddToWishlistBtn productId={item.id} />


            
          </div>
        </Link>
       
     
        <div className="absolute bottom-3 translate-x-1/4 left-2
                        opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-1 mb-2
                        transition-all duration-500">
          <AddToCartBtn productId={item.id} />
        </div>

      </div>
    </div>
  )
}
