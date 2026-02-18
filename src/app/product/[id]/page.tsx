

import AddToCartBtn from '@/app/_components/productCard/AddToCartBtn'
import { getProduct } from '@/app/_services/products.service'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaStar } from 'react-icons/fa'

type ProductDetailsPropsType ={
params :{
  id :string
}
}

export default  async function page(props :ProductDetailsPropsType) {
  let data = await props.params
  console.log(data.id);

    let productData= await getProduct(data.id)
    if (productData==null) {
      notFound( )
    }
  
  return <>

<div className="container mx-2 mt-5  grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">

  <div className="flex justify-center lg:justify-start">
    <img className="w-full max-w-sm object-contain" src={productData?.imageCover} alt={productData?.title} />
  </div>

  
  <div className="col-span-3 mt-14">
    <h1 className="text-3xl font-bold">{productData?.title}</h1>
    <p className="text-lg mt-2">{productData?.description}</p>
    <p className="text-md mt-1">Brand: {productData?.brand.name}</p>
    <p className="text-md mt-1">Category: {productData?.category.name}</p>
    <p className="text-lg mt-2 font-semibold">Price: {productData?.price} EGP</p>
    <p className="flex items-center gap-2 mt-2">
      <FaStar className="text-yellow-400"/> {productData?.ratingAverage}
    </p>

    <div className="mt-4">
      <AddToCartBtn productId={productData?.id}/>
    </div>
  </div>
</div>

  </>
}
