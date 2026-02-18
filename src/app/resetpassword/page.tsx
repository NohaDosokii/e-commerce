
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isVerified = localStorage.getItem('isCodeVerified');
    if (!isVerified) {
      
      router.push('/forgot-password');
    }
  }, [router]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
     
      const res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: email,
        newPassword: newPassword 
      });
      
      console.log(res.data);
      setMessage('Password reset successful! You can now login.');
      
      localStorage.removeItem('isCodeVerified');
      
      setTimeout(() => {
        router.push('/login'); 
      }, 2000);
      
    } catch (error: any) {
      console.log(error);
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start mt-30 justify-center">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Set New Password</h2>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          required
          className="mt-3"
          minLength={6} 
        />
        <Button 
          type="submit" 
          className="w-full mt-4 bg-[#525047] hover:bg-[#3a3a35]"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
        {message && (
          <p className={`mt-3 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}