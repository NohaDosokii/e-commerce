'use server'

import axios from "axios";
import { getUserToken } from "../api/hamada/route";

export async function deleteItemCart(id: string) {
  try {
    const token = await getUserToken();

    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: token as string,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
