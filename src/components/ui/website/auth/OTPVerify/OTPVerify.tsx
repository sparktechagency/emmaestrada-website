// app/signin/page.tsx
'use client'

import React, { useState, useRef } from 'react'
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
import Image from 'next/image'

const OTPVerify = () => {
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()

    // Check if pasted data contains only digits
    if (!/^\d+$/.test(pastedData)) {
      toast.error('Please paste only numbers')
      return
    }

    // Get up to 6 digits from the pasted data
    const digits = pastedData.slice(0, 6).split('')

    const newOtp = [...otp]

    // Fill the inputs starting from the current index
    digits.forEach((digit, i) => {
      if (index + i < 6) {
        newOtp[index + i] = digit
      }
    })

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextIndex = Math.min(index + digits.length, 5)
    inputsRef.current[nextIndex]?.focus()
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
      if (result?.success) {
        Cookies.set("accessToken", result?.data?.accessToken)
        toast.success(result?.data?.message)
        route.push("/set-username")
      } else {
        toast.error(result?.message)
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }


  const handleResendOtp = async () => {
    setOtp(Array(6).fill(''));

    try {
      const email = Cookies.get("email");
      const res = await myFetch("/auth/resend-otp", { body: { email }, method: "POST" });

      console.log("resend res", res);
      
      if (res?.success) {
        toast.success(res.message);

        // ⏱ reset expiry
        const expiryTime = Date.now() + 3 * 60 * 1000;
        Cookies.set("otpExpiry", expiryTime.toString());

        // 🔥 force timer restart
        setTimerKey((prev) => prev + 1);
      }
    } catch (error: any) {
      console.log("handleResendOtp", error);      
      toast.error(error?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-8">
      {/* Optimized Background Image */}
      <Image
        src="/images/bgImg.png"
        alt="Background"
        fill
        priority
        quality={85}
        className="object-cover -z-10"
        sizes="100vw"
      />
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl py-5 sm:p-12">
        <Card className="w-[90%] mx-auto md:w-full max-w-xl p-0 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <img src="/logo.png" className='w-14 h-14' alt="Logo" />
            <h2 className="text-2xl font-bold text-center">Verify your email</h2>
            <p className='text-md text-center text-slate-500 font-sans'>
              Please check email for your six digit code. Make sure to check spam 📧
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
                    onPaste={(e) => handlePaste(e, index)}
                    ref={(el: any) => inputsRef.current[index] = el}
                    className="text-center text-xl h-12 w-12"
                  />
                ))}
              </div>

              <div className="text-center mb-5">
                <span className="text-xl font-semibold text-primary">
                  {secondsLeft > 0 ? `${minutes}:${seconds}` : "OTP Expired"}
                </span>
              </div>

              <Button hidden={!secondsLeft}  disabled={!secondsLeft} type="submit" size="lg" className="w-full my-4">
                Verify OTP
              </Button>             
            </form>
             <Button
              className='w-full'
                hidden={secondsLeft > 0}                
                onClick={()=>handleResendOtp()}
              >
                Resend OTP
              </Button>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-2 text-center">
            <Link href="/signup" onClick={() =>
              setTimerKey((prev) => prev + 1)} className="text-blue-600 font-normal hover:underline">
              Use a different email
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default OTPVerify