

'use server'

import axios from "axios"
import { getUserToken } from "../api/hamada/route"


type shippingAddress={
  shippingAddress:{
      details : string,
      city : string,
      phone : string,
      
}

}


export async function cashOrder(cartId: string ,useData :shippingAddress) {
  const token = await getUserToken()
     const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,useData,{
        headers:{
            token : token as string
        }
     })
     return data
}




export async function visaOrder(cartId: string ,useData :shippingAddress) {
  const token = await getUserToken()
     const {data} = await axios.post
     (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,useData,{
        headers:{
            token : token as string
        }
     })
     return data
}



export async function getUserOrders() {
  const token = await getUserToken();

  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/orders",
    {
      headers: {
        token: token as string,
      },
    }
  );

  return data.data;
}