'use client'

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { LoginDataType, loginShema } from '@/ٍShema/login.shema';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; 

export default function Page() {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false); 

  let form = useForm<LoginDataType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginShema)
  });

 async function handleLogin(values: LoginDataType) {
  let result;
  try {
    setIsLoading(true);
    
    result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid email or password", { position: "top-center" });
    } else {
      toast.success("Login successfully! Redirecting...", { position: "top-center" });
      
      setTimeout(() => {
        route.push('/');
        route.refresh();
      }, 1500);
    }
  } catch (error) {
    toast.error("Something went wrong", { position: "top-center" });
  } finally {

    if (result?.error) {
      setIsLoading(false);
    }
  }
}

  return (
    <div className="min-h-screen flex items-start mt-15 justify-center bg-white px-4">
      <div className="w-full max-w-md bg-[#fcfdff] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold mb-8 text-center text-[#524f46]">
          Login
        </h1>

        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="your email ....."
                  autoComplete="off"
                  type="email"
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="your password ....."
                  autoComplete="off"
                  type="password"
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button 
            disabled={isLoading} 
            className="w-full mt-4 cursor-pointer bg-[#77756b] hover:bg-[#524f46] text-white flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Logging in..." : "Login now"}
          </Button>

          <div className="text-right mt-2">
            <p
              className="text-sm text-[#3f3e37] hover:underline cursor-pointer"
              onClick={() => route.push("/forgotpassword")}
            >
              Forgot Password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}