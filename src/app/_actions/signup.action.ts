'use server'

import { SignUpDataType } from "@/ٍShema/signup.Shema";
import axios from "axios";
import { cookies } from "next/headers";



   export async function signUpAction(userData:SignUpDataType) {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
      console.log(data);
      
      if (data.message =='success') {

        const cookiy = await cookies()
        cookiy.set('userToken' ,data.token,{
          httpOnly:true,
          maxAge : 60*60*24,
          sameSite :'strict'
        })
        return true
      }else{
        return false
      }
}