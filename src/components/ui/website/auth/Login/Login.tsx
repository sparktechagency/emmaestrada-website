// app/signin/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { FaAppleAlt } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation';
import { myFetch } from '@/utils/myFetch';
import { ImCheckboxChecked } from "react-icons/im";
import { MdCancel } from 'react-icons/md';

import Cookies from "js-cookie"
import { toast } from 'sonner';


export default function Login() {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()


  useEffect(() => {
    if (email) {
      checkAvailablelity()
    } else {
      setIsVerified(false)
    }
  }, [email])

  const checkAvailablelity = async () => {
    try {
      const result = await myFetch(`/users/check-field?email=${email}`,{cache:'no-store'});

      if (result?.success) {
        setIsVerified(!result?.data?.data?.isAvailable)
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await myFetch('/auth/login', { method: "POST", body: { email } });      
      if (result?.data) {
        toast.success(result?.data?.message)
        Cookies.set("email", email);
        const expiryTime = Date.now() + 3 * 60 * 1000;
        Cookies.set("otpExpiry", expiryTime.toString());
        router.push("/login/verify")
      } else {
        toast.error(result?.message)
      }
    } catch (error) {
      console.log("otp error", error);


    }

  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4 py-8">
      <div className=" backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl py-5 md:p-18">

        <Card className="w-[90%] md:w-full mx-auto max-w-md p-0 py-5 sm:p-3">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <img src="/logo.png" className='w-14 h-14' alt="Logo" />
            <h2 className="text-2xl font-bold text-center">Sign in to Whop</h2>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 relative">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@example.com"
                  className="pr-10 mt-1"
                />
                {isVerified ? <ImCheckboxChecked className='absolute top-1/2  right-3 text-green-600' /> :
                  <MdCancel className='absolute top-1/2  right-3 text-red-600' />}
              </div>

              <Button disabled={!isVerified} type="submit" size="lg" className="w-full">
                Continue
              </Button>
            </form>

            {/* Separator */}
            <Separator className="my-5" />

            {/* Social Buttons */}
            <div className="flex space-x-1.5 md:space-x-3">
              <Button size="sm" variant="outline" className=" justify-center w-full h-12">
                <FcGoogle className=" text-xs md:text-lg" /> Google
              </Button>
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-2 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-bold text-primary hover:underline">
                Sign up
              </Link>
            </p>

            <p className="text-xs text-gray-500">
              By signing in you agree to Whop&apos;s{' '}
              <Link href="/terms-condition" className="font-medium text-black hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="font-medium text-black hover:underline">Privacy Policy</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
