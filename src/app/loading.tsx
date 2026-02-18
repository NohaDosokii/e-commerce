


import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function loading() {
  return <>
  <div className="h-screen bg-[#d6d2c2] text-white flex justify-center items-center">


    
<Circles
height="80"
width="80"
color="white"
ariaLabel="circles-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
  </div>
  
  </>
}
