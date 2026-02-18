import { getAllCategories } from '@/app/_services/category.service'
import React from 'react'
import MySlider from '../MySlider/MySlider'

export default async function CategoriesSlider() {
  const categoriesData = await getAllCategories()

  if (!categoriesData) {
    return (
      <h1 className='flex justify-center h-72 items-center text-gray-400 text-2xl'>
        something wrong
      </h1>
    )
  }

  const items = categoriesData.map((category: any) => ({
    image: category.image,
    name: category.name
  }))

  return (
    <MySlider
      items={items}
      slidesPerView={6}
      spaceBetween={5}
      height="h-65"
      paginationDots={3} 
    />
  )
}
