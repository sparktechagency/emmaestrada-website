// app/signin/page.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { myFetch } from '@/utils/myFetch'
import { toast } from 'sonner'
import { useOtpTimer } from '@/hooks/useOtpTimer'

const LoginVerify = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const route = useRouter()
  const [timerKey, setTimerKey] = useState(0);


  const secondsLeft = useOtpTimer(timerKey);
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const email = Cookies.get('email');
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return // allow only digits

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')

    try {
      const result = await myFetch('/auth/verify-otp', { method: "POST", body: { email, oneTimeCode: Number(otpValue) } });      
      
      console.log("LOGIN result", result?.data);
      
      if (result?.success) {
        const {data} = result;
        Cookies.set("accessToken", data?.accessToken)
        toast.success(data?.message)
        route.push("/")
      }else{
        toast.error(result?.message)
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-0 md:px-4 py-8">
      <div className="  backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl py-5 sm:p-12 ">
        <Card className="w-[90%] mx-auto md:w-full max-w-xl p-0 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <img src="/logo.png" className='w-14 h-14' alt="Logo" />
            <h2 className="text-2xl font-bold text-center">Verify your email</h2>
            <p className='text-md text-center text-slate-500 font-sans'>              
              Please check mmail for your six digit code. Make sure to check spam 📧
            </p>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el: any) => inputsRef.current[index] = el}
                    className="text-center text-xl h-12 w-12"
                  />
                ))}
              </div>

              <div className="text-center mb-5">
                <span className="text-xl font-semibold text-red-600">
                  {secondsLeft > 0 ? `${minutes}:${seconds}` : "OTP Expired"}
                </span>
              </div>


              <Button disabled={!secondsLeft} type="submit" size="lg" className="w-full mt-4">
                Verify OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginVerify
