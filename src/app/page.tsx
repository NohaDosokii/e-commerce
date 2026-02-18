

import { getAllProducts } from "./_services/products.service"
import { getAllCategories } from './_services/category.service'
import imgSlider1 from "@/images/slider-image-1.jpeg"
import imgSlider2 from "@/images/slider-image-2.jpeg"
import imgSlider3 from "@/images/slider-image-3.jpeg"
import HomeClient from "./_components/HomeClient/HomeClient"


export default async function Home() {
  const allProducts = await getAllProducts()
  const allCategories = await getAllCategories()

  if (!allProducts || !allCategories) return <h2 className=" flex justify-center items-center
  text-3xl text-[#2d2e2e]"> Error !</h2>

  const imageList = [imgSlider1.src, imgSlider2.src, imgSlider3.src]

  return (
    <HomeClient 
      products={allProducts} 
      sliderImages={imageList} 
      categories={allCategories} 
    />
  )
}

