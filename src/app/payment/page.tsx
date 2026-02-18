'use client'

import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/ٍShema/payment.schema";
import { PaymentDataType } from "../_types/payment.type";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cashOrder, visaOrder } from "./payment.action";
import { cartContext } from "../providers/cartContextProvider";
import { useRouter } from "next/navigation";

export default function PaymentPage() {

  const form = useForm<PaymentDataType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash",
    },
    resolver: zodResolver(paymentSchema),
  });

  const router = useRouter();
  const cart = useContext(cartContext);
  if (!cart) return null;

  const { cartId, setProducts, setnumOfCartItems, settotalCartPrice } = cart;

  async function handlePayment(values: PaymentDataType) {
    const userData = {
      shippingAddress: {
        phone: values.phone,
        city: values.city,
        details: values.details
      }
    };

    if (!cartId) {
      toast.error("Cart not ready to pay ", { position: "top-center" });
      return;
    }

    if (values.type === 'cash') {
      const cashOrderData = await cashOrder(cartId, userData);

     
      setProducts([]);
      setnumOfCartItems(0);
      settotalCartPrice(0);

      toast.success("Order created successfully", { position: "top-center" });
      router.push("/allorders");

    } else {
      const visaOrderData = await visaOrder(cartId, userData);

      setProducts([]);
      setnumOfCartItems(0);
      settotalCartPrice(0);

      window.open(visaOrderData.session.url);
    }
  }

  return (
    <div className="min-h-screen flex items-start mt-5 justify-center">
      <div className="w-full max-w-xl border rounded-xl p-6 shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">Payment</h1>

        <form onSubmit={form.handleSubmit(handlePayment)}>
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="mb-4" data-invalid={fieldState.invalid}>
                <FieldLabel>Details</FieldLabel>
                <Input {...field} placeholder="address details..." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="mb-4" data-invalid={fieldState.invalid}>
                <FieldLabel>Phone</FieldLabel>
                <Input {...field} placeholder="phone..." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="mb-4" data-invalid={fieldState.invalid}>
                <FieldLabel>City</FieldLabel>
                <Input {...field} placeholder="city..." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <div className="mb-6">
                <p className="font-medium mb-2">Payment Method</p>

                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    value="cash"
                    className="accent-[#525047]"
                    checked={field.value === "cash"}
                    onChange={() => field.onChange("cash")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="visa"
                    className="accent-[#525047]"
                    checked={field.value === "visa"}
                    onChange={() => field.onChange("visa")}
                  />
                  Pay Online (Visa)
                </label>
              </div>
            )}
          />

          <button
            type="submit"
            className="w-full bg-[#525047] text-white py-2 rounded font-semibold
                       transition hover:shadow-lg hover:shadow-[#525047]/40"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
