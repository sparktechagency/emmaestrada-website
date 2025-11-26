// app/set-username/page.tsx
'use client'

import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const SetBusinessName = () => {
  const [businessname, setBusinessname] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("username submitted:", businessname)
    // Navigate to next page after setting username
    router.push("/") // change to your next page route
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4 py-8">
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-8 sm:p-12">
        <Card className="w-full md:min-w-xl p-8 sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <h2 className="text-2xl font-bold text-center font-sans">Name Your business</h2>
            <p className="text-md text-center text-slate-500 font-sans">
              This can be changed later
            </p>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Business Name
                </label>
                <Input
                  id="businessname"
                  type="businessname"
                  placeholder="businessname"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Create Now
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

export default SetBusinessName
