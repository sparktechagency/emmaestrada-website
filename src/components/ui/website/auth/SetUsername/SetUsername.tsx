// app/set-username/page.tsx
'use client'

import React, { useEffect, useState } from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { myFetch } from '@/utils/myFetch'
import { ImCheckboxChecked } from 'react-icons/im'
import { MdCancel } from 'react-icons/md'
import { toast } from 'sonner'
import { useData } from '@/hooks/context/DataContext'
import Image from 'next/image'

const SetUsername = () => {
  const [username, setUsername] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()
  const { setData} = useData()


  useEffect(() => {
    if (username) {
      checkAvailablelity()
    } else {
      setIsVerified(false)
    }
  }, [username])

  
  const checkAvailablelity = async () => {
    try {
      const result = await myFetch(`/users/check-field?userName=${username}`);
      if (result?.success) {
        setIsVerified(result?.data?.isAvailable)
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isVerified) {
      toast.error("Usename already exist try again with other username")
    }    
    setData({userName: username})
    router.push("/set-birthday")
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
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-3 sm:p-12">
        <Card className="w-full md:min-w-xl md:p-8 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <h2 className="text-2xl font-bold text-center">Pick your username</h2>
            <p className="text-md text-center text-slate-500 font-sans">
              It's like claiming your Instagram handle in 2012 ⚡
            </p>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 relative">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  User
                </label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {isVerified ? <ImCheckboxChecked className='absolute top-1/2  right-3 text-green-600' /> :
                  <MdCancel className='absolute top-1/2  right-3 text-red-600' />}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Next
              </Button>
            </form>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-2 text-center">
            {/* Optional footer links or info */}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SetUsername
