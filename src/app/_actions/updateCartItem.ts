'use server'

import axios from "axios";
import { getUserToken } from "../api/hamada/route";

export async function updateCart(id: string, count: number) {
  try {
    const token = await getUserToken();

    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      {
        headers: {
          token: token as string,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    
  }
}
