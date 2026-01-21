// app/set-username/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { myFetch } from '@/utils/myFetch'
import { useData } from '@/hooks/context/DataContext'
import Image from 'next/image'


const SetBusinessName = () => {
  const [businessName, setBusinessName] = useState('')
  const { data, image, clearData } = useData();

  const router = useRouter()
  const isValid = !!businessName

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      toast.error("Missing image")
      return
    }

    if (!businessName) {
      toast.error("Business name is required")
      return
    }


    if (!data?.userName || !data?.birthday || !data?.country) {
      toast.error("Incomplete previous data")
      return
    }

    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("data", JSON.stringify({ businessName, ...data }))

      const response = await myFetch(`/users/complete-registration`, {
        method: "POST",
        body: formData
      })

      if (response?.success) {
        clearData()
        toast.success(response.message)
        router.replace("/")        
      } else {
        toast.error(response?.message || "Registration failed")
      }

    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Failed to create user")
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
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-4 sm:p-12">
        <Card className="w-full md:min-w-xl py-5 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <h2 className="text-2xl font-bold text-center font-sans">Name Your Business</h2>
            <p className="text-md text-center text-slate-500 font-sans">
              This can be changed later
            </p>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="businessname" className="text-sm font-semibold text-gray-700">
                  Business Name
                </label>
                <Input
                  id="businessname"
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <Button disabled={!isValid} type="submit" size="lg" className="w-full">
                Create Now
              </Button>
            </form>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-2 text-center">
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SetBusinessName
