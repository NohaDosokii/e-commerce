"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import 'swiper/css'

type ItemType = {
  image: string
  name?: string
}

type MySliderPropsType = {
  items: ItemType[]
  spaceBetween?: number
  slidesPerView?: number
  height?: string
  paginationDots?: number
}

export default function MySlider({
  items = [],
  spaceBetween = 0,
  slidesPerView = 1,
  height = 'h-100',
  paginationDots = 3,
}: MySliderPropsType) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      <Swiper
        loop={true}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <img
                className={`w-full mt-7 ${height}`}
                src={item.image}
                alt={item.name || 'slide'}
              />
              {item.name && <p className="mt-2 text-md font-semibold">{item.name}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: paginationDots }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors
              ${index === activeIndex ? 'bg-black' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  )
}
