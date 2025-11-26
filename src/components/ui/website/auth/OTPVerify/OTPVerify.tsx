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


const OTPVerify = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const route = useRouter()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')
    console.log("OTP submitted:", otpValue)
    route.push("/set-username")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4 py-8">
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-8 sm:p-12">
        <Card className="w-full max-w-lg p-8 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <img src="/logo.png" className='w-14 h-14' alt="Logo" />
            <h2 className="text-2xl font-bold text-center">Verify your email</h2>
            <p className='text-md text-center text-slate-500 font-sans'>
              Whop is a password-less platform. You will use this email to log in to your account. 
              Please check for your six digit code. Make sure to check spam 📧
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
                    ref={(el:any) => inputsRef.current[index] = el}
                    className="text-center text-xl h-12 w-12"
                  />
                ))}
              </div>

              <Button type="submit" size="lg" className="w-full mt-4">
                Verify OTP
              </Button>
            </form>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-2 text-center">
            <Link href="/login" className="text-blue-600 font-normal hover:underline">
              Use a different email
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default OTPVerify
