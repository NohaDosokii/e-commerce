import axios from "axios"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { getUserToken } from "../hamada/route"

export async function GET(req: NextRequest) {
  try {
    const token = await getUserToken()
    
    if (!token) {
      return NextResponse.json({ 
        status: "success", 
        products: [] 
      })
    }

    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token: token as string },
      }
    )

    const productIds = data.data?.map((item: any) => item._id || item.id) || []
    
    return NextResponse.json({ 
      status: "success", 
      products: productIds,
      data: data.data 
    })
  } catch (err) {
    console.log("Error fetching wishlist:", err)
    return NextResponse.json({ 
      status: "success", 
      products: [] 
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getUserToken()
    
    if (!token) {
      return NextResponse.json({ 
        status: "error", 
        message: " you should register" 
      }, { status: 401 })
    }

    const { productId } = await req.json()

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: { token: token as string },
      }
    )
    const productIds = data.data?.map((item: any) => item._id || item.id) || []
    
    return NextResponse.json({ 
      status: "success", 
      products: productIds,
      message: data.message 
    })
  } catch (err: any) {
    console.log("Wishlist error:", err)
    
  
    
    return NextResponse.json({ 
      status: "error", 
      message: err.response?.data?.message || " something went wrong" 
    }, { status: err.response?.status || 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getUserToken()
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('productId')
    
    if (!token) {
      return NextResponse.json({ status: "error", message: " you should register" }, { status: 401 })
    }

    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: { token: token as string },
      }
    )

    return NextResponse.json({ status: "success", data: data.data })
  } catch (err) {
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

