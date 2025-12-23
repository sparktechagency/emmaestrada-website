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

const base64ToFile = (base64: string, filename = "image.png") => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

const SetBusinessName = () => {
  const [businessName, setBusinessName] = useState('')
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
   const { data, image, setData, setImage, clearData } = useData();

  const router = useRouter()

  const isValid = !!businessName

  useEffect(() => {
    const stored = localStorage.getItem("registrationData")
    const base64 = localStorage.getItem("image")

    if (stored) setRegistrationData(JSON.parse(stored))
    if (base64) setImageFile(base64ToFile(base64))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registrationData) {
      toast.error("Missing registration data")
      router.push("/set-username")
      return
    }

    if (!imageFile) {
      toast.error("Missing image")
      return
    }

    if (!businessName) {
      toast.error("Business name is required")
      return
    }

    const { userName, birthday, country } = registrationData

    if (!userName || !birthday || !country) {
      toast.error("Incomplete previous data")
      router.push("/set-username")
      return
    }

    try {
      const formData = new FormData()
      // formData.append("image", imageFile)
      formData.append("data", JSON.stringify({ businessName, ...registrationData }))

      const result = await myFetch(`/users/complete-registration`, {
        method: "POST",
        body: formData
      })

      if (result?.data) {
        toast.success(result.data.message)
        router.push(result.data.role === "USER" ? "/creator/profile" : "/promotor/profile")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Failed to create user")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4 py-8">
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
