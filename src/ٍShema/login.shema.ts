




import { Phone } from "lucide-react"
import * as z from "zod"

   export const loginShema = z.object({

 email:z.email('enter valid email').nonempty('please enter your email'),
 password:z.string().nonempty('please enter your password').min(8,'password must be at least 8 character'),

})


 export type LoginDataType = z.infer<typeof loginShema>