

import { Phone } from "lucide-react"
import * as z from "zod"

   export const signUpShema = z.object({
name:z.string().nonempty('please enter your name').min(3,'name must be at least 3 character'),
phone:z.string().nonempty('please enter your phone').regex(/^01[1250][0-9]{8}$/),
 email:z.email('enter valid email').nonempty('please enter your email'),
 password:z.string().nonempty('please enter your password').min(8,'password must be at least 8 character'),
 rePassword:z.string().nonempty('please enter your re password').min(3,'repassword must be at least 8 character'),
}).refine((data)=>data.password == data.rePassword,{
    path:['rePassword'],
    error:'password and rePassword not match'
})


 export type SignUpDataType = z.infer<typeof signUpShema>