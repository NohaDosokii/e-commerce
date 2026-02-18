"use client"

import { useState } from "react"
import ProductCard from "../productCard/ProductCard"
import MySlider from "../MySlider/MySlider"
import SearchInput from "../searchinput/SearchInput"

type HomeClientProps = {
  products: any[]
  sliderImages: string[]
  categories: any[]
}

export default function HomeClient({
  products,
  sliderImages,
  categories,
}: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-2">
     
      <MySlider
        items={sliderImages.map((img) => ({ image: img }))}
        slidesPerView={1}
        spaceBetween={0}
        height="h-100"
      />
<div className="my-5">
  {[2, 4, 6].map((count, index) => (
    <div
      key={count}
      className={
        index === 0 ? "block sm:hidden" :
        index === 1 ? "hidden sm:block md:hidden" :
        "hidden md:block"
      }
    >
      <MySlider
        items={categories.map((cat) => ({
          image: cat.image,
          name: cat.name,
        }))}
        slidesPerView={count}
        spaceBetween={5}
        height="h-65"
        paginationDots={3}
      />
    </div>
  ))}
</div>

    
      <div className="my-5">
        <SearchInput onSearch={(val) => setSearchTerm(val)} />
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <p className="col-span-4 text-center p-4">No products found</p>
          )}
        </div>
      </div>
    </div>
  )
}
