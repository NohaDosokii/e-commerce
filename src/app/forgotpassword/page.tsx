'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      console.log(res.data);
      setMessage('Check your email for the reset code!');
    } catch (error: any) {
        console.log(error);
        
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-start mt-30 justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Button className="w-full mt-4 bg-[#525047]">Send Reset Code</Button>
        {message && <p className="mt-3 text-center text-[#525047]">{message}</p>}
      </form>
    </div>
  );
}
