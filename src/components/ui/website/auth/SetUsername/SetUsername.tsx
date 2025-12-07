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

const SetUsername = () => {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("username submitted:", username)
    // Navigate to next page after setting username
    router.push("/set-birthday") // change to your next page route
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4  overflow-hidden">
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
              <div className="space-y-2">
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
