
'use client'

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpDataType, signUpShema } from '@/ٍShema/signup.Shema';
import { signUpAction } from '../_actions/signup.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

export default function Page() {
  const route = useRouter()

  let form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    resolver: zodResolver(signUpShema)
  })

  async function handleSignUp(values: SignUpDataType) {
    const x = await signUpAction(values)
    if (x) {
      toast.success('sign up successfully', { position: 'top-center' })
      route.push('/login')
    } else {
      toast.error('sign up error', { position: 'top-center' })
    }
  }

  return (
    <div className="min-h-screen flex items-start mt-5 justify-center bg-white px-4">
      <div className="w-full max-w-md bg-[#fcfdff] p-8 rounded-xl shadow-md">
        <h1 className='text-4xl font-semibold my-2 text-[#524f46] text-center'>Sign up</h1>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your name</FieldLabel>
                <Input {...field} id={field.name} placeholder="your name ....." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your phone</FieldLabel>
                <Input {...field} id={field.name} placeholder="your phone ....." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your email</FieldLabel>
                <Input {...field} type="email" id={field.name} placeholder="your email ....." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your password</FieldLabel>
                <Input {...field} type="password" id={field.name} placeholder="your password ....." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your repassword</FieldLabel>
                <Input {...field} type="password" id={field.name} placeholder="your repassword ....." />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button className='w-full mt-3 cursor-pointer bg-[#77756b] hover:bg-[#524f46] text-white'>
            Signup now
          </Button>

          <div className="text-center ">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#524f46] font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}