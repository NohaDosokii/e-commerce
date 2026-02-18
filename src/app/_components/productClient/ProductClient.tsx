



"use client"

import { useState } from "react"
import SearchInput from "../searchinput/SearchInput"
import ProductCard from "../productCard/ProductCard"


export default function ProductsClient({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto">
    <div className="my-5">
        
      <SearchInput onSearch={setSearchTerm} />
    </div>
<div className="container mx-auto px-2">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
    {filteredProducts.map((item) => (
      <ProductCard key={item.id} item={item} />
    ))}
  </div>
</div>

    </div>
  )
}
