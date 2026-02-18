



import { z } from "zod";

export const paymentSchema = z.object({
  details: z.string().min(3, "Details is required"),
  city: z.string().min(2, "City is required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  type: z.enum(["cash", "visa"]),
});
