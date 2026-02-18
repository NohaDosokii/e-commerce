
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; 

export default function VerifyCodePage() {
  const [resetCode, setResetCode] = useState(''); 
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
    
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { 
        resetCode 
      });
      
      console.log(res.data);
      setMessage('Code verified! Redirecting...');
      
 
     
      localStorage.setItem('isCodeVerified', 'true');
      
     
      setTimeout(() => {
        router.push('/reset-password'); 
      }, 1500);
      
    } catch (error: any) {
      console.log(error);
      setMessage(error.response?.data?.message || 'Invalid or expired code');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start mt-30 justify-center">
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Verify Reset Code</h2>
        <p className="text-sm text-gray-500 mb-3">Enter the code sent to your email</p>
        <Input
          placeholder="Enter reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          type="text"
          required
          className="mt-1"
        />
        <Button 
          type="submit" 
          className="w-full mt-4 bg-[#525047] hover:bg-[#3a3a35]"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
        {message && (
          <p className={`mt-3 text-center ${message.includes('success') || message.includes('Redirecting') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}