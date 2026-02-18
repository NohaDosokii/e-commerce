'use server'

import axios from "axios";
import { getUserToken } from "../api/hamada/route";

export async function getUserCart() {
  try {
    const token = await getUserToken();

    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
